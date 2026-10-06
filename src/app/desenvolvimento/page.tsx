'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  TrendingUp,
  Dumbbell,
  Zap,
  Target,
  Award,
  Flame,
  Scale,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Lock,
  Plus,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { Navbar } from '@/components/layout/Navbar';
import { appStorage } from '@/lib/storage';

export default function DesenvolvimentoPage() {
  const [profile] = React.useState(appStorage.getProfile());
  const [metrics] = React.useState(appStorage.getBodyMetrics());
  const [runs] = React.useState(appStorage.getRunningLogs());
  const [routines] = React.useState(appStorage.getRoutines());

  const [activeTab, setActiveTab] = React.useState<'geral' | 'forca' | 'corrida' | 'corpo'>('geral');
  const [selectedLift, setSelectedLift] = React.useState<'supino' | 'agachamento' | 'terra' | 'militar'>('supino');

  // Lift progression mock data
  const liftHistories = {
    supino: [
      { date: 'Jun', weight: 85, estimated1RM: 95 },
      { date: 'Jul', weight: 90, estimated1RM: 100 },
      { date: 'Ago', weight: 95, estimated1RM: 102.5 },
      { date: 'Set', weight: 100, estimated1RM: 105 },
    ],
    agachamento: [
      { date: 'Jun', weight: 110, estimated1RM: 125 },
      { date: 'Jul', weight: 120, estimated1RM: 132 },
      { date: 'Ago', weight: 125, estimated1RM: 136 },
      { date: 'Set', weight: 130, estimated1RM: 140 },
    ],
    terra: [
      { date: 'Jun', weight: 130, estimated1RM: 145 },
      { date: 'Jul', weight: 140, estimated1RM: 155 },
      { date: 'Ago', weight: 150, estimated1RM: 160 },
      { date: 'Set', weight: 155, estimated1RM: 165 },
    ],
    militar: [
      { date: 'Jun', weight: 50, estimated1RM: 58 },
      { date: 'Jul', weight: 55, estimated1RM: 62 },
      { date: 'Ago', weight: 60, estimated1RM: 66 },
      { date: 'Set', weight: 62.5, estimated1RM: 70 },
    ],
  };

  // Running progression data
  const paceHistory = [
    { date: 'Jun', paceDecimal: 5.45, paceLabel: "5'27\"", dist: 15 },
    { date: 'Jul', paceDecimal: 5.25, paceLabel: "5'15\"", dist: 20 },
    { date: 'Ago', paceDecimal: 5.05, paceLabel: "5'03\"", dist: 28 },
    { date: 'Set', paceDecimal: 4.83, paceLabel: "4'50\"", dist: 35 },
  ];

  // Bodyweight progression
  const bodyHistory = metrics.map((m) => ({
    date: m.date.slice(5),
    weight: m.weight_kg,
    bf: m.body_fat_percent || 14.5,
  }));

  // Goals
  const goals = [
    {
      name: 'Supino Reto 1RM',
      current: 105,
      target: 120,
      unit: 'kg',
      category: 'Força',
      percent: Math.round((105 / 120) * 100),
      color: 'bg-primary-500',
    },
    {
      name: 'Peso Alvo / Secagem',
      current: 79.8,
      target: 78.0,
      initial: 84.5,
      unit: 'kg',
      category: 'Composição',
      percent: Math.round(((84.5 - 79.8) / (84.5 - 78.0)) * 100),
      color: 'bg-emerald-500',
    },
    {
      name: 'Pace 5km',
      current: "4'50\"",
      target: "4'30\"",
      unit: '/km',
      category: 'Cardio',
      percent: 85,
      color: 'bg-accent-cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-gray-100 pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header / Athlete Profile Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-amber-500 text-white shadow-lg shadow-primary-500/20">
                <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-400">
                    <Sparkles className="h-3 w-3" />
                    Atleta Híbrido • Nível {profile.experience_level}
                  </span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Meu <span className="text-primary-500">Desenvolvimento</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Central consolidada de progressão de cargas, recordes (PRs) e evolução física.
                </p>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-surface-subtle/80 border border-surface-border p-3 text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total PRs</span>
                <div className="text-lg sm:text-xl font-extrabold text-primary-400">8 marcas</div>
                <span className="text-[10px] text-emerald-400 font-semibold">+2 esse mês</span>
              </div>
              <div className="rounded-2xl bg-surface-subtle/80 border border-surface-border p-3 text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400">Aderência</span>
                <div className="text-lg sm:text-xl font-extrabold text-amber-400">94.8%</div>
                <span className="text-[10px] text-gray-400">Consistência</span>
              </div>
              <div className="rounded-2xl bg-surface-subtle/80 border border-surface-border p-3 text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400">Sessões</span>
                <div className="text-lg sm:text-xl font-extrabold text-white">{profile.total_workouts_completed}</div>
                <span className="text-[10px] text-primary-400">Concluídas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-surface-border pb-3">
          {[
            { id: 'geral', label: 'Visão Geral & Metas', icon: Target },
            { id: 'forca', label: 'Progressão de Força (1RM)', icon: Dumbbell },
            { id: 'corrida', label: 'Evolução na Corrida', icon: Zap },
            { id: 'corpo', label: 'Composição & Medidas', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-surface-card text-gray-400 hover:text-white border border-surface-border'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: VISÃO GERAL & METAS */}
        {activeTab === 'geral' && (
          <div className="space-y-6">
            {/* Metas Ativas */}
            <div className="card-athletic p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary-500" />
                    Metas Ativas em Progresso
                  </h3>
                  <p className="text-xs text-gray-400">Acompanhamento percentual dos seus objetivos principais.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {goals.map((g) => (
                  <div key={g.name} className="rounded-2xl bg-surface-elevated/80 border border-surface-border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-300">{g.name}</span>
                      <span className="text-xs font-mono font-bold text-primary-400">{g.percent}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
                      <div className={`h-full ${g.color} transition-all duration-500`} style={{ width: `${g.percent}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                      <span>Atual: <strong className="text-white">{g.current}{g.unit}</strong></span>
                      <span>Alvo: <strong className="text-primary-400">{g.target}{g.unit}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo dos Pilares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-athletic p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-primary-400">Pilar de Força</span>
                  <Dumbbell className="h-5 w-5 text-primary-500" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-display font-extrabold text-white">410 kg</div>
                  <p className="text-xs text-gray-400">Total somado dos 3 Grandes (Supino + Agachamento + Terra).</p>
                </div>
                <div className="pt-2 border-t border-surface-border flex justify-between text-xs text-gray-300">
                  <span>Supino: <strong>105kg</strong></span>
                  <span>Agachamento: <strong>140kg</strong></span>
                  <span>Terra: <strong>165kg</strong></span>
                </div>
              </div>

              <div className="card-athletic p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-accent-cyan">Pilar Aeróbio</span>
                  <Zap className="h-5 w-5 text-accent-cyan" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-display font-extrabold text-white">24:12</div>
                  <p className="text-xs text-gray-400">Recorde pessoal nos 5km (Pace médio de 4'50"/km).</p>
                </div>
                <div className="pt-2 border-t border-surface-border flex justify-between text-xs text-gray-300">
                  <span>Volume semanal: <strong>23.7 km</strong></span>
                  <span>Esteira/Rua: <strong>Híbrido</strong></span>
                </div>
              </div>

              <div className="card-athletic p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-400">Composição Física</span>
                  <Scale className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-display font-extrabold text-emerald-400">-4.7 kg</div>
                  <p className="text-xs text-gray-400">Redução de gordura preservando 100% da força nos compostos.</p>
                </div>
                <div className="pt-2 border-t border-surface-border flex justify-between text-xs text-gray-300">
                  <span>Peso atual: <strong>79.8kg</strong></span>
                  <span>BF estimado: <strong>14.4%</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROGRESSÃO DE FORÇA */}
        {activeTab === 'forca' && (
          <div className="space-y-6">
            <div className="card-athletic p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary-500" />
                    Curva de Sobrecarga Progressiva & 1RM
                  </h3>
                  <p className="text-xs text-gray-400">Evolução calculada pela fórmula de Brzycki e cargas máximas.</p>
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-surface-elevated p-1 border border-surface-border overflow-x-auto no-scrollbar">
                  {[
                    { id: 'supino', label: 'Supino Reto' },
                    { id: 'agachamento', label: 'Agachamento' },
                    { id: 'terra', label: 'Lev. Terra' },
                    { id: 'militar', label: 'Desenv. Militar' },
                  ].map((lift) => (
                    <button
                      key={lift.id}
                      onClick={() => setSelectedLift(lift.id as any)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                        selectedLift === lift.id
                          ? 'bg-primary-500 text-white font-bold shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lift.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liftHistories[selectedLift]}>
                    <defs>
                      <linearGradient id="liftGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                    <XAxis dataKey="date" stroke="#8b949e" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#8b949e" domain={['auto', 'auto']} unit="kg" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#161b22',
                        borderColor: '#30363d',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="estimated1RM"
                      name="1RM Estimado"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#liftGrad)"
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      name="Carga de Treino"
                      stroke="#fbbf24"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#fbbf24' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl bg-surface-elevated/60 border border-surface-border p-4 text-xs text-gray-300 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Análise do Treinador:</strong> Seu 1RM no {selectedLift.toUpperCase()} aumentou consistentemente +10kg nos últimos 3 meses graças ao controle de cadência excêntrica de 3s e aumento de frequência para 2x/semana.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORRIDA & CARDIO */}
        {activeTab === 'corrida' && (
          <div className="space-y-6">
            <div className="card-athletic p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent-cyan" />
                  Evolução do Pace & Volume Aeróbio
                </h3>
                <p className="text-xs text-gray-400">Aceleração no ritmo médio por km e quilometragem mensal acumulada.</p>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paceHistory}>
                    <defs>
                      <linearGradient id="paceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00d2ff" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                    <XAxis dataKey="date" stroke="#8b949e" tick={{ fontSize: 12 }} />
                    <YAxis
                      reversed
                      stroke="#8b949e"
                      domain={[4.5, 6.0]}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(val) => `${Math.floor(val)}'${Math.round((val % 1) * 60)}"`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#161b22',
                        borderColor: '#30363d',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                      formatter={(val: any) => [`${val} min/km`, 'Ritmo (Pace)']}
                    />
                    <Area
                      type="monotone"
                      dataKey="paceDecimal"
                      name="Pace Médio"
                      stroke="#00d2ff"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#paceGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPOSIÇÃO & MEDIDAS */}
        {activeTab === 'corpo' && (
          <div className="space-y-6">
            <div className="card-athletic p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Scale className="h-5 w-5 text-emerald-400" />
                  Evolução de Peso & % Gordura (BF)
                </h3>
                <p className="text-xs text-gray-400">Tendência de perda de peso mantendo medidas de hipertrofia.</p>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bodyHistory}>
                    <defs>
                      <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                    <XAxis dataKey="date" stroke="#8b949e" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#8b949e" domain={['auto', 'auto']} unit="kg" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#161b22',
                        borderColor: '#30363d',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      name="Peso Corporal"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#weightGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
