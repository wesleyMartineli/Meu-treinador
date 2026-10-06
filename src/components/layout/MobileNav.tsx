'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Dumbbell,
  Sparkles,
  Layers,
  HeartPulse,
  Calendar,
  Zap,
  Compass,
  Trophy,
  Menu,
} from 'lucide-react';

interface MobileNavProps {
  onOpenMenu?: () => void;
}

export function MobileNav({ onOpenMenu }: MobileNavProps = {}) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dash', icon: Activity },
    { href: '/desenvolvimento', label: 'Metas', icon: Trophy },
    { href: '/treinos', label: 'Treinos', icon: Dumbbell },
    { href: '/corrida', label: 'Corrida', icon: Zap },
    { href: '/coach', label: 'Coach IA', icon: Sparkles },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-surface-border bg-background/95 backdrop-blur-xl px-2 md:hidden">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all ${
              isActive ? 'text-primary-500 font-bold scale-105' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px]">{link.label}</span>
          </Link>
        );
      })}

      {onOpenMenu && (
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center gap-1 rounded-xl p-2 text-gray-400 hover:text-gray-200 transition-all"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px]">Menu</span>
        </button>
      )}
    </div>
  );
}
