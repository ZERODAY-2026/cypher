import { Router } from 'express';
import { testSnowflakeQuery } from '../controllers/snowflake.controller.js';

const router = Router();

// GET /api/snowflake/test
router.get('/test', testSnowflakeQuery);

export default router;
