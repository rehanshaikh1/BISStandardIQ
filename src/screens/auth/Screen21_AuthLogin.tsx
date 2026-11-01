import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Screen21_AuthLogin: React.FC = () => {
  const { navigate, setRole } = useApp();

  const [email, setEmail] = useState('rehanshaikh1457@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin')) {
      setRole('admin');
      navigate('admin-dashboard');
    } else {
      setRole('user');
      navigate('user-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Branded Value Panel */}
        <div className="md:col-span-5 bg-[#142B4A] p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">BIS StandardsIQ</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Intelligent Standards. Simplified Compliance.
            </h2>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Log in to access your enterprise compliance audits, communicate with our RAG AI assistant, and track mandatory QCO deadlines.
            </p>

            <div className="mt-8 space-y-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>IS 13252 &amp; IS 16046 AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>50% MSME Testing Fee Subsidy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct NABL Laboratory Dispatch</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-slate-400 border-t border-slate-800">
            Role Policy: User accounts are strictly for Manufacturers, Importers, and MSMEs. Admin accounts are managed by platform administrators.
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#142B4A]">Manufacturer Sign In</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your corporate email credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => navigate('auth-forgot-password')}
                  className="text-blue-600 hover:underline font-medium text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span>Remember this computer</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Credentials for Fast Evaluation */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 block">
              Quick Evaluator Shortcuts:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setRole('user');
                  navigate('user-dashboard');
                }}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-semibold transition-colors text-center"
              >
                Instant User Login
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  navigate('admin-dashboard');
                }}
                className="flex-1 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded text-[11px] font-semibold transition-colors text-center inline-flex items-center justify-center gap-1"
              >
                <ShieldAlert className="w-3 h-3 text-amber-600" />
                <span>Instant Admin Login</span>
              </button>
            </div>
          </div>

          <div className="mt-5 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('auth-register')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
