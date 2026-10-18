import { generateQueryPlan } from '../services/gemma.service.js';

/**
 * Controller for testing Gemma NL-to-SQL query planning.
 * POST /api/gemma/test
 */
export const testGemmaPlanning = async (req, res) => {
  const { question, schema } = req.body || {};

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Question is required and cannot be empty.',
    });
  }

  try {
    const queryPlan = await generateQueryPlan(question.trim(), schema || null);

    return res.status(200).json({
      success: true,
      question: question.trim(),
      queryPlan,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
};

export default {
  testGemmaPlanning,
};
