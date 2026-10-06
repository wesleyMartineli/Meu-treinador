'use client';

import React from 'react';

interface MascotIllustrationProps {
  variant?: 'cinematic' | 'badge' | 'achievement';
  className?: string;
  glow?: boolean;
}

export function MascotIllustration({
  variant = 'badge',
  className = '',
  glow = true,
}: MascotIllustrationProps) {
  if (variant === 'cinematic') {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        {/* Cinematic Orange Rim Light */}
        {glow && (
          <div className="absolute inset-0 bg-radial from-[#FF6500]/20 via-transparent to-transparent blur-3xl pointer-events-none" />
        )}
        
        {/* Dark High-Performance Hybrid Beast Silhouette SVG */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full max-w-lg opacity-85 drop-shadow-[0_10px_35px_rgba(255,101,0,0.25)] select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#glow)">
            {/* Athletic Hybrid Crest & Head */}
            <path
              d="M250 80 L310 140 L380 160 L340 210 L390 270 L300 290 L270 360 L230 360 L200 290 L110 270 L160 210 L120 160 L190 140 Z"
              fill="#181818"
              stroke="#FF6500"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Muscular Shoulders / Wings */}
            <path
              d="M160 210 Q90 260 50 350 Q130 380 200 320"
              fill="#141414"
              stroke="#292929"
              strokeWidth="3"
            />
            <path
              d="M340 210 Q410 260 450 350 Q370 380 300 320"
              fill="#141414"
              stroke="#292929"
              strokeWidth="3"
            />
            {/* Aggressive Tusks / Beak Accent */}
            <path
              d="M210 260 L250 330 L290 260 L250 280 Z"
              fill="#FF6500"
              opacity="0.9"
            />
            {/* Fierce Eyes */}
            <circle cx="215" cy="205" r="7" fill="#FF8A00" />
            <circle cx="285" cy="205" r="7" fill="#FF8A00" />
            {/* Athletic Armor Facets */}
            <path
              d="M250 120 L275 170 L250 190 L225 170 Z"
              fill="#222222"
              stroke="#FF6500"
              strokeWidth="2"
            />
          </g>
          <defs>
            <filter id="glow" x="-20" y="-20" width="540" height="540" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#1E1E1E] to-[#121212] border border-[#FF6500]/30 p-4 shadow-orange-glow-sm ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B0B0B] border border-[#292929] mb-3 shadow-inner">
          <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#FF6500]">
            <polygon points="50,15 80,45 65,85 35,85 20,45" fill="none" stroke="currentColor" strokeWidth="6" />
            <polygon points="50,30 65,55 35,55" fill="currentColor" opacity="0.85" />
          </svg>
        </div>
        <span className="font-display font-black text-xs uppercase tracking-widest text-[#F5F5F5]">
          MT HYBRID BEAST
        </span>
        <span className="text-[9px] font-bold text-[#FF6500] uppercase tracking-wider">
          CONQUISTA ATIVA
        </span>
      </div>
    </div>
  );
}
