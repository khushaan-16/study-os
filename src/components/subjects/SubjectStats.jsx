import React from 'react';
import { CheckCircle2, Clock, CheckSquare, Target } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

export const SubjectStats = ({ subject }) => {
  const { tasks } = useTasks();

  const topics = subject?.topics || [];
  const completedTopics = topics.filter((t) => t.completed).length;
  const highConfidenceCount = topics.filter((t) => t.confidence === 'high').length;
  const progressPercent = topics.length > 0 ? Math.round((completedTopics / topics.length) * 100) : 0;

  const subjectTasks = tasks.filter((t) => t.subjectId === subject?.id);
  const pendingTasks = subjectTasks.filter((t) => !t.completed).length;

  const stats = [
    {
      label: 'Syllabus Mastery',
      value: `${progressPercent}%`,
      subtext: `${completedTopics} of ${topics.length} topics`,
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      label: 'Study Hours Logged',
      value: `${subject?.totalStudyHours || 0}h`,
      subtext: 'Accumulated focus time',
      icon: Clock,
      color: 'text-brand-500 bg-brand-500/10',
    },
    {
      label: 'Mastered Concepts',
      value: `${highConfidenceCount}`,
      subtext: 'Rated High Confidence',
      icon: Target,
      color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
      label: 'Pending Assignments',
      value: `${pendingTasks}`,
      subtext: `${subjectTasks.length} total tasks`,
      icon: CheckSquare,
      color: 'text-amber-500 bg-amber-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="p-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-dark-muted">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-dark-muted mt-0.5">
              {stat.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectStats;
