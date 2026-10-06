'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, Star } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: 'MT Start',
      price: 'R$ 39',
      period: '/mês',
      description: 'Ideal para quem treina de forma autônoma e busca registrar sua evolução.',
      features: [
        'Acesso completo ao Dashboard',
        'Registro ilimitado de treinos',
        'Biblioteca completa de exercícios',
        'Gráficos de evolução básica',
        'Gamificação e badges',
      ],
      popular: false,
      cta: 'Começar no Start',
    },
    {
      name: 'MT Pro Performance',
      price: 'R$ 79',
      period: '/mês',
      description: 'Acompanhamento completo com periodização avançada e consultoria.',
      features: [
        'Tudo do plano Start',
        'Prescrição de treinos personalizados',
        'Acompanhamento direto de Treinador',
        'Análise avançada de sobrecarga e RPE',
        'Definição de metas customizadas',
        'Histórico de recordes pessoais (PR)',
      ],
      popular: true,
      cta: 'Assinar MT Pro',
    },
    {
      name: 'MT Trainer & Studio',
      price: 'R$ 149',
      period: '/mês',
      description: 'Para personal trainers e consultorias esportivas que gerenciam múltiplos alunos.',
      features: [
        'Até 50 alunos ativos simultâneos',
        'Painel dedicado do Treinador',
        'Prescrição em massa e templates',
        'Alertas de frequência e estagnação',
        'Relatórios executivos de evolução',
        'Suporte prioritário 24/7',
      ],
      popular: false,
      cta: 'Começar como Treinador',
    },
  ];

  return (
    <section id="planos" className="py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-[#FF6500]">
            PLANOS & INVESTIMENTO
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F5F5]">
            ESCOLHA SEU <span className="text-[#FF6500]">NÍVEL</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B8B8] font-medium">
            Planos transparentes e escaláveis para atletas e treinadores profissionais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.popular ? 'highlight' : 'default'}
              className={`flex flex-col justify-between p-8 relative ${
                plan.popular ? 'bg-[#181818] border-[#FF6500]/50' : 'bg-[#181818] border-[#292929]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FF6500] text-white text-[10px] font-display font-bold uppercase tracking-wider shadow-orange-glow-sm flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Mais Escolhido</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-[#F5F5F5] uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#777777] mt-1 font-medium">{plan.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display font-black text-4xl sm:text-5xl text-[#F5F5F5] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#777777] font-medium">{plan.period}</span>
                </div>

                <div className="mt-8 space-y-3 pt-6 border-t border-[#292929]">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-xs text-[#B8B8B8] font-medium">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6500]/15 text-[#FF6500] shrink-0">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link href="/dashboard" className="block w-full">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
