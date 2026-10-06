'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types/database';
import { appStorage } from '@/lib/storage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface AthleteOnboardingData {
  name: string;
  email: string;
  gender?: 'masculino' | 'feminino' | 'outro';
  age?: number;
  height_cm: number;
  current_weight_kg: number;
  target_weight_kg: number;
  goal: string;
  experience_level: 'iniciante' | 'intermediario' | 'avancado' | 'atleta';
  weekly_frequency_days: number;
  includes_running: boolean;
  bench_pr_kg?: number;
  squat_pr_kg?: number;
  deadlift_pr_kg?: number;
  best_5k_time?: string;
  best_5k_pace?: string;
  start_fresh: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; isOnboarded?: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; isOnboarded?: boolean; error?: string }>;
  completeAthleteOnboarding: (data: AthleteOnboardingData) => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  resetToFreshAccount: () => void;
}

const AUTH_STORAGE_KEYS = {
  CURRENT_USER_ID: 'meutreinador_current_user_id',
  USER_EMAIL: 'meutreinador_user_email',
};

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function hashPassword(password: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(`meutreinador_salt_${password}`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {}
  }
  return btoa(`salt_${password}`);
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load active user session on startup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initAuth = async () => {
      try {
        const currentUserId = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID);
        const storedEmail = localStorage.getItem(AUTH_STORAGE_KEYS.USER_EMAIL);

        // If no active user session is saved, stay logged out
        if (!currentUserId && !storedEmail) {
          setUser(null);
          setIsAuthenticated(false);
          setIsOnboarded(false);
          setIsLoading(false);
          return;
        }

        // Query Supabase for the active session's user
        if (isSupabaseConfigured()) {
          try {
            const query = supabase.from('profiles').select('*');
            if (storedEmail) {
              query.eq('email', storedEmail.toLowerCase());
            } else if (currentUserId) {
              query.eq('id', currentUserId);
            }
            const { data: remoteProfile } = await query.maybeSingle();

            if (remoteProfile) {
              const isOnb = Boolean(remoteProfile.is_onboarded);
              appStorage.loadUserDataFromSupabaseProfile(remoteProfile);
              setUser(remoteProfile);
              setIsAuthenticated(true);
              setIsOnboarded(isOnb);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.warn('Could not sync with Supabase on startup:', e);
          }
        }

        // If not found in database or invalid session, clear session
        appStorage.clearSession();
        setUser(null);
        setIsAuthenticated(false);
        setIsOnboarded(false);
      } catch (err) {
        console.error('Error loading auth session:', err);
        setUser(null);
        setIsAuthenticated(false);
        setIsOnboarded(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Listen for storage events (e.g. Profile saved elsewhere)
  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key?: string }>;
      if (!customEvent.detail || customEvent.detail.key === 'meutreinador_profile_v2') {
        const updated = appStorage.getProfile();
        if (updated && updated.name && updated.name !== 'Atleta') {
          setUser((prev) => (prev ? { ...prev, ...updated } : updated));
        }
      }
    };

    window.addEventListener('meutreinador_storage_change', handleStorageChange);
    return () => window.removeEventListener('meutreinador_storage_change', handleStorageChange);
  }, []);

  // Register New User
  const register = async (name: string, email: string, password?: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      if (!trimmedEmail || !trimmedName) {
        return { success: false, error: 'Por favor, informe seu nome e e-mail.' };
      }

      if (!password || password.length < 4) {
        return { success: false, error: 'A senha deve conter no mínimo 4 caracteres.' };
      }

      const passwordHash = await hashPassword(password);

      // 1. Verify if user already exists in Supabase
      if (isSupabaseConfigured()) {
        const { data: existingRemote } = await supabase
          .from('profiles')
          .select('id, email, is_onboarded, password_hash')
          .eq('email', trimmedEmail)
          .maybeSingle();

        if (existingRemote) {
          return {
            success: false,
            error: 'Este e-mail já está cadastrado. Por favor, utilize a aba "Entrar" para acessar.',
          };
        }
      }

      const userId = generateUUID();

      const newProfile: UserProfile = {
        id: userId,
        name: trimmedName,
        email: trimmedEmail,
        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(trimmedName)}`,
        initial_weight_kg: 75.0,
        target_weight_kg: 75.0,
        current_weight_kg: 75.0,
        height_cm: 175,
        experience_level: 'iniciante',
        bench_pr_kg: 0,
        squat_pr_kg: 0,
        deadlift_pr_kg: 0,
        best_5k_time: '--:--',
        best_5k_pace: '--:--',
        streak_days: 0,
        total_workouts_completed: 0,
      };

      // 2. Insert into Supabase
      if (isSupabaseConfigured()) {
        const { error: insertErr } = await supabase.from('profiles').insert({
          id: userId,
          name: trimmedName,
          email: trimmedEmail,
          password_hash: passwordHash,
          avatar_url: newProfile.avatar_url,
          initial_weight_kg: 75.0,
          target_weight_kg: 75.0,
          current_weight_kg: 75.0,
          height_cm: 175,
          experience_level: 'iniciante',
          is_onboarded: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (insertErr) {
          console.error('Supabase insert error:', insertErr);
          return { success: false, error: 'Erro ao cadastrar usuário no banco de dados.' };
        }
      }

      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, userId);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);

      appStorage.initializeCleanAthleteData(newProfile, { startFresh: true });

      setUser(newProfile);
      setIsAuthenticated(true);
      setIsOnboarded(false);

      return { success: true, isOnboarded: false };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Falha ao criar usuário. Tente novamente.' };
    }
  };

  // Login Existing User with Password Validation
  const login = async (email: string, password?: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail || !trimmedEmail.includes('@')) {
        return { success: false, error: 'Informe um e-mail válido.' };
      }

      if (!password) {
        return { success: false, error: 'Informe sua senha de acesso.' };
      }

      const inputPasswordHash = await hashPassword(password);

      // Validate against Supabase Database
      if (isSupabaseConfigured()) {
        const { data: remoteProfile, error: queryErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', trimmedEmail)
          .maybeSingle();

        if (queryErr) {
          console.error('Error fetching profile from Supabase:', queryErr);
          return { success: false, error: 'Erro ao conectar ao banco de dados. Tente novamente.' };
        }

        if (!remoteProfile) {
          return {
            success: false,
            error: 'Usuário não encontrado. Verifique seu e-mail ou crie uma nova conta.',
          };
        }

        // Validate Password Hash
        if (remoteProfile.password_hash) {
          if (remoteProfile.password_hash !== inputPasswordHash) {
            return {
              success: false,
              error: 'Senha incorreta. Por favor, verifique sua senha e tente novamente.',
            };
          }
        } else {
          // If first login on legacy account without hash, set their password hash
          void Promise.resolve(
            supabase
              .from('profiles')
              .update({ password_hash: inputPasswordHash, updated_at: new Date().toISOString() })
              .eq('id', remoteProfile.id)
          );
        }

        // Load all data specific to this user
        const isOnb = Boolean(remoteProfile.is_onboarded);
        localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, remoteProfile.id);
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);

        appStorage.loadUserDataFromSupabaseProfile(remoteProfile);

        setUser(remoteProfile);
        setIsAuthenticated(true);
        setIsOnboarded(isOnb);

        return { success: true, isOnboarded: isOnb };
      }

      return {
        success: false,
        error: 'Banco de dados não configurado. Verifique as variáveis de ambiente.',
      };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Falha ao autenticar usuário.' };
    }
  };

  // Complete Athlete Onboarding & Save Platform Data
  const completeAthleteOnboarding = async (data: AthleteOnboardingData) => {
    try {
      if (!user) return { success: false, error: 'Nenhum usuário ativo na sessão.' };

      const updatedProfile: UserProfile = {
        ...user,
        name: data.name.trim() || user.name,
        email: data.email.trim().toLowerCase() || user.email,
        initial_weight_kg: Number(data.current_weight_kg) || 75,
        current_weight_kg: Number(data.current_weight_kg) || 75,
        target_weight_kg: Number(data.target_weight_kg) || Number(data.current_weight_kg) || 75,
        height_cm: Number(data.height_cm) || 175,
        experience_level: data.experience_level || 'iniciante',
        bench_pr_kg: Number(data.bench_pr_kg) || 0,
        squat_pr_kg: Number(data.squat_pr_kg) || 0,
        deadlift_pr_kg: Number(data.deadlift_pr_kg) || 0,
        best_5k_time: data.best_5k_time || '--:--',
        best_5k_pace: data.best_5k_pace || '--:--',
        streak_days: 0,
        total_workouts_completed: 0,
      };

      // Initialize clean data in appStorage
      appStorage.initializeCleanAthleteData(updatedProfile, {
        startFresh: data.start_fresh,
        weeklyDays: data.weekly_frequency_days,
        goal: data.goal,
      });

      const weeklySchedule = appStorage.getWeeklySchedule();
      const goals = appStorage.getGoals();
      const routines = appStorage.getRoutines();

      // Save to Supabase
      if (isSupabaseConfigured()) {
        try {
          await supabase.from('profiles').upsert({
            id: updatedProfile.id,
            name: updatedProfile.name,
            email: updatedProfile.email.toLowerCase(),
            avatar_url: updatedProfile.avatar_url,
            initial_weight_kg: updatedProfile.initial_weight_kg,
            target_weight_kg: updatedProfile.target_weight_kg,
            current_weight_kg: updatedProfile.current_weight_kg,
            height_cm: updatedProfile.height_cm,
            experience_level: updatedProfile.experience_level,
            bench_pr_kg: updatedProfile.bench_pr_kg,
            squat_pr_kg: updatedProfile.squat_pr_kg,
            deadlift_pr_kg: updatedProfile.deadlift_pr_kg,
            best_5k_time: updatedProfile.best_5k_time,
            best_5k_pace: updatedProfile.best_5k_pace,
            streak_days: 0,
            total_workouts_completed: 0,
            is_onboarded: true,
            weekly_schedule: weeklySchedule,
            goals: goals,
            routines: routines,
            updated_at: new Date().toISOString(),
          });
        } catch (dbErr) {
          console.error('Error saving onboarding data to Supabase:', dbErr);
        }
      }

      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, updatedProfile.id);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, updatedProfile.email.toLowerCase());

      setUser(updatedProfile);
      setIsOnboarded(true);

      return { success: true };
    } catch (err) {
      console.error('Error completing onboarding:', err);
      return { success: false, error: 'Erro ao salvar dados do atleta.' };
    }
  };

  // Update profile attributes
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    appStorage.saveProfile(updated);

    if (isSupabaseConfigured()) {
      void Promise.resolve(
        supabase.from('profiles').upsert({
          id: updated.id,
          name: updated.name,
          email: updated.email.toLowerCase(),
          ...updates,
          updated_at: new Date().toISOString(),
        })
      );
    }
  };

  // Logout
  const logout = () => {
    appStorage.clearSession();
    setUser(null);
    setIsAuthenticated(false);
    setIsOnboarded(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  // Reset to Fresh Account
  const resetToFreshAccount = () => {
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isOnboarded,
        isLoading,
        login,
        register,
        completeAthleteOnboarding,
        updateUserProfile,
        logout,
        resetToFreshAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
