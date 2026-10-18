import React, { useState } from 'react';
import { ArrowUpDown, Download } from 'lucide-react';
import { QueryResultRow } from '../../types/analytics';

interface ColumnDef {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps {
  columns: ColumnDef[];
  data: QueryResultRow[];
  caption?: string;
  allowExport?: boolean;
  exportFileName?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  caption,
  allowExport = false,
  exportFileName = 'datamind-query-results.csv'
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const exportToCSV = () => {
    if (!data.length) return;
    const headers = columns.map((col) => `"${col.label.replace(/"/g, '""')}"`).join(',');
    const rows = sortedData.map((row) =>
      columns.map((col) => `"${String(row[col.key] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', exportFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border border-slate-200/90 rounded-xl bg-white overflow-hidden shadow-2xs">
      {(caption || allowExport) && (
        <div className="px-3.5 py-2 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
          {caption && <span className="text-xs font-semibold text-slate-700">{caption}</span>}
          {allowExport && (
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-3.5 py-2.5 cursor-pointer select-none hover:bg-slate-100 transition-colors whitespace-nowrap ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : ''}`}>
                    <span>{col.label}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal">
            {sortedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                {columns.map((col) => {
                  const val = row[col.key];
                  const isNumberOrMoney = typeof val === 'number' || (typeof val === 'string' && /^[₹$0-9,%.-]+$/.test(val.trim()));
                  return (
                    <td
                      key={col.key}
                      className={`px-3.5 py-2.5 text-slate-800 whitespace-nowrap ${
                        isNumberOrMoney ? 'font-mono tabular-nums' : ''
                      } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-3.5 py-2 border-t border-slate-100 bg-slate-50/40 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Showing {sortedData.length} records</span>
        <span className="text-slate-400">Illustrative sample rows</span>
      </div>
    </div>
  );
};
