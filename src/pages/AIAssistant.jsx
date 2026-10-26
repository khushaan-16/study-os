import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import AIChat from '../components/ai/AIChat';

export const AIAssistant = () => {
  return (
    <PageContainer
      title="AI Academic Mentor"
      description="Interactive STEM concept explainer, derivation tutor, and mock exam question generator powered by Google Gemini."
      maxWidth="5xl"
    >
      <AIChat />
    </PageContainer>
  );
};

export default AIAssistant;
