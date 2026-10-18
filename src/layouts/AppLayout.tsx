import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../components/app/AppSidebar';
import { AppTopbar } from '../components/app/AppTopbar';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#0F172A]">
      {/* Sidebar */}
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AppTopbar onOpenMobileMenu={() => setMobileOpen(true)} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <Outlet />
        </main>

        {/* Quiet workspace bottom notification bar */}
        <footer className="px-4 sm:px-6 py-2.5 border-t border-slate-200/80 bg-white/70 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <span>DataMind Analytics Prototype · Frontend Demonstration Phase</span>
          <span className="font-mono text-slate-400">Snowflake & Gemma: Planned Architecture</span>
        </footer>
      </div>
    </div>
  );
};
