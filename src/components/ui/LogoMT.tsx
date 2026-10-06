'use client';

import React from 'react';
import Link from 'next/link';

interface LogoMTProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  href?: string;
}

export function LogoMT({
  className = '',
  size = 'lg',
  showText = false,
  href = '/',
}: LogoMTProps) {
  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
    '2xl': 'h-28 w-28',
  };

  const pixelDimensions = {
    sm: { w: 36, h: 36 },
    md: { w: 48, h: 48 },
    lg: { w: 64, h: 64 },
    xl: { w: 96, h: 96 },
    '2xl': { w: 112, h: 112 },
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
  };

  const dims = pixelDimensions[size];

  const logoGraphic = (
    <div className={`flex items-center justify-center gap-3 shrink-0 ${className}`}>
      <div
        style={{ width: `${dims.w}px`, height: `${dims.h}px`, minWidth: `${dims.w}px`, minHeight: `${dims.h}px` }}
        className={`relative ${sizeClasses[size]} shrink-0 flex items-center justify-center p-1 transition-all duration-200`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/LogoNova.png"
          alt="Meu Treinador Logo"
          width={dims.w}
          height={dims.h}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="h-full w-full object-contain drop-shadow-md"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className={`font-display font-black tracking-tight text-[#F5F5F5] ${textClasses[size]} leading-none uppercase`}>
            MEU <span className="text-[#FF6500]">TREINADOR</span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#777777] mt-1 font-mono">
            PERFORMANCE & SAAS
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center justify-center transition-transform hover:scale-[1.03] active:scale-[0.98]">
        {logoGraphic}
      </Link>
    );
  }

  return logoGraphic;
}
