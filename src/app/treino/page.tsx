'use client';

import React from 'react';
import Link from 'next/link';
import { appStorage } from '@/lib/storage';
import { ActiveWorkoutModal } from '@/components/workout/ActiveWorkoutModal';
import { Dumbbell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WorkoutRoutine } from '@/types/database';

export default function WorkoutExecutionPage() {
  const [routines, setRoutines] = React.useState<WorkoutRoutine[]>([]);
  const [activeRoutine, setActiveRoutine] = React.useState<WorkoutRoutine | null>(null);

  React.useEffect(() => {
    const list = appStorage.getRoutines();
    setRoutines(list);
    if (list.length > 0) {
      setActiveRoutine(list[0]);
    }
  }, []);

  if (routines.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#111111] border border-[#222222] text-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#181818] border border-[#262626] mx-auto text-[#FF6500]">
            <Dumbbell className="h-7 w-7" />
          </div>
          <h2 className="font-display font-bold text-xl text-white uppercase tracking-tight">
            Nenhuma ficha cadastrada
          </h2>
          <p className="text-xs text-[#888888] leading-relaxed">
            Para iniciar uma sessão de treino, crie uma ficha personalizada com seus exercícios e metas de séries.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/treinos">
              <Button variant="primary" size="md" className="w-full font-bold text-xs uppercase tracking-wider shadow-orange-glow" leftIcon={<Plus className="h-4 w-4 stroke-[3]" />}>
                Criar Minha Ficha
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 max-w-7xl mx-auto px-4">
      {activeRoutine && (
        <ActiveWorkoutModal
          routine={activeRoutine}
          isOpen={true}
          onClose={() => {
            window.location.href = '/dashboard';
          }}
          onFinish={() => {
            window.location.href = '/dashboard';
          }}
        />
      )}
    </div>
  );
}
