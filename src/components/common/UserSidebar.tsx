import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
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
} from 'lucide-react';

export const UserSidebar: React.FC = () => {
  const { currentScreen, navigate, setRole, userProfile } = useApp();

  const menuItems: { id: ScreenId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'user-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'user-ai-assistant', label: 'AI Standards Assistant', icon: Bot, badge: 'AI' },
    { id: 'user-standards-explorer', label: 'Standards Explorer', icon: Search },
    { id: 'user-compliance-wizard', label: 'Compliance Wizard', icon: Sparkles },
    { id: 'user-pdf-analysis', label: 'PDF Document Analysis', icon: FileText },
    { id: 'user-licence-verification', label: 'BIS Licence Verification', icon: ShieldCheck },
    { id: 'user-lab-finder', label: 'Testing Laboratory Finder', icon: Building2 },
    { id: 'user-reports-history', label: 'Reports & History', icon: FileCheck2 },
    { id: 'user-profile', label: 'My Profile', icon: User },
    { id: 'user-settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
        <div
          onClick={() => navigate('user-dashboard')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight leading-tight">
              StandardsIQ
            </span>
            <span className="text-[10px] text-blue-400 font-medium">Manufacturer Workspace</span>
          </div>
        </div>
      </div>

      {/* User Quick Info */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-semibold text-xs flex items-center justify-center">
            {userProfile?.avatarInitials || 'RS'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-white truncate">
              {userProfile?.fullName || 'Rehan Shaikh'}
            </span>
            <span className="text-[11px] text-slate-400 truncate">
              {userProfile?.companyName || 'Apex Electronics Pvt Ltd'}
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-emerald-400 font-medium">Udyam Verified MSME</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">User Role</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'user-standards-explorer' && currentScreen === 'user-standard-detail') ||
            (item.id === 'user-compliance-wizard' && currentScreen === 'user-compliance-results') ||
            (item.id === 'user-lab-finder' && currentScreen === 'user-lab-detail');

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-blue-800 text-blue-100' : 'bg-blue-900/60 text-blue-300'
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
          <span>View Public Portal</span>
        </button>

        <button
          onClick={() => {
            setRole('guest');
            navigate('public-landing');
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
