import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 my-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
        <Bot className="w-4 h-4" />
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-dark-muted animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-dark-muted animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-dark-muted animate-bounce" />
      </div>
    </div>
  );
};

export default TypingIndicator;
