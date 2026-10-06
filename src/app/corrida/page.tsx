'use client';

import React from 'react';
import { appStorage } from '@/lib/storage';
import { RunningLoggerModal } from '@/components/running/RunningLoggerModal';
import { Zap, Plus, Activity, Clock, Flame } from 'lucide-react';

export default function CorridaPage() {
  const [runs, setRuns] = React.useState(appStorage.getRunningLogs());
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setRuns(appStorage.getRunningLogs());
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
              Treinamento de <span className="text-primary-500">Corrida & Cardio</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Registro de tiros, esteira, ritmo médio (pace) e frequência cardíaca.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            Registrar Corrida
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {runs.map((run) => {
            const formattedDate = run.date.includes('T')
              ? new Date(run.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
              : run.date;

            return (
              <div key={run.id} className="card-athletic p-6 space-y-4 hover:border-primary-500/40">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 px-3 py-1 text-xs font-bold uppercase">
                    {run.terrain === 'esteira' ? 'Esteira / Indoor' : 'Rua / Asfalto'}
                  </span>
                  <span className="text-xs text-gray-400">{formattedDate}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-display font-extrabold text-white">
                    {run.distance_km} <span className="text-sm font-normal text-gray-400">km</span>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">{run.title || 'Sessão de Corrida'}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-surface-border text-center">
                  <div>
                    <div className="text-sm font-bold text-white">{run.pace_min_per_km}</div>
                    <div className="text-[10px] text-gray-400">Pace Médio</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{Math.round(run.duration_seconds / 60)} min</div>
                    <div className="text-[10px] text-gray-400">Tempo</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary-400">{Math.round(run.distance_km * 65)} kcal</div>
                    <div className="text-[10px] text-gray-400">Calorias</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      <RunningLoggerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => {
          setRuns(appStorage.getRunningLogs());
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
