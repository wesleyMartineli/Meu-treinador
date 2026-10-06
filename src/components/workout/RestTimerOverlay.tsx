'use client';

import React from 'react';
import { Timer, X, Plus, Minus, Volume2, VolumeX } from 'lucide-react';
import { playBeep } from '@/lib/utils';

interface RestTimerOverlayProps {
  initialSeconds: number;
  onFinish?: () => void;
  onClose?: () => void;
}

export function RestTimerOverlay({ initialSeconds, onFinish, onClose }: RestTimerOverlayProps) {
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  React.useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      if (soundEnabled) {
        playBeep(880, 250);
        setTimeout(() => playBeep(1100, 350), 300);
      }
      if (onFinish) onFinish();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, soundEnabled, onFinish]);

  const addSeconds = (val: number) => {
    setSecondsLeft((prev) => Math.max(0, prev + val));
  };

  const progress = Math.min(100, Math.max(0, ((initialSeconds - secondsLeft) / (initialSeconds || 1)) * 100));

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex items-center gap-3 rounded-2xl border border-primary-500/40 bg-surface-elevated/95 p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
      {/* Visual ring/icon */}
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
        <Timer className="h-6 w-6 animate-pulse" />
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-surface-border"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * progress) / 100}
            className="text-primary-500 transition-all duration-1000"
          />
        </svg>
      </div>

      {/* Countdown display */}
      <div className="flex flex-col pr-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Descanso</span>
        <span className="font-mono text-2xl font-black text-white">
          {minutes}:{secs < 10 ? '0' : ''}{secs}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 border-l border-surface-border pl-2">
        <button
          onClick={() => addSeconds(-15)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-card text-gray-300 hover:bg-surface-border hover:text-white"
          title="-15 segundos"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => addSeconds(30)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-card text-gray-300 hover:bg-surface-border hover:text-white"
          title="+30 segundos"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-card text-gray-400 hover:text-primary-400"
          title={soundEnabled ? 'Silenciar alarme' : 'Ativar som'}
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-red-400" />}
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
            title="Pular descanso"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
