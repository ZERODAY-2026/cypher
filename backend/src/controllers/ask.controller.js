import DATABASE_SCHEMA from '../config/databaseSchema.js';
import { generateQueryPlan, explainQueryResults } from '../services/gemma.service.js';
import { validateReadOnlySql, executeSnowflakeQuery } from '../services/snowflake.service.js';

const MAX_QUESTION_LENGTH = 1000;

/**
 * Main DataMind query pipeline controller.
 * Orchestrates: User Question -> Gemma Planning -> SQL Validation -> Snowflake Execution -> Gemma Explanation.
 *
 * POST /api/ask
 */
export const askDataMind = async (req, res) => {
  const { question } = req.body || {};

  // 1. Request validation
  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid question.',
    });
  }

  const cleanQuestion = question.trim();

  if (cleanQuestion.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({
      success: false,
      error: `Question exceeds maximum allowed length of ${MAX_QUESTION_LENGTH} characters.`,
    });
  }

  console.log(`[DataMind] User question received: "${cleanQuestion}"`);

  try {
    // 2. Step 1: Gemma Query Planning
    console.log('[DataMind] Generating query plan with Gemma...');
    const plan = await generateQueryPlan(cleanQuestion, DATABASE_SCHEMA);
    console.log(`[DataMind] Gemma query plan generated: status = "${plan.status}"`);

    // Handle Ambiguous Status (Snowflake is NOT queried)
    if (plan.status === 'ambiguous') {
      console.log('[DataMind] Question is ambiguous. Bypassing Snowflake execution.');
      return res.status(200).json({
        success: true,
        status: 'ambiguous',
        question: cleanQuestion,
        message: plan.message || 'The question could refer to multiple available metrics.',
        clarificationNeeded: true,
        possibleInterpretations: plan.possibleInterpretations || [],
      });
    }

    // Handle Unsupported Status (Snowflake is NOT queried)
    if (plan.status === 'unsupported') {
      console.log('[DataMind] Question is unsupported by schema. Bypassing Snowflake execution.');
      return res.status(200).json({
        success: true,
        status: 'unsupported',
        question: cleanQuestion,
        message: plan.message || 'The available dataset does not contain the information needed to answer this question.',
      });
    }

    // Handle Unexpected Non-Ready Status
    if (plan.status !== 'ready' || !plan.sql) {
      console.warn('[DataMind] Query plan did not return a valid SQL query.');
      return res.status(400).json({
        success: false,
        status: 'rejected',
        error: plan.message || 'Gemma could not construct a valid query for this question.',
      });
    }

    // 3. Step 2: Read-Only SQL Safety Validation
    console.log(`[DataMind] Validating read-only safety for SQL: "${plan.sql}"`);
    const validation = validateReadOnlySql(plan.sql);
    if (!validation.isValid) {
      console.warn(`[DataMind] SQL validation rejected: ${validation.reason}`);
      return res.status(400).json({
        success: false,
        status: 'rejected',
        error: 'Generated SQL failed read-only validation.',
      });
    }
    console.log('[DataMind] SQL validation passed.');

    // 4. Step 3: Execute Real SQL Query on Snowflake
    console.log('[DataMind] Executing Snowflake query...');
    let queryResult;
    try {
      queryResult = await executeSnowflakeQuery(plan.sql);
    } catch (snowflakeErr) {
      console.error('[DataMind] Snowflake execution error:', snowflakeErr.message);
      return res.status(500).json({
        success: false,
        status: 'query_error',
        question: cleanQuestion,
        sql: plan.sql,
        error: 'The query could not be executed.',
      });
    }

    const { rows = [], rowCount = 0 } = queryResult;
    console.log(`[DataMind] Snowflake returned ${rowCount} rows.`);

    // 5. Step 4: Check For Empty Results
    if (rowCount === 0) {
      console.log('[DataMind] Query produced 0 rows. Returning no_data without hallucination.');
      return res.status(200).json({
        success: true,
        status: 'no_data',
        question: cleanQuestion,
        answer: 'No matching data was found in the available dataset.',
        query: {
          sql: plan.sql,
          rowCount: 0,
        },
        data: [],
        evidence: {
          source: 'Snowflake',
          rowsReturned: 0,
        },
      });
    }

    // 6. Step 5: Gemma Explanation of Real Snowflake Results
    console.log('[DataMind] Generating explanation with Gemma...');
    const answer = await explainQueryResults({
      question: cleanQuestion,
      sql: plan.sql,
      rows,
      rowCount,
    });
    console.log('[DataMind] Query pipeline completed successfully.');

    // 7. Step 6: Return Final Structured Response
    return res.status(200).json({
      success: true,
      status: 'completed',
      question: cleanQuestion,
      answer,
      query: {
        sql: plan.sql,
        rowCount,
      },
      data: rows,
      evidence: {
        source: 'Snowflake',
        rowsReturned: rowCount,
      },
    });
  } catch (error) {
    console.error('[DataMind] Pipeline error:', error.message);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      status: 'error',
      error: error.message || 'An unexpected error occurred while processing your question.',
    });
  }
};

export default {
  askDataMind,
};
