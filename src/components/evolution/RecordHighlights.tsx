'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Trophy, TrendingUp, Flame, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { appStorage } from '@/lib/storage';

export function RecordHighlights() {
  const { user: authUser } = useAuth();
  const profile = authUser || appStorage.getProfile();

  const benchPr = profile?.bench_pr_kg || 0;
  const deadliftPr = profile?.deadlift_pr_kg || 0;
  const squatPr = profile?.squat_pr_kg || 0;
  const streak = profile?.streak_days || 0;

  const highlights = [
    {
      title: 'Supino Reto (PR)',
      value: benchPr > 0 ? `${benchPr} kg no Supino` : '0 kg registrado',
      subtitle: benchPr > 0 ? 'Carga de referência cadastrada no perfil' : 'Execute uma sessão para registrar seu 1º PR',
      badge: benchPr > 0 ? 'PR ATUAL' : 'INÍCIO',
      badgeTrend: 'up' as const,
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
    {
      title: 'Recorde Principal',
      value: deadliftPr > 0
        ? `Terra ${deadliftPr} kg`
        : squatPr > 0
        ? `Agachamento ${squatPr} kg`
        : 'Aguardando 1º PR',
      subtitle: (deadliftPr > 0 || squatPr > 0)
        ? 'Marca de referência estabelecida'
        : 'Registre suas marcas nos exercícios compostos',
      badge: (deadliftPr > 0 || squatPr > 0) ? 'RECORD' : 'PENDENTE',
      badgeTrend: 'up' as const,
      icon: Trophy,
      color: 'text-[#FF6500]',
    },
    {
      title: 'Melhor Sequência',
      value: `${streak} Dias`,
      subtitle: streak > 0 ? 'Consistência ativa de treinos' : 'Inicie seus treinos hoje para acumular dias seguidos',
      badge: streak > 0 ? 'SEQUÊNCIA' : '0 DIAS',
      badgeTrend: 'up' as const,
      icon: Flame,
      color: 'text-[#FF8A00]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {highlights.map((h) => {
        const Icon = h.icon;
        return (
          <Card
            key={h.title}
            className="p-6 bg-[#181818] border-[#292929] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
                {h.title}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#121212] border border-[#292929] text-[#FF6500]">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-xl sm:text-2xl text-[#F5F5F5] tracking-tight">
                  {h.value}
                </span>
              </div>
              <p className="text-xs text-[#777777] mt-1 font-medium">{h.subtitle}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#292929] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8] px-2 py-0.5 rounded bg-[#222222] border border-[#2E2E2E]">
                {h.badge}
              </span>
              <span className="text-[11px] font-bold text-[#FF6500] flex items-center gap-0.5">
                Progresso real
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
