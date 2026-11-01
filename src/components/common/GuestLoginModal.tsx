import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, X, CheckCircle2 } from 'lucide-react';

export const GuestLoginModal: React.FC = () => {
  const { guestModalOpen, guestModalConfig, closeGuestModal, navigate, setRole } = useApp();

  if (!guestModalOpen) return null;

  const handleCreateAccount = () => {
    closeGuestModal();
    navigate('auth-register');
  };

  const handleLogin = () => {
    closeGuestModal();
    navigate('auth-login');
  };

  const handleDemoSignInAsUser = () => {
    closeGuestModal();
    setRole('user');
    if (guestModalConfig.targetScreen) {
      navigate(guestModalConfig.targetScreen);
    } else {
      navigate('user-dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeGuestModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Titles */}
        <h3 className="text-xl font-bold text-[#142B4A] tracking-tight">
          {guestModalConfig.title || 'Unlock the Full Power of StandardsIQ'}
        </h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {guestModalConfig.description ||
            'Create a free account to access AI-powered compliance guidance, analyse your documents and save your compliance reports.'}
        </p>

        {/* Value Points */}
        <div className="mt-5 space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Interactive AI Standards Assistant with clause-level citations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Downloadable PDF Compliance Audits &amp; MSME 50% Subsidy calculation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>AI Technical PDF Datasheet analyzer with automated clause extraction</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleCreateAccount}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors text-center"
          >
            Create Free Account
          </button>
          <button
            onClick={handleLogin}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors text-center"
          >
            Login
          </button>
          <button
            onClick={closeGuestModal}
            className="py-2.5 px-4 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors text-center"
          >
            Continue Exploring
          </button>
        </div>

        {/* Quick Demo Sign In Shortcut */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Testing as evaluator?</span>
          <button
            onClick={handleDemoSignInAsUser}
            className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Instant Demo User Sign-in</span>
          </button>
        </div>
      </div>
    </div>
  );
};
