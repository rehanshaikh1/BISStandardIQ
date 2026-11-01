import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Bell,
  Lock,
  Shield,
  Key,
  CheckCircle2,
  Save,
  Globe,
  Trash2,
} from 'lucide-react';

export const Screen20_UserSettings: React.FC = () => {
  const [qcoAlerts, setQcoAlerts] = useState(true);
  const [renewalAlerts, setRenewalAlerts] = useState(true);
  const [labQuotesAlerts, setLabQuotesAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          System Preferences
        </span>
        <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
          Workspace &amp; Regulatory Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure Quality Control Order alerts, password authentication, and external ERP webhook integrations.
        </p>
      </div>

      {savedFeedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Workspace preferences saved successfully.</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">Updated</span>
        </div>
      )}

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-[#142B4A]">Regulatory Notification Alerts</h2>
        </div>
        <p className="text-xs text-slate-500">
          Receive real-time alerts when Central Ministries publish new gazette orders or amendments to your saved standards.
        </p>

        <div className="space-y-3 pt-2 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Quality Control Order (QCO) Gazette Alerts</span>
              <span className="text-slate-500 text-[11px]">Immediate notification for DPIIT, MeitY, and Ministry of Power orders.</span>
            </div>
            <input
              type="checkbox"
              checked={qcoAlerts}
              onChange={(e) => setQcoAlerts(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Supplier Licence Expiry Warnings</span>
              <span className="text-slate-500 text-[11px]">Warn 90 days before an audited supplier's CM/L or R-number elapses.</span>
            </div>
            <input
              type="checkbox"
              checked={renewalAlerts}
              onChange={(e) => setRenewalAlerts(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Testing Laboratory Quotation Updates</span>
              <span className="text-slate-500 text-[11px]">Notify when an accredited test center uploads formal test fee quotations.</span>
            </div>
            <input
              type="checkbox"
              checked={labQuotesAlerts}
              onChange={(e) => setLabQuotesAlerts(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
          </label>
        </div>
      </div>

      {/* Security & Authentication */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-[#142B4A]">Security &amp; Password Management</h2>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* API Keys for ERP */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-[#142B4A]">Compliance API Keys (ERP Integration)</h2>
        </div>
        <p className="text-xs text-slate-500">
          Integrate BIS StandardsIQ verification directly into SAP, Oracle, or Tally inventory systems.
        </p>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-mono text-slate-700 font-semibold block">bsiq_live_pk_9948291038472910</span>
            <span className="text-[11px] text-slate-400">Created 2026-10-15 · Full Read Access</span>
          </div>
          <button className="text-xs text-blue-600 font-semibold hover:underline">
            Rotate Key
          </button>
        </div>
      </div>
    </div>
  );
};
