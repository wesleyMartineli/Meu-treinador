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
  Plus,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Search,
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
  const [currentExercises, setCurrentExercises] = useState<RoutineExercise[]>([]);
  const [hasSavedFeedback, setHasSavedFeedback] = useState(false);

  // Exercise picker state (for adding or swapping)
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
  const [swappingExerciseIndex, setSwappingExerciseIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (routine) {
      const seen = new Set<string>();
      const deduped = (routine.exercises || []).filter((ex) => {
        const id = ex.exercise?.id || ex.exercise_id;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      setCurrentExercises(deduped);
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

  const handlePersistChanges = (exercisesToSave: RoutineExercise[]) => {
    const seen = new Set<string>();
    const deduped = exercisesToSave.filter((ex) => {
      const id = ex.exercise?.id || ex.exercise_id;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    const updatedRoutine: WorkoutRoutine = {
      ...routine,
      exercises: deduped,
      updated_at: new Date().toISOString(),
    };

    appStorage.saveRoutine(updatedRoutine);
    setCurrentExercises(deduped);
    if (onRoutineUpdated) {
      onRoutineUpdated(updatedRoutine);
    }

    setHasSavedFeedback(true);
    setTimeout(() => setHasSavedFeedback(false), 2500);
  };

  const handleUpdateParam = (
    index: number,
    field: keyof RoutineExercise,
    value: unknown,
    persistImmediately: boolean = false
  ) => {
    const updated = [...currentExercises];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentExercises(updated);
    if (persistImmediately) {
      handlePersistChanges(updated);
    }
  };

  const handleRemoveExercise = (index: number) => {
    const updated = currentExercises.filter((_, i) => i !== index);
    handlePersistChanges(updated);
  };

  const handleMoveExercise = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentExercises.length) return;
    const updated = [...currentExercises];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const reindexed = updated.map((e, idx) => ({ ...e, order_index: idx }));
    handlePersistChanges(reindexed);
  };

  const handleOpenAddExercise = () => {
    setSwappingExerciseIndex(null);
    setSearchQuery('');
    setIsExercisePickerOpen(true);
  };

  const handleOpenSwapExercise = (index: number) => {
    setSwappingExerciseIndex(index);
    setSearchQuery('');
    setIsExercisePickerOpen(true);
  };

  const handleSelectPickerExercise = (exercise: Exercise) => {
    if (swappingExerciseIndex !== null) {
      const updated = [...currentExercises];
      updated[swappingExerciseIndex] = {
        ...updated[swappingExerciseIndex],
        exercise_id: exercise.id,
        exercise: exercise,
      };
      handlePersistChanges(updated);
      setSwappingExerciseIndex(null);
    } else {
      if (currentExercises.some((e) => (e.exercise?.id || e.exercise_id) === exercise.id)) {
        return;
      }
      const newRoutineEx: RoutineExercise = {
        id: `re-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        routine_id: routine.id,
        exercise_id: exercise.id,
        exercise: exercise,
        order_index: currentExercises.length,
        target_sets: 3,
        target_reps_min: 8,
        target_reps_max: 12,
        target_weight_kg: 20,
        rest_seconds: 90,
        set_type: 'normal',
        notes: '',
      };
      handlePersistChanges([...currentExercises, newRoutineEx]);
    }
    setIsExercisePickerOpen(false);
    setSearchQuery('');
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
      case 'falha':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
            Até a Falha
          </span>
        );
      default:
        return null;
    }
  };

  const filteredExercises = allExercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primary_muscle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800 animate-fade-in">
                    <Check className="h-3 w-3" /> Ficha salva com sucesso!
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

            {/* Top Action Controls */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end flex-wrap">
              {/* Add Exercise button */}
              <button
                type="button"
                onClick={handleOpenAddExercise}
                className="px-3.5 py-2 rounded-xl bg-[#FF6500]/15 hover:bg-[#FF6500] border border-[#FF6500]/30 text-xs font-bold uppercase tracking-wider text-[#FF6500] hover:text-black transition-all flex items-center gap-1.5"
                title="Adicionar novo exercício a esta ficha"
              >
                <Plus className="h-3.5 w-3.5 stroke-[3]" />
                <span>Adicionar Exercício</span>
              </button>

              {/* Manual Save Button */}
              <button
                type="button"
                onClick={() => handlePersistChanges(currentExercises)}
                className="px-3.5 py-2 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] border border-[#383838] text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF6500] transition-all flex items-center gap-1.5"
                title="Salvar todas as alterações"
              >
                <Save className="h-3.5 w-3.5 text-[#FF6500]" />
                <span>Salvar Ficha</span>
              </button>

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
              Edite Séries, Repetições, Carga (Peso) e Descanso diretamente abaixo
            </span>
            <span className="text-[11px] text-[#FF6500] font-mono hidden sm:inline-block">
              Valores são salvos automaticamente ao alterar
            </span>
          </div>

          {/* Exercise List Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {currentExercises.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-[#2b2b2b] bg-[#141414] space-y-3">
                <Dumbbell className="mx-auto h-8 w-8 text-[#555555]" />
                <p className="text-sm font-bold text-white uppercase">Nenhum exercício nesta ficha</p>
                <p className="text-xs text-[#777777]">Adicione exercícios para montar sua rotina de treinamento.</p>
                <button
                  type="button"
                  onClick={handleOpenAddExercise}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF6500] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#e05800] transition-all"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[3]" />
                  Adicionar Primeiro Exercício
                </button>
              </div>
            ) : (
              currentExercises.map((re, index) => {
                const fullEx = getFullExercise(re);
                const media = getExerciseMedia(fullEx.id, fullEx.primary_muscle);
                const setTypeBadge = getSetTypeBadge(re.set_type);

                return (
                  <div
                    key={re.id || `${re.exercise_id}-${index}`}
                    className="p-4 rounded-2xl bg-[#161616] border border-[#262626] hover:border-[#FF6500]/40 transition-all duration-200 space-y-3.5"
                  >
                    {/* Top Row: Reorder + GIF + Title + Action buttons (Swap / Delete / View GIF) */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      {/* Left side: Index + Order Buttons + GIF + Details */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Index and Reorder Arrows */}
                        <div className="flex flex-col items-center gap-0.5">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => handleMoveExercise(index, 'up')}
                              className="text-[#666666] hover:text-[#FF6500] p-0.5 hover:bg-[#222222] rounded transition-colors"
                              title="Mover para cima"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                          )}
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#222222] text-xs font-black text-[#888888] font-mono">
                            {index + 1}
                          </span>
                          {index < currentExercises.length - 1 && (
                            <button
                              type="button"
                              onClick={() => handleMoveExercise(index, 'down')}
                              className="text-[#666666] hover:text-[#FF6500] p-0.5 hover:bg-[#222222] rounded transition-colors"
                              title="Mover para baixo"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          )}
                        </div>

                        {/* Thumbnail GIF preview */}
                        <div
                          onClick={() => setSelectedExercise(fullEx)}
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
                            <h4
                              onClick={() => setSelectedExercise(fullEx)}
                              className="font-display font-black text-sm sm:text-base text-white hover:text-[#FF6500] transition-colors truncate cursor-pointer"
                            >
                              {fullEx.name}
                            </h4>
                            {setTypeBadge}
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#777777] font-medium">
                            <span className="text-[#FF6500] font-bold uppercase">
                              {fullEx.primary_muscle}
                            </span>
                            <span>•</span>
                            <span className="capitalize">{fullEx.equipment.replace(/_/g, ' ')}</span>
                            {fullEx.focus && (
                              <>
                                <span>•</span>
                                <span className="capitalize">{fullEx.focus}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side item action buttons: Swap, Delete, View GIF */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        {/* Swap Exercise Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenSwapExercise(index)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#202020] hover:bg-[#2a2a2a] border border-[#333333] text-[11px] font-bold uppercase text-[#CCCCCC] hover:text-[#FF6500] transition-colors flex items-center gap-1"
                          title="Trocar este exercício por outro da biblioteca"
                        >
                          <RefreshCw className="h-3 w-3 text-[#FF6500]" />
                          <span>Trocar</span>
                        </button>

                        {/* Delete Exercise Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveExercise(index)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/50 border border-red-900/40 text-[11px] font-bold uppercase text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                          title="Remover exercício da ficha"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Excluir</span>
                        </button>

                        {/* View GIF */}
                        <button
                          type="button"
                          onClick={() => setSelectedExercise(fullEx)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FF6500]/15 hover:bg-[#FF6500] text-[#FF6500] hover:text-black text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          <span>GIF</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Direct Interactive Parameter Controls (Always Editable) */}
                    <div className="pt-3 border-t border-[#222222] space-y-2.5">
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                        {/* Séries */}
                        <div className="p-2 rounded-xl bg-[#111111] border border-[#292929] focus-within:border-[#FF6500] transition-colors">
                          <label className="text-[9px] text-[#777777] block uppercase font-bold mb-1">
                            Séries
                          </label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={re.target_sets || 3}
                              onChange={(e) =>
                                handleUpdateParam(index, 'target_sets', Math.max(1, Number(e.target.value)), true)
                              }
                              onBlur={() => handlePersistChanges(currentExercises)}
                              className="w-full bg-transparent text-sm font-black text-white focus:outline-none"
                            />
                            <span className="text-xs text-[#777777] font-bold pr-1">x</span>
                          </div>
                        </div>

                        {/* Repetições (Reps) */}
                        <div className="p-2 rounded-xl bg-[#111111] border border-[#292929] focus-within:border-[#FF6500] transition-colors">
                          <label className="text-[9px] text-[#777777] block uppercase font-bold mb-1">
                            Repetições (Reps)
                          </label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={re.target_reps_min || 8}
                              onChange={(e) =>
                                handleUpdateParam(index, 'target_reps_min', Math.max(1, Number(e.target.value)), true)
                              }
                              onBlur={() => handlePersistChanges(currentExercises)}
                              className="w-full bg-transparent text-sm font-black text-[#FF6500] focus:outline-none"
                              title="Reps mínimas"
                            />
                            <span className="text-xs text-[#666666]">-</span>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={re.target_reps_max || re.target_reps_min || 12}
                              onChange={(e) =>
                                handleUpdateParam(index, 'target_reps_max', Math.max(1, Number(e.target.value)), true)
                              }
                              onBlur={() => handlePersistChanges(currentExercises)}
                              className="w-full bg-transparent text-sm font-black text-[#FF6500] focus:outline-none"
                              title="Reps máximas"
                            />
                          </div>
                        </div>

                        {/* Carga / Peso (kg) */}
                        <div className="p-2 rounded-xl bg-[#111111] border border-[#292929] focus-within:border-[#FF6500] transition-colors">
                          <label className="text-[9px] text-[#777777] block uppercase font-bold mb-1">
                            Carga (Peso kg)
                          </label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              step="0.5"
                              min={0}
                              max={500}
                              value={re.target_weight_kg ?? 0}
                              onChange={(e) =>
                                handleUpdateParam(index, 'target_weight_kg', Math.max(0, Number(e.target.value)), true)
                              }
                              onBlur={() => handlePersistChanges(currentExercises)}
                              className="w-full bg-transparent text-sm font-black text-white focus:outline-none"
                            />
                            <span className="text-xs text-[#777777] font-bold pr-1">kg</span>
                          </div>
                        </div>

                        {/* Descanso (s) */}
                        <div className="p-2 rounded-xl bg-[#111111] border border-[#292929] focus-within:border-[#FF6500] transition-colors">
                          <label className="text-[9px] text-[#777777] block uppercase font-bold mb-1">
                            Descanso (s)
                          </label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              step="5"
                              min={0}
                              max={600}
                              value={re.rest_seconds || 60}
                              onChange={(e) =>
                                handleUpdateParam(index, 'rest_seconds', Math.max(0, Number(e.target.value)), true)
                              }
                              onBlur={() => handlePersistChanges(currentExercises)}
                              className="w-full bg-transparent text-sm font-black text-gray-300 focus:outline-none"
                            />
                            <span className="text-xs text-[#777777] font-bold pr-1">s</span>
                          </div>
                        </div>

                        {/* Técnica Especial */}
                        <div className="p-2 rounded-xl bg-[#111111] border border-[#292929] focus-within:border-[#FF6500] transition-colors">
                          <label className="text-[9px] text-[#777777] block uppercase font-bold mb-1">
                            Técnica
                          </label>
                          <select
                            value={re.set_type || 'normal'}
                            onChange={(e) =>
                              handleUpdateParam(index, 'set_type', e.target.value as SetType, true)
                            }
                            className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                          >
                            <option value="normal" className="bg-[#181818] text-white">Normal</option>
                            <option value="dropset" className="bg-[#181818] text-white">Drop Set</option>
                            <option value="biset" className="bg-[#181818] text-white">Bi-Set</option>
                            <option value="rest_pause" className="bg-[#181818] text-white">Rest Pause</option>
                            <option value="falha" className="bg-[#181818] text-white">Até a Falha</option>
                            <option value="aquecimento" className="bg-[#181818] text-white">Aquecimento</option>
                          </select>
                        </div>
                      </div>

                      {/* Notes / Observações input */}
                      <div>
                        <input
                          type="text"
                          value={re.notes || ''}
                          placeholder="Observações do exercício (ex: última série até a falha, cadência 3-1-1)..."
                          onChange={(e) => handleUpdateParam(index, 'notes', e.target.value)}
                          onBlur={() => handlePersistChanges(currentExercises)}
                          className="w-full rounded-xl bg-[#111111] border border-[#242424] px-3 py-1.5 text-xs text-gray-300 placeholder:text-[#555555] focus:outline-none focus:border-[#FF6500]/50 font-sans"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Quick Add Button at bottom of list */}
            {currentExercises.length > 0 && (
              <button
                type="button"
                onClick={handleOpenAddExercise}
                className="w-full py-3 rounded-xl border border-dashed border-[#2f2f2f] hover:border-[#FF6500]/60 bg-[#141414]/50 hover:bg-[#181818] text-xs font-bold uppercase tracking-wider text-[#888888] hover:text-[#FF6500] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>Adicionar Mais Exercícios a Esta Ficha</span>
              </button>
            )}
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

      {/* Nested Exercise Picker Modal (for Add or Swap) */}
      {isExercisePickerOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setIsExercisePickerOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2d2d2d] rounded-2xl shadow-2xl z-20 my-6 overflow-hidden max-h-[85vh] flex flex-col">
            {/* Picker Header */}
            <div className="p-5 border-b border-[#262626] flex items-center justify-between gap-4 bg-[#181818]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] block">
                  {swappingExerciseIndex !== null ? 'SUBSTITUIR EXERCÍCIO' : 'ADICIONAR À FICHA'}
                </span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                  {swappingExerciseIndex !== null ? 'Escolha o Novo Exercício' : 'Selecionar da Biblioteca'}
                </h3>
              </div>
              <button
                onClick={() => setIsExercisePickerOpen(false)}
                className="p-2 rounded-xl text-[#777777] hover:text-white hover:bg-[#222222] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-[#222222] bg-[#161616]">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#777777]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nome ou músculo (ex: supino, costas, pernas)..."
                  className="w-full rounded-xl bg-[#111111] border border-[#2f2f2f] pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-[#FF6500]"
                  autoFocus
                />
              </div>
            </div>

            {/* Exercise List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredExercises.map((ex) => {
                const isAlreadyAdded =
                  swappingExerciseIndex !== null
                    ? currentExercises.some(
                        (e, i) =>
                          i !== swappingExerciseIndex &&
                          (e.exercise?.id || e.exercise_id) === ex.id
                      )
                    : currentExercises.some(
                        (e) => (e.exercise?.id || e.exercise_id) === ex.id
                      );

                return (
                  <div
                    key={ex.id}
                    onClick={() => {
                      if (!isAlreadyAdded) {
                        handleSelectPickerExercise(ex);
                      }
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                      isAlreadyAdded
                        ? 'border-[#222222] bg-[#121212] opacity-50 cursor-not-allowed select-none'
                        : 'border-[#262626] bg-[#181818] hover:border-[#FF6500]/60 hover:bg-[#202020] cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-white">{ex.name}</h5>
                        {isAlreadyAdded && (
                          <span className="rounded bg-[#252525] border border-[#333333] px-1.5 py-0.5 text-[10px] font-semibold text-[#888888]">
                            Já na ficha
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#777777] mt-0.5">
                        Músculo: <span className="text-[#FF6500] uppercase font-semibold">{ex.primary_muscle}</span> • Equipamento: {ex.equipment.replace(/_/g, ' ')}
                      </p>
                    </div>

                    {isAlreadyAdded ? (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                        Adicionado
                      </span>
                    ) : (
                      <span className="rounded-lg bg-[#FF6500]/15 hover:bg-[#FF6500] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6500] hover:text-black transition-colors">
                        {swappingExerciseIndex !== null ? 'Substituir' : '+ Selecionar'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Nested Exercise Detail & GIF Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
