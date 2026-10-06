export type MuscleGroup =
  | 'peito'
  | 'costas'
  | 'ombros'
  | 'bracos'
  | 'pernas'
  | 'core'
  | 'cardio'
  | 'corrida';

export type EquipmentType =
  | 'barra'
  | 'halteres'
  | 'maquina'
  | 'polia'
  | 'peso_corporal'
  | 'kettlebell'
  | 'esteira'
  | 'rua'
  | 'pista'
  | 'trilha'
  | 'outro';

export interface ExerciseItem {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: EquipmentType;
  instructions: string[];
  targetSets: number;
  targetReps: string;
  restSeconds: number;
  suggestedWeightKg?: number;
  gifUrl?: string;
  coverImage?: string;
  targetAnatomy?: string;
  secondaryMuscles?: string[];
  commonMistakes?: string[];
}

export interface WorkoutSetRecord {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe?: number; // 1-10
  completed: boolean;
  isPr?: boolean;
}

export interface WorkoutExerciseState {
  exercise: ExerciseItem;
  sets: WorkoutSetRecord[];
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  subtitle?: string;
  estimatedTimeMin: number;
  totalExercises: number;
  splitTag: string; // "Treino A", "Push", "Superior", etc.
  exercises: WorkoutExerciseState[];
  isCompletedToday?: boolean;
}

export interface WorkoutSummary {
  id: string;
  workoutTitle: string;
  durationSeconds: number;
  totalExercisesCompleted: number;
  totalSetsCompleted: number;
  totalVolumeKg: number;
  caloriesBurned?: number; // apenas se dado real disponivel
  newPrsCount: number;
  completedAt: string;
}

export interface UserAthleteProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  goal: string;
  currentStreakDays: number;
  totalWorkoutsDone: number;
  currentWeightKg: number;
  targetWeightKg: number;
  heightCm: number;
  experienceLevel: 'iniciante' | 'intermediario' | 'avancado' | 'atleta';
  weeklyFrequencyGoal: number;
  weeklyFrequencyDone: number;
  role: 'aluno' | 'treinador';
}

export interface EvolutionDataPoint {
  date: string;
  weightKg: number;
  chestCm?: number;
  waistCm?: number;
  armCm?: number;
  thighCm?: number;
  squatKg?: number;
  benchKg?: number;
  deadliftKg?: number;
  weeklyVolumeTons?: number;
  workoutFrequency?: number;
}

export interface GoalItem {
  id: string;
  title: string;
  type: 'frequencia' | 'carga' | 'consistencia' | 'personalizada';
  currentValue: number;
  targetValue: number;
  unit: string;
  deadlineDate?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  badgeLevel: 'bronze' | 'silver' | 'gold' | 'special';
}

export interface StudentListItem {
  id: string;
  name: string;
  avatarUrl?: string;
  email: string;
  goal: string;
  currentWorkoutTitle: string;
  lastActive: string;
  weeklyFrequency: string; // e.g. "4/5 dias"
  status: 'ativo' | 'atencao' | 'inativo';
  evolutionScore: number; // %
}

export interface TrainerDashboardMetrics {
  totalStudents: number;
  activeStudents: number;
  workoutsDoneThisMonth: number;
  attentionNeededCount: number;
}
