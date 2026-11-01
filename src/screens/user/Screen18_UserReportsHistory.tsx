import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  Search,
  Download,
  Calendar,
  FileText,
  Bot,
  ShieldCheck,
  Bookmark,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Screen18_UserReportsHistory: React.FC = () => {
  const {
    assessments,
    verificationHistory,
    pdfDocs,
    chatMessages,
    savedStandardIds,
    standards,
    navigate,
    setSelectedStandardById,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'assessments' | 'conversations' | 'pdfs' | 'licences' | 'standards'
  >('assessments');
  const [filterQuery, setFilterQuery] = useState('');

  const savedStandardsList = standards.filter((s) => savedStandardIds.includes(s.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Enterprise Compliance Records
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Reports &amp; Historical Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access past compliance audits, generated PDF dossiers, supplier verification logs, and AI conversation transcripts.
          </p>
        </div>

        <button
          onClick={() => navigate('user-compliance-wizard')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'assessments'
              ? 'bg-[#142B4A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Compliance Assessments ({assessments.length})
        </button>
        <button
          onClick={() => setActiveTab('conversations')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'conversations'
              ? 'bg-[#142B4A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          AI Conversations (3)
        </button>
        <button
          onClick={() => setActiveTab('pdfs')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'pdfs'
              ? 'bg-[#142B4A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          PDF Document Audits ({pdfDocs.length})
        </button>
        <button
          onClick={() => setActiveTab('licences')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'licences'
              ? 'bg-[#142B4A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Licence Verification Logs ({verificationHistory.length})
        </button>
        <button
          onClick={() => setActiveTab('standards')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'standards'
              ? 'bg-[#142B4A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Saved Standards ({savedStandardsList.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-4">
        {activeTab === 'assessments' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">Generated Product Compliance Assessments</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {assessments.map((a) => (
                <div key={a.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block text-sm">{a.productName}</span>
                    <span className="text-slate-500">
                      Category: {a.category} · Scheme: {a.scheme} · Created: {a.createdAt}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('user-compliance-results')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'conversations' && (
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#142B4A]">Recent AI Regulatory Consultations</h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Wi-Fi 6 Gateway IS 13252 vs WPC ETA Regulatory Routing</span>
                <span className="text-slate-500 text-[11px]">Last queried: 2 hours ago · 4 Citations verified</span>
              </div>
              <button
                onClick={() => navigate('user-ai-assistant')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resume Discussion →
              </button>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Lithium Battery Pack IS 16046 Thermal Runaway Safety</span>
                <span className="text-slate-500 text-[11px]">Last queried: Yesterday · 2 Citations verified</span>
              </div>
              <button
                onClick={() => navigate('user-ai-assistant')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resume Discussion →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pdfs' && (
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#142B4A]">Parsed Technical Datasheets</h3>
            {pdfDocs.map((doc) => (
              <div key={doc.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{doc.fileName}</span>
                  <span className="text-slate-500 text-[11px]">{doc.fileSize} · {doc.pagesCount} pages · Status: {doc.processingStatus}</span>
                </div>
                <button
                  onClick={() => navigate('user-pdf-analysis')}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Open Analysis →
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'licences' && (
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#142B4A]">Supplier Licence Audit Archive</h3>
            <div className="divide-y divide-slate-100">
              {verificationHistory.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-blue-700 block">{item.queryNumber} ({item.type})</span>
                    <span className="text-slate-700">{item.licenseeName}</span>
                  </div>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {item.status} (Till {item.validTo})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'standards' && (
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#142B4A]">Saved Workspace Standards ({savedStandardsList.length})</h3>
            <div className="divide-y divide-slate-100">
              {savedStandardsList.map((std) => (
                <div key={std.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-blue-700 block">{std.isNumber}</span>
                    <span className="text-slate-800 font-medium">{std.title}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedStandardById(std.id);
                      navigate('user-standard-detail', { standardId: std.id });
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
