import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  CheckSquare,
  Clock,
  Flame,
  Edit2,
  Mail,
  Building,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useAuth } from '../hooks/useAuth';
import { useSubjects } from '../hooks/useSubjects';
import { useTasks } from '../hooks/useTasks';
import { useStudySessions } from '../hooks/useStudySessions';

export const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { subjects } = useSubjects();
  const { tasks } = useTasks();
  const { sessions } = useStudySessions();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    major: currentUser?.major || 'Computer Science & AI',
    academicYear: currentUser?.academicYear || 'Senior Year',
    university: currentUser?.university || 'Tech Institute of Science',
    gpa: currentUser?.gpa || '3.92',
  });

  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalStudyHours = (
    sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0) / 60
  ).toFixed(1);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditModalOpen(false);
  };

  const achievements = [
    {
      title: '5-Day Focus Streak',
      desc: 'Maintained uninterrupted deep work cadence for 5 consecutive days',
      icon: Flame,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      earned: true,
    },
    {
      title: 'Distributed Systems Scholar',
      desc: 'Mastered 80%+ of Distributed Systems consensus and cloud topics',
      icon: Award,
      color: 'text-brand-500 bg-brand-500/10 border-brand-500/20',
      earned: true,
    },
    {
      title: 'Centurion Study Club',
      desc: 'Logged more than 50 total hours of Pomodoro focus sessions',
      icon: Clock,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      earned: Number(totalStudyHours) >= 50,
    },
    {
      title: 'Task Conqueror',
      desc: 'Completed 10+ coursework assignments on or before deadline',
      icon: CheckSquare,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      earned: completedTasksCount >= 10,
    },
  ];

  return (
    <PageContainer
      title="Student Profile"
      description="Academic credentials, curriculum standing, and scholarship badges."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={
                currentUser?.photoURL ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              }
              alt="Avatar"
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-500/30 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentUser?.displayName || 'Student'}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">
                  GPA: {currentUser?.gpa || '3.92'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted font-medium flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>
                  {currentUser?.major || 'Computer Science'} •{' '}
                  {currentUser?.academicYear || 'Senior Year'}
                </span>
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-dark-muted pt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  {currentUser?.university || 'Tech Institute of Science'}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {currentUser?.email}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => {
              setFormData({
                displayName: currentUser?.displayName || '',
                major: currentUser?.major || 'Computer Science & AI',
                academicYear: currentUser?.academicYear || 'Senior Year',
                university: currentUser?.university || 'Tech Institute of Science',
                gpa: currentUser?.gpa || '3.92',
              });
              setIsEditModalOpen(true);
            }}
          >
            Edit Profile
          </Button>
        </div>

        {/* Academic Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border">
            <div className="flex items-center gap-2 mb-2 text-indigo-500">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-dark-muted">
                Courses
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {subjects.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Active curriculum</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border">
            <div className="flex items-center gap-2 mb-2 text-emerald-500">
              <CheckSquare className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-dark-muted">
                Completed Tasks
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {completedTasksCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Assignments submitted</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border">
            <div className="flex items-center gap-2 mb-2 text-brand-500">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-dark-muted">
                Focus Time
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {totalStudyHours}h
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Recorded Pomodoros</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border">
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-500 dark:text-dark-muted">
                Focus Streak
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              5 Days
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Consecutive active days</div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Academic Milestones & Badges</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <div
                  key={i}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                    ach.earned
                      ? 'bg-slate-50 dark:bg-dark-surface border-slate-200 dark:border-dark-border'
                      : 'opacity-40 bg-slate-50/50 dark:bg-dark-surface/40 border-dashed border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border shrink-0 ${ach.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-dark-muted mt-1 leading-relaxed">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile"
        description="Update your university program and GPA information."
        maxWidth="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Major / Program
              </label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) =>
                  setFormData({ ...formData, major: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                University
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) =>
                  setFormData({ ...formData, university: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target / Current GPA
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) =>
                  setFormData({ ...formData, gpa: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-dark-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};

export default Profile;
