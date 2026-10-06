'use client';

import React from 'react';
import { WorkoutPlan, WorkoutSetRecord } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RestTimer } from './RestTimer';
import { ExerciseSetRow } from './ExerciseSetRow';
import { WorkoutSummaryModal } from './WorkoutSummaryModal';
import {
  Dumbbell,
  Clock,
  CheckCircle2,
  Plus,
  Play,
  Flame,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ActiveWorkoutViewProps {
  workout: WorkoutPlan;
}

export function ActiveWorkoutView({ workout }: ActiveWorkoutViewProps) {
  const [exercisesState, setExercisesState] = React.useState(workout.exercises);
  const [activeExerciseIndex, setActiveExerciseIndex] = React.useState(0);
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState(true);
  const [showSummaryModal, setShowSummaryModal] = React.useState(false);

  // Elapsed workout session timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const currentExerciseState = exercisesState[activeExerciseIndex];

  const handleUpdateSet = (
    exerciseIdx: number,
    setIdx: number,
    updated: Partial<WorkoutSetRecord>
  ) => {
    setExercisesState((prev) => {
      const next = [...prev];
      const ex = { ...next[exerciseIdx] };
      const sets = [...ex.sets];
      sets[setIdx] = { ...sets[setIdx], ...updated };
      ex.sets = sets;
      next[exerciseIdx] = ex;
      return next;
    });
  };

  const handleToggleCompleteSet = (exerciseIdx: number, setIdx: number) => {
    setExercisesState((prev) => {
      const next = [...prev];
      const ex = { ...next[exerciseIdx] };
      const sets = [...ex.sets];
      sets[setIdx] = { ...sets[setIdx], completed: !sets[setIdx].completed };
      ex.sets = sets;
      next[exerciseIdx] = ex;
      return next;
    });
  };

  const handleAddSet = (exerciseIdx: number) => {
    setExercisesState((prev) => {
      const next = [...prev];
      const ex = { ...next[exerciseIdx] };
      const lastSet = ex.sets[ex.sets.length - 1];
      const newSet: WorkoutSetRecord = {
        id: `s-custom-${Date.now()}`,
        setNumber: ex.sets.length + 1,
        weightKg: lastSet ? lastSet.weightKg : 0,
        reps: lastSet ? lastSet.reps : 10,
        rpe: 8,
        completed: false,
      };
      ex.sets = [...ex.sets, newSet];
      next[exerciseIdx] = ex;
      return next;
    });
  };

  // Calculations
  const totalSetsCount = exercisesState.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSetsCount = exercisesState.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
    0
  );
  const totalVolumeKg = exercisesState.reduce((acc, ex) => {
    return (
      acc +
      ex.sets.reduce((sAcc, s) => (s.completed ? sAcc + s.weightKg * s.reps : sAcc), 0)
    );
  }, 0);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(
    totalSetsCount > 0 ? (completedSetsCount / totalSetsCount) * 100 : 0
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-6">
      {/* Top Session Progress Bar */}
      <div className="rounded-2xl bg-[#181818] border border-[#292929] p-5 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-[#FF6500] px-2 py-0.5 bg-[#FF6500]/10 rounded border border-[#FF6500]/20">
                {workout.splitTag}
              </span>
              <span className="text-xs text-[#777777] font-mono">
                {completedSetsCount}/{totalSetsCount} séries concluídas
              </span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-[#F5F5F5] uppercase tracking-tight mt-1">
              {workout.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121212] border border-[#292929] font-mono text-sm font-bold text-[#F5F5F5]">
              <Clock className="h-4 w-4 text-[#FF6500]" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsTimerRunning(false);
                setShowSummaryModal(true);
              }}
            >
              Concluir Treino
            </Button>
          </div>
        </div>

        {/* Linear Progress Indicator */}
        <div className="w-full bg-[#292929] h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF6500] transition-all duration-300 shadow-orange-glow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Rest Timer Widget */}
      <RestTimer initialSeconds={currentExerciseState?.exercise.restSeconds || 90} />

      {/* Exercise Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {exercisesState.map((exState, idx) => {
          const isCurrent = activeExerciseIndex === idx;
          const isDone = exState.sets.every((s) => s.completed);

          return (
            <button
              key={exState.exercise.id}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 ${
                isCurrent
                  ? 'bg-[#181818] border-[#FF6500] text-[#FF6500] shadow-orange-glow-sm'
                  : isDone
                  ? 'bg-[#141414] border-emerald-800/40 text-emerald-400'
                  : 'bg-[#121212] border-[#292929] text-[#777777] hover:text-[#F5F5F5]'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#222222] text-[10px]">
                {idx + 1}
              </span>
              <span className="truncate max-w-[140px]">{exState.exercise.name}</span>
              {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Current Active Exercise Card */}
      {currentExerciseState && (
        <Card className="p-5 sm:p-6 bg-[#181818] border-[#292929] space-y-6">
          {/* Header of Exercise */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#292929]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] px-2 py-0.5 bg-[#FF6500]/10 rounded border border-[#FF6500]/20">
                  {currentExerciseState.exercise.muscleGroup}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                  {currentExerciseState.exercise.equipment}
                </span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#F5F5F5] uppercase tracking-tight">
                {currentExerciseState.exercise.name}
              </h3>
              <p className="text-xs text-[#777777] mt-0.5 font-medium">
                Meta: {currentExerciseState.exercise.targetSets} séries de {currentExerciseState.exercise.targetReps} reps • Descanso {currentExerciseState.exercise.restSeconds}s
              </p>
            </div>

            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#292929] text-xs font-bold text-[#B8B8B8] hover:text-white transition-colors"
            >
              <Info className="h-3.5 w-3.5 text-[#FF6500]" />
              <span>Instruções</span>
              {showInstructions ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Technical Execution Instructions (Collapsible) */}
          {showInstructions && (
            <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] space-y-2 text-xs text-[#B8B8B8]">
              <span className="font-bold text-[#F5F5F5] uppercase text-[11px] block">
                Pontos de Execução & Técnica:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-[#777777]">
                {currentExerciseState.exercise.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Set Logger Rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#777777] px-2">
              <span>Séries Programadas</span>
              <span>Carga & Repetições Realizadas</span>
            </div>

            {currentExerciseState.sets.map((setRecord, setIdx) => (
              <ExerciseSetRow
                key={setRecord.id}
                set={setRecord}
                suggestedWeight={currentExerciseState.exercise.suggestedWeightKg}
                onUpdate={(upd) => handleUpdateSet(activeExerciseIndex, setIdx, upd)}
                onToggleComplete={() => handleToggleCompleteSet(activeExerciseIndex, setIdx)}
              />
            ))}
          </div>

          {/* Add Extra Set & Next Exercise Actions */}
          <div className="pt-3 border-t border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAddSet(activeExerciseIndex)}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Adicionar Série
            </Button>

            {activeExerciseIndex < exercisesState.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveExerciseIndex(activeExerciseIndex + 1)}
              >
                Próximo Exercício
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsTimerRunning(false);
                  setShowSummaryModal(true);
                }}
              >
                Finalizar Treino
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Summary Modal on Finished Workout */}
      <WorkoutSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        workoutTitle={workout.title}
        durationSeconds={elapsedSeconds}
        totalExercises={exercisesState.length}
        totalSets={completedSetsCount}
        totalVolumeKg={totalVolumeKg}
        newPrsCount={1}
      />
    </div>
  );
}
