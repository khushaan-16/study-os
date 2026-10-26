import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useSubjects } from '../../hooks/useSubjects';

export const TaskForm = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const { subjects } = useSubjects();

  const [formData, setFormData] = useState({
    title: '',
    subjectId: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    estimatedMinutes: 45,
    tags: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subjectId: initialData.subjectId || '',
        dueDate: initialData.dueDate || new Date().toISOString().split('T')[0],
        priority: initialData.priority || 'medium',
        estimatedMinutes: initialData.estimatedMinutes || 45,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
        description: initialData.description || '',
      });
    } else {
      setFormData({
        title: '',
        subjectId: subjects[0]?.id || '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        estimatedMinutes: 45,
        tags: '',
        description: '',
      });
    }
  }, [initialData, isOpen, subjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const selectedSubject = subjects.find((s) => s.id === formData.subjectId);
    const parsedTags = formData.tags
      ? formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    try {
      setLoading(true);
      await onSubmit({
        ...formData,
        subjectName: selectedSubject?.name || 'General Task',
        estimatedMinutes: Number(formData.estimatedMinutes) || 45,
        tags: parsedTags,
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
      title={initialData ? 'Edit Task' : 'Create New Task'}
      description="Organize your coursework, problem sets, and study milestones."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Implement Raft heartbeat logic"
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
              <option value="">General (No specific course)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white font-medium"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Est. Duration (Minutes)
            </label>
            <input
              type="number"
              min="5"
              step="5"
              value={formData.estimatedMinutes}
              onChange={(e) =>
                setFormData({ ...formData, estimatedMinutes: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="e.g. Lab, Coding, Homework"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description / Requirements
          </label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Specifications, submission guidelines, or useful links..."
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white resize-none placeholder-slate-400"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-dark-border">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={loading}>
            {initialData ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
