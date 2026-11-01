import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Search,
  FileText,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Bot,
  ExternalLink,
} from 'lucide-react';

export const Screen08_UserDashboard: React.FC = () => {
  const { navigate, userProfile, standards, setSelectedStandardById } = useApp();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Workspace Overview · {userProfile?.companyName || 'Apex Electronics Pvt Ltd'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-0.5">
            Welcome back to StandardsIQ
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Your intelligent workspace for BIS standards, mandatory Quality Control Orders, and laboratory compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('user-compliance-wizard')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Compliance Audit</span>
          </button>
        </div>
      </div>

      {/* 4 Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Standards Explored</span>
            <Search className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
            14
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            +3 new QCO tracked this week
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Compliance Assessments</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
            6
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            4 CRS · 2 ISI Mark Schemes
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Verified Licences</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
            18
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            All active &amp; valid
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Saved Reports</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
            5
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Ready for PDF export
          </span>
        </div>
      </div>

      {/* 4 Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('user-ai-assistant')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Bot className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Ask AI Assistant
          </h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Query clause specifications, creepage distances, and QCO deadlines.
          </p>
        </button>

        <button
          onClick={() => navigate('user-compliance-wizard')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Check Product Compliance
          </h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Guided 5-step roadmap generator with 50% MSME testing subsidy.
          </p>
        </button>

        <button
          onClick={() => navigate('user-pdf-analysis')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Analyse a PDF
          </h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Upload hardware datasheets up to 10MB for instant clause extraction.
          </p>
        </button>

        <button
          onClick={() => navigate('user-licence-verification')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Verify BIS Licence
          </h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Audit supplier CM/L and CRS R-numbers with verification history.
          </p>
        </button>
      </div>

      {/* Two Column Layout: Compliance Overview + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Compliance Overview & Recently Viewed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Compliance Overview Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142B4A]">
                Company Compliance Overview (FY 2026-27)
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Audit Status: 92% Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Active Certified SKUs</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block font-mono">12 SKUs</span>
                <span className="text-[10px] text-emerald-600">All surveillance fees cleared</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">In Lab Testing</span>
                <span className="text-xl font-bold text-blue-600 mt-0.5 block font-mono">2 Products</span>
                <span className="text-[10px] text-blue-600">Sample at ERTL North</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Upcoming QCO Deadlines</span>
                <span className="text-xl font-bold text-amber-600 mt-0.5 block font-mono">1 Item</span>
                <span className="text-[10px] text-amber-600">Mandatory by Dec 2026</span>
              </div>
            </div>
          </div>

          {/* Recently Viewed Standards */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142B4A]">Recently Viewed Standards</h3>
              <button
                onClick={() => navigate('user-standards-explorer')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Browse All Standards →
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {standards.slice(0, 3).map((std) => (
                <div
                  key={std.id}
                  onClick={() => {
                    setSelectedStandardById(std.id);
                    navigate('user-standard-detail', { standardId: std.id });
                  }}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-blue-700 block">{std.isNumber}</span>
                    <span className="text-slate-700 font-medium line-clamp-1">{std.title}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] shrink-0">{std.scheme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & Recent AI Conversations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent AI Conversations */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142B4A]">Recent AI Inquiries</h3>
              <button
                onClick={() => navigate('user-ai-assistant')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Open Assistant →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div
                onClick={() => navigate('user-ai-assistant')}
                className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
              >
                <span className="font-semibold text-slate-800 block">
                  "Which BIS standard applies to Wi-Fi routers?"
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Cited IS 13252 Clause 1.5 &amp; WPC ETA dual requirement.
                </span>
              </div>

              <div
                onClick={() => navigate('user-ai-assistant')}
                className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
              >
                <span className="font-semibold text-slate-800 block">
                  "Does lithium battery require CRS registration?"
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Cited IS 16046 (Part 2):2018 mandatory test protocols.
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity Audit Log */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">Recent Regulatory Activity</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 font-medium block">
                    Verified Licence CM/L-7821940
                  </span>
                  <span className="text-[10px] text-slate-400">Dixon Technologies · Valid till 2027</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 font-medium block">
                    Compliance assessment created
                  </span>
                  <span className="text-[10px] text-slate-400">AeroLink AC1200 Smart Wi-Fi 6 Router</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 font-medium block">
                    PDF Datasheet parsed
                  </span>
                  <span className="text-[10px] text-slate-400">ApexRouter_Technical_Datasheet_v2.pdf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
