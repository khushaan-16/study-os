import React from 'react';
import { Check, CheckSquare, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';
import TaskPriorityBadge from '../tasks/TaskPriorityBadge';

export const TodayTasks = () => {
  const { tasks, toggleTaskCompletion } = useTasks();

  const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 4);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Priority Tasks & Due Soon
            </h3>
          </div>

          <Link
            to="/tasks"
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {pendingTasks.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-dark-muted italic py-6 text-center">
            All caught up! No urgent tasks pending.
          </p>
        ) : (
          <div className="space-y-2.5">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="w-4 h-4 rounded-md border border-slate-300 dark:border-dark-border hover:border-brand-500 bg-white dark:bg-dark-card flex items-center justify-center shrink-0 transition-colors"
                  >
                    {task.completed && <Check className="w-3 h-3 text-brand-500" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {task.title}
                    </h4>
                    {task.subjectName && (
                      <span className="text-[10px] text-slate-400 dark:text-dark-muted truncate block">
                        {task.subjectName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  <TaskPriorityBadge priority={task.priority} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border">
        <Link
          to="/tasks"
          className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-dark-surface hover:bg-slate-100 dark:hover:bg-dark-subtle text-slate-700 dark:text-slate-300 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-brand-500" />
          <span>Add New Assignment</span>
        </Link>
      </div>
    </div>
  );
};

export default TodayTasks;
