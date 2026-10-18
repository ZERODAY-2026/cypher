import { QueryAnalysis } from '../types/analytics';
import { PREDEFINED_ANALYSES, SUPPORTED_QUESTIONS } from '../data/sampleQueries';

export interface AnalysisResponse {
  success: boolean;
  analysis?: QueryAnalysis;
  error?: string;
  suggestedQuestions?: string[];
}

export class MockAnalysisService {
  /**
   * Matches user question to predefined analytical cases
   */
  public static async analyzeQuestion(questionText: string): Promise<AnalysisResponse> {
    // Simulate brief processing delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 650));

    const normalized = questionText.toLowerCase().trim();

    let matchedSlug: string | null = null;

    if (
      normalized.includes('product') ||
      normalized.includes('highest revenue') ||
      normalized.includes('top product') ||
      normalized.includes('best selling')
    ) {
      matchedSlug = 'top-products';
    } else if (
      normalized.includes('region') ||
      normalized.includes('territory') ||
      normalized.includes('compare sales by region') ||
      normalized.includes('geography')
    ) {
      matchedSlug = 'regional-sales';
    } else if (
      normalized.includes('month') ||
      normalized.includes('trend') ||
      normalized.includes('timeline') ||
      normalized.includes('quarter')
    ) {
      matchedSlug = 'monthly-trends';
    } else if (
      normalized.includes('category') ||
      normalized.includes('volume') ||
      normalized.includes('order volume')
    ) {
      matchedSlug = 'category-volume';
    } else if (
      normalized.includes('average order') ||
      normalized.includes('aov') ||
      normalized.includes('order value')
    ) {
      matchedSlug = 'average-order-value';
    }

    if (matchedSlug && PREDEFINED_ANALYSES[matchedSlug]) {
      const base = PREDEFINED_ANALYSES[matchedSlug];
      // Clone to ensure unique instance with current timestamp
      const analysis: QueryAnalysis = {
        ...base,
        id: `qa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        question: questionText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      return {
        success: true,
        analysis
      };
    }

    // Unsupported question response
    return {
      success: false,
      error:
        'This question is outside the scope of our predefined frontend demonstration. In this prototype phase, DataMind does not connect to a live LLM inference endpoint or Snowflake database. Please select or try one of the supported sample questions.',
      suggestedQuestions: SUPPORTED_QUESTIONS
    };
  }

  public static getAnalysisBySlug(slug: string): QueryAnalysis | null {
    return PREDEFINED_ANALYSES[slug] || null;
  }
}
