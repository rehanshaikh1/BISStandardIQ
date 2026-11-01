import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Building2,
  FileCheck,
  CheckCircle,
  Clock,
  Layers,
  FileText,
} from 'lucide-react';

export const Screen03_PublicStandardDetail: React.FC = () => {
  const { selectedStandard, navigate, openGuestModal, setSelectedStandardById } = useApp();

  const std = selectedStandard;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('public-standards-explorer')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Standards Directory</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openGuestModal(
                  `Ask AI About ${std.isNumber}`,
                  `Log in or create a free account to ask our regulatory AI assistant detailed questions about ${std.isNumber}, required insulation thicknesses, and component certifications.`
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI About This Standard</span>
            </button>
          </div>
        </div>

        {/* Standard Hero Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-blue-700 text-sm">{std.isNumber}</span>
                <span aria-hidden="true">·</span>
                <span>Category: {std.productCategory}</span>
                <span aria-hidden="true">·</span>
                <span>Published Edition {std.editionYear}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#142B4A] tracking-tight">
                {std.title}
              </h1>

              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Scheme:</span>
                  <span className="font-semibold text-slate-900">{std.scheme}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">QCO Status:</span>
                  <span
                    className={`font-semibold ${
                      std.qcoStatus === 'Mandatory' ? 'text-red-700' : 'text-slate-800'
                    }`}
                  >
                    {std.qcoStatus === 'Mandatory' ? 'Mandatory Order' : std.qcoStatus}
                  </span>
                </div>
                {std.ministry && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Ministry:</span>
                    <span className="font-medium text-slate-800">{std.ministry}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <a
                href={std.officialBisUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <span>Official BIS Portal Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <button
                onClick={() => navigate('public-lab-finder')}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Find Testing Laboratories</span>
              </button>
            </div>
          </div>

          {/* Gazette Order Banner */}
          {std.qcoOrderNumber && (
            <div className="mt-6 p-3.5 bg-red-50/70 rounded-lg border border-red-200/80 text-xs text-red-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <div>
                  <span className="font-semibold">Quality Control Order Enforced: </span>
                  <span>{std.qcoOrderNumber}</span>
                  {std.qcoEffectiveDate && (
                    <span className="text-red-700 block sm:inline sm:ml-2">
                      (Effective from {std.qcoEffectiveDate})
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-red-700 bg-white px-2 py-0.5 rounded border border-red-200 shrink-0">
                Non-compliance subject to Customs Seizure
              </span>
            </div>
          )}
        </div>

        {/* Overview & Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Overview &amp; Scope</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {std.overview}
              </p>
              <div className="pt-2 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-800 block mb-1">Standard Scope:</span>
                {std.scope}
              </div>
            </div>

            {/* Important Testing Clauses */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>Important Technical Clauses</span>
                </h2>
                <span className="text-xs text-slate-500">
                  {std.keyClauses.length} Critical Clauses Tracked
                </span>
              </div>

              <div className="space-y-3">
                {std.keyClauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-slate-200/90 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-blue-700">
                          {clause.clauseNumber}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                          {clause.title}
                        </h3>
                      </div>
                      {clause.isMandatoryTest && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                          Mandatory Lab Test
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Applicability, Fees & Testing Parameters */}
          <div className="lg:col-span-4 space-y-6">
            {/* Product Applicability */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#142B4A]">Product Applicability</h3>
              <p className="text-xs text-slate-500">
                Covers hardware items and end-products requiring this standard:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                {std.applicability.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testing Parameters */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#142B4A]">Mandatory Test Bench Parameters</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {std.testingParameters.map((param, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{param}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee & MSME Concession */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#142B4A]">Fee Estimate &amp; MSME Concessions</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-500 block">Typical NABL Lab Testing Fee:</span>
                  <span className="font-semibold text-slate-900">{std.sampleFeeEstimate.testingFeeRange}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Marking / Portal Fee:</span>
                  <span className="font-semibold text-slate-900">{std.sampleFeeEstimate.markingFee}</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-semibold text-emerald-700 block">
                    {std.sampleFeeEstimate.msmeDiscountPercent}% MSME Subsidy Applicable
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Eligible for registered Udyam MSMEs through Ministry of MSME test centers.
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  openGuestModal(
                    'Calculate Exact MSME Certification Rebate',
                    'Log in with your Udyam Registration Number to generate an official fee concession certificate and application checklist.'
                  )
                }
                className="w-full mt-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Calculate Detailed Subsidy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
