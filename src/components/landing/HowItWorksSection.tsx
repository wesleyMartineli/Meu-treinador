'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Crie seu perfil',
      description: 'Informe seus dados biométricos, rotina e histórico esportivo na plataforma.',
    },
    {
      number: '02',
      title: 'Defina seus objetivos',
      description: 'Hipertrofia, ganho de força, condicionamento atlético ou recomposição corporal.',
    },
    {
      number: '03',
      title: 'Receba seu planejamento',
      description: 'Periodização estratégica estruturada com divisões de treino ideais.',
    },
    {
      number: '04',
      title: 'Execute seus treinos',
      description: 'Interface funcional para registrar cargas, séries, repetições e descanso no app.',
    },
    {
      number: '05',
      title: 'Registre sua evolução',
      description: 'Acompanhe métricas, recordes pessoais de força e histórico fotográfico.',
    },
    {
      number: '06',
      title: 'Alcance seus resultados',
      description: 'Consistência blindada e progressão contínua com suporte profissional.',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-[#121212]/60 border-t border-[#292929]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-[#FF6500]">
            METODOLOGIA & CONSISTÊNCIA
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F5F5]">
            COMO <span className="text-[#FF6500]">FUNCIONA</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B8B8] font-medium">
            Um fluxo contínuo e sem atritos para você focar no que realmente importa: a execução.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card
              key={step.number}
              hoverable
              className="p-6 bg-[#181818] border-[#292929] relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-3xl sm:text-4xl text-[#292929] group-hover:text-[#FF6500]/50 transition-colors font-mono">
                  {step.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#FF6500]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#F5F5F5] uppercase tracking-tight mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[#777777] font-medium leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
