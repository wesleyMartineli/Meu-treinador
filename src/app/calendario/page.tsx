'use client';

import React from 'react';
import { appStorage } from '@/lib/storage';
import { SEED_WEEKLY_SCHEDULE } from '@/lib/seed-data';
import { WeeklyScheduleDay, RunningWorkoutType, WorkoutRoutine } from '@/types/database';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Dumbbell,
  Zap,
  Moon,
  Plus,
  Edit3,
  Clock,
  TrendingUp,
  Save,
  Footprints,
  Play,
  Eye,
  Sparkles,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { RunningLoggerModal } from '@/components/running/RunningLoggerModal';
import { RoutineDetailModal } from '@/components/workout/RoutineDetailModal';
import { ActiveWorkoutModal } from '@/components/workout/ActiveWorkoutModal';
import confetti from 'canvas-confetti';
import Link from 'next/link';

const RUNNING_MODALITIES: { id: RunningWorkoutType; label: string; defaultKm: number; defaultMin: number; desc: string; color: string }[] = [
  {
    id: 'base',
    label: 'Rodagem Leve (ou Base)',
    defaultKm: 6.0,
    defaultMin: 35,
    desc: 'Zona 2 aeróbica contínua e ritmo conversacional para criar base.',
    color: '#FF6500',
  },
  {
    id: 'longao',
    label: 'Treino Longo (Longão)',
    defaultKm: 12.0,
    defaultMin: 65,
    desc: 'Resistência prolongada e adaptação metabólica.',
    color: '#F59E0B',
  },
  {
    id: 'intervalado',
    label: 'Treino Intervalado (Tiros)',
    defaultKm: 6.0,
    defaultMin: 35,
    desc: 'Tiros em Zona 5 na pista ou esteira para ganho de VO2 Máx.',
    color: '#EF4444',
  },
  {
    id: 'ritmo',
    label: 'Tempo Run (Ritmo)',
    defaultKm: 5.0,
    defaultMin: 25,
    desc: 'Ritmo constante e firme no limiar de lactato (Zona 4).',
    color: '#3B82F6',
  },
  {
    id: 'fartlek',
    label: 'Fartlek',
    defaultKm: 7.0,
    defaultMin: 40,
    desc: 'Jogo dinâmico com variações de velocidade e aclives.',
    color: '#10B981',
  },
  {
    id: 'regenerativo',
    label: 'Regenerativo',
    defaultKm: 4.0,
    defaultMin: 25,
    desc: 'Trote ultraleve na Zona 1 para acelerar recuperação muscular.',
    color: '#8B5CF6',
  },
];

export default function CalendarioPage() {
  const [schedule, setSchedule] = React.useState<WeeklyScheduleDay[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = appStorage.getWeeklySchedule();
      if (stored && stored.length > 0) return stored;
    }
    return SEED_WEEKLY_SCHEDULE;
  });
  const [routines, setRoutines] = React.useState<WorkoutRoutine[]>([]);
  const [editingDay, setEditingDay] = React.useState<WeeklyScheduleDay | null>(null);
  const [isLoggerOpen, setIsLoggerOpen] = React.useState(false);

  // Modals for routine preview and active session
  const [previewRoutine, setPreviewRoutine] = React.useState<WorkoutRoutine | null>(null);
  const [activeRoutine, setActiveRoutine] = React.useState<WorkoutRoutine | null>(null);
  const [presetFeedback, setPresetFeedback] = React.useState<string | null>(null);

  // Form State for Editing a Day in Schedule
  const [activityType, setActivityType] = React.useState<'running' | 'strength' | 'rest'>('strength');
  const [runningModality, setRunningModality] = React.useState<RunningWorkoutType>('ritmo');
  const [selectedRoutineId, setSelectedRoutineId] = React.useState<string>('');
  const [customTitle, setCustomTitle] = React.useState<string>('');
  const [targetDistance, setTargetDistance] = React.useState<number>(5.0);
  const [targetDuration, setTargetDuration] = React.useState<number>(45);
  const [notes, setNotes] = React.useState<string>('');

  const loadData = React.useCallback(() => {
    const loadedSchedule = appStorage.getWeeklySchedule();
    const loadedRoutines = appStorage.getRoutines();
    setSchedule(loadedSchedule && loadedSchedule.length > 0 ? loadedSchedule : SEED_WEEKLY_SCHEDULE);
    setRoutines(loadedRoutines);
  }, []);

  React.useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener('meutreinador_storage_change', handleStorageChange);
    return () => window.removeEventListener('meutreinador_storage_change', handleStorageChange);
  }, [loadData]);

  // Metric calculations
  const totalDays = schedule.length;
  const completedCount = schedule.filter((s) => s.completed).length;
  const runningSessions = schedule.filter((s) => s.activity_type === 'running');
  const strengthSessions = schedule.filter((s) => s.activity_type === 'strength');
  const restSessions = schedule.filter((s) => s.activity_type === 'rest');
  const plannedRunningKm = runningSessions.reduce((acc, curr) => acc + (curr.target_distance_km || 0), 0);
  const adherencePercent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  const handleToggleDay = (dayIndex: number) => {
    const updated = schedule.map((day) => {
      if (day.day_index === dayIndex) {
        const nextState = !day.completed;
        if (nextState) {
          try {
            confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 } });
          } catch {}
        }
        return { ...day, completed: nextState };
      }
      return day;
    });
    setSchedule(updated);
    appStorage.saveWeeklySchedule(updated);
  };

  const getRoutineForDay = (day: WeeklyScheduleDay): WorkoutRoutine | undefined => {
    if (day.routine_id) {
      const found = routines.find((r) => r.id === day.routine_id);
      if (found) return found;
    }
    // Match by split tag or title keywords if routine_id is not set
    const match = routines.find(
      (r) =>
        (r.split_tag && day.primary_activity.toLowerCase().includes(r.split_tag.toLowerCase())) ||
        (r.title && day.primary_activity.toLowerCase().includes(r.title.toLowerCase())) ||
        (r.title && r.title.toLowerCase().includes(day.primary_activity.toLowerCase()))
    );
    return match;
  };

  const openEditModal = (day: WeeklyScheduleDay) => {
    setEditingDay(day);
    const existingRoutine = getRoutineForDay(day);
    const actType = day.activity_type === 'hybrid' ? 'running' : day.activity_type;
    setActivityType(actType);
    setRunningModality(day.running_modality || 'ritmo');
    setSelectedRoutineId(day.routine_id || existingRoutine?.id || (routines[0]?.id ?? ''));
    setCustomTitle(existingRoutine ? existingRoutine.title : day.primary_activity);
    setTargetDistance(day.target_distance_km || 5.0);
    setTargetDuration(day.target_duration_minutes || (existingRoutine ? existingRoutine.exercises.length * 9 : 45));
    setNotes(day.notes || '');
  };

  const handleSaveDay = () => {
    if (!editingDay) return;

    let finalTitle = customTitle;
    let finalDuration = targetDuration;

    if (activityType === 'running') {
      const modalityObj = RUNNING_MODALITIES.find((m) => m.id === runningModality);
      const modLabel = modalityObj?.label || 'Corrida';
      finalTitle = `🏃 ${modLabel} (${targetDistance}km)`;
    } else if (activityType === 'strength') {
      const routine = routines.find((r) => r.id === selectedRoutineId);
      finalTitle = routine ? `${routine.title}` : `Ficha de Musculação`;
      finalDuration = routine ? routine.exercises.length * 9 : 45;
    } else {
      finalTitle = '🛌 Descanso & Recuperação Ativa';
      finalDuration = 0;
    }

    const updated = schedule.map((day) => {
      if (day.day_index === editingDay.day_index) {
        return {
          ...day,
          activity_type: activityType,
          primary_activity: finalTitle,
          running_modality: activityType === 'running' ? runningModality : undefined,
          routine_id: activityType === 'strength' ? selectedRoutineId : undefined,
          target_distance_km: activityType === 'running' ? targetDistance : undefined,
          target_duration_minutes: finalDuration,
          notes,
        };
      }
      return day;
    });

    setSchedule(updated);
    appStorage.saveWeeklySchedule(updated);
    setEditingDay(null);
  };

  // Preset divisions application
  const applyPresetDivision = (type: 'ABC' | 'ABCD' | 'ABCDE' | 'UPPER_LOWER' | 'FULL_BODY') => {
    if (routines.length === 0) return;

    const rA = routines[0] || routines[0];
    const rB = routines[1] || routines[0];
    const rC = routines[2] || routines[0];
    const rD = routines[3] || routines[0];
    const rE = routines[4] || routines[0];

    const newSched = schedule.map((day) => {
      // day_index: 0: Dom, 1: Seg, 2: Ter, 3: Qua, 4: Qui, 5: Sex, 6: Sab
      let actType: 'strength' | 'running' | 'rest' = 'rest';
      let rId: string | undefined = undefined;
      let title = '🛌 Descanso & Recuperação';
      let duration = 0;

      if (type === 'ABC') {
        // Seg: A, Ter: Corrida/Descanso, Qua: B, Qui: Corrida/Descanso, Sex: C, Sab: Descanso, Dom: Descanso
        if (day.day_index === 1) {
          actType = 'strength';
          rId = rA.id;
          title = rA.title;
          duration = rA.exercises.length * 9;
        } else if (day.day_index === 3) {
          actType = 'strength';
          rId = rB.id;
          title = rB.title;
          duration = rB.exercises.length * 9;
        } else if (day.day_index === 5) {
          actType = 'strength';
          rId = rC.id;
          title = rC.title;
          duration = rC.exercises.length * 9;
        } else if (day.day_index === 2 || day.day_index === 6) {
          actType = 'running';
          title = '🏃 Rodagem Leve (Base) (5km)';
          duration = 30;
        }
      } else if (type === 'ABCD') {
        // Seg: A, Ter: B, Qua: Descanso/Corrida, Qui: C, Sex: D, Sab/Dom: Descanso
        if (day.day_index === 1) {
          actType = 'strength';
          rId = rA.id;
          title = rA.title;
          duration = rA.exercises.length * 9;
        } else if (day.day_index === 2) {
          actType = 'strength';
          rId = rB.id;
          title = rB.title;
          duration = rB.exercises.length * 9;
        } else if (day.day_index === 4) {
          actType = 'strength';
          rId = rC.id;
          title = rC.title;
          duration = rC.exercises.length * 9;
        } else if (day.day_index === 5) {
          actType = 'strength';
          rId = rD.id;
          title = rD.title;
          duration = rD.exercises.length * 9;
        }
      } else if (type === 'ABCDE') {
        // Seg: A, Ter: B, Qua: C, Qui: D, Sex: E, Sab/Dom: Descanso
        if (day.day_index === 1) {
          actType = 'strength';
          rId = rA.id;
          title = rA.title;
        } else if (day.day_index === 2) {
          actType = 'strength';
          rId = rB.id;
          title = rB.title;
        } else if (day.day_index === 3) {
          actType = 'strength';
          rId = rC.id;
          title = rC.title;
        } else if (day.day_index === 4) {
          actType = 'strength';
          rId = rD.id;
          title = rD.title;
        } else if (day.day_index === 5) {
          actType = 'strength';
          rId = rE.id;
          title = rE.title;
        }
        duration = 50;
      } else if (type === 'FULL_BODY') {
        // Seg, Qua, Sex: A
        if (day.day_index === 1 || day.day_index === 3 || day.day_index === 5) {
          actType = 'strength';
          rId = rA.id;
          title = rA.title;
          duration = rA.exercises.length * 9;
        }
      }

      return {
        ...day,
        activity_type: actType,
        primary_activity: title,
        routine_id: rId,
        target_duration_minutes: duration,
        target_distance_km: actType === 'running' ? 5.0 : undefined,
      };
    });

    setSchedule(newSched);
    appStorage.saveWeeklySchedule(newSched);
    setPresetFeedback(`Divisão ${type} aplicada na sua semana com sucesso!`);
    setTimeout(() => setPresetFeedback(null), 3500);
  };

  const getActivityBadge = (day: WeeklyScheduleDay) => {
    if (day.activity_type === 'running') {
      const modality = RUNNING_MODALITIES.find((m) => m.id === day.running_modality);
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FF6500]/15 text-[#FF6500] border border-[#FF6500]/30 font-mono">
          <Zap className="h-3 w-3" />
          {modality ? modality.label.split(' ')[0] : 'Corrida'}
        </span>
      );
    }
    if (day.activity_type === 'strength') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono">
          <Dumbbell className="h-3 w-3" />
          Ficha de Musculação
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
        <Moon className="h-3 w-3" />
        Descanso
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Header with Title & Quick Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292929] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#FF6500]/10 text-[#FF6500] border border-[#FF6500]/30 font-mono">
              <Calendar className="h-3 w-3" />
              PLANEJAMENTO & GRADE SEMANAL
            </span>
            <span className="text-xs font-mono text-[#777777]">
              7 DIAS • SEGUNDA A DOMINGO
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-2">
            Calendário de <span className="text-[#FF6500]">Treinos da Semana</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8E93] font-medium mt-1 max-w-2xl">
            Escolha qual das suas fichas de treino você quer fazer em cada dia da semana ou monte uma divisão personalizada com musculação, corrida e descanso.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/treinos">
            <Button variant="outline" size="md" className="gap-2 shrink-0">
              <Dumbbell className="h-4 w-4 text-[#FF6500]" />
              Gerenciar Fichas de Treino
            </Button>
          </Link>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsLoggerOpen(true)}
            className="gap-2 shadow-orange-glow shrink-0"
          >
            <Zap className="h-4 w-4 fill-current" />
            Registrar Corrida de Hoje
          </Button>
        </div>
      </div>

      {/* Preset Quick Toolbar: 1-Click Week Split Setup */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FF6500]" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Montagem Rápida da Semana (Presets com suas Fichas):
            </span>
          </div>
          {presetFeedback && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-fade-in">
              <Check className="h-3.5 w-3.5" /> {presetFeedback}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => applyPresetDivision('ABC')}
            className="px-3 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] hover:border-[#FF6500]/50 text-xs font-bold text-white uppercase tracking-wider transition-all"
          >
            ⚡ Divisão ABC (Seg / Qua / Sex)
          </button>

          <button
            type="button"
            onClick={() => applyPresetDivision('ABCD')}
            className="px-3 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] hover:border-[#FF6500]/50 text-xs font-bold text-white uppercase tracking-wider transition-all"
          >
            ⚡ Divisão ABCD (4 Dias)
          </button>

          <button
            type="button"
            onClick={() => applyPresetDivision('ABCDE')}
            className="px-3 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] hover:border-[#FF6500]/50 text-xs font-bold text-white uppercase tracking-wider transition-all"
          >
            ⚡ Divisão ABCDE (5 Dias Seg-Sex)
          </button>

          <button
            type="button"
            onClick={() => applyPresetDivision('FULL_BODY')}
            className="px-3 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] hover:border-[#FF6500]/50 text-xs font-bold text-white uppercase tracking-wider transition-all"
          >
            ⚡ Full Body (3x na semana)
          </button>
        </div>
      </div>

      {/* Weekly Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#181818] border-[#292929] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-[#FF6500]" /> Aderência da Semana
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-display text-white">
              {adherencePercent}%
            </span>
            <span className="text-xs font-mono text-[#777777]">
              ({completedCount}/{totalDays} dias)
            </span>
          </div>
        </Card>

        <Card className="p-4 bg-[#181818] border-[#292929] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
            <Dumbbell className="h-3.5 w-3.5 text-blue-400" /> Fichas de Musculação
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-display text-white">
              {strengthSessions.length}
            </span>
            <span className="text-xs font-mono text-[#777777]">
              sessões agendadas
            </span>
          </div>
        </Card>

        <Card className="p-4 bg-[#181818] border-[#292929] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-[#FF6500]" /> Corridas Programadas
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-display text-[#FF6500]">
              {runningSessions.length}
            </span>
            <span className="text-xs font-mono text-[#777777]">
              sessões (~{plannedRunningKm} km)
            </span>
          </div>
        </Card>

        <Card className="p-4 bg-[#181818] border-[#292929] flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
            <Moon className="h-3.5 w-3.5 text-emerald-400" /> Descanso & Recuperação
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-display text-white">
              {restSessions.length}
            </span>
            <span className="text-xs font-mono text-[#777777]">
              dias de repouso
            </span>
          </div>
        </Card>
      </div>

      {/* 7-Day Interactive Agenda Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#FF6500]" />
            Grade Semanal (Segunda a Domingo)
          </h2>
          <span className="text-xs text-[#777777]">
            Clique no botão ✏️ para trocar a ficha ou atividade de qualquer dia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {schedule.map((day) => {
            const isToday = new Date().getDay() === day.day_index;
            const routineForDay = getRoutineForDay(day);

            return (
              <div
                key={day.day_name}
                className={`rounded-2xl border p-4 flex flex-col justify-between min-h-[260px] transition-all duration-200 group relative ${
                  day.completed
                    ? 'bg-[#141E15] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : isToday
                    ? 'bg-[#1c1815] border-[#FF6500]/60 shadow-[0_0_20px_rgba(255,101,0,0.15)] ring-1 ring-[#FF6500]/40'
                    : 'bg-[#181818] border-[#292929] hover:border-[#383838]'
                }`}
              >
                {/* Top Day Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-black text-xs uppercase tracking-wider text-[#F5F5F5]">
                        {day.day_name}
                      </span>
                      {isToday && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#FF6500] text-black font-mono">
                          Hoje
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => openEditModal(day)}
                      title="Mudar treino ou atividade deste dia"
                      className="p-1.5 rounded-lg text-[#777777] hover:text-white hover:bg-[#252525] transition-colors border border-transparent hover:border-[#444444]"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-[#FF6500]" />
                    </button>
                  </div>

                  <div>{getActivityBadge(day)}</div>

                  {/* Main Activity Title */}
                  <h3 className="font-display font-bold text-sm text-white line-clamp-2 mt-1">
                    {day.activity_type === 'strength' && routineForDay ? routineForDay.title : day.primary_activity}
                  </h3>

                  {/* If strength routine is linked */}
                  {day.activity_type === 'strength' && routineForDay && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-[#888888] block">
                        • {routineForDay.exercises.length} exercícios inclusos
                      </span>

                      <button
                        type="button"
                        onClick={() => setPreviewRoutine(routineForDay)}
                        className="w-full py-1.5 px-2 rounded-lg bg-[#202020] hover:bg-[#282828] border border-[#303030] text-[10px] font-bold uppercase tracking-wider text-[#FF6500] flex items-center justify-center gap-1 transition-all"
                      >
                        <Eye className="h-3 w-3" /> Ver Ficha & GIFs
                      </button>
                    </div>
                  )}

                  {/* Metrics / Duration / Distance */}
                  {(day.target_distance_km || day.target_duration_minutes) && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#B8B8B8] pt-1">
                      {day.target_distance_km && (
                        <span className="flex items-center gap-0.5 text-[#FF6500] font-bold">
                          <Footprints className="h-3 w-3" />
                          {day.target_distance_km}km
                        </span>
                      )}
                      {day.target_duration_minutes && (
                        <span className="flex items-center gap-0.5 text-[#777777]">
                          <Clock className="h-3 w-3" />
                          {day.target_duration_minutes}min
                        </span>
                      )}
                    </div>
                  )}

                  {/* Technical Notes snippet */}
                  {day.notes && (
                    <p className="text-[10px] text-[#777777] line-clamp-2 italic pt-1 leading-snug">
                      &quot;{day.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Bottom Actions: Start Workout or Mark Complete */}
                <div className="pt-3 border-t border-[#292929] mt-3 space-y-1.5">
                  {day.activity_type === 'strength' && routineForDay && !day.completed && (
                    <button
                      type="button"
                      onClick={() => setActiveRoutine(routineForDay)}
                      className="w-full py-1.5 px-2 rounded-xl bg-[#FF6500] hover:bg-[#e05800] text-black text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
                    >
                      <Play className="h-3 w-3 fill-black" />
                      Iniciar Treino
                    </button>
                  )}

                  <button
                    onClick={() => handleToggleDay(day.day_index)}
                    className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      day.completed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-[#121212] text-[#777777] border border-[#292929] hover:text-white hover:border-[#404040]'
                    }`}
                  >
                    {day.completed ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Concluído</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-3.5 w-3.5 text-[#555555]" />
                        <span>{day.activity_type === 'rest' ? 'Dia de Descanso' : 'Marcar Feito'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Edit Schedule Day */}
      {editingDay && (
        <Modal
          isOpen={Boolean(editingDay)}
          onClose={() => setEditingDay(null)}
          title={`Programar Atividade: ${editingDay.day_name}`}
          subtitle="Escolha a ficha de musculação cadastrada, corrida ou descanso para este dia da semana."
          maxWidth="md"
        >
          <div className="space-y-5">
            {/* Activity Type Selector Tabs */}
            <div>
              <label className="text-xs font-bold uppercase text-[#B8B8B8] block mb-2">
                O que você quer fazer na {editingDay.day_name}?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActivityType('strength')}
                  className={`p-3 rounded-xl border text-xs font-display font-bold uppercase flex flex-col items-center gap-1.5 transition-all ${
                    activityType === 'strength'
                      ? 'bg-blue-500/15 border-blue-500 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                      : 'bg-[#121212] border-[#292929] text-[#777777] hover:text-white'
                  }`}
                >
                  <Dumbbell className="h-4 w-4" />
                  <span>Ficha de Treino</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityType('running')}
                  className={`p-3 rounded-xl border text-xs font-display font-bold uppercase flex flex-col items-center gap-1.5 transition-all ${
                    activityType === 'running'
                      ? 'bg-[#FF6500]/15 border-[#FF6500] text-[#FF6500] shadow-[0_0_12px_rgba(255,101,0,0.2)]'
                      : 'bg-[#121212] border-[#292929] text-[#777777] hover:text-white'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>Corrida</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityType('rest')}
                  className={`p-3 rounded-xl border text-xs font-display font-bold uppercase flex flex-col items-center gap-1.5 transition-all ${
                    activityType === 'rest'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-[#121212] border-[#292929] text-[#777777] hover:text-white'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span>Descanso</span>
                </button>
              </div>
            </div>

            {/* Strength Routine Selector */}
            {activityType === 'strength' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#121212] border border-[#292929]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-blue-400 block">
                    Escolher Ficha Criada:
                  </label>
                  <Link href="/treinos" className="text-[11px] text-[#FF6500] hover:underline font-bold">
                    + Criar Nova Ficha
                  </Link>
                </div>

                {routines.length > 0 ? (
                  <div className="space-y-2">
                    {routines.map((r) => {
                      const isSelected = selectedRoutineId === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => setSelectedRoutineId(r.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-950/40 border-blue-500 text-white'
                              : 'bg-[#181818] border-[#2c2c2c] text-[#CCCCCC] hover:border-[#444444]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-blue-500/20 text-blue-400">
                              {r.split_tag}
                            </span>
                            <span className="text-xs font-bold truncate">{r.title}</span>
                          </div>
                          <span className="text-[11px] font-mono text-[#777777] shrink-0">
                            {r.exercises.length} ex
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-[#777777]">
                    Nenhuma ficha encontrada. Crie uma em &quot;Treinos & Rotinas&quot;.
                  </p>
                )}
              </div>
            )}

            {/* Running Modality Fields */}
            {activityType === 'running' && (
              <div className="space-y-4 p-4 rounded-2xl bg-[#121212] border border-[#292929]">
                <div>
                  <label className="text-xs font-bold uppercase text-[#FF6500] block mb-1.5">
                    Modalidade de Corrida
                  </label>
                  <select
                    value={runningModality}
                    onChange={(e) => {
                      const nextMod = e.target.value as RunningWorkoutType;
                      setRunningModality(nextMod);
                      const modObj = RUNNING_MODALITIES.find((m) => m.id === nextMod);
                      if (modObj) {
                        setTargetDistance(modObj.defaultKm);
                        setTargetDuration(modObj.defaultMin);
                      }
                    }}
                    className="w-full rounded-xl bg-[#181818] border border-[#292929] px-3.5 py-2.5 text-xs font-bold text-white focus:border-[#FF6500] focus:outline-none cursor-pointer"
                  >
                    {RUNNING_MODALITIES.map((mod) => (
                      <option key={mod.id} value={mod.id} className="bg-[#181818] text-white">
                        {mod.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#B8B8B8] block mb-1">
                      Distância Alvo (km)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={targetDistance}
                      onChange={(e) => setTargetDistance(parseFloat(e.target.value) || 0)}
                      className="w-full rounded-xl bg-[#181818] border border-[#292929] px-3 py-2 text-xs font-bold text-white focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#B8B8B8] block mb-1">
                      Duração Estimada (min)
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={targetDuration}
                      onChange={(e) => setTargetDuration(parseInt(e.target.value, 10) || 0)}
                      className="w-full rounded-xl bg-[#181818] border border-[#292929] px-3 py-2 text-xs font-bold text-white focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="text-xs font-bold uppercase text-[#B8B8B8] block mb-1">
                Observações / Metas do Dia:
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Foco em sobrecarga progressiva no supino ou ritmo constante..."
                rows={2}
                className="w-full rounded-xl bg-[#121212] border border-[#292929] p-3 text-xs text-white focus:border-[#FF6500] focus:outline-none placeholder:text-[#555555]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#292929]">
              <Button variant="outline" size="sm" onClick={() => setEditingDay(null)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveDay}
                leftIcon={<Save className="h-4 w-4" />}
              >
                Salvar na Agenda
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Routine Detail & GIF Preview Modal (Open from Calendar!) */}
      {previewRoutine && (
        <RoutineDetailModal
          isOpen={Boolean(previewRoutine)}
          routine={previewRoutine}
          onClose={() => setPreviewRoutine(null)}
          onStartWorkout={(routine) => {
            setPreviewRoutine(null);
            setActiveRoutine(routine);
          }}
        />
      )}

      {/* Active Workout Live Session Modal */}
      {activeRoutine && (
        <ActiveWorkoutModal
          isOpen={Boolean(activeRoutine)}
          routine={activeRoutine}
          onClose={() => setActiveRoutine(null)}
          onFinish={() => setActiveRoutine(null)}
        />
      )}

      {/* Modal: Quick Running Logger */}
      <RunningLoggerModal
        isOpen={isLoggerOpen}
        onClose={() => setIsLoggerOpen(false)}
        onSaved={() => {
          loadData();
          setIsLoggerOpen(false);
        }}
      />
    </div>
  );
}
