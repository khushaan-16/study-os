import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import CalendarView from '../components/calendar/CalendarView';

export const Calendar = () => {
  return (
    <PageContainer
      title="Academic Schedule"
      description="Unified monthly and weekly view of assignment deadlines, exam dates, and focus blocks."
    >
      <CalendarView />
    </PageContainer>
  );
};

export default Calendar;
