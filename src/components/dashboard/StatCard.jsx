import React from 'react';

export const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  color = 'indigo',
  trend,
  className = '',
}) => {
  const colorMap = {
    indigo: 'bg-brand-500/10 text-brand-500 border-brand-500/20',
    violet: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  };

  const badgeStyle = colorMap[color] || colorMap.indigo;

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs hover:border-slate-300 dark:hover:border-dark-subtle transition-all select-none ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-dark-muted">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${badgeStyle}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {value}
      </div>

      {(subtext || trend) && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-dark-muted mt-1.5">
          {trend && (
            <span className="text-emerald-500 font-semibold">{trend}</span>
          )}
          {subtext && <span>{subtext}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
