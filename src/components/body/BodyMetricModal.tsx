'use client';

import React from 'react';
import { X, Save, User, Scale, Ruler } from 'lucide-react';
import { BodyMetrics } from '@/types/database';
import { appStorage } from '@/lib/storage';

interface BodyMetricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (metric: BodyMetrics) => void;
}

export function BodyMetricModal({ isOpen, onClose, onSaved }: BodyMetricModalProps) {
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [weightKg, setWeightKg] = React.useState<number>(79.5);
  const [bodyFat, setBodyFat] = React.useState<number>(14.2);
  const [waistCm, setWaistCm] = React.useState<number>(81.5);
  const [chestCm, setChestCm] = React.useState<number>(107.0);
  const [armRightCm, setArmRightCm] = React.useState<number>(39.0);
  const [armLeftCm, setArmLeftCm] = React.useState<number>(38.5);
  const [thighRightCm, setThighRightCm] = React.useState<number>(61.0);
  const [thighLeftCm, setThighLeftCm] = React.useState<number>(60.5);
  const [calvesCm, setCalvesCm] = React.useState<number>(38.8);
  const [notes, setNotes] = React.useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const metric: BodyMetrics = {
      id: `bm-${Date.now()}`,
      date,
      weight_kg: weightKg,
      body_fat_percent: bodyFat,
      waist_cm: waistCm,
      chest_cm: chestCm,
      arm_right_cm: armRightCm,
      arm_left_cm: armLeftCm,
      thigh_right_cm: thighRightCm,
      thigh_left_cm: thighLeftCm,
      calves_cm: calvesCm,
      notes,
    };

    appStorage.saveBodyMetrics(metric);
    if (onSaved) onSaved(metric);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Registrar Medidas Corporais</h2>
              <p className="text-xs text-gray-400">Acompanhe seu peso, medidas de fita e composição corporal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-surface-elevated hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Data da Medição</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1 mb-1">
                <Scale className="h-3.5 w-3.5 text-primary-400" /> Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs font-bold text-white focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">% Gordura Corporal (BF)</label>
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(parseFloat(e.target.value) || 0)}
                placeholder="Ex: 14.5"
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1 mb-1">
                <Ruler className="h-3.5 w-3.5 text-accent-cyan" /> Cintura (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={waistCm}
                onChange={(e) => setWaistCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Peitoral (cm)</label>
              <input
                type="number"
                step="0.5"
                value={chestCm}
                onChange={(e) => setChestCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Braço Dir. (cm)</label>
              <input
                type="number"
                step="0.5"
                value={armRightCm}
                onChange={(e) => setArmRightCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Braço Esq. (cm)</label>
              <input
                type="number"
                step="0.5"
                value={armLeftCm}
                onChange={(e) => setArmLeftCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Coxa Dir. (cm)</label>
              <input
                type="number"
                step="0.5"
                value={thighRightCm}
                onChange={(e) => setThighRightCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Coxa Esq. (cm)</label>
              <input
                type="number"
                step="0.5"
                value={thighLeftCm}
                onChange={(e) => setThighLeftCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Panturrilhas (cm)</label>
              <input
                type="number"
                step="0.5"
                value={calvesCm}
                onChange={(e) => setCalvesCm(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl bg-surface-elevated border border-surface-border px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Observações</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Medição em jejum pela manhã..."
              rows={2}
              className="w-full rounded-xl bg-surface-elevated border border-surface-border p-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-surface-border pt-4">
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
            <Save className="h-4 w-4" />
            <span>Salvar Medidas</span>
          </button>
        </div>
      </div>
    </div>
  );
}
