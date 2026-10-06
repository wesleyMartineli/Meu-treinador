'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold font-display uppercase tracking-tight mb-2">
        Algo deu errado
      </h2>
      <p className="text-sm text-[#888888] max-w-md mb-6">
        Ocorreu uma instabilidade inesperada ao carregar a plataforma. Tente recarregar a tela ou voltar ao início.
      </p>
      <div className="flex items-center gap-3">
        <Button onClick={() => reset()} variant="primary" size="md" leftIcon={<RotateCcw className="w-4 h-4" />}>
          Tentar novamente
        </Button>
        <Button onClick={() => (window.location.href = '/login')} variant="secondary" size="md">
          Ir para Login
        </Button>
      </div>
    </div>
  );
}
