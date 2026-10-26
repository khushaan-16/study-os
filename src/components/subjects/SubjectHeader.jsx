import React from 'react';
import { ArrowLeft, Edit2, Trash2, Timer, User, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useStudySessions } from '../../hooks/useStudySessions';

export const SubjectHeader = ({
  subject,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { setActiveSubject, switchMode, startTimer } = useStudySessions();

  const handleStartFocus = () => {
    setActiveSubject(subject);
    switchMode('focus');
    startTimer();
    navigate('/sessions');
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border relative overflow-hidden shadow-sm mb-6">
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{ backgroundColor: subject.color || '#6366f1' }}
      />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/subjects')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
              title="Back to Subjects"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-md"
              style={{
                backgroundColor: `${subject.color || '#6366f1'}20`,
                color: subject.color || '#6366f1',
              }}
            >
              {subject.code || 'COURSE'}
            </span>
            {subject.credits && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-dark-muted">
                {subject.credits} Credits
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {subject.name}
          </h1>

          {subject.description && (
            <p className="text-sm text-slate-500 dark:text-dark-muted max-w-2xl leading-relaxed">
              {subject.description}
            </p>
          )}

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-dark-muted pt-1">
            {subject.instructor && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{subject.instructor}</span>
              </div>
            )}
            {subject.schedule && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{subject.schedule}</span>
              </div>
            )}
            {subject.room && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{subject.room}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Button
            variant="primary"
            size="sm"
            icon={Timer}
            onClick={handleStartFocus}
          >
            Start Focus Session
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit?.(subject)}
          >
            Edit Course
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(subject.id)}
            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
