import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Building2,
  Share2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const Screen13_UserComplianceResults: React.FC = () => {
  const { activeAssessment, navigate, labs, setSelectedLabById } = useApp();
  const [downloadNotice, setDownloadNotice] = useState(false);

  const assess = activeAssessment;

  if (!assess) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Assessment Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Run the compliance wizard to generate a tailored certification assessment.
        </p>
        <button
          onClick={() => navigate('user-compliance-wizard')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Launch Compliance Wizard
        </button>
      </div>
    );
  }

  const handleDownloadReport = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
            <span>Assessment Record ID:</span>
            <span className="font-mono font-bold text-slate-700">{assess.id}</span>
            <span aria-hidden="true">·</span>
            <span>Generated on {assess.createdAt}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight">{assess.productName}</h1>
          <p className="text-xs text-slate-600 mt-1">
            Category: {assess.category} · Scheme: {assess.scheme}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('user-compliance-wizard')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Assessment</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Official 8-Page Compliance Assessment Dossier compiled for <strong>{assess.productName}</strong>. Ready for laboratory submission.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">PDF generated</span>
        </div>
      )}

      {/* Summary Banner */}
      <div className="p-5 bg-blue-50/80 rounded-xl border border-blue-200 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-blue-950">
          <span className="font-bold text-sm block">
            Regulatory Classification: {assess.qcoStatus}
          </span>
          <p className="leading-relaxed">
            Conforms to mandatory Gazette specifications under the Bureau of Indian Standards Act 2016. Testing must be completed at an accredited laboratory, followed by self-declaration online registration.
          </p>
        </div>
      </div>

      {/* Grid: Standards & Testing Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Applicable Standards & Clauses */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">Applicable Indian Standards</h3>
            <div className="space-y-2.5">
              {assess.applicableStandards.map((std, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-mono font-bold text-blue-700">{std}</span>
                  <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Mandatory QCO
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Mandatory Laboratory Testing Clauses:
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {assess.mandatoryClauses.map((clause, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certification Roadmap */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">Step-by-Step Certification Roadmap</h3>
            <div className="space-y-3">
              {assess.roadmapSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3.5 text-xs"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono">
                    {s.step}
                  </span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{s.title}</h4>
                      <span className="text-[11px] font-mono text-slate-500">{s.duration}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">Documentation Checklist for Filing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {assess.documentationChecklist.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: MSME Concessions & Related Labs */}
        <div className="lg:col-span-4 space-y-6">
          {/* MSME Subsidies Box */}
          <div className="bg-emerald-50/80 rounded-xl border border-emerald-200 p-5 text-xs text-emerald-950 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-emerald-900">MSME Subsidies &amp; Concessions</h3>
            </div>
            <div className="space-y-2 text-slate-800">
              <div>
                <span className="text-emerald-800 block text-[11px] font-medium">Testing Fee:</span>
                <span className="font-bold text-xs">{assess.msmeConcessions.testingFeeSubsidy}</span>
              </div>
              <div>
                <span className="text-emerald-800 block text-[11px] font-medium">Marking Fee:</span>
                <span className="font-bold text-xs">{assess.msmeConcessions.markingFeeRebate}</span>
              </div>
              <div className="pt-2 border-t border-emerald-200/60">
                <span className="text-emerald-800 block text-[11px] font-medium">ZED Reimbursement:</span>
                <span className="font-bold text-xs">{assess.msmeConcessions.zedSchemeBonus}</span>
              </div>
            </div>
          </div>

          {/* Related Testing Labs */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              Accredited Testing Labs for this Product
            </h3>
            <div className="space-y-2.5 text-xs">
              {labs.slice(0, 3).map((lab) => (
                <div
                  key={lab.id}
                  onClick={() => {
                    setSelectedLabById(lab.id);
                    navigate('user-lab-detail', { labId: lab.id });
                  }}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors space-y-1"
                >
                  <span className="font-bold text-slate-900 block line-clamp-1">{lab.name}</span>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{lab.city}</span>
                    <span className="font-mono text-blue-600">Turnaround: {lab.turnaroundDays.split(' ')[0]}d</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('user-lab-finder')}
              className="w-full mt-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors text-center"
            >
              Browse All Testing Labs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
