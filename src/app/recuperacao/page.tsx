'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { appStorage } from '@/lib/storage';
import { DailyCheckinModal } from '@/components/recovery/DailyCheckinModal';
import { Moon, Zap, Smile, Plus } from 'lucide-react';

export default function RecuperacaoPage() {
  const [checkins, setCheckins] = React.useState(appStorage.getRecoveryCheckins());
  const [isCheckinOpen, setIsCheckinOpen] = React.useState(false);

  React.useEffect(() => {
    setCheckins(appStorage.getRecoveryCheckins());
  }, []);

  const latest = checkins[checkins.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
              Recuperação & <span className="text-accent-emerald">Readiness</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Avaliação de prontidão neural, qualidade de sono, dor muscular (DOMS) e estresse.
            </p>
          </div>

          <button
            onClick={() => setIsCheckinOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            Check-in Diário
          </button>
        </div>

        <div className="card-athletic p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-emerald">
              Índice de Prontidão para o Treino
            </span>
            <div className="text-4xl font-display font-extrabold text-white">
              {latest ? `${latest.readiness_total}/100` : '92/100'} — Excelente
            </div>
            <p className="text-xs text-gray-400 max-w-md">
              Seu corpo está recuperado e pronto para treinos de alta intensidade hoje. Boa qualidade de sono reportada.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-surface-elevated p-4 text-center border border-surface-border">
              <Moon className="h-5 w-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white">{latest?.sleep_score || 8}/10</div>
              <div className="text-[10px] text-gray-400">Sono</div>
            </div>
            <div className="rounded-xl bg-surface-elevated p-4 text-center border border-surface-border">
              <Zap className="h-5 w-5 text-amber-400 mx-auto mb-1" />
              <div className="text-base font-bold text-white">{latest?.energy_score || 8}/10</div>
              <div className="text-[10px] text-gray-400">Energia</div>
            </div>
            <div className="rounded-xl bg-surface-elevated p-4 text-center border border-surface-border">
              <Smile className="h-5 w-5 text-accent-emerald mx-auto mb-1" />
              <div className="text-base font-bold text-white">{latest?.stress_score || 3}/10</div>
              <div className="text-[10px] text-gray-400">Estresse</div>
            </div>
          </div>
        </div>
      </main>

      <DailyCheckinModal
        isOpen={isCheckinOpen}
        onClose={() => setIsCheckinOpen(false)}
        onSaved={() => {
          setCheckins(appStorage.getRecoveryCheckins());
          setIsCheckinOpen(false);
        }}
      />
    </div>
  );
}
