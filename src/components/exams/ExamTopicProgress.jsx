import React, { useState } from 'react';
import { Check, CheckSquare } from 'lucide-react';

export const ExamTopicProgress = ({
  topics = [],
  onTopicsChange,
}) => {
  // Local state of mastered topics in this exam
  const [completedTopics, setCompletedTopics] = useState(new Set());

  const toggleTopic = (topic) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  };

  if (!topics || topics.length === 0) {
    return (
      <p className="text-xs text-slate-400 dark:text-dark-muted italic">
        No specific topics registered for this exam syllabus.
      </p>
    );
  }

  return (
    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
      {topics.map((topic, i) => {
        const isDone = completedTopics.has(topic);
        return (
          <div
            key={i}
            onClick={() => toggleTopic(topic)}
            className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              isDone
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                : 'bg-slate-50 dark:bg-dark-surface border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:border-brand-500/40'
            }`}
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                isDone
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card'
              }`}
            >
              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={`truncate ${isDone ? 'line-through opacity-80' : ''}`}>
              {topic}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ExamTopicProgress;
