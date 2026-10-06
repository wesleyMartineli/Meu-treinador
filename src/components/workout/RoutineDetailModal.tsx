'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Dumbbell,
  Clock,
  Flame,
  Layers,
  Repeat,
  Weight,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Info,
  ChevronRight,
  CheckCircle2,
  Edit3,
  Save,
  RotateCcw,
  Check,
  Settings2,
  Trash2,
} from 'lucide-react';
import { WorkoutRoutine, RoutineExercise, Exercise, SetType } from '@/types/database';
import { appStorage } from '@/lib/storage';
import { getExerciseMedia } from '@/lib/exercise-media';
import { ExerciseVisualPlayer } from '@/components/exercises/ExerciseVisualPlayer';

interface RoutineDetailModalProps {
  isOpen: boolean;
  routine: WorkoutRoutine | null;
  onClose: () => void;
  onStartWorkout: (routine: WorkoutRoutine) => void;
  onEditFullRoutine?: (routine: WorkoutRoutine) => void;
  onRoutineUpdated?: (routine: WorkoutRoutine) => void;
  onDeleteRoutine?: (routine: WorkoutRoutine) => void;
}

export function RoutineDetailModal({
  isOpen,
  routine,
  onClose,
  onStartWorkout,
  onEditFullRoutine,
  onRoutineUpdated,
  onDeleteRoutine,
}: RoutineDetailModalProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isEditingParams, setIsEditingParams] = useState(false);
  const [currentExercises, setCurrentExercises] = useState<RoutineExercise[]>([]);
  const [hasSavedFeedback, setHasSavedFeedback] = useState(false);

  React.useEffect(() => {
    if (routine) {
      setCurrentExercises(routine.exercises || []);
      setIsEditingParams(false);
      setHasSavedFeedback(false);
    }
  }, [routine]);

  if (!isOpen || !routine) return null;

  // Resolve full exercise data
  const allExercises = appStorage.getExercises();

  const getFullExercise = (re: RoutineExercise): Exercise => {
    if (re.exercise && re.exercise.name) return re.exercise;
    const found = allExercises.find((e) => e.id === re.exercise_id);
    if (found) return found;
    return {
      id: re.exercise_id,
      name: re.exercise_id.replace(/-/g, ' ').toUpperCase(),
      primary_muscle: 'peito',
      secondary_muscles: [],
      equipment: 'halteres',
      focus: 'hipertrofia',
      description: 'Execução focada em controle de cadência e postura biomecânica.',
      execution_cues: ['Mantenha a postura alinhada e controle o movimento na descida.'],
      common_mistakes: ['Evite usar impulso exagerado ou cargas acima do controle.'],
    };
  };

  const handleUpdateParam = (
    index: number,
    field: keyof RoutineExercise,
    value: unknown
  ) => {
    const updated = [...currentExercises];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentExercises(updated);
  };

  const handleSaveCustomParams = () => {
    const updatedRoutine: WorkoutRoutine = {
      ...routine,
      exercises: currentExercises,
      updated_at: new Date().toISOString(),
    };

    appStorage.saveRoutine(updatedRoutine);
    if (onRoutineUpdated) {
      onRoutineUpdated(updatedRoutine);
    }

    setIsEditingParams(false);
    setHasSavedFeedback(true);
    setTimeout(() => setHasSavedFeedback(false), 3000);
  };

  const getSetTypeBadge = (setType?: string) => {
    switch (setType) {
      case 'dropset':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Drop Set
          </span>
        );
      case 'rest_pause':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Rest-Pause
          </span>
        );
      case 'biset':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Bi-Set
          </span>
        );
      case 'aquecimento':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            Aquecimento
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="relative w-full max-w-4xl bg-[#121212] border border-[#292929] rounded-2xl shadow-2xl z-10 my-6 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Glowing Top Accent */}
          <div className="h-1 bg-gradient-to-r from-[#FF6500] via-[#FF8800] to-[#FF6500]" />

          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#242424] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#161616]/90">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#FF6500]/15 text-[#FF6500] border border-[#FF6500]/30 font-mono">
                  {routine.split_tag}
                </span>
                <span className="text-xs text-[#777777] font-bold uppercase">
                  {currentExercises.length} Exercícios Estruturados
                </span>
                {hasSavedFeedback && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800 animate-fade-in">
                    <Check className="h-3 w-3" /> Alterações salvas!
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {routine.title}
              </h2>

              <p className="text-xs text-[#888888]">
                {routine.description || routine.subtitle || 'Rotina de hipertrofia e força periodizada.'}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-[#B8B8B8] pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#FF6500]" />
                  <span>~{currentExercises.length * 9} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span>~{currentExercises.length * 60} kcal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Dumbbell className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    {currentExercises.reduce((acc, curr) => acc + (curr.target_sets || 3), 0)} séries totais
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Toggle for Parameter Editing & Delete */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end flex-wrap">
              {onDeleteRoutine && (
                <button
                  type="button"
                  onClick={() => onDeleteRoutine(routine)}
                  className="px-3 py-2 rounded-xl bg-red-950/20 hover:bg-red-950/50 border border-red-900/40 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-all flex items-center gap-1.5"
                  title="Excluir esta ficha de treino"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Excluir</span>
                </button>
              )}

              {!isEditingParams ? (
                <button
                  type="button"
                  onClick={() => setIsEditingParams(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] border border-[#383838] text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF6500] transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="h-3.5 w-3.5 text-[#FF6500]" />
                  Personalizar
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentExercises(routine.exercises || []);
                      setIsEditingParams(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#222222] text-xs font-bold uppercase text-[#999999] hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustomParams}
                    className="px-4 py-2 rounded-xl bg-[#FF6500] hover:bg-[#e05800] text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Salvar Metas
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#777777] hover:text-white hover:bg-[#222222] transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Informational Sub-Bar */}
          <div className="px-5 py-2.5 bg-[#141414] border-b border-[#222222] flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FF6500]" />
              {isEditingParams
                ? 'Modo de Edição Ativo: Altere séries, repetições, carga e descanso abaixo'
                : 'Sequência de Exercícios da Sessão'}
            </span>
            <span className="text-[11px] text-[#FF6500] font-mono hidden sm:inline-block">
              {isEditingParams
                ? 'Clique em "Salvar Metas" para confirmar'
                : 'Clique no exercício ou no GIF para ver a biomecânica'}
            </span>
          </div>

          {/* Exercise List Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 divide-y divide-[#222222]/60">
            {currentExercises.map((re, index) => {
              const fullEx = getFullExercise(re);
              const media = getExerciseMedia(fullEx.id, fullEx.primary_muscle);
              const setTypeBadge = getSetTypeBadge(re.set_type);

              return (
                <div
                  key={re.id || `${re.exercise_id}-${index}`}
                  className={`pt-3.5 group flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-3.5 rounded-xl bg-[#161616] border transition-all duration-200 ${
                    isEditingParams
                      ? 'border-[#FF6500]/30 bg-[#171717]'
                      : 'hover:bg-[#1a1a1a] border-[#262626] hover:border-[#FF6500]/50 cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!isEditingParams) setSelectedExercise(fullEx);
                  }}
                >
                  {/* Left: Index + GIF Thumbnail + Name */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#222222] group-hover:bg-[#FF6500] text-xs font-black text-[#888888] group-hover:text-black transition-colors font-mono">
                      {index + 1}
                    </span>

                    {/* Thumbnail GIF preview */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExercise(fullEx);
                      }}
                      className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-black border border-[#2c2c2c] group-hover:border-[#FF6500]/40 transition-all flex items-center justify-center cursor-pointer"
                      title="Ver demonstração em GIF"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={media.gifUrl || media.coverImage}
                        alt={fullEx.name}
                        className="h-full w-full object-contain p-1"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono font-bold text-[#FF6500]">
                        GIF
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-display font-black text-sm sm:text-base text-white group-hover:text-[#FF6500] transition-colors truncate">
                          {fullEx.name}
                        </h4>
                        {setTypeBadge}
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#777777] font-medium">
                        <span className="text-[#FF6500] font-bold uppercase">
                          {fullEx.primary_muscle}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{fullEx.equipment.replace('_', ' ')}</span>
                        {fullEx.focus && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{fullEx.focus}</span>
                          </>
                        )}
                      </div>

                      {re.notes && (
                        <p className="text-[11px] text-[#999999] mt-1 line-clamp-1 italic">
                          💡 {re.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Parameter Controls (Interactive or Display Mode) */}
                  <div
                    className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#222222]"
                    onClick={(e) => isEditingParams && e.stopPropagation()}
                  >
                    {!isEditingParams ? (
                      /* Read-only Display Mode */
                      <div className="flex items-center gap-2.5 text-xs font-mono">
                        <div className="px-2.5 py-1.5 rounded-lg bg-[#202020] border border-[#2d2d2d] text-center">
                          <span className="text-[9px] text-[#777777] block uppercase">Séries</span>
                          <span className="font-black text-white text-xs">
                            {re.target_sets || 3}x
                          </span>
                        </div>

                        <div className="px-2.5 py-1.5 rounded-lg bg-[#202020] border border-[#2d2d2d] text-center">
                          <span className="text-[9px] text-[#777777] block uppercase">Reps</span>
                          <span className="font-black text-[#FF6500] text-xs">
                            {re.target_reps_min}
                            {re.target_reps_max && re.target_reps_max !== re.target_reps_min
                              ? `-${re.target_reps_max}`
                              : ''}
                          </span>
                        </div>

                        {re.target_weight_kg !== undefined && re.target_weight_kg > 0 && (
                          <div className="px-2.5 py-1.5 rounded-lg bg-[#202020] border border-[#2d2d2d] text-center">
                            <span className="text-[9px] text-[#777777] block uppercase">Carga</span>
                            <span className="font-black text-white text-xs">
                              {re.target_weight_kg}kg
                            </span>
                          </div>
                        )}

                        <div className="px-2.5 py-1.5 rounded-lg bg-[#202020] border border-[#2d2d2d] text-center">
                          <span className="text-[9px] text-[#777777] block uppercase">Descanso</span>
                          <span className="font-black text-gray-300 text-xs">
                            {re.rest_seconds || 60}s
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Interactive Edit Inputs Mode */
                      <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                        {/* Sets Input */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-[#777777] uppercase font-bold">Séries</span>
                          <input
                            type="number"
                            min={1}
                            max={12}
                            value={re.target_sets || 3}
                            onChange={(e) =>
                              handleUpdateParam(index, 'target_sets', Math.max(1, Number(e.target.value)))
                            }
                            className="w-14 text-center rounded-lg bg-[#111111] border border-[#FF6500]/50 px-1 py-1.5 text-xs text-white font-black focus:outline-none focus:border-[#FF6500]"
                          />
                        </div>

                        {/* Reps Min */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-[#777777] uppercase font-bold">Reps Mín</span>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={re.target_reps_min || 8}
                            onChange={(e) =>
                              handleUpdateParam(index, 'target_reps_min', Math.max(1, Number(e.target.value)))
                            }
                            className="w-16 text-center rounded-lg bg-[#111111] border border-[#FF6500]/50 px-1 py-1.5 text-xs text-[#FF6500] font-black focus:outline-none focus:border-[#FF6500]"
                          />
                        </div>

                        {/* Reps Max */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-[#777777] uppercase font-bold">Reps Máx</span>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={re.target_reps_max || re.target_reps_min || 12}
                            onChange={(e) =>
                              handleUpdateParam(index, 'target_reps_max', Math.max(1, Number(e.target.value)))
                            }
                            className="w-16 text-center rounded-lg bg-[#111111] border border-[#FF6500]/50 px-1 py-1.5 text-xs text-[#FF6500] font-black focus:outline-none focus:border-[#FF6500]"
                          />
                        </div>

                        {/* Load (kg) */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-[#777777] uppercase font-bold">Carga (kg)</span>
                          <input
                            type="number"
                            step="0.5"
                            min={0}
                            max={500}
                            value={re.target_weight_kg ?? 0}
                            onChange={(e) =>
                              handleUpdateParam(index, 'target_weight_kg', Number(e.target.value))
                            }
                            className="w-16 text-center rounded-lg bg-[#111111] border border-[#383838] px-1 py-1.5 text-xs text-white font-black focus:outline-none focus:border-[#FF6500]"
                          />
                        </div>

                        {/* Rest (s) */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] text-[#777777] uppercase font-bold">Descanso(s)</span>
                          <input
                            type="number"
                            step="5"
                            min={0}
                            max={600}
                            value={re.rest_seconds || 60}
                            onChange={(e) =>
                              handleUpdateParam(index, 'rest_seconds', Number(e.target.value))
                            }
                            className="w-16 text-center rounded-lg bg-[#111111] border border-[#383838] px-1 py-1.5 text-xs text-gray-300 font-black focus:outline-none focus:border-[#FF6500]"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExercise(fullEx);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#FF6500]/15 hover:bg-[#FF6500] text-[#FF6500] hover:text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Ver GIF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer with Main Action */}
          <div className="p-4 sm:p-6 border-t border-[#242424] bg-[#161616] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {onEditFullRoutine && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEditFullRoutine(routine);
                  }}
                  className="text-xs font-bold uppercase text-[#777777] hover:text-[#FF6500] transition-colors flex items-center gap-1.5"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  Abrir Construtor de Rotinas Completo
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#222222] hover:bg-[#2a2a2a] text-xs font-bold text-white uppercase tracking-wider transition-colors"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartWorkout(routine);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#FF8800] hover:brightness-110 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FF6500]/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Play className="h-4 w-4 fill-black" />
                Iniciar Este Treino Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Exercise Detail & GIF Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedExercise(null)}
          />

          <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2d2d2d] rounded-2xl shadow-2xl z-20 my-6 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#262626] flex items-center justify-between gap-4 bg-[#181818]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] block">
                  GUIA TÉCNICO & DEMONSTRAÇÃO
                </span>
                <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                  {selectedExercise.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 rounded-xl text-[#777777] hover:text-white hover:bg-[#222222] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {/* GIF Animation Player */}
              <ExerciseVisualPlayer exercise={selectedExercise} />

              {/* Anatomy and Focus Information */}
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#292929] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500]">
                    🎯 Foco Muscular Primário
                  </span>
                  <span className="text-xs font-black uppercase text-white">
                    {selectedExercise.primary_muscle}
                  </span>
                </div>

                {selectedExercise.secondary_muscles &&
                  selectedExercise.secondary_muscles.length > 0 && (
                    <div className="pt-2 border-t border-[#292929] flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-[#777777] font-bold uppercase">
                        Sinergistas:
                      </span>
                      {selectedExercise.secondary_muscles.map((sec, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#222222] border border-[#333333] text-[#CCCCCC] uppercase"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  )}

                <p className="text-xs text-[#999999] leading-relaxed pt-1">
                  {selectedExercise.description}
                </p>
              </div>

              {/* Step-by-Step Cues */}
              {selectedExercise.execution_cues && selectedExercise.execution_cues.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-white block">
                    Passo a Passo de Execução:
                  </span>
                  <div className="space-y-2">
                    {selectedExercise.execution_cues.map((cue, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#181818] border border-[#282828]"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#FF6500]/15 text-[#FF6500] text-xs font-mono font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-[#D1D1D6] leading-relaxed">{cue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Mistakes */}
              {selectedExercise.common_mistakes &&
                selectedExercise.common_mistakes.length > 0 && (
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-display uppercase tracking-wider">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>Erros Comuns a Evitar:</span>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {selectedExercise.common_mistakes.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                          <span className="text-red-400 font-bold">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#262626] bg-[#181818] flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                className="px-5 py-2.5 rounded-xl bg-[#FF6500] hover:bg-[#e05800] text-black font-black text-xs uppercase tracking-wider transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
