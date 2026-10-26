import React from 'react';

export const TaskPriorityBadge = ({ priority = 'medium', className = '' }) => {
  const configs = {
    urgent: {
      label: 'Urgent',
      styles: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      dot: 'bg-rose-500',
    },
    high: {
      label: 'High',
      styles: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      dot: 'bg-amber-500',
    },
    medium: {
      label: 'Medium',
      styles: 'bg-indigo-500/10 text-brand-500 dark:text-brand-400 border-indigo-500/20',
      dot: 'bg-brand-500',
    },
    low: {
      label: 'Low',
      styles: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20',
      dot: 'bg-slate-400',
    },
  };

  const config = configs[priority?.toLowerCase()] || configs.medium;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${config.styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export default TaskPriorityBadge;
