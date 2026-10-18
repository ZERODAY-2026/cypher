import config from '../config/env.js';

/**
 * Health check controller
 * Confirms that the DataMind backend service is active and responsive.
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'PS1 DataMind Backend',
    message: 'DataMind backend is running and ready for connections.',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
  });
};

export default {
  getHealth,
};
