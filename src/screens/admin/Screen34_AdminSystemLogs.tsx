import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Search, AlertTriangle, CheckCircle, Info, RefreshCw, Download } from 'lucide-react';

export const Screen34_AdminSystemLogs: React.FC = () => {
  const { systemLogs } = useApp();

  const [levelFilter, setLevelFilter] = useState('All');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = systemLogs.filter((l) => {
    const matchLevel = levelFilter === 'All' || l.level === levelFilter;
    const matchModule = moduleFilter === 'All' || l.module === moduleFilter;
    const matchSearch =
      searchQuery === '' ||
      l.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.userOrIp.toLowerCase().includes(searchQuery.toLowerCase());

    return matchLevel && matchModule && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Operational Observability
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            System Telemetry &amp; Audit Logs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time trace logs capturing RAG semantic searches, licence verification hits, and AI inference latency.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting System Audit Log CSV')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Mean Query Latency</span>
          <span className="font-mono font-bold text-xl text-slate-900 block mt-1">118 ms</span>
          <span className="text-[10px] text-emerald-600 font-mono">P95: 280 ms</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Error Rate</span>
          <span className="font-mono font-bold text-xl text-slate-900 block mt-1">0.04%</span>
          <span className="text-[10px] text-emerald-600">Nominal range</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">RAG Hit Rate (k=5)</span>
          <span className="font-mono font-bold text-xl text-slate-900 block mt-1">96.8%</span>
          <span className="text-[10px] text-blue-600">High relevance</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Licence DB Health</span>
          <span className="font-mono font-bold text-xl text-slate-900 block mt-1">100% Sync</span>
          <span className="text-[10px] text-slate-500">Regional caches online</span>
        </div>
      </div>

      {/* Search & Level Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search log messages, IP addresses, or events..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="sm:w-40">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
          >
            <option value="All">All Levels</option>
            <option value="INFO">INFO Only</option>
            <option value="WARN">WARN Only</option>
            <option value="ERROR">ERROR Only</option>
          </select>
        </div>

        <div className="sm:w-48">
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
          >
            <option value="All">All Modules</option>
            <option value="RAG Pipeline">RAG Pipeline</option>
            <option value="Licence Verification">Licence Verification</option>
            <option value="AI Assistant">AI Assistant</option>
            <option value="Standards Sync">Standards Sync</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Event &amp; Payload Details</th>
                <th className="py-3 px-4">User / IP</th>
                <th className="py-3 px-4 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                        log.level === 'INFO'
                          ? 'bg-blue-50 text-blue-700'
                          : log.level === 'WARN'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-sans font-semibold whitespace-nowrap">
                    {log.module}
                  </td>
                  <td className="py-3 px-4 text-slate-800 max-w-md font-sans">
                    <span className="font-semibold block">{log.event}</span>
                    <span className="text-[11px] text-slate-500 font-mono line-clamp-1">{log.details}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono">{log.userOrIp}</td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums whitespace-nowrap">
                    {log.latencyMs}ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
