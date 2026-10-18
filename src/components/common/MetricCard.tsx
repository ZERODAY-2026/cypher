import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: string;
  isPositive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  isPositive = true
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 transition-all hover:border-slate-300 hover:shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider truncate">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {value}
        </span>
        {trend && (
          <span
            className={`text-[11px] sm:text-xs font-semibold tabular-nums ${
              isPositive ? 'text-emerald-700' : 'text-red-700'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-normal line-clamp-1" title={subtext}>
          {subtext}
        </p>
      )}
    </div>
  );
};
