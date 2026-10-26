import React from 'react';
import { Sparkles, Timer, Flame, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useStudySessions } from '../../hooks/useStudySessions';

export const WelcomeHeader = () => {
  const { currentUser } = useAuth();
  const { startTimer, switchMode } = useStudySessions();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleStartTimer = () => {
    switchMode('focus');
    startTimer();
    navigate('/sessions');
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden shadow-lg border border-indigo-900/40 mb-8">
      {/* Background ambient glow circles */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>
              {currentUser?.academicYear || 'Senior Year'} •{' '}
              {currentUser?.major || 'Computer Science'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {getGreeting()},{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-200">
              {currentUser?.displayName || 'Student'}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Ready to conquer your academic goals today? You have active coursework
            sprints and upcoming milestones scheduled.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <Button
            variant="primary"
            size="md"
            icon={Timer}
            onClick={handleStartTimer}
            className="shadow-md hover:shadow-indigo-500/25"
          >
            Start Focus Session
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={Sparkles}
            onClick={() => navigate('/planner')}
            className="bg-white/10 hover:bg-white/15 text-white border-white/15"
          >
            AI Study Sprint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
