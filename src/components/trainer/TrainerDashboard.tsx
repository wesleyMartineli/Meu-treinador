'use client';

import React from 'react';
import { TRAINER_METRICS, TRAINER_STUDENTS } from '@/services/dataService';
import { Card, MetricCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Activity, Dumbbell, AlertTriangle, Search, Plus, Filter, ArrowUpRight } from 'lucide-react';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { StudentListItem } from '@/types';
import { StudentDetailModal } from './StudentDetailModal';

export function TrainerDashboard() {
  const [students, setStudents] = React.useState<StudentListItem[]>(TRAINER_STUDENTS);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'todos' | 'ativo' | 'atencao'>('todos');
  const [selectedStudent, setSelectedStudent] = React.useState<StudentListItem | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.goal.toLowerCase().includes(search.toLowerCase()) ||
      s.currentWorkoutTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Welcome Banner for Trainer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
            ÁREA DO TREINADOR • GESTÃO & PERFORMANCE
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight mt-1">
            Painel Executivo de Alunos
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-medium mt-0.5">
            Acompanhe o engajamento, frequência de treino e prescreva periodizações estratégicas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
            Novo Aluno
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Total de Alunos"
          value={TRAINER_METRICS.totalStudents}
          subtitle="Cadastrados no estúdio"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Alunos Ativos"
          value={TRAINER_METRICS.activeStudents}
          subtitle="91.1% de taxa de retenção"
          icon={<Activity className="h-4 w-4" />}
          badge="91%"
          badgeTrend="up"
        />
        <MetricCard
          title="Treinos Realizados"
          value={TRAINER_METRICS.workoutsDoneThisMonth}
          subtitle="Neste mês corrente"
          icon={<Dumbbell className="h-4 w-4" />}
          badge="+18%"
          badgeTrend="up"
        />
        <MetricCard
          title="Precisam de Atenção"
          value={TRAINER_METRICS.attentionNeededCount}
          subtitle="Frequência abaixo de 50%"
          icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
          badge="Alerta"
          badgeTrend="down"
          highlight={TRAINER_METRICS.attentionNeededCount > 0}
        />
      </div>

      {/* Student List Section */}
      <Card id="alunos" className="p-6 bg-[#181818] border-[#292929] space-y-6">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292929]">
          <div>
            <h3 className="font-display font-black text-xl text-[#F5F5F5] uppercase tracking-tight">
              Lista de Alunos ({filteredStudents.length})
            </h3>
            <p className="text-xs text-[#777777] font-medium">
              Clique no aluno para visualizar histórico e prescrever treinos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#777777]" />
              <input
                type="text"
                placeholder="Buscar por nome ou meta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl bg-[#121212] border border-[#292929] pl-9 pr-4 py-2 text-xs text-[#F5F5F5] placeholder-[#777777] focus:border-[#FF6500] focus:outline-none w-56"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#292929] rounded-xl">
              {(['todos', 'ativo', 'atencao'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all ${
                    statusFilter === st
                      ? 'bg-[#181818] text-[#FF6500] border border-[#292929] shadow-sm'
                      : 'text-[#777777] hover:text-[#F5F5F5]'
                  }`}
                >
                  {st === 'todos' ? 'Todos' : st === 'ativo' ? 'Ativos' : 'Atenção'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#292929] text-[10px] uppercase font-display font-bold text-[#777777] tracking-wider">
                <th className="pb-3 px-3">Aluno</th>
                <th className="pb-3 px-3">Objetivo</th>
                <th className="pb-3 px-3">Treino Atual</th>
                <th className="pb-3 px-3">Último Acesso</th>
                <th className="pb-3 px-3">Frequência</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020]">
              {filteredStudents.map((std) => (
                <tr
                  key={std.id}
                  onClick={() => setSelectedStudent(std)}
                  className="hover:bg-[#1C1C1C] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3">
                    <UserAvatar name={std.name} role={std.email} size="sm" />
                  </td>
                  <td className="py-3.5 px-3 font-medium text-[#B8B8B8]">
                    {std.goal}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-white font-display">
                    {std.currentWorkoutTitle}
                  </td>
                  <td className="py-3.5 px-3 text-[#777777] font-mono">
                    {std.lastActive}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#F5F5F5]">
                    {std.weeklyFrequency}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        std.status === 'ativo'
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                          : 'bg-amber-950/40 text-amber-400 border-amber-800/40'
                      }`}
                    >
                      {std.status === 'ativo' ? 'Ativo' : 'Atenção'}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="text-xs font-bold text-[#FF6500] group-hover:underline inline-flex items-center gap-1">
                      Gerenciar <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Detail & Prescription Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
