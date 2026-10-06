'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { appStorage } from '@/lib/storage';
import { BodyMetricModal } from '@/components/body/BodyMetricModal';
import { UploadProgressPhotoModal } from '@/components/body/UploadProgressPhotoModal';
import { BeforeAfterSlider } from '@/components/body/BeforeAfterSlider';
import { TrendingUp, Plus, Camera } from 'lucide-react';

export default function CorpoPage() {
  const [metrics, setMetrics] = React.useState(appStorage.getBodyMetrics());
  const [photos, setPhotos] = React.useState(appStorage.getProgressPhotos());
  const [isMetricModalOpen, setIsMetricModalOpen] = React.useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = React.useState(false);

  React.useEffect(() => {
    setMetrics(appStorage.getBodyMetrics());
    setPhotos(appStorage.getProgressPhotos());
  }, []);

  const latestMetric = metrics[metrics.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
              Composição <span className="text-accent-emerald">Corporal & Fotos</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Acompanhamento de peso, percentual de gordura (BF%), medidas e fotos comparativas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-surface-card border border-surface-border px-4 py-2.5 text-xs font-bold text-gray-200 hover:bg-surface-elevated transition-all"
            >
              <Camera className="h-4 w-4 text-accent-emerald" />
              Adicionar Foto
            </button>
            <button
              onClick={() => setIsMetricModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              Registrar Medidas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card-athletic p-5 space-y-1">
            <span className="text-xs text-gray-400">Peso Atual</span>
            <div className="text-2xl font-display font-extrabold text-white">
              {latestMetric ? `${latestMetric.weight_kg} kg` : '--'}
            </div>
          </div>
          <div className="card-athletic p-5 space-y-1">
            <span className="text-xs text-gray-400">Percentual de Gordura</span>
            <div className="text-2xl font-display font-extrabold text-accent-emerald">
              {latestMetric?.body_fat_percent ? `${latestMetric.body_fat_percent}%` : '--'}
            </div>
          </div>
          <div className="card-athletic p-5 space-y-1">
            <span className="text-xs text-gray-400">Tórax / Peitoral</span>
            <div className="text-2xl font-display font-extrabold text-white">
              {latestMetric?.chest_cm ? `${latestMetric.chest_cm} cm` : '--'}
            </div>
          </div>
          <div className="card-athletic p-5 space-y-1">
            <span className="text-xs text-gray-400">Braço Direito</span>
            <div className="text-2xl font-display font-extrabold text-amber-400">
              {latestMetric?.arm_right_cm ? `${latestMetric.arm_right_cm} cm` : '--'}
            </div>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="card-athletic p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="h-5 w-5 text-accent-emerald" />
              Comparativo Antes & Depois
            </h3>
            <div className="max-w-2xl mx-auto">
              <BeforeAfterSlider
                photos={photos}
                onPhotosUpdated={() => setPhotos(appStorage.getProgressPhotos())}
              />
            </div>
          </div>
        )}
      </main>

      <BodyMetricModal
        isOpen={isMetricModalOpen}
        onClose={() => setIsMetricModalOpen(false)}
        onSaved={() => {
          setMetrics(appStorage.getBodyMetrics());
          setIsMetricModalOpen(false);
        }}
      />

      <UploadProgressPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSaved={() => {
          setPhotos(appStorage.getProgressPhotos());
          setIsPhotoModalOpen(false);
        }}
        currentPhotos={photos}
      />
    </div>
  );
}
