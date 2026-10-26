import React, { useState } from 'react';
import { Check, CheckSquare, Download, RotateCcw, Sparkles } from 'lucide-react';
import PlanDay from './PlanDay';
import PlannerSummary from './PlannerSummary';
import Button from '../common/Button';
import { useTasks } from '../../hooks/useTasks';
import toast from 'react-hot-toast';

export const GeneratedPlan = ({
  plan,
  subjectName,
  onReset,
}) => {
  const { addTask } = useTasks();
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!plan) return null;

  const handleExportToTasks = async () => {
    setIsExporting(true);
    let count = 0;
    try {
      for (const day of plan.days || []) {
        for (const session of day.sessions || []) {
          await addTask({
            title: `[Study Plan] ${session.title}`,
            subjectName: subjectName || 'Study Plan',
            priority: 'high',
            estimatedMinutes: session.duration || 60,
            dueDate: new Date(Date.now() + 86400000 * (day.dayNumber - 1))
              .toISOString()
              .split('T')[0],
            tags: ['AI-Plan', session.technique || 'Focus'],
            description: session.notes || '',
          });
          count++;
        }
      }
      setExported(true);
      toast.success(`Exported ${count} study sessions directly into Tasks!`, {
        icon: '🚀',
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to export tasks');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Generated Study Sprint: {subjectName}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-dark-muted mt-0.5">
            Review your optimized daily study distribution below
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={onReset}
          >
            New Plan
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={exported ? Check : CheckSquare}
            disabled={exported}
            isLoading={isExporting}
            onClick={handleExportToTasks}
          >
            {exported ? 'Exported to Tasks' : 'Export Sessions as Tasks'}
          </Button>
        </div>
      </div>

      {/* Summary card */}
      <PlannerSummary plan={plan} />

      {/* Days timeline */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-dark-muted px-1">
          Daily Study Execution Schedule
        </h4>
        {plan.days?.map((dayPlan, idx) => (
          <PlanDay key={idx} dayPlan={dayPlan} />
        ))}
      </div>
    </div>
  );
};

export default GeneratedPlan;
