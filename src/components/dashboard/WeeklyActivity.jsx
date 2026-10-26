import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { subDays, format, isSameDay } from 'date-fns';
import { useStudySessions } from '../../hooks/useStudySessions';

export const WeeklyActivity = () => {
  const { sessions } = useStudySessions();

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
      const hours = Number((totalMinutes / 60).toFixed(1));

      return {
        day: format(date, 'EEE'),
        fullDate: format(date, 'MMM d'),
        hours,
        minutes: totalMinutes,
      };
    });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow text-[11px] text-white">
          <span className="font-semibold">{item.fullDate}: </span>
          <span className="text-brand-400 font-bold">{item.hours}h</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            7-Day Activity
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-dark-muted">
            Focus hours distribution
          </p>
        </div>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              unit="h"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="hours"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyActivity;
