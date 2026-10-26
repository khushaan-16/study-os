import React from 'react';
import { Activity, Timer, CheckSquare, FileText, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useStudySessions } from '../../hooks/useStudySessions';
import { useTasks } from '../../hooks/useTasks';
import { useNotes } from '../../hooks/useNotes';

export const RecentActivity = () => {
  const { sessions } = useStudySessions();
  const { tasks } = useTasks();
  const { notes } = useNotes();

  // Combine recent items
  const activities = [];

  sessions.slice(0, 3).forEach((s) => {
    activities.push({
      type: 'session',
      title: `Logged ${s.durationMinutes}m focus on ${s.subjectName || 'Study'}`,
      date: s.date ? new Date(s.date) : new Date(),
      icon: Timer,
      color: 'text-emerald-500 bg-emerald-500/10',
    });
  });

  tasks
    .filter((t) => t.completed)
    .slice(0, 3)
    .forEach((t) => {
      activities.push({
        type: 'task',
        title: `Completed assignment: ${t.title}`,
        date: t.updatedAt ? new Date(t.updatedAt) : new Date(),
        icon: CheckSquare,
        color: 'text-brand-500 bg-brand-500/10',
      });
    });

  notes.slice(0, 2).forEach((n) => {
    activities.push({
      type: 'note',
      title: `Updated knowledge note: ${n.title}`,
      date: n.updatedAt ? new Date(n.updatedAt) : new Date(),
      icon: FileText,
      color: 'text-cyan-500 bg-cyan-500/10',
    });
  });

  // Sort descending by date
  activities.sort((a, b) => b.date - a.date);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Academic Activity
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {activities.slice(0, 4).map((act, idx) => {
          const Icon = act.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors"
            >
              <div className={`p-2 rounded-lg shrink-0 ${act.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {act.title}
                </p>
                <span className="text-[10px] text-slate-400 dark:text-dark-muted">
                  {format(act.date, 'MMM d, h:mm a')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
