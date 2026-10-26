import React from 'react';
import { Bookmark } from 'lucide-react';
import ResourceCard from './ResourceCard';
import EmptyState from '../common/EmptyState';

export const ResourceList = ({
  resources = [],
  onEditResource,
  onDeleteResource,
  onOpenNewResource,
}) => {
  if (resources.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No resources found"
        description="Save textbooks, research papers, and visualizations to build your academic library."
        actionLabel={onOpenNewResource ? 'Add First Resource' : undefined}
        onAction={onOpenNewResource}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((res) => (
        <ResourceCard
          key={res.id}
          resource={res}
          onEdit={onEditResource}
          onDelete={onDeleteResource}
        />
      ))}
    </div>
  );
};

export default ResourceList;
