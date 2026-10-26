import React from 'react';
import { format, isToday, isSameMonth } from 'date-fns';

export const CalendarDay = ({
  day,
  currentMonth,
  events = [],
  onSelectDay,
}) => {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isCurrentDay = isToday(day);

  return (
    <div
      onClick={() => onSelectDay(day, events)}
      className={`min-h-[90px] sm:min-h-[110px] p-1.5 sm:p-2 border-b border-r border-slate-200 dark:border-dark-border transition-colors cursor-pointer flex flex-col justify-between ${
        isCurrentMonth
          ? 'bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-dark-subtle/50'
          : 'bg-slate-50/50 dark:bg-dark-surface/40 opacity-40 hover:opacity-60'
      }`}
    >
      {/* Day header */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
            isCurrentDay
              ? 'bg-brand-600 text-white shadow-sm'
              : isCurrentMonth
              ? 'text-slate-800 dark:text-slate-200'
              : 'text-slate-400 dark:text-dark-muted'
          }`}
        >
          {format(day, 'd')}
        </span>

        {events.length > 2 && (
          <span className="text-[10px] font-bold text-slate-400 dark:text-dark-muted">
            +{events.length - 2}
          </span>
        )}
      </div>

      {/* Events list preview */}
      <div className="space-y-1 mt-1 flex-1 overflow-hidden">
        {events.slice(0, 2).map((ev, i) => {
          const isExam = ev.type === 'exam';
          const isTask = ev.type === 'task';

          return (
            <div
              key={i}
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded truncate border ${
                isExam
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-semibold'
                  : isTask
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              }`}
              title={ev.title}
            >
              {isExam ? '📝 ' : isTask ? '✓ ' : '⏱ '}
              {ev.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
