import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  BookOpen,
  Sparkles,
  Building,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  ShieldAlert,
} from 'lucide-react';

export const Screen25_AdminDashboard: React.FC = () => {
  const { navigate, standards, labs, systemLogs } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Platform Administrative Control Console</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#142B4A] tracking-tight">
            Admin Systems &amp; Regulatory Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry across indexed Indian Standards, active RAG embeddings, user compliance audits, and laboratory networks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('admin-add-edit-standard')}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            + Add BIS Standard
          </button>
          <button
            onClick={() => navigate('admin-rag-knowledge-base')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Manage RAG Vectors
          </button>
        </div>
      </div>

      {/* 5 Primary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Registered Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">1,428</div>
          <span className="text-[10px] text-emerald-600 font-medium">+18% this month</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">BIS Standards</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
            {standards.length + 21400}
          </div>
          <span className="text-[10px] text-slate-500">142 under active QCO</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Assessments</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">8,914</div>
          <span className="text-[10px] text-emerald-600">64% CRS Scheme</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">AI RAG Queries</span>
            <Cpu className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">42,650</div>
          <span className="text-[10px] text-blue-600">Avg 142ms latency</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Testing Labs</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">{labs.length + 380}</div>
          <span className="text-[10px] text-emerald-600 font-medium">100% NABL Verified</span>
        </div>
      </div>

      {/* Visual Analytics Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Charts & Breakdowns */}
        <div className="lg:col-span-8 space-y-6">
          {/* User Growth & AI Activity Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#142B4A]">Platform Growth &amp; AI Query Throughput</h3>
                <span className="text-[11px] text-slate-400">Monthly active manufacturer queries</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +44% YoY Surge
              </span>
            </div>

            {/* Clean SVG Trend Visualization */}
            <div className="h-44 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
              {[
                { month: 'May', height: '40%', users: '620', ai: '12k' },
                { month: 'Jun', height: '52%', users: '780', ai: '18k' },
                { month: 'Jul', height: '58%', users: '910', ai: '22k' },
                { month: 'Aug', height: '70%', users: '1100', ai: '28k' },
                { month: 'Sep', height: '82%', users: '1280', ai: '35k' },
                { month: 'Oct', height: '95%', users: '1428', ai: '42k' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.ai}
                  </div>
                  <div
                    className="w-full bg-blue-600 group-hover:bg-blue-700 rounded-t-md transition-all cursor-pointer"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[11px] font-medium text-slate-500 mt-1">{bar.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Primary Driver: DPIIT Electrical Appliances Quality Control Order enforcement</span>
              <span className="font-mono text-slate-700 font-semibold">99.8% System Uptime</span>
            </div>
          </div>

          {/* Compliance Assessments by Category & Top Searched Standards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                Assessments by Category
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span>IT &amp; Electronics (IS 13252)</span>
                    <span className="font-mono font-bold">42%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span>Lithium Batteries (IS 16046)</span>
                    <span className="font-mono font-bold">28%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span>Household Appliances (IS 302 / 1293)</span>
                    <span className="font-mono font-bold">18%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span>EV Conductive Charging (IS 17017)</span>
                    <span className="font-mono font-bold">12%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                Most Searched Indian Standards
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="font-mono font-bold text-blue-700">IS 13252 (Part 1)</span>
                  <span className="text-slate-500 font-mono text-[11px]">18,420 queries</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="font-mono font-bold text-blue-700">IS 16046 (Part 2)</span>
                  <span className="text-slate-500 font-mono text-[11px]">12,190 queries</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="font-mono font-bold text-blue-700">IS 302-2-3:2007</span>
                  <span className="text-slate-500 font-mono text-[11px]">7,840 queries</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="font-mono font-bold text-blue-700">IS 17017 (Part 1)</span>
                  <span className="text-slate-500 font-mono text-[11px]">5,910 queries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Recent Admin Activity & Security Stream */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142B4A]">Recent Platform Activity</h3>
              <button
                onClick={() => navigate('admin-system-logs')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View Full Logs →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {systemLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800">{log.event}</span>
                    <span className="text-slate-400 font-mono">{log.latencyMs}ms</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{log.details}</p>
                  <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-blue-300 block">RAG Vector Status</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              5 core standard specification corpora vectorized using text-embedding-004 (768-dim). Zero indexing errors in past 72 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
