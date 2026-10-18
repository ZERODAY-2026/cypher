export type DatasetId = 'sales' | 'customers' | 'inventory';

export interface DatasetMeta {
  id: DatasetId;
  name: string;
  description: string;
  tablesCount: number;
  recordsCount: number;
  lastUpdated: string;
  size: string;
}

export interface MetricSummary {
  totalRevenue: number;
  totalRevenueFormatted: string;
  totalOrders: number;
  totalOrdersFormatted: string;
  topRegion: string;
  topRegionRevenue: string;
  availableTables: number;
  averageOrderValue: number;
  averageOrderValueFormatted: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  percentage?: number;
  formattedValue?: string;
  category?: string;
}

export interface QueryResultRow {
  [key: string]: string | number;
}

export interface AnalysisEvidence {
  sourceTable: string;
  aggregations: string[];
  filtersApplied: string[];
  assumptions: string[];
  supportingRowsCount: number;
  dataFreshness: string;
}

export interface QueryAnalysis {
  id: string;
  question: string;
  matchedSlug: string;
  summary: string;
  dataset: string;
  timestamp: string;
  status: 'completed' | 'unsupported' | 'simulated';
  sqlQuery: string;
  explanation: string;
  chartType: 'bar' | 'line' | 'pie' | 'horizontal-bar';
  chartData: ChartDataPoint[];
  tableColumns: { key: string; label: string; align?: 'left' | 'right' | 'center' }[];
  tableRows: QueryResultRow[];
  evidence: AnalysisEvidence;
  executionMetrics: {
    status: 'Demo Simulation';
    source: 'Frontend mock service';
    queryId: 'Not available';
    executionDuration: 'Not measured';
    estimatedRowsScanned: number;
  };
}

export interface HistoryItem {
  id: string;
  question: string;
  timestamp: string;
  dataset: string;
  status: 'Demo Simulation' | 'Unsupported';
  rowCount: number;
  matchedSlug: string;
  sqlQuery: string;
}

export interface SnowflakeConnectionConfig {
  account: string;
  username: string;
  warehouse: string;
  database: string;
  schema: string;
  role: string;
  authMethod: 'password' | 'keypair' | 'sso';
}
