'use client';

import React from 'react';
import {
  X,
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle,
  Calendar,
  Scale,
  Sparkles,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProgressPhoto } from '@/types/database';
import { appStorage } from '@/lib/storage';

interface UploadProgressPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
  currentPhotos: ProgressPhoto[];
}

export function UploadProgressPhotoModal({
  isOpen,
  onClose,
  onSaved,
  currentPhotos,
}: UploadProgressPhotoModalProps) {
  const [tab, setTab] = React.useState<'single' | 'both'>('single');

  // Single photo state (New progress entry)
  const [singleDate, setSingleDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [singleWeight, setSingleWeight] = React.useState<number>(79.8);
  const [singlePhotoUrl, setSinglePhotoUrl] = React.useState('');
  const [singleNotes, setSingleNotes] = React.useState('');
  const [singleFilePreview, setSingleFilePreview] = React.useState<string | null>(null);

  // Both photos state (Quick update Before & After)
  const [beforeDate, setBeforeDate] = React.useState(() => currentPhotos[0]?.date || '2026-07-01');
  const [beforeWeight, setBeforeWeight] = React.useState<number>(currentPhotos[0]?.weight_kg || 84.5);
  const [beforePreview, setBeforePreview] = React.useState<string | null>(currentPhotos[0]?.front_url || null);

  const [afterDate, setAfterDate] = React.useState(() => currentPhotos[currentPhotos.length - 1]?.date || new Date().toISOString().slice(0, 10));
  const [afterWeight, setAfterWeight] = React.useState<number>(currentPhotos[currentPhotos.length - 1]?.weight_kg || 79.8);
  const [afterPreview, setAfterPreview] = React.useState<string | null>(currentPhotos[currentPhotos.length - 1]?.front_url || null);

  if (!isOpen) return null;

  // Handle local file selection and convert to Base64 data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'single' | 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (target === 'single') setSingleFilePreview(result);
      if (target === 'before') setBeforePreview(result);
      if (target === 'after') setAfterPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSingle = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = singleFilePreview || singlePhotoUrl;
    if (!finalUrl) return;

    const newPhoto: ProgressPhoto = {
      id: `photo-${Date.now()}`,
      date: singleDate,
      weight_kg: singleWeight,
      front_url: finalUrl,
      notes: singleNotes || 'Registro fotográfico de evolução',
    };

    appStorage.saveProgressPhoto(newPhoto);

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    if (onSaved) onSaved();
    onClose();
  };

  const handleSaveBoth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforePreview || !afterPreview) return;

    const beforeObj: ProgressPhoto = {
      id: currentPhotos[0]?.id || `photo-before-${Date.now()}`,
      date: beforeDate,
      weight_kg: beforeWeight,
      front_url: beforePreview,
      notes: 'Início do Protocolo',
    };

    const afterObj: ProgressPhoto = {
      id: `photo-after-${Date.now()}`,
      date: afterDate,
      weight_kg: afterWeight,
      front_url: afterPreview,
      notes: 'Foto de Evolução Atual',
    };

    const updatedList = [beforeObj, afterObj];
    appStorage.updateProgressPhotos(updatedList);

    try {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    if (onSaved) onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-surface-border bg-surface-card p-5 sm:p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-400">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Enviar Fotos de Evolução</h2>
              <p className="text-xs text-gray-400">Suba imagens do seu dispositivo para comparar seu Antes x Depois</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-surface-elevated hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-surface-elevated p-1 border border-surface-border">
          <button
            type="button"
            onClick={() => setTab('single')}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              tab === 'single'
                ? 'bg-primary-500 text-black shadow-md shadow-primary-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            + Adicionar Nova Foto Atual
          </button>
          <button
            type="button"
            onClick={() => setTab('both')}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              tab === 'both'
                ? 'bg-primary-500 text-black shadow-md shadow-primary-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Atualizar Antes e Depois
          </button>
        </div>

        {/* Form Single Photo */}
        {tab === 'single' && (
          <form onSubmit={handleSaveSingle} className="space-y-4">
            {/* Upload Area */}
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1.5">
                Selecione a Foto (do seu Computador ou Celular)
              </label>

              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-surface-border hover:border-primary-500/60 bg-surface-elevated/50 p-5 transition-all cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'single')}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />

                {singleFilePreview ? (
                  <div className="space-y-3 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={singleFilePreview}
                      alt="Pré-visualização"
                      className="mx-auto h-44 rounded-xl object-contain shadow-lg border border-primary-500/40"
                    />
                    <span className="inline-block text-xs font-bold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-lg border border-primary-500/20">
                      ✓ Foto carregada! Clique para trocar
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-400 group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Clique para selecionar ou arraste o arquivo</p>
                      <p className="text-[11px] text-gray-400">PNG, JPG, JPEG ou WebP (armazenamento local seguro)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Date and Weight Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-primary-400" /> Data da Foto
                </label>
                <input
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white outline-none focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1 flex items-center gap-1">
                  <Scale className="h-3.5 w-3.5 text-primary-400" /> Peso no Dia (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={singleWeight}
                  onChange={(e) => setSingleWeight(parseFloat(e.target.value) || 0)}
                  placeholder="Ex: 79.5"
                  className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white outline-none focus:border-primary-500"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Anotações / Sensação</label>
              <input
                type="text"
                value={singleNotes}
                onChange={(e) => setSingleNotes(e.target.value)}
                placeholder="Ex: 8 semanas de treino, redução visível de gordura abdominal..."
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3.5 py-2 text-xs text-white outline-none focus:border-primary-500"
              />
            </div>

            {/* Submit CTA */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!singleFilePreview && !singlePhotoUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Salvar Foto</span>
              </button>
            </div>
          </form>
        )}

        {/* Form Both Photos (Before & After) */}
        {tab === 'both' && (
          <form onSubmit={handleSaveBoth} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BEFORE CARD */}
              <div className="rounded-2xl bg-surface-elevated p-3.5 border border-surface-border space-y-3">
                <span className="rounded-lg bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white uppercase block w-fit">
                  1. Foto do Antes (Início)
                </span>

                <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-surface-border bg-black/40 p-3 text-center cursor-pointer min-h-[140px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'before')}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {beforePreview ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={beforePreview}
                      alt="Antes"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="space-y-1">
                      <Upload className="mx-auto h-5 w-5 text-gray-400" />
                      <p className="text-[11px] text-gray-300 font-bold">Subir Foto Inicial</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-0.5">Data</label>
                    <input
                      type="date"
                      value={beforeDate}
                      onChange={(e) => setBeforeDate(e.target.value)}
                      className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1.5 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-0.5">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={beforeWeight}
                      onChange={(e) => setBeforeWeight(parseFloat(e.target.value) || 0)}
                      className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1.5 text-xs text-white font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* AFTER CARD */}
              <div className="rounded-2xl bg-surface-elevated p-3.5 border border-primary-500/40 space-y-3">
                <span className="rounded-lg bg-primary-500/20 px-2 py-0.5 text-[10px] font-bold text-primary-400 uppercase block w-fit">
                  2. Foto do Depois (Atual)
                </span>

                <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary-500/40 bg-black/40 p-3 text-center cursor-pointer min-h-[140px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'after')}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {afterPreview ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={afterPreview}
                      alt="Depois"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="space-y-1">
                      <Upload className="mx-auto h-5 w-5 text-primary-400" />
                      <p className="text-[11px] text-primary-300 font-bold">Subir Foto Atual</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-0.5">Data</label>
                    <input
                      type="date"
                      value={afterDate}
                      onChange={(e) => setAfterDate(e.target.value)}
                      className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1.5 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-0.5">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={afterWeight}
                      onChange={(e) => setAfterWeight(parseFloat(e.target.value) || 0)}
                      className="w-full rounded-lg bg-surface-card border border-surface-border px-2 py-1.5 text-xs text-white font-bold"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!beforePreview || !afterPreview}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Atualizar Comparativo</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
