'use client';

import React from 'react';
import {
  X,
  Moon,
  Zap,
  Activity,
  Brain,
  Flame,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { calculateReadiness } from '@/lib/utils';
import { appStorage } from '@/lib/storage';
import { RecoveryCheckin } from '@/types/database';

interface DailyCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (checkin: RecoveryCheckin) => void;
}

export function DailyCheckinModal({ isOpen, onClose, onSaved }: DailyCheckinModalProps) {
  const [sleepScore, setSleepScore] = React.useState(8);
  const [energyScore, setEnergyScore] = React.useState(8);
  const [sorenessScore, setSorenessScore] = React.useState(3);
  const [stressScore, setStressScore] = React.useState(2);
  const [motivationScore, setMotivationScore] = React.useState(9);

  if (!isOpen) return null;

  const { score, status, recommendation } = calculateReadiness(
    sleepScore,
    energyScore,
    sorenessScore,
    stressScore,
    motivationScore
  );

  const handleSave = () => {
    const checkin: RecoveryCheckin = {
      id: `rec-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      sleep_score: sleepScore,
      energy_score: energyScore,
      muscle_soreness_score: sorenessScore,
      stress_score: stressScore,
      motivation_score: motivationScore,
      readiness_total: score,
      status,
      ai_recommendation: recommendation,
    };

    appStorage.saveRecoveryCheckin(checkin);
    if (onSaved) onSaved(checkin);
    onClose();
  };

  const getStatusColor = () => {
    if (status === 'intense') return 'text-primary-400 border-primary-500/30 bg-primary-500/10';
    if (status === 'moderate') return 'text-accent-amber border-accent-amber/30 bg-accent-amber/10';
    return 'text-accent-rose border-accent-rose/30 bg-accent-rose/10';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Check-in de Recuperação</h2>
              <p className="text-xs text-gray-400">Avalie seu estado biológico para calibrar o treino de hoje</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-surface-elevated hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Readiness Gauge Banner */}
        <div className="my-4 rounded-2xl border border-surface-border bg-surface-elevated/70 p-4 text-center">
          <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
            Índice de Prontidão (Readiness Score)
          </span>
          <div className="flex items-baseline justify-center gap-1 my-1">
            <span className="font-mono text-4xl font-black text-white">{score}</span>
            <span className="text-sm font-bold text-gray-400">/ 100</span>
          </div>

          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${getStatusColor()}`}>
            <span>
              {status === 'intense' && '🟢 Pronto para Treino Intenso'}
              {status === 'moderate' && '🟡 Treino Moderado'}
              {status === 'recovery' && '🔴 Recuperação Recomendada'}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-300 font-medium px-2 text-left bg-surface-card/60 p-2.5 rounded-xl border border-surface-border/50">
            {recommendation}
          </p>
        </div>

        {/* Sliders */}
        <div className="space-y-4 py-2">
          {/* Sleep */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-bold text-gray-200">
                <Moon className="h-4 w-4 text-accent-cyan" />
                Qualidade do Sono
              </span>
              <span className="font-mono font-bold text-accent-cyan">{sleepScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sleepScore}
              onChange={(e) => setSleepScore(parseInt(e.target.value, 10))}
              className="w-full accent-accent-cyan cursor-pointer"
            />
          </div>

          {/* Energy */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-bold text-gray-200">
                <Zap className="h-4 w-4 text-accent-amber" />
                Nível de Energia & Disposição
              </span>
              <span className="font-mono font-bold text-accent-amber">{energyScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyScore}
              onChange={(e) => setEnergyScore(parseInt(e.target.value, 10))}
              className="w-full accent-accent-amber cursor-pointer"
            />
          </div>

          {/* Soreness */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-bold text-gray-200">
                <Activity className="h-4 w-4 text-accent-rose" />
                Dor Muscular Tardia (DOMS)
              </span>
              <span className="font-mono font-bold text-accent-rose">
                {sorenessScore}/10 {sorenessScore <= 3 ? '(Baixa)' : sorenessScore >= 7 ? '(Alta)' : '(Média)'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={sorenessScore}
              onChange={(e) => setSorenessScore(parseInt(e.target.value, 10))}
              className="w-full accent-accent-rose cursor-pointer"
            />
          </div>

          {/* Stress */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-bold text-gray-200">
                <Brain className="h-4 w-4 text-accent-purple" />
                Nível de Estresse & Cansaço Mental
              </span>
              <span className="font-mono font-bold text-accent-purple">{stressScore}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={stressScore}
              onChange={(e) => setStressScore(parseInt(e.target.value, 10))}
              className="w-full accent-accent-purple cursor-pointer"
            />
          </div>

          {/* Motivation */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-bold text-gray-200">
                <Flame className="h-4 w-4 text-primary-400" />
                Motivação & Foco para Treinar
              </span>
              <span className="font-mono font-bold text-primary-400">{motivationScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={motivationScore}
              onChange={(e) => setMotivationScore(parseInt(e.target.value, 10))}
              className="w-full accent-primary-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-surface-border pt-4 mt-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-surface-border bg-surface-elevated px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-5 py-2 text-xs sm:text-sm font-bold text-black shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-95"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Salvar Check-in</span>
          </button>
        </div>
      </div>
    </div>
  );
}
