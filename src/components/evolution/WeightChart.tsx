'use client';

import React from 'react';
import { EvolutionDataPoint } from '@/types';
import { Card } from '@/components/ui/Card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface WeightChartProps {
  data: EvolutionDataPoint[];
}

export function WeightChart({ data }: WeightChartProps) {
  const [period, setPeriod] = React.useState<'7d' | '30d' | '3m' | '6m' | '1a'>('3m');

  const chartData = data.map((d) => ({
    date: d.date,
    peso: d.weightKg,
    braco: d.armCm,
    cintura: d.waistCm,
  }));

  const periods = [
    { id: '7d', label: '7 Dias' },
    { id: '30d', label: '30 Dias' },
    { id: '3m', label: '3 Meses' },
    { id: '6m', label: '6 Meses' },
    { id: '1a', label: '1 Ano' },
  ];

  return (
    <Card className="p-6 bg-[#181818] border-[#292929] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
            Composição & Biometria
          </span>
          <h3 className="font-display font-black text-xl text-[#F5F5F5] uppercase tracking-tight">
            Evolução de Peso Corporal (kg)
          </h3>
        </div>

        {/* Period Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#292929] rounded-xl">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all ${
                period === p.id
                  ? 'bg-[#181818] text-[#FF6500] border border-[#292929] shadow-sm'
                  : 'text-[#777777] hover:text-[#F5F5F5]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6500" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FF6500" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222222" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#777777"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#777777"
              fontSize={11}
              domain={['dataMin - 2', 'dataMax + 2']}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#121212',
                borderColor: '#292929',
                borderRadius: '12px',
                color: '#F5F5F5',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
              formatter={(val: any) => [`${val} kg`, 'Peso']}
            />
            <Area
              type="monotone"
              dataKey="peso"
              stroke="#FF6500"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#weightGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#292929] text-center">
        <div className="p-2.5 rounded-xl bg-[#121212] border border-[#292929]">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Peso Inicial</span>
          <p className="text-sm sm:text-base font-black font-display text-white">79.5 kg</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#121212] border border-[#292929]">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Peso Atual</span>
          <p className="text-sm sm:text-base font-black font-display text-[#FF6500]">82.4 kg</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#121212] border border-[#292929]">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Variação Total</span>
          <p className="text-sm sm:text-base font-black font-display text-emerald-400">+2.9 kg</p>
        </div>
      </div>
    </Card>
  );
}
