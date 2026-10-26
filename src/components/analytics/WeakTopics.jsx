import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubjects } from '../../hooks/useSubjects';

export const WeakTopics = () => {
  const { subjects } = useSubjects();
  const navigate = useNavigate();

  // Find all low confidence or uncompleted topics
  const weakTopics = [];

  subjects.forEach((sub) => {
    (sub.topics || []).forEach((topic) => {
      if (topic.confidence === 'low' || (!topic.completed && topic.confidence === 'medium')) {
        weakTopics.push({
          ...topic,
          subjectId: sub.id,
          subjectCode: sub.code,
          subjectName: sub.name,
          color: sub.color,
        });
      }
    });
  });

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Targeted Weakness Remediation</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Topics marked with low confidence needing deliberate practice
          </p>
        </div>
      </div>

      {weakTopics.length === 0 ? (
        <p className="text-xs text-slate-400 dark:text-dark-muted italic py-4 text-center">
          Great job! No weak topics flagged. All syllabus concepts are in good standing.
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {weakTopics.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/subjects/${item.subjectId}`)}
              className="p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                    style={{
                      backgroundColor: `${item.color || '#6366f1'}20`,
                      color: item.color || '#6366f1',
                    }}
                  >
                    {item.subjectCode || 'COURSE'}
                  </span>
                  <span className="text-[10px] text-rose-500 font-semibold bg-rose-500/10 px-1.5 py-0.2 rounded">
                    Needs Review
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {item.title}
                </h4>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeakTopics;
