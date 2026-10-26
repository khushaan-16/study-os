import React from 'react';
import { subDays, format, isSameDay } from 'date-fns';
import { useStudySessions } from '../../hooks/useStudySessions';

export const ProductivityHeatmap = () => {
  const { sessions } = useStudySessions();

  // Generate 28 days (4 weeks) of activity cells
  const days = Array.from({ length: 28 }).map((_, i) => {
    const date = subDays(new Date(), 27 - i);
    const daySessions = sessions.filter((s) =>
      s.date ? isSameDay(new Date(s.date), date) : false
    );
    const totalMinutes = daySessions.reduce(
      (sum, s) => sum + (s.durationMinutes || 0),
      0
    );

    let level = 0;
    if (totalMinutes > 120) level = 4;
    else if (totalMinutes >= 60) level = 3;
    else if (totalMinutes >= 30) level = 2;
    else if (totalMinutes > 0) level = 1;

    return {
      date,
      formattedDate: format(date, 'MMM d, yyyy'),
      minutes: totalMinutes,
      level,
    };
  });

  const levelColors = [
    'bg-slate-100 dark:bg-dark-subtle border-slate-200 dark:border-dark-border',
    'bg-brand-500/30 border-brand-500/40',
    'bg-brand-500/60 border-brand-500/70',
    'bg-brand-500 border-brand-400',
    'bg-indigo-400 border-indigo-300',
  ];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Study Consistency Heatmap
          </h3>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Daily focus session density across the last 4 weeks
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`h-7 rounded-lg border transition-all flex items-center justify-center group relative cursor-pointer ${
                levelColors[day.level]
              }`}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                <div className="bg-slate-900 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  <span>{day.formattedDate}</span>
                  <span className="text-brand-400 block">
                    {day.minutes > 0 ? `${day.minutes} mins studied` : 'No study logged'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-[10px] text-slate-400 dark:text-dark-muted mt-2">
          <span>Less</span>
          {levelColors.map((cls, i) => (
            <span key={i} className={`w-3 h-3 rounded ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityHeatmap;
