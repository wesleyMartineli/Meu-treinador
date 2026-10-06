'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogoMT } from '@/components/ui/LogoMT';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'register';

  const [activeTab, setActiveTab] = useState<'register' | 'login'>(initialMode);

  const { login, register, isAuthenticated, isOnboarded } = useAuth();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated and onboarded, offer quick redirect
  React.useEffect(() => {
    if (isAuthenticated && isOnboarded) {
      // router.push('/dashboard');
    }
  }, [isAuthenticated, isOnboarded, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('A senha deve conter no mínimo 4 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    const result = await register(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      router.push('/onboarding');
    } else {
      setErrorMessage(result.error || 'Erro ao criar perfil. Tente novamente.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }
    if (!password) {
      setErrorMessage('Informe sua senha.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      if (result.isOnboarded) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } else {
      setErrorMessage(result.error || 'Credenciais inválidas.');
    }
  };

  const handleQuickDemo = async () => {
    setIsSubmitting(true);
    const result = await login('atleta.demo@meutreinador.pro', 'demo123');
    setIsSubmitting(false);
    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F5] flex flex-col justify-between selection:bg-[#FF6500]/30 py-6 sm:py-10">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF6500]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#FF6500]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="max-w-lg w-full flex flex-col items-center">
          
          {/* Logo centered above the card */}
          <div className="mb-8 flex flex-col items-center text-center">
            <LogoMT size="xl" showText={true} href="/" />
          </div>

          {/* Auth Card */}
          <Card className="w-full p-6 sm:p-8 bg-[#121212]/95 border-[#262626] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            {/* Card top border glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6500] to-transparent" />

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-[#181818] rounded-xl border border-[#292929] mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                }}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-[#FF6500] text-black font-black shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                Criar Perfil do Zero
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                }}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-[#FF6500] text-black font-black shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <Lock className="h-3.5 w-3.5" />
                Acessar Minha Conta
              </button>
            </div>

            {/* Header inside form */}
            <div className="mb-6 text-center sm:text-left">
              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {activeTab === 'register' ? 'Criar Novo Perfil de Atleta' : 'Bem-vindo de Volta!'}
              </h2>
              <p className="text-xs text-[#777777] mt-1 font-medium">
                {activeTab === 'register'
                  ? 'Cadastre seu e-mail e senha para configurar seu perfil e alimentar a plataforma.'
                  : 'Insira suas credenciais para continuar sua evolução e histórico de treinos.'}
              </p>
            </div>

            {/* Error notification */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* REGISTER FORM */}
            {activeTab === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  label="Nome do Atleta"
                  placeholder="Ex: Wesley Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User className="h-4 w-4" />}
                  required
                />

                <Input
                  label="E-mail"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" />}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Criar Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[#777777] hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    required
                  />

                  <Input
                    label="Confirmar Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftIcon={<Lock className="h-4 w-4" />}
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#161616] border border-[#242424] text-[11px] text-[#888888] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6500] shrink-0" />
                  <span>Ao criar, você iniciará o passo a passo para alimentar peso, metas e treinos.</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-orange-glow font-black tracking-wider uppercase text-xs"
                  disabled={isSubmitting}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {isSubmitting ? 'Criando Conta...' : 'Continuar para Preenchimento do Atleta'}
                </Button>
              </form>
            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" />}
                  required
                />

                <Input
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#777777] hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-orange-glow font-black tracking-wider uppercase text-xs"
                  disabled={isSubmitting}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar na Plataforma'}
                </Button>
              </form>
            )}

            {/* Demo quick access divider */}
            <div className="pt-6 mt-6 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#666666]">Quer apenas testar rapidamente?</span>
              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={isSubmitting}
                className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#222222] border border-[#2e2e2e] text-[#FF6500] font-bold text-xs uppercase tracking-wider transition-all"
              >
                Entrar com Perfil Demo
              </button>
            </div>

          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#555555]">
        MEU TREINADOR &copy; {new Date().getFullYear()} — Plataforma de Alta Performance & Treinamento
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#000000] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FF6500] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

