import { GoogleGenAI } from '@google/genai';
import config from '../config/env.js';
import DATABASE_SCHEMA from '../config/databaseSchema.js';
import { validateReadOnlySql, sanitizeErrorMessage } from './snowflake.service.js';

export const DEFAULT_DATABASE_SCHEMA = DATABASE_SCHEMA;


/**
 * Formats a database schema object into a clear text prompt for Gemma.
 * @param {object} schema
 * @returns {string}
 */
export const formatSchemaForPrompt = (schema) => {
  if (!schema || !schema.tables || !Array.isArray(schema.tables) || schema.tables.length === 0) {
    return 'No schema information provided.';
  }

  return schema.tables
    .map((table) => {
      const tableHeader = `Table: ${table.name || 'unnamed_table'}${
        table.description ? ` (${table.description})` : ''
      }`;
      const columnLines = (table.columns || [])
        .map((col) => {
          const typeStr = col.type ? ` [${col.type}]` : '';
          const descStr = col.description ? `: ${col.description}` : '';
          return `  - ${col.name}${typeStr}${descStr}`;
        })
        .join('\n');
      return `${tableHeader}\nColumns:\n${columnLines}`;
    })
    .join('\n\n');
};

/**
 * Extracts and parses structured JSON from Gemma raw output,
 * stripping markdown code fences or conversational text if present.
 * @param {string} rawText
 * @returns {object}
 */
export const extractJsonFromText = (rawText) => {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty or invalid response received from Gemma model.');
  }

  let cleanText = rawText.trim();

  // Strip markdown code block fences if present (```json ... ``` or ``` ... ```)
  const markdownMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (markdownMatch && markdownMatch[1]) {
    cleanText = markdownMatch[1].trim();
  }

  // Find boundaries of JSON object if surrounded by residual text
  const firstBrace = cleanText.indexOf('{');
  const lastBrace = cleanText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanText = cleanText.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleanText);
  } catch (err) {
    throw new Error(`Failed to parse structured JSON from Gemma response: ${err.message}`);
  }
};

/**
 * Builds the Gemma prompt including system instructions, schema, and strict output requirements.
 * @param {string} question
 * @param {string} formattedSchema
 * @returns {string}
 */
export const buildGemmaPrompt = (question, formattedSchema) => {
  return `You are the natural-language query planner for PS1 DataMind, a data analytics assistant for Snowflake.
Your task is to analyze the user's natural language question and the provided database schema, then output a structured query plan in strict JSON.

CRITICAL RULES:
1. Target table is DATAMIND_ENERGY. Only use tables and columns explicitly defined in the provided schema. NEVER invent tables, never use example_table, never reference mock datasets, and never invent columns or metrics.
2. Do NOT fabricate data values or answer the question directly. The final numerical/data answer will come from Snowflake execution in a subsequent step.
3. Determine HOW to query the data in Snowflake using read-only SQL (SELECT, WITH, aggregation, filtering, ordering).
4. NEVER generate mutating SQL: INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE, MERGE, GRANT, REVOKE are strictly prohibited.
5. If the user's question cannot be answered from the provided schema (e.g. asking for metrics, entities, or dimensions not present in the tables), return status "unsupported".
6. If the user's question is ambiguous (e.g. could refer to multiple metrics or tables in the schema), do NOT guess. Return status "ambiguous" with "clarificationNeeded": true and list "possibleInterpretations".
7. If the question can be answered, return status "ready" with the query plan and a read-only Snowflake SQL query.
8. Output MUST BE strictly valid JSON and nothing else. No conversational chatter, no markdown formatting outside JSON.

OUTPUT FORMAT SPECIFICATIONS:

Case A: Question is valid and supported by schema
{
  "status": "ready",
  "intent": "Brief description of what data is being retrieved",
  "tables": ["table_name"],
  "columns": ["column_name"],
  "filters": [
    {
      "column": "column_name",
      "operator": "=",
      "value": "literal_value"
    }
  ],
  "groupBy": ["column_name"],
  "orderBy": [
    {
      "column": "column_name",
      "direction": "ASC"
    }
  ],
  "limit": 10,
  "sql": "SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY ... LIMIT 10"
}

Case B: Question is ambiguous given the schema
{
  "status": "ambiguous",
  "message": "Explanation of the ambiguity in the question regarding the available data.",
  "clarificationNeeded": true,
  "possibleInterpretations": [
    "interpretation 1",
    "interpretation 2"
  ]
}

Case C: Question cannot be answered with the available schema
{
  "status": "unsupported",
  "message": "The available dataset does not contain the information needed to answer this question."
}

DATABASE SCHEMA:
${formattedSchema}

USER QUESTION:
"${question}"

JSON RESPONSE:`;
};

/**
 * Generates a structured query plan using Gemma based on the user's question and schema context.
 * DOES NOT execute the generated SQL against Snowflake.
 *
 * @param {string} userQuestion - User question in natural language
 * @param {object} [databaseSchema=null] - Database schema definition
 * @returns {Promise<object>} Structured query plan (status: "ready" | "ambiguous" | "unsupported")
 */
export const generateQueryPlan = async (userQuestion, databaseSchema = null) => {
  if (!userQuestion || typeof userQuestion !== 'string' || !userQuestion.trim()) {
    const error = new Error('Question is required and cannot be empty.');
    error.statusCode = 400;
    throw error;
  }

  const effectiveApiKey = config.gemma.apiKey;
  const effectiveModel = config.gemma.model || 'gemma-2-9b-it';

  if (!effectiveApiKey || !effectiveApiKey.trim()) {
    const error = new Error(
      'GEMMA_API_KEY is not configured in .env. Please define GEMMA_API_KEY (or GEMINI_API_KEY) and GEMMA_MODEL.'
    );
    error.statusCode = 400;
    throw error;
  }

  const schemaToUse =
    databaseSchema && databaseSchema.tables && databaseSchema.tables.length > 0
      ? databaseSchema
      : DEFAULT_DATABASE_SCHEMA;

  const formattedSchema = formatSchemaForPrompt(schemaToUse);
  const prompt = buildGemmaPrompt(userQuestion.trim(), formattedSchema);

  // Initialize official SDK
  const ai = new GoogleGenAI({ apiKey: effectiveApiKey.trim() });

  // Call Gemma model with timeout
  const timeoutMs = 30000;
  let rawResponseText = '';

  try {
    const apiCallPromise = ai.models.generateContent({
      model: effectiveModel,
      contents: prompt,
      config: {
        temperature: 0.1, // Low temperature for deterministic query planning
      },
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Gemma API request timed out after 30 seconds.')), timeoutMs);
    });

    const response = await Promise.race([apiCallPromise, timeoutPromise]);
    rawResponseText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (err) {
    // Sanitize any potential keys or sensitive URLs
    const sanitized = sanitizeErrorMessage(err.message || 'Unknown API error');
    const apiError = new Error(`Gemma generation error: ${sanitized}`);
    apiError.statusCode = err.statusCode || 500;
    throw apiError;
  }

  // Parse structured JSON output
  const queryPlan = extractJsonFromText(rawResponseText);

  if (!queryPlan || typeof queryPlan !== 'object' || !queryPlan.status) {
    const error = new Error('Malformed Gemma response: response did not include a valid status field.');
    error.statusCode = 502;
    throw error;
  }

  // Safety check: if plan is 'ready' and contains a SQL statement, validate it with read-only validator!
  if (queryPlan.status === 'ready' && queryPlan.sql) {
    const safetyCheck = validateReadOnlySql(queryPlan.sql);
    if (!safetyCheck.isValid) {
      const safetyErr = new Error(`Gemma generated an unsafe query: ${safetyCheck.reason}`);
      safetyErr.statusCode = 400;
      throw safetyErr;
    }
  }

  return queryPlan;
};

/**
 * Builds the explanation prompt for Gemma to summarize factual Snowflake results.
 * @param {object} params
 * @param {string} params.question
 * @param {string} params.sql
 * @param {Array<object>} params.rows
 * @param {number} params.rowCount
 * @returns {string}
 */
export const buildExplanationPrompt = ({ question, sql, rows, rowCount }) => {
  const sampleRows = (rows || []).slice(0, 50);
  const formattedRows = JSON.stringify(sampleRows, null, 2);

  return `You are the data communication analyst for PS1 DataMind.
Your sole job is to explain the factual results returned by Snowflake in response to the user's question.

CRITICAL RULES:
1. You are explaining a result that has already been computed by Snowflake.
2. Do NOT invent, recalculate, or modify values. Snowflake is the single source of truth.
3. Use ONLY the supplied Snowflake results.
4. If the result is empty (0 rows), explicitly say that no matching data was found.
5. Explain what the query found in clear, concise, professional human language (1 to 3 sentences).
6. Do NOT present yourself as a database execution engine.
7. Do NOT claim information or trends that are not present in the supplied results.
8. Output plain text explanation only. Do not output markdown code blocks or JSON.

USER QUESTION:
"${question}"

EXECUTED SNOWFLAKE SQL:
${sql}

SNOWFLAKE RESULT (${rowCount} rows):
${formattedRows}

EXPLANATION:`;
};

/**
 * Generates a concise human explanation of real Snowflake query results using Gemma.
 * Gemma DOES NOT calculate or alter numerical data; it communicates the Snowflake result.
 *
 * @param {object} params
 * @param {string} params.question - Original user question
 * @param {string} params.sql - Executed Snowflake SQL
 * @param {Array<object>} params.rows - Actual rows returned by Snowflake
 * @param {number} params.rowCount - Number of rows returned
 * @returns {Promise<string>} Human-friendly factual explanation
 */
export const explainQueryResults = async ({ question, sql, rows, rowCount }) => {
  if (!rows || rows.length === 0) {
    return 'No matching data was found in the available dataset.';
  }

  const effectiveApiKey = config.gemma.apiKey;
  const effectiveModel = config.gemma.model || 'gemma-2-9b-it';

  if (!effectiveApiKey || !effectiveApiKey.trim()) {
    return `Query executed successfully and returned ${rowCount} row${rowCount === 1 ? '' : 's'} from Snowflake.`;
  }

  const prompt = buildExplanationPrompt({ question, sql, rows, rowCount });
  const ai = new GoogleGenAI({ apiKey: effectiveApiKey.trim() });

  try {
    const timeoutMs = 25000;
    const apiCallPromise = ai.models.generateContent({
      model: effectiveModel,
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Gemma explanation request timed out.')), timeoutMs);
    });

    const response = await Promise.race([apiCallPromise, timeoutPromise]);
    const text = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ? text.trim() : `Query returned ${rowCount} row${rowCount === 1 ? '' : 's'} from Snowflake.`;
  } catch (err) {
    console.warn('[DataMind] Gemma explanation generation encountered an issue, using fallback summary:', err.message);
    return `Query executed successfully and returned ${rowCount} row${rowCount === 1 ? '' : 's'} from Snowflake.`;
  }
};

export default {
  DEFAULT_DATABASE_SCHEMA,
  formatSchemaForPrompt,
  extractJsonFromText,
  buildGemmaPrompt,
  generateQueryPlan,
  buildExplanationPrompt,
  explainQueryResults,
};

