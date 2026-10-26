import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSubjects } from '../../hooks/useSubjects';

export const SubjectDistribution = () => {
  const { subjects } = useSubjects();

  const data = subjects.map((sub) => ({
    name: sub.code || sub.name,
    fullName: sub.name,
    value: sub.totalStudyHours || 0,
    color: sub.color || '#6366f1',
  }));

  const totalHours = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = totalHours > 0 ? ((item.value / totalHours) * 100).toFixed(1) : 0;
      return (
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs text-white">
          <p className="font-semibold">{item.fullName}</p>
          <p className="text-brand-400 mt-0.5">
            {item.value} hours ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm">
      <div className="mb-2">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Course Distribution
        </h3>
        <p className="text-xs text-slate-500 dark:text-dark-muted">
          Study time allocation across subjects
        </p>
      </div>

      <div className="h-64 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalHours}h
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-dark-muted">
            Total Focus
          </span>
        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-dark-border">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-xs truncate">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-700 dark:text-slate-300 truncate">
              {item.name}
            </span>
            <span className="text-slate-400 dark:text-dark-muted ml-auto font-mono">
              {item.value}h
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDistribution;
