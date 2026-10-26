import React, { useState } from 'react';
import {
  Timer,
  Clock,
  Star,
  Trash2,
  Plus,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';
import PageContainer from '../components/layout/PageContainer';
import PomodoroTimer from '../components/timer/PomodoroTimer';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useStudySessions } from '../hooks/useStudySessions';
import { useSubjects } from '../hooks/useSubjects';

export const StudySessions = () => {
  const { sessions, logSession, deleteSession } = useStudySessions();
  const { subjects, addStudyHours } = useSubjects();

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualData, setManualData] = useState({
    subjectId: '',
    durationMinutes: 45,
    sessionType: 'deep-work',
    focusRating: 5,
    notes: '',
  });

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const selSubject = subjects.find((s) => s.id === manualData.subjectId);
    await logSession({
      ...manualData,
      subjectName: selSubject?.name || 'General Focus',
      date: new Date().toISOString(),
    });

    if (manualData.subjectId && manualData.durationMinutes) {
      await addStudyHours(manualData.subjectId, manualData.durationMinutes / 60);
    }
    setIsManualModalOpen(false);
  };

  return (
    <PageContainer
      title="Study Sessions & Pomodoro"
      description="Deep work focus timer with automated course tracking and focus rating analysis."
      actions={
        <Button
          variant="secondary"
          size="sm"
          icon={Plus}
          onClick={() => setIsManualModalOpen(true)}
        >
          Log Past Session
        </Button>
      }
    >
      {/* Pomodoro Timer Centerpiece */}
      <div className="mb-10">
        <PomodoroTimer />
      </div>

      {/* Session History Log */}
      <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Focus Session History Log ({sessions.length})
            </h3>
          </div>
        </div>

        {sessions.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-dark-muted italic py-6 text-center">
            No focus sessions logged yet. Hit Start on the Pomodoro timer above!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-dark-border text-slate-400 dark:text-dark-muted font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Focus Quality</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Notes</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                {sessions.map((sess) => (
                  <tr
                    key={sess.id}
                    className="hover:bg-slate-50 dark:hover:bg-dark-surface/50 transition-colors"
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      {sess.subjectName || 'General Focus'}
                    </td>
                    <td className="py-3 px-3 text-brand-500 font-mono font-bold">
                      {sess.durationMinutes} mins
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: sess.focusRating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 dark:text-dark-muted">
                      {sess.date ? format(new Date(sess.date), 'MMM d, h:mm a') : 'Recent'}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-dark-muted max-w-xs truncate">
                      {sess.notes || '—'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteSession(sess.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                        title="Remove session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Manual Session Log Modal */}
      <Modal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        title="Log Completed Session"
        description="Record study time completed offline or outside the app."
        maxWidth="md"
      >
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject
            </label>
            <select
              value={manualData.subjectId}
              onChange={(e) =>
                setManualData({ ...manualData, subjectId: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            >
              <option value="">General Focus / Self-Directed</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={manualData.durationMinutes}
                onChange={(e) =>
                  setManualData({
                    ...manualData,
                    durationMinutes: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Focus Rating (1-5)
              </label>
              <select
                value={manualData.focusRating}
                onChange={(e) =>
                  setManualData({
                    ...manualData,
                    focusRating: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              >
                <option value={5}>⭐⭐⭐⭐⭐ 5 - Deep Flow</option>
                <option value={4}>⭐⭐⭐⭐ 4 - Good Focus</option>
                <option value={3}>⭐⭐⭐ 3 - Moderate</option>
                <option value={2}>⭐⭐ 2 - Distracted</option>
                <option value={1}>⭐ 1 - Interrupted</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes & Concept Covered
            </label>
            <textarea
              rows="2"
              value={manualData.notes}
              onChange={(e) =>
                setManualData({ ...manualData, notes: e.target.value })
              }
              placeholder="What problems or sections did you study?"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-dark-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsManualModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save to Study Log
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};

export default StudySessions;
