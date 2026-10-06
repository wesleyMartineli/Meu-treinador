'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Quote, Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Gabriel Souza',
      role: 'Atleta Amador de Força',
      content:
        'A clareza para registrar as cargas e acompanhar os recordes transformou meus treinos. Em 3 meses saí dos 80kg de supino para 105kg com consistência.',
      rating: 5,
    },
    {
      name: 'Dr. Roberto Meireles',
      role: 'Médico & Aluno MT',
      content:
        'Interface limpa, rápida e direta ao ponto. Não perco tempo na academia: abro o app, sigo a sequência prescrita e vejo meu gráfico evoluindo semanalmente.',
      rating: 5,
    },
    {
      name: 'Larissa Fontes',
      role: 'Personal Trainer',
      content:
        'Como treinadora, o painel de gestão me poupa horas de trabalho. Consigo prescrever para dezenas de alunos e saber na hora quem está precisando de ajuste.',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-[#121212]/60 border-t border-[#292929]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-[#FF6500]">
            DEPOIMENTOS REAIS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F5F5]">
            RESULTADOS DE QUEM <span className="text-[#FF6500]">EXECUTA</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8B8B8] font-medium">
            Atletas e treinadores que levaram sua disciplina ao mais alto nível de rendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <Card
              key={test.name}
              className="p-6 bg-[#181818] border-[#292929] flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center gap-1 text-[#FF6500] mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#B8B8B8] font-medium leading-relaxed italic">
                  "{test.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#292929]">
                <UserAvatar name={test.name} role={test.role} size="sm" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
