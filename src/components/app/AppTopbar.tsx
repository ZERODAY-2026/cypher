import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MessageSquare, Database, AlertCircle } from 'lucide-react';
import { SAMPLE_DATASET_META } from '../../data/sampleSales';

interface AppTopbarProps {
  onOpenMobileMenu: () => void;
}

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Explore your data overview and recent analytical activity' },
  '/ask': { title: 'Ask Data', subtitle: 'Ask natural-language analytical questions across structured tables' },
  '/sources': { title: 'Data Sources', subtitle: 'Manage data connections and inspect database schemas' },
  '/history': { title: 'Query History', subtitle: 'Review, search, and re-run historical queries' },
  '/insights': { title: 'Insights & Charts', subtitle: 'Explore aggregated visualizations and export datasets' },
  '/inspector': { title: 'Query Inspector', subtitle: 'Inspect generated SQL, execution plans, and analytical evidence' },
  '/settings': { title: 'Settings', subtitle: 'Workspace preferences, display configuration, and disclosures' }
};

export const AppTopbar: React.FC<AppTopbarProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const currentRoute = ROUTE_TITLES[location.pathname] || {
    title: 'DataMind Workspace',
    subtitle: 'AI-Powered Natural Language Analytics'
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between shrink-0">
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Left: Mobile hamburger + Clean Breadcrumb location */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 truncate">
            <span className="text-slate-400">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate">{currentRoute.title}</span>
          </div>
        </div>

        {/* Right: Dataset selector & Honest Demo Mode badge & Quick Ask button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dataset Chip */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-700">
            <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-medium truncate max-w-[180px]">{SAMPLE_DATASET_META.name}</span>
          </div>

          {/* Demo Mode Notice */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-medium">
            <AlertCircle className="w-3 h-3 shrink-0 text-amber-600" />
            <span className="whitespace-nowrap">Demo Mode</span>
          </div>

          {/* Quick Ask CTA (if not on /ask) */}
          {location.pathname !== '/ask' && (
            <Link
              to="/ask"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-2xs transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ask Question</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
