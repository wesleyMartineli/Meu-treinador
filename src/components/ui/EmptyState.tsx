'use client';

import React from 'react';
import { LucideIcon, Inbox, Loader2 } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'Você ainda não possui registros.',
  description = 'Comece seu primeiro treino para acompanhar sua evolução.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#121212] border border-[#292929] ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#181818] border border-[#292929] text-[#777777] mb-4 shadow-subtle">
        <Icon className="h-6 w-6 text-[#FF6500]" />
      </div>
      <h4 className="font-display font-bold text-base sm:text-lg text-[#F5F5F5] tracking-tight max-w-sm">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-[#777777] mt-1.5 max-w-md font-medium">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'Carregando dados...',
  className = '',
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-[#FF6500] mb-3" />
      <span className="text-xs font-bold uppercase tracking-widest text-[#777777]">
        {message}
      </span>
    </div>
  );
}

export interface UserAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  role?: string;
  className?: string;
}

export function UserAvatar({
  name,
  avatarUrl,
  size = 'md',
  role,
  className = '',
}: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative ${sizeClasses[size]} shrink-0 flex items-center justify-center rounded-xl bg-[#1E1E1E] border border-[#292929] font-display font-black text-[#F5F5F5] shadow-subtle overflow-hidden`}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-[#FF6500]">{initials}</span>
        )}
      </div>
      {role !== undefined && (
        <div className="flex flex-col min-w-0">
          <span className="truncate text-xs sm:text-sm font-bold text-[#F5F5F5]">
            {name}
          </span>
          <span className="text-[10px] font-semibold text-[#777777] uppercase tracking-wider truncate">
            {role}
          </span>
        </div>
      )}
    </div>
  );
}
