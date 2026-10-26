import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export const ExamCountdown = ({ targetDate, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-dark-subtle text-slate-500 dark:text-dark-muted">
        Exam Completed
      </span>
    );
  }

  const isUrgent = timeLeft.days < 3;
  const isSoon = timeLeft.days < 7;

  const colorScheme = isUrgent
    ? 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    : isSoon
    ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    : 'text-brand-500 bg-brand-500/10 border-brand-500/20';

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${colorScheme}`}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>{timeLeft.days}d {timeLeft.hours}h left</span>
      </span>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center select-none">
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
        <span className="block text-xl font-mono font-bold text-slate-900 dark:text-white">
          {timeLeft.days}
        </span>
        <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-dark-muted">
          Days
        </span>
      </div>
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
        <span className="block text-xl font-mono font-bold text-slate-900 dark:text-white">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-dark-muted">
          Hours
        </span>
      </div>
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
        <span className="block text-xl font-mono font-bold text-slate-900 dark:text-white">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-dark-muted">
          Mins
        </span>
      </div>
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
        <span className="block text-xl font-mono font-bold text-slate-900 dark:text-white">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-dark-muted">
          Secs
        </span>
      </div>
    </div>
  );
};

export default ExamCountdown;
