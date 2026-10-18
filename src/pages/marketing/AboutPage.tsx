import React from 'react';
import { Link } from 'react-router-dom';
import { Database, ArrowRight, ShieldCheck, Cpu, Code2, Compass, Layers, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          ABOUT DATAMIND
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Turning complex structured data into accessible, inspectable answers.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          DataMind is built around a straightforward belief: anyone with a curious analytical question should be able to query structured data without being blocked by SQL syntax or technical barriers.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-white rounded-xl border border-slate-200 p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Product Mission</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Democratizing data inquiry with uncompromising transparency</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Modern organizations store immense volumes of valuable data in cloud data warehouses. However, the ability to extract answers has historically been restricted to data engineers and SQL proficient analysts.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          DataMind bridges this divide by transforming plain-English questions into verified analytical queries, accompanied by interactive visualizations and transparent calculation logic so answers can always be independently audited.
        </p>
      </section>

      {/* Design Principles */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Design Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Truth in Data</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never fabricate numbers. Every answer must derive directly from executed queries against the selected data source.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Inspectable Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every result exposes the exact SQL statement, mathematical groupings, and active filters used to compute it.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Honest Boundaries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When data is missing or a question cannot be mathematically supported, the system explicitly communicates those limitations.
            </p>
          </div>
        </div>
      </section>

      {/* Planned Architecture */}
      <section className="bg-white rounded-xl border border-slate-200 p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Planned Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Google Gemma & Snowflake Foundation</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The planned full-stack implementation separates natural-language cognitive translation from heavy relational computation:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-semibold text-sm text-slate-900">Google Gemma for Reasoning</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interprets semantic user questions, maps natural phrasing onto catalog schemas, validates join paths, and generates ANSI-standard SQL queries.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-semibold text-sm text-slate-900">Snowflake Data Cloud</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Serves as the high-performance relational warehouse, executing read-only analytic operations across billions of structured rows with sub-second latencies.
            </p>
          </div>
        </div>
      </section>

      {/* Clear Frontend Demo Disclosure */}
      <section className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
          <span>Notice: Current Release Phase</span>
        </h3>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
          This project release represents the <strong>frontend demonstration phase</strong> developed for ZeroDay OSS Hacktoberfest 2026. Live Snowflake database connections and live Google Gemma model endpoints are not currently active. The application uses a strictly isolated frontend mock-data layer with deterministic sample data.
        </p>
      </section>

      {/* CTA Box */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900">Ready to explore?</h3>
          <p className="text-xs text-slate-500">Test the workspace with our sample sales dataset.</p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
        >
          <span>Open Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
