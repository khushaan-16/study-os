import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Clock, Target } from 'lucide-react';
import PlanSession from './PlanSession';

export const PlanDay = ({ dayPlan }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-3">
      {/* Day Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
            D{dayPlan.dayNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 dark:text-dark-muted">
                {dayPlan.date}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-dark-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {Math.round((dayPlan.targetMinutes || 180) / 60)} hrs
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Focus: {dayPlan.focus}
            </h4>
          </div>
        </div>

        <button
          type="button"
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Sessions list */}
      {isOpen && (
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-dark-border">
          {dayPlan.sessions?.map((session, idx) => (
            <PlanSession key={idx} session={session} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanDay;
