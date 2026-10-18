import app from './app.js';
import config from './config/env.js';
import { closeSnowflakeConnection } from './services/snowflake.service.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` PS1 DataMind Backend Server Running`);
  console.log(` Port:        ${PORT}`);
  console.log(` Environment: ${config.nodeEnv}`);
  console.log(` Health URL:  http://localhost:${PORT}/api/health`);
  console.log(` Snowflake:   http://localhost:${PORT}/api/snowflake/test`);
  console.log(` Gemma:       POST http://localhost:${PORT}/api/gemma/test`);
  console.log(` DataMind:    POST http://localhost:${PORT}/api/ask`);
  console.log(`===============================================`);
});

// Graceful shutdown handling
const handleGracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  try {
    await closeSnowflakeConnection();
    console.log('Snowflake connection closed successfully.');
  } catch (err) {
    console.error('Error closing Snowflake connection:', err.message);
  }

  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force shutdown after timeout if pending connections hang
  setTimeout(() => {
    console.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 5000);
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

// Process-level error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1);
});

export default server;

