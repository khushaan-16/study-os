import React from 'react';
import { CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useSubjects } from '../../hooks/useSubjects';
import { useExams } from '../../hooks/useExams';
import ProgressBar from '../common/ProgressBar';

export const CompletionRate = () => {
  const { tasks } = useTasks();
  const { subjects } = useSubjects();
  const { exams } = useExams();

  // Task Completion
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskCompletionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Topic Mastery
  const allTopics = subjects.flatMap((s) => s.topics || []);
  const totalTopics = allTopics.length;
  const masteredTopics = allTopics.filter((t) => t.completed).length;
  const topicMasteryRate =
    totalTopics > 0 ? Math.round((masteredTopics / totalTopics) * 100) : 0;

  // Average Exam Readiness
  const avgExamReadiness =
    exams.length > 0
      ? Math.round(
          exams.reduce((sum, e) => sum + (e.prepProgress || 0), 0) / exams.length
        )
      : 0;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Academic Velocity & Completion
        </h3>
        <p className="text-xs text-slate-500 dark:text-dark-muted">
          Aggregate mastery indicators
        </p>
      </div>

      <div className="space-y-4 pt-1">
        {/* Tasks Completion */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Assignment Completion</span>
            </span>
            <span>
              {completedTasks}/{totalTasks} ({taskCompletionRate}%)
            </span>
          </div>
          <ProgressBar value={taskCompletionRate} color="success" size="sm" />
        </div>

        {/* Syllabus Topic Mastery */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
              <span>Curriculum Topics Mastered</span>
            </span>
            <span>
              {masteredTopics}/{totalTopics} ({topicMasteryRate}%)
            </span>
          </div>
          <ProgressBar value={topicMasteryRate} color="primary" size="sm" />
        </div>

        {/* Exam Readiness */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span>Average Exam Readiness</span>
            </span>
            <span>{avgExamReadiness}%</span>
          </div>
          <ProgressBar value={avgExamReadiness} color="warning" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default CompletionRate;
