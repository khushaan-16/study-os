import React from 'react';
import { Search, X } from 'lucide-react';

export const NoteSearch = ({
  value = '',
  onChange,
  onClear,
}) => {
  return (
    <div className="relative">
      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search notes & content..."
        className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default NoteSearch;
