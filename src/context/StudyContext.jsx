import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Timer Configuration & State
  const [timerSettings, setTimerSettings] = useState(() => {
    const saved = localStorage.getItem('studyos_timer_settings');
    return saved
      ? JSON.parse(saved)
      : { focusDuration: 25, shortBreakDuration: 5, longBreakDuration: 15, autoStart: false };
  });

  const [timerMode, setTimerMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(timerSettings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null); // { id, name }
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [completedSessionData, setCompletedSessionData] = useState(null);

  const timerRef = useRef(null);

  const fetchSessions = useCallback(async () => {
    if (!currentUser) {
      setSessions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await firestoreService.getAll(currentUser.uid, 'studySessions');
      setSessions(data || []);
    } catch (err) {
      console.error('Error fetching study sessions:', err);
      toast.error('Failed to load study sessions');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Save settings when changed
  useEffect(() => {
    localStorage.setItem('studyos_timer_settings', JSON.stringify(timerSettings));
  }, [timerSettings]);

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timerMode, activeSubject]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play subtle audio ding if supported
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // AudioContext not allowed or unsupported
    }

    if (timerMode === 'focus') {
      const duration = timerSettings.focusDuration;
      setCompletedSessionData({
        durationMinutes: duration,
        subjectId: activeSubject?.id || '',
        subjectName: activeSubject?.name || 'General Focus',
        date: new Date().toISOString(),
        sessionType: 'pomodoro',
        focusRating: 5,
        notes: ''
      });
      setShowSummaryModal(true);
      toast.success('Focus session completed! Great work.', { icon: '🎯' });
    } else {
      toast.success('Break finished! Ready to focus again?', { icon: '⚡' });
      switchMode('focus');
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    if (timerMode === 'focus') {
      setTimeLeft(timerSettings.focusDuration * 60);
    } else if (timerMode === 'shortBreak') {
      setTimeLeft(timerSettings.shortBreakDuration * 60);
    } else {
      setTimeLeft(timerSettings.longBreakDuration * 60);
    }
  };

  const switchMode = (mode) => {
    setIsRunning(false);
    setTimerMode(mode);
    if (mode === 'focus') {
      setTimeLeft(timerSettings.focusDuration * 60);
    } else if (mode === 'shortBreak') {
      setTimeLeft(timerSettings.shortBreakDuration * 60);
    } else {
      setTimeLeft(timerSettings.longBreakDuration * 60);
    }
  };

  const updateSettings = (newSettings) => {
    setTimerSettings(newSettings);
    if (!isRunning) {
      if (timerMode === 'focus') setTimeLeft(newSettings.focusDuration * 60);
      else if (timerMode === 'shortBreak') setTimeLeft(newSettings.shortBreakDuration * 60);
      else setTimeLeft(newSettings.longBreakDuration * 60);
    }
    toast.success('Timer settings updated');
  };

  const logSession = async (sessionData) => {
    try {
      const newSession = {
        ...sessionData,
        date: sessionData.date || new Date().toISOString(),
        durationMinutes: Number(sessionData.durationMinutes) || 25,
        focusRating: Number(sessionData.focusRating) || 5,
        sessionType: sessionData.sessionType || 'pomodoro',
      };
      const created = await firestoreService.add(currentUser?.uid, 'studySessions', newSession);
      setSessions((prev) => [created, ...prev]);
      setShowSummaryModal(false);
      setCompletedSessionData(null);
      toast.success('Session recorded to your study log!');
      return created;
    } catch (err) {
      console.error('Failed to log session:', err);
      toast.error('Failed to save study session');
      throw err;
    }
  };

  const deleteSession = async (id) => {
    try {
      await firestoreService.delete(currentUser?.uid, 'studySessions', id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      toast.success('Session removed from log');
      return true;
    } catch (err) {
      console.error('Failed to delete session:', err);
      toast.error('Failed to delete session');
      throw err;
    }
  };

  return (
    <StudyContext.Provider
      value={{
        sessions,
        loading,
        fetchSessions,
        logSession,
        deleteSession,
        // Timer state & methods
        timerMode,
        timeLeft,
        isRunning,
        timerSettings,
        activeSubject,
        setActiveSubject,
        startTimer,
        pauseTimer,
        resetTimer,
        switchMode,
        updateSettings,
        showSummaryModal,
        setShowSummaryModal,
        completedSessionData,
        setCompletedSessionData,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudySessions = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudySessions must be used within a StudyProvider');
  }
  return context;
};
