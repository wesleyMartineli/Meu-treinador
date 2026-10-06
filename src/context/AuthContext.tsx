'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types/database';
import { appStorage, STORAGE_KEYS } from '@/lib/storage';
import { SEED_PROFILE } from '@/lib/seed-data';
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

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  createdAt: string;
  isOnboarded: boolean;
  profile: UserProfile;
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
  ACCOUNTS: 'meutreinador_accounts_registry',
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to get all registered accounts
  const getStoredAccounts = (): StoredAccount[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEYS.ACCOUNTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const saveStoredAccounts = (accounts: StoredAccount[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  };

  // Load active user session on startup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initAuth = async () => {
      try {
        const currentUserId = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID);
        const storedEmail = localStorage.getItem(AUTH_STORAGE_KEYS.USER_EMAIL);
        const accounts = getStoredAccounts();

        // 1. Check local accounts first for instant response
        if (currentUserId && accounts.length > 0) {
          const found = accounts.find((acc) => acc.id === currentUserId || (storedEmail && acc.email.toLowerCase() === storedEmail.toLowerCase()));
          if (found) {
            setUser(found.profile);
            setIsAuthenticated(true);
            setIsOnboarded(found.isOnboarded);
          }
        }

        // 2. Query Supabase to sync remote status across devices
        if (isSupabaseConfigured() && (storedEmail || currentUserId)) {
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
              setUser(remoteProfile);
              setIsAuthenticated(true);
              setIsOnboarded(isOnb);
              appStorage.saveProfile(remoteProfile);

              if (remoteProfile.weekly_schedule && Array.isArray(remoteProfile.weekly_schedule)) {
                appStorage.saveWeeklySchedule(remoteProfile.weekly_schedule);
              }
              if (remoteProfile.goals && Array.isArray(remoteProfile.goals)) {
                appStorage.saveGoals(remoteProfile.goals);
              }
              if (remoteProfile.routines && Array.isArray(remoteProfile.routines)) {
                appStorage.setItem(STORAGE_KEYS.ROUTINES, remoteProfile.routines);
              }
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.warn('Could not sync with Supabase on startup:', e);
          }
        }

        // 3. Fallback to local profile if available and auto-upload to Supabase
        const storedProfile = appStorage.getProfile();
        if (storedProfile && storedProfile.name && storedProfile.name !== 'Atleta') {
          setUser(storedProfile);
          setIsAuthenticated(true);
          setIsOnboarded(true);

          if (isSupabaseConfigured() && storedProfile.email) {
            const profileId = (storedProfile.id && storedProfile.id.length === 36) ? storedProfile.id : generateUUID();
            void Promise.resolve(
              supabase.from('profiles').upsert({
                id: profileId,
                name: storedProfile.name,
                email: storedProfile.email.toLowerCase(),
                avatar_url: storedProfile.avatar_url,
                initial_weight_kg: storedProfile.initial_weight_kg,
                target_weight_kg: storedProfile.target_weight_kg,
                current_weight_kg: storedProfile.current_weight_kg,
                height_cm: storedProfile.height_cm,
                experience_level: storedProfile.experience_level,
                bench_pr_kg: storedProfile.bench_pr_kg,
                squat_pr_kg: storedProfile.squat_pr_kg,
                deadlift_pr_kg: storedProfile.deadlift_pr_kg,
                best_5k_time: storedProfile.best_5k_time,
                best_5k_pace: storedProfile.best_5k_pace,
                streak_days: storedProfile.streak_days || 0,
                total_workouts_completed: storedProfile.total_workouts_completed || 0,
                is_onboarded: true,
                weekly_schedule: appStorage.getWeeklySchedule(),
                goals: appStorage.getGoals(),
                routines: appStorage.getRoutines(),
                updated_at: new Date().toISOString(),
              })
            );
          }

          setIsLoading(false);
          return;
        }

        if (!currentUserId && !storedEmail) {
          setUser(null);
          setIsAuthenticated(false);
          setIsOnboarded(false);
        }
      } catch (err) {
        console.error('Error loading auth session:', err);
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
        setUser((prev) => (prev ? { ...prev, ...updated } : updated));
      }
    };

    window.addEventListener('meutreinador_storage_change', handleStorageChange);
    return () => window.removeEventListener('meutreinador_storage_change', handleStorageChange);
  }, []);

  // Register New User from Scratch
  const register = async (name: string, email: string, password?: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      if (!trimmedEmail || !trimmedName) {
        return { success: false, error: 'Por favor, informe seu nome e e-mail.' };
      }

      const accounts = getStoredAccounts();

      // Check if user already exists in Supabase
      if (isSupabaseConfigured()) {
        try {
          const { data: existingRemote } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', trimmedEmail)
            .maybeSingle();

          if (existingRemote && existingRemote.is_onboarded) {
            localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, existingRemote.id);
            localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);
            appStorage.saveProfile(existingRemote);

            if (existingRemote.weekly_schedule && Array.isArray(existingRemote.weekly_schedule)) {
              appStorage.saveWeeklySchedule(existingRemote.weekly_schedule);
            }
            if (existingRemote.goals && Array.isArray(existingRemote.goals)) {
              appStorage.saveGoals(existingRemote.goals);
            }
            if (existingRemote.routines && Array.isArray(existingRemote.routines)) {
              appStorage.setItem(STORAGE_KEYS.ROUTINES, existingRemote.routines);
            }

            setUser(existingRemote);
            setIsAuthenticated(true);
            setIsOnboarded(true);

            return { success: true, isOnboarded: true };
          }
        } catch (dbErr) {
          console.warn('Supabase check existing email error:', dbErr);
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

      // Save to Supabase
      if (isSupabaseConfigured()) {
        try {
          await supabase.from('profiles').upsert({
            id: userId,
            name: trimmedName,
            email: trimmedEmail,
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
        } catch (dbErr) {
          console.error('Supabase profile creation error:', dbErr);
        }
      }

      const newAccount: StoredAccount = {
        id: userId,
        name: trimmedName,
        email: trimmedEmail,
        passwordHash: password ? btoa(password) : undefined,
        createdAt: new Date().toISOString(),
        isOnboarded: false,
        profile: newProfile,
      };

      const updatedAccounts = accounts.filter((acc) => acc.email.toLowerCase() !== trimmedEmail);
      updatedAccounts.push(newAccount);
      saveStoredAccounts(updatedAccounts);

      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, userId);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);

      appStorage.saveProfile(newProfile);

      setUser(newProfile);
      setIsAuthenticated(true);
      setIsOnboarded(false);

      return { success: true, isOnboarded: false };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Falha ao criar usuário. Tente novamente.' };
    }
  };

  // Login Existing User
  const login = async (email: string, password?: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const accounts = getStoredAccounts();

      // Quick Demo account handling
      if (trimmedEmail === 'atleta.demo@meutreinador.pro' || trimmedEmail.includes('demo')) {
        const demoUserId = '00000000-0000-0000-0000-000000000001';
        const demoProfile: UserProfile = {
          ...SEED_PROFILE,
          id: demoUserId,
          email: trimmedEmail,
          name: 'Atleta Demo',
        };

        const demoAccount: StoredAccount = {
          id: demoUserId,
          name: 'Atleta Demo',
          email: trimmedEmail,
          passwordHash: password ? btoa(password) : undefined,
          createdAt: new Date().toISOString(),
          isOnboarded: true,
          profile: demoProfile,
        };

        const filteredAccounts = accounts.filter((acc) => acc.email.toLowerCase() !== trimmedEmail);
        filteredAccounts.push(demoAccount);
        saveStoredAccounts(filteredAccounts);
        localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, demoUserId);
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);
        appStorage.saveProfile(demoProfile);

        setUser(demoProfile);
        setIsAuthenticated(true);
        setIsOnboarded(true);

        return { success: true, isOnboarded: true };
      }

      // 1. Check Supabase first for real database sync
      if (isSupabaseConfigured()) {
        try {
          const { data: remoteProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', trimmedEmail)
            .maybeSingle();

          if (remoteProfile) {
            const isOnb = Boolean(remoteProfile.is_onboarded);
            localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, remoteProfile.id);
            localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);
            appStorage.saveProfile(remoteProfile);

            if (remoteProfile.weekly_schedule && Array.isArray(remoteProfile.weekly_schedule)) {
              appStorage.saveWeeklySchedule(remoteProfile.weekly_schedule);
            }
            if (remoteProfile.goals && Array.isArray(remoteProfile.goals)) {
              appStorage.saveGoals(remoteProfile.goals);
            }
            if (remoteProfile.routines && Array.isArray(remoteProfile.routines)) {
              appStorage.setItem(STORAGE_KEYS.ROUTINES, remoteProfile.routines);
            }

            const updatedAccounts = accounts.filter((acc) => acc.email.toLowerCase() !== trimmedEmail);
            updatedAccounts.push({
              id: remoteProfile.id,
              name: remoteProfile.name,
              email: trimmedEmail,
              createdAt: remoteProfile.created_at || new Date().toISOString(),
              isOnboarded: isOnb,
              profile: remoteProfile,
            });
            saveStoredAccounts(updatedAccounts);

            setUser(remoteProfile);
            setIsAuthenticated(true);
            setIsOnboarded(isOnb);

            return { success: true, isOnboarded: isOnb };
          }
        } catch (dbErr) {
          console.error('Supabase lookup error during login:', dbErr);
        }
      }

      // 2. Local accounts fallback
      let targetAccount = accounts.find((acc) => acc.email.toLowerCase() === trimmedEmail);

      if (!targetAccount) {
        const fallbackName = trimmedEmail.split('@')[0] || 'Atleta';
        const registerResult = await register(
          fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1),
          trimmedEmail,
          password
        );
        return registerResult;
      }

      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, targetAccount.id);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, trimmedEmail);
      appStorage.saveProfile(targetAccount.profile);

      setUser(targetAccount.profile);
      setIsAuthenticated(true);
      setIsOnboarded(targetAccount.isOnboarded);

      return { success: true, isOnboarded: targetAccount.isOnboarded };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Falha ao autenticar usuário.' };
    }
  };

  // Complete Athlete Onboarding & Initialize Platform
  const completeAthleteOnboarding = async (data: AthleteOnboardingData) => {
    try {
      if (!user) return { success: false, error: 'Nenhum usuário ativo na sessão.' };

      const updatedProfile: UserProfile = {
        ...user,
        name: data.name.trim() || user.name,
        email: data.email.trim() || user.email,
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

      // Save to Supabase (so mobile and other devices immediately know the user is onboarded)
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

      // Update stored accounts list locally
      const accounts = getStoredAccounts();
      const updatedAccounts = accounts.map((acc) =>
        acc.id === user.id ? { ...acc, isOnboarded: true, profile: updatedProfile } : acc
      );
      saveStoredAccounts(updatedAccounts);

      localStorage.setItem(AUTH_STORAGE_KEYS.USER_EMAIL, updatedProfile.email.toLowerCase());

      setUser(updatedProfile);
      setIsOnboarded(true);

      return { success: true };
    } catch (err) {
      console.error('Error completing onboarding:', err);
      return { success: false, error: 'Erro ao salvar dados do atleta.' };
    }
  };

  // Update profile attributes anytime
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    appStorage.saveProfile(updated);

    const accounts = getStoredAccounts();
    const updatedAccounts = accounts.map((acc) =>
      acc.id === user.id ? { ...acc, profile: updated } : acc
    );
    saveStoredAccounts(updatedAccounts);

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
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID);
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER_EMAIL);
    }
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
