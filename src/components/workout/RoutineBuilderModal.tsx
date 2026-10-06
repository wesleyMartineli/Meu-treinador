'use client';

import React from 'react';
import {
  X,
  Plus,
  Trash2,
  Save,
  Dumbbell,
  Clock,
  Repeat,
  Weight,
  Layers,
  Search,
} from 'lucide-react';
import { WorkoutRoutine, RoutineExercise, Exercise, SetType } from '@/types/database';
import { appStorage } from '@/lib/storage';

interface RoutineBuilderModalProps {
  routineToEdit?: WorkoutRoutine | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (routine: WorkoutRoutine) => void;
  onDelete?: (id: string) => void;
}

export function RoutineBuilderModal({
  routineToEdit,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: RoutineBuilderModalProps) {
  const [title, setTitle] = React.useState(routineToEdit?.title || 'Novo Treino');
  const [subtitle, setSubtitle] = React.useState(routineToEdit?.subtitle || '');
  const [splitTag, setSplitTag] = React.useState(routineToEdit?.split_tag || 'Treino A');
  const [dayOfWeek, setDayOfWeek] = React.useState<number>(routineToEdit?.day_of_week ?? 1);
  const [color, setColor] = React.useState(routineToEdit?.color || '#3b82f6');
  const [exercises, setExercises] = React.useState<RoutineExercise[]>(
    routineToEdit?.exercises || []
  );

  // Exercise picker modal state
  const [isExercisePickerOpen, setIsExercisePickerOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const allExercises = React.useMemo(() => appStorage.getExercises(), []);

  React.useEffect(() => {
    if (routineToEdit) {
      setTitle(routineToEdit.title);
      setSubtitle(routineToEdit.subtitle || '');
      setSplitTag(routineToEdit.split_tag);
      setDayOfWeek(routineToEdit.day_of_week ?? 1);
      setColor(routineToEdit.color || '#3b82f6');
      setExercises(routineToEdit.exercises);
    } else {
      setTitle('Treino A — Foco em Peitoral & Tríceps');
      setSubtitle('Hipertrofia e força');
      setSplitTag('Treino A');
      setDayOfWeek(1);
      setColor('#3b82f6');
      setExercises([]);
    }
  }, [routineToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddExerciseToRoutine = (exercise: Exercise) => {
    const newRoutineEx: RoutineExercise = {
      id: `re-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      routine_id: routineToEdit?.id || 'new-routine',
      exercise_id: exercise.id,
      exercise: exercise,
      order_index: exercises.length,
      target_sets: 3,
      target_reps_min: 8,
      target_reps_max: 12,
      target_weight_kg: 20,
      rest_seconds: 90,
      set_type: 'normal',
      notes: '',
    };
    setExercises([...exercises, newRoutineEx]);
    setIsExercisePickerOpen(false);
    setSearchQuery('');
  };

  const handleUpdateExercise = (index: number, field: keyof RoutineExercise, value: unknown) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const routine: WorkoutRoutine = {
      id: routineToEdit?.id || `rotina-${Date.now()}`,
      title,
      subtitle,
      split_tag: splitTag,
      day_of_week: dayOfWeek,
      color,
      exercises,
      created_at: routineToEdit?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    appStorage.saveRoutine(routine);
    onSave(routine);
  };

  const filteredExercises = allExercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primary_muscle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {routineToEdit ? 'Editar Treino' : 'Criar Nova Ficha de Treino'}
              </h2>
              <p className="text-xs text-gray-400">
                Personalize exercícios, séries, repetições e métodos avançados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-surface-elevated hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          {/* Basic metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-gray-300 block mb-1">Nome do Treino</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Treino A — Peito & Tríceps"
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-sm text-white outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Tag de Divisão</label>
              <input
                type="text"
                value={splitTag}
                onChange={(e) => setSplitTag(e.target.value)}
                placeholder="Treino A / B / C"
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-sm text-white outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Subtítulo / Objetivo</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Foco em empurrar e hipertrofia superior"
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-sm text-white outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Dia da Semana Recomendado</label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(parseInt(e.target.value, 10))}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-sm text-white outline-none focus:border-primary-500"
              >
                <option value={1}>Segunda-feira</option>
                <option value={2}>Terça-feira</option>
                <option value={3}>Quarta-feira</option>
                <option value={4}>Quinta-feira</option>
                <option value={5}>Sexta-feira</option>
                <option value={6}>Sábado</option>
                <option value={0}>Domingo</option>
              </select>
            </div>
          </div>

          {/* Exercises in Routine */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary-400" />
                Exercícios da Ficha ({exercises.length})
              </h3>
              <button
                type="button"
                onClick={() => setIsExercisePickerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary-500/10 border border-primary-500/30 px-3 py-1.5 text-xs font-bold text-primary-400 hover:bg-primary-500/20"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Exercício</span>
              </button>
            </div>

            {exercises.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center">
                <Dumbbell className="mx-auto h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm font-semibold text-gray-300">Nenhum exercício adicionado ainda</p>
                <p className="text-xs text-gray-500 mt-1">
                  Clique em &quot;Adicionar Exercício&quot; para selecionar da biblioteca
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {exercises.map((ex, index) => (
                  <div
                    key={ex.id}
                    className="rounded-2xl border border-surface-border bg-surface-elevated/70 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-surface-card text-xs font-bold text-gray-300">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {ex.exercise?.name || ex.exercise_id}
                        </h4>
                        <span className="rounded bg-primary-500/10 px-2 py-0.5 text-[10px] font-bold text-primary-400 uppercase">
                          {ex.exercise?.primary_muscle}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(index)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Exercise Parameters Config */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-semibold text-gray-400 block mb-1">
                          Séries
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={ex.target_sets}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'target_sets', parseInt(e.target.value, 10) || 1)
                          }
                          className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1 text-center font-bold text-white outline-none focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-gray-400 block mb-1">
                          Reps Alvo
                        </label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            value={ex.target_reps_min}
                            onChange={(e) =>
                              handleUpdateExercise(
                                index,
                                'target_reps_min',
                                parseInt(e.target.value, 10) || 1
                              )
                            }
                            className="w-full rounded-lg bg-surface-card border border-surface-border px-1.5 py-1 text-center font-bold text-white"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="number"
                            min="1"
                            value={ex.target_reps_max}
                            onChange={(e) =>
                              handleUpdateExercise(
                                index,
                                'target_reps_max',
                                parseInt(e.target.value, 10) || 1
                              )
                            }
                            className="w-full rounded-lg bg-surface-card border border-surface-border px-1.5 py-1 text-center font-bold text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-gray-400 block mb-1">
                          Carga Alvo (kg)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={ex.target_weight_kg || 0}
                          onChange={(e) =>
                            handleUpdateExercise(
                              index,
                              'target_weight_kg',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1 text-center font-bold text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-gray-400 block mb-1">
                          Descanso (s)
                        </label>
                        <input
                          type="number"
                          step="15"
                          min="0"
                          value={ex.rest_seconds}
                          onChange={(e) =>
                            handleUpdateExercise(
                              index,
                              'rest_seconds',
                              parseInt(e.target.value, 10) || 60
                            )
                          }
                          className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1 text-center font-bold text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-gray-400 block mb-1">
                          Técnica Especial
                        </label>
                        <select
                          value={ex.set_type}
                          onChange={(e) =>
                            handleUpdateExercise(index, 'set_type', e.target.value as SetType)
                          }
                          className="w-full rounded-lg bg-surface-card border border-surface-border px-1.5 py-1 text-xs text-white"
                        >
                          <option value="normal">Normal</option>
                          <option value="dropset">Drop Set</option>
                          <option value="biset">Bi-Set</option>
                          <option value="rest_pause">Rest Pause</option>
                          <option value="falha">Até a Falha</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <input
                        type="text"
                        value={ex.notes || ''}
                        placeholder="Observações (ex: última série até a falha, cadência 3-1-1)"
                        onChange={(e) => handleUpdateExercise(index, 'notes', e.target.value)}
                        className="w-full rounded-lg bg-surface-card border border-surface-border px-3 py-1.5 text-xs text-gray-300 placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 border-t border-surface-border pt-4">
          <div>
            {routineToEdit && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (routineToEdit.id) {
                    onDelete(routineToEdit.id);
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-900/40 bg-red-950/20 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Excluir Ficha</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-surface-border bg-surface-elevated px-4 py-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-5 py-2 text-xs sm:text-sm font-bold text-black shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-95"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Ficha</span>
            </button>
          </div>
        </div>

        {/* Nested Exercise Picker Modal */}
        {isExercisePickerOpen && (
          <div className="absolute inset-0 z-20 flex flex-col rounded-3xl bg-surface-card p-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="h-4 w-4 text-primary-400" />
                Selecionar Exercício
              </h3>
              <button
                onClick={() => setIsExercisePickerOpen(false)}
                className="rounded-xl p-1.5 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome ou músculo (ex: supino, costas, pernas)..."
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-xs text-white outline-none focus:border-primary-500"
                autoFocus
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleAddExerciseToRoutine(ex)}
                  className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-elevated/60 p-3 hover:border-primary-500/60 hover:bg-surface-elevated cursor-pointer transition-all"
                >
                  <div>
                    <h5 className="text-sm font-bold text-white">{ex.name}</h5>
                    <p className="text-[11px] text-gray-400">
                      Músculo: <span className="text-primary-400 capitalize">{ex.primary_muscle}</span> • Equipamento: {ex.equipment}
                    </p>
                  </div>
                  <span className="rounded-lg bg-primary-500/10 px-2 py-1 text-xs font-bold text-primary-400">
                    + Selecionar
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
