'use client';

import React from 'react';
import {
  X,
  Zap,
  Save,
  MapPin,
  Heart,
  TrendingUp,
  Activity,
  Footprints,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RunningLog, RunningWorkoutType, RunningTerrain } from '@/types/database';
import { calculatePace } from '@/lib/utils';
import { appStorage } from '@/lib/storage';

interface RunningLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (log: RunningLog) => void;
}

export function RunningLoggerModal({ isOpen, onClose, onSaved }: RunningLoggerModalProps) {
  const [title, setTitle] = React.useState('🏃 Corrida de Ritmo (5k)');
  const [workoutType, setWorkoutType] = React.useState<RunningWorkoutType>('ritmo');
  const [distanceKm, setDistanceKm] = React.useState<number>(5.0);
  const [minutes, setMinutes] = React.useState<number>(24);
  const [seconds, setSeconds] = React.useState<number>(30);
  const [elevationGain, setElevationGain] = React.useState<number>(35);
  const [avgHeartRate, setAvgHeartRate] = React.useState<number>(164);
  const [maxHeartRate, setMaxHeartRate] = React.useState<number>(176);
  const [rpe, setRpe] = React.useState<number>(7);
  const [terrain, setTerrain] = React.useState<RunningTerrain>('asfalto');
  const [shoes, setShoes] = React.useState('Nike Pegasus 40');
  const [notes, setNotes] = React.useState('');

  if (!isOpen) return null;

  const totalDurationSeconds = minutes * 60 + seconds;
  const calculatedPace = calculatePace(distanceKm, totalDurationSeconds);
  const calculatedSpeedKmh =
    distanceKm > 0 && totalDurationSeconds > 0
      ? Math.round((distanceKm / (totalDurationSeconds / 3600)) * 10) / 10
      : 0;

  const handleSave = () => {
    try {
      confetti({ particleCount: 80, spread: 60 });
    } catch {
      // ignore
    }

    const log: RunningLog = {
      id: `run-${Date.now()}`,
      date: new Date().toISOString(),
      title,
      workout_type: workoutType,
      distance_km: distanceKm,
      duration_seconds: totalDurationSeconds,
      pace_min_per_km: calculatedPace,
      speed_kmh: calculatedSpeedKmh,
      elevation_gain_m: elevationGain,
      avg_heart_rate_bpm: avgHeartRate,
      max_heart_rate_bpm: maxHeartRate,
      rpe,
      terrain,
      shoes,
      notes,
    };

    appStorage.saveRunningLog(log);

    // Synchronize with weekly schedule if today has a running activity
    try {
      const todayDayIndex = new Date().getDay();
      const schedule = appStorage.getWeeklySchedule();
      const todayItem = schedule.find((s) => s.day_index === todayDayIndex);
      if (todayItem && todayItem.activity_type === 'running') {
        todayItem.completed = true;
        appStorage.saveWeeklySchedule(schedule);
      }
    } catch {
      // ignore
    }

    if (onSaved) onSaved(log);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-orange/10 text-accent-orange">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Registrar Corrida</h2>
              <p className="text-xs text-gray-400">Salve seus dados de treino aeróbico ou velocidade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-surface-elevated hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Pace Preview */}
        <div className="my-4 grid grid-cols-2 gap-3 rounded-2xl bg-surface-elevated/80 p-3.5 border border-accent-orange/30 text-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Pace Médio Calculado</span>
            <p className="font-mono text-2xl font-black text-accent-orange">
              {calculatedPace} <span className="text-xs font-normal text-gray-400">/km</span>
            </p>
          </div>
          <div className="border-l border-surface-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Velocidade Média</span>
            <p className="font-mono text-2xl font-black text-white">
              {calculatedSpeedKmh} <span className="text-xs font-normal text-gray-400">km/h</span>
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-3 py-1">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Título da Sessão</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-xs text-white outline-none focus:border-accent-orange"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Tipo de Treino</label>
              <select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value as RunningWorkoutType)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white outline-none focus:border-accent-orange"
              >
                <option value="base">Rodagem Leve (ou Base)</option>
                <option value="longao">Treino Longo (Longão)</option>
                <option value="intervalado">Treino Intervalado (Tiros)</option>
                <option value="ritmo">Tempo Run (Ritmo)</option>
                <option value="fartlek">Fartlek</option>
                <option value="regenerativo">Regenerativo</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Terreno</label>
              <select
                value={terrain}
                onChange={(e) => setTerrain(e.target.value as RunningTerrain)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white outline-none focus:border-accent-orange"
              >
                <option value="asfalto">Asfalto / Rua</option>
                <option value="esteira">Esteira</option>
                <option value="pista">Pista de Atletismo</option>
                <option value="trilha">Trilha / Trail</option>
                <option value="misto">Misto</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Distância (km)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs font-bold text-white outline-none focus:border-accent-orange"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Minutos</label>
              <input
                type="number"
                min="0"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs font-bold text-white outline-none focus:border-accent-orange"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Segundos</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value, 10) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs font-bold text-white outline-none focus:border-accent-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1 mb-1">
                <Heart className="h-3 w-3 text-red-400" /> BPM Médio
              </label>
              <input
                type="number"
                value={avgHeartRate}
                onChange={(e) => setAvgHeartRate(parseInt(e.target.value, 10) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3 text-cyan-400" /> Ganho (+m)
              </label>
              <input
                type="number"
                value={elevationGain}
                onChange={(e) => setElevationGain(parseInt(e.target.value, 10) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1 mb-1">
                <Activity className="h-3 w-3 text-amber-400" /> Esforço (RPE)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={rpe}
                onChange={(e) => setRpe(parseInt(e.target.value, 10) || 7)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1 mb-1">
              <Footprints className="h-3 w-3 text-primary-400" /> Tênis Utilizado
            </label>
            <input
              type="text"
              value={shoes}
              onChange={(e) => setShoes(e.target.value)}
              placeholder="Ex: Nike Vaporfly / Pegasus / Asics Nimbus"
              className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Anotações da Corrida</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Sensações, clima, hidratação..."
              rows={2}
              className="w-full rounded-xl bg-surface-elevated border border-surface-border p-2.5 text-xs text-white"
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-orange to-amber-500 px-5 py-2 text-xs sm:text-sm font-bold text-black shadow-lg shadow-accent-orange/20 hover:brightness-110 active:scale-95"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Corrida</span>
          </button>
        </div>
      </div>
    </div>
  );
}
