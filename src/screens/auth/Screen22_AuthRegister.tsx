import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, User, Building, CheckCircle2 } from 'lucide-react';

export const Screen22_AuthRegister: React.FC = () => {
  const { navigate, setRole } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('MSME');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Strictly registers as User (Manufacturer/Importer/MSME)
    setRole('user');
    navigate('user-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Brand Info */}
        <div className="md:col-span-5 bg-[#142B4A] p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">BIS StandardsIQ</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Join India's Premier Regulatory Network
            </h2>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Create your corporate manufacturer workspace to unlock clause-level AI guidance, upload technical datasheets, and claim 50% statutory MSME testing subsidies.
            </p>

            <div className="mt-8 space-y-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited standard searches and clause lookups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PDF datasheet analysis and clause extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct quotation request to NABL accredited labs</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-slate-400 border-t border-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-300 block">Strict Access Control Notice:</span>
            Public registration strictly creates <strong className="text-white">User</strong> accounts for Manufacturers, Importers, and MSMEs. Admin access cannot be requested here and is provisioned through internal security protocols.
          </div>
        </div>

        {/* Right Column: Register Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-[#142B4A]">Create Free Account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Start with complimentary guest access upgraded to full enterprise features.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rehan Shaikh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Hardware Pvt Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business Classification</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="MSME">MSME (Udyam Registered)</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Importer">Importer / AIR</option>
                  <option value="Other">Other Enterprise</option>
                </select>
              </div>
            </div>

            <label className="flex items-start gap-2 pt-1 text-slate-600 text-[11px] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 mt-0.5"
              />
              <span>
                I agree to the BIS StandardsIQ Terms of Service and Privacy Policy for Indian regulatory compliance.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 mt-2"
            >
              <span>Create Manufacturer Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-slate-500">
            Already registered?{' '}
            <button
              onClick={() => navigate('auth-login')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
