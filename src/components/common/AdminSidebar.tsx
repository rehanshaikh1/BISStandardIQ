import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
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
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { currentScreen, navigate, setRole, userProfile } = useApp();

  const adminMenuItems: { id: ScreenId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'admin-manage-standards', label: 'Manage BIS Standards', icon: BookOpen },
    { id: 'admin-product-categories', label: 'Product Categories', icon: FolderTree },
    { id: 'admin-compliance-rules', label: 'Compliance Rules', icon: FileCheck },
    { id: 'admin-testing-labs', label: 'Testing Laboratories', icon: Building },
    { id: 'admin-user-management', label: 'User Management', icon: Users },
    { id: 'admin-rag-knowledge-base', label: 'RAG Knowledge Base', icon: Cpu, badge: 'AI' },
    { id: 'admin-document-management', label: 'Document Management', icon: Files },
    { id: 'admin-system-logs', label: 'System Logs & Analytics', icon: Activity },
    { id: 'admin-settings', label: 'Admin Settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-[#0F1E36] text-slate-200 border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
        <div
          onClick={() => navigate('admin-dashboard')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
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
        </div>
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
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'admin-manage-standards' && currentScreen === 'admin-add-edit-standard');

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-700 text-blue-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Switcher & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          onClick={() => navigate('public-landing')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          <Globe className="w-4 h-4 text-slate-400" />
          <span>Exit to Public Portal</span>
        </button>

        <button
          onClick={() => {
            setRole('guest');
            navigate('public-landing');
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Admin Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
