import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Database,
  History,
  BarChart3,
  Search,
  Code2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { REGIONAL_REVENUE } from '../../data/sampleSales';

export const HeroProductPreview: React.FC = () => {
  const [sqlExpanded, setSqlExpanded] = useState(false);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden text-slate-900 transition-all">
      {/* Top chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="ml-2 text-xs font-mono text-slate-500">datamind.workspace / ask-data</span>
        </div>
        <div className="text-[11px] font-medium text-slate-500">
          Sample data preview
        </div>
      </div>

      <div className="flex h-[420px] sm:h-[460px]">
        {/* Mini Sidebar */}
        <div className="hidden sm:flex flex-col w-44 bg-slate-50/60 border-r border-slate-200 p-3 space-y-1 shrink-0 text-xs select-none">
          <div className="flex items-center gap-2 px-2.5 py-1.5 mb-2 font-bold text-slate-900">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white">
              <Database className="w-3 h-3" />
            </div>
            <span>DataMind</span>
          </div>

          <div className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-1">Workspace</div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-blue-50 text-blue-700 font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Data</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
            <Database className="w-3.5 h-3.5" />
            <span>Data Sources</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
            <History className="w-3.5 h-3.5" />
            <span>Query History</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Insights</span>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-200 text-[11px] text-slate-500">
            <span>Mode: Demo Prototype</span>
          </div>
        </div>

        {/* Mini Content Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
          {/* Question Input Simulation */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg border border-blue-200 bg-blue-50/40 text-xs">
            <Search className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium text-slate-800 flex-1 truncate">
              Which region generated the highest revenue?
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-600 text-white rounded">
              Run
            </span>
          </div>

          {/* Answer Summary */}
          <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Result Summary</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The <strong className="text-slate-900 font-semibold">South</strong> territory generated the highest revenue at <strong className="text-slate-900 font-mono font-semibold">₹4.20M</strong> (33.7% of total), outperforming the West territory by ₹750K.
            </p>
          </div>

          {/* Mini KPI Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg border border-slate-200 bg-white">
              <span className="text-[10px] text-slate-500 uppercase">Top Region</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">South</p>
              <span className="text-[10px] text-emerald-600 font-semibold">33.7% share</span>
            </div>
            <div className="p-2 rounded-lg border border-slate-200 bg-white">
              <span className="text-[10px] text-slate-500 uppercase">Regional Rev</span>
              <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">₹4.20M</p>
              <span className="text-[10px] text-slate-500">2,842 orders</span>
            </div>
            <div className="p-2 rounded-lg border border-slate-200 bg-white">
              <span className="text-[10px] text-slate-500 uppercase">AOV</span>
              <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">₹1,478</p>
              <span className="text-[10px] text-emerald-600 inline-flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> +4.2%
              </span>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
            <div className="text-[11px] font-semibold text-slate-700 mb-2">
              Regional Revenue Comparison (INR Millions)
            </div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REGIONAL_REVENUE} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 9, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(val: any) => [`₹${(Number(val ?? 0) / 1000000).toFixed(2)}M`, 'Revenue']}
                    labelStyle={{ fontSize: 10, fontWeight: 600 }}
                    contentStyle={{ fontSize: 10, padding: 6 }}
                  />
                  <Bar dataKey="value" fill="#2563EB" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Collapsible SQL preview */}
          <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
            <button
              onClick={() => setSqlExpanded(!sqlExpanded)}
              className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 text-[11px]">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Generated SQL Query (Inspectable)</span>
              </span>
              {sqlExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {sqlExpanded && (
              <div className="p-2.5 bg-slate-900 text-slate-200 font-mono text-[10px] overflow-x-auto leading-relaxed">
                <pre>{`SELECT r.region_name, SUM(o.net_amount) AS regional_revenue
FROM sales.orders o
JOIN sales.customers c ON o.customer_id = c.customer_id
JOIN sales.regions r ON c.region_id = r.region_id
WHERE o.order_status = 'FULFILLED'
GROUP BY r.region_name ORDER BY regional_revenue DESC;`}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
