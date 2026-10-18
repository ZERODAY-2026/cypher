import { HistoryItem, QueryAnalysis } from '../types/analytics';
import { PREDEFINED_ANALYSES } from '../data/sampleQueries';

const STORAGE_KEY = 'datamind_query_history_v1';

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    question: 'Which products generated the highest revenue?',
    timestamp: '10:45 AM',
    dataset: 'Sample Enterprise Sales Dataset',
    status: 'Demo Simulation',
    rowCount: 5,
    matchedSlug: 'top-products',
    sqlQuery: PREDEFINED_ANALYSES['top-products'].sqlQuery
  },
  {
    id: 'hist-2',
    question: 'Compare sales by region.',
    timestamp: '10:22 AM',
    dataset: 'Sample Enterprise Sales Dataset',
    status: 'Demo Simulation',
    rowCount: 4,
    matchedSlug: 'regional-sales',
    sqlQuery: PREDEFINED_ANALYSES['regional-sales'].sqlQuery
  },
  {
    id: 'hist-3',
    question: 'Show monthly revenue trends.',
    timestamp: '09:50 AM',
    dataset: 'Sample Enterprise Sales Dataset',
    status: 'Demo Simulation',
    rowCount: 12,
    matchedSlug: 'monthly-trends',
    sqlQuery: PREDEFINED_ANALYSES['monthly-trends'].sqlQuery
  },
  {
    id: 'hist-4',
    question: 'Which category had the highest order volume?',
    timestamp: 'Yesterday',
    dataset: 'Sample Enterprise Sales Dataset',
    status: 'Demo Simulation',
    rowCount: 4,
    matchedSlug: 'category-volume',
    sqlQuery: PREDEFINED_ANALYSES['category-volume'].sqlQuery
  }
];

export class MockHistoryService {
  public static getHistory(): HistoryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HISTORY));
        return INITIAL_HISTORY;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_HISTORY;
    }
  }

  public static addHistoryItem(analysis: QueryAnalysis): HistoryItem {
    const history = this.getHistory();
    const newItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      question: analysis.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dataset: analysis.dataset,
      status: 'Demo Simulation',
      rowCount: analysis.tableRows.length,
      matchedSlug: analysis.matchedSlug,
      sqlQuery: analysis.sqlQuery
    };

    const updated = [newItem, ...history].slice(0, 50); // limit to recent 50
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
    return newItem;
  }

  public static addUnsupportedItem(question: string): HistoryItem {
    const history = this.getHistory();
    const newItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dataset: 'Sample Enterprise Sales Dataset',
      status: 'Unsupported',
      rowCount: 0,
      matchedSlug: '',
      sqlQuery: '-- Question not supported in demo mode'
    };

    const updated = [newItem, ...history].slice(0, 50);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
    return newItem;
  }

  public static clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
