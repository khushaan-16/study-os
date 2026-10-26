import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useSubjects } from '../../hooks/useSubjects';

export const ExamForm = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const { subjects } = useSubjects();

  const [formData, setFormData] = useState({
    title: '',
    subjectId: '',
    date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    time: '10:00 AM',
    location: '',
    weight: '30%',
    targetGrade: 'A',
    prepProgress: 0,
    topicsCovered: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subjectId: initialData.subjectId || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
        time: initialData.time || '10:00 AM',
        location: initialData.location || '',
        weight: initialData.weight || '30%',
        targetGrade: initialData.targetGrade || 'A',
        prepProgress: initialData.prepProgress || 0,
        topicsCovered: Array.isArray(initialData.topicsCovered)
          ? initialData.topicsCovered.join(', ')
          : '',
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        title: '',
        subjectId: subjects[0]?.id || '',
        date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        time: '10:00 AM',
        location: '',
        weight: '30%',
        targetGrade: 'A',
        prepProgress: 0,
        topicsCovered: '',
        notes: '',
      });
    }
  }, [initialData, isOpen, subjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const selectedSubject = subjects.find((s) => s.id === formData.subjectId);
    const parsedTopics = formData.topicsCovered
      ? formData.topicsCovered
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    try {
      setLoading(true);
      await onSubmit({
        ...formData,
        subjectName: selectedSubject?.name || 'General Exam',
        prepProgress: Number(formData.prepProgress) || 0,
        topicsCovered: parsedTopics,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Exam' : 'Schedule New Exam'}
      description="Track milestones, syllabus coverage, and target grades."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Exam Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Midterm: Distributed Systems & Raft"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject
            </label>
            <select
              value={formData.subjectId}
              onChange={(e) =>
                setFormData({ ...formData, subjectId: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            >
              <option value="">General (No subject linked)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Exam Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Time
            </label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="e.g. 10:00 AM - 12:00 PM"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Location / Hall
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g. Turing Hall Aud A"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Course Weight
            </label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="e.g. 30%"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Target Grade
            </label>
            <select
              value={formData.targetGrade}
              onChange={(e) =>
                setFormData({ ...formData, targetGrade: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            >
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Topics Covered (comma separated)
          </label>
          <input
            type="text"
            value={formData.topicsCovered}
            onChange={(e) =>
              setFormData({ ...formData, topicsCovered: e.target.value })
            }
            placeholder="e.g. Raft, CAP theorem, Vector clocks, 2PC"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Allowed Materials / Exam Notes
          </label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. 1 sheet double-sided notes permitted, scientific calculator allowed..."
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-dark-border">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={loading}>
            {initialData ? 'Save Changes' : 'Schedule Exam'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExamForm;
