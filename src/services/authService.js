import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

const DEMO_USER_KEY = 'studyos_demo_user';

const defaultDemoUser = {
  uid: 'demo-student-001',
  email: 'alex.chen@university.edu',
  displayName: 'Alex Chen',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  academicYear: 'Senior Year',
  major: 'Computer Science & AI',
  university: 'Tech Institute of Science',
  gpa: '3.92',
  isDemo: true,
};

export const authService = {
  async loginWithEmail(email, password) {
    if (isFirebaseConfigured && auth) {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      return userCred.user;
    }
    // Local / Demo mode fallback
    const user = {
      uid: 'user-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      isDemo: true,
      major: 'Computer Science',
      academicYear: 'Junior',
      gpa: '3.85'
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    return user;
  },

  async registerWithEmail(email, password, displayName, major = 'Computer Science') {
    if (isFirebaseConfigured && auth) {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCred.user, { displayName });
      }
      return userCred.user;
    }
    const user = {
      uid: 'user-' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
      major,
      academicYear: 'Sophomore',
      gpa: '3.75',
      isDemo: true,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    return user;
  },

  async loginAsDemo() {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(defaultDemoUser));
    return defaultDemoUser;
  },

  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(DEMO_USER_KEY);
    return true;
  },

  async resetPassword(email) {
    if (isFirebaseConfigured && auth) {
      return await sendPasswordResetEmail(auth, email);
    }
    return true;
  },

  subscribeAuthState(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          callback({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL,
            major: 'Computer Science & AI',
            academicYear: 'Senior Year',
            gpa: '3.92',
            isDemo: false
          });
        } else {
          // Check local demo storage
          const stored = localStorage.getItem(DEMO_USER_KEY);
          callback(stored ? JSON.parse(stored) : null);
        }
      });
    }

    // Local / Demo storage listener
    const stored = localStorage.getItem(DEMO_USER_KEY);
    callback(stored ? JSON.parse(stored) : defaultDemoUser);
    return () => {};
  },

  getCurrentUser() {
    if (isFirebaseConfigured && auth && auth.currentUser) {
      return auth.currentUser;
    }
    const stored = localStorage.getItem(DEMO_USER_KEY);
    return stored ? JSON.parse(stored) : defaultDemoUser;
  },

  updateUserProfile(updates) {
    const current = this.getCurrentUser();
    const updated = { ...current, ...updates };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated));
    return updated;
  }
};
