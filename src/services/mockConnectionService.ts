import { SnowflakeConnectionConfig } from '../types/analytics';

const CONNECTION_STORAGE_KEY = 'datamind_snowflake_demo_config';

export const DEFAULT_SNOWFLAKE_CONFIG: SnowflakeConnectionConfig = {
  account: 'xy12345.ap-south-1.aws',
  username: 'ANALYTICS_DEMO_USER',
  warehouse: 'COMPUTE_WH_XS',
  database: 'ANALYTICS_DEMO_DB',
  schema: 'SALES_DATA',
  role: 'ANALYTICS_READONLY_ROLE',
  authMethod: 'password'
};

export interface ConnectionTestResult {
  simulated: boolean;
  success: boolean;
  message: string;
  details: {
    accountValidated: boolean;
    warehouseFound: boolean;
    schemaAccessible: boolean;
    notice: string;
  };
}

export class MockConnectionService {
  public static getConfig(): SnowflakeConnectionConfig {
    try {
      const stored = localStorage.getItem(CONNECTION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return DEFAULT_SNOWFLAKE_CONFIG;
  }

  public static saveConfig(config: SnowflakeConnectionConfig): void {
    try {
      localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }

  public static resetConfig(): SnowflakeConnectionConfig {
    try {
      localStorage.removeItem(CONNECTION_STORAGE_KEY);
    } catch {
      // ignore
    }
    return DEFAULT_SNOWFLAKE_CONFIG;
  }

  public static async simulateTestConnection(config: SnowflakeConnectionConfig): Promise<ConnectionTestResult> {
    // Artificial latency for realistic testing feedback
    await new Promise((resolve) => setTimeout(resolve, 850));

    const isValid = Boolean(
      config.account.trim() &&
      config.username.trim() &&
      config.warehouse.trim() &&
      config.database.trim() &&
      config.schema.trim()
    );

    if (!isValid) {
      return {
        simulated: true,
        success: false,
        message: 'Validation failed: Please ensure Account, Username, Warehouse, Database, and Schema fields are specified.',
        details: {
          accountValidated: Boolean(config.account.trim()),
          warehouseFound: Boolean(config.warehouse.trim()),
          schemaAccessible: Boolean(config.schema.trim()),
          notice: 'Prototype simulation: Form validation failed.'
        }
      };
    }

    return {
      simulated: true,
      success: true,
      message: 'Demo Connection Simulated: Parameters format valid.',
      details: {
        accountValidated: true,
        warehouseFound: true,
        schemaAccessible: true,
        notice: 'Note: This is a frontend prototype. No live Snowflake instance or network socket was opened.'
      }
    };
  }
}
