import React, { useState } from 'react';
import {
  Database,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Table as TableIcon,
  Columns,
  Eye,
  Key,
  Layers,
  Info
} from 'lucide-react';
import { MockConnectionService, DEFAULT_SNOWFLAKE_CONFIG, ConnectionTestResult } from '../../services/mockConnectionService';
import { SAMPLE_DATABASE_SCHEMA } from '../../data/sampleSchema';
import { SnowflakeConnectionConfig } from '../../types/analytics';
import { SchemaTable } from '../../types/schema';
import { DataTable } from '../../components/common/DataTable';
import { useToast } from '../../components/common/Toast';

export const DataSourcesPage: React.FC = () => {
  const { showToast } = useToast();
  const [config, setConfig] = useState<SnowflakeConnectionConfig>(MockConnectionService.getConfig());
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [selectedTable, setSelectedTable] = useState<SchemaTable>(SAMPLE_DATABASE_SCHEMA.tables[0]);
  const [schemaViewMode, setSchemaViewMode] = useState<'columns' | 'sample-rows'>('columns');

  const handleTestConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    const result = await MockConnectionService.simulateTestConnection(config);
    setIsTesting(false);
    setTestResult(result);

    if (result.success) {
      MockConnectionService.saveConfig(config);
      showToast('Connection Simulated', 'Validated demo connection parameters', 'info');
    } else {
      showToast('Validation Error', result.message, 'error');
    }
  };

  const handleClearForm = () => {
    const blank: SnowflakeConnectionConfig = {
      account: '',
      username: '',
      warehouse: '',
      database: '',
      schema: '',
      role: '',
      authMethod: 'password'
    };
    setConfig(blank);
    setTestResult(null);
    showToast('Form cleared', 'Configuration fields reset', 'info');
  };

  const handleResetDefaults = () => {
    const defaults = MockConnectionService.resetConfig();
    setConfig(defaults);
    setTestResult(null);
    showToast('Defaults Restored', 'Loaded sample configuration parameters', 'info');
  };

  const scrollToSchema = () => {
    const elem = document.getElementById('schema-explorer');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Data Sources</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure analytical warehouse connections and inspect structured database schemas.
        </p>
      </div>

      {/* Prominent Security Notice */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 shadow-2xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
            Security Notice · Frontend Prototype
          </h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            This is a frontend demonstration prototype. <strong>Do not enter production credentials or real Snowflake passwords.</strong> No remote network sockets are opened, and no credentials are transmitted or stored remotely.
          </p>
        </div>
      </div>

      {/* Snowflake Connection Box */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-slate-900">Snowflake Data Cloud</h3>
                <span className="text-[10px] font-mono font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Status: Demo Mode
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Intended target data platform for production natural-language querying.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToSchema}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>View Sample Schema</span>
          </button>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleTestConnection} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Account */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Account Identifier</label>
              <input
                type="text"
                value={config.account}
                onChange={(e) => setConfig({ ...config, account: e.target.value })}
                placeholder="e.g. xy12345.ap-south-1.aws"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Username</label>
              <input
                type="text"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
                placeholder="ANALYTICS_USER"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Warehouse */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Warehouse</label>
              <input
                type="text"
                value={config.warehouse}
                onChange={(e) => setConfig({ ...config, warehouse: e.target.value })}
                placeholder="COMPUTE_WH_XS"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Database */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Database</label>
              <input
                type="text"
                value={config.database}
                onChange={(e) => setConfig({ ...config, database: e.target.value })}
                placeholder="ANALYTICS_DB"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Schema */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Schema</label>
              <input
                type="text"
                value={config.schema}
                onChange={(e) => setConfig({ ...config, schema: e.target.value })}
                placeholder="PUBLIC or SALES_DATA"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Assigned Role</label>
              <input
                type="text"
                value={config.role}
                onChange={(e) => setConfig({ ...config, role: e.target.value })}
                placeholder="ANALYTICS_READONLY_ROLE"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Auth Method Selector */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <label className="font-semibold text-slate-700">Authentication Method</label>
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="authMethod"
                    value="password"
                    checked={config.authMethod === 'password'}
                    onChange={() => setConfig({ ...config, authMethod: 'password' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Username & Password (Demo)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="authMethod"
                    value="keypair"
                    checked={config.authMethod === 'keypair'}
                    onChange={() => setConfig({ ...config, authMethod: 'keypair' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Key-Pair Authentication (Planned)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="authMethod"
                    value="sso"
                    checked={config.authMethod === 'sso'}
                    onChange={() => setConfig({ ...config, authMethod: 'sso' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enterprise Single Sign-On (Planned)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearForm}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Clear Form
              </button>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Reset Demo Defaults
              </button>
            </div>

            <button
              type="submit"
              disabled={isTesting}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulating Test...</span>
                </>
              ) : (
                <span>Test Demo Connection</span>
              )}
            </button>
          </div>
        </form>

        {/* Test Result Feedback Box */}
        {testResult && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 ${
              testResult.success
                ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                : 'bg-red-50/70 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{testResult.details.notice}</p>
          </div>
        )}
      </div>

      {/* Sample Schema Explorer */}
      <div id="schema-explorer" className="space-y-3.5 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Sample Database Schema Explorer</h3>
            <p className="text-xs text-slate-500">
              Database: <span className="font-mono text-slate-700">{SAMPLE_DATABASE_SCHEMA.databaseName}</span> · Schema:{' '}
              <span className="font-mono text-slate-700">{SAMPLE_DATABASE_SCHEMA.schemaName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">View Mode:</span>
            <div className="p-0.5 bg-slate-100 rounded-lg flex">
              <button
                onClick={() => setSchemaViewMode('columns')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  schemaViewMode === 'columns'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Columns
              </button>
              <button
                onClick={() => setSchemaViewMode('sample-rows')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  schemaViewMode === 'sample-rows'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sample Rows
              </button>
            </div>
          </div>
        </div>

        {/* Tables & Schema Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
          {/* Table List (8 tables) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs space-y-0.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 mb-1">
              Available Tables ({SAMPLE_DATABASE_SCHEMA.tables.length})
            </div>
            {SAMPLE_DATABASE_SCHEMA.tables.map((table) => (
              <button
                key={table.name}
                onClick={() => setSelectedTable(table)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  selectedTable.name === table.name
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <TableIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-mono truncate">{table.name}</span>
                </div>
                <span className="text-[10px] font-mono tabular-nums text-slate-400 shrink-0">
                  {table.rowCount.toLocaleString()} rows
                </span>
              </button>
            ))}
          </div>

          {/* Selected Table Inspector */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold font-mono text-slate-900">
                    {selectedTable.name}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 tabular-nums">
                    ({selectedTable.rowCount.toLocaleString()} records)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{selectedTable.description}</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 self-start sm:self-auto">
                Sample schema definition
              </span>
            </div>

            {/* View Mode: Columns */}
            {schemaViewMode === 'columns' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-3 py-2.5">Column</th>
                      <th className="px-3 py-2.5">Type</th>
                      <th className="px-3 py-2.5">Key</th>
                      <th className="px-3 py-2.5">Nullable</th>
                      <th className="px-3 py-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedTable.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2.5 font-mono font-semibold text-slate-800">
                          {col.name}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-slate-600">{col.type}</td>
                        <td className="px-3 py-2.5 font-mono text-[11px]">
                          {col.isPrimaryKey && (
                            <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">
                              PK
                            </span>
                          )}
                          {col.isForeignKey && (
                            <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
                              FK
                            </span>
                          )}
                          {!col.isPrimaryKey && !col.isForeignKey && '—'}
                        </td>
                        <td className="px-3 py-2.5 text-slate-500">{col.nullable ? 'Yes' : 'No'}</td>
                        <td className="px-3 py-2.5 text-slate-600">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View Mode: Sample Rows */}
            {schemaViewMode === 'sample-rows' && (
              <DataTable
                columns={selectedTable.columns.map((c) => ({
                  key: c.name,
                  label: c.name,
                  align: c.type.includes('DECIMAL') || c.type.includes('INTEGER') ? 'right' : 'left'
                }))}
                data={selectedTable.sampleRows}
                caption={`Sample records from ${selectedTable.name} (Illustrative only)`}
                allowExport={true}
                exportFileName={`${selectedTable.name.toLowerCase()}-sample.csv`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
