'use client';

import React from 'react';
import { Play, Pause, Sparkles, Layers, ChevronRight } from 'lucide-react';
import { getExerciseMedia } from '@/lib/exercise-media';
import { Exercise } from '@/types/database';

interface ExerciseVisualPlayerProps {
  exercise: Exercise;
  showDetailsBadge?: boolean;
}

export function ExerciseVisualPlayer({ exercise, showDetailsBadge = true }: ExerciseVisualPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [mode, setMode] = React.useState<'gif' | 'photo'>('gif');
  const [activeFrameIndex, setActiveFrameIndex] = React.useState<number>(0);
  const [imageError, setImageError] = React.useState(false);

  const media = getExerciseMedia(exercise.id, exercise.primary_muscle);
  const isDirectGif = media.gifUrl && media.gifUrl.endsWith('.gif');
  const hasFrames = Boolean(media.frames && media.frames.length >= 2);

  React.useEffect(() => {
    if (!isPlaying || isDirectGif || !hasFrames || mode !== 'gif') return;

    const timer = setInterval(() => {
      setActiveFrameIndex((prev) => (prev === 0 ? 1 : 0));
    }, 1150);

    return () => clearInterval(timer);
  }, [isPlaying, isDirectGif, hasFrames, mode]);

  let currentSrc = media.coverImage;
  if (mode === 'gif') {
    if (isDirectGif) {
      currentSrc = media.gifUrl;
    } else if (hasFrames && media.frames) {
      currentSrc = media.frames[activeFrameIndex] || media.frames[0];
    } else {
      currentSrc = media.gifUrl || media.coverImage;
    }
  } else {
    currentSrc = media.coverImage;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-black/70 shadow-xl group">
      <div className="relative h-64 sm:h-80 w-full flex items-center justify-center bg-gradient-to-b from-[#161b22] to-[#0d1117] overflow-hidden">
        {!imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={`${exercise.id}-${mode}-${activeFrameIndex}`}
            src={currentSrc}
            alt={exercise.name}
            onError={() => {
              if (currentSrc !== media.coverImage) {
                currentSrc = media.coverImage;
              } else {
                setImageError(true);
              }
            }}
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
            <Layers className="h-10 w-10 text-gray-600" />
            <p className="text-xs">Demonstração visual indisponível</p>
          </div>
        )}

        {showDetailsBadge && (
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/80 px-2.5 py-1 text-xs font-semibold text-primary-400 backdrop-blur-md border border-white/10">
              <Sparkles className="h-3 w-3 text-primary-400" />
              {exercise.primary_muscle.toUpperCase()}
            </span>

            {exercise.focus && (
              <span className="rounded-md bg-black/80 px-2 py-1 text-[11px] font-medium text-gray-300 backdrop-blur-md border border-white/10 capitalize">
                {exercise.focus}
              </span>
            )}
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/80 p-1 backdrop-blur-md border border-white/10">
          <button
            type="button"
            onClick={() => setMode('gif')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              mode === 'gif'
                ? 'bg-primary-500 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            GIF / Loop
          </button>
          <button
            type="button"
            onClick={() => setMode('photo')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              mode === 'photo'
                ? 'bg-primary-500 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Foto
          </button>
        </div>

        {mode === 'gif' && !isDirectGif && hasFrames && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/80 p-1 backdrop-blur-md border border-white/10">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded text-gray-300 hover:text-white transition-colors"
              title={isPlaying ? 'Pausar animação' : 'Reproduzir animação'}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setActiveFrameIndex((prev) => (prev === 0 ? 1 : 0));
              }}
              className="p-1.5 rounded text-gray-300 hover:text-white transition-colors"
              title="Trocar fase do movimento"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="p-3 bg-surface-elevated/90 border-t border-surface-border flex items-center justify-between text-xs text-gray-400">
        <div>
          <span className="font-semibold text-gray-200">{exercise.name}</span>
          {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
            <p className="text-[11px] text-gray-400 truncate max-w-xs">
              Sinergistas: {exercise.secondary_muscles.join(', ')}
            </p>
          )}
        </div>
        <span className="text-[11px] rounded bg-white/5 px-2 py-0.5 border border-white/5 capitalize text-gray-300">
          {exercise.equipment || 'Livre'}
        </span>
      </div>
    </div>
  );
}
