import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import { useStudySessions } from '../../hooks/useStudySessions';

export const StudyTimeChart = () => {
  const { sessions } = useStudySessions();

  // Generate data for the past 7 days
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
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs text-white">
          <p className="font-semibold">{item.fullDate}</p>
          <p className="text-brand-400 mt-0.5">
            {item.hours} hours ({item.minutes} mins)
          </p>
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
            Daily Study Time
          </h3>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Focus hours logged over the last 7 days
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="studyHoursGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#studyHoursGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudyTimeChart;
