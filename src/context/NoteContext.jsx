import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    if (!currentUser) {
      setNotes([]);
      setActiveNote(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await firestoreService.getAll(currentUser.uid, 'notes');
      setNotes(data || []);
      if (data && data.length > 0 && !activeNote) {
        setActiveNote(data[0]);
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async (noteData) => {
    try {
      const newNote = {
        title: noteData.title || 'Untitled Note',
        content: noteData.content || '',
        subjectId: noteData.subjectId || '',
        subjectName: noteData.subjectName || 'General',
        category: noteData.category || 'Lecture Notes',
        tags: noteData.tags || [],
        updatedAt: new Date().toISOString(),
      };
      const created = await firestoreService.add(currentUser?.uid, 'notes', newNote);
      setNotes((prev) => [created, ...prev]);
      setActiveNote(created);
      toast.success('Note created');
      return created;
    } catch (err) {
      console.error('Failed to add note:', err);
      toast.error('Failed to create note');
      throw err;
    }
  };

  const updateNote = async (id, updates) => {
    try {
      const payload = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      const updated = await firestoreService.update(currentUser?.uid, 'notes', id, payload);
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...payload } : n)));
      if (activeNote && activeNote.id === id) {
        setActiveNote((prev) => ({ ...prev, ...payload }));
      }
      return updated;
    } catch (err) {
      console.error('Failed to update note:', err);
      toast.error('Failed to save note');
      throw err;
    }
  };

  const deleteNote = async (id) => {
    try {
      await firestoreService.delete(currentUser?.uid, 'notes', id);
      setNotes((prev) => {
        const remaining = prev.filter((n) => n.id !== id);
        if (activeNote && activeNote.id === id) {
          setActiveNote(remaining.length > 0 ? remaining[0] : null);
        }
        return remaining;
      });
      toast.success('Note deleted');
      return true;
    } catch (err) {
      console.error('Failed to delete note:', err);
      toast.error('Failed to delete note');
      throw err;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        activeNote,
        setActiveNote,
        loading,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};
