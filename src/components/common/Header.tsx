import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, UserCheck, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { userRole, setRole } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand title */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
        >
          <div className="w-9 h-9 rounded-lg bg-[#142B4A] flex items-center justify-center text-white shadow-sm shrink-0">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#142B4A] whitespace-nowrap">
              BIS StandardsIQ
            </span>
            <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:inline">
              Regulatory Intelligence
            </span>
          </div>
        </Link>

        {/* Zone 2: 4-5 concise nav links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition-colors whitespace-nowrap hover:text-blue-600 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/standards"
            className={({ isActive }) =>
              `transition-colors whitespace-nowrap hover:text-blue-600 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Explore Standards
          </NavLink>
          <NavLink
            to="/compliance-checker"
            className={({ isActive }) =>
              `transition-colors whitespace-nowrap hover:text-blue-600 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Compliance Checker
          </NavLink>
          <NavLink
            to="/verify-licence"
            className={({ isActive }) =>
              `transition-colors whitespace-nowrap hover:text-blue-600 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Verify Licence
          </NavLink>
          <NavLink
            to="/laboratories"
            className={({ isActive }) =>
              `transition-colors whitespace-nowrap hover:text-blue-600 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Find Testing Labs
          </NavLink>
        </nav>

        {/* Zone 3: Primary actions & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {userRole === 'guest' ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 px-2.5 sm:px-3 py-1.5 transition-colors whitespace-nowrap"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden xs:inline">
                  {userRole === 'admin' ? 'Admin Portal' : 'Workspace'}
                </span>
              </Link>
              <button
                onClick={() => {
                  setRole('guest');
                  navigate('/');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline px-1"
              >
                Exit
              </button>
            </div>
          )}

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
            <NavLink
              to="/"
              end
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/standards"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                }`
              }
            >
              Explore Standards
            </NavLink>
            <NavLink
              to="/compliance-checker"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                }`
              }
            >
              Compliance Checker
            </NavLink>
            <NavLink
              to="/verify-licence"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                }`
              }
            >
              Verify Licence
            </NavLink>
            <NavLink
              to="/laboratories"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                }`
              }
            >
              Find Testing Labs
            </NavLink>
          </nav>

          {userRole === 'guest' ? (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full text-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="w-full text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Get Started Free
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                onClick={closeMobileMenu}
                className="w-full text-center py-2.5 px-4 bg-blue-600 text-white rounded-lg text-xs font-semibold"
              >
                Go to {userRole === 'admin' ? 'Admin Portal' : 'Workspace'}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
