'use client';

import React from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RestTimerProps {
  initialSeconds?: number;
  onFinish?: () => void;
  autoStart?: boolean;
}

export function RestTimer({
  initialSeconds = 90,
  onFinish,
  autoStart = false,
}: RestTimerProps) {
  const [targetSeconds, setTargetSeconds] = React.useState(initialSeconds);
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds);
  const [isRunning, setIsRunning] = React.useState(autoStart);
  const [isFinished, setIsFinished] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, onFinish]);

  const handleReset = (newTime?: number) => {
    const time = newTime ?? targetSeconds;
    setTargetSeconds(time);
    setSecondsLeft(time);
    setIsRunning(true);
    setIsFinished(false);
  };

  const handleAdjust = (amount: number) => {
    setSecondsLeft((prev) => Math.max(0, prev + amount));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.max(
    0,
    Math.min(100, ((targetSeconds - secondsLeft) / targetSeconds) * 100)
  );

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
        isFinished
          ? 'bg-[#FF6500]/15 border-[#FF6500] shadow-orange-glow'
          : 'bg-[#181818] border-[#292929]'
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Bell className={`h-4 w-4 ${isFinished ? 'text-[#FF6500] animate-bounce' : 'text-[#777777]'}`} />
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#B8B8B8]">
            Cronômetro de Descanso
          </span>
        </div>
        {isFinished && (
          <span className="text-[10px] font-black uppercase text-[#FF6500] px-2 py-0.5 bg-[#FF6500]/20 rounded border border-[#FF6500]/40">
            Descanso Finalizado!
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Big Time Display */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#F5F5F5] tracking-tight">
            {formatTime(secondsLeft)}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAdjust(-15)}
              className="p-1 rounded-lg bg-[#121212] border border-[#292929] text-[#777777] hover:text-[#F5F5F5]"
              title="-15s"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => handleAdjust(15)}
              className="p-1 rounded-lg bg-[#121212] border border-[#292929] text-[#777777] hover:text-[#F5F5F5]"
              title="+15s"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Presets & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {[45, 60, 90, 120].map((t) => (
            <button
              key={t}
              onClick={() => handleReset(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                targetSeconds === t
                  ? 'bg-[#FF6500] text-white'
                  : 'bg-[#121212] border border-[#292929] text-[#777777] hover:text-white'
              }`}
            >
              {t}s
            </button>
          ))}

          <Button
            variant={isRunning ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            leftIcon={isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
          >
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Button>

          <button
            onClick={() => handleReset()}
            className="p-2 rounded-xl bg-[#121212] border border-[#292929] text-[#777777] hover:text-[#F5F5F5]"
            title="Reiniciar"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1.5 w-full bg-[#292929] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FF6500] transition-all duration-300 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
