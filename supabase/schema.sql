-- ======================================================================================
-- MEU TREINADOR — BANCO DE DADOS SUPABASE (PostgreSQL)
-- Schema completo com RLS (Row Level Security) e tabelas relacionais
-- ======================================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABELA DE PERFIS DE USUÁRIOS
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  avatar_url text,
  initial_weight_kg numeric(5,2) default 80.0,
  target_weight_kg numeric(5,2) default 75.0,
  current_weight_kg numeric(5,2) default 80.0,
  height_cm integer default 175,
  experience_level text default 'intermediario',
  bench_pr_kg numeric(5,2) default 0,
  squat_pr_kg numeric(5,2) default 0,
  deadlift_pr_kg numeric(5,2) default 0,
  best_5k_time text default '25:00',
  best_5k_pace text default '5:00',
  streak_days integer default 0,
  total_workouts_completed integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BIBLIOTECA DE EXERCÍCIOS
create table if not exists public.exercises (
  id text primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  primary_muscle text not null,
  secondary_muscles text[] default '{}',
  equipment text not null,
  focus text not null,
  video_url text,
  image_url text,
  description text not null,
  execution_cues text[] default '{}',
  common_mistakes text[] default '{}',
  is_custom boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ROTINAS / FICHAS DE TREINO (A/B/C/D)
create table if not exists public.workout_routines (
  id text primary key default ('rotina-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  subtitle text,
  description text,
  split_tag text not null,
  day_of_week integer,
  color text default '#3b82f6',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. EXERCÍCIOS DENTRO DA FICHA
create table if not exists public.routine_exercises (
  id text primary key default ('re-' || floor(extract(epoch from now()))::text),
  routine_id text references public.workout_routines(id) on delete cascade not null,
  exercise_id text references public.exercises(id) on delete cascade not null,
  order_index integer not null default 0,
  target_sets integer not null default 3,
  target_reps_min integer not null default 8,
  target_reps_max integer not null default 12,
  target_weight_kg numeric(5,2) default 0,
  rest_seconds integer not null default 60,
  set_type text not null default 'normal',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. REGISTRO DE SESSÕES DE TREINO REALIZADAS
create table if not exists public.workout_logs (
  id text primary key default ('wlog-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  routine_id text references public.workout_routines(id) on delete set null,
  title text not null,
  started_at timestamp with time zone not null,
  completed_at timestamp with time zone,
  duration_minutes integer default 0,
  total_volume_kg numeric(10,2) default 0,
  total_sets_completed integer default 0,
  rpe_overall integer,
  notes text,
  prs_broken text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. SÉRIES REALIZADAS NO TREINO
create table if not exists public.workout_set_logs (
  id text primary key default ('setlog-' || floor(extract(epoch from now()))::text),
  workout_log_id text references public.workout_logs(id) on delete cascade not null,
  exercise_id text references public.exercises(id) on delete cascade not null,
  set_number integer not null,
  weight_kg numeric(5,2) not null default 0,
  reps integer not null default 0,
  rpe integer,
  set_type text default 'normal',
  completed boolean default true,
  is_pr boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. SESSÕES DE CORRIDA
create table if not exists public.running_logs (
  id text primary key default ('run-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  date timestamp with time zone not null default now(),
  title text not null,
  workout_type text not null default 'ritmo',
  distance_km numeric(5,2) not null,
  duration_seconds integer not null,
  pace_min_per_km text not null,
  speed_kmh numeric(5,2) not null,
  elevation_gain_m integer default 0,
  avg_heart_rate_bpm integer,
  max_heart_rate_bpm integer,
  rpe integer,
  terrain text default 'asfalto',
  shoes text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. METAS E PLANOS DE CORRIDA
create table if not exists public.running_plans (
  id text primary key default ('rplan-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  goal_name text not null,
  target_distance_km numeric(5,2) not null,
  target_time_seconds integer not null,
  current_best_pace text not null,
  target_pace text not null,
  target_date date not null,
  weekly_target_km numeric(5,2) not null default 20,
  sessions_per_week integer not null default 3,
  schedule_suggestion jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. MEDIDAS CORPORAIS
create table if not exists public.body_metrics (
  id text primary key default ('bm-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  date date not null default current_date,
  weight_kg numeric(5,2) not null,
  body_fat_percent numeric(4,1),
  waist_cm numeric(5,1),
  chest_cm numeric(5,1),
  arm_right_cm numeric(4,1),
  arm_left_cm numeric(4,1),
  thigh_right_cm numeric(4,1),
  thigh_left_cm numeric(4,1),
  calves_cm numeric(4,1),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. FOTOS DE EVOLUÇÃO (ANTES X DEPOIS)
create table if not exists public.progress_photos (
  id text primary key default ('photo-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  date date not null default current_date,
  front_url text,
  side_url text,
  back_url text,
  weight_kg numeric(5,2),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. CHECK-IN DIÁRIO DE RECUPERAÇÃO E PRONTIDÃO
create table if not exists public.recovery_checkins (
  id text primary key default ('rec-' || floor(extract(epoch from now()))::text),
  user_id uuid references auth.users on delete cascade,
  date date not null default current_date,
  sleep_score integer not null check (sleep_score between 0 and 10),
  energy_score integer not null check (energy_score between 0 and 10),
  muscle_soreness_score integer not null check (muscle_soreness_score between 0 and 10),
  stress_score integer not null check (stress_score between 0 and 10),
  motivation_score integer not null check (motivation_score between 0 and 10),
  readiness_total integer not null check (readiness_total between 0 and 100),
  status text not null,
  ai_recommendation text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_routines enable row level security;
alter table public.routine_exercises enable row level security;
alter table public.workout_logs enable row level security;
alter table public.workout_set_logs enable row level security;
alter table public.running_logs enable row level security;
alter table public.running_plans enable row level security;
alter table public.body_metrics enable row level security;
alter table public.progress_photos enable row level security;
alter table public.recovery_checkins enable row level security;

-- Public read for pre-built exercises
create policy "Exercises are readable by all authenticated users"
  on public.exercises for select using (true);

-- User isolated data policies
create policy "User can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "User can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "User can manage own workouts" on public.workout_routines for all using (auth.uid() = user_id);
create policy "User can manage own running logs" on public.running_logs for all using (auth.uid() = user_id);
create policy "User can manage own body metrics" on public.body_metrics for all using (auth.uid() = user_id);
create policy "User can manage own photos" on public.progress_photos for all using (auth.uid() = user_id);
create policy "User can manage own checkins" on public.recovery_checkins for all using (auth.uid() = user_id);
