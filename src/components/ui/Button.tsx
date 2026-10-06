'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-display font-bold uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'bg-[#FF6500] text-white hover:bg-[#FF8A00] shadow-orange-glow-sm hover:shadow-orange-glow border border-[#FF6500]/20',
      secondary:
        'bg-[#181818] text-[#F5F5F5] border border-[#292929] hover:bg-[#1E1E1E] hover:border-[#3D3D3D] hover:text-white',
      outline:
        'bg-transparent text-[#F5F5F5] border border-[#292929] hover:border-[#FF6500] hover:text-[#FF6500]',
      ghost:
        'bg-transparent text-[#B8B8B8] hover:text-[#F5F5F5] hover:bg-[#181818]',
      danger:
        'bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900/60',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2.5 text-xs sm:text-sm gap-2',
      lg: 'px-6 py-3.5 text-sm sm:text-base gap-2.5',
      xl: 'px-8 py-4 text-base sm:text-lg gap-3',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
