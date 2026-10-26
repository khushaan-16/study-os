import React, { useState, useRef, useEffect } from 'react';
import { Bot, RotateCcw, Sparkles } from 'lucide-react';
import AIMessage from './AIMessage';
import AIInput from './AIInput';
import TypingIndicator from './TypingIndicator';
import SuggestedPrompt from './SuggestedPrompt';
import { geminiService } from '../../services/geminiService';
import { useSubjects } from '../../hooks/useSubjects';
import { useExams } from '../../hooks/useExams';

const INITIAL_PROMPTS = [
  'Explain Raft leader election & randomized timeouts',
  'How do Transformers compute scaled dot-product attention?',
  'Give me an interleaved 5-day study strategy for my Midterm',
  'Break down the Max-Flow Min-Cut theorem simply',
];

export const AIChat = () => {
  const { subjects } = useSubjects();
  const { exams } = useExams();

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I am your **StudyOS Academic Mentor**.
I have live access to your enrolled courses, syllabus topics, and upcoming exam schedules.

How can I help you master your coursework today? Ask me to break down a difficult proof, generate practice questions, or explain complex algorithmic trade-offs.`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (userText) => {
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const subjectNames = subjects.map((s) => s.name).join(', ');
      const upcomingExams = exams
        .map((e) => `${e.title} (${e.date})`)
        .join('; ');

      const aiReply = await geminiService.chatWithAI(userText, {
        subjectNames,
        upcomingExams,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: aiReply || 'Sorry, I could not process that request. Please try again.',
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'An error occurred while connecting to Gemini AI. Please check your API key in Settings.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Conversation reset. What concept would you like to explore next?',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-2xl bg-slate-50/50 dark:bg-dark-surface/50 border border-slate-200 dark:border-dark-border overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>StudyOS AI Academic Mentor</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-500">
                Gemini Powered
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-dark-muted">
              Active context: {subjects.length} courses loaded
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-2">
        {messages.map((msg, idx) => (
          <AIMessage key={idx} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts & Input Box */}
      <div className="p-4 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-dark-border space-y-3">
        {messages.length <= 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {INITIAL_PROMPTS.map((prompt, i) => (
              <SuggestedPrompt
                key={i}
                prompt={prompt}
                onClick={handleSend}
              />
            ))}
          </div>
        )}

        <AIInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
};

export default AIChat;
