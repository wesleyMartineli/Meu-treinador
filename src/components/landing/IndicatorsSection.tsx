'use client';

import React from 'react';
import { Users, Award, Dumbbell, ShieldCheck } from 'lucide-react';

export function IndicatorsSection() {
  const indicators = [
    {
      value: '+10 mil',
      label: 'Alunos Impactados',
      sublabel: 'Demonstração de escala',
      icon: Users,
    },
    {
      value: '98%',
      label: 'Taxa de Satisfação',
      sublabel: 'Avaliação da metodologia',
      icon: Award,
    },
    {
      value: '100%',
      label: 'Planos Personalizados',
      sublabel: 'Periodização sob medida',
      icon: Dumbbell,
    },
    {
      value: '24/7',
      label: 'Acompanhamento Completo',
      sublabel: 'Métricas em tempo real',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative border-y border-[#292929] bg-[#121212]/70 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {indicators.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.label}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-[#181818]/60 border border-[#292929]/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#222222] border border-[#2E2E2E] text-[#FF6500] mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F5] tracking-tight">
                  {ind.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#B8B8B8] mt-1 font-display uppercase tracking-wider">
                  {ind.label}
                </span>
                <span className="text-[10px] text-[#777777] mt-0.5 font-medium">
                  {ind.sublabel}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-center text-[#777777] mt-4 font-mono">
          * Indicadores apresentados como elementos visuais conceituais de demonstração da plataforma.
        </p>
      </div>
    </section>
  );
}
