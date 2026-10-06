'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CoachAIChat } from '@/components/coach/CoachAIChat';

export default function CoachPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <CoachAIChat />
      </main>
    </div>
  );
}
