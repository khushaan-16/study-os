import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useExams } from '../../hooks/useExams';
import { useSubjects } from '../../hooks/useSubjects';
import { useStudySessions } from '../../hooks/useStudySessions';

export const StudyRecommendation = () => {
  const { exams } = useExams();
  const { subjects } = useSubjects();
  const { setActiveSubject, switchMode, startTimer } = useStudySessions();
  const navigate = useNavigate();

  // Find nearest exam
  const now = new Date();
  const upcomingExams = exams
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const targetExam = upcomingExams[0];

  // Find subject corresponding to nearest exam
  const relatedSubject = subjects.find((s) => s.id === targetExam?.subjectId);
  const weakTopic = relatedSubject?.topics?.find(
    (t) => t.confidence === 'low' || !t.completed
  ) || { title: 'Core Foundations & Practice Problems' };

  const handleStartRecommendedSession = () => {
    if (relatedSubject) {
      setActiveSubject(relatedSubject);
    }
    switchMode('focus');
    startTimer();
    navigate('/sessions');
  };

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-brand-500/20 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            AI Learning Recommendation
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
          {targetExam ? (
            <>
              High-Yield Sprint for <span className="text-brand-500">{targetExam.title}</span>
            </>
          ) : (
            'Deep Focus Recommendation'
          )}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          Based on your upcoming syllabus milestones and mastery scores, we recommend
          spending <strong className="text-slate-900 dark:text-white">45 minutes</strong> on:
        </p>

        <div className="p-3 rounded-xl bg-white/70 dark:bg-dark-card/70 border border-slate-200/70 dark:border-dark-border/70 mt-3 flex items-center gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
            {weakTopic.title}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-brand-500/15">
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center"
          onClick={handleStartRecommendedSession}
        >
          <span>Launch 45m Focus Block</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default StudyRecommendation;
