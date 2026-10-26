import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSubjects } from '../../hooks/useSubjects';
import ProgressBar from '../common/ProgressBar';

export const SubjectProgress = () => {
  const { subjects } = useSubjects();
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-brand-500">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Coursework & Syllabus Progress
            </h3>
          </div>

          <Link
            to="/subjects"
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
          >
            <span>All Courses</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3.5">
          {subjects.map((sub) => {
            const topics = sub.topics || [];
            const completed = topics.filter((t) => t.completed).length;
            const percent = topics.length > 0 ? Math.round((completed / topics.length) * 100) : 0;

            return (
              <div
                key={sub.id}
                onClick={() => navigate(`/subjects/${sub.id}`)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                      style={{
                        backgroundColor: `${sub.color || '#6366f1'}20`,
                        color: sub.color || '#6366f1',
                      }}
                    >
                      {sub.code || 'COURSE'}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white truncate">
                      {sub.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                    {percent}%
                  </span>
                </div>

                <ProgressBar
                  value={percent}
                  customColor={sub.color}
                  size="sm"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-dark-muted mt-2">
                  <span>
                    {completed} of {topics.length} topics
                  </span>
                  <span>{sub.totalStudyHours || 0} hrs logged</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectProgress;
