import React, { useState } from 'react';
import {
  BarChart3,
  Table as TableIcon,
  Download,
  Calendar,
  Database,
  TrendingUp,
  ShoppingBag,
  MapPin,
  Package,
  Layers,
  AlertCircle
} from 'lucide-react';
import { ChartCard } from '../../components/common/ChartCard';
import { DataTable } from '../../components/common/DataTable';
import { MetricCard } from '../../components/common/MetricCard';
import {
  SAMPLE_METRICS,
  MONTHLY_REVENUE,
  REGIONAL_REVENUE,
  TOP_PRODUCTS,
  CATEGORY_ORDERS,
  SAMPLE_DATASET_META
} from '../../data/sampleSales';
import { useToast } from '../../components/common/Toast';

export const InsightsPage: React.FC = () => {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<'charts' | 'tables'>('charts');
  const [selectedDataset, setSelectedDataset] = useState('sales');
  const [timeRange, setTimeRange] = useState<'all' | 'fy2026' | 'q3q4'>('all');

  const exportAllInsightsCsv = () => {
    // Generate multi-section CSV from current sample data
    const headers = 'Dataset,Section,Dimension,MetricValue,FormattedValue\n';
    const rowsMonthly = MONTHLY_REVENUE.map(
      (d) => `Enterprise Sales,Monthly Revenue,"${d.label}",${d.value},"${d.formattedValue}"`
    );
    const rowsRegional = REGIONAL_REVENUE.map(
      (d) => `Enterprise Sales,Regional Revenue,"${d.label}",${d.value},"${d.formattedValue}"`
    );
    const rowsProducts = TOP_PRODUCTS.map(
      (d) => `Enterprise Sales,Top Products,"${d.label}",${d.value},"${d.formattedValue}"`
    );
    const rowsCategories = CATEGORY_ORDERS.map(
      (d) => `Enterprise Sales,Order Volumes,"${d.label}",${d.value},"${d.formattedValue}"`
    );

    const fullCsv = headers + [...rowsMonthly, ...rowsRegional, ...rowsProducts, ...rowsCategories].join('\n');
    const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `datamind-analytics-insights-${timeRange}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Complete', 'Exported comprehensive analytics CSV', 'success');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Insights & Charts</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pre-aggregated visual trends, territorial distributions, and product benchmarks.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart / Table Toggle */}
          <div className="p-0.5 bg-slate-100 rounded-lg flex items-center text-xs">
            <button
              onClick={() => setViewMode('charts')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'charts'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Charts</span>
            </button>
            <button
              onClick={() => setViewMode('tables')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'tables'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tables</span>
            </button>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'all' | 'fy2026' | 'q3q4')}
              className="bg-white border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 text-xs font-medium shadow-2xs focus:outline-blue-500 cursor-pointer h-8"
            >
              <option value="all">Full Cycle (12 Months)</option>
              <option value="fy2026">FY 2026 Focus</option>
              <option value="q3q4">Q3 & Q4 Acceleration</option>
            </select>
          </div>

          {/* CSV Export */}
          <button
            onClick={exportAllInsightsCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer h-8"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Prominent Demo Notice */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span className="text-xs font-semibold text-slate-700 truncate">
            Sample Analytics — Not Connected to Snowflake
          </span>
          <span className="text-xs text-slate-400 hidden lg:inline truncate">
            All charts and tables derive deterministically from the local enterprise sales sample ledger.
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 shrink-0">
          Dataset: {SAMPLE_DATASET_META.name}
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          label="Total Revenue"
          value={SAMPLE_METRICS.totalRevenueFormatted}
          subtext="FY 2025–2026 Gross Sales"
          icon={TrendingUp}
          trend="+18.4% YoY"
        />
        <MetricCard
          label="Total Orders"
          value={SAMPLE_METRICS.totalOrdersFormatted}
          subtext="Fulfilled transaction count"
          icon={ShoppingBag}
        />
        <MetricCard
          label="Average Order Value"
          value={SAMPLE_METRICS.averageOrderValueFormatted}
          subtext="Per fulfilled transaction"
          icon={Package}
        />
        <MetricCard
          label="Top Region"
          value={SAMPLE_METRICS.topRegion}
          subtext={`${SAMPLE_METRICS.topRegionRevenue} in regional sales`}
          icon={MapPin}
        />
      </div>

      {/* Content: Either Charts or Tables */}
      {viewMode === 'charts' ? (
        <div className="space-y-3.5 sm:space-y-4">
          {/* Row 1: Monthly Trends and Regional Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
            <div className="lg:col-span-7">
              <ChartCard
                title="Monthly Revenue Trends"
                subtitle="Consistent acceleration from ₹820K (Jan) to peak ₹1.28M (Oct)"
                data={MONTHLY_REVENUE}
                type="line"
                height={240}
                unitPrefix="₹"
              />
            </div>
            <div className="lg:col-span-5">
              <ChartCard
                title="Revenue by Sales Region"
                subtitle="South territory leads with ₹4.20M (33.7% market share)"
                data={REGIONAL_REVENUE}
                type="bar"
                height={240}
                unitPrefix="₹"
              />
            </div>
          </div>

          {/* Row 2: Top Products and Orders by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
            <div className="lg:col-span-7">
              <ChartCard
                title="Top Products by Gross Revenue"
                subtitle="Enterprise Cloud Suite represents ₹3.85M in sales"
                data={TOP_PRODUCTS}
                type="horizontal-bar"
                height={240}
                unitPrefix="₹"
              />
            </div>
            <div className="lg:col-span-5">
              <ChartCard
                title="Order Volume by Product Category"
                subtitle="Software Subscriptions account for 3,420 orders (40.6%)"
                data={CATEGORY_ORDERS}
                type="bar"
                height={240}
                unitSuffix=" orders"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <DataTable
            columns={[
              { key: 'label', label: 'Month', align: 'left' },
              { key: 'secondaryValue', label: 'Order Volume', align: 'right' },
              { key: 'formattedValue', label: 'Gross Revenue (INR)', align: 'right' }
            ]}
            data={MONTHLY_REVENUE.map((m) => ({
              label: m.label,
              secondaryValue: m.secondaryValue || 0,
              formattedValue: m.formattedValue || ''
            }))}
            caption="Monthly Sales Breakdown (FY 2025–2026)"
            allowExport={true}
            exportFileName="monthly-revenue.csv"
          />

          <DataTable
            columns={[
              { key: 'label', label: 'Sales Region', align: 'left' },
              { key: 'formattedValue', label: 'Revenue (INR)', align: 'right' },
              { key: 'percentage', label: 'Revenue Share', align: 'right' }
            ]}
            data={REGIONAL_REVENUE.map((r) => ({
              label: r.label,
              formattedValue: r.formattedValue || '',
              percentage: `${r.percentage}%`
            }))}
            caption="Regional Sales Distribution"
            allowExport={true}
            exportFileName="regional-sales.csv"
          />

          <DataTable
            columns={[
              { key: 'label', label: 'Product Name', align: 'left' },
              { key: 'category', label: 'Category', align: 'left' },
              { key: 'formattedValue', label: 'Gross Revenue (INR)', align: 'right' },
              { key: 'percentage', label: 'Revenue Share', align: 'right' }
            ]}
            data={TOP_PRODUCTS.map((p) => ({
              label: p.label,
              category: p.category || '',
              formattedValue: p.formattedValue || '',
              percentage: `${p.percentage}%`
            }))}
            caption="Top Performing Products by Revenue"
            allowExport={true}
            exportFileName="top-products.csv"
          />
        </div>
      )}
    </div>
  );
};
