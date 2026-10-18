import { executeSnowflakeQuery } from '../services/snowflake.service.js';

/**
 * Controller for testing Snowflake connection and read-only query execution.
 * GET /api/snowflake/test
 */
export const testSnowflakeQuery = async (req, res, next) => {
  const testSql = 'SELECT CURRENT_TIMESTAMP() AS CURRENT_TIMESTAMP';

  try {
    const result = await executeSnowflakeQuery(testSql);

    return res.status(200).json({
      success: true,
      query: result.query,
      rows: result.rows,
      rowCount: result.rowCount,
    });
  } catch (error) {
    // If it's a configuration or validation error (400) or connection/query error (500)
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
};

export default {
  testSnowflakeQuery,
};
