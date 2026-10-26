import React, { useState, useEffect } from 'react';
import {
  Save,
  Eye,
  Edit3,
  Heading,
  Bold,
  Italic,
  List,
  Code,
  Tag,
  BookOpen,
} from 'lucide-react';
import NotePreview from './NotePreview';
import Button from '../common/Button';
import { useSubjects } from '../../hooks/useSubjects';

export const NoteEditor = ({
  note,
  onSave,
  onDelete,
}) => {
  const { subjects } = useSubjects();

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || 'Lecture Notes');
  const [subjectId, setSubjectId] = useState(note?.subjectId || '');
  const [tags, setTags] = useState(
    Array.isArray(note?.tags) ? note.tags.join(', ') : ''
  );
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'preview', 'split'
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCategory(note.category || 'Lecture Notes');
      setSubjectId(note.subjectId || '');
      setTags(Array.isArray(note.tags) ? note.tags.join(', ') : '');
    }
  }, [note]);

  const handleSave = async () => {
    if (!note?.id) return;
    setIsSaving(true);
    const selectedSubject = subjects.find((s) => s.id === subjectId);
    const parsedTags = tags
      ? tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    try {
      await onSave(note.id, {
        title,
        content,
        category,
        subjectId,
        subjectName: selectedSubject?.name || 'General',
        tags: parsedTags,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = document.getElementById('note-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected}${suffix}`;
    const newContent =
      content.substring(0, start) + replacement + content.substring(end);

    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 10);
  };

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-400 dark:text-dark-muted">
        <p className="text-sm">Select a note from the left to view or edit.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
      {/* Editor Header / Metadata Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-dark-border space-y-3 bg-slate-50/50 dark:bg-dark-surface/50">
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="flex-1 text-lg sm:text-xl font-bold bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode switcher */}
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-200 dark:bg-dark-subtle border border-slate-300 dark:border-dark-border text-xs">
              <button
                type="button"
                onClick={() => setViewMode('edit')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  viewMode === 'edit'
                    ? 'bg-white dark:bg-dark-card text-brand-500 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-dark-muted'
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-dark-card text-brand-500 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-dark-muted'
                }`}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-white dark:bg-dark-card text-brand-500 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-dark-muted'
                }`}
              >
                Preview
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Save}
              isLoading={isSaving}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Course, Category, Tags selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-200"
            >
              <option value="">General (No subject)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code || s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="Summary">Summary</option>
              <option value="Cheat Sheet">Cheat Sheet</option>
              <option value="Lab">Lab Notes</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags: exam, formulas..."
              className="w-full px-2.5 py-1.5 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 pt-1 border-t border-slate-200/60 dark:border-dark-border/60">
          <button
            type="button"
            onClick={() => insertMarkdown('## ')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-dark-subtle"
            title="Heading"
          >
            <Heading className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('**', '**')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-dark-subtle"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('*', '*')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-dark-subtle"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('- ')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-dark-subtle"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('```\n', '\n```')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-dark-subtle"
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor / Preview Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div
            className={`h-full ${
              viewMode === 'split' ? 'w-1/2 border-r border-slate-200 dark:border-dark-border' : 'w-full'
            }`}
          >
            <textarea
              id="note-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notes here in Markdown format..."
              className="w-full h-full p-4 text-sm bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none font-mono leading-relaxed"
            />
          </div>
        )}

        {/* Preview Pane */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div
            className={`h-full p-4 sm:p-6 overflow-y-auto ${
              viewMode === 'split' ? 'w-1/2 bg-slate-50/40 dark:bg-dark-surface/40' : 'w-full'
            }`}
          >
            <NotePreview content={content} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
