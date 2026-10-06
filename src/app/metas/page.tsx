'use client';

import React from 'react';
import { appStorage } from '@/lib/storage';
import { GoalItem } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { Target, Plus, Trophy, Flame, CheckCircle2, Trash2, Edit3, ArrowRight } from 'lucide-react';

export default function GoalsPage() {
  const [goals, setGoals] = React.useState<GoalItem[]>([]);
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = React.useState(false);
  const [editingGoal, setEditingGoal] = React.useState<GoalItem | null>(null);
  const [newTitle, setNewTitle] = React.useState('');
  const [newTarget, setNewTarget] = React.useState('');
  const [newCurrent, setNewCurrent] = React.useState('0');
  const [newUnit, setNewUnit] = React.useState('treinos');
  const [newType, setNewType] = React.useState<'frequencia' | 'carga' | 'consistencia' | 'personalizada'>('frequencia');

  // Load goals from storage
  React.useEffect(() => {
    setGoals(appStorage.getGoals());

    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key?: string }>;
      if (!customEvent.detail || customEvent.detail.key === 'meutreinador_goals_v2') {
        setGoals(appStorage.getGoals());
      }
    };

    window.addEventListener('meutreinador_storage_change', handleStorageChange);
    return () => window.removeEventListener('meutreinador_storage_change', handleStorageChange);
  }, []);

  const handleCreateGoal = () => {
    if (!newTitle.trim() || !newTarget) return;
    const newGoal: GoalItem = {
      id: `g-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      currentValue: Number(newCurrent) || 0,
      targetValue: Number(newTarget) || 10,
      unit: newUnit,
    };
    appStorage.addGoal(newGoal);
    setGoals(appStorage.getGoals());
    setNewTitle('');
    setNewTarget('');
    setNewCurrent('0');
    setIsNewGoalModalOpen(false);
  };

  const handleSaveEditGoal = () => {
    if (!editingGoal) return;
    appStorage.updateGoal(editingGoal.id, {
      title: editingGoal.title,
      currentValue: Number(editingGoal.currentValue) || 0,
      targetValue: Number(editingGoal.targetValue) || 1,
      unit: editingGoal.unit,
      type: editingGoal.type,
    });
    setGoals(appStorage.getGoals());
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    appStorage.deleteGoal(id);
    setGoals(appStorage.getGoals());
  };

  const handleQuickIncrement = (goal: GoalItem, inc: number) => {
    const updatedVal = Math.max(0, goal.currentValue + inc);
    appStorage.updateGoal(goal.id, { currentValue: updatedVal });
    setGoals(appStorage.getGoals());
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
            PLANEJAMENTO & FOCO
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-1">
            Sistema de Metas
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-medium mt-0.5">
            Metas configuradas a partir do seu onboarding ou personalizadas por você.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setNewTitle('');
            setNewTarget('');
            setNewCurrent('0');
            setNewUnit('treinos');
            setIsNewGoalModalOpen(true);
          }}
          leftIcon={<Plus className="h-4 w-4 stroke-[3]" />}
          className="shadow-orange-glow"
        >
          Nova Meta
        </Button>
      </div>

      {/* Main Goals Grid */}
      {goals.length === 0 ? (
        <Card className="p-12 bg-[#141414] border-[#262626] text-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1c1c1c] border border-[#2d2d2d] text-[#777777] mx-auto">
            <Target className="h-7 w-7 text-[#FF6500]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
              Nenhuma meta cadastrada
            </h3>
            <p className="text-xs text-[#777777] mt-1 max-w-md mx-auto">
              Defina suas metas de frequência semanal, progressão de carga ou composição corporal para acompanhar seus resultados.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsNewGoalModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4 stroke-[3]" />}
            className="shadow-orange-glow"
          >
            Criar Minha Primeira Meta
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = Math.min(
              100,
              Math.max(0, Math.round((goal.currentValue / (goal.targetValue || 1)) * 100))
            );

            return (
              <Card
                key={goal.id}
                className="p-6 bg-[#181818] border-[#292929] hover:border-[#FF6500]/30 transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6500] px-2.5 py-1 bg-[#FF6500]/10 rounded border border-[#FF6500]/20 font-mono">
                      {goal.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingGoal(goal)}
                        title="Editar Meta"
                        className="p-1.5 rounded-lg text-[#666666] hover:text-[#FF6500] hover:bg-[#222222] transition-colors"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGoal(goal.id)}
                        title="Excluir Meta"
                        className="p-1.5 rounded-lg text-[#666666] hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F5F5] uppercase tracking-tight">
                      {goal.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#777777]">Progresso</span>
                    <span className="font-bold text-[#F5F5F5]">
                      {goal.currentValue} / {goal.targetValue} {goal.unit} ({progress}%)
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.currentValue}
                    max={goal.targetValue}
                    showPercentage={false}
                    size="md"
                  />
                  {/* Quick Increment Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-[#666666] uppercase font-mono">Ajuste Rápido:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickIncrement(goal, -1)}
                        className="px-2 py-0.5 rounded bg-[#141414] hover:bg-[#222222] border border-[#2b2b2b] text-xs font-bold text-[#888888] hover:text-white"
                      >
                        -1
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickIncrement(goal, 1)}
                        className="px-2 py-0.5 rounded bg-[#FF6500]/15 hover:bg-[#FF6500]/25 border border-[#FF6500]/30 text-xs font-bold text-[#FF6500]"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#292929] flex items-center justify-between text-[11px] text-[#777777]">
                  <span>Status: {progress >= 100 ? 'Concluída' : 'Em andamento'}</span>
                  {progress >= 100 ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Concluída
                    </span>
                  ) : (
                    <span className="text-[#FF6500] font-bold">
                      Faltam {Math.max(0, goal.targetValue - goal.currentValue)} {goal.unit}
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal: Nova Meta Personalizada */}
      <Modal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        title="Definir Nova Meta"
        subtitle="Adicione um objetivo personalizado para rastrear no seu painel."
        maxWidth="md"
      >
        <div className="space-y-4">
          <Input
            label="Título da Meta"
            placeholder="Ex: Carga no Supino Reto ou Treinos na Semana"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Tipo de Meta"
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
              options={[
                { label: 'Frequência Semanal', value: 'frequencia' },
                { label: 'Carga / Força', value: 'carga' },
                { label: 'Consistência / Dias', value: 'consistencia' },
                { label: 'Personalizada', value: 'personalizada' },
              ]}
            />

            <Select
              label="Unidade"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              options={[
                { label: 'treinos (Frequência)', value: 'treinos' },
                { label: 'kg (Carga / Peso)', value: 'kg' },
                { label: 'dias (Consistência)', value: 'dias' },
                { label: 'km (Distância)', value: 'km' },
                { label: 'cm (Medidas)', value: 'cm' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Valor Atual"
              type="number"
              placeholder="0"
              value={newCurrent}
              onChange={(e) => setNewCurrent(e.target.value)}
            />

            <Input
              label="Valor Alvo (Meta)"
              type="number"
              placeholder="Ex: 5"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsNewGoalModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateGoal} className="shadow-orange-glow">
              Criar Meta
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Editar Meta */}
      {editingGoal && (
        <Modal
          isOpen={true}
          onClose={() => setEditingGoal(null)}
          title="Editar Meta"
          subtitle="Atualize o progresso ou o valor alvo do objetivo."
          maxWidth="md"
        >
          <div className="space-y-4">
            <Input
              label="Título da Meta"
              value={editingGoal.title}
              onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Valor Atual"
                type="number"
                value={editingGoal.currentValue}
                onChange={(e) => setEditingGoal({ ...editingGoal, currentValue: Number(e.target.value) || 0 })}
              />

              <Input
                label="Valor Alvo"
                type="number"
                value={editingGoal.targetValue}
                onChange={(e) => setEditingGoal({ ...editingGoal, targetValue: Number(e.target.value) || 0 })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Unidade"
                value={editingGoal.unit}
                onChange={(e) => setEditingGoal({ ...editingGoal, unit: e.target.value })}
              />

              <Select
                label="Tipo"
                value={editingGoal.type}
                onChange={(e) => setEditingGoal({ ...editingGoal, type: e.target.value as any })}
                options={[
                  { label: 'Frequência', value: 'frequencia' },
                  { label: 'Carga', value: 'carga' },
                  { label: 'Consistência', value: 'consistencia' },
                  { label: 'Personalizada', value: 'personalizada' },
                ]}
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setEditingGoal(null)}>
                Cancelar
              </Button>
              <Button variant="primary" size="md" onClick={handleSaveEditGoal} className="shadow-orange-glow">
                Salvar Alterações
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
