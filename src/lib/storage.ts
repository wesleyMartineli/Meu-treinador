import {
  UserProfile,
  Exercise,
  WorkoutRoutine,
  WorkoutLog,
  RunningLog,
  RunningPlan,
  BodyMetrics,
  ProgressPhoto,
  RecoveryCheckin,
  WeeklyScheduleDay,
  WeeklyReport,
  AICoachMessage,
} from '../types/database';

import {
  SEED_PROFILE,
  SEED_EXERCISES,
  SEED_ROUTINES,
  SEED_RUNNING_LOGS,
  SEED_RUNNING_PLAN,
  SEED_BODY_METRICS,
  SEED_PROGRESS_PHOTOS,
  SEED_RECOVERY_CHECKINS,
  SEED_WEEKLY_SCHEDULE,
  SEED_WEEKLY_REPORT,
} from './seed-data';

import { supabase, isSupabaseConfigured } from './supabase';

export const STORAGE_KEYS = {
  PROFILE: 'meutreinador_profile_v2',
  EXERCISES: 'meutreinador_exercises_v5',
  ROUTINES: 'meutreinador_routines_v2',
  WORKOUT_LOGS: 'meutreinador_workout_logs_v2',
  ACTIVE_WORKOUT: 'meutreinador_active_workout_v2',
  RUNNING_LOGS: 'meutreinador_running_logs_v2',
  RUNNING_PLAN: 'meutreinador_running_plan_v2',
  BODY_METRICS: 'meutreinador_body_metrics_v2',
  PROGRESS_PHOTOS: 'meutreinador_progress_photos_v2',
  RECOVERY_CHECKINS: 'meutreinador_recovery_checkins_v2',
  WEEKLY_SCHEDULE: 'meutreinador_weekly_schedule_v2',
  WEEKLY_REPORT: 'meutreinador_weekly_report_v2',
  COACH_MESSAGES: 'meutreinador_coach_messages_v2',
  GOALS: 'meutreinador_goals_v2',
};

class AppStorage {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  getItem<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser()) return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      const parsed = JSON.parse(stored) as T;
      return parsed ?? defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent('meutreinador_storage_change', { detail: { key } }));
    } catch (e) {
      console.error('Error writing to local storage', e);
    }
  }

  private syncToSupabase(payload: Record<string, any>): void {
    if (!this.isBrowser() || !isSupabaseConfigured()) return;
    try {
      const profile = this.getProfile();
      if (!profile || !profile.id || profile.name === 'Atleta') return;
      void Promise.resolve(
        supabase.from('profiles').upsert({
          id: profile.id,
          email: profile.email.toLowerCase(),
          name: profile.name,
          ...payload,
          updated_at: new Date().toISOString(),
        })
      );
    } catch {}
  }

  // User Profile
  getProfile(): UserProfile {
    return this.getItem<UserProfile>(STORAGE_KEYS.PROFILE, SEED_PROFILE);
  }

  saveProfile(profile: UserProfile): void {
    this.setItem(STORAGE_KEYS.PROFILE, profile);
    this.syncToSupabase({
      name: profile.name,
      initial_weight_kg: profile.initial_weight_kg,
      target_weight_kg: profile.target_weight_kg,
      current_weight_kg: profile.current_weight_kg,
      height_cm: profile.height_cm,
      experience_level: profile.experience_level,
      bench_pr_kg: profile.bench_pr_kg,
      squat_pr_kg: profile.squat_pr_kg,
      deadlift_pr_kg: profile.deadlift_pr_kg,
      best_5k_time: profile.best_5k_time,
      best_5k_pace: profile.best_5k_pace,
      streak_days: profile.streak_days,
      total_workouts_completed: profile.total_workouts_completed,
    });
  }

  // Goals
  getGoals(): import('@/types').GoalItem[] {
    return this.getItem<import('@/types').GoalItem[]>(STORAGE_KEYS.GOALS, []);
  }

  saveGoals(goals: import('@/types').GoalItem[]): void {
    this.setItem(STORAGE_KEYS.GOALS, goals);
    this.syncToSupabase({ goals });
  }

  addGoal(goal: import('@/types').GoalItem): void {
    const list = this.getGoals();
    list.push(goal);
    this.saveGoals(list);
  }

  deleteGoal(id: string): void {
    const list = this.getGoals().filter((g) => g.id !== id);
    this.saveGoals(list);
  }

  updateGoal(id: string, updates: Partial<import('@/types').GoalItem>): void {
    const list = this.getGoals().map((g) => (g.id === id ? { ...g, ...updates } : g));
    this.saveGoals(list);
  }

  // Exercises
  getExercises(): Exercise[] {
    const list = this.getItem<Exercise[]>(STORAGE_KEYS.EXERCISES, SEED_EXERCISES);
    if (!list || !Array.isArray(list) || list.length === 0) {
      this.setItem(STORAGE_KEYS.EXERCISES, SEED_EXERCISES);
      return SEED_EXERCISES;
    }
    // Sanitize in case of missing array fields
    return list.map((ex) => ({
      ...ex,
      secondary_muscles: Array.isArray(ex.secondary_muscles) ? ex.secondary_muscles : [],
      execution_cues: Array.isArray(ex.execution_cues) ? ex.execution_cues : [],
      common_mistakes: Array.isArray(ex.common_mistakes) ? ex.common_mistakes : [],
    }));
  }

  addCustomExercise(exercise: Exercise): void {
    const list = this.getExercises();
    list.unshift(exercise);
    this.setItem(STORAGE_KEYS.EXERCISES, list);
  }

  importExercisesBatch(newExercises: Exercise[]): number {
    const current = this.getExercises();
    const currentIds = new Set(current.map((e) => e.id));
    let addedCount = 0;

    newExercises.forEach((ex) => {
      if (!currentIds.has(ex.id)) {
        current.push({
          ...ex,
          secondary_muscles: Array.isArray(ex.secondary_muscles) ? ex.secondary_muscles : [],
          execution_cues: Array.isArray(ex.execution_cues) ? ex.execution_cues : [],
          common_mistakes: Array.isArray(ex.common_mistakes) ? ex.common_mistakes : [],
        });
        currentIds.add(ex.id);
        addedCount++;
      }
    });

    this.setItem(STORAGE_KEYS.EXERCISES, current);
    return addedCount;
  }

  resetToMasterExerciseDB(): void {
    this.setItem(STORAGE_KEYS.EXERCISES, SEED_EXERCISES);
  }

  // Workout Routines
  getRoutines(): WorkoutRoutine[] {
    return this.getItem<WorkoutRoutine[]>(STORAGE_KEYS.ROUTINES, []);
  }

  saveRoutine(routine: WorkoutRoutine): void {
    const routines = this.getRoutines();
    const index = routines.findIndex((r) => r.id === routine.id);
    if (index >= 0) {
      routines[index] = routine;
    } else {
      routines.push(routine);
    }
    this.setItem(STORAGE_KEYS.ROUTINES, routines);

    // Sync weekly schedule items linked to this routine
    try {
      const schedule = this.getWeeklySchedule();
      let scheduleChanged = false;
      const updatedSchedule = schedule.map((day) => {
        if (
          day.activity_type === 'strength' &&
          (day.routine_id === routine.id ||
            (!day.routine_id &&
              ((routine.split_tag && day.primary_activity.toLowerCase().includes(routine.split_tag.toLowerCase())) ||
                (routine.title && day.primary_activity.toLowerCase().includes(routine.title.toLowerCase())))))
        ) {
          scheduleChanged = true;
          return {
            ...day,
            routine_id: routine.id,
            primary_activity: routine.title,
          };
        }
        return day;
      });

      if (scheduleChanged) {
        this.setItem(STORAGE_KEYS.WEEKLY_SCHEDULE, updatedSchedule);
      }
    } catch {}

    this.syncToSupabase({ routines: this.getRoutines(), weekly_schedule: this.getWeeklySchedule() });
  }

  deleteRoutine(id: string): void {
    const routines = this.getRoutines().filter((r) => r.id !== id);
    this.setItem(STORAGE_KEYS.ROUTINES, routines);

    try {
      const schedule = this.getWeeklySchedule();
      let scheduleChanged = false;
      const updatedSchedule = schedule.map((day) => {
        if (day.routine_id === id) {
          scheduleChanged = true;
          return {
            ...day,
            routine_id: undefined,
            primary_activity: 'Ficha de Musculação',
          };
        }
        return day;
      });

      if (scheduleChanged) {
        this.setItem(STORAGE_KEYS.WEEKLY_SCHEDULE, updatedSchedule);
      }
    } catch {}

    this.syncToSupabase({ routines: this.getRoutines(), weekly_schedule: this.getWeeklySchedule() });
  }

  duplicateRoutine(id: string): WorkoutRoutine | null {
    const routines = this.getRoutines();
    const target = routines.find((r) => r.id === id);
    if (!target) return null;

    const newRoutine: WorkoutRoutine = {
      ...target,
      id: `rotina-${Date.now()}`,
      title: `${target.title} (Cópia)`,
      split_tag: `${target.split_tag} (Cópia)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      exercises: target.exercises.map((e) => ({
        ...e,
        id: `re-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      })),
    };

    routines.push(newRoutine);
    this.setItem(STORAGE_KEYS.ROUTINES, routines);
    return newRoutine;
  }

  // Workout Logs
  getWorkoutLogs(): WorkoutLog[] {
    return this.getItem<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, []);
  }

  saveWorkoutLog(log: WorkoutLog): void {
    const logs = this.getWorkoutLogs();
    logs.unshift(log);
    this.setItem(STORAGE_KEYS.WORKOUT_LOGS, logs);

    // Update streak and total workouts in profile
    const profile = this.getProfile();
    profile.total_workouts_completed = (profile.total_workouts_completed || 0) + 1;
    this.saveProfile(profile);
  }

  // Active workout state
  getActiveWorkout(): WorkoutLog | null {
    return this.getItem<WorkoutLog | null>(STORAGE_KEYS.ACTIVE_WORKOUT, null);
  }

  setActiveWorkout(workout: WorkoutLog | null): void {
    this.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, workout);
  }

  // Running Logs
  getRunningLogs(): RunningLog[] {
    return this.getItem<RunningLog[]>(STORAGE_KEYS.RUNNING_LOGS, SEED_RUNNING_LOGS);
  }

  saveRunningLog(log: RunningLog): void {
    const logs = this.getRunningLogs();
    logs.unshift(log);
    this.setItem(STORAGE_KEYS.RUNNING_LOGS, logs);

    // Check if best 5k pace
    if (log.distance_km >= 5.0) {
      const profile = this.getProfile();
      // calculate 5k comparison
      const logPaceSecs = log.duration_seconds / log.distance_km;
      const currentBestSecs = profile.best_5k_pace ? 
        parseInt(profile.best_5k_pace.split(':')[0]) * 60 + parseInt(profile.best_5k_pace.split(':')[1]) : 9999;

      if (logPaceSecs < currentBestSecs) {
        profile.best_5k_pace = log.pace_min_per_km;
        profile.best_5k_time = `${Math.floor(log.duration_seconds / 60)}:${(log.duration_seconds % 60).toString().padStart(2, '0')}`;
        this.saveProfile(profile);
      }
    }
  }

  // Running Plan
  getRunningPlan(): RunningPlan {
    return this.getItem<RunningPlan>(STORAGE_KEYS.RUNNING_PLAN, SEED_RUNNING_PLAN);
  }

  saveRunningPlan(plan: RunningPlan): void {
    this.setItem(STORAGE_KEYS.RUNNING_PLAN, plan);
  }

  // Body Metrics
  getBodyMetrics(): BodyMetrics[] {
    return this.getItem<BodyMetrics[]>(STORAGE_KEYS.BODY_METRICS, SEED_BODY_METRICS);
  }

  saveBodyMetrics(metric: BodyMetrics): void {
    const list = this.getBodyMetrics();
    list.push(metric);
    // Sort by date asc
    list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.setItem(STORAGE_KEYS.BODY_METRICS, list);

    // update profile current weight
    const profile = this.getProfile();
    profile.current_weight_kg = metric.weight_kg;
    this.saveProfile(profile);
  }

  // Progress Photos
  getProgressPhotos(): ProgressPhoto[] {
    return this.getItem<ProgressPhoto[]>(STORAGE_KEYS.PROGRESS_PHOTOS, SEED_PROGRESS_PHOTOS);
  }

  saveProgressPhoto(photo: ProgressPhoto): void {
    const list = this.getProgressPhotos();
    list.push(photo);
    list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, list);
  }

  updateProgressPhotos(photos: ProgressPhoto[]): void {
    photos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, photos);
  }

  deleteProgressPhoto(id: string): void {
    const list = this.getProgressPhotos().filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, list);
  }

  // Recovery Checkins
  getRecoveryCheckins(): RecoveryCheckin[] {
    return this.getItem<RecoveryCheckin[]>(STORAGE_KEYS.RECOVERY_CHECKINS, SEED_RECOVERY_CHECKINS);
  }

  saveRecoveryCheckin(checkin: RecoveryCheckin): void {
    const list = this.getRecoveryCheckins();
    const existingIndex = list.findIndex((c) => c.date === checkin.date);
    if (existingIndex >= 0) {
      list[existingIndex] = checkin;
    } else {
      list.unshift(checkin);
    }
    this.setItem(STORAGE_KEYS.RECOVERY_CHECKINS, list);
  }

  // Weekly Schedule
  getWeeklySchedule(): WeeklyScheduleDay[] {
    const rawSchedule = this.getItem<WeeklyScheduleDay[]>(STORAGE_KEYS.WEEKLY_SCHEDULE, SEED_WEEKLY_SCHEDULE);
    const routines = this.getRoutines();

    if (routines.length > 0 && Array.isArray(rawSchedule)) {
      return rawSchedule.map((day) => {
        if (day.activity_type === 'strength') {
          const matchedRoutine = day.routine_id
            ? routines.find((r) => r.id === day.routine_id)
            : routines.find(
                (r) =>
                  (r.split_tag && day.primary_activity.toLowerCase().includes(r.split_tag.toLowerCase())) ||
                  (r.title && day.primary_activity.toLowerCase().includes(r.title.toLowerCase())) ||
                  (r.title && r.title.toLowerCase().includes(day.primary_activity.toLowerCase()))
              );

          if (matchedRoutine) {
            return {
              ...day,
              routine_id: matchedRoutine.id,
              primary_activity: matchedRoutine.title,
            };
          }
        }
        return day;
      });
    }

    return rawSchedule;
  }

  saveWeeklySchedule(schedule: WeeklyScheduleDay[]): void {
    this.setItem(STORAGE_KEYS.WEEKLY_SCHEDULE, schedule);
    this.syncToSupabase({ weekly_schedule: schedule });
  }

  toggleScheduleDay(dayIndex: number): void {
    const schedule = this.getWeeklySchedule();
    const target = schedule.find((s) => s.day_index === dayIndex);
    if (target) {
      target.completed = !target.completed;
      this.saveWeeklySchedule(schedule);
    }
  }

  // Weekly Report
  getWeeklyReport(): WeeklyReport {
    return this.getItem<WeeklyReport>(STORAGE_KEYS.WEEKLY_REPORT, SEED_WEEKLY_REPORT);
  }

  // Coach Messages
  getCoachMessages(): AICoachMessage[] {
    return this.getItem<AICoachMessage[]>(STORAGE_KEYS.COACH_MESSAGES, [
      {
        id: 'msg-init-1',
        sender: 'assistant',
        content:
          'Olá, Atleta! Sou o seu **Coach IA Meu Treinador** 🏋️‍♂️🏃.\n\nAcompanho sua evolução de força, ritmo de corrida, peso e recuperação biológica diária. Como posso te orientar no treino de hoje?',
        timestamp: new Date().toISOString(),
        category: 'general',
      },
    ]);
  }

  saveCoachMessages(messages: AICoachMessage[]): void {
    this.setItem(STORAGE_KEYS.COACH_MESSAGES, messages);
  }

  // Initialize fresh athlete platform from scratch
  initializeCleanAthleteData(
    profile: UserProfile,
    options?: {
      startFresh?: boolean;
      weeklyDays?: number;
      goal?: string;
    }
  ): void {
    const todayStr = new Date().toISOString().split('T')[0];
    const weeklyDays = options?.weeklyDays || 4;

    // 1. Save Profile
    this.saveProfile(profile);

    // 2. Initial Body Metric (start at their current weight)
    const initialMetric: BodyMetrics = {
      id: `bm-${Date.now()}`,
      date: todayStr,
      weight_kg: profile.current_weight_kg || profile.initial_weight_kg || 75,
      notes: 'Cadastro inicial na plataforma Meu Treinador',
    };
    this.setItem(STORAGE_KEYS.BODY_METRICS, [initialMetric]);

    if (options?.startFresh) {
      // Clean start: no past logs, 0 workouts, 0 mock routines
      this.setItem(STORAGE_KEYS.ROUTINES, []);
      this.setItem(STORAGE_KEYS.WORKOUT_LOGS, []);
      this.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, null);
      this.setItem(STORAGE_KEYS.RUNNING_LOGS, []);
      this.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, []);
      this.setItem(STORAGE_KEYS.RECOVERY_CHECKINS, []);
    }

    // 3. Initialize Goals strictly from onboarding data
    const initialGoals: import('@/types').GoalItem[] = [];

    // Frequency goal (from onboarding weekly days)
    if (weeklyDays) {
      initialGoals.push({
        id: `goal-freq-${Date.now()}`,
        title: 'Meta de Frequência Semanal',
        type: 'frequencia',
        currentValue: 0,
        targetValue: weeklyDays,
        unit: 'treinos',
      });
    }

    // Body Weight goal (from onboarding current & target weight)
    if (profile.target_weight_kg && profile.target_weight_kg > 0) {
      initialGoals.push({
        id: `goal-weight-${Date.now()}`,
        title: 'Meta de Peso Corporal',
        type: 'personalizada',
        currentValue: profile.current_weight_kg || profile.initial_weight_kg || 75,
        targetValue: profile.target_weight_kg,
        unit: 'kg',
      });
    }

    // Bench PR goal (if specified in onboarding)
    if (profile.bench_pr_kg && profile.bench_pr_kg > 0) {
      initialGoals.push({
        id: `goal-bench-${Date.now()}`,
        title: 'Meta de Supino Reto',
        type: 'carga',
        currentValue: 0,
        targetValue: profile.bench_pr_kg,
        unit: 'kg',
      });
    }

    // Squat PR goal (if specified in onboarding)
    if (profile.squat_pr_kg && profile.squat_pr_kg > 0) {
      initialGoals.push({
        id: `goal-squat-${Date.now()}`,
        title: 'Meta de Agachamento Livre',
        type: 'carga',
        currentValue: 0,
        targetValue: profile.squat_pr_kg,
        unit: 'kg',
      });
    }

    // Deadlift PR goal (if specified in onboarding)
    if (profile.deadlift_pr_kg && profile.deadlift_pr_kg > 0) {
      initialGoals.push({
        id: `goal-deadlift-${Date.now()}`,
        title: 'Meta de Levantamento Terra',
        type: 'carga',
        currentValue: 0,
        targetValue: profile.deadlift_pr_kg,
        unit: 'kg',
      });
    }

    // Running Goal (if running was enabled in onboarding)
    if (profile.best_5k_time && profile.best_5k_time !== '--:--' && profile.best_5k_time !== '') {
      initialGoals.push({
        id: `goal-running-${Date.now()}`,
        title: 'Meta de Corrida 5km',
        type: 'personalizada',
        currentValue: 0,
        targetValue: 5,
        unit: 'km',
      });
    }

    this.saveGoals(initialGoals);

    // 4. Generate initial weekly schedule
    const userRoutines = this.getRoutines();
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const generatedSchedule: WeeklyScheduleDay[] = days.map((dayName, idx) => {
      let isTraining = false;
      let activity = '🛌 Descanso Ativo / Recuperação';
      let type: 'strength' | 'running' | 'rest' | 'hybrid' = 'rest';
      let routineId: string | undefined = undefined;

      if (weeklyDays >= 3 && (idx === 0 || idx === 2 || idx === 4)) {
        isTraining = true;
        const routineIndex = idx === 0 ? 0 : idx === 2 ? 1 : 2;
        const routine = userRoutines[routineIndex];
        if (routine) {
          activity = routine.title;
          routineId = routine.id;
        } else {
          activity = idx === 0 ? 'Ficha A' : idx === 2 ? 'Ficha B' : 'Ficha C';
        }
        type = 'strength';
      } else if (weeklyDays >= 4 && idx === 1) {
        isTraining = true;
        activity = '🏃 Corrida / Cardio Ritmo';
        type = 'running';
      } else if (weeklyDays >= 5 && idx === 3) {
        isTraining = true;
        const routine = userRoutines[3];
        if (routine) {
          activity = routine.title;
          routineId = routine.id;
        } else {
          activity = 'Ficha D';
        }
        type = 'strength';
      } else if (weeklyDays >= 6 && idx === 5) {
        isTraining = true;
        activity = '🏃 Longão / Endurance';
        type = 'running';
      }

      return {
        day_name: dayName,
        day_index: idx,
        primary_activity: activity,
        activity_type: type,
        routine_id: routineId,
        completed: false,
        notes: isTraining ? 'Programado conforme perfil do atleta' : 'Dia de regeneração biológica',
      };
    });
    this.setItem(STORAGE_KEYS.WEEKLY_SCHEDULE, generatedSchedule);

    // 4. Coach AI Welcome
    const welcomeMsg: AICoachMessage = {
      id: `msg-welcome-${Date.now()}`,
      sender: 'assistant',
      content: `Olá, **${profile.name.split(' ')[0]}**! Seja muito bem-vindo ao **Meu Treinador** 🚀.\n\nSeu perfil foi configurado para **${options?.goal || profile.experience_level || 'Hipertrofia & Performance'}** com meta de peso de **${profile.target_weight_kg}kg** (peso atual: **${profile.current_weight_kg}kg**).\n\nEstou pronto para acompanhar cada repetição, calcular sua sobrecarga progressiva e analisar sua recuperação diária. Qual é o plano de hoje?`,
      timestamp: new Date().toISOString(),
      category: 'general',
    };
    this.setItem(STORAGE_KEYS.COACH_MESSAGES, [welcomeMsg]);
  }
}

export const appStorage = new AppStorage();

