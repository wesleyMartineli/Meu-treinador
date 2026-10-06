'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { LogoMT } from '@/components/ui/LogoMT';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { useAuth, AthleteOnboardingData } from '@/context/AuthContext';
import {
  User,
  Scale,
  Ruler,
  Target,
  Dumbbell,
  Calendar,
  Zap,
  Flame,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  HeartPulse,
  Activity,
  Award,
  Layers,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeAthleteOnboarding, isAuthenticated } = useAuth();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // Onboarding Form State
  const [formData, setFormData] = useState<AthleteOnboardingData>({
    name: user?.name || '',
    email: user?.email || '',
    gender: 'masculino',
    age: ('' as any),
    height_cm: user?.height_cm || ('' as any),
    current_weight_kg: user?.current_weight_kg || ('' as any),
    target_weight_kg: user?.target_weight_kg || ('' as any),
    goal: 'Hipertrofia & Ganho de Força',
    experience_level: 'iniciante',
    weekly_frequency_days: 4,
    includes_running: false,
    bench_pr_kg: 0,
    squat_pr_kg: 0,
    deadlift_pr_kg: 0,
    best_5k_time: '',
    best_5k_pace: '',
    start_fresh: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync user info if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        height_cm: prev.height_cm || user.height_cm || ('' as any),
        current_weight_kg: prev.current_weight_kg || user.current_weight_kg || ('' as any),
        target_weight_kg: prev.target_weight_kg || user.target_weight_kg || ('' as any),
      }));
    }
  }, [user]);

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1) {
      if (!formData.name.trim()) {
        setErrorMessage('Por favor, informe seu nome.');
        return;
      }
      if (!formData.height_cm || formData.height_cm < 100 || formData.height_cm > 250) {
        setErrorMessage('Informe uma altura válida (ex: 175 cm).');
        return;
      }
      if (!formData.current_weight_kg || formData.current_weight_kg < 30) {
        setErrorMessage('Informe um peso atual válido em kg.');
        return;
      }
      if (!formData.target_weight_kg || formData.target_weight_kg < 30) {
        setErrorMessage('Informe uma meta de peso válida em kg.');
        return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrorMessage('');
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await completeAthleteOnboarding(formData);
      if (result.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF6500', '#FFFFFF', '#FFA726', '#FF3D00'],
        });

        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      } else {
        setErrorMessage(result.error || 'Erro ao concluir preenchimento.');
        setIsSubmitting(false);
      }
    } catch {
      setErrorMessage('Ocorreu um erro ao salvar o perfil.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F5] flex flex-col justify-between selection:bg-[#FF6500]/30">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF6500]/10 rounded-full blur-[120px]" />
      </div>

      {/* Header with Progress Bar */}
      <header className="relative z-10 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <LogoMT size="md" showText={true} href="/" />
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
              Passo {step} de {totalSteps}
            </span>
            <p className="text-[11px] text-[#777777] font-mono">Preenchimento do Atleta</p>
          </div>
        </div>

        {/* Multi-step progress bar */}
        <div className="w-full h-1.5 bg-[#1C1C1C] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF6500] to-[#FFA726] transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Wizard Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:px-6">
        <div className="max-w-2xl w-full">
          <Card className="p-6 sm:p-8 bg-[#121212]/95 border-[#262626] backdrop-blur-xl shadow-2xl relative">
            
            {/* Step 1: Biometria & Informações Pessoais */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FF6500]/10 text-[#FF6500] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <User className="h-3 w-3" /> Biometria & Identidade
                  </div>
                  <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Quem é você nos treinos?
                  </h2>
                  <p className="text-xs text-[#777777] mt-1 font-medium">
                    Esses dados são a base para calcular seu gasto energético, sobrecarga e evolução de peso.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Nome do Atleta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome ou apelido"
                    leftIcon={<User className="h-4 w-4" />}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Idade (anos)"
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) || 0 })}
                      placeholder="Ex: 26"
                      min={12}
                      max={100}
                    />

                    <Select
                      label="Sexo Biológico"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      options={[
                        { label: 'Masculino', value: 'masculino' },
                        { label: 'Feminino', value: 'feminino' },
                        { label: 'Outro / Prefiro não informar', value: 'outro' },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Altura (cm)"
                      type="number"
                      value={formData.height_cm}
                      onChange={(e) => setFormData({ ...formData, height_cm: Number(e.target.value) || 0 })}
                      placeholder="Ex: 178"
                      leftIcon={<Ruler className="h-4 w-4" />}
                    />

                    <Input
                      label="Peso Atual (kg)"
                      type="number"
                      step="0.1"
                      value={formData.current_weight_kg}
                      onChange={(e) => setFormData({ ...formData, current_weight_kg: Number(e.target.value) || 0 })}
                      placeholder="Ex: 78.5"
                      leftIcon={<Scale className="h-4 w-4" />}
                    />

                    <Input
                      label="Meta de Peso (kg)"
                      type="number"
                      step="0.1"
                      value={formData.target_weight_kg}
                      onChange={(e) => setFormData({ ...formData, target_weight_kg: Number(e.target.value) || 0 })}
                      placeholder="Ex: 82.0"
                      leftIcon={<Target className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Objetivo & Nível */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FF6500]/10 text-[#FF6500] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Target className="h-3 w-3" /> Foco de Performance
                  </div>
                  <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Qual é o seu objetivo principal?
                  </h2>
                  <p className="text-xs text-[#777777] mt-1 font-medium">
                    Ajustaremos a prescrição de volume, recomendações do Coach IA e gráficos com base no seu foco.
                  </p>
                </div>

                {/* Goals Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'Hipertrofia & Ganho de Força',
                      title: 'Hipertrofia & Força',
                      desc: 'Ganho de massa muscular sólida e sobrecarga progressiva nos compostos.',
                      icon: Dumbbell,
                    },
                    {
                      id: 'Emagrecimento & Definição',
                      title: 'Emagrecimento & Definição',
                      desc: 'Déficit calórico inteligente preservando massa magra e densidade.',
                      icon: Flame,
                    },
                    {
                      id: 'Força Bruta / Powerlifting',
                      title: 'Força Bruta / Powerlifting',
                      desc: 'Foco na evolução máxima de 1RM no Supino, Agachamento e Terra.',
                      icon: Trophy,
                    },
                    {
                      id: 'Performance Híbrida & Corrida',
                      title: 'Atleta Híbrido & Corrida',
                      desc: 'Combinação de musculação pesada com ritmo e endurance cardiovascular.',
                      icon: Zap,
                    },
                  ].map((goalOption) => {
                    const isSelected = formData.goal === goalOption.id;
                    const Icon = goalOption.icon;
                    return (
                      <button
                        key={goalOption.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal: goalOption.id })}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#FF6500]/15 border-[#FF6500] text-white shadow-orange-glow'
                            : 'bg-[#141414] border-[#262626] text-[#888888] hover:border-[#383838] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1.5">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#FF6500] text-black' : 'bg-[#222222] text-[#888888]'}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-bold text-xs uppercase text-white">{goalOption.title}</span>
                        </div>
                        <p className="text-[11px] text-[#777777] leading-relaxed">{goalOption.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Experience Level */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#B8B8B8] mb-2">
                    Nível de Experiência com Treinamento
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'iniciante', label: 'Iniciante', sub: '< 6 meses' },
                      { id: 'intermediario', label: 'Intermediário', sub: '6m a 2 anos' },
                      { id: 'avancado', label: 'Avançado', sub: '2 a 5 anos' },
                      { id: 'atleta', label: 'Atleta', sub: '5+ anos' },
                    ].map((level) => {
                      const isSelected = formData.experience_level === level.id;
                      return (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, experience_level: level.id as any })}
                          className={`p-3 text-center rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                            isSelected
                              ? 'bg-[#FF6500] text-black border-[#FF6500]'
                              : 'bg-[#141414] border-[#262626] text-[#888888] hover:text-white'
                          }`}
                        >
                          <div>{level.label}</div>
                          <div className={`text-[10px] normal-case ${isSelected ? 'text-black/80 font-medium' : 'text-[#666666]'}`}>
                            {level.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Rotina Semanal */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FF6500]/10 text-[#FF6500] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Calendar className="h-3 w-3" /> Frequência & Rotina
                  </div>
                  <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Quantos dias você vai treinar na semana?
                  </h2>
                  <p className="text-xs text-[#777777] mt-1 font-medium">
                    Montaremos seu calendário de sessões e descansos com base na sua disponibilidade real.
                  </p>
                </div>

                {/* Days per week */}
                <div className="grid grid-cols-4 gap-3">
                  {[3, 4, 5, 6].map((days) => {
                    const isSelected = formData.weekly_frequency_days === days;
                    return (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setFormData({ ...formData, weekly_frequency_days: days })}
                        className={`p-4 text-center rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-[#FF6500]/20 border-[#FF6500] text-white shadow-orange-glow'
                            : 'bg-[#141414] border-[#262626] text-[#888888] hover:border-[#383838] hover:text-white'
                        }`}
                      >
                        <div className="font-display font-black text-3xl text-white mb-0.5">{days}x</div>
                        <div className="text-[10px] uppercase font-bold text-[#FF6500]">dias / semana</div>
                      </button>
                    );
                  })}
                </div>

                {/* Running / Cardio practice toggle */}
                <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#FF6500]/15 text-[#FF6500]">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase">Pratica Corrida ou Cardio Regular?</h4>
                        <p className="text-[11px] text-[#777777]">Ativar módulo dedicado de corrida, ritmo e zonas cardíacas.</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.includes_running}
                      onChange={(e) => setFormData({ ...formData, includes_running: e.target.checked })}
                      className="accent-[#FF6500] h-5 w-5 cursor-pointer rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Cargas & Recordes de Referência */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FF6500]/10 text-[#FF6500] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Award className="h-3 w-3" /> Linha de Base (Opcional)
                  </div>
                  <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Suas marcas atuais de força e corrida
                  </h2>
                  <p className="text-xs text-[#777777] mt-1 font-medium">
                    Se você não souber agora ou for iniciante absoluto, pode deixar em branco e registrar conforme for treinando.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Supino Reto (kg)"
                    type="number"
                    value={formData.bench_pr_kg || ''}
                    onChange={(e) => setFormData({ ...formData, bench_pr_kg: Number(e.target.value) || 0 })}
                    placeholder="Ex: 80"
                    leftIcon={<Dumbbell className="h-4 w-4" />}
                  />

                  <Input
                    label="Agachamento (kg)"
                    type="number"
                    value={formData.squat_pr_kg || ''}
                    onChange={(e) => setFormData({ ...formData, squat_pr_kg: Number(e.target.value) || 0 })}
                    placeholder="Ex: 100"
                    leftIcon={<Dumbbell className="h-4 w-4" />}
                  />

                  <Input
                    label="Levantamento Terra (kg)"
                    type="number"
                    value={formData.deadlift_pr_kg || ''}
                    onChange={(e) => setFormData({ ...formData, deadlift_pr_kg: Number(e.target.value) || 0 })}
                    placeholder="Ex: 120"
                    leftIcon={<Dumbbell className="h-4 w-4" />}
                  />
                </div>

                {formData.includes_running && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <Input
                      label="Melhor Tempo nos 5km (min:seg)"
                      value={formData.best_5k_time || ''}
                      onChange={(e) => setFormData({ ...formData, best_5k_time: e.target.value })}
                      placeholder="Ex: 25:30"
                      leftIcon={<Zap className="h-4 w-4" />}
                    />

                    <Input
                      label="Pace Médio (min/km)"
                      value={formData.best_5k_pace || ''}
                      onChange={(e) => setFormData({ ...formData, best_5k_pace: e.target.value })}
                      placeholder="Ex: 5:06"
                      leftIcon={<Zap className="h-4 w-4" />}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Modo de Inicialização */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FF6500]/10 text-[#FF6500] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="h-3 w-3" /> Modo de Inicialização
                  </div>
                  <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Como deseja iniciar sua plataforma?
                  </h2>
                  <p className="text-xs text-[#777777] mt-1 font-medium">
                    Escolha se prefere começar com histórico 100% limpo para alimentar do zero ou com fichas sugeridas.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, start_fresh: true })}
                    className={`p-5 text-left rounded-2xl border transition-all flex items-start gap-4 ${
                      formData.start_fresh
                        ? 'bg-[#FF6500]/15 border-[#FF6500] text-white shadow-orange-glow'
                        : 'bg-[#141414] border-[#262626] text-[#888888] hover:border-[#383838]'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${formData.start_fresh ? 'bg-[#FF6500] text-black font-black' : 'bg-[#222222] text-[#888888]'}`}>
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white uppercase">Começar 100% Zerado (Recomendado)</h4>
                        {formData.start_fresh && (
                          <CheckCircle2 className="h-5 w-5 text-[#FF6500]" />
                        )}
                      </div>
                      <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                        0 treinos anteriores registrados. Todos os gráficos, volume semanal, pesagens e PRs serão alimentados a partir das suas execuções a partir de hoje.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, start_fresh: false })}
                    className={`p-5 text-left rounded-2xl border transition-all flex items-start gap-4 ${
                      !formData.start_fresh
                        ? 'bg-[#FF6500]/15 border-[#FF6500] text-white shadow-orange-glow'
                        : 'bg-[#141414] border-[#262626] text-[#888888] hover:border-[#383838]'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${!formData.start_fresh ? 'bg-[#FF6500] text-black font-black' : 'bg-[#222222] text-[#888888]'}`}>
                      <Layers className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white uppercase">Iniciar com Fichas e Rotinas Prontas</h4>
                        {!formData.start_fresh && (
                          <CheckCircle2 className="h-5 w-5 text-[#FF6500]" />
                        )}
                      </div>
                      <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                        Inclui rotinas pré-montadas de Peito/Ombro/Tríceps, Costas/Bíceps e Pernas prontas para você apenas apertar Play e registrar.
                      </p>
                    </div>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#242424] flex items-center gap-3">
                  <HeartPulse className="h-5 w-5 text-[#FF6500] shrink-0" />
                  <p className="text-[11px] text-[#888888]">
                    Seu Coach IA já foi preparado com suas metas de <strong>{formData.target_weight_kg}kg</strong> e objetivo de <strong>{formData.goal}</strong>!
                  </p>
                </div>
              </div>
            )}

            {/* Error feedback */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#242424]">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Voltar
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="text-xs font-bold uppercase tracking-wider shadow-orange-glow px-6"
                >
                  Próximo Passo
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleFinish}
                  disabled={isSubmitting}
                  rightIcon={<CheckCircle2 className="h-4 w-4" />}
                  className="text-xs font-bold uppercase tracking-wider shadow-orange-glow px-8"
                >
                  {isSubmitting ? 'Gerando Plataforma...' : 'Concluir & Entrar na Plataforma'}
                </Button>
              )}
            </div>

          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-[#555555]">
        MEU TREINADOR &copy; {new Date().getFullYear()} — Plataforma de Alta Performance
      </footer>
    </div>
  );
}
