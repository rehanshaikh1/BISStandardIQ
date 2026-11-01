import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { navigate, userRole, setRole } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title */}
        <div
          onClick={() => navigate('public-landing')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#142B4A] flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#142B4A] whitespace-nowrap">
              BIS StandardsIQ
            </span>
            <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:inline">
              Regulatory Intelligence
            </span>
          </div>
        </div>

        {/* Zone 2: 4-5 concise nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => navigate('public-landing')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Home
          </button>
          <button
            onClick={() => navigate('public-standards-explorer')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Explore Standards
          </button>
          <button
            onClick={() => navigate('public-compliance-checker')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Compliance Checker
          </button>
          <button
            onClick={() => navigate('public-licence-verification')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Verify Licence
          </button>
          <button
            onClick={() => navigate('public-lab-finder')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Find Testing Labs
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          {userRole === 'guest' ? (
            <>
              <button
                onClick={() => navigate('auth-login')}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 px-3 py-1.5 transition-colors whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('auth-register')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  navigate(userRole === 'admin' ? 'admin-dashboard' : 'user-dashboard')
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Go to {userRole === 'admin' ? 'Admin Portal' : 'Workspace'}</span>
              </button>
              <button
                onClick={() => setRole('guest')}
                className="text-xs text-slate-500 hover:text-slate-800 underline px-1"
              >
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
