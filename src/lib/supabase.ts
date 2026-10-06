import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fzajlbyfqvbfpkwedodz.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6YWpsYnlmcXZiZnBrd2Vkb2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDI5MDQsImV4cCI6MjA5NDk3ODkwNH0.w3jFZHg4tQ0gSZE2Ts2cCAc8ax1jckGVUd0jkAsRXms';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    supabaseUrl !== 'https://mock-supabase-placeholder.supabase.co' &&
    Boolean(supabaseAnonKey) &&
    supabaseAnonKey !== 'mock-anon-key-placeholder'
  );
};
