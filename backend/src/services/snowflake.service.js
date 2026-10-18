import snowflake from 'snowflake-sdk';
import { getSnowflakeConfig, isSnowflakeConfigured } from '../config/snowflake.js';

// Cache singleton connection
let cachedConnection = null;
let connectingPromise = null;

// Disallowed mutating SQL statement keywords
const PROHIBITED_KEYWORDS = [
  'INSERT',
  'UPDATE',
  'DELETE',
  'DROP',
  'ALTER',
  'TRUNCATE',
  'CREATE',
  'MERGE',
  'GRANT',
  'REVOKE',
];

const PROHIBITED_REGEX = new RegExp(`\\b(${PROHIBITED_KEYWORDS.join('|')})\\b`, 'i');

/**
 * Sanitizes an error message to prevent leaking secrets, credentials, or sensitive tokens.
 * @param {string} message
 * @returns {string}
 */
export const sanitizeErrorMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return 'An unexpected database error occurred.';
  }
  return message
    .replace(/(password|pwd|secret|token)\s*[:=]\s*[^\s,;]+/gi, '$1=***')
    .replace(/(password is )([^\s,;]+)/gi, '$1***');
};

/**
 * Validates that a SQL query is read-only and safe to execute.
 * Rejects INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, CREATE, MERGE, GRANT, REVOKE,
 * and rejects chained/multiple statements.
 *
 * @param {string} sql - SQL statement to validate
 * @returns {{ isValid: boolean, reason?: string }}
 */
export const validateReadOnlySql = (sql) => {
  if (!sql || typeof sql !== 'string' || !sql.trim()) {
    return { isValid: false, reason: 'SQL query cannot be empty.' };
  }

  // Strip multi-line and single-line SQL comments to prevent evasion
  const strippedSql = sql
    .replace(/\/\*[\s\S]*?\*\/|--.*$/gm, '')
    .trim();

  if (!strippedSql) {
    return { isValid: false, reason: 'SQL query contains only comments or whitespace.' };
  }

  // Check for multiple statements separated by semicolons (ignoring trailing semicolon)
  const statements = strippedSql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

  if (statements.length > 1) {
    return { isValid: false, reason: 'Multiple SQL statements are not permitted.' };
  }

  // Check for prohibited mutating keywords
  const match = strippedSql.match(PROHIBITED_REGEX);
  if (match) {
    return {
      isValid: false,
      reason: `Query rejected: Prohibited statement keyword detected (${match[1].toUpperCase()}). Only read-only queries are permitted.`,
    };
  }

  return { isValid: true };
};

/**
 * Establishes or reuses an existing Snowflake connection.
 * Avoids creating a new connection for every request.
 *
 * @returns {Promise<object>} Active Snowflake connection object
 */
export const getSnowflakeConnection = async () => {
  // Reuse existing healthy connection if available
  if (cachedConnection && cachedConnection.isUp()) {
    return cachedConnection;
  }

  // If a connection attempt is currently in-flight, await that promise
  if (connectingPromise) {
    return connectingPromise;
  }

  // Validate credentials exist in environment
  if (!isSnowflakeConfigured()) {
    const error = new Error(
      'Snowflake credentials are not configured. Please define SNOWFLAKE_ACCOUNT, SNOWFLAKE_USERNAME, and SNOWFLAKE_PASSWORD in your .env file.'
    );
    error.statusCode = 400;
    throw error;
  }

  connectingPromise = new Promise((resolve, reject) => {
    try {
      const options = getSnowflakeConfig();
      const connection = snowflake.createConnection(options);

      connection.connect((err, conn) => {
        connectingPromise = null;
        if (err) {
          cachedConnection = null;
          const sanitizedMsg = sanitizeErrorMessage(err.message);
          const connErr = new Error(`Snowflake connection failed: ${sanitizedMsg}`);
          connErr.code = err.code;
          connErr.statusCode = 500;
          return reject(connErr);
        }

        cachedConnection = conn;
        resolve(cachedConnection);
      });
    } catch (err) {
      connectingPromise = null;
      cachedConnection = null;
      const sanitizedMsg = sanitizeErrorMessage(err.message);
      const setupErr = new Error(`Failed to initialize Snowflake client: ${sanitizedMsg}`);
      setupErr.statusCode = 500;
      reject(setupErr);
    }
  });

  return connectingPromise;
};

/**
 * Executes a read-only SQL query against Snowflake.
 * Validates the query first and returns structured result data.
 *
 * @param {string} sqlText - Read-only SQL query string
 * @param {Array} [binds=[]] - Optional query parameter bindings
 * @returns {Promise<{ query: string, rows: Array<object>, rowCount: number, columns: Array<string>, statementId: string }>}
 */
export const executeSnowflakeQuery = async (sqlText, binds = []) => {
  // 1. Read-only validation guard
  const validation = validateReadOnlySql(sqlText);
  if (!validation.isValid) {
    const validationError = new Error(validation.reason);
    validationError.statusCode = 400;
    throw validationError;
  }

  // 2. Obtain connection
  const connection = await getSnowflakeConnection();

  // 3. Execute statement
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText,
      binds,
      complete: (err, stmt, rows) => {
        if (err) {
          const sanitizedMsg = sanitizeErrorMessage(err.message);
          const queryErr = new Error(`Snowflake query execution error: ${sanitizedMsg}`);
          queryErr.code = err.code;
          queryErr.sqlState = err.sqlState;
          queryErr.statusCode = 500;
          return reject(queryErr);
        }

        const columns = stmt && typeof stmt.getColumns === 'function'
          ? stmt.getColumns().map((col) => col.getName())
          : [];

        const statementId = stmt && typeof stmt.getStatementId === 'function'
          ? stmt.getStatementId()
          : null;

        resolve({
          query: sqlText,
          rows: rows || [],
          rowCount: rows ? rows.length : 0,
          columns,
          statementId,
        });
      },
    });
  });
};

/**
 * Closes the Snowflake connection gracefully if active.
 *
 * @returns {Promise<void>}
 */
export const closeSnowflakeConnection = async () => {
  if (cachedConnection && cachedConnection.isUp()) {
    return new Promise((resolve) => {
      try {
        cachedConnection.destroy((err) => {
          if (err) {
            console.error('Error destroying Snowflake connection:', sanitizeErrorMessage(err.message));
          }
          cachedConnection = null;
          connectingPromise = null;
          resolve();
        });
      } catch (err) {
        cachedConnection = null;
        connectingPromise = null;
        resolve();
      }
    });
  }
  cachedConnection = null;
  connectingPromise = null;
};

export default {
  validateReadOnlySql,
  getSnowflakeConnection,
  executeSnowflakeQuery,
  closeSnowflakeConnection,
  sanitizeErrorMessage,
};
