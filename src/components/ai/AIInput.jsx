import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowUp } from 'lucide-react';

export const AIInput = ({
  onSend,
  disabled = false,
  placeholder = 'Ask anything about your coursework, proofs, or exam strategy...',
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [text]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="relative p-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm focus-within:border-brand-500 transition-colors">
      <textarea
        ref={textareaRef}
        rows="1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-3 pr-12 py-2 text-sm bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none max-h-36"
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        className="absolute right-3.5 bottom-3 p-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs transition-all"
        title="Send prompt (Enter)"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

export default AIInput;
