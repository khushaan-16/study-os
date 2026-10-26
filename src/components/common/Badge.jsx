import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const variants = {
    neutral:
      'bg-slate-100 dark:bg-dark-subtle text-slate-700 dark:text-slate-300 border-slate-200 dark:border-dark-border',
    primary:
      'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
    success:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    info:
      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    purple:
      'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  };

  const dotColors = {
    neutral: 'bg-slate-400',
    primary: 'bg-brand-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-cyan-500',
    purple: 'bg-purple-500',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${
        variants[variant] || variants.neutral
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || dotColors.neutral
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
