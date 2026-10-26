import React from 'react';
import {
  ExternalLink,
  BookOpen,
  FileText,
  Star,
  Trash2,
  Edit2,
  Video,
  Globe,
  Tag,
} from 'lucide-react';

export const ResourceCard = ({
  resource,
  onEdit,
  onDelete,
}) => {
  const typeIcons = {
    Paper: FileText,
    Textbook: BookOpen,
    'Course Notes': FileText,
    Video: Video,
    'Interactive Guide': Globe,
  };

  const Icon = typeIcons[resource.type] || Globe;

  return (
    <div className="group relative p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 flex items-center gap-1">
              <Icon className="w-3 h-3" />
              <span>{resource.type || 'Resource'}</span>
            </span>

            {resource.subjectName && (
              <span className="text-[11px] font-medium text-slate-500 dark:text-dark-muted truncate max-w-[150px]">
                {resource.subjectName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit?.(resource)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded"
              title="Edit"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete?.(resource.id)}
              className="p-1 text-slate-400 hover:text-rose-500 rounded"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2.5 line-clamp-2">
          {resource.title}
        </h4>

        {/* Author */}
        {resource.author && (
          <p className="text-xs text-slate-500 dark:text-dark-muted mt-1">
            by {resource.author}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                star <= (resource.rating || 5)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 dark:text-dark-subtle'
              }`}
            />
          ))}
        </div>

        {/* Notes */}
        {resource.notes && (
          <p className="text-xs text-slate-500 dark:text-dark-muted mt-3 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-dark-surface/60 p-2 rounded-lg border border-slate-100 dark:border-dark-border">
            {resource.notes}
          </p>
        )}
      </div>

      {/* Footer / Link */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          {resource.tags &&
            resource.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] text-slate-400 dark:text-dark-muted px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-subtle"
              >
                #{tag}
              </span>
            ))}
        </div>

        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
