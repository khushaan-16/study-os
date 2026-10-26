import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await firestoreService.getAll(currentUser.uid, 'tasks');
      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        completed: taskData.completed || false,
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        estimatedMinutes: Number(taskData.estimatedMinutes) || 30,
        tags: taskData.tags || [],
      };
      const created = await firestoreService.add(currentUser?.uid, 'tasks', newTask);
      setTasks((prev) => [created, ...prev]);
      toast.success('Task created successfully');
      return created;
    } catch (err) {
      console.error('Failed to add task:', err);
      toast.error('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updated = await firestoreService.update(currentUser?.uid, 'tasks', id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
      return updated;
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await firestoreService.delete(currentUser?.uid, 'tasks', id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task deleted');
      return true;
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error('Failed to delete task');
      throw err;
    }
  };

  const toggleTaskCompletion = async (id) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    const isCompleted = !target.completed;
    const newStatus = isCompleted ? 'completed' : 'todo';
    
    await updateTask(id, {
      completed: isCompleted,
      status: newStatus,
    });

    if (isCompleted) {
      toast.success('Task completed! Keep the momentum going.', { icon: '🎉' });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
