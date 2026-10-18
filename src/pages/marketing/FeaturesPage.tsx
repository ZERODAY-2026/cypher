import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Database,
  Code2,
  BarChart3,
  Layers,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Download
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          SYSTEM CAPABILITIES
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Everything you need to turn raw tables into clear, auditable answers.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Explore the tools and architectural capabilities designed into DataMind. Compare currently active frontend demo features with planned full-stack integrations.
        </p>
      </div>

      {/* Feature 1: Natural-Language Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        <div className="lg:col-span-6 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Natural-Language Question Composer</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Compose analytical inquiries naturally in plain English. The interface provides guided prompt chips, recent query context, and responsive validation to keep your exploration flowing smoothly.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free-form text input with instant prompt suggestion chips</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Multi-turn session history and past query rerun controls</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-2">Interface Preview: Composer</div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Which products generated the highest revenue?</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-600">
                Compare sales by region
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-600">
                Show monthly revenue trends
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: Query Transparency & SQL Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-200">
        <div className="lg:col-span-6 bg-[#0F172A] rounded-xl p-5 shadow-sm text-slate-200 font-mono text-xs overflow-x-auto order-2 lg:order-1">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
            <span>Query Inspector View</span>
            <span>ANSI SQL</span>
          </div>
          <pre className="mt-3 text-slate-300 leading-relaxed">{`SELECT p.product_name, SUM(o.unit_price * o.quantity) AS total_revenue
FROM sales.orders o
JOIN sales.products p ON o.product_id = p.product_id
WHERE o.order_status = 'FULFILLED'
GROUP BY p.product_name ORDER BY total_revenue DESC LIMIT 5;`}</pre>
        </div>
        <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Code2 className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Full Query Transparency</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Never trust a black box. DataMind exposes the complete generated SQL statement behind every calculation, allowing developers and technical analysts to verify join paths, date boundaries, and filtering conditions.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>One-click copy to clipboard for Snowflake worksheet reuse</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Auditable calculation breakdown in the dedicated Query Inspector</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Visual Analytics & Real CSV Exports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-200">
        <div className="lg:col-span-6 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Dual Chart & Table Visualizations</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Toggle between interactive visualizations (bar charts, line charts, horizontal ranking bars) and tabular data grids with sortable columns, formatted tabular numbers, and direct client-side CSV downloads.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Interactive Recharts with formatted tooltips and clean scales</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Sortable tables with real CSV export functionality</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
            <span className="font-semibold text-slate-800">Result Exploration</span>
            <span className="text-blue-600 font-medium inline-flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export Ready
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-[10px] text-slate-500 uppercase">Interactive Charts</span>
              <p className="font-semibold text-slate-800 mt-1">Bar, Line & Ranking</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-[10px] text-slate-500 uppercase">Sortable Grids</span>
              <p className="font-semibold text-slate-800 mt-1">Tabular Figures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 4: Honest Handling of Limitations */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Integrity & Guardrails</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Honest Handling of Uncertainty</h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Unlike generic chatbot templates that invent answers when information is missing, DataMind is engineered to recognize unsupported questions, identify schema gaps, and transparently notify the user.
        </p>
      </div>

      {/* Bottom Launch Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
        <h2 className="text-2xl font-bold text-slate-900">Experience DataMind in action</h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Launch the demo workspace to test natural-language queries against our sample enterprise sales dataset.
        </p>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors whitespace-nowrap"
          >
            <span>Launch Demo Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
