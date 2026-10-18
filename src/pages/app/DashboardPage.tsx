import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Database,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Code2,
  Clock,
  Sparkles,
  Layers,
  ShoppingBag,
  MapPin,
  Table,
  AlertCircle
} from 'lucide-react';
import { MetricCard } from '../../components/common/MetricCard';
import { ChartCard } from '../../components/common/ChartCard';
import {
  SAMPLE_METRICS,
  SAMPLE_DATASET_META,
  MONTHLY_REVENUE,
  REGIONAL_REVENUE
} from '../../data/sampleSales';
import { SUPPORTED_QUESTIONS } from '../../data/sampleQueries';
import { MockHistoryService } from '../../services/mockHistoryService';
import { HistoryItem } from '../../types/analytics';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistoryItems(MockHistoryService.getHistory().slice(0, 4));
  }, []);

  const handleSelectSuggestedQuestion = (question: string) => {
    navigate('/ask', { state: { prefilledQuestion: question } });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Explore your data overview and recent analyses.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/sources"
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
          >
            Explore Data
          </Link>
          <Link
            to="/ask"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Question</span>
          </Link>
        </div>
      </div>

      {/* Connection Status Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{SAMPLE_DATASET_META.name}</h3>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-medium">
                  Status: Demo Mode
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">
                Notice: Snowflake data cloud is not connected in this frontend prototype. All analytics derive from local sample data.
              </p>
            </div>
          </div>
          <Link
            to="/sources"
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shrink-0"
          >
            Configure Connection
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards (Derived from coherent sample data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          label="Total Revenue"
          value={SAMPLE_METRICS.totalRevenueFormatted}
          subtext="FY 2025–2026 gross sales ledger"
          icon={TrendingUp}
          trend="+18.4% YoY"
          isPositive={true}
        />
        <MetricCard
          label="Total Orders"
          value={SAMPLE_METRICS.totalOrdersFormatted}
          subtext="8,432 fulfilled transactions"
          icon={ShoppingBag}
        />
        <MetricCard
          label="Top Region"
          value={SAMPLE_METRICS.topRegion}
          subtext={`${SAMPLE_METRICS.topRegionRevenue} (33.7% of total sales)`}
          icon={MapPin}
        />
        <MetricCard
          label="Available Tables"
          value={SAMPLE_METRICS.availableTables}
          subtext="ORDERS, PRODUCTS & 6 more"
          icon={Table}
        />
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        <div className="lg:col-span-7">
          <ChartCard
            title="Monthly Revenue Trend (FY 2025–2026)"
            subtitle="Consistent quarterly growth with peak revenue in October"
            data={MONTHLY_REVENUE}
            type="line"
            height={240}
            unitPrefix="₹"
          />
        </div>
        <div className="lg:col-span-5">
          <ChartCard
            title="Revenue by Sales Region"
            subtitle="South and West territories comprise 61.4% of all sales"
            data={REGIONAL_REVENUE}
            type="bar"
            height={240}
            unitPrefix="₹"
          />
        </div>
      </div>

      {/* Two Column Section: Suggested Questions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
        {/* Suggested Questions */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Suggested Questions</h3>
              </div>
              <span className="text-[11px] text-slate-400">Supported Demo Prompts</span>
            </div>

            <div className="space-y-1.5">
              {SUPPORTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSuggestedQuestion(question)}
                  className="w-full text-left px-3 py-2 rounded-lg border border-slate-100 hover:border-blue-200 bg-slate-50/60 hover:bg-blue-50/40 text-xs font-medium text-slate-800 transition-colors flex items-center justify-between gap-2.5 group cursor-pointer"
                >
                  <span className="truncate">{question}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2.5 mt-2 border-t border-slate-100/60 text-[11px] text-slate-500">
            Click any prompt to load instant analytical answers, SQL query, and chart.
          </div>
        </div>

        {/* Recent Query Activity */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Recent Query Activity</h3>
              </div>
              <Link
                to="/history"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {historyItems.length > 0 ? (
                historyItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate('/inspector', { state: { selectedSlug: item.matchedSlug } })}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 bg-white text-xs transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-900 truncate">{item.question}</span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{item.dataset}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{item.rowCount} rows</span>
                      <span>·</span>
                      <span className="text-amber-700 bg-amber-50 px-1 rounded text-[10px]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 py-6 text-center">
                  No recent activity recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-3.5 sm:p-4">
        <h4 className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2.5">
          Quick Actions
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Link
            to="/ask"
            className="p-2.5 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-medium text-slate-800 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Ask Question</span>
          </Link>
          <Link
            to="/sources"
            className="p-2.5 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-medium text-slate-800 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">View Schema</span>
          </Link>
          <Link
            to="/insights"
            className="p-2.5 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-medium text-slate-800 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Check Insights</span>
          </Link>
          <Link
            to="/inspector"
            className="p-2.5 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-medium text-slate-800 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Inspect SQL</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
