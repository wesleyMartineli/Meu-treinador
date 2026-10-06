'use client';

import React from 'react';
import { SAMPLE_EXERCISES } from '@/services/dataService';
import { ExerciseItem, MuscleGroup } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Search,
  Dumbbell,
  Layers,
  Sparkles,
  AlertTriangle,
  Play,
  Flame,
  Clock,
  Weight,
  Repeat,
  ArrowRight,
  ShieldAlert,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';

interface MuscleFilterOption {
  id: string;
  label: string;
}

const MUSCLE_FILTERS: MuscleFilterOption[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'peito', label: 'Peito' },
  { id: 'costas', label: 'Costas' },
  { id: 'ombros', label: 'Ombros' },
  { id: 'bracos', label: 'Braços' },
  { id: 'pernas', label: 'Pernas' },
  { id: 'core', label: 'Core' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'corrida', label: 'Corrida' },
];

function ExerciseImageMedia({
  gifUrl,
  name,
  className = '',
}: {
  gifUrl?: string;
  name: string;
  className?: string;
}) {
  const [imgError, setImgError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#0A0A0A] flex items-center justify-center ${className}`}
    >
      {!isLoaded && !imgError && (
        <div className="absolute inset-0 bg-[#121212] animate-pulse flex flex-col items-center justify-center gap-2">
          <Dumbbell className="h-7 w-7 text-[#FF6500]/50 animate-bounce" />
          <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider">Carregando GIF...</span>
        </div>
      )}

      {gifUrl && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={gifUrl}
          alt={name}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImgError(true);
            setIsLoaded(true);
          }}
          className={`h-full w-full object-contain p-2 transition-all duration-300 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-4 text-[#555555]">
          <Dumbbell className="h-10 w-10 text-[#FF6500]/60 mb-2" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
            {name}
          </span>
        </div>
      )}

      {/* Badge Indicator for GIF */}
      {gifUrl && !imgError && (
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#000000]/80 backdrop-blur-md border border-[#292929] text-[10px] font-mono font-bold text-[#FF6500]">
          <Play className="h-2.5 w-2.5 fill-[#FF6500]" />
          <span>GIF</span>
        </div>
      )}
    </div>
  );
}

export default function ExerciseLibraryPage() {
  const [exercises] = React.useState<ExerciseItem[]>(SAMPLE_EXERCISES);
  const [search, setSearch] = React.useState('');
  const [selectedMuscle, setSelectedMuscle] = React.useState<string>('todos');
  const [selectedEquipment, setSelectedEquipment] = React.useState<string>('todos');
  const [selectedExercise, setSelectedExercise] = React.useState<ExerciseItem | null>(null);

  // Extract unique equipment list
  const equipmentList = React.useMemo(() => {
    const list = Array.from(new Set(exercises.map((e) => e.equipment)));
    return ['todos', ...list];
  }, [exercises]);

  const filteredExercises = React.useMemo(() => {
    return exercises.filter((ex) => {
      const q = search.toLowerCase();
      const matchesSearch =
        ex.name.toLowerCase().includes(q) ||
        ex.equipment.toLowerCase().includes(q) ||
        (ex.targetAnatomy && ex.targetAnatomy.toLowerCase().includes(q));
      const matchesMuscle =
        selectedMuscle === 'todos' || ex.muscleGroup === selectedMuscle;
      const matchesEquipment =
        selectedEquipment === 'todos' || ex.equipment === selectedEquipment;
      return matchesSearch && matchesMuscle && matchesEquipment;
    });
  }, [exercises, search, selectedMuscle, selectedEquipment]);

  // Counts per muscle
  const getCountForMuscle = (muscleId: string) => {
    if (muscleId === 'todos') return exercises.length;
    return exercises.filter((e) => e.muscleGroup === muscleId).length;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#292929] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#FF6500]/10 text-[#FF6500] border border-[#FF6500]/30">
              <Sparkles className="h-3 w-3" />
              DATABASE BIOMECÂNICO
            </span>
            <span className="text-xs font-mono text-[#777777]">
              {exercises.length} EXERCÍCIOS CATALOGADOS
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-2">
            Biblioteca de Exercícios & GIF
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8E93] font-medium mt-1 max-w-2xl">
            Catálogo completo com animações em GIF de execução, orientações anatômicas de alvo primário/secundário, parâmetros de carga e prevenção de erros biomecânicos.
          </p>
        </div>

        <Link href="/treino">
          <Button variant="primary" size="md" className="gap-2 shrink-0">
            <Play className="h-4 w-4 fill-current" />
            Iniciar Sessão de Treino
          </Button>
        </Link>
      </div>

      {/* Filter Controls: Search & Muscle Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#777777]" />
            <input
              type="text"
              placeholder="Buscar exercício por nome, músculo ou equipamento (ex: supino, halter, quadríceps)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-[#121212] border border-[#292929] pl-10 pr-4 py-3 text-sm text-[#F5F5F5] placeholder-[#777777] focus:border-[#FF6500] focus:ring-1 focus:ring-[#FF6500] focus:outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-[#F5F5F5]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Equipment Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
                aria-label="Filtrar por equipamento"
                className="appearance-none rounded-xl bg-[#121212] border border-[#292929] px-4 py-3 pr-9 text-xs font-bold uppercase tracking-wider text-[#B8B8B8] focus:border-[#FF6500] focus:outline-none cursor-pointer"
              >
                {equipmentList.map((eq) => (
                  <option key={eq} value={eq} className="bg-[#121212] text-white">
                    {eq === 'todos' ? 'Todos Equipamentos' : eq.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#777777] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {MUSCLE_FILTERS.map((filter) => {
            const isActive = selectedMuscle === filter.id;
            const count = getCountForMuscle(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedMuscle(filter.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#181818] text-[#FF6500] border border-[#FF6500] shadow-[0_0_15px_rgba(255,101,0,0.25)]'
                    : 'bg-[#121212] border border-[#292929] text-[#777777] hover:text-[#F5F5F5] hover:border-[#333333]'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#FF6500]/20 text-[#FF6500]' : 'bg-[#1e1e1e] text-[#555555]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise Cards Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Card
              key={exercise.id}
              hoverable
              onClick={() => setSelectedExercise(exercise)}
              className="group overflow-hidden bg-[#181818] border-[#292929] hover:border-[#FF6500]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Card Media Preview (Direct GIF) */}
              <div className="relative">
                <ExerciseImageMedia
                  gifUrl={exercise.gifUrl}
                  name={exercise.name}
                  className="h-48 w-full border-b border-[#292929]"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] px-2.5 py-1 bg-[#000000]/85 backdrop-blur-md rounded-md border border-[#FF6500]/30 shadow-subtle">
                    {exercise.muscleGroup}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#B8B8B8] px-2.5 py-1 bg-[#000000]/85 backdrop-blur-md rounded-md border border-[#292929]">
                    {exercise.equipment.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg sm:text-xl text-[#F5F5F5] uppercase tracking-tight group-hover:text-[#FF6500] transition-colors line-clamp-1">
                    {exercise.name}
                  </h3>

                  {exercise.targetAnatomy && (
                    <p className="text-[11px] font-mono text-[#FF6500]/90 line-clamp-1">
                      🎯 {exercise.targetAnatomy}
                    </p>
                  )}

                  <p className="text-xs text-[#8E8E93] line-clamp-2 leading-relaxed">
                    {exercise.instructions[0] || 'Execução técnica padrão com controle de cadência.'}
                  </p>
                </div>

                {/* Card Footer Info */}
                <div className="pt-3 border-t border-[#292929] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-[#B8B8B8] font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Repeat className="h-3 w-3 text-[#FF6500]" />
                      {exercise.targetSets}x {exercise.targetReps}
                    </span>
                    {exercise.suggestedWeightKg && (
                      <span className="flex items-center gap-1">
                        <Weight className="h-3 w-3 text-[#777777]" />
                        {exercise.suggestedWeightKg}kg
                      </span>
                    )}
                  </div>

                  <span className="text-[#FF6500] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Ver GIF <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#121212] border border-[#292929] space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-[#181818] border border-[#292929] flex items-center justify-center mx-auto text-[#777777]">
            <Dumbbell className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-white">
              Nenhum exercício encontrado
            </h3>
            <p className="text-xs text-[#777777]">
              Não encontramos nenhum exercício correspondente a &quot;{search}&quot;.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch('');
              setSelectedMuscle('todos');
              setSelectedEquipment('todos');
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}

      {/* Exercise Detailed Modal with GIF and Anatomical Analysis */}
      {selectedExercise && (
        <Modal
          isOpen={Boolean(selectedExercise)}
          onClose={() => setSelectedExercise(null)}
          title={selectedExercise.name}
          subtitle={`GRUPO: ${selectedExercise.muscleGroup.toUpperCase()} • EQUIPAMENTO: ${selectedExercise.equipment.toUpperCase().replace('_', ' ')}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Visual Header / GIF Loop Demonstration */}
            <div className="relative rounded-2xl overflow-hidden border border-[#292929] bg-[#000000]">
              <ExerciseImageMedia
                gifUrl={selectedExercise.gifUrl}
                name={selectedExercise.name}
                className="h-64 sm:h-72 w-full object-contain"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#000000]/90 border border-[#FF6500]/50 text-[10px] font-mono font-bold text-[#FF6500] uppercase tracking-wider shadow-lg">
                  <Play className="h-2.5 w-2.5 fill-[#FF6500] animate-pulse" />
                  EXECUÇÃO BIOMECÂNICA EM LOOP
                </span>
              </div>
            </div>

            {/* Target Anatomy Box */}
            {selectedExercise.targetAnatomy && (
              <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] block">
                  🎯 FOCO ANATÔMICO PRINCIPAL
                </span>
                <p className="text-sm font-semibold text-[#F5F5F5]">
                  {selectedExercise.targetAnatomy}
                </p>
                {selectedExercise.secondaryMuscles && selectedExercise.secondaryMuscles.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-[10px] text-[#777777] font-bold uppercase">Sinergistas:</span>
                    {selectedExercise.secondaryMuscles.map((sec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#181818] border border-[#292929] text-[#B8B8B8]"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Target Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#292929]">
                <span className="text-[10px] uppercase font-bold text-[#777777] flex items-center justify-center gap-1">
                  <Layers className="h-3 w-3" /> Séries
                </span>
                <p className="text-lg font-black font-display text-white mt-1">
                  {selectedExercise.targetSets}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#292929]">
                <span className="text-[10px] uppercase font-bold text-[#777777] flex items-center justify-center gap-1">
                  <Repeat className="h-3 w-3" /> Repetições
                </span>
                <p className="text-lg font-black font-display text-[#FF6500] mt-1">
                  {selectedExercise.targetReps}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#292929]">
                <span className="text-[10px] uppercase font-bold text-[#777777] flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" /> Descanso
                </span>
                <p className="text-lg font-black font-display text-white mt-1">
                  {selectedExercise.restSeconds}s
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#292929]">
                <span className="text-[10px] uppercase font-bold text-[#777777] flex items-center justify-center gap-1">
                  <Weight className="h-3 w-3" /> Carga Sugerida
                </span>
                <p className="text-lg font-black font-display text-white mt-1">
                  {selectedExercise.suggestedWeightKg ? `${selectedExercise.suggestedWeightKg} kg` : 'Livre / N/A'}
                </p>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-[#F5F5F5] block">
                Passo a Passo de Execução Correta:
              </span>
              <div className="space-y-2">
                {selectedExercise.instructions.map((inst, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#121212] border border-[#292929]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FF6500]/15 text-[#FF6500] text-xs font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#D1D1D6] leading-relaxed">{inst}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes to Avoid */}
            {selectedExercise.commonMistakes && selectedExercise.commonMistakes.length > 0 && (
              <div className="p-4 rounded-xl bg-[#FF3B30]/5 border border-[#FF3B30]/25 space-y-2.5">
                <div className="flex items-center gap-2 text-[#FF3B30] text-xs font-bold font-display uppercase tracking-wider">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>Erros Comuns a Evitar (Risco Biomecânico):</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {selectedExercise.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#B8B8B8]">
                      <span className="text-[#FF3B30] font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link href="/treino" className="flex-1">
                <Button variant="primary" size="md" className="w-full gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  Treinar Agora Este Exercício
                </Button>
              </Link>
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => setSelectedExercise(null)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
