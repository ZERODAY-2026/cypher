import { MetricSummary, ChartDataPoint } from '../types/analytics';

export const SAMPLE_DATASET_META = {
  id: 'sales' as const,
  name: 'Sample Enterprise Sales Dataset',
  description: 'Transactional records spanning FY 2025–2026 across 4 geographical sales zones and 5 product lines.',
  tablesCount: 8,
  recordsCount: 8432,
  lastUpdated: 'October 15, 2026',
  size: '18.4 MB'
};

export const SAMPLE_METRICS: MetricSummary = {
  totalRevenue: 12450000,
  totalRevenueFormatted: '₹12.4M',
  totalOrders: 8432,
  totalOrdersFormatted: '8,432',
  topRegion: 'South',
  topRegionRevenue: '₹4.2M',
  availableTables: 8,
  averageOrderValue: 1476,
  averageOrderValueFormatted: '₹1,476'
};

// Monthly revenue breakdown (sums to ₹12.45M)
export const MONTHLY_REVENUE: ChartDataPoint[] = [
  { label: 'Jan', value: 820000, formattedValue: '₹820K', secondaryValue: 560 },
  { label: 'Feb', value: 780000, formattedValue: '₹780K', secondaryValue: 520 },
  { label: 'Mar', value: 950000, formattedValue: '₹950K', secondaryValue: 640 },
  { label: 'Apr', value: 890000, formattedValue: '₹890K', secondaryValue: 590 },
  { label: 'May', value: 1040000, formattedValue: '₹1.04M', secondaryValue: 710 },
  { label: 'Jun', value: 1120000, formattedValue: '₹1.12M', secondaryValue: 780 },
  { label: 'Jul', value: 980000, formattedValue: '₹980K', secondaryValue: 660 },
  { label: 'Aug', value: 1060000, formattedValue: '₹1.06M', secondaryValue: 730 },
  { label: 'Sep', value: 1150000, formattedValue: '₹1.15M', secondaryValue: 790 },
  { label: 'Oct', value: 1280000, formattedValue: '₹1.28M', secondaryValue: 860 },
  { label: 'Nov', value: 1160000, formattedValue: '₹1.16M', secondaryValue: 770 },
  { label: 'Dec', value: 1220000, formattedValue: '₹1.22M', secondaryValue: 832 }
];

// Regional breakdown (South is highest: ₹4.2M)
export const REGIONAL_REVENUE: ChartDataPoint[] = [
  { label: 'South', value: 4200000, formattedValue: '₹4.20M', percentage: 33.7 },
  { label: 'West', value: 3450000, formattedValue: '₹3.45M', percentage: 27.7 },
  { label: 'North', value: 2850000, formattedValue: '₹2.85M', percentage: 22.9 },
  { label: 'East', value: 1950000, formattedValue: '₹1.95M', percentage: 15.7 }
];

// Top products by revenue
export const TOP_PRODUCTS: ChartDataPoint[] = [
  { label: 'Enterprise Cloud Suite', value: 3850000, formattedValue: '₹3.85M', percentage: 30.9, category: 'Software' },
  { label: 'Quantum Server Nodes', value: 2950000, formattedValue: '₹2.95M', percentage: 23.7, category: 'Hardware' },
  { label: 'Predictive Analytics Tier', value: 2180000, formattedValue: '₹2.18M', percentage: 17.5, category: 'Software' },
  { label: 'Edge Security Gateway', value: 1820000, formattedValue: '₹1.82M', percentage: 14.6, category: 'Hardware' },
  { label: 'Developer SDK License', value: 1650000, formattedValue: '₹1.65M', percentage: 13.3, category: 'Services' }
];

// Orders by category
export const CATEGORY_ORDERS: ChartDataPoint[] = [
  { label: 'Software Subscriptions', value: 3420, formattedValue: '3,420 orders', percentage: 40.6 },
  { label: 'Hardware Appliances', value: 2150, formattedValue: '2,150 orders', percentage: 25.5 },
  { label: 'Professional Services', value: 1580, formattedValue: '1,580 orders', percentage: 18.7 },
  { label: 'Support Retainers', value: 1282, formattedValue: '1,282 orders', percentage: 15.2 }
];
