import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    try {
      setDemoLoading(true);
      await loginAsDemo();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              S
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              StudyOS
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Welcome back to your workspace
          </h2>
          <p className="text-xs text-slate-500 dark:text-dark-muted">
            Sign in with your university account or launch instant demo
          </p>
        </div>

        {/* 1-Click Demo Button */}
        <Button
          variant="secondary"
          size="md"
          className="w-full justify-center bg-indigo-500/10 hover:bg-indigo-500/20 text-brand-600 dark:text-brand-400 border-indigo-500/20 py-2.5 font-semibold"
          icon={Sparkles}
          isLoading={demoLoading}
          onClick={handleDemo}
        >
          1-Click Demo Login (Alex Chen)
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-dark-border w-full" />
          <span className="bg-white dark:bg-dark-card px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
            or sign in with email
          </span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-brand-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full justify-center"
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-dark-muted">
          Don't have an account yet?{' '}
          <Link
            to="/register"
            className="text-brand-500 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
