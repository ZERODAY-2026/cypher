import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure .env is loaded from the backend root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  snowflake: {
    account: process.env.SNOWFLAKE_ACCOUNT || '',
    username: process.env.SNOWFLAKE_USERNAME || '',
    password: process.env.SNOWFLAKE_PASSWORD || '',
    database: process.env.SNOWFLAKE_DATABASE || '',
    schema: process.env.SNOWFLAKE_SCHEMA || '',
    warehouse: process.env.SNOWFLAKE_WAREHOUSE || '',
    role: process.env.SNOWFLAKE_ROLE || '',
  },
  gemma: {
    apiKey: process.env.GEMMA_API_KEY || process.env.GEMINI_API_KEY || '',
    model: process.env.GEMMA_MODEL || 'gemma-2-9b-it',
  },
};

export default config;
