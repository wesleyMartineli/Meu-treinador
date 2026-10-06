'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Trophy, Clock, Dumbbell, Layers, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WorkoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutTitle: string;
  durationSeconds: number;
  totalExercises: number;
  totalSets: number;
  totalVolumeKg: number;
  caloriesBurned?: number; // apenas se dado real disponivel
  newPrsCount?: number;
}

export function WorkoutSummaryModal({
  isOpen,
  onClose,
  workoutTitle,
  durationSeconds,
  totalExercises,
  totalSets,
  totalVolumeKg,
  caloriesBurned,
  newPrsCount = 1,
}: WorkoutSummaryModalProps) {
  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="TREINO CONCLUÍDO"
      subtitle="Sessão finalizada e registrada no seu histórico de evolução."
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Celebration Banner with Athletic Highlighting */}
        <div className="rounded-2xl bg-gradient-to-b from-[#1E1E1E] to-[#121212] border border-[#FF6500]/40 p-6 text-center shadow-orange-glow relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6500] text-white shadow-orange-glow">
              <Trophy className="h-7 w-7" />
            </div>
          </div>

          <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#FF6500]">
            CONSISTÊNCIA EM RESULTADO
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-black text-[#F5F5F5] uppercase tracking-tight mt-1">
            {workoutTitle}
          </h3>

          {newPrsCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/40 text-[#FF6500] text-xs font-bold font-display uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{newPrsCount} Novo Recorde Pessoal Batido!</span>
            </div>
          )}
        </div>

        {/* Real Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] text-center">
            <div className="flex justify-center text-[#777777] mb-1">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#777777]">Tempo</span>
            <p className="text-base sm:text-lg font-black font-display text-white mt-0.5">
              {formatDuration(durationSeconds)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] text-center">
            <div className="flex justify-center text-[#777777] mb-1">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#777777]">Exercícios</span>
            <p className="text-base sm:text-lg font-black font-display text-white mt-0.5">
              {totalExercises}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] text-center">
            <div className="flex justify-center text-[#777777] mb-1">
              <CheckCircle2 className="h-4 w-4 text-[#FF6500]" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#777777]">Séries</span>
            <p className="text-base sm:text-lg font-black font-display text-white mt-0.5">
              {totalSets}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] text-center">
            <div className="flex justify-center text-[#777777] mb-1">
              <Dumbbell className="h-4 w-4" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#777777]">Volume Total</span>
            <p className="text-base sm:text-lg font-black font-display text-[#FF6500] mt-0.5">
              {totalVolumeKg.toLocaleString()} kg
            </p>
          </div>
        </div>

        {/* Calorias (apenas se houver dado real disponivel) */}
        {caloriesBurned !== undefined && (
          <div className="p-3.5 rounded-xl bg-[#121212] border border-[#292929] flex items-center justify-between">
            <span className="text-xs font-bold text-[#B8B8B8] uppercase">Gasto Calórico Estimado</span>
            <span className="text-sm font-black font-display text-white">{caloriesBurned} kcal</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link href="/evolucao" className="w-full sm:flex-1" onClick={onClose}>
            <Button variant="secondary" size="md" className="w-full">
              Ver Evolução
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:flex-1" onClick={onClose}>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
