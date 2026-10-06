'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Trophy, Dumbbell, Zap, Flame } from 'lucide-react';
import { appStorage } from '@/lib/storage';

export default function RelatoriosPage() {
  const [report] = React.useState(appStorage.getWeeklyReport());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Relatórios de <span className="text-primary-500">Performance</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Análise consolidada de volume semanal, tonelagem levantada e consistência mensal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-athletic p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs">Tonelagem Semanal</span>
              <Dumbbell className="h-4 w-4 text-primary-500" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              {report.total_tonnage_kg.toLocaleString()} kg
            </div>
            <p className="text-[11px] text-emerald-400">+{report.volume_increase_percent}% vs. semana anterior</p>
          </div>

          <div className="card-athletic p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs">Treinos Concluídos</span>
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              {report.total_workouts} sessões
            </div>
            <p className="text-[11px] text-emerald-400">100% de aderência</p>
          </div>

          <div className="card-athletic p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs">Distância Corrida</span>
              <Zap className="h-4 w-4 text-accent-cyan" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              {report.total_running_km} km
            </div>
            <p className="text-[11px] text-emerald-400">Ritmo médio em Zona 2</p>
          </div>

          <div className="card-athletic p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs">Variação de Peso</span>
              <Flame className="h-4 w-4 text-rose-500" />
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              {report.weight_delta_kg} kg
            </div>
            <p className="text-[11px] text-gray-400">Preservação de massa magra</p>
          </div>
        </div>
      </main>
    </div>
  );
}
