import React from 'react';

export const PageContainer = ({
  title,
  description,
  actions,
  children,
  maxWidth = '7xl',
  className = '',
}) => {
  const maxWidths = {
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 mx-auto w-full ${maxWidths[maxWidth] || maxWidths['7xl']} ${className}`}>
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-2">
          <div>
            {title && (
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-muted mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
