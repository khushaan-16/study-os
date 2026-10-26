import React from 'react';
import { Layers } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Layers,
  title = 'No items found',
  description = 'Get started by creating your first record.',
  actionLabel,
  onAction,
  compact = false,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-slate-300 dark:border-dark-border bg-slate-50/50 dark:bg-dark-card/30 ${
        compact ? 'p-6' : 'p-12'
      } ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-dark-subtle flex items-center justify-center text-slate-500 dark:text-dark-muted mb-3.5 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h4>
      <p className="text-sm text-slate-500 dark:text-dark-muted mt-1 max-w-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
