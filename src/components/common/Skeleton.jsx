import React from 'react';

export const Skeleton = ({
  className = '',
  lines = 1,
  rounded = 'rounded-lg',
}) => {
  if (lines > 1) {
    return (
      <div className="space-y-2 w-full">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`animate-pulse bg-slate-200 dark:bg-dark-subtle ${rounded} ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            } h-4 ${className}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-dark-subtle ${rounded} ${className}`}
    />
  );
};

export default Skeleton;
