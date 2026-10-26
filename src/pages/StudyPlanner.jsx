import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Brain, BookOpen } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PlannerForm from '../components/planner/PlannerForm';
import GeneratedPlan from '../components/planner/GeneratedPlan';
import { geminiService } from '../services/geminiService';
import toast from 'react-hot-toast';

export const StudyPlanner = () => {
  const location = useLocation();
  const initialParams = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [targetSubjectName, setTargetSubjectName] = useState(
    initialParams.subjectName || ''
  );

  const handleGeneratePlan = async (params) => {
    setIsLoading(true);
    setTargetSubjectName(params.subjectName);

    try {
      const plan = await geminiService.generateStudyPlan(params);
      setCurrentPlan(plan);
      toast.success('Study plan successfully synthesized!', { icon: '✨' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate study plan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer
      title="AI Academic Study Planner"
      description="Synthesize an interleaved, evidence-based study sprint tailored to your exam date and course curriculum."
      maxWidth="5xl"
    >
      {!currentPlan ? (
        <PlannerForm
          onSubmit={handleGeneratePlan}
          isLoading={isLoading}
          initialValues={initialParams}
        />
      ) : (
        <GeneratedPlan
          plan={currentPlan}
          subjectName={targetSubjectName}
          onReset={() => setCurrentPlan(null)}
        />
      )}
    </PageContainer>
  );
};

export default StudyPlanner;
