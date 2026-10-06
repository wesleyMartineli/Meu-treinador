'use client';

import React from 'react';
import Link from 'next/link';
import { LogoMT } from '@/components/ui/LogoMT';

export function LandingFooter() {
  return (
    <footer id="contato" className="border-t border-[#292929] bg-[#0B0B0B] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <LogoMT size="md" href="/" />
            <p className="text-xs text-[#777777] max-w-sm leading-relaxed font-medium">
              MEU TREINADOR (MT) é a plataforma SaaS de treinamento de alta performance para atletas e treinadores que buscam evolução contínua através de métricas reais e consistência.
            </p>
            <div className="text-[11px] font-mono text-[#777777]">
              DISCIPLINA GERA <span className="text-[#FF6500] font-bold">RESULTADOS</span>
            </div>
          </div>

          {/* Col 2: Navegação */}
          <div className="space-y-3">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#F5F5F5]">
              Navegação
            </span>
            <ul className="space-y-2 text-xs text-[#777777] font-medium">
              <li><a href="#hero" className="hover:text-[#FF6500] transition-colors">Início</a></li>
              <li><a href="#como-funciona" className="hover:text-[#FF6500] transition-colors">Como Funciona</a></li>
              <li><a href="#recursos" className="hover:text-[#FF6500] transition-colors">Recursos</a></li>
              <li><a href="#planos" className="hover:text-[#FF6500] transition-colors">Planos & Preços</a></li>
              <li><a href="#depoimentos" className="hover:text-[#FF6500] transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Col 3: Plataforma */}
          <div className="space-y-3">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#F5F5F5]">
              Plataforma
            </span>
            <ul className="space-y-2 text-xs text-[#777777] font-medium">
              <li><Link href="/dashboard" className="hover:text-[#FF6500] transition-colors">Dashboard do Aluno</Link></li>
              <li><Link href="/treino" className="hover:text-[#FF6500] transition-colors">Modo Treino Ativo</Link></li>
              <li><Link href="/exercicios" className="hover:text-[#FF6500] transition-colors">Biblioteca de Exercícios</Link></li>
              <li><Link href="/evolucao" className="hover:text-[#FF6500] transition-colors">Evolução & Gráficos</Link></li>
            </ul>

          </div>
        </div>

        <div className="pt-8 border-t border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777] font-medium">
          <p>© {new Date().getFullYear()} MEU TREINADOR (MT). Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacidade</span>
            <span className="text-[#FF6500] font-bold">MT PRO ATHLETICS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
