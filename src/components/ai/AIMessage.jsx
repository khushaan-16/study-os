import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AIMessage = ({ message }) => {
  const { currentUser } = useAuth();
  const [copied, setCopied] = useState(false);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic markdown formatter for academic responses
  const renderFormatted = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={i} className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h5 key={i} className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 mb-0.5">
            {line.replace('#### ', '')}
          </h5>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={i} className="ml-4 list-disc text-xs sm:text-sm my-0.5 leading-relaxed">
            {line.slice(2)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 list-decimal text-xs sm:text-sm my-0.5 leading-relaxed">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={i} className="h-1.5" />;
      }
      return (
        <p key={i} className="text-xs sm:text-sm leading-relaxed my-0.5">
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-3 my-3 group ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      {/* Avatar */}
      {isUser ? (
        <img
          src={
            currentUser?.photoURL ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
          }
          alt="Student"
          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-300 dark:ring-dark-border"
        />
      ) : (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
          isUser
            ? 'bg-brand-600 text-white rounded-tr-xs'
            : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 rounded-tl-xs shadow-xs'
        }`}
      >
        <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
          {isUser ? message.content : renderFormatted(message.content)}
        </div>

        {/* Copy button */}
        {!isUser && (
          <div className="flex items-center justify-end mt-2 pt-2 border-t border-slate-100 dark:border-dark-border/60">
            <button
              onClick={handleCopy}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMessage;
