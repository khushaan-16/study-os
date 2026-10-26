import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';

export const MobileSidebar = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const { tasks } = useTasks();
  const location = useLocation();
  const navigate = useNavigate();

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) return null;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare, badge: pendingTasksCount },
    { name: 'Exams', path: '/exams', icon: GraduationCap },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Study Sessions', path: '/sessions', icon: Timer },
    { name: 'Notes', path: '/notes', icon: FileText },
    { name: 'Resources', path: '/resources', icon: Bookmark },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Study Planner', path: '/planner', icon: Sparkles },
    { name: 'AI Assistant', path: '/ai', icon: Bot },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-72 max-w-[85vw] bg-white dark:bg-dark-surface border-r border-slate-200 dark:border-dark-border h-full flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200 dark:border-dark-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              StudyOS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.badge ? (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-semibold">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </div>

        {/* Profile Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-dark-border flex items-center justify-between bg-slate-50 dark:bg-dark-card/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={
                currentUser?.photoURL ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
              }
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {currentUser?.displayName || 'Student'}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-dark-muted truncate">
                {currentUser?.email}
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="p-1.5 text-slate-400 hover:text-rose-500"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
