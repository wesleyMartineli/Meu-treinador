'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Settings,
  Bell,
  Shield,
  Dumbbell,
  CheckCircle2,
  Moon,
  Smartphone,
  LogOut,
  Sparkles,
  Award,
  Zap,
  RotateCcw,
} from 'lucide-react';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, updateUserProfile, logout, resetToFreshAccount } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentWeightKg: user?.current_weight_kg || 75,
    targetWeightKg: user?.target_weight_kg || 75,
    heightCm: user?.height_cm || 175,
    experienceLevel: user?.experience_level || 'iniciante',
    benchPrKg: user?.bench_pr_kg || 0,
    squatPrKg: user?.squat_pr_kg || 0,
    deadliftPrKg: user?.deadlift_pr_kg || 0,
    best5kTime: user?.best_5k_time || '--:--',
    best5kPace: user?.best_5k_pace || '--:--',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        currentWeightKg: user.current_weight_kg,
        targetWeightKg: user.target_weight_kg,
        heightCm: user.height_cm,
        experienceLevel: user.experience_level,
        benchPrKg: user.bench_pr_kg || 0,
        squatPrKg: user.squat_pr_kg || 0,
        deadliftPrKg: user.deadlift_pr_kg || 0,
        best5kTime: user.best_5k_time || '--:--',
        best5kPace: user.best_5k_pace || '--:--',
      });
    }
  }, [user]);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateUserProfile({
      name: form.name,
      email: form.email,
      current_weight_kg: Number(form.currentWeightKg) || 75,
      target_weight_kg: Number(form.targetWeightKg) || 75,
      height_cm: Number(form.heightCm) || 175,
      experience_level: form.experienceLevel as any,
      bench_pr_kg: Number(form.benchPrKg) || 0,
      squat_pr_kg: Number(form.squatPrKg) || 0,
      deadlift_pr_kg: Number(form.deadliftPrKg) || 0,
      best_5k_time: form.best5kTime,
      best_5k_pace: form.best5kPace,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCreateNewProfile = () => {
    if (confirm('Deseja sair e criar um novo perfil de atleta do zero?')) {
      resetToFreshAccount();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
            CONTA & PARÂMETROS
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-1">
            Perfil do Atleta
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-medium mt-0.5">
            Gerencie suas informações biométricas, objetivo principal e parâmetros da plataforma.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            leftIcon={isSaved ? <CheckCircle2 className="h-4 w-4" /> : undefined}
            className="shadow-orange-glow"
          >
            {isSaved ? 'Alterações Salvas!' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card / Avatar Column */}
        <div className="space-y-6">
          <Card className="p-6 bg-[#181818] border-[#292929] flex flex-col items-center text-center space-y-4">
            <UserAvatar name={form.name || 'Atleta'} size="xl" />

            <div>
              <h3 className="font-display font-black text-lg text-[#F5F5F5] uppercase tracking-tight">
                {form.name || 'Atleta'}
              </h3>
              <p className="text-xs text-[#777777] font-mono mt-0.5">{form.email}</p>
            </div>

            <div className="w-full pt-4 border-t border-[#292929] space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#777777]">Nível do Atleta:</span>
                <span className="font-bold text-[#FF6500] uppercase">{form.experienceLevel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#777777]">Total de Treinos:</span>
                <span className="font-bold text-white font-mono">{user?.total_workouts_completed || 0} sessões</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#777777]">Sequência Ativa:</span>
                <span className="font-bold text-[#FF6500] font-mono">{user?.streak_days || 0} dias</span>
              </div>
            </div>
          </Card>

          {/* Account Switcher / Reset Actions */}
          <Card className="p-5 bg-[#181818] border-[#292929] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] pb-2 border-b border-[#292929]">
              Gerenciamento de Conta
            </h4>

            <button
              onClick={handleCreateNewProfile}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#292929] hover:border-[#FF6500]/40 text-left text-xs font-bold text-white transition-all group"
            >
              <div className="p-2 rounded-lg bg-[#FF6500]/10 text-[#FF6500] group-hover:bg-[#FF6500] group-hover:text-black transition-colors">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="block uppercase">Criar Novo Perfil do Zero</span>
                <span className="text-[10px] text-[#777777] font-normal">Reiniciar e alimentar novos dados</span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] hover:bg-red-950/20 border border-[#292929] hover:border-red-800/60 text-left text-xs font-bold text-[#B8B8B8] hover:text-red-400 transition-all"
            >
              <div className="p-2 rounded-lg bg-[#222222] text-[#777777]">
                <LogOut className="h-4 w-4" />
              </div>
              <div>
                <span className="block uppercase">Sair da Conta (Logout)</span>
                <span className="text-[10px] text-[#777777] font-normal">Encerrar sessão no dispositivo</span>
              </div>
            </button>
          </Card>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-[#181818] border-[#292929] space-y-6">
            <h3 className="font-display font-black text-base text-[#F5F5F5] uppercase tracking-tight pb-3 border-b border-[#292929]">
              Informações Pessoais & Biometria
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome Completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                label="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Input
                label="Peso Atual (kg)"
                type="number"
                step="0.1"
                value={form.currentWeightKg}
                onChange={(e) => setForm({ ...form, currentWeightKg: Number(e.target.value) || 0 })}
              />

              <Input
                label="Meta de Peso (kg)"
                type="number"
                step="0.1"
                value={form.targetWeightKg}
                onChange={(e) => setForm({ ...form, targetWeightKg: Number(e.target.value) || 0 })}
              />

              <Input
                label="Altura (cm)"
                type="number"
                value={form.heightCm}
                onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) || 0 })}
              />

              <Select
                label="Nível do Atleta"
                value={form.experienceLevel}
                onChange={(e) => setForm({ ...form, experienceLevel: e.target.value as any })}
                options={[
                  { label: 'Iniciante (< 6 meses)', value: 'iniciante' },
                  { label: 'Intermediário (6m a 2 anos)', value: 'intermediario' },
                  { label: 'Avançado (2 a 5 anos)', value: 'avancado' },
                  { label: 'Atleta de Alta Performance', value: 'atleta' },
                ]}
              />
            </div>
          </Card>

          {/* PRs & Performance Baseline */}
          <Card className="p-6 bg-[#181818] border-[#292929] space-y-6">
            <h3 className="font-display font-black text-base text-[#F5F5F5] uppercase tracking-tight pb-3 border-b border-[#292929] flex items-center justify-between">
              <span>Recordes Pessoais (PRs) & Linha de Base</span>
              <Award className="h-4 w-4 text-[#FF6500]" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Supino Reto (kg)"
                type="number"
                value={form.benchPrKg}
                onChange={(e) => setForm({ ...form, benchPrKg: Number(e.target.value) || 0 })}
              />

              <Input
                label="Agachamento (kg)"
                type="number"
                value={form.squatPrKg}
                onChange={(e) => setForm({ ...form, squatPrKg: Number(e.target.value) || 0 })}
              />

              <Input
                label="Levantamento Terra (kg)"
                type="number"
                value={form.deadliftPrKg}
                onChange={(e) => setForm({ ...form, deadliftPrKg: Number(e.target.value) || 0 })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Melhor Tempo 5km (min:seg)"
                value={form.best5kTime}
                onChange={(e) => setForm({ ...form, best5kTime: e.target.value })}
              />

              <Input
                label="Melhor Pace 5km (min/km)"
                value={form.best5kPace}
                onChange={(e) => setForm({ ...form, best5kPace: e.target.value })}
              />
            </div>
          </Card>

          {/* Preferences & App Settings */}
          <Card className="p-6 bg-[#181818] border-[#292929] space-y-6">
            <h3 className="font-display font-black text-base text-[#F5F5F5] uppercase tracking-tight pb-3 border-b border-[#292929]">
              Preferências & Notificações
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121212] border border-[#292929]">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-[#FF6500]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Lembretes Diários de Treino</span>
                    <span className="text-[10px] text-[#777777]">Notificar 30 minutos antes do horário programado</span>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#FF6500] h-4 w-4 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121212] border border-[#292929]">
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-4 w-4 text-[#FF6500]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Cronômetro com Alarme Sonoro</span>
                    <span className="text-[10px] text-[#777777]">Emitir som discreto ao fim do descanso</span>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#FF6500] h-4 w-4 cursor-pointer" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

