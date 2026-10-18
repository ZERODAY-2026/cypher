import { DatabaseSchema } from '../types/schema';

export const SAMPLE_DATABASE_SCHEMA: DatabaseSchema = {
  databaseName: 'ANALYTICS_DEMO_DB',
  schemaName: 'SALES_DATA',
  tables: [
    {
      name: 'ORDERS',
      description: 'Customer order transactions, payment totals, statuses, and fulfillment dates.',
      rowCount: 8432,
      columns: [
        { name: 'ORDER_ID', type: 'VARCHAR(32)', isPrimaryKey: true, nullable: false, description: 'Unique identifier for the sales order' },
        { name: 'CUSTOMER_ID', type: 'VARCHAR(32)', isForeignKey: true, nullable: false, description: 'Reference to the customer who placed the order' },
        { name: 'ORDER_DATE', type: 'TIMESTAMP_NTZ', nullable: false, description: 'Order creation timestamp (UTC)' },
        { name: 'ORDER_STATUS', type: 'VARCHAR(20)', nullable: false, description: 'FULFILLED, PENDING, CANCELLED, or RETURNED' },
        { name: 'NET_AMOUNT', type: 'DECIMAL(12,2)', nullable: false, description: 'Total order value after promotional discounts (INR)' },
        { name: 'PAYMENT_METHOD', type: 'VARCHAR(24)', nullable: true, description: 'Corporate ACH, UPI, Wire Transfer, Credit Card' }
      ],
      sampleRows: [
        { ORDER_ID: 'ORD-98214', CUSTOMER_ID: 'CUST-1042', ORDER_DATE: '2026-10-14 09:32:11', ORDER_STATUS: 'FULFILLED', NET_AMOUNT: 38500, PAYMENT_METHOD: 'Corporate ACH' },
        { ORDER_ID: 'ORD-98215', CUSTOMER_ID: 'CUST-3081', ORDER_DATE: '2026-10-14 11:15:45', ORDER_STATUS: 'FULFILLED', NET_AMOUNT: 14760, PAYMENT_METHOD: 'Credit Card' },
        { ORDER_ID: 'ORD-98216', CUSTOMER_ID: 'CUST-2419', ORDER_DATE: '2026-10-14 14:02:29', ORDER_STATUS: 'FULFILLED', NET_AMOUNT: 29500, PAYMENT_METHOD: 'Wire Transfer' },
        { ORDER_ID: 'ORD-98217', CUSTOMER_ID: 'CUST-4112', ORDER_DATE: '2026-10-14 16:48:10', ORDER_STATUS: 'PENDING', NET_AMOUNT: 8900, PAYMENT_METHOD: 'UPI' },
        { ORDER_ID: 'ORD-98218', CUSTOMER_ID: 'CUST-0988', ORDER_DATE: '2026-10-15 10:20:00', ORDER_STATUS: 'FULFILLED', NET_AMOUNT: 52100, PAYMENT_METHOD: 'Corporate ACH' }
      ]
    },
    {
      name: 'CUSTOMERS',
      description: 'Enterprise and mid-market accounts, geographical assigned territory, and industry verticals.',
      rowCount: 1420,
      columns: [
        { name: 'CUSTOMER_ID', type: 'VARCHAR(32)', isPrimaryKey: true, nullable: false, description: 'Unique customer identifier' },
        { name: 'COMPANY_NAME', type: 'VARCHAR(128)', nullable: false, description: 'Registered business name' },
        { name: 'REGION_ID', type: 'VARCHAR(16)', isForeignKey: true, nullable: false, description: 'Geographical sales territory' },
        { name: 'INDUSTRY', type: 'VARCHAR(64)', nullable: true, description: 'Enterprise domain vertical' },
        { name: 'ONBOARDING_DATE', type: 'DATE', nullable: false, description: 'First subscription date' }
      ],
      sampleRows: [
        { CUSTOMER_ID: 'CUST-1042', COMPANY_NAME: 'Apex Logistics Ltd', REGION_ID: 'REG-SOUTH', INDUSTRY: 'Supply Chain', ONBOARDING_DATE: '2024-03-12' },
        { CUSTOMER_ID: 'CUST-3081', COMPANY_NAME: 'Zenith BioPharma', REGION_ID: 'REG-WEST', INDUSTRY: 'Healthcare', ONBOARDING_DATE: '2024-07-28' },
        { CUSTOMER_ID: 'CUST-2419', COMPANY_NAME: 'Orbit Financial Services', REGION_ID: 'REG-NORTH', INDUSTRY: 'FinTech', ONBOARDING_DATE: '2023-11-05' },
        { CUSTOMER_ID: 'CUST-4112', COMPANY_NAME: 'Bengaluru Tech Labs', REGION_ID: 'REG-SOUTH', INDUSTRY: 'Software', ONBOARDING_DATE: '2025-01-19' }
      ]
    },
    {
      name: 'PRODUCTS',
      description: 'Software suites, hardware appliances, support tiers, and licensing units.',
      rowCount: 24,
      columns: [
        { name: 'PRODUCT_ID', type: 'VARCHAR(32)', isPrimaryKey: true, nullable: false, description: 'Unique product SKU code' },
        { name: 'PRODUCT_NAME', type: 'VARCHAR(128)', nullable: false, description: 'Commercial product title' },
        { name: 'CATEGORY_ID', type: 'VARCHAR(32)', isForeignKey: true, nullable: false, description: 'Category grouping classification' },
        { name: 'BASE_PRICE', type: 'DECIMAL(10,2)', nullable: false, description: 'Standard list price in INR' },
        { name: 'STATUS', type: 'VARCHAR(16)', nullable: false, description: 'ACTIVE or SUNSET' }
      ],
      sampleRows: [
        { PRODUCT_ID: 'PROD-001', PRODUCT_NAME: 'Enterprise Cloud Suite', CATEGORY_ID: 'CAT-SW', BASE_PRICE: 38500, STATUS: 'ACTIVE' },
        { PRODUCT_ID: 'PROD-002', PRODUCT_NAME: 'Quantum Server Nodes', CATEGORY_ID: 'CAT-HW', BASE_PRICE: 295000, STATUS: 'ACTIVE' },
        { PRODUCT_ID: 'PROD-003', PRODUCT_NAME: 'Predictive Analytics Tier', CATEGORY_ID: 'CAT-SW', BASE_PRICE: 21800, STATUS: 'ACTIVE' },
        { PRODUCT_ID: 'PROD-004', PRODUCT_NAME: 'Edge Security Gateway', CATEGORY_ID: 'CAT-HW', BASE_PRICE: 91000, STATUS: 'ACTIVE' }
      ]
    },
    {
      name: 'REGIONS',
      description: 'Regional sales territories, head office locations, and director assignments.',
      rowCount: 4,
      columns: [
        { name: 'REGION_ID', type: 'VARCHAR(16)', isPrimaryKey: true, nullable: false, description: 'Region territory code' },
        { name: 'REGION_NAME', type: 'VARCHAR(32)', nullable: false, description: 'South, West, North, or East' },
        { name: 'HUB_CITY', type: 'VARCHAR(64)', nullable: false, description: 'Regional operations center' },
        { name: 'CURRENCY', type: 'VARCHAR(8)', nullable: false, description: 'Base ledger currency (INR)' }
      ],
      sampleRows: [
        { REGION_ID: 'REG-SOUTH', REGION_NAME: 'South', HUB_CITY: 'Bengaluru', CURRENCY: 'INR' },
        { REGION_ID: 'REG-WEST', REGION_NAME: 'West', HUB_CITY: 'Mumbai', CURRENCY: 'INR' },
        { REGION_ID: 'REG-NORTH', REGION_NAME: 'North', HUB_CITY: 'Delhi NCR', CURRENCY: 'INR' },
        { REGION_ID: 'REG-EAST', REGION_NAME: 'East', HUB_CITY: 'Kolkata', CURRENCY: 'INR' }
      ]
    },
    {
      name: 'CATEGORIES',
      description: 'High-level product classification hierarchy.',
      rowCount: 4,
      columns: [
        { name: 'CATEGORY_ID', type: 'VARCHAR(32)', isPrimaryKey: true, nullable: false, description: 'Category identifier' },
        { name: 'CATEGORY_NAME', type: 'VARCHAR(64)', nullable: false, description: 'Software Subscriptions, Hardware Appliances, etc.' },
        { name: 'TARGET_MARGIN', type: 'DECIMAL(5,2)', nullable: false, description: 'Target operating margin %' }
      ],
      sampleRows: [
        { CATEGORY_ID: 'CAT-SW', CATEGORY_NAME: 'Software Subscriptions', TARGET_MARGIN: 78.5 },
        { CATEGORY_ID: 'CAT-HW', CATEGORY_NAME: 'Hardware Appliances', TARGET_MARGIN: 42.0 },
        { CATEGORY_ID: 'CAT-SRV', CATEGORY_NAME: 'Professional Services', TARGET_MARGIN: 55.0 },
        { CATEGORY_ID: 'CAT-SUP', CATEGORY_NAME: 'Support Retainers', TARGET_MARGIN: 65.0 }
      ]
    },
    {
      name: 'ORDER_ITEMS',
      description: 'Line item breakdown for each order transaction.',
      rowCount: 19840,
      columns: [
        { name: 'ITEM_ID', type: 'VARCHAR(32)', isPrimaryKey: true, nullable: false, description: 'Unique line item identifier' },
        { name: 'ORDER_ID', type: 'VARCHAR(32)', isForeignKey: true, nullable: false, description: 'Parent order reference' },
        { name: 'PRODUCT_ID', type: 'VARCHAR(32)', isForeignKey: true, nullable: false, description: 'Purchased SKU' },
        { name: 'QUANTITY', type: 'INTEGER', nullable: false, description: 'Units purchased' },
        { name: 'UNIT_PRICE', type: 'DECIMAL(10,2)', nullable: false, description: 'Unit price at checkout' }
      ],
      sampleRows: [
        { ITEM_ID: 'ITM-0192', ORDER_ID: 'ORD-98214', PRODUCT_ID: 'PROD-001', QUANTITY: 1, UNIT_PRICE: 38500 },
        { ITEM_ID: 'ITM-0193', ORDER_ID: 'ORD-98215', PRODUCT_ID: 'PROD-003', QUANTITY: 1, UNIT_PRICE: 21800 },
        { ITEM_ID: 'ITM-0194', ORDER_ID: 'ORD-98216', PRODUCT_ID: 'PROD-002', QUANTITY: 1, UNIT_PRICE: 295000 }
      ]
    },
    {
      name: 'INVENTORY',
      description: 'Current warehouse stock levels and lead times for hardware devices.',
      rowCount: 64,
      columns: [
        { name: 'WAREHOUSE_ID', type: 'VARCHAR(16)', isPrimaryKey: true, nullable: false, description: 'Facility identifier' },
        { name: 'PRODUCT_ID', type: 'VARCHAR(32)', isPrimaryKey: true, isForeignKey: true, nullable: false, description: 'Stock SKU' },
        { name: 'UNITS_AVAILABLE', type: 'INTEGER', nullable: false, description: 'Physical items ready to dispatch' },
        { name: 'REORDER_POINT', type: 'INTEGER', nullable: false, description: 'Restock threshold' }
      ],
      sampleRows: [
        { WAREHOUSE_ID: 'WH-BLR-01', PRODUCT_ID: 'PROD-002', UNITS_AVAILABLE: 142, REORDER_POINT: 30 },
        { WAREHOUSE_ID: 'WH-BOM-01', PRODUCT_ID: 'PROD-004', UNITS_AVAILABLE: 89, REORDER_POINT: 25 },
        { WAREHOUSE_ID: 'WH-DEL-01', PRODUCT_ID: 'PROD-002', UNITS_AVAILABLE: 64, REORDER_POINT: 20 }
      ]
    },
    {
      name: 'SHIPMENTS',
      description: 'Fulfillment carriers, tracking identifiers, and delivery timestamps.',
      rowCount: 8200,
      columns: [
        { name: 'SHIPMENT_ID', type: 'VARCHAR(32)', isPrimaryKey: true, nullable: false, description: 'Dispatch reference code' },
        { name: 'ORDER_ID', type: 'VARCHAR(32)', isForeignKey: true, nullable: false, description: 'Associated order reference' },
        { name: 'CARRIER', type: 'VARCHAR(48)', nullable: false, description: 'Blue Dart, Delhivery, Fedex' },
        { name: 'DELIVERY_STATUS', type: 'VARCHAR(24)', nullable: false, description: 'DELIVERED, IN_TRANSIT, OUT_FOR_DELIVERY' }
      ],
      sampleRows: [
        { SHIPMENT_ID: 'SHP-4401', ORDER_ID: 'ORD-98214', CARRIER: 'Blue Dart Express', DELIVERY_STATUS: 'DELIVERED' },
        { SHIPMENT_ID: 'SHP-4402', ORDER_ID: 'ORD-98215', CARRIER: 'Delhivery B2B', DELIVERY_STATUS: 'DELIVERED' },
        { SHIPMENT_ID: 'SHP-4403', ORDER_ID: 'ORD-98216', CARRIER: 'Blue Dart Express', DELIVERY_STATUS: 'IN_TRANSIT' }
      ]
    }
  ]
};
