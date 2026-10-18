import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { ChartDataPoint } from '../../types/analytics';

interface ChartCardProps {
  title?: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type?: 'bar' | 'line' | 'horizontal-bar';
  height?: number;
  dataKey?: string;
  categoryKey?: string;
  unitPrefix?: string;
  unitSuffix?: string;
  borderless?: boolean;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: ChartDataPoint }>;
  label?: string;
  unitPrefix?: string;
  unitSuffix?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  unitPrefix = '',
  unitSuffix = ''
}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const displayValue = item.formattedValue || `${unitPrefix}${payload[0].value.toLocaleString()}${unitSuffix}`;
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
        <p className="font-semibold text-slate-200">{label || item.label}</p>
        <p className="font-mono tabular-nums text-blue-300 font-medium mt-0.5">
          {displayValue}
          {item.percentage !== undefined && (
            <span className="text-slate-400 ml-1.5 font-normal">({item.percentage}%)</span>
          )}
        </p>
        {item.category && <p className="text-[11px] text-slate-400 mt-0.5">Category: {item.category}</p>}
      </div>
    );
  }
  return null;
};

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  data,
  type = 'bar',
  height = 250,
  unitPrefix = '',
  unitSuffix = '',
  borderless = false,
  className = ''
}) => {
  return (
    <div
      className={
        borderless
          ? `w-full ${className}`
          : `bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs ${className}`
      }
    >
      {(title || subtitle) && (
        <div className="mb-3 space-y-0.5">
          {title && <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{title}</h4>}
          {subtitle && <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">{subtitle}</p>}
        </div>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'horizontal-bar' ? (
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={140}
                tick={{ fontSize: 11, fill: '#334155' }}
              />
              <Tooltip
                content={<CustomTooltip unitPrefix={unitPrefix} unitSuffix={unitSuffix} />}
                cursor={{ fill: '#F1F5F9' }}
              />
              <Bar dataKey="value" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          ) : type === 'line' ? (
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
              />
              <Tooltip
                content={<CustomTooltip unitPrefix={unitPrefix} unitSuffix={unitSuffix} />}
                cursor={{ stroke: '#94A3B8', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#2563EB', strokeWidth: 1, stroke: '#FFFFFF' }}
                activeDot={{ r: 5, fill: '#1D4ED8' }}
              />
            </LineChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
              />
              <Tooltip
                content={<CustomTooltip unitPrefix={unitPrefix} unitSuffix={unitSuffix} />}
                cursor={{ fill: '#F1F5F9' }}
              />
              <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={26} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
