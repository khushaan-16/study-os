import React, { useState } from 'react';
import { Plus, FileText, Search } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import NoteCard from '../components/notes/NoteCard';
import NoteEditor from '../components/notes/NoteEditor';
import NoteFilters from '../components/notes/NoteFilters';
import NoteSearch from '../components/notes/NoteSearch';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { useNotes } from '../hooks/useNotes';
import { useSubjects } from '../hooks/useSubjects';

export const Notes = () => {
  const { notes, activeNote, setActiveNote, addNote, updateNote, deleteNote } =
    useNotes();
  const { subjects } = useSubjects();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.content && n.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.tags && n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      categoryFilter === 'all' || n.category === categoryFilter;

    const matchesSubject =
      subjectFilter === 'all' || n.subjectId === subjectFilter;

    return matchesSearch && matchesCategory && matchesSubject;
  });

  const handleCreateNewNote = async () => {
    const created = await addNote({
      title: 'Untitled Note',
      content: '# New Lecture Note\n\n- Key Point 1\n- Key Point 2\n',
      category: 'Lecture Notes',
      subjectId: subjects[0]?.id || '',
      subjectName: subjects[0]?.name || 'General',
    });
    setActiveNote(created);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteNote(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <PageContainer
      title="Knowledge Base & Notes"
      description="Markdown academic notes with live preview, course categorization, and formula support."
      maxWidth="full"
      actions={
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleCreateNewNote}
        >
          New Note
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-210px)] min-h-[550px]">
        {/* Left Column: Note List & Search (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-4 shadow-sm overflow-hidden">
          <div className="space-y-3 mb-3">
            <NoteSearch
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
            <NoteFilters
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              subjectFilter={subjectFilter}
              onSubjectChange={setSubjectFilter}
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isActive={activeNote?.id === note.id}
                  onSelect={(n) => setActiveNote(n)}
                  onDelete={(id) => setDeleteTargetId(id)}
                />
              ))
            ) : (
              <EmptyState
                icon={FileText}
                title="No notes found"
                description="Create a note to start writing summary sheets."
                actionLabel="Create Note"
                onAction={handleCreateNewNote}
                compact
              />
            )}
          </div>
        </div>

        {/* Right Column: Active Note Editor & Preview (8 Cols) */}
        <div className="lg:col-span-8 h-full">
          <NoteEditor
            note={activeNote}
            onSave={updateNote}
            onDelete={(id) => setDeleteTargetId(id)}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Note"
        message="Are you sure you want to permanently delete this note?"
      />
    </PageContainer>
  );
};

export default Notes;
