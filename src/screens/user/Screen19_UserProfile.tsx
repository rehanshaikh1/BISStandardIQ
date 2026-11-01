import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Building, Mail, Phone, MapPin, Award, CheckCircle2, Save } from 'lucide-react';

export const Screen19_UserProfile: React.FC = () => {
  const { userProfile } = useApp();

  const [fullName, setFullName] = useState(userProfile?.fullName || 'Rehan Shaikh');
  const [email, setEmail] = useState(userProfile?.email || 'rehanshaikh1457@gmail.com');
  const [companyName, setCompanyName] = useState(
    userProfile?.companyName || 'Apex Electronics & Smart Mobility Pvt Ltd'
  );
  const [businessType, setBusinessType] = useState(userProfile?.businessType || 'MSME');
  const [udyamNumber, setUdyamNumber] = useState(
    userProfile?.udyamNumber || 'UDYAM-DL-08-0049281'
  );
  const [phone, setPhone] = useState(userProfile?.phone || '+91 98112 40921');
  const [city, setCity] = useState(userProfile?.city || 'Noida');
  const [state, setState] = useState(userProfile?.state || 'Uttar Pradesh');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          Enterprise Account
        </span>
        <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
          Manufacturer Profile &amp; Verification
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your enterprise profile, Udyam MSME certification status, and statutory notification preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile details updated successfully.</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">Saved</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-700 text-white font-bold text-xl flex items-center justify-center">
              {userProfile?.avatarInitials || 'RS'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#142B4A]">{fullName}</h2>
              <p className="text-xs text-slate-500">{companyName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Udyam Verified MSME</span>
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  Role: User
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Email</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Enterprise Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Business Classification</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                <option value="MSME">Micro, Small or Medium Enterprise (MSME)</option>
                <option value="Manufacturer">Large Scale Manufacturer</option>
                <option value="Importer">Importer / Authorized Indian Representative (AIR)</option>
                <option value="Consultant / Lab">Compliance Consultant</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Udyam Registration Number (For 50% Subsidy)
              </label>
              <input
                type="text"
                value={udyamNumber}
                onChange={(e) => setUdyamNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Direct Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Operating City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">State / Union Territory</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
