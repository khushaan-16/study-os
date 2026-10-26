import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileSidebar from './MobileSidebar';
import { useStudySessions } from '../../hooks/useStudySessions';
import SessionSummary from '../timer/SessionSummary';

export const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { showSummaryModal, setShowSummaryModal, completedSessionData, logSession } =
    useStudySessions();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text">
      {/* Desktop Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Mobile Drawer */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Navbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Session Completion Modal */}
      {showSummaryModal && completedSessionData && (
        <SessionSummary
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          sessionData={completedSessionData}
          onSave={logSession}
        />
      )}
    </div>
  );
};

export default MainLayout;
