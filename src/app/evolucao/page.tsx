'use client';

import React from 'react';
import { EVOLUTION_SERIES } from '@/services/dataService';
import { WeightChart } from '@/components/evolution/WeightChart';
import { VolumeChart } from '@/components/evolution/VolumeChart';
import { RecordHighlights } from '@/components/evolution/RecordHighlights';
import { Card } from '@/components/ui/Card';
import { TrendingUp, Scale, Flame, Trophy, Activity, Calendar } from 'lucide-react';

export default function EvolutionDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
            PERFORMANCE & MÉTRICAS
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-1">
            Dashboard de Evolução
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-medium mt-0.5">
            Acompanhamento contínuo de sobrecarga mecânica, composição corporal e recordes pessoais.
          </p>
        </div>
      </div>

      {/* Record Highlights Cards (Maior evolução, Novo recorde, Melhor sequência) */}
      <RecordHighlights />

      {/* Main Charts: Weight & Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeightChart data={EVOLUTION_SERIES} />
        <VolumeChart data={EVOLUTION_SERIES} />
      </div>

      {/* Biometric Body Measurements Grid */}
      <Card className="p-6 bg-[#181818] border-[#292929] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#292929]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
              Histórico de Perimetria
            </span>
            <h3 className="font-display font-black text-xl text-[#F5F5F5] uppercase tracking-tight">
              Medidas Corporais (cm)
            </h3>
          </div>
          <span className="text-xs font-mono text-[#777777]">Atualizado em 01/10/2026</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929]">
            <span className="text-[10px] uppercase font-bold text-[#777777]">Tórax</span>
            <p className="text-xl font-black font-display text-white mt-1">105.0 cm</p>
            <span className="text-[10px] font-bold text-emerald-400 mt-1 block">+3.0 cm</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929]">
            <span className="text-[10px] uppercase font-bold text-[#777777]">Cintura</span>
            <p className="text-xl font-black font-display text-white mt-1">82.0 cm</p>
            <span className="text-[10px] font-bold text-emerald-400 mt-1 block">-2.0 cm</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929]">
            <span className="text-[10px] uppercase font-bold text-[#777777]">Braço Direito</span>
            <p className="text-xl font-black font-display text-[#FF6500] mt-1">39.5 cm</p>
            <span className="text-[10px] font-bold text-emerald-400 mt-1 block">+2.0 cm</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929]">
            <span className="text-[10px] uppercase font-bold text-[#777777]">Coxa Direita</span>
            <p className="text-xl font-black font-display text-white mt-1">62.5 cm</p>
            <span className="text-[10px] font-bold text-emerald-400 mt-1 block">+2.5 cm</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
