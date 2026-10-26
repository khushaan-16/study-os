import React from 'react';

export const NotePreview = ({ content = '' }) => {
  if (!content) {
    return (
      <div className="text-slate-400 dark:text-dark-muted text-xs italic py-6 text-center">
        Nothing to preview yet. Start writing your markdown notes.
      </div>
    );
  }

  // Simple clean markdown parser for academic notes (handles headers, bold, code, lists)
  const renderFormattedMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // H1
      if (line.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-xl font-extrabold text-slate-900 dark:text-white mt-4 mb-2">
            {line.slice(2)}
          </h1>
        );
      }
      // H2
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-3 mb-1.5">
            {line.slice(3)}
          </h2>
        );
      }
      // H3
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2 mb-1">
            {line.slice(4)}
          </h3>
        );
      }
      // Unordered list
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-slate-700 dark:text-slate-300 my-0.5">
            {line.slice(2)}
          </li>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={idx} className="ml-4 list-decimal text-sm text-slate-700 dark:text-slate-300 my-0.5">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      // Code block lines
      if (line.startsWith('```')) {
        return null;
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm">
      {renderFormattedMarkdown(content)}
    </div>
  );
};

export default NotePreview;
