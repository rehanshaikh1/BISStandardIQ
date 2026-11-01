import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  FileCheck,
  Building,
  Users,
  Cpu,
  Files,
  Activity,
  Sliders,
  LogOut,
  Globe,
  ShieldAlert,
  X,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { setRole, userProfile, isMobileSidebarOpen, setIsMobileSidebarOpen } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenuItems = [
    { to: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { to: '/admin/standards', label: 'Manage BIS Standards', icon: BookOpen },
    { to: '/admin/categories', label: 'Product Categories', icon: FolderTree },
    { to: '/admin/compliance-rules', label: 'Compliance Rules', icon: FileCheck },
    { to: '/admin/laboratories', label: 'Testing Laboratories', icon: Building },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/knowledge-base', label: 'RAG Knowledge Base', icon: Cpu, badge: 'AI' },
    { to: '/admin/documents', label: 'Document Management', icon: Files },
    { to: '/admin/system-logs', label: 'System Logs & Analytics', icon: Activity },
    { to: '/admin/settings', label: 'Admin Settings', icon: Sliders },
  ];

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname, setIsMobileSidebarOpen]);

  // Lock background scroll when drawer open
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
          to="/admin/dashboard"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight leading-tight">
              StandardsIQ
            </span>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              Admin Console
            </span>
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

      {/* Admin Quick Info */}
      <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Signed in as:</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
            Platform Admin
          </span>
        </div>
        <p className="text-xs font-semibold text-white mt-1 truncate">
          {userProfile?.email || 'admin.director@standardsiq.gov.in'}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
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
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-700 text-blue-300'
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
          <span>Exit to Public Portal</span>
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Admin Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0F1E36] text-slate-200 border-r border-slate-800 flex-col shrink-0 min-h-screen sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet Drawer & Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer content */}
          <aside className="relative w-72 max-w-[85vw] bg-[#0F1E36] text-slate-200 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
