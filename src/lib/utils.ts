import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPace(secondsPerKm: number): string {
  if (!secondsPerKm || isNaN(secondsPerKm) || secondsPerKm <= 0) return '0:00';
  const mins = Math.floor(secondsPerKm / 60);
  const secs = Math.round(secondsPerKm % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function calculatePace(distanceKm: number, durationSeconds: number): string {
  if (!distanceKm || distanceKm <= 0 || !durationSeconds || durationSeconds <= 0) return '0:00';
  const secondsPerKm = durationSeconds / distanceKm;
  return formatPace(secondsPerKm);
}

export function paceToSeconds(paceStr: string): number {
  if (!paceStr) return 0;
  const parts = paceStr.replace('/km', '').trim().split(':');
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 0;
    const secs = parseInt(parts[1], 10) || 0;
    return mins * 60 + secs;
  }
  return 0;
}

export function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || isNaN(totalSeconds) || totalSeconds <= 0) return '00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
  }
  return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
}

export function formatDurationDigital(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Epley Formula for 1RM estimate: Weight * (1 + Reps / 30)
 */
export function estimateOneRepMax(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  const epley = weightKg * (1 + reps / 30);
  return Math.round(epley * 10) / 10;
}

/**
 * Calculate readiness score from 5 questions (0-10)
 */
export function calculateReadiness(
  sleep: number,
  energy: number,
  muscleSoreness: number, // 10 is high soreness -> negative
  stress: number, // 10 is high stress -> negative
  motivation: number
): { score: number; status: 'intense' | 'moderate' | 'recovery'; recommendation: string } {
  // Sleep (25%), Energy (25%), Motivation (20%), Low Soreness (15%), Low Stress (15%)
  const sorenessFactor = 10 - muscleSoreness;
  const stressFactor = 10 - stress;

  const rawScore =
    sleep * 2.5 +
    energy * 2.5 +
    motivation * 2.0 +
    sorenessFactor * 1.5 +
    stressFactor * 1.5;

  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  if (score >= 78) {
    return {
      score,
      status: 'intense',
      recommendation: '🟢 Pronto para treino intenso! Sistema neuromuscular 100% recuperado. Excelente dia para buscar sobrecarga progressiva ou tiros de ritmo.'
    };
  } else if (score >= 52) {
    return {
      score,
      status: 'moderate',
      recommendation: '🟡 Prontidão moderada. Realize o treino planejado com atenção à percepção de esforço (RPE 7-8). Evite ir até a falha extrema.'
    };
  } else {
    return {
      score,
      status: 'recovery',
      recommendation: '🔴 Recuperação recomendada. Alta fadiga acumulada. Sugerimos descanso ativo, caminhada leve, liberação miofascial ou sono reparador.'
    };
  }
}

/**
 * Web Audio API Beep Generator for timer alerts
 */
export function playBeep(freq = 880, duration = 200) {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch {
    // AudioContext blocked or not supported
  }
}
