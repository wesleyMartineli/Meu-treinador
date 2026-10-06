'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-[#B8B8B8]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#777777] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl bg-[#121212] border border-[#292929] px-4 py-2.5 text-sm text-[#F5F5F5] placeholder-[#777777] transition-all duration-200 focus:border-[#FF6500] focus:outline-none focus:ring-1 focus:ring-[#FF6500] ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#777777] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-[#B8B8B8]">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-xl bg-[#121212] border border-[#292929] px-4 py-2.5 text-sm text-[#F5F5F5] transition-all duration-200 focus:border-[#FF6500] focus:outline-none focus:ring-1 focus:ring-[#FF6500] ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#181818] text-[#F5F5F5]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
}

export interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1 bg-[#121212] border border-[#292929] rounded-xl ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? 'bg-[#181818] text-[#FF6500] border border-[#292929] shadow-sm'
                : 'text-[#777777] hover:text-[#F5F5F5] hover:bg-[#181818]/50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#FF6500]/20 text-[#FF6500]' : 'bg-[#222222] text-[#777777]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
