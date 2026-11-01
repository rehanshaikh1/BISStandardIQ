import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import { ChevronLeft, ChevronRight, Compass, ShieldAlert, User, Eye } from 'lucide-react';

export const ALL_SCREENS: { id: ScreenId; number: number; category: 'Public' | 'User' | 'Auth' | 'Admin'; label: string }[] = [
  // A. Public / Guest (1-7)
  { id: 'public-landing', number: 1, category: 'Public', label: '1. Public Landing Page' },
  { id: 'public-standards-explorer', number: 2, category: 'Public', label: '2. Public Standards Explorer' },
  { id: 'public-standard-detail', number: 3, category: 'Public', label: '3. Public Standard Details' },
  { id: 'public-compliance-checker', number: 4, category: 'Public', label: '4. Public Compliance Checker' },
  { id: 'public-licence-verification', number: 5, category: 'Public', label: '5. Public Licence Verification' },
  { id: 'public-lab-finder', number: 6, category: 'Public', label: '6. Public Testing Lab Finder' },
  { id: 'public-lab-detail', number: 7, category: 'Public', label: '7. Public Laboratory Details' },

  // B. Registered User (8-20)
  { id: 'user-dashboard', number: 8, category: 'User', label: '8. User Dashboard' },
  { id: 'user-ai-assistant', number: 9, category: 'User', label: '9. AI Standards Assistant' },
  { id: 'user-standards-explorer', number: 10, category: 'User', label: '10. Authenticated Standards Explorer' },
  { id: 'user-standard-detail', number: 11, category: 'User', label: '11. Authenticated Standard Details' },
  { id: 'user-compliance-wizard', number: 12, category: 'User', label: '12. Compliance Wizard' },
  { id: 'user-compliance-results', number: 13, category: 'User', label: '13. Compliance Results' },
  { id: 'user-pdf-analysis', number: 14, category: 'User', label: '14. PDF Document Analysis' },
  { id: 'user-licence-verification', number: 15, category: 'User', label: '15. BIS Licence Verification (User)' },
  { id: 'user-lab-finder', number: 16, category: 'User', label: '16. Testing Lab Finder (User)' },
  { id: 'user-lab-detail', number: 17, category: 'User', label: '17. Laboratory Details (User)' },
  { id: 'user-reports-history', number: 18, category: 'User', label: '18. Reports & History' },
  { id: 'user-profile', number: 19, category: 'User', label: '19. My Profile' },
  { id: 'user-settings', number: 20, category: 'User', label: '20. Settings' },

  // C. Auth (21-24)
  { id: 'auth-login', number: 21, category: 'Auth', label: '21. Login' },
  { id: 'auth-register', number: 22, category: 'Auth', label: '22. Register / Sign Up' },
  { id: 'auth-forgot-password', number: 23, category: 'Auth', label: '23. Forgot Password' },
  { id: 'auth-reset-password', number: 24, category: 'Auth', label: '24. Reset Password' },

  // D. Admin (25-35)
  { id: 'admin-dashboard', number: 25, category: 'Admin', label: '25. Admin Dashboard' },
  { id: 'admin-manage-standards', number: 26, category: 'Admin', label: '26. Manage BIS Standards' },
  { id: 'admin-add-edit-standard', number: 27, category: 'Admin', label: '27. Add / Edit Standard' },
  { id: 'admin-product-categories', number: 28, category: 'Admin', label: '28. Product Categories' },
  { id: 'admin-compliance-rules', number: 29, category: 'Admin', label: '29. Compliance Rules Management' },
  { id: 'admin-testing-labs', number: 30, category: 'Admin', label: '30. Testing Lab Management' },
  { id: 'admin-user-management', number: 31, category: 'Admin', label: '31. User Management' },
  { id: 'admin-rag-knowledge-base', number: 32, category: 'Admin', label: '32. RAG Knowledge Base Management' },
  { id: 'admin-document-management', number: 33, category: 'Admin', label: '33. Document Management' },
  { id: 'admin-system-logs', number: 34, category: 'Admin', label: '34. System Logs & Analytics' },
  { id: 'admin-settings', number: 35, category: 'Admin', label: '35. Admin Settings' },
];

export const TopScreenNavigator: React.FC = () => {
  const { currentScreen, navigate, userRole, setRole } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentIndex = ALL_SCREENS.findIndex((s) => s.id === currentScreen);
  const currentItem = currentIndex >= 0 ? ALL_SCREENS[currentIndex] : ALL_SCREENS[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prev = ALL_SCREENS[currentIndex - 1];
      if (prev.category === 'Admin' && userRole !== 'admin') setRole('admin');
      if (prev.category === 'User' && userRole === 'guest') setRole('user');
      navigate(prev.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < ALL_SCREENS.length - 1) {
      const next = ALL_SCREENS[currentIndex + 1];
      if (next.category === 'Admin' && userRole !== 'admin') setRole('admin');
      if (next.category === 'User' && userRole === 'guest') setRole('user');
      navigate(next.id);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value as ScreenId;
    const selected = ALL_SCREENS.find((s) => s.id === selectedId);
    if (!selected) return;

    if (selected.category === 'Admin' && userRole !== 'admin') {
      setRole('admin');
    } else if (selected.category === 'User' && userRole === 'guest') {
      setRole('user');
    }
    navigate(selectedId);
  };

  return null;
    // <div className="bg-[#0b1728] text-white border-b border-slate-800 text-xs px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 z-50 relative">
    //   {/* Left: Screen Badge & Direct Dropdown */}
    //   <div className="flex items-center gap-2">
    //     <span className="px-2 py-0.5 rounded font-mono font-semibold text-[11px] bg-blue-500/20 text-blue-300 border border-blue-400/30">
    //       Screen {currentItem.number} of 35
    //     </span>

    //     <div className="flex items-center">
    //       <button
    //         onClick={handlePrev}
    //         disabled={currentIndex === 0}
    //         className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
    //         title="Previous Screen"
    //       >
    //         <ChevronLeft className="w-4 h-4" />
    //       </button>
    //       <select
    //         value={currentScreen}
    //         onChange={handleSelect}
    //         className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500 max-w-[260px] sm:max-w-[340px] truncate"
    //       >
    //         <optgroup label="A. Public / Guest (1–7)">
    //           {ALL_SCREENS.filter((s) => s.category === 'Public').map((s) => (
    //             <option key={s.id} value={s.id}>
    //               {s.label}
    //             </option>
    //           ))}
    //         </optgroup>
    //         <optgroup label="B. Registered User (8–20)">
    //           {ALL_SCREENS.filter((s) => s.category === 'User').map((s) => (
    //             <option key={s.id} value={s.id}>
    //               {s.label}
    //             </option>
    //           ))}
    //         </optgroup>
    //         <optgroup label="C. Authentication (21–24)">
    //           {ALL_SCREENS.filter((s) => s.category === 'Auth').map((s) => (
    //             <option key={s.id} value={s.id}>
    //               {s.label}
    //             </option>
    //           ))}
    //         </optgroup>
    //         <optgroup label="D. Admin Portal (25–35)">
    //           {ALL_SCREENS.filter((s) => s.category === 'Admin').map((s) => (
    //             <option key={s.id} value={s.id}>
    //               {s.label}
    //             </option>
    //           ))}
    //         </optgroup>
    //       </select>
    //       <button
    //         onClick={handleNext}
    //         disabled={currentIndex === ALL_SCREENS.length - 1}
    //         className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
    //         title="Next Screen"
    //       >
    //         <ChevronRight className="w-4 h-4" />
    //       </button>
    //     </div>
    //   </div>

    //   {/* Right: Quick Role Switcher for seamless testing of guest/user/admin */}
    //   <div className="flex items-center gap-3">
    //     <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800 text-[11px]">
    //       <span className="text-slate-500 px-1.5 hidden sm:inline">Active Role:</span>
    //       <button
    //         onClick={() => {
    //           setRole('guest');
    //           if (currentScreen.startsWith('user-') || currentScreen.startsWith('admin-')) {
    //             navigate('public-landing');
    //           }
    //         }}
    //         className={`px-2 py-0.5 rounded font-medium transition-colors ${userRole === 'guest'
    //             ? 'bg-blue-600 text-white shadow-xs'
    //             : 'text-slate-400 hover:text-white'
    //           }`}
    //       >
    //         Guest
    //       </button>
    //       <button
    //         onClick={() => {
    //           setRole('user');
    //           if (currentScreen.startsWith('public-') || currentScreen.startsWith('admin-')) {
    //             navigate('user-dashboard');
    //           }
    //         }}
    //         className={`px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${userRole === 'user'
    //             ? 'bg-blue-600 text-white shadow-xs'
    //             : 'text-slate-400 hover:text-white'
    //           }`}
    //       >
    //         <User className="w-3 h-3" />
    //         <span>User</span>
    //       </button>
    //       <button
    //         onClick={() => {
    //           setRole('admin');
    //           if (!currentScreen.startsWith('admin-')) {
    //             navigate('admin-dashboard');
    //           }
    //         }}
    //         className={`px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${userRole === 'admin'
    //             ? 'bg-amber-600 text-white shadow-xs'
    //             : 'text-slate-400 hover:text-white'
    //           }`}
    //       >
    //         <ShieldAlert className="w-3 h-3 text-amber-300" />
    //         <span>Admin</span>
    //       </button>
    //     </div>

    //     <button
    //       onClick={() => setIsCollapsed(true)}
    //       className="text-slate-500 hover:text-slate-300 text-[11px] px-1"
    //       title="Minimize bar"
    //     >
    //       <Eye className="w-3.5 h-3.5" />
    //     </button>
    //   </div>
    // </div>
  );
};
