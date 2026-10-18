import { QueryAnalysis } from '../types/analytics';
import { MONTHLY_REVENUE, REGIONAL_REVENUE, TOP_PRODUCTS, CATEGORY_ORDERS } from './sampleSales';

export const SUPPORTED_QUESTIONS = [
  'Which products generated the highest revenue?',
  'Compare sales by region.',
  'Show monthly revenue trends.',
  'Which category had the highest order volume?',
  'What is the average order value?'
];

export const PREDEFINED_ANALYSES: Record<string, QueryAnalysis> = {
  'top-products': {
    id: 'qa-top-products',
    matchedSlug: 'top-products',
    question: 'Which products generated the highest revenue?',
    dataset: 'Sample Enterprise Sales Dataset',
    timestamp: 'Just now',
    status: 'completed',
    summary: 'The top revenue-generating product is "Enterprise Cloud Suite" with ₹3.85M (30.9% of total revenue), followed by "Quantum Server Nodes" at ₹2.95M and "Predictive Analytics Tier" at ₹2.18M.',
    explanation: 'Calculated by aggregating gross sales transactions grouped by product name from the FY 2025–2026 sales ledger, filtered for fulfilled orders, and ordered descending by sum of revenue.',
    chartType: 'horizontal-bar',
    chartData: TOP_PRODUCTS,
    tableColumns: [
      { key: 'rank', label: 'Rank', align: 'left' },
      { key: 'product', label: 'Product Name', align: 'left' },
      { key: 'category', label: 'Category', align: 'left' },
      { key: 'revenue', label: 'Revenue (INR)', align: 'right' },
      { key: 'share', label: 'Share', align: 'right' }
    ],
    tableRows: [
      { rank: 1, product: 'Enterprise Cloud Suite', category: 'Software', revenue: '₹3,850,000', share: '30.9%' },
      { rank: 2, product: 'Quantum Server Nodes', category: 'Hardware', revenue: '₹2,950,000', share: '23.7%' },
      { rank: 3, product: 'Predictive Analytics Tier', category: 'Software', revenue: '₹2,180,000', share: '17.5%' },
      { rank: 4, product: 'Edge Security Gateway', category: 'Hardware', revenue: '₹1,820,000', share: '14.6%' },
      { rank: 5, product: 'Developer SDK License', category: 'Services', revenue: '₹1,650,000', share: '13.3%' }
    ],
    sqlQuery: `SELECT 
    p.product_name,
    p.category,
    SUM(o.unit_price * o.quantity) AS total_revenue,
    ROUND(SUM(o.unit_price * o.quantity) / (SELECT SUM(unit_price * quantity) FROM sales.orders WHERE order_status = 'FULFILLED') * 100, 1) AS revenue_share_pct
FROM 
    sales.orders o
JOIN 
    sales.products p ON o.product_id = p.product_id
WHERE 
    o.order_status = 'FULFILLED'
    AND o.created_at BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY 
    p.product_id, p.product_name, p.category
ORDER BY 
    total_revenue DESC
LIMIT 5;`,
    evidence: {
      sourceTable: 'SALES.ORDERS joined with SALES.PRODUCTS',
      aggregations: ['SUM(unit_price * quantity)', 'ROUND(share, 1)', 'GROUP BY product_id'],
      filtersApplied: ["order_status = 'FULFILLED'", "created_at BETWEEN '2025-01-01' AND '2025-12-31'"],
      assumptions: ['Returns and canceled orders are excluded from revenue totals', 'Currency converted to INR at historical ledger rates'],
      supportingRowsCount: 8432,
      dataFreshness: 'October 15, 2026'
    },
    executionMetrics: {
      status: 'Demo Simulation',
      source: 'Frontend mock service',
      queryId: 'Not available',
      executionDuration: 'Not measured',
      estimatedRowsScanned: 8432
    }
  },
  'regional-sales': {
    id: 'qa-regional-sales',
    matchedSlug: 'regional-sales',
    question: 'Compare sales by region.',
    dataset: 'Sample Enterprise Sales Dataset',
    timestamp: 'Just now',
    status: 'completed',
    summary: 'The South sales territory generated the highest revenue at ₹4.20M (33.7%), followed by West at ₹3.45M (27.7%), North at ₹2.85M (22.9%), and East at ₹1.95M (15.7%).',
    explanation: 'Sales transactions are grouped by customer territorial regions defined in the REGIONS dimension table, summing net fulfilled revenues across all product lines.',
    chartType: 'bar',
    chartData: REGIONAL_REVENUE,
    tableColumns: [
      { key: 'region', label: 'Region', align: 'left' },
      { key: 'orders', label: 'Order Volume', align: 'right' },
      { key: 'revenue', label: 'Revenue (INR)', align: 'right' },
      { key: 'share', label: 'Share', align: 'right' }
    ],
    tableRows: [
      { region: 'South', orders: '2,842', revenue: '₹4,200,000', share: '33.7%' },
      { region: 'West', orders: '2,310', revenue: '₹3,450,000', share: '27.7%' },
      { region: 'North', orders: '1,960', revenue: '₹2,850,000', share: '22.9%' },
      { region: 'East', orders: '1,320', revenue: '₹1,950,000', share: '15.7%' }
    ],
    sqlQuery: `SELECT 
    r.region_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.net_amount) AS regional_revenue,
    ROUND(SUM(o.net_amount) * 100.0 / SUM(SUM(o.net_amount)) OVER (), 1) AS revenue_share_pct
FROM 
    sales.orders o
JOIN 
    sales.customers c ON o.customer_id = c.customer_id
JOIN 
    sales.regions r ON c.region_id = r.region_id
WHERE 
    o.order_status = 'FULFILLED'
GROUP BY 
    r.region_id, r.region_name
ORDER BY 
    regional_revenue DESC;`,
    evidence: {
      sourceTable: 'SALES.ORDERS joined with SALES.CUSTOMERS and SALES.REGIONS',
      aggregations: ['COUNT(DISTINCT order_id)', 'SUM(net_amount)', 'WINDOW SUM(net_amount)'],
      filtersApplied: ["order_status = 'FULFILLED'"],
      assumptions: ['Customer region mapped at time of invoice creation', 'Cross-region multi-site orders assigned to billing headquarters'],
      supportingRowsCount: 8432,
      dataFreshness: 'October 15, 2026'
    },
    executionMetrics: {
      status: 'Demo Simulation',
      source: 'Frontend mock service',
      queryId: 'Not available',
      executionDuration: 'Not measured',
      estimatedRowsScanned: 8432
    }
  },
  'monthly-trends': {
    id: 'qa-monthly-trends',
    matchedSlug: 'monthly-trends',
    question: 'Show monthly revenue trends.',
    dataset: 'Sample Enterprise Sales Dataset',
    timestamp: 'Just now',
    status: 'completed',
    summary: 'Monthly revenue grew from ₹820K in January to a peak of ₹1.28M in October (+56% increase), demonstrating strong quarterly acceleration in Q3 and Q4.',
    explanation: 'Aggregates monthly invoice sums across the 12-month calendar cycle, calculating both total gross revenue and fulfilled transaction volume per calendar month.',
    chartType: 'line',
    chartData: MONTHLY_REVENUE,
    tableColumns: [
      { key: 'month', label: 'Month', align: 'left' },
      { key: 'orders', label: 'Orders', align: 'right' },
      { key: 'revenue', label: 'Revenue (INR)', align: 'right' }
    ],
    tableRows: [
      { month: 'January', orders: '560', revenue: '₹820,000' },
      { month: 'February', orders: '520', revenue: '₹780,000' },
      { month: 'March', orders: '640', revenue: '₹950,000' },
      { month: 'April', orders: '590', revenue: '₹890,000' },
      { month: 'May', orders: '710', revenue: '₹1,040,000' },
      { month: 'June', orders: '780', revenue: '₹1,120,000' },
      { month: 'July', orders: '660', revenue: '₹980,000' },
      { month: 'August', orders: '730', revenue: '₹1,060,000' },
      { month: 'September', orders: '790', revenue: '₹1,150,000' },
      { month: 'October', orders: '860', revenue: '₹1,280,000' },
      { month: 'November', orders: '770', revenue: '₹1,160,000' },
      { month: 'December', orders: '832', revenue: '₹1,220,000' }
    ],
    sqlQuery: `SELECT 
    DATE_TRUNC('month', o.order_date) AS sales_month,
    COUNT(o.order_id) AS total_orders,
    SUM(o.net_amount) AS monthly_revenue
FROM 
    sales.orders o
WHERE 
    o.order_status = 'FULFILLED'
    AND o.order_date >= '2025-01-01'
GROUP BY 
    sales_month
ORDER BY 
    sales_month ASC;`,
    evidence: {
      sourceTable: 'SALES.ORDERS',
      aggregations: ["DATE_TRUNC('month', order_date)", 'COUNT(order_id)', 'SUM(net_amount)'],
      filtersApplied: ["order_status = 'FULFILLED'", "order_date >= '2025-01-01'"],
      assumptions: ['Calendar dates parsed in Asia/Kolkata timezone standard', 'Incomplete current period excluded'],
      supportingRowsCount: 8432,
      dataFreshness: 'October 15, 2026'
    },
    executionMetrics: {
      status: 'Demo Simulation',
      source: 'Frontend mock service',
      queryId: 'Not available',
      executionDuration: 'Not measured',
      estimatedRowsScanned: 8432
    }
  },
  'category-volume': {
    id: 'qa-category-volume',
    matchedSlug: 'category-volume',
    question: 'Which category had the highest order volume?',
    dataset: 'Sample Enterprise Sales Dataset',
    timestamp: 'Just now',
    status: 'completed',
    summary: '"Software Subscriptions" led all categories in order volume with 3,420 orders (40.6% of all orders), followed by "Hardware Appliances" with 2,150 orders (25.5%).',
    explanation: 'Counts unique transaction occurrences grouped by product category classification hierarchy.',
    chartType: 'bar',
    chartData: CATEGORY_ORDERS,
    tableColumns: [
      { key: 'category', label: 'Product Category', align: 'left' },
      { key: 'orders', label: 'Order Volume', align: 'right' },
      { key: 'share', label: 'Volume Share', align: 'right' }
    ],
    tableRows: [
      { category: 'Software Subscriptions', orders: '3,420', share: '40.6%' },
      { category: 'Hardware Appliances', orders: '2,150', share: '25.5%' },
      { category: 'Professional Services', orders: '1,580', share: '18.7%' },
      { category: 'Support Retainers', orders: '1,282', share: '15.2%' }
    ],
    sqlQuery: `SELECT 
    c.category_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(COUNT(o.order_id) * 100.0 / (SELECT COUNT(*) FROM sales.orders), 1) AS volume_share_pct
FROM 
    sales.orders o
JOIN 
    sales.products p ON o.product_id = p.product_id
JOIN 
    sales.categories c ON p.category_id = c.category_id
GROUP BY 
    c.category_name
ORDER BY 
    total_orders DESC;`,
    evidence: {
      sourceTable: 'SALES.ORDERS joined with SALES.PRODUCTS and SALES.CATEGORIES',
      aggregations: ['COUNT(order_id)', 'ROUND(share, 1)', 'GROUP BY category_name'],
      filtersApplied: ['All order statuses included in volume count'],
      assumptions: ['Multi-item single checkouts broken out by item lines', 'Standard product taxonomy version 2.4'],
      supportingRowsCount: 8432,
      dataFreshness: 'October 15, 2026'
    },
    executionMetrics: {
      status: 'Demo Simulation',
      source: 'Frontend mock service',
      queryId: 'Not available',
      executionDuration: 'Not measured',
      estimatedRowsScanned: 8432
    }
  },
  'average-order-value': {
    id: 'qa-average-order-value',
    matchedSlug: 'average-order-value',
    question: 'What is the average order value?',
    dataset: 'Sample Enterprise Sales Dataset',
    timestamp: 'Just now',
    status: 'completed',
    summary: 'The overall Average Order Value (AOV) is ₹1,476 across 8,432 fulfilled transactions, with South territory averaging the highest at ₹1,478 and East averaging ₹1,477.',
    explanation: 'Total fulfilled revenue (₹12,450,000) divided by the total number of fulfilled transactions (8,432 orders).',
    chartType: 'bar',
    chartData: [
      { label: 'Overall AOV', value: 1476, formattedValue: '₹1,476' },
      { label: 'South Zone', value: 1478, formattedValue: '₹1,478' },
      { label: 'West Zone', value: 1493, formattedValue: '₹1,493' },
      { label: 'North Zone', value: 1454, formattedValue: '₹1,454' },
      { label: 'East Zone', value: 1477, formattedValue: '₹1,477' }
    ],
    tableColumns: [
      { key: 'segment', label: 'Segment', align: 'left' },
      { key: 'revenue', label: 'Revenue (INR)', align: 'right' },
      { key: 'orders', label: 'Orders', align: 'right' },
      { key: 'aov', label: 'Average Order Value', align: 'right' }
    ],
    tableRows: [
      { segment: 'Overall Platform', revenue: '₹12,450,000', orders: '8,432', aov: '₹1,476' },
      { segment: 'South Zone', revenue: '₹4,200,000', orders: '2,842', aov: '₹1,478' },
      { segment: 'West Zone', revenue: '₹3,450,000', orders: '2,310', aov: '₹1,493' },
      { segment: 'North Zone', revenue: '₹2,850,000', orders: '1,960', aov: '₹1,454' },
      { segment: 'East Zone', revenue: '₹1,950,000', orders: '1,320', aov: '₹1,477' }
    ],
    sqlQuery: `SELECT 
    'Overall Platform' AS segment,
    SUM(net_amount) AS total_revenue,
    COUNT(order_id) AS total_orders,
    ROUND(AVG(net_amount), 0) AS average_order_value
FROM 
    sales.orders
WHERE 
    order_status = 'FULFILLED'
UNION ALL
SELECT 
    r.region_name || ' Zone' AS segment,
    SUM(o.net_amount) AS total_revenue,
    COUNT(o.order_id) AS total_orders,
    ROUND(AVG(o.net_amount), 0) AS average_order_value
FROM 
    sales.orders o
JOIN 
    sales.customers c ON o.customer_id = c.customer_id
JOIN 
    sales.regions r ON c.region_id = r.region_id
WHERE 
    o.order_status = 'FULFILLED'
GROUP BY 
    r.region_name;`,
    evidence: {
      sourceTable: 'SALES.ORDERS joined with SALES.CUSTOMERS and SALES.REGIONS',
      aggregations: ['SUM(net_amount)', 'COUNT(order_id)', 'ROUND(AVG(net_amount), 0)'],
      filtersApplied: ["order_status = 'FULFILLED'"],
      assumptions: ['Discounts subtracted prior to net order calculation', 'Taxes and shipping fees excluded from AOV numerator'],
      supportingRowsCount: 8432,
      dataFreshness: 'October 15, 2026'
    },
    executionMetrics: {
      status: 'Demo Simulation',
      source: 'Frontend mock service',
      queryId: 'Not available',
      executionDuration: 'Not measured',
      estimatedRowsScanned: 8432
    }
  }
};
