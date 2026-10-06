'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#FF6500]/10 border border-[#FF6500]/20 flex items-center justify-center text-[#FF6500] mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black font-display text-white mb-2">404</h1>
      <h2 className="text-lg font-bold uppercase text-[#CCCCCC] mb-3">Página não encontrada</h2>
      <p className="text-sm text-[#777777] max-w-md mb-6">
        A página que você tentou acessar não existe ou foi movida.
      </p>
      <Link href="/login">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Voltar para o Login
        </Button>
      </Link>
    </div>
  );
}
