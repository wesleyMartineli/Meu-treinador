'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#000000] text-white min-h-screen flex items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md w-full bg-[#121212] border border-[#242424] p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#FF6500]/15 text-[#FF6500] flex items-center justify-center mx-auto mb-4 font-black">
            MT
          </div>
          <h2 className="text-xl font-bold mb-2 font-display uppercase">Erro Crítico da Aplicação</h2>
          <p className="text-xs text-[#888888] mb-6">
            Não foi possível renderizar a raiz da aplicação.
          </p>
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 rounded-xl bg-[#FF6500] hover:bg-[#e05800] text-black font-black uppercase tracking-wider text-xs transition-colors"
          >
            Recarregar Plataforma
          </button>
        </div>
      </body>
    </html>
  );
}
