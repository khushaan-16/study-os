import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarDay from './CalendarDay';
import CalendarEvent from './CalendarEvent';
import Button from '../common/Button';
import { useTasks } from '../../hooks/useTasks';
import { useExams } from '../../hooks/useExams';
import { useStudySessions } from '../../hooks/useStudySessions';

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const [selectedDayDate, setSelectedDayDate] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);

  const { tasks } = useTasks();
  const { exams } = useExams();
  const { sessions } = useStudySessions();

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Map events to days
  const getEventsForDay = (day) => {
    const dayEvents = [];

    // Exams
    exams.forEach((exam) => {
      if (exam.date && isSameDay(new Date(exam.date), day)) {
        dayEvents.push({
          type: 'exam',
          title: exam.title,
          subjectName: exam.subjectName,
          details: `Time: ${exam.time || 'TBA'} | Weight: ${exam.weight || 'N/A'} | Target: ${exam.targetGrade || 'A'}`,
        });
      }
    });

    // Tasks
    tasks.forEach((task) => {
      if (task.dueDate && isSameDay(new Date(task.dueDate), day)) {
        dayEvents.push({
          type: 'task',
          title: task.title,
          subjectName: task.subjectName,
          details: `Priority: ${task.priority} | Est: ${task.estimatedMinutes}m | Status: ${task.completed ? 'Done' : 'Pending'}`,
        });
      }
    });

    // Sessions
    sessions.forEach((sess) => {
      if (sess.date && isSameDay(new Date(sess.date), day)) {
        dayEvents.push({
          type: 'session',
          title: `Study: ${sess.subjectName || 'Focus'}`,
          subjectName: sess.subjectName,
          details: `Duration: ${sess.durationMinutes}m | Focus Rating: ${sess.focusRating}/5`,
        });
      }
    });

    return dayEvents;
  };

  const handleSelectDay = (day, events) => {
    setSelectedDayDate(format(day, 'EEEE, MMMM d, yyyy'));
    setSelectedDayEvents(events);
    setShowEventModal(true);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border overflow-hidden shadow-sm">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-dark-border">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-dark-muted mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Exams
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500" /> Tasks
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Sessions
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center border border-slate-200 dark:border-dark-border rounded-lg overflow-hidden">
            <button
              onClick={prevMonth}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-subtle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-subtle border-l border-slate-200 dark:border-dark-border"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-surface/50 text-center">
        {weekDays.map((d, i) => (
          <div
            key={i}
            className="py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-dark-muted border-r border-slate-200 dark:border-dark-border last:border-r-0"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => (
          <CalendarDay
            key={idx}
            day={day}
            currentMonth={currentMonth}
            events={getEventsForDay(day)}
            onSelectDay={handleSelectDay}
          />
        ))}
      </div>

      {/* Selected Day Events Modal */}
      <CalendarEvent
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        date={selectedDayDate}
        events={selectedDayEvents || []}
      />
    </div>
  );
};

export default CalendarView;
