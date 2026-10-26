import React from 'react';
import { useSubjects } from '../../hooks/useSubjects';

export const NoteFilters = ({
  categoryFilter = 'all',
  onCategoryChange,
  subjectFilter = 'all',
  onSubjectChange,
}) => {
  const { subjects } = useSubjects();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Lecture Notes', label: 'Lectures' },
    { id: 'Summary', label: 'Summaries' },
    { id: 'Cheat Sheet', label: 'Cheat Sheets' },
    { id: 'Lab', label: 'Labs' },
  ];

  return (
    <div className="space-y-2">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange?.(cat.id)}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Subject Dropdown */}
      <select
        value={subjectFilter}
        onChange={(e) => onSubjectChange?.(e.target.value)}
        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-700 dark:text-slate-300"
      >
        <option value="all">All Subjects</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.code || s.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NoteFilters;
