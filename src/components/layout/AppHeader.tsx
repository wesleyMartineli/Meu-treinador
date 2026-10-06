'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Play, Bell, Dumbbell, Sparkles, LogOut } from 'lucide-react';
import { LogoMT } from '@/components/ui/LogoMT';
import { Button } from '@/components/ui/Button';

import { useAuth } from '@/context/AuthContext';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface AppHeaderProps {
  onOpenMobileMenu?: () => void;
  title?: string;
  subtitle?: string;
}

export function AppHeader({ onOpenMobileMenu }: AppHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#1F1F1F] bg-[#000000]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 md:hidden">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#181818] border border-[#292929] text-[#B8B8B8] hover:text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <LogoMT size="sm" showText={false} href="/dashboard" />
          </div>
        </div>

        {/* Right Action Shortcuts */}
        <div className="flex items-center gap-3">
          <Link href="/treino" className="hidden sm:inline-block">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
            >
              Iniciar Treino
            </Button>
          </Link>

          <div className="h-4 w-[1px] bg-[#292929] hidden sm:block" />

          <Link
            href="/perfil"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#181818] border border-[#292929] text-[#B8B8B8] hover:text-white hover:border-[#FF6500]/40 transition-colors"
          >
            <UserAvatar name={user?.name || 'Atleta'} size="sm" />
            <span className="text-xs font-bold uppercase hidden sm:inline text-[#F5F5F5]">
              {user?.name?.split(' ')[0] || 'Atleta'}
            </span>
          </Link>

          <button
            onClick={logout}
            title="Sair da Conta"
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#141414] hover:bg-red-950/30 border border-[#242424] hover:border-red-900/50 text-[#777777] hover:text-red-400 transition-all text-xs font-bold uppercase tracking-wider shrink-0"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>

      </div>
    </header>
  );
}
