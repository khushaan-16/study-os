import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = useCallback(async () => {
    if (!currentUser) {
      setSubjects([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await firestoreService.getAll(currentUser.uid, 'subjects');
      setSubjects(data || []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const addSubject = async (subjectData) => {
    try {
      const newSubject = {
        ...subjectData,
        topics: subjectData.topics || [],
        totalStudyHours: subjectData.totalStudyHours || 0,
      };
      const created = await firestoreService.add(currentUser?.uid, 'subjects', newSubject);
      setSubjects((prev) => [created, ...prev]);
      toast.success(`Subject "${created.name}" created!`);
      return created;
    } catch (err) {
      console.error('Failed to add subject:', err);
      toast.error('Failed to create subject');
      throw err;
    }
  };

  const updateSubject = async (id, updates) => {
    try {
      const updated = await firestoreService.update(currentUser?.uid, 'subjects', id, updates);
      setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
      toast.success('Subject updated');
      return updated;
    } catch (err) {
      console.error('Failed to update subject:', err);
      toast.error('Failed to update subject');
      throw err;
    }
  };

  const deleteSubject = async (id) => {
    try {
      await firestoreService.delete(currentUser?.uid, 'subjects', id);
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      toast.success('Subject deleted');
      return true;
    } catch (err) {
      console.error('Failed to delete subject:', err);
      toast.error('Failed to delete subject');
      throw err;
    }
  };

  const addTopic = async (subjectId, topicTitle, confidence = 'medium') => {
    const targetSubject = subjects.find((s) => s.id === subjectId);
    if (!targetSubject) return;

    const newTopic = {
      id: `top-${Date.now()}`,
      title: topicTitle,
      completed: false,
      confidence,
    };

    const updatedTopics = [...(targetSubject.topics || []), newTopic];
    await updateSubject(subjectId, { topics: updatedTopics });
  };

  const toggleTopic = async (subjectId, topicId) => {
    const targetSubject = subjects.find((s) => s.id === subjectId);
    if (!targetSubject) return;

    const updatedTopics = targetSubject.topics.map((t) =>
      t.id === topicId ? { ...t, completed: !t.completed } : t
    );
    await updateSubject(subjectId, { topics: updatedTopics });
  };

  const updateTopicConfidence = async (subjectId, topicId, confidence) => {
    const targetSubject = subjects.find((s) => s.id === subjectId);
    if (!targetSubject) return;

    const updatedTopics = targetSubject.topics.map((t) =>
      t.id === topicId ? { ...t, confidence } : t
    );
    await updateSubject(subjectId, { topics: updatedTopics });
  };

  const deleteTopic = async (subjectId, topicId) => {
    const targetSubject = subjects.find((s) => s.id === subjectId);
    if (!targetSubject) return;

    const updatedTopics = targetSubject.topics.filter((t) => t.id !== topicId);
    await updateSubject(subjectId, { topics: updatedTopics });
  };

  const addStudyHours = async (subjectId, hours) => {
    const targetSubject = subjects.find((s) => s.id === subjectId);
    if (!targetSubject) return;
    const newHours = Number(((targetSubject.totalStudyHours || 0) + hours).toFixed(1));
    await updateSubject(subjectId, { totalStudyHours: newHours });
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        loading,
        fetchSubjects,
        addSubject,
        updateSubject,
        deleteSubject,
        addTopic,
        toggleTopic,
        updateTopicConfidence,
        deleteTopic,
        addStudyHours,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubjects = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectProvider');
  }
  return context;
};
