'use client';

import React from 'react';
import Link from 'next/link';
import { LogoMT } from '@/components/ui/LogoMT';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { label: 'Início', href: '#hero' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Recursos', href: '#recursos' },
    { label: 'Planos', href: '#planos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#292929] bg-[#0B0B0B]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo MT à esquerda */}
        <LogoMT size="md" href="/" />

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-display font-bold uppercase tracking-wider text-[#B8B8B8] hover:text-[#FF6500] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions à direita: Entrar / Começar agora */}
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Começar Agora
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#181818] border border-[#292929] text-[#B8B8B8] hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#292929] bg-[#0B0B0B] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-display font-bold uppercase tracking-wider text-[#B8B8B8] hover:text-[#FF6500] py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#292929] flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" size="md" className="w-full">
                Entrar
              </Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
