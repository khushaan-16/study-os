import React, { useState } from 'react';
import {
  Check,
  Calendar,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  Timer,
  Tag,
} from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import TaskPriorityBadge from './TaskPriorityBadge';
import { useNavigate } from 'react-router-dom';
import { useStudySessions } from '../../hooks/useStudySessions';

export const TaskCard = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { startTimer, switchMode } = useStudySessions();

  const isTaskOverdue =
    task.dueDate && !task.completed && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  const handleStartTimer = () => {
    switchMode('focus');
    startTimer();
    navigate('/sessions');
  };

  return (
    <div
      className={`group relative p-4 rounded-xl border transition-all select-none ${
        task.completed
          ? 'bg-slate-50/50 dark:bg-dark-card/40 border-slate-200 dark:border-dark-border opacity-70'
          : 'bg-white dark:bg-dark-card border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle shadow-sm hover:shadow'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox and Content */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onToggle?.(task.id)}
            className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors border shrink-0 ${
              task.completed
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-300 dark:border-dark-border hover:border-brand-500 bg-slate-50 dark:bg-dark-surface'
            }`}
          >
            {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          </button>

          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-semibold truncate ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-dark-muted'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.title}
            </h4>

            {task.description && (
              <p className="text-xs text-slate-500 dark:text-dark-muted mt-1 line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            )}

            {/* Badges / Metadata */}
            <div className="flex items-center gap-2 flex-wrap mt-2.5">
              <TaskPriorityBadge priority={task.priority} />

              {task.subjectName && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-dark-border">
                  {task.subjectName}
                </span>
              )}

              {task.dueDate && (
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                    isTaskOverdue
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      : isDueToday
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      : 'bg-slate-100 dark:bg-dark-subtle text-slate-500 dark:text-dark-muted border-slate-200 dark:border-dark-border'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  <span>
                    {isDueToday
                      ? 'Today'
                      : isTaskOverdue
                      ? 'Overdue'
                      : format(new Date(task.dueDate), 'MMM d')}
                  </span>
                </span>
              )}

              {task.estimatedMinutes && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-subtle text-slate-500 dark:text-dark-muted flex items-center gap-1 border border-slate-200 dark:border-dark-border">
                  <Clock className="w-3 h-3" />
                  <span>{task.estimatedMinutes}m</span>
                </span>
              )}

              {task.tags &&
                task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-slate-400 dark:text-dark-muted px-1.5 py-0.5 rounded bg-slate-100/50 dark:bg-dark-subtle/50"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Right Menu & Quick Focus */}
        <div className="flex items-center gap-1 shrink-0">
          {!task.completed && (
            <button
              onClick={handleStartTimer}
              className="p-1.5 text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-dark-subtle rounded-lg transition-colors"
              title="Focus on this task with Pomodoro"
            >
              <Timer className="w-4 h-4" />
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-subtle rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl shadow-lg py-1 z-20">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit?.(task);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card"
                >
                  <Edit2 className="w-3 h-3 text-slate-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete?.(task.id);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
