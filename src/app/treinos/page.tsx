'use client';

import React from 'react';
import { appStorage } from '@/lib/storage';
import { ActiveWorkoutModal } from '@/components/workout/ActiveWorkoutModal';
import { RoutineBuilderModal } from '@/components/workout/RoutineBuilderModal';
import { RoutineDetailModal } from '@/components/workout/RoutineDetailModal';
import {
  Dumbbell,
  Play,
  Plus,
  Flame,
  Clock,
  Eye,
  Calendar,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { WorkoutRoutine } from '@/types/database';
import Link from 'next/link';

export default function TreinosPage() {
  const [routines, setRoutines] = React.useState<WorkoutRoutine[]>(appStorage.getRoutines());
  const [activeRoutine, setActiveRoutine] = React.useState<WorkoutRoutine | null>(null);
  const [detailRoutine, setDetailRoutine] = React.useState<WorkoutRoutine | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = React.useState(false);
  const [routineToDelete, setRoutineToDelete] = React.useState<WorkoutRoutine | null>(null);

  React.useEffect(() => {
    setRoutines(appStorage.getRoutines());
  }, []);

  const allExercises = appStorage.getExercises();

  const getExerciseName = (exId: string, exObj?: { name?: string }) => {
    if (exObj && exObj.name) return exObj.name;
    const found = allExercises.find((e) => e.id === exId);
    return found ? found.name : exId.replace(/-/g, ' ');
  };

  const handleConfirmDelete = () => {
    if (!routineToDelete) return;
    appStorage.deleteRoutine(routineToDelete.id);
    setRoutines(appStorage.getRoutines());
    if (detailRoutine?.id === routineToDelete.id) {
      setDetailRoutine(null);
    }
    setRoutineToDelete(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header Banner - Minimalist */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] px-2 py-0.5 bg-[#FF6500]/10 rounded border border-[#FF6500]/20 font-mono">
              Fichas de Treino
            </span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
            Fichas & <span className="text-[#FF6500]">Rotinas</span>
          </h1>
          <p className="text-xs text-[#777777] mt-0.5 max-w-2xl font-medium">
            Gerencie suas fichas e exercícios. Para alocar em quais dias da semana treinar, use o <strong>Calendário</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/calendario">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#141414] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#FF6500]/40 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all shrink-0"
            >
              <Calendar className="h-3.5 w-3.5 text-[#FF6500]" />
              Montar Calendário
            </button>
          </Link>

          <button
            onClick={() => {
              setDetailRoutine(null);
              setIsBuilderOpen(true);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6500] hover:bg-[#e05800] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all shrink-0 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            Nova Ficha
          </button>
        </div>
      </div>

      {/* Routine Cards Grid - Minimalist */}
      {routines.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#111111] border border-[#222222] space-y-4">
          <Dumbbell className="h-10 w-10 text-[#555555] mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white uppercase">Nenhuma ficha cadastrada</h3>
            <p className="text-xs text-[#777777] mt-1">Crie uma nova ficha de treino personalizada para começar.</p>
          </div>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF6500] hover:bg-[#e05800] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            Criar Minha Primeira Ficha
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.map((routine) => {
            const totalExercises = routine.exercises.length;
            const previewExercises = routine.exercises.slice(0, 3);
            const remainingCount = totalExercises - 3;

            return (
              <div
                key={routine.id}
                onClick={() => setDetailRoutine(routine)}
                className="flex flex-col justify-between p-5 bg-[#111111] border border-[#1f1f1f] hover:border-[#FF6500]/40 rounded-2xl transition-all duration-200 cursor-pointer group relative"
              >
                <div className="space-y-3.5">
                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-[#FF6500]/10 text-[#FF6500] border border-[#FF6500]/20">
                      {routine.split_tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#666666]">
                        {totalExercises} exercícios
                      </span>
                      <button
                        type="button"
                        title="Excluir Ficha"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRoutineToDelete(routine);
                        }}
                        className="p-1 rounded-lg text-[#666666] hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/40 transition-all shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#FF6500] transition-colors line-clamp-1">
                      {routine.title}
                    </h3>
                    <p className="text-xs text-[#777777] mt-0.5 line-clamp-1">
                      {routine.description || routine.subtitle || 'Rotina de hipertrofia estruturada.'}
                    </p>
                  </div>

                  {/* Exercises Quick List */}
                  <div className="space-y-1 pt-1">
                    {previewExercises.map((re, idx) => (
                      <div
                        key={re.id || idx}
                        className="text-xs text-[#999999] flex items-center justify-between py-1 px-2.5 rounded-lg bg-[#0e0e0e] border border-[#1a1a1a]"
                      >
                        <span className="truncate pr-2 font-medium">
                          {getExerciseName(re.exercise_id, re.exercise)}
                        </span>
                        <span className="text-[10px] font-mono text-[#FF6500] shrink-0 font-bold">
                          {re.target_sets || 3}x
                        </span>
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <span className="text-[10px] text-[#666666] font-mono pl-1 block">
                        + {remainingCount} outro{remainingCount > 1 ? 's' : ''} exercício{remainingCount > 1 ? 's' : ''}...
                      </span>
                    )}
                  </div>

                  {/* Time & Calories strip */}
                  <div className="flex items-center justify-between text-[11px] text-[#666666] pt-2.5 border-t border-[#1a1a1a] font-mono">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#FF6500]" />
                      <span>~{routine.exercises.length * 9} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-amber-500" />
                      <span>~{routine.exercises.length * 60} kcal</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailRoutine(routine);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#171717] hover:bg-[#202020] border border-[#262626] py-2 text-xs font-bold text-[#CCCCCC] hover:text-white uppercase tracking-wider transition-all"
                  >
                    <Eye className="h-3 w-3 text-[#FF6500]" />
                    Ver GIFs
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRoutine(routine);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6500] hover:bg-[#e05800] py-2 text-xs font-bold uppercase tracking-wider text-black transition-all active:scale-95"
                  >
                    <Play className="h-3 w-3 fill-black" />
                    Treinar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Routine Detail & Exercise Preview Modal */}
      <RoutineDetailModal
        isOpen={Boolean(detailRoutine)}
        routine={detailRoutine}
        onClose={() => setDetailRoutine(null)}
        onStartWorkout={(routine) => {
          setDetailRoutine(null);
          setActiveRoutine(routine);
        }}
        onEditFullRoutine={(routine) => {
          setDetailRoutine(null);
          setIsBuilderOpen(true);
        }}
        onDeleteRoutine={(routine) => {
          setRoutineToDelete(routine);
        }}
        onRoutineUpdated={(updated) => {
          setRoutines(appStorage.getRoutines());
          setDetailRoutine(updated);
        }}
      />

      {/* Live Active Workout Tracker Modal */}
      {activeRoutine && (
        <ActiveWorkoutModal
          isOpen={Boolean(activeRoutine)}
          routine={activeRoutine}
          onClose={() => setActiveRoutine(null)}
          onFinish={() => setActiveRoutine(null)}
        />
      )}

      {/* Custom Routine Builder */}
      <RoutineBuilderModal
        routineToEdit={detailRoutine}
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onDelete={(id) => {
          appStorage.deleteRoutine(id);
          setRoutines(appStorage.getRoutines());
          setIsBuilderOpen(false);
          setDetailRoutine(null);
        }}
        onSave={() => {
          setRoutines(appStorage.getRoutines());
          setIsBuilderOpen(false);
        }}
      />

      {/* Confirmation Modal for Deletion */}
      {routineToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl bg-[#141414] border border-[#2a2a2a] p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/40">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase tracking-tight">
                Excluir Ficha de Treino?
              </h3>
            </div>

            <p className="text-xs text-[#888888] leading-relaxed">
              Tem certeza que deseja excluir a ficha <strong className="text-white font-bold">{routineToDelete.title}</strong>? Esta ação removerá a ficha e seus exercícios da sua lista.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222222]">
              <button
                type="button"
                onClick={() => setRoutineToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2b2b2b] text-xs font-bold uppercase tracking-wider text-[#999999] hover:text-white transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Sim, Excluir Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
