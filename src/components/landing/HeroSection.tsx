'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MascotIllustration } from '@/components/ui/MascotIllustration';
import { Play, ArrowRight, ShieldCheck, Flame, Dumbbell, Trophy, Activity } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Cinematic Ambient Orange & Dark Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6500]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Mascot Silhouette in Background with cinematic low opacity */}
      <div className="absolute top-10 right-0 lg:right-10 w-[450px] lg:w-[650px] opacity-10 pointer-events-none select-none">
        <MascotIllustration variant="cinematic" glow={false} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] border border-[#292929] shadow-subtle">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6500] animate-ping" />
            <span className="text-[11px] font-display font-bold uppercase tracking-widest text-[#B8B8B8]">
              Plataforma SaaS de Alta Performance
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black tracking-tighter text-4xl sm:text-6xl lg:text-7xl uppercase text-[#F5F5F5] leading-none">
            SEU TREINO. <br />
            SUA <span className="text-[#FF6500]">EVOLUÇÃO.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto font-normal leading-relaxed">
            Uma plataforma completa para organizar seus treinos, acompanhar sua evolução e transformar consistência em resultado.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Começar Agora
              </Button>
            </Link>
            <a href="#recursos" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Play className="h-4 w-4 text-[#FF6500] fill-current" />}
              >
                Conhecer a Plataforma
              </Button>
            </a>
          </div>
        </div>

        {/* Big SaaS Platform Mockup */}
        <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto">
          {/* Glow Frame */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#FF6500]/30 via-[#292929]/50 to-transparent blur-xl opacity-70" />

          {/* SaaS Interface Shell Mockup */}
          <div className="relative rounded-2xl bg-[#121212] border border-[#292929] shadow-2xl overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0B0B] border-b border-[#292929]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#292929]" />
                <span className="h-3 w-3 rounded-full bg-[#292929]" />
                <span className="h-3 w-3 rounded-full bg-[#292929]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#777777]">
                app.meutreinador.pro/dashboard
              </span>
              <span className="text-[10px] font-bold text-[#FF6500] uppercase tracking-wider px-2 py-0.5 bg-[#FF6500]/10 rounded border border-[#FF6500]/20">
                PRO ATHLETICS
              </span>
            </div>

            {/* Simulated Live UI Preview inside Mockup */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gradient-to-b from-[#121212] to-[#0B0B0B]">
              {/* Highlight Card: Treino de Hoje */}
              <div className="lg:col-span-2 rounded-2xl bg-[#181818] border border-[#FF6500]/40 p-6 shadow-orange-glow-sm flex flex-col justify-between space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6500] px-2.5 py-1 bg-[#FF6500]/10 rounded-md border border-[#FF6500]/20">
                      TREINO DO DIA • PUSH
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-2">
                      Treino A — Peito, Ombros & Tríceps
                    </h3>
                    <p className="text-xs text-[#777777] mt-1">
                      5 exercícios • 18 séries totais • 55 min estimado
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#222222] border border-[#2E2E2E] text-[#FF6500]">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                    <span className="text-[10px] uppercase font-bold text-[#777777]">Volume</span>
                    <p className="text-lg font-black font-display text-white">4.820 kg</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                    <span className="text-[10px] uppercase font-bold text-[#777777]">Intensidade</span>
                    <p className="text-lg font-black font-display text-[#FF6500]">RPE 8.5</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                    <span className="text-[10px] uppercase font-bold text-[#777777]">Descanso</span>
                    <p className="text-lg font-black font-display text-white">90s / série</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-[#B8B8B8]">Pronto para iniciar</span>
                  </div>
                  <Link href="/treino">
                    <Button variant="primary" size="sm" leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}>
                      INICIAR SESSÃO
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Side Metric Panels */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-[#181818] border border-[#292929] p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-[#777777]">Sequência Ativa</span>
                    <Flame className="h-4 w-4 text-[#FF6500]" />
                  </div>
                  <p className="text-3xl font-display font-black text-white">14 <span className="text-sm font-normal text-[#777777]">dias seguidos</span></p>
                  <p className="text-[11px] text-emerald-400 mt-1 font-bold">Consistência de 93% neste mês</p>
                </div>

                <div className="rounded-2xl bg-[#181818] border border-[#292929] p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-[#777777]">Recorde Recente</span>
                    <Trophy className="h-4 w-4 text-[#FF6500]" />
                  </div>
                  <p className="text-2xl font-display font-black text-white">Supino Reto: 85kg</p>
                  <p className="text-[11px] text-[#777777] mt-1">+5kg comparado ao ciclo anterior</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
