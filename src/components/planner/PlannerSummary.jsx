import React from 'react';
import { Sparkles, Brain, Clock, ShieldCheck } from 'lucide-react';

export const PlannerSummary = ({ plan }) => {
  if (!plan) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-brand-500/5 to-transparent border border-brand-500/20 space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-brand-500/20 text-brand-600 dark:text-brand-300 shrink-0">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>AI Academic Strategy</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-500">
              Personalized
            </span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {plan.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-white/60 dark:bg-dark-card/60 border border-slate-200/60 dark:border-dark-border/60">
          <span className="text-[11px] font-medium text-slate-500 dark:text-dark-muted block">
            Daily Focus Target
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {plan.recommendedDailyHours}h / day
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/60 dark:bg-dark-card/60 border border-slate-200/60 dark:border-dark-border/60">
          <span className="text-[11px] font-medium text-slate-500 dark:text-dark-muted block">
            Structured Sessions
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {plan.totalSessions || plan.days?.length * 2} Sessions
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/60 dark:bg-dark-card/60 border border-slate-200/60 dark:border-dark-border/60 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-medium text-slate-500 dark:text-dark-muted block">
            Plan Duration
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {plan.days?.length} Days
          </span>
        </div>
      </div>

      {plan.retentionStrategy && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs leading-relaxed">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Retention Protocol: </strong>
            {plan.retentionStrategy}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerSummary;
