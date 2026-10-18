import { Router } from 'express';
import { askDataMind } from '../controllers/ask.controller.js';

const router = Router();

// POST /api/ask
router.post('/', askDataMind);

export default router;
