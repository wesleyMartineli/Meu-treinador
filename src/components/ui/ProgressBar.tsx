'use client';

import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'orange' | 'white' | 'green' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'orange',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const fillColors = {
    orange: 'bg-[#FF6500] shadow-orange-glow-sm',
    white: 'bg-[#F5F5F5]',
    green: 'bg-emerald-500',
    gray: 'bg-[#777777]',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-bold text-[#B8B8B8]">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-[#FF6500] font-mono">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#292929] rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillColors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'dark' | 'outline' | 'green' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'dark',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variants = {
    orange: 'bg-[#FF6500]/15 text-[#FF6500] border border-[#FF6500]/30',
    dark: 'bg-[#222222] text-[#F5F5F5] border border-[#2E2E2E]',
    outline: 'bg-transparent text-[#B8B8B8] border border-[#292929]',
    green: 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40',
    danger: 'bg-red-950/40 text-red-400 border border-red-800/40',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center font-display font-bold uppercase tracking-wider rounded-md ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
