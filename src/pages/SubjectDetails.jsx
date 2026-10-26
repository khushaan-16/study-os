import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckSquare,
  FileText,
  GraduationCap,
  Plus,
  ArrowRight,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SubjectHeader from '../components/subjects/SubjectHeader';
import SubjectStats from '../components/subjects/SubjectStats';
import TopicList from '../components/subjects/TopicList';
import SubjectForm from '../components/subjects/SubjectForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useSubjects } from '../hooks/useSubjects';
import { useTasks } from '../hooks/useTasks';
import { useNotes } from '../hooks/useNotes';
import { useExams } from '../hooks/useExams';

export const SubjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    subjects,
    updateSubject,
    deleteSubject,
    addTopic,
    toggleTopic,
    updateTopicConfidence,
    deleteTopic,
  } = useSubjects();

  const { tasks, toggleTaskCompletion } = useTasks();
  const { notes } = useNotes();
  const { exams } = useExams();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <PageContainer>
        <EmptyState
          icon={BookOpen}
          title="Subject Not Found"
          description="The requested course does not exist or may have been deleted."
          actionLabel="Return to Subjects"
          onAction={() => navigate('/subjects')}
        />
      </PageContainer>
    );
  }

  const subjectTasks = tasks.filter((t) => t.subjectId === id);
  const subjectNotes = notes.filter((n) => n.subjectId === id);
  const subjectExams = exams.filter((e) => e.subjectId === id);

  const handleDeleteSubject = async () => {
    await deleteSubject(id);
    navigate('/subjects');
  };

  return (
    <PageContainer maxWidth="6xl">
      {/* Subject Header */}
      <SubjectHeader
        subject={subject}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={() => setShowDeleteConfirm(true)}
      />

      {/* Subject Stats Row */}
      <SubjectStats subject={subject} />

      {/* Main Grid: Syllabus Topics vs Course Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Syllabus Topics */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Syllabus & Concept Breakdown
            </h3>
            <TopicList
              topics={subject.topics || []}
              onAddTopic={(title) => addTopic(id, title)}
              onToggleTopic={(topicId) => toggleTopic(id, topicId)}
              onUpdateConfidence={(topicId, conf) =>
                updateTopicConfidence(id, topicId, conf)
              }
              onDeleteTopic={(topicId) => deleteTopic(id, topicId)}
            />
          </div>
        </div>

        {/* Right 1 Col: Linked Assignments, Notes & Exams */}
        <div className="space-y-6">
          {/* Linked Assignments */}
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-dark-muted flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-brand-500" />
                <span>Course Tasks ({subjectTasks.length})</span>
              </h4>
              <Link
                to="/tasks"
                className="text-[11px] font-semibold text-brand-500 hover:underline"
              >
                View
              </Link>
            </div>

            {subjectTasks.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-dark-muted italic py-3 text-center">
                No tasks assigned to this course.
              </p>
            ) : (
              <div className="space-y-2">
                {subjectTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs flex items-center justify-between gap-2"
                  >
                    <span
                      className={`truncate ${
                        task.completed
                          ? 'line-through text-slate-400 dark:text-dark-muted'
                          : 'text-slate-800 dark:text-slate-200 font-medium'
                      }`}
                    >
                      {task.title}
                    </span>
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="text-[10px] text-brand-500 font-semibold hover:underline shrink-0"
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Linked Notes */}
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-dark-muted flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-500" />
                <span>Course Notes ({subjectNotes.length})</span>
              </h4>
              <Link
                to="/notes"
                className="text-[11px] font-semibold text-brand-500 hover:underline"
              >
                Notes
              </Link>
            </div>

            {subjectNotes.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-dark-muted italic py-3 text-center">
                No notes created for this course yet.
              </p>
            ) : (
              <div className="space-y-2">
                {subjectNotes.slice(0, 3).map((note) => (
                  <Link
                    key={note.id}
                    to="/notes"
                    className="block p-2.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:border-brand-500/40 text-xs transition-colors"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white truncate">
                      {note.title}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-dark-muted mt-0.5">
                      {note.category}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Linked Exams */}
          {subjectExams.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-dark-muted flex items-center gap-1.5 mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Upcoming Milestones</span>
              </h4>
              <div className="space-y-2">
                {subjectExams.map((e) => (
                  <Link
                    key={e.id}
                    to="/exams"
                    className="block p-2.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white truncate">
                      {e.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Date: {e.date} • Prep: {e.prepProgress || 0}%
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Subject Modal */}
      <SubjectForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={subject}
        onSubmit={(updates) => updateSubject(subject.id, updates)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteSubject}
        title="Delete Course"
        message="Are you sure you want to delete this course? All topics will be lost."
      />
    </PageContainer>
  );
};

export default SubjectDetails;
