export type MuscleGroup =
  | 'peito'
  | 'costas'
  | 'ombros'
  | 'biceps'
  | 'triceps'
  | 'antebraco'
  | 'quadriceps'
  | 'posterior'
  | 'gluteos'
  | 'panturrilha'
  | 'core'
  | 'cardio'
  | 'corrida'
  | 'mobilidade';

export type EquipmentType =
  | 'barra'
  | 'halteres'
  | 'maquina'
  | 'polia'
  | 'peso_corporal'
  | 'kettlebell'
  | 'elastico'
  | 'esteira'
  | 'rua'
  | 'pista'
  | 'trilha'
  | 'outro';

export type ExerciseFocus =
  | 'forca'
  | 'hipertrofia'
  | 'resistencia'
  | 'mobilidade'
  | 'prevencao';

export type SetType = 'normal' | 'aquecimento' | 'dropset' | 'biset' | 'rest_pause' | 'falha';

export interface Exercise {
  id: string;
  name: string;
  primary_muscle: MuscleGroup;
  secondary_muscles: MuscleGroup[];
  equipment: EquipmentType;
  focus: ExerciseFocus;
  video_url?: string;
  image_url?: string;
  description: string;
  execution_cues: string[];
  common_mistakes: string[];
  is_custom?: boolean;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;
  exercise_id: string;
  exercise?: Exercise;
  order_index: number;
  target_sets: number;
  target_reps_min: number;
  target_reps_max: number;
  target_weight_kg?: number;
  rest_seconds: number;
  set_type: SetType;
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  split_tag: string; // "Treino A", "Treino B", "Push", "Pull", etc.
  day_of_week?: number; // 0 = Sunday, 1 = Monday...
  color: string;
  estimated_duration_min?: number;
  exercises: RoutineExercise[];
  created_at: string;
  updated_at: string;
}

export interface WorkoutSetLog {
  id: string;
  exercise_log_id: string;
  set_number: number;
  weight_kg: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  set_type: SetType;
  completed: boolean;
  is_pr?: boolean;
}

export interface WorkoutExerciseLog {
  id: string;
  workout_log_id: string;
  exercise_id: string;
  exercise_name: string;
  sets: WorkoutSetLog[];
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  routine_id?: string;
  routine_title?: string;
  title: string;
  date?: string;
  started_at: string;
  completed_at?: string;
  duration_minutes: number;
  total_volume_kg: number;
  total_sets_completed: number;
  exercises: WorkoutExerciseLog[];
  rpe_overall?: number;
  notes?: string;
  prs_broken?: string[];
}

export type RunningTerrain = 'asfalto' | 'esteira' | 'trilha' | 'pista' | 'misto';
export type RunningWorkoutType = 'base' | 'longao' | 'intervalado' | 'ritmo' | 'tempo_run' | 'fartlek' | 'regenerativo';

export interface RunningLog {
  id: string;
  date: string;
  title: string;
  workout_type: RunningWorkoutType;
  distance_km: number;
  duration_seconds: number; // total in seconds
  pace_min_per_km: string; // e.g. "5:15"
  speed_kmh: number;
  elevation_gain_m?: number;
  avg_heart_rate_bpm?: number;
  max_heart_rate_bpm?: number;
  rpe?: number; // 1-10
  terrain: RunningTerrain;
  shoes?: string;
  notes?: string;
  splits?: { km: number; pace: string; heartRate?: number }[];
}

export interface RunningPlan {
  id: string;
  goal_name: string; // e.g. "5km Sub-25min"
  target_distance_km: number;
  target_time_seconds: number;
  current_best_pace: string;
  target_pace: string;
  target_date: string;
  weekly_target_km: number;
  sessions_per_week: number;
  schedule_suggestion: {
    tuesday: string;
    thursday: string;
    saturday: string;
  };
}

export interface BodyMetrics {
  id: string;
  date: string;
  weight_kg: number;
  body_fat_percent?: number;
  waist_cm?: number;
  chest_cm?: number;
  arm_left_cm?: number;
  arm_right_cm?: number;
  thigh_left_cm?: number;
  thigh_right_cm?: number;
  calves_cm?: number;
  notes?: string;
}

export interface ProgressPhoto {
  id: string;
  date: string;
  front_url?: string;
  side_url?: string;
  back_url?: string;
  weight_kg?: number;
  notes?: string;
}

export type ReadinessCategory = 'intense' | 'moderate' | 'recovery';

export interface RecoveryCheckin {
  id: string;
  date: string;
  sleep_score: number; // 0-10
  energy_score: number; // 0-10
  muscle_soreness_score: number; // 0-10 (10 = severe soreness, 0 = none)
  stress_score: number; // 0-10 (10 = high stress)
  motivation_score: number; // 0-10
  readiness_total: number; // 0-100 calculated
  status: ReadinessCategory;
  ai_recommendation: string;
}

export interface WeeklyScheduleDay {
  day_name: string; // "Segunda", "Terça", etc.
  day_index: number; // 0-6
  primary_activity: string; // "🏋 Musculação A", "🏃 Corrida Ritmo", "🛌 Descanso"
  activity_type: 'strength' | 'running' | 'rest' | 'hybrid';
  routine_id?: string;
  running_modality?: RunningWorkoutType;
  target_distance_km?: number;
  target_duration_minutes?: number;
  completed: boolean;
  date_str?: string;
  notes?: string;
}

export interface WeeklyReport {
  id: string;
  week_start: string;
  week_end: string;
  total_workouts: number;
  strength_sessions: number;
  running_sessions: number;
  total_tonnage_kg: number;
  total_running_km: number;
  weight_delta_kg: number;
  volume_increase_percent: number;
  highlights: string[];
  coach_feedback: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  initial_weight_kg: number;
  target_weight_kg: number;
  current_weight_kg: number;
  height_cm: number;
  experience_level: 'iniciante' | 'intermediario' | 'avancado' | 'atleta';
  bench_pr_kg: number;
  squat_pr_kg: number;
  deadlift_pr_kg: number;
  best_5k_time: string;
  best_5k_pace: string;
  streak_days: number;
  total_workouts_completed: number;
  weekly_frequency_days?: number;
  goal?: string;
  gender?: 'masculino' | 'feminino' | 'outro';
  age?: number;
  includes_running?: boolean;
}

export interface AICoachMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  category?: 'strength' | 'running' | 'recovery' | 'nutrition' | 'general';
}
