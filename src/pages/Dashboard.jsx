import React from 'react';
import {
  BookOpen,
  CheckSquare,
  GraduationCap,
  Clock,
  Flame,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import StatCard from '../components/dashboard/StatCard';
import TodayTasks from '../components/dashboard/TodayTasks';
import UpcomingExams from '../components/dashboard/UpcomingExams';
import StudyProgress from '../components/dashboard/StudyProgress';
import WeeklyActivity from '../components/dashboard/WeeklyActivity';
import SubjectProgress from '../components/dashboard/SubjectProgress';
import StudyRecommendation from '../components/dashboard/StudyRecommendation';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useSubjects } from '../hooks/useSubjects';
import { useTasks } from '../hooks/useTasks';
import { useExams } from '../hooks/useExams';
import { useStudySessions } from '../hooks/useStudySessions';

export const Dashboard = () => {
  const { subjects } = useSubjects();
  const { tasks } = useTasks();
  const { exams } = useExams();
  const { sessions } = useStudySessions();

  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const now = new Date();
  const upcomingExams = exams
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const nearestExam = upcomingExams[0];
  const daysUntilNearestExam = nearestExam
    ? Math.max(0, Math.ceil((new Date(nearestExam.date) - now) / (1000 * 60 * 60 * 24)))
    : '--';

  const totalStudyHours = (
    sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0) / 60
  ).toFixed(1);

  return (
    <PageContainer maxWidth="7xl">
      {/* Welcome Banner */}
      <WelcomeHeader />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Active Courses"
          value={subjects.length}
          subtext="Full-time curriculum"
          icon={BookOpen}
          color="indigo"
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          subtext={`${tasks.length} total assignments`}
          icon={CheckSquare}
          color="cyan"
        />
        <StatCard
          title="Next Exam In"
          value={typeof daysUntilNearestExam === 'number' ? `${daysUntilNearestExam}d` : daysUntilNearestExam}
          subtext={nearestExam ? nearestExam.title : 'No upcoming exam'}
          icon={GraduationCap}
          color="amber"
        />
        <StatCard
          title="Total Focus Time"
          value={`${totalStudyHours}h`}
          subtext="Logged in Pomodoro"
          icon={Clock}
          color="emerald"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          <TodayTasks />
          <UpcomingExams />
          <WeeklyActivity />
          <StudyRecommendation />
        </div>

        {/* Right Column (1 Col wide) */}
        <div className="space-y-6">
          <StudyProgress />
          <SubjectProgress />
          <RecentActivity />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
