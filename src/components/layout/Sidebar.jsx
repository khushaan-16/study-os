import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  GraduationCap,
  Calendar,
  Timer,
  FileText,
  Bookmark,
  BarChart3,
  Sparkles,
  Bot,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Play,
  Pause,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import { useExams } from '../../hooks/useExams';
import { useStudySessions } from '../../hooks/useStudySessions';

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { currentUser, logout } = useAuth();
  const { tasks } = useTasks();
  const { exams } = useExams();
  const { isRunning, timeLeft, timerMode, startTimer, pauseTimer } = useStudySessions();
  const navigate = useNavigate();

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  // Find nearest exam in the future
  const now = new Date();
  const upcomingExams = exams
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const nearestExam = upcomingExams[0];
  const daysUntilNearestExam = nearestExam
    ? Math.ceil((new Date(nearestExam.date) - now) / (1000 * 60 * 60 * 24))
    : null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    {
      name: 'Tasks',
      path: '/tasks',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
      badgeColor: 'bg-brand-500/10 text-brand-500 dark:text-brand-400',
    },
    {
      name: 'Exams',
      path: '/exams',
      icon: GraduationCap,
      badge: daysUntilNearestExam !== null ? `${daysUntilNearestExam}d` : null,
      badgeColor: daysUntilNearestExam <= 7 ? 'bg-amber-500/15 text-amber-500' : 'bg-slate-500/10 text-slate-400',
    },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    {
      name: 'Study Sessions',
      path: '/sessions',
      icon: Timer,
      runningBadge: isRunning,
    },
    { name: 'Notes', path: '/notes', icon: FileText },
    { name: 'Resources', path: '/resources', icon: Bookmark },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Study Planner', path: '/planner', icon: Sparkles, highlight: true },
    { name: 'AI Assistant', path: '/ai', icon: Bot, highlight: true },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className={`relative hidden md:flex flex-col border-r border-slate-200 dark:border-dark-border bg-white dark:bg-dark-surface transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200 dark:border-dark-border">
        {!isCollapsed ? (
          <NavLink to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center text-white shadow-sm font-bold text-base tracking-tight">
              S
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                StudyOS
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  v2.0
                </span>
              </span>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/dashboard" className="mx-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
          </NavLink>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-card transition-colors ${
            isCollapsed ? 'hidden' : 'block'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Pomodoro Widget in Sidebar */}
      {!isCollapsed && (
        <div className="mx-3 mt-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-2 h-2 rounded-full ${
                isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-dark-muted">
                {timerMode === 'focus' ? 'Focus Session' : 'Rest Break'}
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-white">
                {formattedTime}
              </div>
            </div>
          </div>
          <button
            onClick={() => (isRunning ? pauseTimer() : startTimer())}
            className={`p-2 rounded-lg transition-colors ${
              isRunning
                ? 'bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                : 'bg-brand-600 text-white hover:bg-brand-500 shadow-sm'
            }`}
            title={isRunning ? 'Pause' : 'Start Focus'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card'
                } ${isCollapsed ? 'justify-center px-0' : ''}`
              }
              title={isCollapsed ? item.name : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105`}
              />
              {!isCollapsed && (
                <span className="flex-1 truncate flex items-center gap-1.5">
                  {item.name}
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 dark:bg-brand-300" />
                  )}
                </span>
              )}
              {!isCollapsed && item.badge && (
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
              {!isCollapsed && item.runningBadge && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer / User Profile & Settings */}
      <div className="p-3 border-t border-slate-200 dark:border-dark-border space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-brand-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card'
            } ${isCollapsed ? 'justify-center px-0' : ''}`
          }
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="flex-1 truncate">Settings</span>}
        </NavLink>

        {/* User Card */}
        <div
          className={`flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border mt-2 ${
            isCollapsed ? 'justify-center p-2' : ''
          }`}
        >
          <NavLink to="/profile" className="flex items-center gap-2.5 flex-1 min-w-0">
            <img
              src={
                currentUser?.photoURL ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
              }
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300 dark:ring-dark-border shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                  {currentUser?.displayName || 'Student'}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-dark-muted truncate">
                  {currentUser?.major || 'Academic'}
                </div>
              </div>
            )}
          </NavLink>
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-200 dark:hover:bg-dark-subtle transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full py-2 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-dark-card transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
