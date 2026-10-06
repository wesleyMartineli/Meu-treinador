'use client';

import React from 'react';
import {
  Dumbbell,
  TrendingUp,
  Layers,
  Target,
  History,
  Trophy,
  BarChart3,
  Headphones,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function ResourcesSection() {
  const resources = [
    {
      title: 'Treinos Personalizados',
      description: 'Periodização estratégica com prescrição de séries, repetições, carga alvo e descanso.',
      icon: Dumbbell,
    },
    {
      title: 'Acompanhamento de Evolução',
      description: 'Gráficos detalhados de peso, medidas corporais, volume de treino e frequência.',
      icon: TrendingUp,
    },
    {
      title: 'Biblioteca de Exercícios',
      description: 'Centenas de movimentos organizados por grupo muscular com orientações técnicas.',
      icon: Layers,
    },
    {
      title: 'Metas Estruturadas',
      description: 'Defina objetivos de frequência, progressão de carga e consistência com barras de progresso.',
      icon: Target,
    },
    {
      title: 'Histórico Completo',
      description: 'Registro cronológico detalhado de cada sessão realizada e volume acumulado.',
      icon: History,
    },
    {
      title: 'Recordes Pessoais',
      description: 'Rastreamento automático de novos PRs (Personal Records) nos exercícios fundamentais.',
      icon: Trophy,
    },
    {
      title: 'Análises & Métricas',
      description: 'Cálculo de tonelagem, RPE médio e intensidade para evitar estagnação.',
      icon: BarChart3,
    },
    {
      title: 'Suporte & Consultoria',
      description: 'Canal de comunicação direta com seu treinador e ajustes no planejamento.',
      icon: Headphones,
    },
  ];

  return (
    <section id="recursos" className="py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-[#FF6500]">
            RECURSOS & TECNOLOGIA
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F5F5]">
            TUDO O QUE VOCÊ PRECISA PARA <span className="text-[#FF6500]">EVOLUIR</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B8B8] font-medium">
            Ferramentas precisas para maximizar sua disciplina e transformar treino em resultado mensurável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res) => {
            const Icon = res.icon;
            return (
              <Card
                key={res.title}
                hoverable
                className="flex flex-col justify-between p-6 bg-[#181818] border-[#292929] group"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#121212] border border-[#292929] text-[#B8B8B8] group-hover:text-[#FF6500] group-hover:border-[#FF6500]/40 transition-colors mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#F5F5F5] uppercase tracking-tight mb-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-[#777777] font-medium leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
