import React, { useState, useEffect } from 'react';
import {
  Settings,
  Monitor,
  Database,
  BarChart3,
  History,
  RotateCcw,
  CheckCircle2,
  Info,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { MockSettingsService, UserSettings, DEFAULT_SETTINGS } from '../../services/mockSettingsService';
import { useToast } from '../../components/common/Toast';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(MockSettingsService.getSettings());
  }, []);

  const handleUpdate = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    MockSettingsService.saveSettings(updated);
    showToast('Preference Saved', 'Your setting update has been saved locally', 'success');
  };

  const handleResetDefaults = () => {
    const defaults = MockSettingsService.resetSettings();
    setSettings(defaults);
    showToast('Preferences Reset', 'All settings restored to system defaults', 'info');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure workspace defaults, display preferences, and local caching behaviors.
          </p>
        </div>
        <button
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* 1. Default Workspace Dataset */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <Database className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Default Analytical Dataset</h3>
        </div>
        <p className="text-xs text-slate-500">
          Choose which sample catalog dataset is preloaded when opening Ask Data and Insights.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
          <button
            type="button"
            onClick={() => handleUpdate('defaultDataset', 'sales')}
            className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
              settings.defaultDataset === 'sales'
                ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold">Enterprise Sales</div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">8,432 rows · 8 tables</div>
          </button>
          <button
            type="button"
            onClick={() => handleUpdate('defaultDataset', 'customers')}
            className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
              settings.defaultDataset === 'customers'
                ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold">Enterprise Accounts</div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">1,420 rows · Territories</div>
          </button>
          <button
            type="button"
            onClick={() => handleUpdate('defaultDataset', 'inventory')}
            className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
              settings.defaultDataset === 'inventory'
                ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-semibold">Hardware Inventory</div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">64 rows · Warehouses</div>
          </button>
        </div>
      </div>

      {/* 2. Preferred Result View & Visualization */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Result Display Preferences</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <label className="font-semibold text-slate-800">Primary Tab on Query Execution</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleUpdate('preferredResultView', 'chart')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                  settings.preferredResultView === 'chart'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Chart View First
              </button>
              <button
                type="button"
                onClick={() => handleUpdate('preferredResultView', 'table')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                  settings.preferredResultView === 'table'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Table View First
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-800">Default Chart Rendering Style</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleUpdate('defaultChartType', 'bar')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                  settings.defaultChartType === 'bar'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Bar / Ranking
              </button>
              <button
                type="button"
                onClick={() => handleUpdate('defaultChartType', 'line')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                  settings.defaultChartType === 'line'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Continuous Line
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Query History & Privacy */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <History className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Query History Storage</h3>
        </div>
        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.historyPersistenceEnabled}
              onChange={(e) => handleUpdate('historyPersistenceEnabled', e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-semibold text-slate-800">
                Save simulated query activity to local browser storage
              </span>
              <p className="text-slate-500 mt-0.5 leading-normal">
                Persists past questions, sample results, and generated SQL across page refreshes. Data is stored solely on your local client device.
              </p>
            </div>
          </label>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-slate-700">Maximum history entries to keep</span>
            <select
              value={settings.maxHistoryItems}
              onChange={(e) => handleUpdate('maxHistoryItems', Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 font-mono text-xs cursor-pointer"
            >
              <option value="20">20 entries</option>
              <option value="50">50 entries</option>
              <option value="100">100 entries</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. About DataMind & Demo Disclosure */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Info className="w-4 h-4 text-blue-600" />
          <span>Demo Mode Disclosure & Product Version</span>
        </div>
        <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
          <p>
            <strong>DataMind Prototype:</strong> Built for ZeroDay OSS Hacktoberfest 2026.
          </p>
          <p>
            This application is strictly a frontend demonstration. No backend databases, remote API endpoints, or live LLM inference instances are connected. All analytical metrics and schema queries run on isolated local deterministic mock services.
          </p>
          <p className="text-slate-500">
            Future full-stack releases will integrate Google Gemma models for semantic query generation and Snowflake for enterprise cloud data warehousing.
          </p>
        </div>
      </div>
    </div>
  );
};
