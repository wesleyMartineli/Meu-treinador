import {
  WorkoutPlan,
  ExerciseItem,
  UserAthleteProfile,
  EvolutionDataPoint,
  GoalItem,
  AchievementItem,
  StudentListItem,
  TrainerDashboardMetrics,
  WorkoutSummary,
} from '@/types';

// Structured initial mock data for development demonstration
export const INITIAL_USER: UserAthleteProfile = {
  id: 'usr-1',
  name: 'Atleta',
  email: 'atleta@meutreinador.pro',
  goal: 'Hipertrofia & Ganho de Força',
  currentStreakDays: 0,
  totalWorkoutsDone: 0,
  currentWeightKg: 75.0,
  targetWeightKg: 75.0,
  heightCm: 175,
  experienceLevel: 'iniciante',
  weeklyFrequencyGoal: 4,
  weeklyFrequencyDone: 0,
  role: 'aluno',
};

import { COMPREHENSIVE_EXERCISES } from './exerciseDatabase';

export const SAMPLE_EXERCISES: ExerciseItem[] = COMPREHENSIVE_EXERCISES;

export const TODAY_WORKOUT: WorkoutPlan = {
  id: 'wk-today',
  title: 'Treino A — Peito, Ombros & Tríceps',
  subtitle: 'Foco em Sobrecarga Progressiva e Tensão Mecânica',
  estimatedTimeMin: 55,
  totalExercises: 5,
  splitTag: 'Push / Superior',
  isCompletedToday: false,
  exercises: [
    {
      exercise: SAMPLE_EXERCISES[0],
      sets: [
        { id: 's-1', setNumber: 1, weightKg: 80, reps: 10, rpe: 8, completed: false },
        { id: 's-2', setNumber: 2, weightKg: 80, reps: 10, rpe: 8, completed: false },
        { id: 's-3', setNumber: 3, weightKg: 85, reps: 8, rpe: 9, completed: false },
        { id: 's-4', setNumber: 4, weightKg: 85, reps: 8, rpe: 9.5, completed: false },
      ],
    },
    {
      exercise: SAMPLE_EXERCISES[1],
      sets: [
        { id: 's-5', setNumber: 1, weightKg: 24, reps: 12, rpe: 8, completed: false },
        { id: 's-6', setNumber: 2, weightKg: 24, reps: 10, rpe: 8.5, completed: false },
        { id: 's-7', setNumber: 3, weightKg: 26, reps: 8, rpe: 9, completed: false },
        { id: 's-8', setNumber: 4, weightKg: 26, reps: 8, rpe: 9.5, completed: false },
      ],
    },
    {
      exercise: SAMPLE_EXERCISES[5],
      sets: [
        { id: 's-9', setNumber: 1, weightKg: 12, reps: 15, rpe: 8, completed: false },
        { id: 's-10', setNumber: 2, weightKg: 14, reps: 12, rpe: 9, completed: false },
        { id: 's-11', setNumber: 3, weightKg: 14, reps: 12, rpe: 9, completed: false },
      ],
    },
    {
      exercise: SAMPLE_EXERCISES[3],
      sets: [
        { id: 's-12', setNumber: 1, weightKg: 25, reps: 15, rpe: 8, completed: false },
        { id: 's-13', setNumber: 2, weightKg: 30, reps: 12, rpe: 9, completed: false },
        { id: 's-14', setNumber: 3, weightKg: 30, reps: 10, rpe: 9.5, completed: false },
      ],
    },
    {
      exercise: SAMPLE_EXERCISES[6],
      sets: [
        { id: 's-15', setNumber: 1, weightKg: 0, reps: 45, rpe: 8, completed: false },
        { id: 's-16', setNumber: 2, weightKg: 0, reps: 45, rpe: 8.5, completed: false },
        { id: 's-17', setNumber: 3, weightKg: 0, reps: 45, rpe: 9, completed: false },
      ],
    },
  ],
};

export const EVOLUTION_SERIES: EvolutionDataPoint[] = [
  { date: '01/08', weightKg: 79.5, chestCm: 102, waistCm: 84, armCm: 37.5, benchKg: 75, squatKg: 90, deadliftKg: 120, weeklyVolumeTons: 18.2, workoutFrequency: 4 },
  { date: '15/08', weightKg: 80.0, chestCm: 102.5, waistCm: 83.5, armCm: 38.0, benchKg: 77.5, squatKg: 92.5, deadliftKg: 125, weeklyVolumeTons: 19.5, workoutFrequency: 5 },
  { date: '01/09', weightKg: 80.8, chestCm: 103, waistCm: 83, armCm: 38.5, benchKg: 80, squatKg: 95, deadliftKg: 130, weeklyVolumeTons: 21.0, workoutFrequency: 5 },
  { date: '15/09', weightKg: 81.3, chestCm: 104, waistCm: 82.5, armCm: 39.0, benchKg: 82.5, squatKg: 97.5, deadliftKg: 135, weeklyVolumeTons: 22.8, workoutFrequency: 4 },
  { date: '01/10', weightKg: 82.4, chestCm: 105, waistCm: 82.0, armCm: 39.5, benchKg: 85, squatKg: 100, deadliftKg: 140, weeklyVolumeTons: 24.5, workoutFrequency: 5 },
];

export const USER_GOALS: GoalItem[] = [];

export const USER_ACHIEVEMENTS: AchievementItem[] = [
  { id: 'ac-1', title: 'Primeiro Treino', description: 'Completou a primeira sessão na plataforma.', unlocked: true, unlockedAt: '12/08/2026', iconName: 'Dumbbell', badgeLevel: 'bronze' },
  { id: 'ac-2', title: '10 Treinos Concluídos', description: 'Construindo o hábito da disciplina.', unlocked: true, unlockedAt: '25/08/2026', iconName: 'Flame', badgeLevel: 'bronze' },
  { id: 'ac-3', title: '30 Treinos de Consistência', description: 'Manteve a rotina de alta performance.', unlocked: true, unlockedAt: '20/09/2026', iconName: 'Trophy', badgeLevel: 'silver' },
  { id: 'ac-4', title: '100 Treinos — Modo Atleta', description: 'Consistência inabalável e evolução sólida.', unlocked: false, iconName: 'Crown', badgeLevel: 'gold' },
  { id: 'ac-5', title: 'Primeiro Recorde Pessoal', description: 'Bateu novo PR em exercício composto.', unlocked: true, unlockedAt: '15/09/2026', iconName: 'Zap', badgeLevel: 'silver' },
  { id: 'ac-6', title: '7 Dias Consecutivos', description: 'Uma semana inteira de dedicação ativa.', unlocked: true, unlockedAt: '01/09/2026', iconName: 'ShieldCheck', badgeLevel: 'silver' },
  { id: 'ac-7', title: '30 Dias de Consistência', description: 'Transformou disciplina em resultado inquestionável.', unlocked: false, iconName: 'Award', badgeLevel: 'special' },
];

export const TRAINER_METRICS: TrainerDashboardMetrics = {
  totalStudents: 34,
  activeStudents: 31,
  workoutsDoneThisMonth: 412,
  attentionNeededCount: 3,
};

export const TRAINER_STUDENTS: StudentListItem[] = [
  {
    id: 'std-1',
    name: 'Atleta',
    email: 'atleta@meutreinador.pro',
    goal: 'Hipertrofia & Força',
    currentWorkoutTitle: 'Treino A (Push)',
    lastActive: 'Hoje às 08:30',
    weeklyFrequency: '4/5 treinos',
    status: 'ativo',
    evolutionScore: 92,
  },
  {
    id: 'std-2',
    name: 'Carlos Mendes',
    email: 'carlos.m@gmail.com',
    goal: 'Emagrecimento & Condicionamento',
    currentWorkoutTitle: 'Full Body Híbrido',
    lastActive: 'Ontem',
    weeklyFrequency: '3/4 treinos',
    status: 'ativo',
    evolutionScore: 84,
  },
  {
    id: 'std-3',
    name: 'Mariana Duarte',
    email: 'mariana.d@yahoo.com',
    goal: 'Ganho de Massa Muscular',
    currentWorkoutTitle: 'Treino B (Pernas / Glúteo)',
    lastActive: 'Há 5 dias',
    weeklyFrequency: '1/4 treinos',
    status: 'atencao',
    evolutionScore: 58,
  },
  {
    id: 'std-4',
    name: 'Lucas Ferreira',
    email: 'lucas.f@outlook.com',
    goal: 'Performance Esportiva',
    currentWorkoutTitle: 'Treino C (Pull)',
    lastActive: 'Hoje às 11:00',
    weeklyFrequency: '5/5 treinos',
    status: 'ativo',
    evolutionScore: 98,
  },
  {
    id: 'std-5',
    name: 'Renata Albuquerque',
    email: 'renata.a@gmail.com',
    goal: 'Reabilitação & Força',
    currentWorkoutTitle: 'Treino Adaptado 2',
    lastActive: 'Há 8 dias',
    weeklyFrequency: '0/3 treinos',
    status: 'atencao',
    evolutionScore: 42,
  },
];
