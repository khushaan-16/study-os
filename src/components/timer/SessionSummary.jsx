import React, { useState } from 'react';
import { Star, Clock, BookOpen, Check } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useSubjects } from '../../hooks/useSubjects';

export const SessionSummary = ({
  isOpen,
  onClose,
  sessionData,
  onSave,
}) => {
  const { subjects, addStudyHours } = useSubjects();
  const [subjectId, setSubjectId] = useState(sessionData?.subjectId || subjects[0]?.id || '');
  const [focusRating, setFocusRating] = useState(sessionData?.focusRating || 5);
  const [notes, setNotes] = useState(sessionData?.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const selectedSubject = subjects.find((s) => s.id === subjectId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        ...sessionData,
        subjectId,
        subjectName: selectedSubject?.name || 'General Focus',
        focusRating,
        notes,
      });

      // Credit study hours to subject
      if (subjectId && sessionData?.durationMinutes) {
        const hours = sessionData.durationMinutes / 60;
        await addStudyHours(subjectId, hours);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Session Complete! 🎉"
      description="Record your progress and focus rating for academic analytics."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Duration Card */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Focus Duration
            </span>
          </div>
          <span className="text-lg font-bold">
            {sessionData?.durationMinutes || 25} minutes
          </span>
        </div>

        {/* Subject Select */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="">General Focus / Self-Directed</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code} - {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Focus Rating */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Focus Rating ({focusRating} / 5)
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFocusRating(star)}
                className={`p-2 rounded-lg transition-colors ${
                  star <= focusRating
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-slate-300 dark:text-dark-subtle hover:text-amber-400'
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= focusRating ? 'fill-amber-400' : ''
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Session Notes & Takeaways
          </label>
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What concepts did you master? Any roadblock topics?"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-dark-border">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSaving}>
            Discard
          </Button>
          <Button
            type="submit"
            size="sm"
            isLoading={isSaving}
            icon={Check}
          >
            Log to Analytics
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SessionSummary;
