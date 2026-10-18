import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
      <div className="h-4 bg-slate-200 rounded-md w-2/3"></div>
      <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="h-4 bg-slate-100 rounded-md flex-1"></div>
            <div className="h-4 bg-slate-100 rounded-md w-24"></div>
            <div className="h-4 bg-slate-100 rounded-md w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-200 rounded-md w-1/4"></div>
        <div className="h-4 bg-slate-100 rounded-md w-20"></div>
      </div>
      <div className="h-64 bg-slate-100 rounded-lg flex items-end p-4 gap-4">
        <div className="bg-slate-200 h-1/3 flex-1 rounded-t-sm"></div>
        <div className="bg-slate-200 h-2/3 flex-1 rounded-t-sm"></div>
        <div className="bg-slate-200 h-1/2 flex-1 rounded-t-sm"></div>
        <div className="bg-slate-200 h-4/5 flex-1 rounded-t-sm"></div>
        <div className="bg-slate-200 h-3/5 flex-1 rounded-t-sm"></div>
      </div>
    </div>
  );
};
