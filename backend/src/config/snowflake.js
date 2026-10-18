import config from './env.js';

/**
 * Validates if the minimal required Snowflake credentials are present in environment variables.
 * @returns {boolean}
 */
export const isSnowflakeConfigured = () => {
  return Boolean(
    config.snowflake.account &&
    config.snowflake.account.trim() &&
    config.snowflake.username &&
    config.snowflake.username.trim() &&
    config.snowflake.password
  );
};

/**
 * Snowflake connection configuration structure.
 * Credentials are read dynamically from environment variables.
 * Optional parameters (warehouse, database, schema, role) are only passed if defined,
 * allowing Snowflake to fallback to user profile defaults if omitted.
 *
 * @returns {object} Snowflake connection options object
 */
export const getSnowflakeConfig = () => {
  const connectionOptions = {
    account: config.snowflake.account?.trim(),
    username: config.snowflake.username?.trim(),
    password: config.snowflake.password,
  };

  if (config.snowflake.warehouse && config.snowflake.warehouse.trim()) {
    connectionOptions.warehouse = config.snowflake.warehouse.trim();
  }
  if (config.snowflake.database && config.snowflake.database.trim()) {
    connectionOptions.database = config.snowflake.database.trim();
  }
  if (config.snowflake.schema && config.snowflake.schema.trim()) {
    connectionOptions.schema = config.snowflake.schema.trim();
  }
  if (config.snowflake.role && config.snowflake.role.trim()) {
    connectionOptions.role = config.snowflake.role.trim();
  }

  return connectionOptions;
};

export default {
  isSnowflakeConfigured,
  getSnowflakeConfig,
};
