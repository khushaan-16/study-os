import React, { useState } from 'react';
import { Plus, CheckCircle, Search, Filter } from 'lucide-react';
import TopicItem from './TopicItem';
import Button from '../common/Button';
import EmptyState from '../common/EmptyState';
import ProgressBar from '../common/ProgressBar';

export const TopicList = ({
  topics = [],
  onAddTopic,
  onToggleTopic,
  onUpdateConfidence,
  onDeleteTopic,
}) => {
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [filterConfidence, setFilterConfidence] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = topics.filter((t) => t.completed).length;
  const totalCount = topics.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    onAddTopic?.(newTopicTitle.trim());
    setNewTopicTitle('');
  };

  const filteredTopics = topics.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConfidence =
      filterConfidence === 'all' ||
      (filterConfidence === 'completed' && t.completed) ||
      (filterConfidence === 'uncompleted' && !t.completed) ||
      t.confidence === filterConfidence;
    return matchesSearch && matchesConfidence;
  });

  return (
    <div className="space-y-4">
      {/* Progress Bar & Header */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <span>Curriculum Mastery</span>
          <span>
            {completedCount} of {totalCount} topics mastered ({progressPercent}%)
          </span>
        </div>
        <ProgressBar value={progressPercent} color="primary" />
      </div>

      {/* Add Topic Input Form */}
      <form onSubmit={handleAddSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
          placeholder="Add a new syllabus topic or concept..."
          className="flex-1 px-3.5 py-2 text-sm bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <Button type="submit" size="sm" icon={Plus} disabled={!newTopicTitle.trim()}>
          Add Topic
        </Button>
      </form>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus topics..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'low', label: 'Needs Review' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'Mastered' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterConfidence(tab.id)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterConfidence === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Items List */}
      {filteredTopics.length > 0 ? (
        <div className="space-y-2">
          {filteredTopics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              onToggle={onToggleTopic}
              onUpdateConfidence={onUpdateConfidence}
              onDelete={onDeleteTopic}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery ? 'No matching topics' : 'No topics added yet'}
          description={
            searchQuery
              ? 'Try modifying your search or filter options.'
              : 'Add topics to track your confidence and exam readiness.'
          }
          compact
        />
      )}
    </div>
  );
};

export default TopicList;
