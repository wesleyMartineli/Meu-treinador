'use client';

import React from 'react';
import { WorkoutSetRecord } from '@/types';
import { Check, Flame, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ExerciseSetRowProps {
  set: WorkoutSetRecord;
  suggestedWeight?: number;
  onUpdate: (updated: Partial<WorkoutSetRecord>) => void;
  onToggleComplete: () => void;
}

export function ExerciseSetRow({
  set,
  suggestedWeight,
  onUpdate,
  onToggleComplete,
}: ExerciseSetRowProps) {
  return (
    <div
      className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
        set.completed
          ? 'bg-[#141414] border-[#292929] opacity-90'
          : 'bg-[#181818] border-[#292929] hover:border-[#3D3D3D]'
      }`}
    >
      {/* Set Number & Previous Info */}
      <div className="flex items-center gap-3 w-28 shrink-0">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#121212] border border-[#292929] text-xs font-mono font-bold text-[#F5F5F5]">
          {set.setNumber}
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Alvo</span>
          <span className="text-xs font-mono text-[#B8B8B8] font-bold">
            {suggestedWeight ? `${suggestedWeight}kg` : 'Livre'}
          </span>
        </div>
      </div>

      {/* Inputs: Carga (kg) & Repetições & RPE */}
      <div className="flex items-center gap-2.5 flex-1 max-w-sm">
        <div className="flex-1">
          <label className="block text-[9px] uppercase font-bold text-[#777777] mb-1">
            Carga (kg)
          </label>
          <input
            type="number"
            value={set.weightKg === 0 ? '' : set.weightKg}
            onChange={(e) => onUpdate({ weightKg: Number(e.target.value) || 0 })}
            placeholder="0"
            className="w-full rounded-lg bg-[#121212] border border-[#292929] px-2.5 py-1.5 text-xs font-mono font-bold text-[#F5F5F5] focus:border-[#FF6500] focus:outline-none text-center"
          />
        </div>

        <div className="flex-1">
          <label className="block text-[9px] uppercase font-bold text-[#777777] mb-1">
            Reps
          </label>
          <input
            type="number"
            value={set.reps === 0 ? '' : set.reps}
            onChange={(e) => onUpdate({ reps: Number(e.target.value) || 0 })}
            placeholder="0"
            className="w-full rounded-lg bg-[#121212] border border-[#292929] px-2.5 py-1.5 text-xs font-mono font-bold text-[#F5F5F5] focus:border-[#FF6500] focus:outline-none text-center"
          />
        </div>

        <div className="w-20">
          <label className="block text-[9px] uppercase font-bold text-[#777777] mb-1">
            RPE
          </label>
          <select
            value={set.rpe ?? 8}
            onChange={(e) => onUpdate({ rpe: Number(e.target.value) })}
            className="w-full rounded-lg bg-[#121212] border border-[#292929] px-2 py-1.5 text-xs font-mono font-bold text-[#F5F5F5] focus:border-[#FF6500] focus:outline-none"
          >
            {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map((r) => (
              <option key={r} value={r} className="bg-[#181818]">
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Set Complete Action Button */}
      <div className="shrink-0 w-full sm:w-auto">
        <button
          onClick={onToggleComplete}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            set.completed
              ? 'bg-[#121212] border border-emerald-800/40 text-emerald-400'
              : 'bg-[#FF6500] hover:bg-[#FF8A00] text-white shadow-orange-glow-sm'
          }`}
        >
          <Check className={`h-4 w-4 ${set.completed ? 'text-emerald-400' : 'text-white'}`} />
          <span>{set.completed ? 'Concluída' : 'Concluir Série'}</span>
        </button>
      </div>
    </div>
  );
}
