import React from 'react';
import { Link } from 'react-router-dom';
import { Database, ArrowUpRight } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Database className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-slate-900">DataMind</span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              An AI-powered natural language data analytics workspace that lets anyone ask questions about structured data in plain English and inspect verifiable answers.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              ZeroDay OSS Hacktoberfest 2026 · Problem Statement 1
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/features" className="hover:text-blue-600 transition-colors">
                  Features & Capabilities
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About & Architecture
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                  Launch Demo Workspace
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Workspace Routes */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Demo Workspace</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/ask" className="hover:text-blue-600 transition-colors">
                  Ask Data
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-blue-600 transition-colors">
                  Data Sources (Snowflake)
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-blue-600 transition-colors">
                  Insights & Visualizations
                </Link>
              </li>
              <li>
                <Link to="/inspector" className="hover:text-blue-600 transition-colors">
                  Query Inspector
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Honest Prototype Notice */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 DataMind. Open source demonstration prototype.</p>
          <p className="text-slate-500">
            Frontend demonstration only. Live Snowflake and Google Gemma AI integrations are planned and not currently active.
          </p>
        </div>
      </div>
    </footer>
  );
};
