import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { subDays, format, isSameDay } from 'date-fns';
import { useStudySessions } from '../../hooks/useStudySessions';

export const WeeklyProgressChart = () => {
  const { sessions } = useStudySessions();

  const targetDailyHours = 3.0;

  const data = Array.from({ length: 7 })
    .map((_, i) => {
      const date = subDays(new Date(), 6 - i);
      const daySessions = sessions.filter((s) =>
        s.date ? isSameDay(new Date(s.date), date) : false
      );
      const totalMinutes = daySessions.reduce(
        (sum, s) => sum + (s.durationMinutes || 0),
        0
      );
      const actualHours = Number((totalMinutes / 60).toFixed(1));

      return {
        day: format(date, 'EEE'),
        fullDate: format(date, 'MMM d'),
        actual: actualHours,
        target: targetDailyHours,
      };
    });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs text-white">
          <p className="font-semibold">{item.fullDate}</p>
          <p className="text-brand-400 mt-0.5">Actual: {item.actual}h</p>
          <p className="text-slate-400">Target: {item.target}h</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Target vs Actual Study
          </h3>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Daily goal adherence (Target: {targetDailyHours}h/day)
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              unit="h"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconType="circle"
            />
            <Bar
              name="Actual Focus"
              dataKey="actual"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
            <Bar
              name="Target Goal"
              dataKey="target"
              fill="rgba(148, 163, 184, 0.3)"
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;
