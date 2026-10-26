import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  initialSubjects,
  initialTasks,
  initialExams,
  initialStudySessions,
  initialNotes,
  initialResources
} from './mockData';

// StudyOS Data Service (Empty / Clean Slate by default)
const LOCAL_STORAGE_PREFIX = 'studyos_data_';
const CLEANED_FLAG = 'studyos_clean_slate_applied_v2';

const getInitialDataFor = (col) => {
  // Clean slate by default - no mock or sample data
  return [];
};

const getLocalCollection = (userId, col) => {
  const key = `${LOCAL_STORAGE_PREFIX}${userId || 'demo'}_${col}`;
  
  // If clean slate hasn't been enforced yet, clear out old mock data
  if (!localStorage.getItem(CLEANED_FLAG)) {
    const collections = ['subjects', 'tasks', 'exams', 'studySessions', 'notes', 'resources', 'plans'];
    collections.forEach((c) => {
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}demo_${c}`);
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}demo-student-001_${c}`);
    });
    localStorage.setItem(CLEANED_FLAG, 'true');
  }

  const stored = localStorage.getItem(key);
  if (!stored) {
    const init = getInitialDataFor(col);
    localStorage.setItem(key, JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const setLocalCollection = (userId, col, data) => {
  const key = `${LOCAL_STORAGE_PREFIX}${userId || 'demo'}_${col}`;
  localStorage.setItem(key, JSON.stringify(data));
};

export const firestoreService = {
  // Get all items in collection
  async getAll(userId, colName) {
    if (isFirebaseConfigured && db && userId && !userId.startsWith('demo')) {
      try {
        const colRef = collection(db, 'users', userId, colName);
        const snapshot = await getDocs(colRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (items.length > 0) return items;
      } catch (err) {
        console.warn(`Firestore read error on ${colName}, falling back to local:`, err);
      }
    }
    return getLocalCollection(userId, colName);
  },

  // Add item
  async add(userId, colName, item) {
    const newItem = {
      ...item,
      id: item.id || `${colName.slice(0, 3)}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db && userId && !userId.startsWith('demo')) {
      try {
        const colRef = collection(db, 'users', userId, colName);
        const docRef = await addDoc(colRef, newItem);
        newItem.id = docRef.id;
      } catch (err) {
        console.warn(`Firestore add error on ${colName}:`, err);
      }
    }

    const localItems = getLocalCollection(userId, colName);
    const updated = [newItem, ...localItems];
    setLocalCollection(userId, colName, updated);
    return newItem;
  },

  // Update item
  async update(userId, colName, id, updates) {
    const localItems = getLocalCollection(userId, colName);
    const index = localItems.findIndex(i => i.id === id);
    if (index === -1) return null;

    const updatedItem = {
      ...localItems[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localItems[index] = updatedItem;
    setLocalCollection(userId, colName, localItems);

    if (isFirebaseConfigured && db && userId && !userId.startsWith('demo')) {
      try {
        const docRef = doc(db, 'users', userId, colName, id);
        await updateDoc(docRef, updates);
      } catch (err) {
        console.warn(`Firestore update error on ${colName}/${id}:`, err);
      }
    }

    return updatedItem;
  },

  // Delete item
  async delete(userId, colName, id) {
    const localItems = getLocalCollection(userId, colName);
    const filtered = localItems.filter(i => i.id !== id);
    setLocalCollection(userId, colName, filtered);

    if (isFirebaseConfigured && db && userId && !userId.startsWith('demo')) {
      try {
        const docRef = doc(db, 'users', userId, colName, id);
        await deleteDoc(docRef);
      } catch (err) {
        console.warn(`Firestore delete error on ${colName}/${id}:`, err);
      }
    }

    return true;
  },

  // Completely wipe all local data for a clean slate
  clearAllData(userId) {
    const collections = ['subjects', 'tasks', 'exams', 'studySessions', 'notes', 'resources', 'plans'];
    collections.forEach((col) => {
      const key = `${LOCAL_STORAGE_PREFIX}${userId || 'demo'}_${col}`;
      localStorage.setItem(key, JSON.stringify([]));
    });
    localStorage.setItem(CLEANED_FLAG, 'true');
  },

  // Reset / Wipe data
  resetDemoData(userId) {
    this.clearAllData(userId);
  },

  // Optional: Explicitly load sample data if desired
  loadSampleData(userId) {
    const collections = {
      subjects: initialSubjects,
      tasks: initialTasks,
      exams: initialExams,
      studySessions: initialStudySessions,
      notes: initialNotes,
      resources: initialResources,
    };
    Object.entries(collections).forEach(([col, data]) => {
      const key = `${LOCAL_STORAGE_PREFIX}${userId || 'demo'}_${col}`;
      localStorage.setItem(key, JSON.stringify(data));
    });
  }
};
