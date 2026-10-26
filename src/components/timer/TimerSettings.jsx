import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export const TimerSettings = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    focusDuration: settings?.focusDuration || 25,
    shortBreakDuration: settings?.shortBreakDuration || 5,
    longBreakDuration: settings?.longBreakDuration || 15,
    autoStart: settings?.autoStart || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      focusDuration: Number(formData.focusDuration) || 25,
      shortBreakDuration: Number(formData.shortBreakDuration) || 5,
      longBreakDuration: Number(formData.longBreakDuration) || 15,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Timer Settings"
      description="Configure intervals according to your attention span and study technique."
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Focus Session (Minutes)
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={formData.focusDuration}
            onChange={(e) =>
              setFormData({ ...formData, focusDuration: e.target.value })
            }
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Short Break (Minutes)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.shortBreakDuration}
            onChange={(e) =>
              setFormData({ ...formData, shortBreakDuration: e.target.value })
            }
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Long Break (Minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={formData.longBreakDuration}
            onChange={(e) =>
              setFormData({ ...formData, longBreakDuration: e.target.value })
            }
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="autoStart"
            checked={formData.autoStart}
            onChange={(e) =>
              setFormData({ ...formData, autoStart: e.target.checked })
            }
            className="rounded border-slate-300 dark:border-dark-border text-brand-600 focus:ring-brand-500"
          />
          <label
            htmlFor="autoStart"
            className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none"
          >
            Auto-start break when focus timer ends
          </label>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-dark-border">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TimerSettings;
