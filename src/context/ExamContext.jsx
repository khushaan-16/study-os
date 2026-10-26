import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExams = useCallback(async () => {
    if (!currentUser) {
      setExams([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await firestoreService.getAll(currentUser.uid, 'exams');
      setExams(data || []);
    } catch (err) {
      console.error('Error fetching exams:', err);
      toast.error('Failed to load exams');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const addExam = async (examData) => {
    try {
      const newExam = {
        ...examData,
        prepProgress: Number(examData.prepProgress) || 0,
        topicsCovered: examData.topicsCovered || [],
        targetGrade: examData.targetGrade || 'A',
      };
      const created = await firestoreService.add(currentUser?.uid, 'exams', newExam);
      setExams((prev) => [created, ...prev]);
      toast.success(`Exam "${created.title}" scheduled`);
      return created;
    } catch (err) {
      console.error('Failed to add exam:', err);
      toast.error('Failed to create exam');
      throw err;
    }
  };

  const updateExam = async (id, updates) => {
    try {
      const updated = await firestoreService.update(currentUser?.uid, 'exams', id, updates);
      setExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
      toast.success('Exam details updated');
      return updated;
    } catch (err) {
      console.error('Failed to update exam:', err);
      toast.error('Failed to update exam');
      throw err;
    }
  };

  const deleteExam = async (id) => {
    try {
      await firestoreService.delete(currentUser?.uid, 'exams', id);
      setExams((prev) => prev.filter((e) => e.id !== id));
      toast.success('Exam removed');
      return true;
    } catch (err) {
      console.error('Failed to delete exam:', err);
      toast.error('Failed to delete exam');
      throw err;
    }
  };

  const updateExamProgress = async (id, prepProgress) => {
    return await updateExam(id, { prepProgress: Math.min(100, Math.max(0, prepProgress)) });
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        loading,
        fetchExams,
        addExam,
        updateExam,
        deleteExam,
        updateExamProgress,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExams = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExams must be used within an ExamProvider');
  }
  return context;
};
