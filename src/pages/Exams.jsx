import React, { useState } from 'react';
import { Plus, GraduationCap } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import ExamCard from '../components/exams/ExamCard';
import ExamForm from '../components/exams/ExamForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useExams } from '../hooks/useExams';

export const Exams = () => {
  const { exams, addExam, updateExam, deleteExam, updateExamProgress } = useExams();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleCreateOrUpdate = async (formData) => {
    if (editingExam) {
      await updateExam(editingExam.id, formData);
    } else {
      await addExam(formData);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteExam(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  // Sort exams by date ascending
  const sortedExams = [...exams].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <PageContainer
      title="Exams & Milestones"
      description="Track upcoming midterms, finals, weights, syllabus coverage, and target grades."
      actions={
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setEditingExam(null);
            setIsFormOpen(true);
          }}
        >
          Schedule Exam
        </Button>
      }
    >
      {sortedExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onEdit={(ex) => {
                setEditingExam(ex);
                setIsFormOpen(true);
              }}
              onDelete={(id) => setDeleteTargetId(id)}
              onUpdateProgress={updateExamProgress}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="No exams scheduled"
          description="Register your midterm and final exam dates to activate countdowns and readiness scores."
          actionLabel="Schedule First Exam"
          onAction={() => {
            setEditingExam(null);
            setIsFormOpen(true);
          }}
        />
      )}

      <ExamForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingExam(null);
        }}
        initialData={editingExam}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Exam"
        message="Are you sure you want to remove this exam record?"
      />
    </PageContainer>
  );
};

export default Exams;
