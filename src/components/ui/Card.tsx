'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'highlight' | 'subtle';
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({
  variant = 'default',
  children,
  className = '',
  hoverable = false,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-[#181818] border-[#292929]',
    elevated: 'bg-[#1C1C1C] border-[#333333]',
    highlight: 'bg-[#181818] border-[#FF6500]/40 shadow-orange-glow-sm',
    subtle: 'bg-[#121212] border-[#202020]',
  };

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
        variants[variant]
      } ${
        hoverable ? 'hover:border-[#3D3D3D] hover:bg-[#1C1C1C] hover:translate-y-[-2px]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeTrend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  badgeTrend = 'neutral',
  highlight = false,
  className = '',
}: MetricCardProps) {
  const trendColors = {
    up: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
    down: 'text-red-400 bg-red-950/40 border-red-800/40',
    neutral: 'text-[#B8B8B8] bg-[#222222] border-[#333333]',
  };

  return (
    <Card
      variant={highlight ? 'highlight' : 'default'}
      className={`relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
          {title}
        </span>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#222222] border border-[#2E2E2E] text-[#FF6500]">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black font-display text-[#F5F5F5] tracking-tight">
            {value}
          </span>
          {badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${trendColors[badgeTrend]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs text-[#777777] font-medium">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}
