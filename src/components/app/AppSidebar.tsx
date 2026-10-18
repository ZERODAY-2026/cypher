import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Database,
  History,
  BarChart3,
  Code2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Ask Data', path: '/ask', icon: MessageSquare },
  { name: 'Data Sources', path: '/sources', icon: Database },
  { name: 'Query History', path: '/history', icon: History },
  { name: 'Insights & Charts', path: '/insights', icon: BarChart3 },
  { name: 'Query Inspector', path: '/inspector', icon: Code2 },
  { name: 'Settings', path: '/settings', icon: Settings }
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-all duration-200 flex flex-col justify-between shrink-0 ${
          collapsed ? 'w-18' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Top brand header */}
        <div>
          <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200">
            <Link
              to="/"
              className="flex items-center gap-2.5 overflow-hidden text-slate-900 group"
              onClick={onCloseMobile}
              title="Return to DataMind Landing Page"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:bg-blue-700 transition-colors">
                <Database className="w-4 h-4" />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight">DataMind</span>
                  <span className="text-[10px] text-slate-400 font-mono">WORKSPACE</span>
                </div>
              )}
            </Link>

            {/* Desktop collapse toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden md:flex p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom workspace status */}
        <div className="p-3 border-t border-slate-200">
          {/* Demo status box */}
          {!collapsed ? (
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Environment</span>
                <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                  Demo Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Sample dataset active. Live Snowflake & Gemma AI not connected.
              </p>
            </div>
          ) : (
            <div className="flex justify-center p-2" title="Demo Mode active">
              <Info className="w-4 h-4 text-amber-600" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
