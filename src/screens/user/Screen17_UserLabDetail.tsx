import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Bookmark,
  ShieldCheck,
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Download,
  Clock,
  Calendar,
} from 'lucide-react';

export const Screen17_UserLabDetail: React.FC = () => {
  const { selectedLab, savedLabIds, toggleSaveLab, navigate } = useApp();
  const lab = selectedLab;
  const isSaved = savedLabIds.includes(lab.id);

  const [isQuoteSent, setIsQuoteSent] = useState(false);
  const [sampleUnits, setSampleUnits] = useState('2');
  const [testStandard, setTestStandard] = useState(lab.supportedStandards[0] || 'IS 13252');

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoteSent(true);
    setTimeout(() => setIsQuoteSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('user-lab-finder')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Laboratory Finder</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveLab(lab.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isSaved
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Directory' : 'Bookmark Lab'}</span>
          </button>
        </div>
      </div>

      {isQuoteSent && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Test Request Form dispatched to <strong>{lab.name}</strong>. The technical testing officer will reply to your registered email within 24 hours.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">TRF Dispatched</span>
        </div>
      )}

      {/* Main Lab Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-blue-700">{lab.type}</span>
              <span aria-hidden="true">·</span>
              <span>{lab.city}, {lab.state}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-emerald-700">{lab.accreditation}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#142B4A] tracking-tight">{lab.name}</h1>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{lab.address} (PIN: {lab.pinCode})</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 shrink-0 min-w-[240px]">
            <div className="flex justify-between">
              <span className="text-slate-400">NABL Certificate:</span>
              <span className="font-mono font-bold text-slate-800">{lab.nablCertificateNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Valid Until:</span>
              <span className="font-semibold text-slate-800">{lab.validUntil}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg. Turnaround:</span>
              <span className="font-semibold text-slate-800">{lab.turnaroundDays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column: Facilities & Quote Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          {/* Supported Standards */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">NABL Accredited Standards Scope</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {lab.supportedStandards.map((std, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-700">{std}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Active Scope
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Benches */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#142B4A]">Specialized Testing Chambers &amp; Test Rigs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {lab.facilitiesAvailable.map((facility, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Request Testing Quote Form */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-[#142B4A]">Direct Test Request Form (TRF)</h3>
          </div>
          <p className="text-xs text-slate-500">
            Send an electronic test quotation request directly to the lab's testing division.
          </p>

          <form onSubmit={handleSendQuote} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Standard to Test</label>
              <select
                value={testStandard}
                onChange={(e) => setTestStandard(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                {lab.supportedStandards.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Number of Golden Samples</label>
              <input
                type="number"
                min="1"
                max="10"
                value={sampleUnits}
                onChange={(e) => setSampleUnits(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-[11px] text-blue-900">
              <span className="font-bold block">50% MSME Subsidy Check</span>
              <span>Your registered Udyam ID will be attached to automatically apply the testing fee discount.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-xs"
            >
              Dispatch Quotation Request
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{lab.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{lab.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
