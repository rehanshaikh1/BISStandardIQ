import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Bookmark,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Building2,
  FileCheck,
  CheckCircle,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const Screen11_UserStandardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    selectedStandard,
    getStandardById,
    savedStandardIds,
    toggleSaveStandard,
    navigate,
    assessments,
    standards,
    setSelectedStandardById,
  } = useApp();

  const std = id ? getStandardById(id) : selectedStandard;
  const isSaved = savedStandardIds.includes(std.id);

  // Related standards
  const relatedStandards = standards.filter(
    (s) => s.id !== std.id && s.productCategory === std.productCategory
  );

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/user/standards"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Standards Explorer</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveStandard(std.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isSaved
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Bookmarked in Workspace' : 'Save to Favourites'}</span>
          </button>

          <button
            onClick={() => navigate('user-ai-assistant')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Main Standard Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-bold text-blue-700 text-base">{std.isNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{std.productCategory}</span>
              <span aria-hidden="true">·</span>
              <span>Edition {std.editionYear}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#142B4A] tracking-tight">
              {std.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div>
                <span className="text-slate-500">Scheme: </span>
                <span className="font-semibold text-slate-900">{std.scheme}</span>
              </div>
              <div>
                <span className="text-slate-500">QCO Status: </span>
                <span
                  className={`font-semibold ${
                    std.qcoStatus === 'Mandatory' ? 'text-red-700' : 'text-slate-800'
                  }`}
                >
                  {std.qcoStatus}
                </span>
              </div>
              {std.ministry && (
                <div>
                  <span className="text-slate-500">Authority: </span>
                  <span className="font-semibold text-slate-800">{std.ministry}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('user-compliance-wizard')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>Audit Product with this IS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI-Generated Regulatory Breakdown */}
        <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Automated Technical Synthesis</span>
          </div>
          <p className="text-blue-900 leading-relaxed">
            {std.overview} Under current Quality Control Orders, testing must be carried out in an accredited laboratory with valid ISO/IEC 17025 accreditation. Critical points for pre-audit include internal transformer isolation, creepage distance ({'>'}4.0mm), and fire retardant plastic casing.
          </p>
        </div>
      </div>

      {/* Grid: Clauses & Related Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Important Clauses */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <span>Critical Testing Clauses ({std.keyClauses.length})</span>
            </h2>

            <div className="space-y-3">
              {std.keyClauses.map((clause, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-slate-200/90 bg-slate-50/40 text-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-700">
                        {clause.clauseNumber}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{clause.title}</h3>
                    </div>
                    {clause.isMandatoryTest && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                        Mandatory Lab Test
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{clause.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Related Standards & Related Assessments */}
        <div className="lg:col-span-4 space-y-6">
          {/* Related Compliance Assessments in Workspace */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              Related Company Assessments
            </h3>
            {assessments.length > 0 ? (
              <div className="space-y-2.5 text-xs">
                {assessments.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigate('user-compliance-results')}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-slate-900 block">{a.productName}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Scheme: {a.scheme.split('(')[0]} · Created {a.createdAt}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No assessments created for this category yet.</p>
            )}
          </div>

          {/* Related Standards */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              Related Indian Standards
            </h3>
            <div className="space-y-2.5 text-xs">
              {relatedStandards.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    setSelectedStandardById(r.id);
                    navigate('user-standard-detail', { standardId: r.id });
                  }}
                  className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className="font-mono font-bold text-blue-700 block">{r.isNumber}</span>
                  <span className="text-slate-800 font-medium line-clamp-1">{r.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
