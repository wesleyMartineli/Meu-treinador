'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MascotIllustration } from '@/components/ui/MascotIllustration';
import {
  Trophy,
  Dumbbell,
  Flame,
  Zap,
  ShieldCheck,
  Crown,
  Award,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { appStorage } from '@/lib/storage';
import { AchievementItem } from '@/types';

function getAchievementIcon(iconName: string) {
  switch (iconName) {
    case 'Dumbbell':
      return Dumbbell;
    case 'Flame':
      return Flame;
    case 'Trophy':
      return Trophy;
    case 'Crown':
      return Crown;
    case 'Zap':
      return Zap;
    case 'ShieldCheck':
      return ShieldCheck;
    default:
      return Award;
  }
}

export default function AchievementsPage() {
  const { user: authUser } = useAuth();
  const profile = authUser || appStorage.getProfile();
  const workoutLogs = appStorage.getWorkoutLogs();

  const totalWorkouts = profile?.total_workouts_completed || workoutLogs.length || 0;
  const streakDays = profile?.streak_days || 0;
  const hasPr = (profile?.bench_pr_kg || 0) > 0 || (profile?.squat_pr_kg || 0) > 0 || (profile?.deadlift_pr_kg || 0) > 0;

  const achievements: AchievementItem[] = [
    {
      id: 'ac-1',
      title: 'Primeiro Treino',
      description: 'Completou a primeira sessão na plataforma.',
      unlocked: totalWorkouts >= 1,
      iconName: 'Dumbbell',
      badgeLevel: 'bronze',
    },
    {
      id: 'ac-2',
      title: '10 Treinos Concluídos',
      description: 'Construindo o hábito da disciplina.',
      unlocked: totalWorkouts >= 10,
      iconName: 'Flame',
      badgeLevel: 'bronze',
    },
    {
      id: 'ac-3',
      title: '30 Treinos de Consistência',
      description: 'Manteve a rotina de alta performance.',
      unlocked: totalWorkouts >= 30,
      iconName: 'Trophy',
      badgeLevel: 'silver',
    },
    {
      id: 'ac-4',
      title: '100 Treinos — Modo Atleta',
      description: 'Consistência inabalável e evolução sólida.',
      unlocked: totalWorkouts >= 100,
      iconName: 'Crown',
      badgeLevel: 'gold',
    },
    {
      id: 'ac-5',
      title: 'Primeiro Recorde Pessoal',
      description: 'Bateu novo PR em exercício composto.',
      unlocked: hasPr && totalWorkouts >= 1,
      iconName: 'Zap',
      badgeLevel: 'silver',
    },
    {
      id: 'ac-6',
      title: '7 Dias Consecutivos',
      description: 'Uma semana inteira de dedicação ativa.',
      unlocked: streakDays >= 7,
      iconName: 'ShieldCheck',
      badgeLevel: 'silver',
    },
    {
      id: 'ac-7',
      title: '30 Dias de Consistência',
      description: 'Transformou disciplina em resultado inquestionável.',
      unlocked: streakDays >= 30,
      iconName: 'Award',
      badgeLevel: 'special',
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
            GAMIFICAÇÃO & MARCOS HISTÓRICOS
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-1">
            Conquistas & Badges MT
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-medium mt-0.5">
            Cada marco representa sua dedicação inegociável aos treinos de alta intensidade.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181818] border border-[#292929]">
          <Trophy className="h-4 w-4 text-[#FF6500]" />
          <span className="text-xs font-mono font-bold text-[#F5F5F5]">
            {unlockedCount} de {achievements.length} Desbloqueadas
          </span>
        </div>
      </div>

      {/* Strategic Mascot Showcase Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#181818] via-[#1E1E1E] to-[#181818] border border-[#FF6500]/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-orange-glow">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/30 text-[10px] font-display font-bold uppercase tracking-wider text-[#FF6500]">
            <Crown className="h-3.5 w-3.5" />
            <span>Status Atual: {unlockedCount > 0 ? 'Atleta em Evolução' : 'Início de Jornada'}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            DISCIPLINA GERA <span className="text-[#FF6500]">RESULTADOS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B8B8] max-w-lg font-medium leading-relaxed">
            {unlockedCount > 0
              ? `Você desbloqueou ${unlockedCount} marco(s) importante(s). Continue firme na sua rotina para liberar novos badges!`
              : 'Registre seus treinos e sobrecargas para começar a desbloquear suas conquistas e badges exclusivos!'}
          </p>
        </div>

        <div className="shrink-0">
          <MascotIllustration variant="badge" className="w-48 sm:w-56" />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const Icon = getAchievementIcon(ach.iconName);

          return (
            <Card
              key={ach.id}
              className={`p-6 border flex flex-col justify-between space-y-6 transition-all duration-200 ${
                ach.unlocked
                  ? 'bg-[#181818] border-[#292929] hover:border-[#FF6500]/40 hover:bg-[#1C1C1C]'
                  : 'bg-[#121212]/80 border-[#202020] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    ach.unlocked
                      ? 'bg-[#121212] border-[#FF6500]/40 text-[#FF6500] shadow-orange-glow-sm'
                      : 'bg-[#141414] border-[#252525] text-[#555555]'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {ach.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Desbloqueada
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#777777] bg-[#181818] border border-[#292929] px-2 py-0.5 rounded uppercase">
                    <Lock className="h-3 w-3" /> Bloqueada
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-[#F5F5F5] uppercase tracking-tight">
                  {ach.title}
                </h3>
                <p className="text-xs text-[#777777] mt-1 font-medium leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#292929] flex items-center justify-between text-[11px] font-mono text-[#777777]">
                <span>Nível: {ach.badgeLevel.toUpperCase()}</span>
                {ach.unlocked && <span>Desbloqueado</span>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
