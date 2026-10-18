import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  BarChart3,
  Table as TableIcon,
  Code2,
  Layers,
  Info,
  Clock,
  ArrowRight,
  Database,
  RefreshCw,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ChartCard } from '../../components/common/ChartCard';
import { DataTable } from '../../components/common/DataTable';
import { SQLViewer } from '../../components/common/SQLViewer';
import { EvidencePanel } from '../../components/common/EvidencePanel';
import { LoadingSkeleton, ChartSkeleton } from '../../components/common/LoadingSkeleton';
import { SUPPORTED_QUESTIONS, PREDEFINED_ANALYSES } from '../../data/sampleQueries';
import { MockAnalysisService } from '../../services/mockAnalysisService';
import { MockHistoryService } from '../../services/mockHistoryService';
import { QueryAnalysis } from '../../types/analytics';
import { useToast } from '../../components/common/Toast';

export const AskDataPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [questionInput, setQuestionInput] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('sales');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<QueryAnalysis | null>(PREDEFINED_ANALYSES['top-products']);
  const [activeTab, setActiveTab] = useState<'chart' | 'table' | 'sql' | 'evidence' | 'execution'>('chart');
  const [unsupportedMessage, setUnsupportedMessage] = useState<string | null>(null);

  // Check if routed with prefilled question (from dashboard or history)
  useEffect(() => {
    if (location.state && (location.state as { prefilledQuestion?: string }).prefilledQuestion) {
      const q = (location.state as { prefilledQuestion: string }).prefilledQuestion;
      setQuestionInput(q);
      executeQuestion(q);
    }
  }, [location.state]);

  const executeQuestion = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setUnsupportedMessage(null);

    const response = await MockAnalysisService.analyzeQuestion(trimmed);
    setIsLoading(false);

    if (response.success && response.analysis) {
      setCurrentAnalysis(response.analysis);
      MockHistoryService.addHistoryItem(response.analysis);
      showToast('Analysis completed', 'Sample query result generated successfully', 'success');
    } else {
      setUnsupportedMessage(
        response.error ||
          'This question is outside the scope of our predefined frontend demonstration. Please choose from our supported sample queries.'
      );
      MockHistoryService.addUnsupportedItem(trimmed);
      showToast('Unsupported in Demo', 'Only predefined sample questions are supported in this prototype', 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuestion(questionInput);
  };

  const handlePromptChipClick = (question: string) => {
    setQuestionInput(question);
    executeQuestion(question);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Question Composer Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">Natural Language Question Composer</h2>
          </div>
          {/* Dataset selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Active Dataset:</span>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-md px-2 py-1 text-xs font-medium focus:outline-blue-500 cursor-pointer"
            >
              <option value="sales">Sample Enterprise Sales Dataset (8,432 rows)</option>
              <option value="customers">Enterprise Accounts & Territories (1,420 rows)</option>
              <option value="inventory">Hardware Inventory Warehouse (64 rows)</option>
            </select>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="e.g. Which products generated the highest revenue? Or compare sales by region..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-colors h-10"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !questionInput.trim()}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-lg shadow-2xs transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer h-10"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <span>Run Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Prompt Chips */}
        <div className="space-y-1.5 pt-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Suggested Sample Questions
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUPPORTED_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptChipClick(question)}
                className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 text-xs text-slate-700 transition-colors text-left truncate max-w-full cursor-pointer shadow-2xs"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            <span>
              Simulating AI reasoning and query execution against local sample dataset...
            </span>
          </div>
          <LoadingSkeleton rows={5} />
        </div>
      )}

      {/* Unsupported Question Alert */}
      {unsupportedMessage && !isLoading && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-amber-900">
                Predefined Demo Scope Notice
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">{unsupportedMessage}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-amber-200/60">
            <div className="text-xs font-semibold text-amber-900 mb-2">
              Try one of these supported queries:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUPPORTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptChipClick(q)}
                  className="text-left p-2 rounded bg-white/80 border border-amber-200 hover:bg-white text-xs text-slate-800 transition-colors"
                >
                  • {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analysis Result Display */}
      {currentAnalysis && !isLoading && !unsupportedMessage && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden space-y-0">
          {/* Top Result Banner */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentAnalysis.dataset}</span>
                <span>·</span>
                <span className="font-mono tabular-nums">{currentAnalysis.timestamp}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                "{currentAnalysis.question}"
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                Sample Data Simulation
              </span>
            </div>
          </div>

          {/* Synthesized Answer Summary */}
          <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-blue-50/20">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">
                  Answer Summary
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {currentAnalysis.summary}
                </p>
                <p className="text-xs text-slate-500 pt-0.5 leading-relaxed">
                  <strong>Analytical logic:</strong> {currentAnalysis.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 pt-2 border-b border-slate-200 bg-white flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('chart')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'chart'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Chart View</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'table'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View ({currentAnalysis.tableRows.length} rows)</span>
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'sql'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>SQL Code</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'evidence'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Evidence & Logic</span>
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'execution'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Execution Details</span>
            </button>
          </div>

          {/* Active Tab View */}
          <div className="p-4 sm:p-5">
            {activeTab === 'chart' && (
              <ChartCard
                title={currentAnalysis.question}
                subtitle="Aggregated representation from sample records"
                data={currentAnalysis.chartData}
                type={currentAnalysis.chartType === 'line' ? 'line' : currentAnalysis.chartType === 'horizontal-bar' ? 'horizontal-bar' : 'bar'}
                height={280}
                borderless={true}
              />
            )}

            {activeTab === 'table' && (
              <DataTable
                columns={currentAnalysis.tableColumns}
                data={currentAnalysis.tableRows}
                caption={`Query Results: ${currentAnalysis.tableRows.length} records`}
                allowExport={true}
                exportFileName={`datamind-${currentAnalysis.matchedSlug}.csv`}
              />
            )}

            {activeTab === 'sql' && (
              <div className="space-y-3">
                <SQLViewer sql={currentAnalysis.sqlQuery} />
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      navigate('/inspector', { state: { selectedSlug: currentAnalysis.matchedSlug } })
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Full Query Inspector</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <EvidencePanel evidence={currentAnalysis.evidence} />
            )}

            {activeTab === 'execution' && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3.5 text-xs">
                <div className="font-semibold text-slate-900 text-sm">
                  Simulated Execution Profile
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500">Execution Status</span>
                    <p className="font-semibold text-slate-800 mt-0.5 font-mono">
                      {currentAnalysis.executionMetrics.status}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500">Execution Source</span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {currentAnalysis.executionMetrics.source}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500">Warehouse Query ID</span>
                    <p className="font-mono text-slate-600 mt-0.5">
                      {currentAnalysis.executionMetrics.queryId}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500">Execution Duration</span>
                    <p className="font-mono text-slate-600 mt-0.5">
                      {currentAnalysis.executionMetrics.executionDuration}
                    </p>
                  </div>
                </div>
                <p className="text-slate-500 leading-normal pt-1 text-[11px]">
                  In the planned full-stack release with Snowflake and Google Gemma, this tab will display the remote Snowflake Query UUID, execution timing in milliseconds, bytes scanned, and cluster warehouse utilization.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
