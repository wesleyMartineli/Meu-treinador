'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isOnboarded, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (!isOnboarded) {
        router.replace('/onboarding');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, isOnboarded, isLoading, router]);

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

