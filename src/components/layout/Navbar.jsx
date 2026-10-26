import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Plus,
  Sparkles,
  Search,
  BookOpen,
  CheckSquare,
  GraduationCap,
  FileText,
  Timer,
  ChevronDown,
  User,
  Settings,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { firestoreService } from '../../services/firestoreService';
import toast from 'react-hot-toast';

export const Navbar = ({ onOpenMobileSidebar, onOpenQuickAdd }) => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const addMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
        setShowAddMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (path) => {
    if (path.startsWith('/subjects/')) return 'Subject Details';
    switch (path) {
      case '/dashboard':
        return 'Academic Command Center';
      case '/subjects':
        return 'Enrolled Subjects';
      case '/tasks':
        return 'Tasks & Assignments';
      case '/exams':
        return 'Exams & Milestones';
      case '/calendar':
        return 'Academic Schedule';
      case '/sessions':
        return 'Study Sessions & Pomodoro';
      case '/notes':
        return 'Knowledge Base & Notes';
      case '/resources':
        return 'Academic Resources & Papers';
      case '/analytics':
        return 'Study Analytics & Insights';
      case '/planner':
        return 'AI Study Planner';
      case '/ai':
        return 'AI Academic Mentor';
      case '/profile':
        return 'Student Profile';
      case '/settings':
        return 'System Settings';
      default:
        return 'StudyOS';
    }
  };

  const handleResetData = () => {
    firestoreService.resetDemoData(currentUser?.uid);
    setShowUserMenu(false);
    toast.success('Demo academic database reset to pristine default!');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <header className="h-16 px-4 md:px-8 border-b border-slate-200 dark:border-dark-border bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white md:hidden hover:bg-slate-100 dark:hover:bg-dark-card"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Quick Button */}
        <Link
          to="/ai"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI</span>
        </Link>

        {/* Quick Add Dropdown */}
        <div className="relative" ref={addMenuRef}>
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-subtle text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-dark-border transition-colors"
          >
            <Plus className="w-4 h-4 text-brand-500" />
            <span className="hidden sm:inline">New</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showAddMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  navigate('/tasks');
                  onOpenQuickAdd?.('task');
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle"
              >
                <CheckSquare className="w-3.5 h-3.5 text-brand-500" />
                <span>New Task</span>
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  navigate('/subjects');
                  onOpenQuickAdd?.('subject');
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>New Subject</span>
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  navigate('/exams');
                  onOpenQuickAdd?.('exam');
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>New Exam</span>
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  navigate('/notes');
                  onOpenQuickAdd?.('note');
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-500" />
                <span>New Note</span>
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  navigate('/sessions');
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle border-t border-slate-100 dark:border-dark-border"
              >
                <Timer className="w-3.5 h-3.5 text-emerald-500" />
                <span>Start Focus Session</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-500/20 transition-all"
          >
            <img
              src={
                currentUser?.photoURL ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
              }
              alt=""
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-dark-border"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl shadow-xl py-2 z-40 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-dark-border">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser?.displayName || 'Student'}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-dark-muted truncate">
                  {currentUser?.email}
                </div>
              </div>

              <Link
                to="/profile"
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Student Profile</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleResetData}
                className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-subtle border-t border-slate-100 dark:border-dark-border"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                <span>Reset Demo Data</span>
              </button>
              <button
                onClick={async () => {
                  setShowUserMenu(false);
                  await logout();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
