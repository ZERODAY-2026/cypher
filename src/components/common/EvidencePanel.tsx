import React from 'react';
import { Database, Filter, Calculator, HelpCircle, Layers, Calendar } from 'lucide-react';
import { AnalysisEvidence } from '../../types/analytics';

interface EvidencePanelProps {
  evidence: AnalysisEvidence;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ evidence }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Analysis Evidence & Calculation Logic</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent breakdown of underlying data sources, applied filters, and analytical assumptions.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-mono tabular-nums">
          {evidence.supportingRowsCount.toLocaleString()} rows analyzed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Table & Freshness */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Underlying Data Sources</span>
          </div>
          <p className="text-xs font-mono text-slate-800 break-words">{evidence.sourceTable}</p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>Dataset snapshot freshness: {evidence.dataFreshness}</span>
          </div>
        </div>

        {/* Aggregations */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Mathematical Aggregations</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-1 font-mono">
            {evidence.aggregations.map((agg, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-slate-400 select-none">•</span>
                <span>{agg}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Filters Applied */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Data Filters Enforced</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-1">
            {evidence.filtersApplied.map((filter, idx) => (
              <li key={idx} className="flex items-start gap-1.5 font-mono">
                <span className="text-slate-400 select-none">•</span>
                <span>{filter}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assumptions & Limitations */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Assumptions & Known Limitations</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1">
            {evidence.assumptions.map((asm, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-500 select-none">•</span>
                <span>{asm}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500">
        <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          Verification transparency: In production with Snowflake & Gemma, this evidence trace is extracted directly from the query execution profile.
        </span>
      </div>
    </div>
  );
};
