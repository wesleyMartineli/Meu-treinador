'use client';

import React from 'react';

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
        <div className="flex flex-col min-w-0 text-left">
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
