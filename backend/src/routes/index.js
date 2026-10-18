import { Router } from 'express';
import healthRoutes from './health.routes.js';
import snowflakeRoutes from './snowflake.routes.js';
import gemmaRoutes from './gemma.routes.js';
import askRoutes from './ask.routes.js';

const router = Router();

// Mount routes
router.use('/', healthRoutes);
router.use('/snowflake', snowflakeRoutes);
router.use('/gemma', gemmaRoutes);
router.use('/ask', askRoutes);

export default router;

