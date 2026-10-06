'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  Play,
  Dumbbell,
  Flame,
  Target,
  Trophy,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Plus,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { appStorage } from '@/lib/storage';
import { GoalItem, AchievementItem } from '@/types';
import { WorkoutRoutine, WorkoutLog, WeeklyScheduleDay } from '@/types/database';

export default function StudentDashboardPage() {
  const { user: authUser } = useAuth();
  const profile = authUser || appStorage.getProfile();

  const [goals, setGoals] = React.useState<GoalItem[]>([]);
  const [routines, setRoutines] = React.useState<WorkoutRoutine[]>([]);
  const [workoutLogs, setWorkoutLogs] = React.useState<WorkoutLog[]>([]);
  const [schedule, setSchedule] = React.useState<WeeklyScheduleDay[]>([]);

  const loadData = React.useCallback(() => {
    setGoals(appStorage.getGoals());
    setRoutines(appStorage.getRoutines());
    setWorkoutLogs(appStorage.getWorkoutLogs());
    setSchedule(appStorage.getWeeklySchedule());
  }, []);

  React.useEffect(() => {
    loadData();

    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener('meutreinador_storage_change', handleStorageChange);
    return () => window.removeEventListener('meutreinador_storage_change', handleStorageChange);
  }, [loadData]);

  const totalWorkouts = profile?.total_workouts_completed || workoutLogs.length || 0;
  const streakDays = profile?.streak_days || 0;

  // Determine current day of week (0 = Monday in our schedule)
  const currentDayOfWeek = (new Date().getDay() + 6) % 7;
  const todaySchedule = schedule.find((s) => s.day_index === currentDayOfWeek);
  
  // Find today's routine if available
  const todayRoutine = routines.length > 0 ? routines[0] : null;

  // Calculate workouts completed this week
  const weeklyTarget = profile?.weekly_frequency_days || 4;
  const weeklyDone = schedule.filter((s) => s.completed).length;

  // Last and next workout information
  const lastWorkout = workoutLogs[0];
  const lastWorkoutText = lastWorkout ? (lastWorkout.title || lastWorkout.routine_title || 'Treino Concluído') : 'Nenhum ainda';
  const nextWorkoutText = todayRoutine ? todayRoutine.title : (routines.length > 0 ? routines[0].title : 'A definir');

  // Dynamic Badges
  const dynamicAchievements: AchievementItem[] = [
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
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* TREINO DE HOJE - Minimalist Hero Card */}
      {todayRoutine ? (
        <div className="rounded-2xl bg-[#111111] border border-[#1f1f1f] p-6 sm:p-7 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF6500]/10 text-[#FF6500] border border-[#FF6500]/20">
                  {todayRoutine.split_tag}
                </span>
                <span className="text-xs font-mono text-[#666666]">
                  Treino do Dia
                </span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight truncate">
                {todayRoutine.title}
              </h2>

              <p className="text-xs text-[#888888] font-medium line-clamp-1">
                {todayRoutine.description || `${todayRoutine.exercises.length} exercícios programados`}
              </p>
            </div>

            <Link href="/treinos" className="shrink-0">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider gap-2 px-6 shadow-orange-glow"
                leftIcon={<Play className="h-4 w-4 fill-current" />}
              >
                Iniciar Treino
              </Button>
            </Link>
          </div>

          {/* Quick Attributes Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-[#1a1a1a]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#555555] block">Duração Estimada</span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#DDDDDD] mt-0.5 block">
                {todayRoutine.estimated_duration_min || 45} min
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#555555] block">Exercícios</span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#DDDDDD] mt-0.5 block">
                {todayRoutine.exercises.length} movimentos
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#555555] block">Séries</span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#DDDDDD] mt-0.5 block">
                {todayRoutine.exercises.reduce((acc, ex) => acc + (ex.target_sets || 3), 0)} séries
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#555555] block">Status</span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#FF6500] mt-0.5 block">
                {todaySchedule?.completed ? 'Concluído' : 'Pendente'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#111111] border border-[#1f1f1f] p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#222222] text-[#888888] border border-[#2d2d2d]">
                  Início de Ciclo
                </span>
                <span className="text-xs font-mono text-[#666666]">
                  Treino de Hoje
                </span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                Nenhum treino programado ainda
              </h2>

              <p className="text-xs text-[#888888] font-medium">
                Crie sua primeira ficha de treino personalizada para começar a registrar sua evolução.
              </p>
            </div>

            <Link href="/treinos" className="shrink-0">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider gap-2 px-6 shadow-orange-glow"
                leftIcon={<Plus className="h-4 w-4 stroke-[3]" />}
              >
                Criar Ficha de Treino
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* METRIC CARDS - Minimalist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-[#111111] border border-[#1c1c1c] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-[#888888]" /> Progresso
          </span>
          <div className="mt-2">
            <span className="text-xl font-bold font-mono text-white">
              {weeklyTarget > 0 ? Math.round((weeklyDone / weeklyTarget) * 100) : 0}%
            </span>
            <span className="text-[10px] text-[#555555] block mt-0.5">Meta da semana</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111111] border border-[#1c1c1c] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
            <Dumbbell className="h-3.5 w-3.5 text-[#888888]" /> Treinos Feitos
          </span>
          <div className="mt-2">
            <span className="text-xl font-bold font-mono text-white">{totalWorkouts}</span>
            <span className="text-[10px] text-[#555555] block mt-0.5">Total acumulado</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111111] border border-[#1c1c1c] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-[#FF6500]" /> Sequência
          </span>
          <div className="mt-2">
            <span className="text-xl font-bold font-mono text-[#FF6500]">{streakDays}d</span>
            <span className="text-[10px] text-[#555555] block mt-0.5">Dias seguidos</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111111] border border-[#1c1c1c] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[#888888]" /> Meta Semanal
          </span>
          <div className="mt-2">
            <span className="text-xl font-bold font-mono text-white">
              {weeklyDone}/{weeklyTarget}
            </span>
            <span className="text-[10px] text-[#555555] block mt-0.5">Treinos da semana</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111111] border border-[#1c1c1c] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#888888]" /> Último
          </span>
          <div className="mt-2">
            <span className="text-sm font-bold font-mono text-white truncate block">
              {lastWorkout ? (lastWorkout.started_at || lastWorkout.date || '').split('T')[0] : 'Nenhum'}
            </span>
            <span className="text-[10px] text-[#555555] block mt-0.5 truncate">{lastWorkoutText}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111111] border border-[#1c1c1c] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#888888]" /> Próximo
          </span>
          <div className="mt-2">
            <span className="text-sm font-bold font-mono text-white truncate block">
              {todayRoutine ? 'Hoje' : 'A definir'}
            </span>
            <span className="text-[10px] text-[#555555] block mt-0.5 truncate">{nextWorkoutText}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Metas & Conquistas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metas Ativas */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-[#1f1f1f] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a1a1a]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                Objetivos
              </span>
              <h3 className="font-display font-bold text-base text-white">
                Metas Ativas
              </h3>
            </div>
            <Link href="/metas">
              <span className="text-xs text-[#888888] hover:text-[#FF6500] font-bold flex items-center gap-1 transition-colors">
                Ver todas <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          <div className="space-y-3">
            {goals.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-[#0e0e0e] border border-[#1c1c1c] space-y-2">
                <Target className="h-6 w-6 text-[#555555] mx-auto" />
                <p className="text-xs text-[#888888]">Nenhuma meta configurada ainda.</p>
                <Link href="/metas">
                  <Button variant="primary" size="sm" className="mt-2 text-[11px] font-bold shadow-orange-glow">
                    Definir Minhas Metas
                  </Button>
                </Link>
              </div>
            ) : (
              goals.slice(0, 3).map((goal) => {
                const progress = Math.min(
                  100,
                  Math.max(0, Math.round((goal.currentValue / (goal.targetValue || 1)) * 100))
                );

                return (
                  <div key={goal.id} className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#1c1c1c] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#CCCCCC]">{goal.title}</span>
                      <span className="font-mono font-bold text-[#FF6500]">
                        {goal.currentValue} / {goal.targetValue} {goal.unit} ({progress}%)
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.currentValue}
                      max={goal.targetValue}
                      showPercentage={false}
                      size="sm"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Conquistas */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-[#1f1f1f] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a1a1a]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                Marcos
              </span>
              <h3 className="font-display font-bold text-base text-white">
                Conquistas
              </h3>
            </div>
            <Link href="/conquistas">
              <span className="text-xs text-[#888888] hover:text-[#FF6500] font-bold flex items-center gap-1 transition-colors">
                Ver todas <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {dynamicAchievements.map((ach) => (
              <div
                key={ach.id}
                className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#1c1c1c] flex items-center gap-3"
              >
                <div
                  className={`h-9 w-9 shrink-0 rounded-lg flex items-center justify-center ${
                    ach.unlocked
                      ? 'bg-[#FF6500]/10 text-[#FF6500] border border-[#FF6500]/20'
                      : 'bg-[#181818] text-[#444444]'
                  }`}
                >
                  <Award className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{ach.title}</h4>
                  <span className="text-[10px] text-[#666666] font-mono block">
                    {ach.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
