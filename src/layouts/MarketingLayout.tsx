import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingNavbar } from '../components/marketing/MarketingNavbar';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <MarketingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
};
