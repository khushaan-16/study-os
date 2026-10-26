import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribeAuthState((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const user = await authService.loginWithEmail(email, password);
      setCurrentUser(user);
      toast.success('Welcome back!');
      return user;
    } catch (err) {
      toast.error(err.message || 'Failed to sign in');
      throw err;
    }
  };

  const register = async (email, password, displayName, major) => {
    try {
      const user = await authService.registerWithEmail(email, password, displayName, major);
      setCurrentUser(user);
      toast.success('Account created successfully!');
      return user;
    } catch (err) {
      toast.error(err.message || 'Failed to create account');
      throw err;
    }
  };

  const loginAsDemo = async () => {
    try {
      const user = await authService.loginAsDemo();
      setCurrentUser(user);
      toast.success('Signed in as Demo Student');
      return user;
    } catch (err) {
      toast.error('Failed to load demo session');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      toast.success('Signed out');
    } catch (err) {
      toast.error('Logout error');
    }
  };

  const updateProfile = (updates) => {
    const updated = authService.updateUserProfile(updates);
    setCurrentUser(updated);
    toast.success('Profile updated');
    return updated;
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    loginAsDemo,
    logout,
    updateProfile,
    isAuthenticated: Boolean(currentUser),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
