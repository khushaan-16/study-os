import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import StudyTimeChart from '../components/analytics/StudyTimeChart';
import SubjectDistribution from '../components/analytics/SubjectDistribution';
import WeeklyProgressChart from '../components/analytics/WeeklyProgressChart';
import ProductivityHeatmap from '../components/analytics/ProductivityHeatmap';
import CompletionRate from '../components/analytics/CompletionRate';
import WeakTopics from '../components/analytics/WeakTopics';

export const Analytics = () => {
  return (
    <PageContainer
      title="Study Analytics & Insights"
      description="Deep behavioral analytics, subject time distribution, target adherence, and weak topic remediation."
    >
      <div className="space-y-6">
        {/* Top 2 charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudyTimeChart />
          <SubjectDistribution />
        </div>

        {/* Middle 2 charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyProgressChart />
          <CompletionRate />
        </div>

        {/* Heatmap & Weak Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductivityHeatmap />
          <WeakTopics />
        </div>
      </div>
    </PageContainer>
  );
};

export default Analytics;
