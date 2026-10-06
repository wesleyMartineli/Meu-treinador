'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';
import { AppHeader } from './AppHeader';
import { useAuth } from '@/context/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Check if current page is a standalone page (auth, onboarding, landing)
  const isStandalonePage =
    pathname === '/' ||
    pathname === '/landing' ||
    pathname === '/login' ||
    pathname === '/cadastro' ||
    pathname === '/onboarding';
  const isTrainerMode = pathname.startsWith('/treinador');

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !isStandalonePage) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, isStandalonePage, router]);

  if (isStandalonePage) {
    return <div className="min-h-screen bg-[#000000] text-[#F5F5F5]">{children}</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#FF6500] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#777777]">
            Carregando Plataforma...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F5] flex flex-col">
      {/* Desktop Sidebar & Mobile Drawer */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isTrainerMode={isTrainerMode}
      />

      {/* Main Content Area next to Sidebar */}
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-200">
        <AppHeader onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 pb-20 md:pb-10">{children}</main>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
