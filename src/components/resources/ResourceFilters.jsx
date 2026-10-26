import React from 'react';
import { Search } from 'lucide-react';
import { useSubjects } from '../../hooks/useSubjects';

export const ResourceFilters = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
  subjectFilter,
  onSubjectChange,
}) => {
  const { subjects } = useSubjects();

  const types = [
    { id: 'all', label: 'All Resources' },
    { id: 'Paper', label: 'Papers' },
    { id: 'Textbook', label: 'Textbooks' },
    { id: 'Course Notes', label: 'Course Notes' },
    { id: 'Interactive Guide', label: 'Guides & Visualizers' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border mb-6">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search papers, textbooks, authors, tags..."
          className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {/* Type Tabs & Subject Dropdown */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 overflow-x-auto">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => onTypeChange?.(t.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                typeFilter === t.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => onSubjectChange?.(e.target.value)}
          className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-700 dark:text-slate-200"
        >
          <option value="all">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.code || s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ResourceFilters;
