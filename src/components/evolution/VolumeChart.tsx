'use client';

import React from 'react';
import { EvolutionDataPoint } from '@/types';
import { Card } from '@/components/ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface VolumeChartProps {
  data: EvolutionDataPoint[];
}

export function VolumeChart({ data }: VolumeChartProps) {
  const chartData = data.map((d) => ({
    date: d.date,
    volume: d.weeklyVolumeTons,
    bench: d.benchKg,
    squat: d.squatKg,
    deadlift: d.deadliftKg,
  }));

  return (
    <Card className="p-6 bg-[#181818] border-[#292929] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
            Carga de Treinamento
          </span>
          <h3 className="font-display font-black text-xl text-[#F5F5F5] uppercase tracking-tight">
            Volume Semanal Acumulado (Toneladas)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 bg-emerald-950/40 border border-emerald-800/40 rounded-lg">
            +34% de Sobrecarga Progressiva
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              domain={[0, 'dataMax + 5']}
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
              formatter={(val: any) => [`${val} Toneladas`, 'Volume Semanal']}
            />
            <Bar dataKey="volume" fill="#FF6500" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#292929] text-center">
        <div className="p-2.5 rounded-xl bg-[#121212] border border-[#292929]">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Supino PR</span>
          <p className="text-sm sm:text-base font-black font-display text-white">85 kg</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#121212] border border-[#292929]">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Agachamento PR</span>
          <p className="text-sm sm:text-base font-black font-display text-white">100 kg</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#121212] border border-[#292929]">
          <span className="text-[10px] uppercase font-bold text-[#777777]">Terra PR</span>
          <p className="text-sm sm:text-base font-black font-display text-[#FF6500]">140 kg</p>
        </div>
      </div>
    </Card>
  );
}
