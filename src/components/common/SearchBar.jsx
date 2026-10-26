import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  shortcutBadge = false,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-colors"
      />
      {value ? (
        <button
          onClick={onClear}
          type="button"
          className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : shortcutBadge ? (
        <div className="absolute right-2.5 flex items-center pointer-events-none">
          <kbd className="text-[10px] bg-slate-200 dark:bg-dark-subtle px-1.5 py-0.5 rounded text-slate-500 dark:text-dark-muted font-mono border border-slate-300 dark:border-dark-border">
            /
          </kbd>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
