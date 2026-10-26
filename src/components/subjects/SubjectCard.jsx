import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MoreVertical,
  BookOpen,
  Clock,
  Layers,
  Calendar,
  User,
  MapPin,
  ExternalLink,
  Edit2,
  Trash2,
} from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

export const SubjectCard = ({
  subject,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const topics = subject.topics || [];
  const completedTopics = topics.filter((t) => t.completed).length;
  const progressPercent =
    topics.length > 0 ? Math.round((completedTopics / topics.length) * 100) : 0;

  return (
    <div
      onClick={() => navigate(`/subjects/${subject.id}`)}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle hover:shadow-md transition-all cursor-pointer select-none"
    >
      {/* Top Accent Strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
        style={{ backgroundColor: subject.color || '#6366f1' }}
      />

      <div>
        {/* Header with Code and Action Menu */}
        <div className="flex items-start justify-between gap-2 mt-1">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: `${subject.color || '#6366f1'}18`,
                color: subject.color || '#6366f1',
              }}
            >
              {subject.code || 'COURSE'}
            </span>
            {subject.credits && (
              <span className="text-[11px] font-medium text-slate-400 dark:text-dark-muted">
                {subject.credits} Credits
              </span>
            )}
          </div>

          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <button
              type="button"
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 mt-1 w-32 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl shadow-lg py-1 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onEdit?.(subject);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card"
                >
                  <Edit2 className="w-3 h-3 text-slate-400" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onDelete?.(subject.id);
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

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2.5 line-clamp-1 group-hover:text-brand-500 transition-colors">
          {subject.name}
        </h3>

        {/* Instructor & Schedule */}
        <div className="space-y-1 mt-2.5 text-xs text-slate-500 dark:text-dark-muted">
          {subject.instructor && (
            <div className="flex items-center gap-1.5 truncate">
              <User className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{subject.instructor}</span>
            </div>
          )}
          {subject.schedule && (
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{subject.schedule}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress & Bottom Stats */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-dark-border/80">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-dark-muted mb-1.5 font-medium">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {completedTopics}/{topics.length} Topics
            </span>
          </div>
          <span>{progressPercent}%</span>
        </div>
        <ProgressBar
          value={progressPercent}
          customColor={subject.color}
          size="sm"
        />

        <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-dark-muted">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{subject.totalStudyHours || 0} hrs logged</span>
          </div>
          <span className="text-brand-500 font-semibold group-hover:underline flex items-center gap-0.5">
            View <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
