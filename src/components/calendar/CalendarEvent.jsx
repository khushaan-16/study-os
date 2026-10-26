import React from 'react';
import { Calendar, Clock, MapPin, CheckSquare, GraduationCap, Timer } from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const CalendarEvent = ({
  isOpen,
  onClose,
  date,
  events = [],
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={date ? `Schedule for ${date}` : 'Academic Events'}
      description={`${events.length} event${events.length === 1 ? '' : 's'} scheduled`}
      maxWidth="md"
    >
      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-dark-muted py-4 text-center">
            No events scheduled for this day.
          </p>
        ) : (
          events.map((ev, i) => {
            const isExam = ev.type === 'exam';
            const isTask = ev.type === 'task';
            const isSession = ev.type === 'session';

            return (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border flex items-start gap-3"
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isExam
                      ? 'bg-rose-500/10 text-rose-500'
                      : isTask
                      ? 'bg-brand-500/10 text-brand-500'
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}
                >
                  {isExam ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : isTask ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    <Timer className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        isExam
                          ? 'bg-rose-500/10 text-rose-500'
                          : isTask
                          ? 'bg-brand-500/10 text-brand-500'
                          : 'bg-emerald-500/10 text-emerald-500'
                      }`}
                    >
                      {ev.type}
                    </span>
                    {ev.subjectName && (
                      <span className="text-xs text-slate-500 dark:text-dark-muted truncate">
                        {ev.subjectName}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {ev.title}
                  </h4>

                  {ev.details && (
                    <p className="text-xs text-slate-500 dark:text-dark-muted mt-1">
                      {ev.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-dark-border mt-4">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default CalendarEvent;
