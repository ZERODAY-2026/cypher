import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Home, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] p-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6">
        <Database className="w-6 h-6" />
      </div>

      <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest mb-2">
        404 · PAGE NOT FOUND
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        This route does not exist.
      </h1>
      <p className="mt-3 text-sm text-slate-600 max-w-md leading-relaxed">
        The page you are looking for may have been moved or is outside the DataMind routing map.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Open Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
