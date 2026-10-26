import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'primary',
  customColor,
  size = 'md',
  showLabel = false,
  label,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100))) || 0;

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    primary: 'bg-brand-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-dark-muted mb-1.5 font-medium">
          <span>{label || 'Progress'}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div
        className={`w-full bg-slate-200 dark:bg-dark-subtle rounded-full overflow-hidden ${
          heights[size] || heights.md
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            customColor ? '' : colors[color] || colors.primary
          }`}
          style={{
            width: `${percentage}%`,
            backgroundColor: customColor || undefined,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
