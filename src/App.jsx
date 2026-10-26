import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SubjectProvider } from './context/SubjectContext';
import { TaskProvider } from './context/TaskContext';
import { ExamProvider } from './context/ExamContext';
import { StudyProvider } from './context/StudyContext';
import { NoteProvider } from './context/NoteContext';

// Layout
import MainLayout from './components/layout/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import SubjectDetails from './pages/SubjectDetails';
import Tasks from './pages/Tasks';
import Exams from './pages/Exams';
import Calendar from './pages/Calendar';
import StudySessions from './pages/StudySessions';
import Notes from './pages/Notes';
import Resources from './pages/Resources';
import Analytics from './pages/Analytics';
import StudyPlanner from './pages/StudyPlanner';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg">
        <LoadingSpinner size="lg" text="Loading StudyOS..." />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Guard (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg">
        <LoadingSpinner size="lg" text="Loading StudyOS..." />
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubjectProvider>
          <TaskProvider>
            <ExamProvider>
              <StudyProvider>
                <NoteProvider>
                  <BrowserRouter>
                    {/* Global Toast Notifications */}
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 3500,
                        style: {
                          background: '#141824',
                          color: '#f8fafc',
                          border: '1px solid #232b3e',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '500',
                        },
                        success: {
                          iconTheme: {
                            primary: '#10b981',
                            secondary: '#141824',
                          },
                        },
                        error: {
                          iconTheme: {
                            primary: '#f43f5e',
                            secondary: '#141824',
                          },
                        },
                      }}
                    />

                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Landing />} />
                      <Route
                        path="/login"
                        element={
                          <PublicRoute>
                            <Login />
                          </PublicRoute>
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <PublicRoute>
                            <Register />
                          </PublicRoute>
                        }
                      />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* Protected Academic Modules */}
                      <Route
                        element={
                          <ProtectedRoute>
                            <MainLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/subjects" element={<Subjects />} />
                        <Route path="/subjects/:id" element={<SubjectDetails />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/exams" element={<Exams />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/sessions" element={<StudySessions />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/planner" element={<StudyPlanner />} />
                        <Route path="/ai" element={<AIAssistant />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                      </Route>

                      {/* 404 Catch-All */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </NoteProvider>
              </StudyProvider>
            </ExamProvider>
          </TaskProvider>
        </SubjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
