import React from 'react';
import { Sparkles } from 'lucide-react';

export const SuggestedPrompt = ({ prompt, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(prompt)}
      className="text-left text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-brand-500/50 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-2 group cursor-pointer"
    >
      <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0 group-hover:scale-110 transition-transform" />
      <span className="truncate">{prompt}</span>
    </button>
  );
};

export default SuggestedPrompt;
