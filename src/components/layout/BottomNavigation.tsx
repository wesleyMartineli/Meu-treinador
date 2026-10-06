'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Flame,
  TrendingUp,
  User,
} from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'INÍCIO', icon: LayoutDashboard },
    { href: '/treinos', label: 'TREINOS', icon: Dumbbell },
    { href: '/treino', label: 'EXECUÇÃO', icon: Flame },
    { href: '/evolucao', label: 'EVOLUÇÃO', icon: TrendingUp },
    { href: '/perfil', label: 'PERFIL', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[#1F1F1F] bg-[#000000]/95 backdrop-blur-xl px-2 md:hidden">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname === link.href ||
          (link.href === '/' && pathname === '/dashboard');

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#FF6500] font-bold'
                : 'text-[#777777] hover:text-[#B8B8B8]'
            }`}
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                isActive ? 'bg-[#FF6500]/15' : ''
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-[9px] font-display tracking-wider font-bold">
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
