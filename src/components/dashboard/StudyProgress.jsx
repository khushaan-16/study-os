import React from 'react';
import { Flame, Clock, Award, Target } from 'lucide-react';
import { isSameDay } from 'date-fns';
import ProgressBar from '../common/ProgressBar';
import { useStudySessions } from '../../hooks/useStudySessions';

export const StudyProgress = () => {
  const { sessions } = useStudySessions();

  // Calculate today's minutes
  const today = new Date();
  const todaySessions = sessions.filter((s) =>
    s.date ? isSameDay(new Date(s.date), today) : false
  );
  const todayMinutes = todaySessions.reduce(
    (sum, s) => sum + (s.durationMinutes || 0),
    0
  );
  const targetMinutes = 180; // 3 hours
  const progressPercent = Math.min(100, Math.round((todayMinutes / targetMinutes) * 100));

  const totalHoursAllTime = (
    sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0) / 60
  ).toFixed(1);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-brand-500">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Daily Study Velocity
          </h3>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-500" />
          <span>5 Day Streak</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <span>Today's Target Progress</span>
          <span>
            {(todayMinutes / 60).toFixed(1)} / {(targetMinutes / 60).toFixed(1)} hrs ({progressPercent}%)
          </span>
        </div>
        <ProgressBar value={progressPercent} color="primary" size="md" />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-dark-muted block">
            Today Sessions
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
            {todaySessions.length} Focus Blocks
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-dark-muted block">
            All-Time Focus
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
            {totalHoursAllTime} Hours
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyProgress;
