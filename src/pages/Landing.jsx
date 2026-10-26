import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  CheckSquare,
  GraduationCap,
  Timer,
  FileText,
  BarChart3,
  Bot,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

export const Landing = () => {
  const { loginAsDemo, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDemoLaunch = async () => {
    await loginAsDemo();
    navigate('/dashboard');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Curriculum & Syllabus OS',
      desc: 'Break course syllabi into atomic mastery units with confidence ratings and exam readiness scores.',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: CheckSquare,
      title: 'Assignments & Milestones',
      desc: 'High-density assignment pipeline with priorities, due dates, course links, and estimated effort.',
      color: 'text-brand-500 bg-brand-500/10 border-brand-500/20',
    },
    {
      icon: GraduationCap,
      title: 'Exam Readiness Countdown',
      desc: 'Live countdowns, topic checklists, and readiness gauges so you never cram blindly again.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Timer,
      title: 'Integrated Pomodoro Flow',
      desc: 'Customizable deep-work intervals linked directly to active courses and logged into academic analytics.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Sparkles,
      title: 'AI Study Sprints (Gemini)',
      desc: 'Generate day-by-day study schedules backed by cognitive science, spaced recall, and deliberate practice.',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: BarChart3,
      title: 'Academic Performance Analytics',
      desc: 'GitHub-style study heatmaps, subject time distributions, and target adherence charts.',
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 px-6 sm:px-12 border-b border-slate-200 dark:border-dark-border bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center text-white font-bold text-base shadow-sm">
            S
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            StudyOS
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDemoLaunch}
                icon={Sparkles}
              >
                1-Click Demo
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:py-28 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Personal Academic Operating System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1]">
          Master university coursework with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500">
            precision and clarity
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 dark:text-dark-muted max-w-2xl mt-6 leading-relaxed">
          StudyOS replaces scattered spreadsheets, paper notebooks, and disorganized timers
          with a unified, AI-powered system designed for modern university students.
        </p>

        <div className="flex items-center gap-4 mt-8 flex-wrap justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleDemoLaunch}
            icon={Sparkles}
            className="shadow-lg shadow-brand-500/25"
          >
            Launch Interactive Demo
          </Button>

          <Link to="/register">
            <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
              Create Free Account
            </Button>
          </Link>
        </div>

        {/* Hero preview mock banner */}
        <div className="w-full mt-14 p-2 rounded-2xl bg-gradient-to-b from-slate-200 dark:from-dark-border to-transparent shadow-2xl">
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card p-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-dark-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-mono">
                  studyos.app/dashboard
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Focus Session: 24:18
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
                <span className="text-[11px] text-slate-400 font-semibold block">
                  MIDTERM COUNTDOWN
                </span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                  6 Days 14 Hours
                </span>
                <span className="text-xs text-brand-500 mt-1 block font-medium">
                  CS 436: Distributed Systems
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
                <span className="text-[11px] text-slate-400 font-semibold block">
                  STUDY VELOCITY
                </span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                  32.5 Hours
                </span>
                <span className="text-xs text-emerald-500 mt-1 block font-medium">
                  +4.2h above weekly target
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
                <span className="text-[11px] text-slate-400 font-semibold block">
                  AI RECOMMENDATION
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 block leading-snug">
                  Targeted Raft Log Replication Review
                </span>
                <span className="text-xs text-purple-400 mt-1 block font-medium">
                  Syllabus Confidence: 82%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built from the ground up for academic excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted mt-2">
            Every module is tailored to how STEM, liberal arts, and graduate coursework
            is actually structured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className={`p-3 rounded-xl border w-fit ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-dark-muted leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 text-center bg-slate-100 dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border mt-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Transform your semester with StudyOS
          </h3>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Free and open demo session available instantly. No credit card required.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleDemoLaunch}
              icon={Sparkles}
            >
              Start Free Demo Now
            </Button>
          </div>
        </div>

        <div className="text-xs text-slate-400 dark:text-dark-muted mt-12 pt-6 border-t border-slate-200 dark:border-dark-border max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 StudyOS • Personal Academic Operating System</span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-slate-200">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-slate-200">
              Register
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
