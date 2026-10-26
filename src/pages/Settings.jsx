import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Key,
  Database,
  RefreshCw,
  Download,
  Info,
  Check,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import {
  getGeminiApiKey,
  setGeminiApiKey,
  geminiService,
} from '../services/geminiService';
import { firestoreService } from '../services/firestoreService';
import toast from 'react-hot-toast';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();

  const [apiKey, setApiKey] = useState(getGeminiApiKey());
  const [showKey, setShowKey] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKey);
    toast.success('Gemini API key saved to local storage!');
  };

  const handleTestApiKey = async () => {
    setIsTestingKey(true);
    try {
      setGeminiApiKey(apiKey);
      const res = await geminiService.chatWithAI(
        'Respond with: "Gemini connection active!"'
      );
      if (res && res.includes('active')) {
        toast.success('Gemini API key verified successfully! 🚀');
      } else {
        toast.success('AI responded using smart engine!');
      }
    } catch (err) {
      toast.error('Could not verify Gemini key');
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleResetData = () => {
    firestoreService.clearAllData(currentUser?.uid);
    setShowResetConfirm(false);
    toast.success('All data wiped clean! Fresh workspace ready.');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const handleLoadSampleData = () => {
    firestoreService.loadSampleData(currentUser?.uid);
    toast.success('Sample university data loaded!');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const handleExportBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      user: currentUser,
      subjects: localStorage.getItem(`studyos_data_${currentUser?.uid || 'demo'}_subjects`),
      tasks: localStorage.getItem(`studyos_data_${currentUser?.uid || 'demo'}_tasks`),
      exams: localStorage.getItem(`studyos_data_${currentUser?.uid || 'demo'}_exams`),
      sessions: localStorage.getItem(`studyos_data_${currentUser?.uid || 'demo'}_studySessions`),
      notes: localStorage.getItem(`studyos_data_${currentUser?.uid || 'demo'}_notes`),
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyos-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success('Academic backup JSON downloaded!');
  };

  return (
    <PageContainer
      title="System Settings"
      description="Configure workspace appearance, AI models, and database preferences."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-border">
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-brand-500" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Interface Appearance & Theme
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Current Mode: {theme === 'dark' ? 'Dark First (Recommended)' : 'Light Mode'}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-dark-muted mt-0.5">
                Dark theme reduces eye strain during late-night study sessions.
              </p>
            </div>

            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>

        {/* Gemini AI Configuration */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-border">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Google Gemini API Integration
            </h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            StudyOS is powered by Google Gemini for generating personalized study sprints
            and interactive concept tutoring. Provide an API key from Google AI Studio,
            or leave empty to use our built-in STEM heuristic tutor engine.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Gemini API Key
            </label>
            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3 pr-20 py-2 text-sm font-mono bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" size="sm" onClick={handleSaveApiKey}>
              Save Key
            </Button>
            <Button
              variant="secondary"
              size="sm"
              isLoading={isTestingKey}
              onClick={handleTestApiKey}
            >
              Test Connection
            </Button>
          </div>
        </div>

        {/* Database & State Management */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-border">
            <Database className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Database & Storage
            </h3>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Export Academic Data
              </p>
              <p className="text-[11px] text-slate-400 dark:text-dark-muted mt-0.5">
                Download a JSON snapshot of your courses, notes, and study log.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportBackup}
            >
              Export JSON
            </Button>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-3 border-t border-slate-100 dark:border-dark-border">
            <div>
              <p className="text-xs font-semibold text-rose-500">
                Reset Demo Academic Database
              </p>
              <p className="text-[11px] text-slate-400 dark:text-dark-muted mt-0.5">
                Re-seeds high-fidelity course data, problem sets, and study logs.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={() => setShowResetConfirm(true)}
              className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10"
            >
              Reset Data
            </Button>
          </div>
        </div>

        {/* About Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs text-slate-500 dark:text-dark-muted space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Info className="w-4 h-4 text-brand-500" />
            <span>StudyOS Academic System • v2.0 Production</span>
          </div>
          <p>
            Stack: React 19, Vite, Tailwind CSS, Firebase Firestore & Auth, Recharts,
            Google Gemini API, date-fns.
          </p>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetData}
        title="Reset Academic Database"
        message="This will reset all your courses, tasks, notes, and focus logs back to pristine initial mock values."
        confirmText="Confirm Reset"
      />
    </PageContainer>
  );
};

export default Settings;
