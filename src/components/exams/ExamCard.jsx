import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { format } from 'date-fns';
import ExamCountdown from './ExamCountdown';
import ExamProgress from './ExamProgress';
import ExamTopicProgress from './ExamTopicProgress';
import Button from '../common/Button';

export const ExamCard = ({
  exam,
  onEdit,
  onDelete,
  onUpdateProgress,
}) => {
  const navigate = useNavigate();
  const [showTopics, setShowTopics] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formattedDate = exam.date
    ? format(new Date(exam.date), 'EEEE, MMMM d, yyyy')
    : 'Date TBA';

  const handlePlanWithAI = () => {
    navigate('/planner', {
      state: {
        subjectName: exam.subjectName,
        examDate: exam.date,
        targetGrade: exam.targetGrade,
        topics: exam.topicsCovered,
      },
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm hover:shadow transition-all space-y-4">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {exam.subjectName && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                {exam.subjectName}
              </span>
            )}
            {exam.weight && (
              <span className="text-[11px] font-medium text-slate-500 dark:text-dark-muted">
                Weight: {exam.weight}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {exam.title}
          </h3>
        </div>

        {/* Action Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl shadow-lg py-1 z-20">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit?.(exam);
                }}
                className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                <Edit2 className="w-3 h-3 text-slate-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete?.(exam.id);
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

      {/* Date, Time, Location metadata */}
      <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 dark:text-dark-muted">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
        </div>
        {exam.time && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{exam.time}</span>
          </div>
        )}
        {exam.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{exam.location}</span>
          </div>
        )}
      </div>

      {/* Countdown Clock */}
      <ExamCountdown targetDate={exam.date} />

      {/* Readiness Progress */}
      <ExamProgress
        prepProgress={exam.prepProgress || 0}
        targetGrade={exam.targetGrade || 'A'}
        weight={exam.weight || '30%'}
        interactive
        onUpdateProgress={(newProgress) =>
          onUpdateProgress?.(exam.id, newProgress)
        }
      />

      {/* Topics Accordion */}
      {exam.topicsCovered && exam.topicsCovered.length > 0 && (
        <div className="border-t border-slate-100 dark:border-dark-border pt-3">
          <button
            type="button"
            onClick={() => setShowTopics(!showTopics)}
            className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-500"
          >
            <span>
              Syllabus Coverage ({exam.topicsCovered.length} Topics)
            </span>
            {showTopics ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          {showTopics && (
            <div className="mt-2.5">
              <ExamTopicProgress topics={exam.topicsCovered} />
            </div>
          )}
        </div>
      )}

      {/* Notes / Tips */}
      {exam.notes && (
        <p className="text-xs text-slate-500 dark:text-dark-muted bg-slate-50 dark:bg-dark-surface p-2.5 rounded-lg border border-slate-200 dark:border-dark-border leading-relaxed">
          💡 <span className="font-medium text-slate-700 dark:text-slate-300">Exam Note:</span> {exam.notes}
        </p>
      )}

      {/* Bottom Action: Plan with AI */}
      <div className="pt-2">
        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-center"
          icon={Sparkles}
          onClick={handlePlanWithAI}
        >
          Generate Study Plan with AI
        </Button>
      </div>
    </div>
  );
};

export default ExamCard;
