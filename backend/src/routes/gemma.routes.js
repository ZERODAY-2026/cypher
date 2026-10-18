import { Router } from 'express';
import { testGemmaPlanning } from '../controllers/gemma.controller.js';

const router = Router();

// POST /api/gemma/test
router.post('/test', testGemmaPlanning);

export default router;
