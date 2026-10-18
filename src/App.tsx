import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { MarketingLayout } from './layouts/MarketingLayout';
import { AppLayout } from './layouts/AppLayout';

// Marketing pages
import { LandingPage } from './pages/marketing/LandingPage';
import { AboutPage } from './pages/marketing/AboutPage';
import { FeaturesPage } from './pages/marketing/FeaturesPage';

// Workspace pages
import { DashboardPage } from './pages/app/DashboardPage';
import { AskDataPage } from './pages/app/AskDataPage';
import { DataSourcesPage } from './pages/app/DataSourcesPage';
import { QueryHistoryPage } from './pages/app/QueryHistoryPage';
import { InsightsPage } from './pages/app/InsightsPage';
import { QueryInspectorPage } from './pages/app/QueryInspectorPage';
import { SettingsPage } from './pages/app/SettingsPage';

// 404
import { NotFoundPage } from './pages/NotFoundPage';

// Auto scroll to top on path change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Marketing Routes */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
          </Route>

          {/* Application Workspace Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ask" element={<AskDataPage />} />
            <Route path="/sources" element={<DataSourcesPage />} />
            <Route path="/history" element={<QueryHistoryPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/inspector" element={<QueryInspectorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
