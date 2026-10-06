'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Layers,
  TrendingUp,
  Target,
  Trophy,
  User,
  Flame,
  ChevronRight,
  X,
  Calendar,
  Zap,
  HeartPulse,
  Compass,
  Sparkles,
  Scale,
  Award,
} from 'lucide-react';
import { LogoMT } from '@/components/ui/LogoMT';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isTrainerMode?: boolean;
}

export function Sidebar({ isOpen, onClose, isTrainerMode = false }: SidebarProps) {
  const pathname = usePathname();

  const navSections: NavSection[] = [
    {
      title: 'Principal',
      items: [
        { href: '/', label: 'Dash Geral', icon: LayoutDashboard },
        { href: '/desenvolvimento', label: 'Desenvolvimento', icon: Trophy },
        { href: '/calendario', label: 'Calendário', icon: Calendar },
      ],
    },
    {
      title: 'Treinamento & Esporte',
      items: [
        { href: '/treinos', label: 'Treinos & Rotinas', icon: Dumbbell },
        { href: '/treino', label: 'Sessão Ativa', icon: Flame },
        { href: '/corrida', label: 'Corrida & Cardio', icon: Zap },
        { href: '/exercicios', label: 'Exercícios', icon: Layers },
      ],
    },
    {
      title: 'Evolução & Saúde',
      items: [
        { href: '/evolucao', label: 'Evolução & Gráficos', icon: TrendingUp },
        { href: '/corpo', label: 'Composição Corporal', icon: Scale },
        { href: '/recuperacao', label: 'Recuperação & Sono', icon: HeartPulse },
        { href: '/relatorios', label: 'Relatórios', icon: Compass },
        { href: '/metas', label: 'Metas', icon: Target },
        { href: '/conquistas', label: 'Conquistas', icon: Award },
      ],
    },
    {
      title: 'Inteligência & Ajustes',
      items: [
        { href: '/coach', label: 'Coach IA', icon: Sparkles },
        { href: '/perfil', label: 'Perfil do Atleta', icon: User },
      ],
    },
  ];

  const content = (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5 bg-[#000000]">
      <div className="space-y-5">
        {/* Brand Header with LogoMT Centered */}
        <div className="flex items-center justify-center relative px-1 pt-2 pb-1 border-b border-[#1A1A1A]">
          <LogoMT size="lg" showText={false} href="/" className="justify-center" />
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden absolute right-0 top-3 rounded-lg p-1.5 text-[#777777] hover:bg-[#181818] hover:text-[#F5F5F5] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4 overflow-y-auto max-h-[calc(100vh-100px)] pr-1 no-scrollbar">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-[#777777]">
                {section.title}
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href === '/' && (pathname === '/' || pathname === '/dashboard'));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-[#141414] text-[#FF6500] border border-[#242424] shadow-subtle'
                        : 'text-[#B8B8B8] hover:bg-[#141414]/60 hover:text-[#F5F5F5] hover:border-[#1E1E1E]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#FF6500]/15 text-[#FF6500]'
                            : 'bg-[#141414] text-[#777777] group-hover:text-[#F5F5F5]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <ChevronRight
                      className={`h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 ${
                        isActive ? 'opacity-100 text-[#FF6500]' : 'text-[#777777]'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed top-0 bottom-0 left-0 z-40 border-r border-[#1F1F1F] bg-[#000000] overflow-y-auto">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#000000] border-r border-[#1F1F1F] shadow-2xl z-50 overflow-y-auto">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
