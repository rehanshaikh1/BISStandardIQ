import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LicenceVerificationResult } from '../../types';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  AlertOctagon,
  Download,
  Calendar,
  MapPin,
  RefreshCw,
  FolderPlus,
} from 'lucide-react';

export const Screen15_UserLicenceVerification: React.FC = () => {
  const { verifyLicenceNumber, verificationHistory } = useApp();

  const [activeTab, setActiveTab] = useState<'ISI' | 'CRS'>('ISI');
  const [queryInput, setQueryInput] = useState('CM/L-7821940');
  const [result, setResult] = useState<LicenceVerificationResult | null>(null);
  const [savedAlert, setSavedAlert] = useState(false);
  const [downloadAlert, setDownloadAlert] = useState(false);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!queryInput.trim()) return;
    const res = verifyLicenceNumber(queryInput.trim(), activeTab);
    setResult(res);
  };

  const handleSaveResult = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleDownloadCertificate = () => {
    setDownloadAlert(true);
    setTimeout(() => setDownloadAlert(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          Enterprise Verification Console
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-0.5">
          BIS Licence &amp; Supplier Audit Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Verify component supplier licences, audit OEM registration numbers, and archive timestamped proof of authenticity.
        </p>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Licence record archived into your Company Compliance Vault.</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">Archived</span>
        </div>
      )}

      {downloadAlert && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            <span>BIS Licence Verification Audit Certificate downloaded.</span>
          </div>
          <span className="font-mono text-[11px] text-blue-700">Certificate Ready</span>
        </div>
      )}

      {/* Verification Query Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <button
            onClick={() => {
              setActiveTab('ISI');
              setQueryInput('CM/L-7821940');
              setResult(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'ISI'
                ? 'bg-[#142B4A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ISI Mark – CM/L Number
          </button>
          <button
            onClick={() => {
              setActiveTab('CRS');
              setQueryInput('R-41028475');
              setResult(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'CRS'
                ? 'bg-[#142B4A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            CRS – R Number
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
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
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify National Database</span>
            </button>
          </div>
        </form>

        {/* Live Result View */}
        {result && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div
              className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
                result.status === 'Valid'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : result.status === 'Expired'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                  : 'bg-red-50/70 border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.status === 'Valid' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : result.status === 'Expired' ? (
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm">{result.queryNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        result.status === 'Valid'
                          ? 'bg-emerald-600 text-white'
                          : result.status === 'Expired'
                          ? 'bg-amber-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>
                  <p className="text-xs mt-1">{result.licenseeName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveResult}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Save Result</span>
                </button>
                <button
                  onClick={handleDownloadCertificate}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Audit PDF</span>
                </button>
              </div>
            </div>

            {/* Grid Specs */}
            {result.status !== 'Invalid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[11px]">Applicable Standard:</span>
                  <span className="font-mono font-semibold text-blue-700">{result.applicableStandard}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Validity Duration:</span>
                  <span className="font-semibold text-slate-800">{result.validFrom} to {result.validTo}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Factory Location:</span>
                  <span className="text-slate-700">{result.factoryAddress}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Verification History Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#142B4A]">Supplier Licence Audit Log</h3>
          <span className="text-xs text-slate-500">{verificationHistory.length} Recorded Verifications</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Licence No.</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Licensee Name</th>
                <th className="py-2.5 px-3">Validity</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verificationHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {item.queryNumber}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700 whitespace-nowrap">
                    {item.type}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Valid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-800 font-medium max-w-xs truncate">
                    {item.licenseeName}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {item.validTo}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setResult(item)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Inspect
                    </button>
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
