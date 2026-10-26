import React from 'react';
import { CheckSquare } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from '../common/EmptyState';

export const TaskList = ({
  tasks = [],
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onOpenNewTask,
  emptyTitle = 'No tasks found',
  emptyDescription = 'You have no assignments or tasks matching the current view.',
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CheckSquare}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onOpenNewTask ? 'Create New Task' : undefined}
        onAction={onOpenNewTask}
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
