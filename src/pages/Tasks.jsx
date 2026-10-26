import React, { useState } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskForm from '../components/tasks/TaskForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import { useTasks } from '../hooks/useTasks';

export const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, completed
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate'); // dueDate, priority, title

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter & Sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.subjectName && task.subjectName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.tags && task.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'pending' && !task.completed) ||
        (statusFilter === 'completed' && task.completed);

      const matchesSubject =
        subjectFilter === 'all' || task.subjectId === subjectFilter;

      return matchesSearch && matchesStatus && matchesSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      return a.title.localeCompare(b.title);
    });

  const handleCreateOrUpdate = async (formData) => {
    if (editingTask) {
      await updateTask(editingTask.id, formData);
    } else {
      await addTask(formData);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteTask(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSubjectFilter('all');
    setSortBy('dueDate');
  };

  return (
    <PageContainer
      title="Tasks & Assignments"
      description="Manage assignments, lab deliverables, homework deadlines, and problem sets."
      actions={
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
        >
          New Task
        </Button>
      }
    >
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        subjectFilter={subjectFilter}
        onSubjectChange={setSubjectFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
      />

      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTaskCompletion}
        onEditTask={(task) => {
          setEditingTask(task);
          setIsFormOpen(true);
        }}
        onDeleteTask={(id) => setDeleteTargetId(id)}
        onOpenNewTask={() => {
          setEditingTask(null);
          setIsFormOpen(true);
        }}
      />

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        initialData={editingTask}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task?"
      />
    </PageContainer>
  );
};

export default Tasks;
