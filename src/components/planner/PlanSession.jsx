import React from 'react';
import { Clock, Zap, BookOpen } from 'lucide-react';

export const PlanSession = ({ session, index }) => {
  return (
    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border flex items-start gap-3">
      <div className="w-6 h-6 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
          <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
            {session.title}
          </h5>

          <div className="flex items-center gap-2">
            {session.technique && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {session.technique}
              </span>
            )}
            <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-dark-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {session.duration}m
            </span>
          </div>
        </div>

        {session.notes && (
          <p className="text-xs text-slate-500 dark:text-dark-muted leading-relaxed mt-1">
            {session.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlanSession;
