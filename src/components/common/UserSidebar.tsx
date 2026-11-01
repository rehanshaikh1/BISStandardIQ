import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  Search,
  Sparkles,
  FileText,
  ShieldCheck,
  Building2,
  FileCheck2,
  User,
  Settings,
  LogOut,
  Globe,
  X,
} from 'lucide-react';

export const UserSidebar: React.FC = () => {
  const { setRole, userProfile, isMobileSidebarOpen, setIsMobileSidebarOpen } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { to: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/user/ai-assistant', label: 'AI Standards Assistant', icon: Bot, badge: 'AI' },
    { to: '/user/standards', label: 'Standards Explorer', icon: Search },
    { to: '/user/compliance', label: 'Compliance Wizard', icon: Sparkles },
    { to: '/user/pdf-analysis', label: 'PDF Document Analysis', icon: FileText },
    { to: '/user/licence-verification', label: 'BIS Licence Verification', icon: ShieldCheck },
    { to: '/user/laboratories', label: 'Testing Laboratory Finder', icon: Building2 },
    { to: '/user/reports', label: 'Reports & History', icon: FileCheck2 },
    { to: '/user/profile', label: 'My Profile', icon: User },
    { to: '/user/settings', label: 'Settings', icon: Settings },
  ];

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname, setIsMobileSidebarOpen]);

  // Lock background scroll when mobile drawer open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  const handleSignOut = () => {
    setRole('guest');
    setIsMobileSidebarOpen(false);
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
        <Link
          to="/user/dashboard"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight leading-tight">
              StandardsIQ
            </span>
            <span className="text-[10px] text-blue-400 font-medium">Manufacturer Workspace</span>
          </div>
        </Link>

        {/* Close button on mobile drawer */}
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Quick Info */}
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-semibold text-xs flex items-center justify-center shrink-0">
            {userProfile?.avatarInitials || 'RS'}
          </div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="text-xs font-semibold text-white truncate">
              {userProfile?.fullName || 'Rehan Shaikh'}
            </span>
            <span className="text-[11px] text-slate-400 truncate">
              {userProfile?.companyName || 'Apex Electronics Pvt Ltd'}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-emerald-400 font-medium">Udyam Verified MSME</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">User</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${isActive ? 'bg-blue-800 text-blue-100' : 'bg-blue-900/60 text-blue-300'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Switcher & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          to="/"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          <Globe className="w-4 h-4 text-slate-400 shrink-0" />
          <span>View Public Portal</span>
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex-col shrink-0 min-h-screen sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet Drawer & Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer content */}
          <aside className="relative w-72 max-w-[85vw] bg-slate-900 text-slate-200 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
