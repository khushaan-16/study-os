import React from 'react';
import { GraduationCap, ArrowRight, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { format, isPast } from 'date-fns';
import { useExams } from '../../hooks/useExams';
import ExamCountdown from '../exams/ExamCountdown';

export const UpcomingExams = () => {
  const { exams } = useExams();
  const navigate = useNavigate();

  const now = new Date();
  const upcoming = exams
    .filter((e) => !e.date || new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Upcoming Exams & Milestones
            </h3>
          </div>

          <Link
            to="/exams"
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
          >
            <span>All Exams</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-dark-muted italic py-6 text-center">
            No upcoming exams scheduled. You're all clear!
          </p>
        ) : (
          <div className="space-y-2.5">
            {upcoming.map((exam) => (
              <div
                key={exam.id}
                onClick={() => navigate('/exams')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {exam.title}
                  </h4>
                  <ExamCountdown targetDate={exam.date} compact />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-dark-muted mt-2">
                  <span className="truncate max-w-[160px] font-medium">
                    {exam.subjectName}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-500">
                    Prep: {exam.prepProgress || 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border">
        <Link
          to="/exams"
          className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-dark-surface hover:bg-slate-100 dark:hover:bg-dark-subtle text-slate-700 dark:text-slate-300 transition-colors"
        >
          <span>Open Exam Prep Center</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </div>
  );
};

export default UpcomingExams;
