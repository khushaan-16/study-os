import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SubjectCard from '../components/subjects/SubjectCard';
import SubjectForm from '../components/subjects/SubjectForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import { useSubjects } from '../hooks/useSubjects';

export const Subjects = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects();

  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.instructor && s.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateOrUpdate = async (formData) => {
    if (editingSubject) {
      await updateSubject(editingSubject.id, formData);
    } else {
      await addSubject(formData);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteSubject(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <PageContainer
      title="Enrolled Subjects"
      description="Track coursework syllabi, atomic concept mastery, and accumulated study time."
      actions={
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setEditingSubject(null);
            setIsFormOpen(true);
          }}
        >
          Add Subject
        </Button>
      }
    >
      {/* Search Bar */}
      <div className="mb-6 max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search courses by code, name, or professor..."
        />
      </div>

      {/* Grid of Subject Cards */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub) => (
            <SubjectCard
              key={sub.id}
              subject={sub}
              onEdit={(subject) => {
                setEditingSubject(subject);
                setIsFormOpen(true);
              }}
              onDelete={(id) => setDeleteTargetId(id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title={searchQuery ? 'No matching courses found' : 'No subjects enrolled yet'}
          description={
            searchQuery
              ? 'Try modifying your search criteria.'
              : 'Add your courses to begin breaking down topics and tracking mastery.'
          }
          actionLabel="Add Course"
          onAction={() => {
            setEditingSubject(null);
            setIsFormOpen(true);
          }}
        />
      )}

      {/* Subject Modal Form */}
      <SubjectForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingSubject(null);
        }}
        initialData={editingSubject}
        onSubmit={handleCreateOrUpdate}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Subject"
        message="Are you sure you want to remove this subject? All associated syllabus topics will be permanently removed."
      />
    </PageContainer>
  );
};

export default Subjects;
