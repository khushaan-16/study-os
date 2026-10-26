import React from 'react';
import ProgressBar from '../common/ProgressBar';

export const ExamProgress = ({
  prepProgress = 0,
  targetGrade = 'A',
  weight = '30%',
  onUpdateProgress,
  interactive = false,
}) => {
  const getReadinessColor = (val) => {
    if (val >= 75) return 'success';
    if (val >= 40) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <span>Readiness Score</span>
          <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-500">
            Target: {targetGrade}
          </span>
        </div>
        <span>{prepProgress}%</span>
      </div>

      <ProgressBar
        value={prepProgress}
        color={getReadinessColor(prepProgress)}
        size="md"
      />

      {interactive && onUpdateProgress && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400 dark:text-dark-muted">
            Weight: {weight}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateProgress(Math.max(0, prepProgress - 5))}
              className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            >
              -5%
            </button>
            <button
              type="button"
              onClick={() => onUpdateProgress(Math.min(100, prepProgress + 5))}
              className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            >
              +5%
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamProgress;
