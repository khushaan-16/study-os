import React from 'react';
import { format } from 'date-fns';
import { FileText, Trash2, Calendar, Tag } from 'lucide-react';

export const NoteCard = ({
  note,
  isActive = false,
  onSelect,
  onDelete,
}) => {
  const categoryColors = {
    'Lecture Notes': 'bg-brand-500/10 text-brand-500 border-brand-500/20',
    Summary: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Cheat Sheet': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Lab: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    Research: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  };

  const badgeStyle = categoryColors[note.category] || categoryColors['Lecture Notes'];

  return (
    <div
      onClick={() => onSelect?.(note)}
      className={`group p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
        isActive
          ? 'bg-brand-500/5 dark:bg-brand-500/10 border-brand-500/50 shadow-sm'
          : 'bg-white dark:bg-dark-card border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-500 transition-colors">
          {note.title || 'Untitled Note'}
        </h4>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(note.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded transition-opacity"
          title="Delete Note"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badgeStyle}`}>
          {note.category || 'Note'}
        </span>
        {note.subjectName && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-subtle text-slate-500 dark:text-dark-muted truncate max-w-[120px]">
            {note.subjectName}
          </span>
        )}
      </div>

      {note.content && (
        <p className="text-xs text-slate-500 dark:text-dark-muted mt-2 line-clamp-2 leading-relaxed">
          {note.content.replace(/[#*`_]/g, '')}
        </p>
      )}

      <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 dark:text-dark-muted">
        <span>
          {note.updatedAt
            ? format(new Date(note.updatedAt), 'MMM d, h:mm a')
            : 'Recent'}
        </span>

        {note.tags && note.tags.length > 0 && (
          <span className="truncate max-w-[100px]">
            #{note.tags[0]}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
