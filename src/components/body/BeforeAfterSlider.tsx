'use client';

import React from 'react';
import { ProgressPhoto } from '@/types/database';
import { Sliders, Calendar, Scale, Camera, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';
import { UploadProgressPhotoModal } from './UploadProgressPhotoModal';

interface BeforeAfterSliderProps {
  photos: ProgressPhoto[];
  onPhotosUpdated?: () => void;
}

export function BeforeAfterSlider({ photos, onPhotosUpdated }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [selectedBeforeIndex, setSelectedBeforeIndex] = React.useState(0);
  const [selectedAfterIndex, setSelectedAfterIndex] = React.useState(Math.max(0, photos.length - 1));

  // Keep indices valid if photos array changes
  React.useEffect(() => {
    setSelectedAfterIndex(Math.max(0, photos.length - 1));
  }, [photos.length]);

  const beforePhoto = photos[selectedBeforeIndex] || {
    id: 'default-before',
    date: '2026-07-01',
    weight_kg: 84.5,
    front_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    notes: 'Início',
  };

  const afterPhoto = photos[selectedAfterIndex] || {
    id: 'default-after',
    date: '2026-09-28',
    weight_kg: 79.8,
    front_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    notes: 'Atual',
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // Calculate weight diff
  const beforeWeight = beforePhoto.weight_kg ?? 0;
  const afterWeight = afterPhoto.weight_kg ?? 0;
  const weightDiff = (beforeWeight && afterWeight) ? (beforeWeight - afterWeight).toFixed(1) : '0.0';

  return (
    <div className="card-athletic overflow-hidden p-5 space-y-4">
      {/* Card Header & Upload Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border/60 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Comparativo Antes x Depois</h3>
            <span className="text-xs text-gray-400">Arraste a barra central para comparar o físico</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-4 py-2 text-xs font-bold text-black shadow-md shadow-primary-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Camera className="h-4 w-4" />
            <span>Subir Fotos</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Slider */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-80 sm:h-96 w-full select-none overflow-hidden rounded-2xl cursor-ew-resize bg-surface-elevated shadow-inner"
      >
        {/* After (Full background) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterPhoto.front_url}
          alt="Depois"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Before (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforePhoto.front_url}
            alt="Antes"
            className="absolute inset-0 h-full w-full object-cover max-w-none"
            style={{ width: containerRef.current?.clientWidth || '100%' }}
          />
        </div>

        {/* Separator Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-2xl transition-transform"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-black shadow-2xl border-2 border-primary-500">
            ↔
          </div>
        </div>

        {/* Before Tag Badge */}
        <div className="absolute top-3 left-3 z-10 rounded-xl bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-xs font-bold text-white flex items-center gap-2 shadow-lg">
          <span className="text-gray-300">ANTES</span>
          <span className="text-gray-400 font-normal">({beforePhoto.date})</span>
          {beforePhoto.weight_kg && (
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] text-amber-300 font-mono">
              {beforePhoto.weight_kg}kg
            </span>
          )}
        </div>

        {/* After Tag Badge */}
        <div className="absolute top-3 right-3 z-10 rounded-xl bg-primary-950/85 backdrop-blur-md px-3 py-1.5 border border-primary-500/40 text-xs font-bold text-primary-400 flex items-center gap-2 shadow-lg">
          <span>ATUAL</span>
          <span className="text-gray-300 font-normal">({afterPhoto.date})</span>
          {afterPhoto.weight_kg && (
            <span className="rounded bg-primary-500/30 px-1.5 py-0.5 text-[10px] text-white font-mono">
              {afterPhoto.weight_kg}kg
            </span>
          )}
        </div>
      </div>

      {/* Delta Evolution Summary */}
      <div className="grid grid-cols-2 gap-3 pt-1 text-center">
        <div className="rounded-xl bg-surface-elevated p-3 border border-surface-border">
          <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center justify-center gap-1">
            <Calendar className="h-3 w-3 text-primary-400" /> Período Decorrido
          </span>
          <p className="text-sm font-bold text-white mt-1">
            {beforePhoto.date} ⟷ {afterPhoto.date}
          </p>
        </div>

        <div className="rounded-xl bg-surface-elevated p-3 border border-surface-border">
          <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center justify-center gap-1">
            <Scale className="h-3 w-3 text-primary-400" /> Variação de Peso
          </span>
          <p className={`text-sm font-bold mt-1 ${parseFloat(weightDiff) >= 0 ? 'text-primary-400' : 'text-amber-400'}`}>
            {parseFloat(weightDiff) >= 0 ? `-${weightDiff} kg eliminados` : `+${Math.abs(parseFloat(weightDiff))} kg`}
          </p>
        </div>
      </div>

      {/* Multiple Photos Timeline Selector if more than 2 photos exist */}
      {photos.length > 2 && (
        <div className="pt-2 border-t border-surface-border/50">
          <span className="text-xs font-bold text-gray-400 block mb-2">
            Galeria de Registros ({photos.length} fotos salvas):
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {photos.map((p, idx) => (
              <div
                key={p.id}
                className="shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-elevated border border-surface-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.front_url}
                  alt={p.date}
                  className="h-16 w-14 rounded-lg object-cover"
                />
                <span className="text-[10px] font-mono text-gray-300">{p.date.slice(5)}</span>
                <div className="flex gap-1 pt-0.5">
                  <button
                    onClick={() => setSelectedBeforeIndex(idx)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      selectedBeforeIndex === idx ? 'bg-amber-400 text-black' : 'bg-surface-card text-gray-400'
                    }`}
                  >
                    Antes
                  </button>
                  <button
                    onClick={() => setSelectedAfterIndex(idx)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      selectedAfterIndex === idx ? 'bg-primary-500 text-black' : 'bg-surface-card text-gray-400'
                    }`}
                  >
                    Depois
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <UploadProgressPhotoModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          currentPhotos={photos}
          onSaved={() => {
            if (onPhotosUpdated) onPhotosUpdated();
          }}
        />
      )}
    </div>
  );
}

