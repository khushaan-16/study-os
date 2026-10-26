import React, { useState } from 'react';
import { Settings2, BookOpen, CheckCircle2 } from 'lucide-react';
import TimerControls from './TimerControls';
import TimerSettings from './TimerSettings';
import { useStudySessions } from '../../hooks/useStudySessions';
import { useSubjects } from '../../hooks/useSubjects';
import { useTasks } from '../../hooks/useTasks';

export const PomodoroTimer = () => {
  const {
    timerMode,
    timeLeft,
    isRunning,
    timerSettings,
    activeSubject,
    setActiveSubject,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    updateSettings,
  } = useStudySessions();

  const { subjects } = useSubjects();
  const { tasks } = useTasks();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const totalSeconds =
    (timerMode === 'focus'
      ? timerSettings.focusDuration
      : timerMode === 'shortBreak'
      ? timerSettings.shortBreakDuration
      : timerSettings.longBreakDuration) * 60;

  const progress = Math.max(0, Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // SVG circular progress calculation
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const incompleteTasks = tasks.filter((t) => !t.completed);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm max-w-xl mx-auto w-full relative">
      {/* Top Bar / Settings button */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
          title="Configure Timer Intervals"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-dark-subtle border border-slate-200 dark:border-dark-border mb-8">
        <button
          onClick={() => switchMode('focus')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            timerMode === 'focus'
              ? 'bg-white dark:bg-dark-card text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Focus Session
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            timerMode === 'shortBreak'
              ? 'bg-white dark:bg-dark-card text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            timerMode === 'longBreak'
              ? 'bg-white dark:bg-dark-card text-cyan-600 dark:text-cyan-400 shadow-sm'
              : 'text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Circular Progress & Clock Display */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
          {/* Background circle track */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            className="stroke-slate-100 dark:stroke-dark-subtle/60"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Active progress ring */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            className={`transition-all duration-500 ease-linear ${
              timerMode === 'focus'
                ? 'stroke-brand-500'
                : timerMode === 'shortBreak'
                ? 'stroke-emerald-500'
                : 'stroke-cyan-500'
            }`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Time Text in Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl sm:text-6xl font-mono font-extrabold tracking-tight text-slate-900 dark:text-white">
            {formattedMinutes}:{formattedSeconds}
          </span>
          <span className="text-xs uppercase font-medium tracking-widest text-slate-400 dark:text-dark-muted mt-2">
            {timerMode === 'focus' ? 'Deep Work' : 'Break Time'}
          </span>
        </div>
      </div>

      {/* Target Subject & Task linkage */}
      <div className="w-full max-w-sm grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 mb-6">
        <div>
          <label className="block text-[11px] font-medium text-slate-500 dark:text-dark-muted mb-1">
            Focus Subject
          </label>
          <select
            value={activeSubject?.id || ''}
            onChange={(e) => {
              const sub = subjects.find((s) => s.id === e.target.value);
              setActiveSubject(sub || null);
            }}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="">General Focus</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code || s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 dark:text-dark-muted mb-1">
            Linked Task (Optional)
          </label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 truncate"
          >
            <option value="">No task linked</option>
            {incompleteTasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timer Controls */}
      <TimerControls
        isRunning={isRunning}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
        onSkip={() => {
          switchMode(timerMode === 'focus' ? 'shortBreak' : 'focus');
        }}
      />

      {/* Settings Modal */}
      <TimerSettings
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={timerSettings}
        onSave={updateSettings}
      />
    </div>
  );
};

export default PomodoroTimer;
