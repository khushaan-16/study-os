import React from 'react';
import { Check, Trash2, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export const TopicItem = ({
  topic,
  onToggle,
  onUpdateConfidence,
  onDelete,
}) => {
  const confidenceConfig = {
    high: {
      label: 'High Mastery',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      icon: ShieldCheck,
    },
    medium: {
      label: 'Medium',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      icon: Shield,
    },
    low: {
      label: 'Needs Review',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      icon: ShieldAlert,
    },
  };

  const currentConf = confidenceConfig[topic.confidence] || confidenceConfig.medium;
  const ConfIcon = currentConf.icon;

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-slate-300 dark:hover:border-dark-subtle transition-all group">
      {/* Checkbox and title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggle?.(topic.id)}
          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border shrink-0 ${
            topic.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 dark:border-dark-border hover:border-brand-500 bg-slate-50 dark:bg-dark-surface'
          }`}
        >
          {topic.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        <span
          className={`text-sm select-none truncate ${
            topic.completed
              ? 'line-through text-slate-400 dark:text-dark-muted font-normal'
              : 'text-slate-800 dark:text-slate-100 font-medium'
          }`}
        >
          {topic.title}
        </span>
      </div>

      {/* Confidence Pill & Delete */}
      <div className="flex items-center gap-2 shrink-0">
        <select
          value={topic.confidence || 'medium'}
          onChange={(e) => onUpdateConfidence?.(topic.id, e.target.value)}
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-transparent cursor-pointer focus:outline-none ${currentConf.color}`}
        >
          <option value="high" className="bg-white dark:bg-dark-card text-emerald-500">
            High Mastery
          </option>
          <option value="medium" className="bg-white dark:bg-dark-card text-amber-500">
            Medium
          </option>
          <option value="low" className="bg-white dark:bg-dark-card text-rose-500">
            Needs Review
          </option>
        </select>

        <button
          type="button"
          onClick={() => onDelete?.(topic.id)}
          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded transition-opacity"
          title="Delete Topic"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TopicItem;
