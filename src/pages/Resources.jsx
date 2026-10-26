import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Bookmark } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import ResourceList from '../components/resources/ResourceList';
import ResourceFilters from '../components/resources/ResourceFilters';
import ResourceForm from '../components/resources/ResourceForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const Resources = () => {
  const { currentUser } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const fetchResources = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await firestoreService.getAll(currentUser.uid, 'resources');
      setResources(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingResource) {
        await firestoreService.update(currentUser?.uid, 'resources', editingResource.id, formData);
        setResources((prev) =>
          prev.map((r) => (r.id === editingResource.id ? { ...r, ...formData } : r))
        );
        toast.success('Resource updated');
      } else {
        const created = await firestoreService.add(currentUser?.uid, 'resources', formData);
        setResources((prev) => [created, ...prev]);
        toast.success('Resource saved to library');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save resource');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      await firestoreService.delete(currentUser?.uid, 'resources', deleteTargetId);
      setResources((prev) => prev.filter((r) => r.id !== deleteTargetId));
      setDeleteTargetId(null);
      toast.success('Resource removed');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete resource');
    }
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.author && res.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (res.tags && res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesType = typeFilter === 'all' || res.type === typeFilter;
    const matchesSubject = subjectFilter === 'all' || res.subjectId === subjectFilter;

    return matchesSearch && matchesType && matchesSubject;
  });

  return (
    <PageContainer
      title="Academic Resources & Papers"
      description="Central library for research publications, primary papers, textbooks, and interactive visualizers."
      actions={
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setEditingResource(null);
            setIsFormOpen(true);
          }}
        >
          Add Resource
        </Button>
      }
    >
      <ResourceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        subjectFilter={subjectFilter}
        onSubjectChange={setSubjectFilter}
      />

      <ResourceList
        resources={filteredResources}
        onEditResource={(res) => {
          setEditingResource(res);
          setIsFormOpen(true);
        }}
        onDeleteResource={(id) => setDeleteTargetId(id)}
        onOpenNewResource={() => {
          setEditingResource(null);
          setIsFormOpen(true);
        }}
      />

      <ResourceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingResource(null);
        }}
        initialData={editingResource}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Resource"
        message="Are you sure you want to remove this academic resource from your library?"
      />
    </PageContainer>
  );
};

export default Resources;
