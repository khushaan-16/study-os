import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useSubjects } from '../../hooks/useSubjects';

export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  subjectFilter,
  onSubjectChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) => {
  const { subjects } = useSubjects();

  const hasActiveFilters =
    searchQuery || statusFilter !== 'all' || subjectFilter !== 'all' || sortBy !== 'dueDate';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border mb-6">
      {/* Left: Search input */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks, tags, or topics..."
          className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {/* Right: Filters & Sort */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Status filter tabs */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-dark-subtle border border-slate-200 dark:border-dark-border">
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'To Do' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onStatusChange(tab.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                statusFilter === tab.id
                  ? 'bg-white dark:bg-dark-card text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subject dropdown */}
        <select
          value={subjectFilter}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-700 dark:text-slate-200"
        >
          <option value="all">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.code || s.name}
            </option>
          ))}
        </select>

        {/* Sort selector */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-700 dark:text-slate-200"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title (A-Z)</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="p-1.5 text-xs text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-subtle flex items-center gap-1"
            title="Reset Filters"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
