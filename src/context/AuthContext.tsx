'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types/database';
import { appStorage } from '@/lib/storage';
import { SEED_PROFILE } from '@/lib/seed-data';

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
  ACCOUNTS: 'meutreinador_accounts_registry',
};

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

    try {
      const currentUserId = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID);
      const accounts = getStoredAccounts();

      if (currentUserId && accounts.length > 0) {
        const found = accounts.find((acc) => acc.id === currentUserId);
        if (found) {
          setUser(found.profile);
          setIsAuthenticated(true);
          setIsOnboarded(found.isOnboarded);
          setIsLoading(false);
          return;
        }
      }

      // If user had previously used the app before accounts registry was set
      const storedProfile = appStorage.getProfile();
      if (storedProfile && storedProfile.name && storedProfile.name !== 'Atleta') {
        setUser(storedProfile);
        setIsAuthenticated(true);
        setIsOnboarded(true);
        setIsLoading(false);
        return;
      }

      // No active session found - remain logged out
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
      const existing = accounts.find((acc) => acc.email.toLowerCase() === trimmedEmail);

      const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

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

      const newAccount: StoredAccount = {
        id: userId,
        name: trimmedName,
        email: trimmedEmail,
        passwordHash: password ? btoa(password) : undefined,
        createdAt: new Date().toISOString(),
        isOnboarded: false,
        profile: newProfile,
      };

      // If user already existed, update; otherwise push
      let updatedAccounts = [...accounts];
      if (existing) {
        updatedAccounts = updatedAccounts.map((acc) => (acc.email === trimmedEmail ? newAccount : acc));
      } else {
        updatedAccounts.push(newAccount);
      }

      saveStoredAccounts(updatedAccounts);
      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, userId);

      // Save initial profile in AppStorage
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
        const demoUserId = 'usr_demo_athlete';
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
        appStorage.saveProfile(demoProfile);

        setUser(demoProfile);
        setIsAuthenticated(true);
        setIsOnboarded(true);

        return { success: true, isOnboarded: true };
      }

      let targetAccount = accounts.find((acc) => acc.email.toLowerCase() === trimmedEmail);

      if (!targetAccount) {
        // Fallback or quick entry
        const fallbackName = trimmedEmail.split('@')[0] || 'Atleta';
        const registerResult = await register(
          fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1),
          trimmedEmail,
          password
        );
        return registerResult;
      }

      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID, targetAccount.id);
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

      // Update stored accounts list
      const accounts = getStoredAccounts();
      const updatedAccounts = accounts.map((acc) =>
        acc.id === user.id ? { ...acc, isOnboarded: true, profile: updatedProfile } : acc
      );
      saveStoredAccounts(updatedAccounts);

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
  };

  // Logout
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER_ID);
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
