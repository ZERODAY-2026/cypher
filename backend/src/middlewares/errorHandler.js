import config from '../config/env.js';

/**
 * 404 Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  
  const response = {
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
  };

  if (config.isDev && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default {
  notFoundHandler,
  errorHandler,
};
