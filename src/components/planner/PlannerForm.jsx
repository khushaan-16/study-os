import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Target, Layers } from 'lucide-react';
import Button from '../common/Button';
import { useSubjects } from '../../hooks/useSubjects';
import { useExams } from '../../hooks/useExams';

export const PlannerForm = ({
  onSubmit,
  isLoading,
  initialValues = {},
}) => {
  const { subjects } = useSubjects();
  const { exams } = useExams();

  const [subjectId, setSubjectId] = useState(initialValues.subjectId || subjects[0]?.id || '');
  const [examDate, setExamDate] = useState(
    initialValues.examDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [hoursPerDay, setHoursPerDay] = useState(initialValues.hoursPerDay || 3);
  const [targetGrade, setTargetGrade] = useState(initialValues.targetGrade || 'A');
  const [customTopics, setCustomTopics] = useState('');

  const selectedSubject = subjects.find((s) => s.id === subjectId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedCustom = customTopics
      ? customTopics
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const existingSubjectTopics = (selectedSubject?.topics || []).map((t) => t.title);
    const combinedTopics = parsedCustom.length > 0 ? parsedCustom : existingSubjectTopics;

    const diffDays = Math.max(
      1,
      Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24))
    );

    onSubmit({
      subjectName: selectedSubject?.name || 'General Coursework',
      examDate,
      daysAvailable: diffDays,
      hoursPerDay: Number(hoursPerDay),
      topics: combinedTopics,
      targetGrade,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4"
    >
      <div className="border-b border-slate-100 dark:border-dark-border pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Configure AI Study Plan Parameters</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-dark-muted mt-1">
          Our learning algorithm schedules spaced repetition and timed mock drills
          tailored to your timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Subject */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Target Subject / Course
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100"
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code} - {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Date */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Exam Date / Target Deadline
          </label>
          <input
            type="date"
            required
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Daily Study Capacity */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Daily Capacity: {hoursPerDay} hours/day</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="w-full accent-brand-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>1 hr</span>
            <span>4 hrs</span>
            <span>8 hrs (Intensive)</span>
          </div>
        </div>

        {/* Target Grade */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Target Outcome
          </label>
          <select
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100"
          >
            <option value="A+">Grade A+ (Exhaustive Proofs & Mastery)</option>
            <option value="A">Grade A (High Retention & Problem Sets)</option>
            <option value="B+">Grade B+ (Core Foundations & Review)</option>
          </select>
        </div>
      </div>

      {/* Focus Topics override */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          Specific Priority Topics (Optional - comma separated)
        </label>
        <input
          type="text"
          value={customTopics}
          onChange={(e) => setCustomTopics(e.target.value)}
          placeholder={
            selectedSubject?.topics?.length
              ? `Defaults to ${selectedSubject.topics.length} syllabus topics`
              : 'e.g. Consensus, Raft, Vector clocks, Two-Phase commit'
          }
          className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full justify-center"
          isLoading={isLoading}
          icon={Sparkles}
        >
          Generate Intelligent Study Sprint
        </Button>
      </div>
    </form>
  );
};

export default PlannerForm;
