import { WorkoutLog, WorkoutExerciseLog } from '../types/database';
import { estimateOneRepMax } from './utils';

export interface ProgressionSuggestion {
  exerciseId: string;
  exerciseName: string;
  currentWeightKg: number;
  suggestedWeightKg: number;
  reason: string;
  type: 'increase_load' | 'increase_reps' | 'maintain' | 'deload';
}

/**
 * Evaluates exercise sets against target rep range to recommend progressive overload
 */
export function analyzeExerciseProgression(
  exerciseId: string,
  exerciseName: string,
  targetRepsMin: number,
  targetRepsMax: number,
  targetWeightKg: number,
  completedSets: { weight_kg: number; reps: number; completed: boolean }[]
): ProgressionSuggestion {
  const validSets = completedSets.filter((s) => s.completed && s.reps > 0);
  if (validSets.length === 0) {
    return {
      exerciseId,
      exerciseName,
      currentWeightKg: targetWeightKg,
      suggestedWeightKg: targetWeightKg,
      reason: 'Nenhuma série concluída registrada para este exercício.',
      type: 'maintain',
    };
  }

  const allHitCeiling = validSets.every((s) => s.reps >= targetRepsMax && s.weight_kg >= targetWeightKg);
  const avgReps = validSets.reduce((acc, s) => acc + s.reps, 0) / validSets.length;

  if (allHitCeiling) {
    // Increment load: 2kg to 5kg based on base weight
    const increment = targetWeightKg >= 60 ? 5 : 2.5;
    const nextWeight = targetWeightKg + increment;
    return {
      exerciseId,
      exerciseName,
      currentWeightKg: targetWeightKg,
      suggestedWeightKg: nextWeight,
      reason: `🔥 Excelente! Você atingiu o topo da faixa (${targetRepsMax} reps) em todas as séries com ${targetWeightKg}kg. Sugestão: Aumente para ${nextWeight}kg na próxima sessão mantendo o início da faixa (${targetRepsMin} reps).`,
      type: 'increase_load',
    };
  }

  if (avgReps >= targetRepsMin) {
    return {
      exerciseId,
      exerciseName,
      currentWeightKg: targetWeightKg,
      suggestedWeightKg: targetWeightKg,
      reason: `💪 Bom desempenho! Você está na faixa ideal (${targetRepsMin}-${targetRepsMax} reps). Continue com ${targetWeightKg}kg até completar ${targetRepsMax} reps em todas as séries.`,
      type: 'increase_reps',
    };
  }

  return {
    exerciseId,
    exerciseName,
    currentWeightKg: targetWeightKg,
    suggestedWeightKg: targetWeightKg,
    reason: `Foco em técnica e consistência. Mantenha ${targetWeightKg}kg e busque atingir ao menos ${targetRepsMin} repetições limpas por série.`,
    type: 'maintain',
  };
}

/**
 * Calculates total tonnage moved in a workout
 */
export function calculateWorkoutTonnage(workout: WorkoutLog | { exercises: WorkoutExerciseLog[] }): number {
  let totalTonnage = 0;
  workout.exercises.forEach((ex) => {
    ex.sets.forEach((set) => {
      if (set.completed && set.weight_kg > 0 && set.reps > 0) {
        totalTonnage += set.weight_kg * set.reps;
      }
    });
  });
  return Math.round(totalTonnage);
}

/**
 * Returns the estimated 1RM for all logged sets in an exercise
 */
export function getMaxEstimated1RM(sets: { weight_kg: number; reps: number; completed: boolean }[]): number {
  let max1RM = 0;
  sets.forEach((s) => {
    if (s.completed && s.weight_kg > 0 && s.reps > 0) {
      const e1RM = estimateOneRepMax(s.weight_kg, s.reps);
      if (e1RM > max1RM) {
        max1RM = e1RM;
      }
    }
  });
  return max1RM;
}
