import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { useToast } from './Toast';

interface SQLViewerProps {
  sql: string;
  title?: string;
  isSimulatedNotice?: boolean;
}

export const SQLViewer: React.FC<SQLViewerProps> = ({
  sql,
  title = 'Illustrative SQL Query',
  isSimulatedNotice = true
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      showToast('Copied to clipboard', 'Illustrative SQL copied successfully', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Copy failed', 'Please select and copy manually', 'error');
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0F172A] text-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0A0F1D] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-slate-300">{title}</span>
          {isSimulatedNotice && (
            <span className="text-[11px] text-slate-400">· Sample Query Only</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          title="Copy SQL to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy SQL'}</span>
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-300 bg-[#0F172A]">
        <pre className="font-mono whitespace-pre">{sql}</pre>
      </div>

      {isSimulatedNotice && (
        <div className="px-4 py-2 bg-[#0A0F1D]/80 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Target Platform: Snowflake SQL (ANSI-compliant)</span>
          <span className="text-slate-400">Frontend Mock Simulation</span>
        </div>
      )}
    </div>
  );
};
