'use client';

import React from 'react';
import { StudentListItem } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Button } from '@/components/ui/Button';
import { Dumbbell, Calendar, TrendingUp, Send, CheckCircle2, Flame, Award } from 'lucide-react';

interface StudentDetailModalProps {
  student: StudentListItem;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentDetailModal({
  student,
  isOpen,
  onClose,
}: StudentDetailModalProps) {
  const [selectedSplit, setSelectedSplit] = React.useState('A');
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSavePrescription = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Acompanhamento do Aluno"
      subtitle={`Gestão e prescrição de rotina para ${student.name}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Student Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#121212] border border-[#292929]">
          <UserAvatar
            name={student.name}
            role={student.email}
            size="lg"
          />

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#181818] border border-[#292929] text-center">
              <span className="text-[10px] uppercase font-bold text-[#777777] block">Frequência</span>
              <span className="text-sm font-black font-display text-white">{student.weeklyFrequency}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#181818] border border-[#292929] text-center">
              <span className="text-[10px] uppercase font-bold text-[#777777] block">Evolução</span>
              <span className="text-sm font-black font-display text-[#FF6500]">{student.evolutionScore}%</span>
            </div>
          </div>
        </div>

        {/* Current Objective & Status */}
        <div className="p-4 rounded-xl bg-[#181818] border border-[#292929] space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#777777] block">Objetivo Principal</span>
          <p className="text-sm font-bold text-white">{student.goal}</p>
          <div className="flex items-center gap-2 pt-1 text-xs text-[#777777]">
            <Calendar className="h-3.5 w-3.5 text-[#FF6500]" />
            <span>Última sessão executada: {student.lastActive}</span>
          </div>
        </div>

        {/* Prescribe / Adjust Workout Routine */}
        <div className="space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#F5F5F5] block">
            Prescrição de Periodização
          </span>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'A', name: 'Treino A (Push)', desc: 'Peito / Ombro / Tríceps' },
              { id: 'B', name: 'Treino B (Pull)', desc: 'Costas / Bíceps' },
              { id: 'C', name: 'Treino C (Legs)', desc: 'Quadríceps / Posterior' },
            ].map((split) => (
              <button
                key={split.id}
                onClick={() => setSelectedSplit(split.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSplit === split.id
                    ? 'bg-[#181818] border-[#FF6500] shadow-orange-glow-sm'
                    : 'bg-[#121212] border-[#292929] hover:border-[#3D3D3D]'
                }`}
              >
                <span className="font-display font-black text-xs uppercase text-white block">
                  {split.name}
                </span>
                <span className="text-[10px] text-[#777777] block mt-0.5">{split.desc}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] space-y-3">
            <span className="text-[11px] font-bold text-[#B8B8B8] block uppercase">
              Observações & Recomendações do Treinador:
            </span>
            <textarea
              rows={3}
              defaultValue="Foco na cadência de 3 segundos na descida no supino e aumento de 2kg por série mantendo RPE entre 8 e 9."
              className="w-full rounded-xl bg-[#181818] border border-[#292929] p-3 text-xs text-[#F5F5F5] focus:border-[#FF6500] focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSavePrescription}
            leftIcon={isSaved ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          >
            {isSaved ? 'Treino Prescrito com Sucesso!' : 'Salvar & Enviar Treino'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
