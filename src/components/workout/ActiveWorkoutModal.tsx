'use client';

import React from 'react';
import {
  X,
  Play,
  Pause,
  CheckCircle,
  Plus,
  Trash2,
  Trophy,
  Dumbbell,
  Timer as TimerIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkoutRoutine, WorkoutLog, WorkoutExerciseLog, SetType } from '@/types/database';
import { appStorage } from '@/lib/storage';
import { formatDurationDigital, estimateOneRepMax } from '@/lib/utils';
import { RestTimerOverlay } from './RestTimerOverlay';
import { analyzeExerciseProgression } from '@/lib/progression-engine';
import { getExerciseMedia } from '@/lib/exercise-media';
import { ExerciseVisualPlayer } from '@/components/exercises/ExerciseVisualPlayer';
import { Exercise } from '@/types/database';

interface ActiveWorkoutModalProps {
  routine: WorkoutRoutine;
  isOpen: boolean;
  onClose: () => void;
  onFinish: (log: WorkoutLog) => void;
}

export function ActiveWorkoutModal({
  routine,
  isOpen,
  onClose,
  onFinish,
}: ActiveWorkoutModalProps) {
  const [startedAt] = React.useState<string>(new Date().toISOString());
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [notes, setNotes] = React.useState('');
  const [rpeOverall, setRpeOverall] = React.useState<number>(8);

  // Active rest timer state
  const [activeRestSeconds, setActiveRestSeconds] = React.useState<number | null>(null);

  // Initializing exercises from routine
  const [workoutExercises, setWorkoutExercises] = React.useState<WorkoutExerciseLog[]>(() => {
    return routine.exercises.map((re) => {
      const setsCount = re.target_sets || 3;
      const sets = Array.from({ length: setsCount }, (_, i) => ({
        id: `set-${Date.now()}-${re.exercise_id}-${i}`,
        exercise_log_id: `exlog-${re.exercise_id}`,
        set_number: i + 1,
        weight_kg: re.target_weight_kg || 0,
        reps: re.target_reps_max || 10,
        rpe: 8,
        set_type: (i === setsCount - 1 && re.set_type ? re.set_type : 'normal') as SetType,
        completed: false,
        is_pr: false,
      }));

      return {
        id: `exlog-${re.exercise_id}`,
        workout_log_id: `wlog-${Date.now()}`,
        exercise_id: re.exercise_id,
        exercise_name: re.exercise?.name || 'Exercício',
        sets,
        notes: re.notes || '',
      };
    });
  });

  const [expandedIndex, setExpandedIndex] = React.useState<number>(0);
  const [previewExercise, setPreviewExercise] = React.useState<Exercise | null>(null);

  // Main workout stopwatch
  React.useEffect(() => {
    if (!isOpen || isPaused) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPaused]);

  if (!isOpen) return null;

  // Toggle set completion
  const handleToggleSet = (exIndex: number, setIndex: number) => {
    const updated = [...workoutExercises];
    const targetSet = updated[exIndex].sets[setIndex];
    const isNowCompleted = !targetSet.completed;
    targetSet.completed = isNowCompleted;

    // Check PR
    const current1RM = estimateOneRepMax(targetSet.weight_kg, targetSet.reps);
    if (isNowCompleted && targetSet.weight_kg > 0 && current1RM > 0) {
      targetSet.is_pr = true;
    }

    setWorkoutExercises(updated);

    // If set completed, start Rest Timer
    if (isNowCompleted) {
      const routineEx = routine.exercises[exIndex];
      const restTime = routineEx?.rest_seconds || 90;
      setActiveRestSeconds(restTime);
    }
  };

  // Update set field
  const handleSetChange = (
    exIndex: number,
    setIndex: number,
    field: 'weight_kg' | 'reps' | 'set_type',
    value: unknown
  ) => {
    const updated = [...workoutExercises];
    updated[exIndex].sets[setIndex] = {
      ...updated[exIndex].sets[setIndex],
      [field]: value,
    };
    setWorkoutExercises(updated);
  };

  // Add set to exercise
  const handleAddSet = (exIndex: number) => {
    const updated = [...workoutExercises];
    const currentSets = updated[exIndex].sets;
    const lastSet = currentSets[currentSets.length - 1];
    const newSetNumber = currentSets.length + 1;

    currentSets.push({
      id: `set-${Date.now()}-${newSetNumber}`,
      exercise_log_id: updated[exIndex].id,
      set_number: newSetNumber,
      weight_kg: lastSet ? lastSet.weight_kg : 20,
      reps: lastSet ? lastSet.reps : 10,
      rpe: 8,
      set_type: 'normal',
      completed: false,
      is_pr: false,
    });

    setWorkoutExercises(updated);
  };

  // Remove set from exercise
  const handleRemoveSet = (exIndex: number, setIndex: number) => {
    const updated = [...workoutExercises];
    updated[exIndex].sets.splice(setIndex, 1);
    // re-index set numbers
    updated[exIndex].sets.forEach((s, i) => {
      s.set_number = i + 1;
    });
    setWorkoutExercises(updated);
  };

  // Calculate live stats
  let totalVolume = 0;
  let totalCompletedSets = 0;
  const prsFound: string[] = [];

  workoutExercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      if (s.completed) {
        totalCompletedSets += 1;
        totalVolume += s.weight_kg * s.reps;
        if (s.is_pr && !prsFound.includes(ex.exercise_name)) {
          prsFound.push(`${ex.exercise_name} (${s.weight_kg}kg x ${s.reps})`);
        }
      }
    });
  });

  // Finish and save workout
  const handleCompleteWorkout = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const finalLog: WorkoutLog = {
      id: `wlog-${Date.now()}`,
      routine_id: routine.id,
      title: routine.title,
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      duration_minutes: Math.max(1, Math.round(secondsElapsed / 60)),
      total_volume_kg: totalVolume,
      total_sets_completed: totalCompletedSets,
      exercises: workoutExercises,
      rpe_overall: rpeOverall,
      notes,
      prs_broken: prsFound,
    };

    appStorage.saveWorkoutLog(finalLog);
    onFinish(finalLog);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl overflow-y-auto">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-surface-border bg-surface-subtle/95 px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-surface-elevated hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-400">
              {routine.split_tag} • Treino Ativo
            </span>
            <h2 className="text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {routine.title}
            </h2>
          </div>
        </div>

        {/* Stopwatch & Finish CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-surface-card px-3 py-1.5 border border-surface-border">
            <TimerIcon className="h-4 w-4 text-primary-400 animate-pulse" />
            <span className="font-mono text-base font-bold text-white">
              {formatDurationDigital(secondsElapsed)}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-400 hover:text-white"
            >
              {isPaused ? <Play className="h-4 w-4 text-primary-400" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>

          <button
            onClick={handleCompleteWorkout}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-4 py-2 text-xs sm:text-sm font-black text-black shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-95"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Finalizar</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="mx-auto w-full max-w-4xl px-4 pt-4">
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-surface-card p-3 border border-surface-border/80">
          <div className="text-center">
            <span className="text-[11px] font-semibold text-gray-400">Tonelagem Total</span>
            <p className="text-lg font-black text-white">
              {totalVolume.toLocaleString()} <span className="text-xs text-primary-400 font-normal">kg</span>
            </p>
          </div>
          <div className="text-center border-x border-surface-border">
            <span className="text-[11px] font-semibold text-gray-400">Séries Feitas</span>
            <p className="text-lg font-black text-primary-400">
              {totalCompletedSets}
            </p>
          </div>
          <div className="text-center">
            <span className="text-[11px] font-semibold text-gray-400">Recordes (PRs)</span>
            <p className="text-lg font-black text-accent-orange">
              {prsFound.length}
            </p>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-4 pb-32">
        {workoutExercises.map((exLog, exIndex) => {
          const routineEx = routine.exercises[exIndex];
          const isExpanded = expandedIndex === exIndex;

          // Compute progressive overload suggestion
          const progression = analyzeExerciseProgression(
            exLog.exercise_id,
            exLog.exercise_name,
            routineEx?.target_reps_min || 8,
            routineEx?.target_reps_max || 12,
            routineEx?.target_weight_kg || 20,
            exLog.sets
          );

          return (
            <div
              key={exLog.id}
              className="card-athletic overflow-hidden border-surface-border bg-surface-card"
            >
              {/* Exercise Header Card */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? -1 : exIndex)}
                className="flex cursor-pointer items-center justify-between p-4 hover:bg-surface-elevated/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 font-bold text-sm">
                    {exIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{exLog.exercise_name}</h3>
                    <p className="text-xs text-gray-400">
                      Meta: {routineEx?.target_sets || 3}x {routineEx?.target_reps_min}-{routineEx?.target_reps_max} reps @ {routineEx?.target_weight_kg || 0}kg • Descanso {routineEx?.rest_seconds || 90}s
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (routineEx?.exercise) {
                        setPreviewExercise(routineEx.exercise);
                      } else {
                        setPreviewExercise({
                          id: exLog.exercise_id,
                          name: exLog.exercise_name,
                          primary_muscle: 'peito',
                          secondary_muscles: [],
                          equipment: 'barra',
                          focus: 'hipertrofia',
                          description: 'Execução do exercício com cadência controlada.',
                          execution_cues: ['Postura correta', 'Respiração cadenciada'],
                          common_mistakes: ['Evitar roubo com o corpo'],
                        });
                      }
                    }}
                    className="rounded-lg bg-primary-500/15 border border-primary-500/30 px-2 py-1 text-[11px] font-bold text-primary-400 hover:bg-primary-500/25 flex items-center gap-1"
                  >
                    <Play className="h-3 w-3 fill-primary-400" />
                    <span>Ver GIF</span>
                  </button>

                  <span className="rounded-full bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-gray-300">
                    {exLog.sets.filter((s) => s.completed).length}/{exLog.sets.length} séries
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Sets Section */}
              {isExpanded && (
                <div className="border-t border-surface-border p-4 space-y-4">
                  {/* Intelligent progression alert if qualified */}
                  {progression.type === 'increase_load' && (
                    <div className="rounded-xl border border-primary-500/40 bg-primary-500/10 p-3 text-xs text-primary-300 font-medium">
                      {progression.reason}
                    </div>
                  )}

                  {/* Notes / Tips */}
                  {routineEx?.notes && (
                    <p className="rounded-xl bg-surface-elevated/60 px-3 py-2 text-xs text-amber-300">
                      💡 <strong>Dica:</strong> {routineEx.notes}
                    </p>
                  )}

                  {/* Sets Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-surface-border text-gray-400 font-bold uppercase tracking-wider">
                          <th className="pb-2 w-12 text-center">Série</th>
                          <th className="pb-2 w-28">Tipo</th>
                          <th className="pb-2 w-24">Carga (kg)</th>
                          <th className="pb-2 w-20">Reps</th>
                          <th className="pb-2 w-20 text-center">1RM Est.</th>
                          <th className="pb-2 w-16 text-center">Status</th>
                          <th className="pb-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-border/50">
                        {exLog.sets.map((set, setIndex) => {
                          const est1RM = estimateOneRepMax(set.weight_kg, set.reps);
                          return (
                            <tr
                              key={set.id}
                              className={set.completed ? 'bg-primary-500/5' : ''}
                            >
                              {/* Set number */}
                              <td className="py-2.5 text-center font-bold text-gray-300">
                                {set.set_number}
                              </td>

                              {/* Set type selector */}
                              <td className="py-2.5 pr-2">
                                <select
                                  value={set.set_type}
                                  onChange={(e) =>
                                    handleSetChange(exIndex, setIndex, 'set_type', e.target.value)
                                  }
                                  className="rounded-lg bg-surface-elevated border border-surface-border px-2 py-1 text-xs text-gray-200 outline-none focus:border-primary-500"
                                >
                                  <option value="normal">Normal</option>
                                  <option value="aquecimento">Aquecimento</option>
                                  <option value="dropset">Drop Set</option>
                                  <option value="biset">Bi-Set</option>
                                  <option value="rest_pause">Rest Pause</option>
                                  <option value="falha">Até a Falha</option>
                                </select>
                              </td>

                              {/* Weight Input */}
                              <td className="py-2.5 pr-2">
                                <div className="flex items-center">
                                  <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    value={set.weight_kg === 0 ? '' : set.weight_kg}
                                    placeholder="0"
                                    onChange={(e) =>
                                      handleSetChange(
                                        exIndex,
                                        setIndex,
                                        'weight_kg',
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                    className="w-20 rounded-lg bg-surface-elevated border border-surface-border px-2.5 py-1.5 text-center font-bold text-white outline-none focus:border-primary-500"
                                  />
                                </div>
                              </td>

                              {/* Reps Input */}
                              <td className="py-2.5 pr-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={set.reps === 0 ? '' : set.reps}
                                  placeholder="0"
                                  onChange={(e) =>
                                    handleSetChange(
                                      exIndex,
                                      setIndex,
                                      'reps',
                                      parseInt(e.target.value, 10) || 0
                                    )
                                  }
                                  className="w-16 rounded-lg bg-surface-elevated border border-surface-border px-2.5 py-1.5 text-center font-bold text-white outline-none focus:border-primary-500"
                                />
                              </td>

                              {/* 1RM calculation */}
                              <td className="py-2.5 text-center font-mono font-semibold text-gray-400">
                                {est1RM > 0 ? `${est1RM}kg` : '-'}
                              </td>

                              {/* Completed toggle checkbox */}
                              <td className="py-2.5 text-center">
                                <button
                                  onClick={() => handleToggleSet(exIndex, setIndex)}
                                  className={`inline-flex h-8 w-8 items-center justify-center rounded-xl font-bold transition-all ${
                                    set.completed
                                      ? 'bg-primary-500 text-black shadow-md shadow-primary-500/30 scale-105'
                                      : 'bg-surface-elevated text-gray-400 border border-surface-border hover:border-primary-500'
                                  }`}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                              </td>

                              {/* Delete set */}
                              <td className="py-2.5 text-right">
                                {exLog.sets.length > 1 && (
                                  <button
                                    onClick={() => handleRemoveSet(exIndex, setIndex)}
                                    className="text-gray-500 hover:text-red-400 p-1"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Add set button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleAddSet(exIndex)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-surface-border px-3 py-1.5 text-xs font-semibold text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Adicionar Série</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Overall Notes & Perceived Effort (RPE) */}
        <div className="card-athletic p-4 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-primary-400" />
            Avaliação Geral do Treino
          </h4>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Percepção de Esforço (RPE):</span>
              <span className="font-bold text-white">{rpeOverall}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={rpeOverall}
              onChange={(e) => setRpeOverall(parseInt(e.target.value, 10))}
              className="w-full accent-primary-500 cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Anotações do Treino:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Treino muito produtivo, carga no supino subiu com facilidade..."
              rows={2}
              className="w-full rounded-xl bg-surface-elevated border border-surface-border p-2.5 text-xs text-white outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Floating Rest Timer if triggered */}
      {activeRestSeconds !== null && (
        <RestTimerOverlay
          initialSeconds={activeRestSeconds}
          onClose={() => setActiveRestSeconds(null)}
          onFinish={() => setActiveRestSeconds(null)}
        />
      )}

      {/* Floating GIF / Execution Preview Modal */}
      {previewExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-surface-card p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-primary-400">Guia de Execução no Treino</span>
                <h3 className="text-base font-bold text-white">{previewExercise.name}</h3>
              </div>
              <button
                onClick={() => setPreviewExercise(null)}
                className="rounded-xl p-1.5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ExerciseVisualPlayer exercise={previewExercise} />

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setPreviewExercise(null)}
                className="rounded-xl bg-primary-500 px-4 py-2 text-xs font-bold text-black hover:bg-primary-400"
              >
                Voltar ao Treino
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
