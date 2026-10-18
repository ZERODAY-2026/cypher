import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Enable CORS for frontend applications
app.use(cors({
  origin: '*', // Allow frontend development clients
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'PS1 DataMind API is active. Use /api/health for system status.',
    docs: '/api/health',
  });
});

// API Routes
app.use('/api', apiRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
