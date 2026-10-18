import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Trash2,
  Copy,
  ArrowRight,
  Filter,
  ArrowUpDown,
  RefreshCw,
  ExternalLink,
  Code2
} from 'lucide-react';
import { MockHistoryService } from '../../services/mockHistoryService';
import { HistoryItem } from '../../types/analytics';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { useToast } from '../../components/common/Toast';

export const QueryHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Demo Simulation' | 'Unsupported'>('all');
  const [sortField, setSortField] = useState<'timestamp' | 'question' | 'rowCount'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistoryItems(MockHistoryService.getHistory());
  };

  const handleCopySql = async (sql: string) => {
    try {
      await navigator.clipboard.writeText(sql);
      showToast('Copied SQL', 'SQL query copied to clipboard', 'success');
    } catch {
      showToast('Copy Failed', 'Please select and copy manually', 'error');
    }
  };

  const handleConfirmClear = () => {
    MockHistoryService.clearHistory();
    setHistoryItems([]);
    setShowClearDialog(false);
    showToast('History Cleared', 'All stored query history has been removed', 'info');
  };

  const handleRerun = (item: HistoryItem) => {
    navigate('/ask', { state: { prefilledQuestion: item.question } });
  };

  const handleOpenInspector = (item: HistoryItem) => {
    if (item.matchedSlug) {
      navigate('/inspector', { state: { selectedSlug: item.matchedSlug } });
    } else {
      navigate('/inspector');
    }
  };

  // Filter & sort
  const filteredItems = historyItems
    .filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dataset.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === 'question') {
        return sortOrder === 'asc'
          ? a.question.localeCompare(b.question)
          : b.question.localeCompare(a.question);
      }
      if (sortField === 'rowCount') {
        return sortOrder === 'asc' ? a.rowCount - b.rowCount : b.rowCount - a.rowCount;
      }
      // timestamp default
      return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Query History</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review past natural-language queries, re-run simulations, and inspect generated SQL statements.
          </p>
        </div>
        {historyItems.length > 0 && (
          <button
            onClick={() => setShowClearDialog(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search queries by question text or dataset..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none h-9"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({historyItems.length})
          </button>
          <button
            onClick={() => setStatusFilter('Demo Simulation')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
              statusFilter === 'Demo Simulation'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('Unsupported')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
              statusFilter === 'Unsupported'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Unsupported
          </button>
        </div>
      </div>

      {/* History Items Table or Empty State */}
      {filteredItems.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 uppercase tracking-wider text-[11px]">
                <tr>
                  <th
                    onClick={() => {
                      setSortField('question');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="px-3.5 py-2.5 cursor-pointer select-none hover:bg-slate-100 transition-colors"
                  >
                    <div className="inline-flex items-center gap-1.5">
                      <span>Analytical Question</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-3.5 py-2.5">Dataset</th>
                  <th
                    onClick={() => {
                      setSortField('timestamp');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="px-3.5 py-2.5 cursor-pointer select-none hover:bg-slate-100 transition-colors"
                  >
                    <div className="inline-flex items-center gap-1.5">
                      <span>Time</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-3.5 py-2.5">Status</th>
                  <th
                    onClick={() => {
                      setSortField('rowCount');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="px-3.5 py-2.5 text-right cursor-pointer select-none hover:bg-slate-100 transition-colors"
                  >
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <span>Rows</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-3.5 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-3.5 py-2.5 max-w-xs sm:max-w-md font-semibold text-slate-900 truncate">
                      {item.question}
                    </td>
                    <td className="px-3.5 py-2.5 text-slate-600 truncate max-w-[160px]">
                      {item.dataset}
                    </td>
                    <td className="px-3.5 py-2.5 font-mono tabular-nums text-slate-500 whitespace-nowrap">
                      {item.timestamp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          item.status === 'Demo Simulation'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700 whitespace-nowrap">
                      {item.rowCount}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopySql(item.sqlQuery)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                          title="Copy SQL"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRerun(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                          title="Re-run in Ask Data"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenInspector(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                          title="Open in Query Inspector"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Showing {filteredItems.length} query records</span>
            <span>Stored locally in browser session</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={History}
          title={searchQuery ? 'No matching queries found' : 'No query history yet'}
          description={
            searchQuery
              ? `No queries matched "${searchQuery}". Try a different search term or clear the filter.`
              : 'Ask analytical questions in the Ask Data workspace to populate your query history.'
          }
          actionLabel="Go to Ask Data"
          onAction={() => navigate('/ask')}
        />
      )}

      {/* Confirmation Dialog for Clearing History */}
      <ConfirmationDialog
        isOpen={showClearDialog}
        title="Clear Query History?"
        message="This will remove all stored historical queries and simulated analytical responses from your local browser storage. This action cannot be undone."
        confirmLabel="Yes, Clear All"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearDialog(false)}
      />
    </div>
  );
};
