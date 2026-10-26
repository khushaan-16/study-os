import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import Button from '../common/Button';

export const TimerControls = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={onReset}
        className="p-3 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-card transition-colors"
        title="Reset Timer"
      >
        <RotateCcw className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={isRunning ? onPause : onStart}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
          isRunning
            ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
            : 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/30'
        }`}
        title={isRunning ? 'Pause' : 'Start Focus'}
      >
        {isRunning ? (
          <Pause className="w-7 h-7 fill-white" />
        ) : (
          <Play className="w-7 h-7 fill-white ml-0.5" />
        )}
      </button>

      <button
        type="button"
        onClick={onSkip}
        className="p-3 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-card transition-colors"
        title="Skip to next session"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TimerControls;
