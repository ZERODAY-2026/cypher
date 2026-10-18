import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Code2,
  Terminal,
  Table as TableIcon,
  Layers,
  Info,
  ArrowRight,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Database
} from 'lucide-react';
import { SQLViewer } from '../../components/common/SQLViewer';
import { DataTable } from '../../components/common/DataTable';
import { EvidencePanel } from '../../components/common/EvidencePanel';
import { PREDEFINED_ANALYSES } from '../../data/sampleQueries';
import { QueryAnalysis } from '../../types/analytics';
import { EmptyState } from '../../components/common/EmptyState';

export const QueryInspectorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedSlug, setSelectedSlug] = useState<string>('top-products');
  const [analysis, setAnalysis] = useState<QueryAnalysis | null>(PREDEFINED_ANALYSES['top-products']);
  const [activeTab, setActiveTab] = useState<'sql' | 'results' | 'evidence' | 'execution'>('sql');

  useEffect(() => {
    if (location.state && (location.state as { selectedSlug?: string }).selectedSlug) {
      const slug = (location.state as { selectedSlug: string }).selectedSlug;
      if (PREDEFINED_ANALYSES[slug]) {
        setSelectedSlug(slug);
        setAnalysis(PREDEFINED_ANALYSES[slug]);
      }
    }
  }, [location.state]);

  const handleSelectQuery = (slug: string) => {
    setSelectedSlug(slug);
    setAnalysis(PREDEFINED_ANALYSES[slug] || null);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Query Inspector</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deep-dive audit of generated SQL statements, aggregation pipelines, and execution metadata.
          </p>
        </div>
        <Link
          to="/ask"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <span>Ask Another Question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Query Selector Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs">
          <Code2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-700">Select Analyzed Query to Inspect:</span>
        </div>
        <select
          value={selectedSlug}
          onChange={(e) => handleSelectQuery(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 text-xs font-medium focus:outline-blue-500 cursor-pointer h-8"
        >
          <option value="top-products">Top Products by Revenue</option>
          <option value="regional-sales">Compare Sales by Region</option>
          <option value="monthly-trends">Monthly Revenue Trends</option>
          <option value="category-volume">Highest Order Volume by Category</option>
          <option value="average-order-value">Average Order Value Analysis</option>
        </select>
      </div>

      {analysis ? (
        <div className="space-y-3.5 sm:space-y-4">
          {/* Query Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>{analysis.dataset}</span>
                <span>·</span>
                <span className="font-mono">{analysis.timestamp}</span>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium self-start sm:self-auto">
                Demo Simulation Only
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Original Natural-Language Inquiry
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                "{analysis.question}"
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-200 pb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'sql'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>SQL Query</span>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'results'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Results Table</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'evidence'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explanation & Evidence</span>
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'execution'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Execution Details</span>
            </button>
          </div>

          {/* Active Tab View */}
          <div>
            {activeTab === 'sql' && (
              <div className="space-y-4">
                <SQLViewer sql={analysis.sqlQuery} isSimulatedNotice={true} />
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">Snowflake Dialect Notes:</div>
                  <p>
                    The generated ANSI SQL uses windowing, date truncations, and explicit rounding functions compatible with standard Snowflake virtual warehouses.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <DataTable
                columns={analysis.tableColumns}
                data={analysis.tableRows}
                caption="Simulated Query Execution Results"
                allowExport={true}
                exportFileName={`inspector-${analysis.matchedSlug}.csv`}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidencePanel evidence={analysis.evidence} />
            )}

            {activeTab === 'execution' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Execution Details & Telemetry</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Operational telemetry and query engine execution details.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-slate-500 font-medium">Status</span>
                    <p className="text-sm font-bold font-mono text-slate-900">
                      {analysis.executionMetrics.status}
                    </p>
                    <span className="text-[11px] text-amber-700">Client-side mock execution</span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-slate-500 font-medium">Execution Source</span>
                    <p className="text-sm font-bold text-slate-900">
                      {analysis.executionMetrics.source}
                    </p>
                    <span className="text-[11px] text-slate-500">Local TypeScript service</span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-slate-500 font-medium">Query ID</span>
                    <p className="text-sm font-mono text-slate-600">
                      {analysis.executionMetrics.queryId}
                    </p>
                    <span className="text-[11px] text-slate-500">Assigned by Snowflake in prod</span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-slate-500 font-medium">Execution Duration</span>
                    <p className="text-sm font-mono text-slate-600">
                      {analysis.executionMetrics.executionDuration}
                    </p>
                    <span className="text-[11px] text-slate-500">Simulated response</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                  <strong>Planned Production Behavior:</strong> When connected to live Snowflake and Google Gemma models, the Query Inspector will trace the token reasoning sequence, query compilation time, cache hit ratio, bytes scanned from Snowflake micro-partitions, and spill-to-storage metrics.
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Code2}
          title="No query selected for inspection"
          description="Select an analytical question above or run a new query in Ask Data to inspect its generated SQL and execution logic."
          actionLabel="Go to Ask Data"
          onAction={() => navigate('/ask')}
        />
      )}
    </div>
  );
};
