import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LicenceVerificationResult } from '../../types';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Building,
  MapPin,
  Calendar,
  Download,
  AlertTriangle,
} from 'lucide-react';

export const Screen05_PublicLicenceVerification: React.FC = () => {
  const { verifyLicenceNumber, openGuestModal, navigate } = useApp();

  const [activeTab, setActiveTab] = useState<'ISI' | 'CRS'>('ISI');
  const [queryInput, setQueryInput] = useState('CM/L-7821940');
  const [result, setResult] = useState<LicenceVerificationResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!queryInput.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const res = verifyLicenceNumber(queryInput.trim(), activeTab);
      setResult(res);
      setIsSearching(false);
    }, 400);
  };

  const handleTabSwitch = (tab: 'ISI' | 'CRS') => {
    setActiveTab(tab);
    if (tab === 'ISI') {
      setQueryInput('CM/L-7821940');
    } else {
      setQueryInput('R-41028475');
    }
    setResult(null);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>National Verification Registry</span>
            <span aria-hidden="true">/</span>
            <span className="text-blue-600 font-medium">BIS Licence Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
            BIS Licence &amp; Registration Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time query tool to verify authentic Bureau of Indian Standards ISI Mark (CM/L) licences and Compulsory Registration Scheme (CRS) R-numbers.
          </p>
        </div>

        {/* Verification Box */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <button
              onClick={() => handleTabSwitch('ISI')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'ISI'
                  ? 'bg-[#142B4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ISI Mark – CM/L Number (Scheme-I)
            </button>
            <button
              onClick={() => handleTabSwitch('CRS')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'CRS'
                  ? 'bg-[#142B4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              CRS – R Number (Scheme-II)
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {activeTab === 'ISI'
                  ? 'Enter 7 or 8-digit CM/L Number (e.g. CM/L-7821940)'
                  : 'Enter 8-digit CRS Registration Number (e.g. R-41028475)'}
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder={activeTab === 'ISI' ? 'CM/L-XXXXXXX' : 'R-XXXXXXXX'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white uppercase"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isSearching ? 'Verifying...' : 'Verify Status'}</span>
                </button>
              </div>
            </div>

            {/* Quick Test Samples */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="text-[11px] font-semibold text-slate-400">Quick test queries:</span>
              {activeTab === 'ISI' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('CM/L-7821940');
                      setResult(null);
                    }}
                    className="text-[11px] font-mono text-blue-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    CM/L-7821940 (Dixon, Valid)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('CM/L-4589211');
                      setResult(null);
                    }}
                    className="text-[11px] font-mono text-blue-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    CM/L-4589211 (Havells, Valid)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('CM/L-2910488');
                      setResult(null);
                    }}
                    className="text-[11px] font-mono text-amber-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    CM/L-2910488 (Expired)
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('R-41028475');
                      setResult(null);
                    }}
                    className="text-[11px] font-mono text-blue-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    R-41028475 (Samsung, Valid)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('R-41198302');
                      setResult(null);
                    }}
                    className="text-[11px] font-mono text-blue-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    R-41198302 (Exide Li-ion, Valid)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQueryInput('R-41999999');
                      setResult(null);
                    }}
                    className="text-[11px] font-mono text-red-600 hover:underline bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                  >
                    R-41999999 (Invalid/Fake)
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Verification Results Display */}
          {result && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              {/* Status Header Alert */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  result.status === 'Valid'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : result.status === 'Expired'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                    : 'bg-red-50/70 border-red-200 text-red-900'
                }`}
              >
                {result.status === 'Valid' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : result.status === 'Expired' ? (
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm tracking-wide">
                      {result.queryNumber}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        result.status === 'Valid'
                          ? 'bg-emerald-600 text-white'
                          : result.status === 'Expired'
                          ? 'bg-amber-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      Status: {result.status}
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    {result.status === 'Valid'
                      ? 'This licence is active and certified in the National Bureau of Indian Standards repository.'
                      : result.status === 'Expired'
                      ? 'This licence has elapsed and is no longer authorized for marking or sale until renewed.'
                      : 'No active licence or registration could be located. Please verify the characters or report fraudulent marking.'}
                  </p>
                </div>
              </div>

              {/* Data Grid if Found */}
              {result.status !== 'Invalid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-500 block">Licensee &amp; Brand</span>
                    <span className="font-bold text-sm text-slate-900 block">{result.licenseeName}</span>
                    <div className="text-slate-600">
                      <span className="font-medium text-slate-700">Brand: </span>
                      {result.brandName}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-500 block">Standard &amp; Scheme</span>
                    <span className="font-mono font-bold text-sm text-blue-700 block">
                      {result.applicableStandard}
                    </span>
                    <div className="text-slate-600">
                      <span className="font-medium text-slate-700">Scheme: </span>
                      {result.type === 'ISI' ? 'ISI Mark (Scheme-I)' : 'CRS (Scheme-II)'}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-500 block">Product Scope</span>
                    <p className="text-slate-800 font-medium">{result.productDescription}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-500 block">Validity Period</span>
                    <div className="flex items-center gap-2 text-slate-800 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{result.validFrom} to {result.validTo}</span>
                    </div>
                    {result.lastSurveillanceDate && (
                      <div className="text-[11px] text-slate-500">
                        Last Surveillance Audit: {result.lastSurveillanceDate}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-500 block">Certified Manufacturing Facility</span>
                    <div className="flex items-start gap-2 text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>{result.factoryAddress}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-1">
                      Issuing Branch: {result.issuingBranch}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Guest prompt for saving / downloading verification */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-[#142B4A]">
              Need to archive verification audits or track licence expiries?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Create a free account to download verification certificates and receive automated expiry alerts.
            </p>
          </div>
          <button
            onClick={() =>
              openGuestModal(
                'Archive Licence Verification',
                'Register a free manufacturer account to save licence verification audits, export PDF proof certificates, and set automated renewal reminders.'
              )
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
          >
            Save Verification Report
          </button>
        </div>
      </div>
    </div>
  );
};
