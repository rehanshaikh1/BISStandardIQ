import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  Download,
  Share2,
} from 'lucide-react';

export const Screen07_PublicLabDetail: React.FC = () => {
  const { selectedLab, navigate, openGuestModal } = useApp();
  const lab = selectedLab;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('public-lab-finder')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Laboratory Directory</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openGuestModal(
                  'Request Testing Quotation',
                  'Register a free manufacturer account to send sample test requests directly to this laboratory and track quotation lead times.'
                )
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Test Quotation</span>
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-700">{lab.type}</span>
                <span aria-hidden="true">·</span>
                <span>{lab.city}, {lab.state}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">{lab.accreditation}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
                {lab.name}
              </h1>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{lab.address}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 shrink-0 min-w-[260px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">NABL Certificate:</span>
                <span className="font-mono font-bold text-slate-900">{lab.nablCertificateNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Accreditation Validity:</span>
                <span className="font-semibold text-slate-800">{lab.validUntil}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Sample Turnaround:</span>
                <span className="font-semibold text-slate-800">{lab.turnaroundDays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Scope of Accreditation & Supported Standards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Standards Scope */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#142B4A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>NABL Scope of Tested Indian Standards</span>
                </h2>
                <span className="text-xs text-slate-500">
                  {lab.supportedStandards.length} Standards Certified
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {lab.supportedStandards.map((stdNumber, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-blue-700 block">
                        {stdNumber}
                      </span>
                      <span className="text-xs text-slate-600">
                        Complete electrical safety, environmental stress, and performance testing scope.
                      </span>
                    </div>

                    <button
                      onClick={() => navigate('public-standards-explorer')}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 shrink-0"
                    >
                      View Standard →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Benches & Equipment Facilities */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#142B4A]">
                Available In-House Test Benches &amp; Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {lab.facilitiesAvailable.map((facility, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details & Service Notice */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#142B4A]">Contact Information</h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[11px]">Authorized Technical Officer:</span>
                  <span className="font-semibold text-slate-900 block mt-0.5">{lab.contactPerson}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`tel:${lab.phone}`} className="hover:text-blue-600 font-mono">
                    {lab.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${lab.email}`} className="hover:text-blue-600 font-mono">
                    {lab.email}
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Pin Code:</span>
                  <span className="font-mono text-slate-800 font-medium">{lab.pinCode}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  openGuestModal(
                    'Direct Lab Communication',
                    'Log in to generate an automated Test Request Form (TRF) pre-filled with your product specifications to send to this lab.'
                  )
                }
                className="w-full mt-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors text-center"
              >
                Generate Pre-filled TRF
              </button>
            </div>

            <div className="bg-blue-50/80 rounded-xl border border-blue-200 p-5 text-xs text-blue-900 space-y-2">
              <h4 className="font-bold text-blue-950">MSME Testing Subsidy Note</h4>
              <p className="leading-relaxed">
                If your business holds a valid Udyam Registration, ask for the 50% statutory testing concession under the Ministry of MSME scheme prior to sample dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
