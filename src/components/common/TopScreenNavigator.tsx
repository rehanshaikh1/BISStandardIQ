import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Compass, ShieldAlert, User, Eye, Check } from 'lucide-react';

export interface ScreenDefinition {
  number: number;
  category: 'Public' | 'User' | 'Auth' | 'Admin';
  label: string;
  path: string;
  matchPrefix?: string;
}

export const ALL_35_SCREENS: ScreenDefinition[] = [
  // A. Public / Guest (1-7)
  { number: 1, category: 'Public', label: '1. Public Landing Page', path: '/' },
  { number: 2, category: 'Public', label: '2. Public Standards Explorer', path: '/standards' },
  { number: 3, category: 'Public', label: '3. Public Standard Details', path: '/standards/is-13252-1' },
  { number: 4, category: 'Public', label: '4. Public Compliance Checker', path: '/compliance-checker' },
  { number: 5, category: 'Public', label: '5. Public Licence Verification', path: '/verify-licence' },
  { number: 6, category: 'Public', label: '6. Public Testing Lab Finder', path: '/laboratories' },
  { number: 7, category: 'Public', label: '7. Public Laboratory Details', path: '/laboratories/lab-ertl-north' },

  // B. Registered User (8-20)
  { number: 8, category: 'User', label: '8. User Dashboard', path: '/user/dashboard' },
  { number: 9, category: 'User', label: '9. AI Standards Assistant', path: '/user/ai-assistant' },
  { number: 10, category: 'User', label: '10. Authenticated Standards Explorer', path: '/user/standards' },
  { number: 11, category: 'User', label: '11. Authenticated Standard Details', path: '/user/standards/is-13252-1' },
  { number: 12, category: 'User', label: '12. Compliance Wizard', path: '/user/compliance' },
  { number: 13, category: 'User', label: '13. Compliance Results', path: '/user/compliance/assess-101/results' },
  { number: 14, category: 'User', label: '14. PDF Document Analysis', path: '/user/pdf-analysis' },
  { number: 15, category: 'User', label: '15. BIS Licence Verification (User)', path: '/user/licence-verification' },
  { number: 16, category: 'User', label: '16. Testing Lab Finder (User)', path: '/user/laboratories' },
  { number: 17, category: 'User', label: '17. Laboratory Details (User)', path: '/user/laboratories/lab-ertl-north' },
  { number: 18, category: 'User', label: '18. Reports & History', path: '/user/reports' },
  { number: 19, category: 'User', label: '19. My Profile', path: '/user/profile' },
  { number: 20, category: 'User', label: '20. Settings', path: '/user/settings' },

  // C. Auth (21-24)
  { number: 21, category: 'Auth', label: '21. Login', path: '/login' },
  { number: 22, category: 'Auth', label: '22. Register / Sign Up', path: '/register' },
  { number: 23, category: 'Auth', label: '23. Forgot Password', path: '/forgot-password' },
  { number: 24, category: 'Auth', label: '24. Reset Password', path: '/reset-password' },

  // D. Admin (25-35)
  { number: 25, category: 'Admin', label: '25. Admin Dashboard', path: '/admin/dashboard' },
  { number: 26, category: 'Admin', label: '26. Manage BIS Standards', path: '/admin/standards' },
  { number: 27, category: 'Admin', label: '27. Add / Edit Standard', path: '/admin/standards/create' },
  { number: 28, category: 'Admin', label: '28. Product Categories', path: '/admin/categories' },
  { number: 29, category: 'Admin', label: '29. Compliance Rules Management', path: '/admin/compliance-rules' },
  { number: 30, category: 'Admin', label: '30. Testing Lab Management', path: '/admin/laboratories' },
  { number: 31, category: 'Admin', label: '31. User Management', path: '/admin/users' },
  { number: 32, category: 'Admin', label: '32. RAG Knowledge Base Management', path: '/admin/knowledge-base' },
  { number: 33, category: 'Admin', label: '33. Document Management', path: '/admin/documents' },
  { number: 34, category: 'Admin', label: '34. System Logs & Analytics', path: '/admin/system-logs' },
  { number: 35, category: 'Admin', label: '35. Admin Settings', path: '/admin/settings' },
];

export const TopScreenNavigator: React.FC = () => {
  const { userRole, setRole } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Compute active screen index based on current URL path
  const currentScreenIndex = useMemo(() => {
    const currentPath = location.pathname;

    // Direct match
    const directMatch = ALL_35_SCREENS.findIndex((s) => s.path === currentPath);
    if (directMatch !== -1) return directMatch;

    // Pattern matches
    if (currentPath.startsWith('/user/standards/')) return 10; // Screen 11: Authenticated Standard Details
    if (currentPath.startsWith('/standards/')) return 2; // Screen 3: Public Standard Details
    if (currentPath.startsWith('/user/laboratories/')) return 16; // Screen 17: User Lab Details
    if (currentPath.startsWith('/laboratories/')) return 6; // Screen 7: Public Lab Details
    if (currentPath.includes('/results')) return 12; // Screen 13: Results
    if (currentPath.includes('/edit')) return 26; // Screen 27: Edit Standard

    return 0;
  }, [location.pathname]);

  const currentItem = ALL_35_SCREENS[currentScreenIndex] || ALL_35_SCREENS[0];

  const handleNavigateTo = (index: number) => {
    const target = ALL_35_SCREENS[index];
    if (!target) return;

    // Auto-adjust role if necessary to prevent route locking
    if (target.category === 'Admin' && userRole !== 'admin') {
      setRole('admin');
    } else if (target.category === 'User' && userRole === 'guest') {
      setRole('user');
    }
    navigate(target.path);
  };

  const handlePrev = () => {
    if (currentScreenIndex > 0) {
      handleNavigateTo(currentScreenIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentScreenIndex < ALL_35_SCREENS.length - 1) {
      handleNavigateTo(currentScreenIndex + 1);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = parseInt(e.target.value, 10);
    handleNavigateTo(idx);
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed bottom-4 right-4 z-50 bg-[#142B4A] text-white p-2.5 rounded-full shadow-lg border border-slate-700 hover:bg-blue-900 transition-all flex items-center gap-2 text-xs font-medium"
        title="Open Screen Navigator"
      >
        <Compass className="w-4 h-4 text-blue-400" />
        <span className="hidden sm:inline">Screen {currentItem.number}/35</span>
      </button>
    );
  }

  return (
    <></>
    // <div className="bg-[#0b1728] text-white border-b border-slate-800 text-xs px-2 sm:px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 z-50 relative">
    //   {/* Left: Screen Badge & Direct URL Dropdown */}
    //   <div className="flex items-center gap-1.5 sm:gap-2">
    //     <span className="px-2 py-0.5 rounded font-mono font-semibold text-[10px] sm:text-[11px] bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap shrink-0">
    //       Screen {currentItem.number} of 35
    //     </span>

    //     <div className="flex items-center">
    //       <button
    //         onClick={handlePrev}
    //         disabled={currentScreenIndex === 0}
    //         className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 shrink-0"
    //         title="Previous Screen"
    //       >
    //         <ChevronLeft className="w-4 h-4" />
    //       </button>
    //       <select
    //         value={currentScreenIndex}
    //         onChange={handleSelectChange}
    //         className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-1.5 sm:px-2 py-1 text-[11px] sm:text-xs focus:outline-none focus:border-blue-500 max-w-[170px] xs:max-w-[220px] sm:max-w-[320px] truncate"
    //       >
    //         <optgroup label="A. Public / Guest (1–7)">
    //           {ALL_35_SCREENS.filter((s) => s.category === 'Public').map((s) => (
    //             <option key={s.number} value={s.number - 1}>
    //               {s.label} ({s.path})
    //             </option>
    //           ))}
    //         </optgroup>
    //         <optgroup label="B. Registered User (8–20)">
    //           {ALL_35_SCREENS.filter((s) => s.category === 'User').map((s) => (
    //             <option key={s.number} value={s.number - 1}>
    //               {s.label} ({s.path})
    //             </option>
    //           ))}
    //         </optgroup>
    //         <optgroup label="C. Authentication (21–24)">
    //           {ALL_35_SCREENS.filter((s) => s.category === 'Auth').map((s) => (
    //             <option key={s.number} value={s.number - 1}>
    //               {s.label} ({s.path})
    //             </option>
    //           ))}
    //         </optgroup>
    //         <optgroup label="D. Admin Portal (25–35)">
    //           {ALL_35_SCREENS.filter((s) => s.category === 'Admin').map((s) => (
    //             <option key={s.number} value={s.number - 1}>
    //               {s.label} ({s.path})
    //             </option>
    //           ))}
    //         </optgroup>
    //       </select>
    //       <button
    //         onClick={handleNext}
    //         disabled={currentScreenIndex === ALL_35_SCREENS.length - 1}
    //         className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 shrink-0"
    //         title="Next Screen"
    //       >
    //         <ChevronRight className="w-4 h-4" />
    //       </button>
    //     </div>
    //   </div>

    //   {/* Right: Quick Role Switcher */}
    //   <div className="flex items-center gap-2 sm:gap-3">
    //     <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800 text-[10px] sm:text-[11px]">
    //       <span className="text-slate-500 px-1 hidden md:inline">Role:</span>
    //       <button
    //         onClick={() => {
    //           setRole('guest');
    //           if (location.pathname.startsWith('/user') || location.pathname.startsWith('/admin')) {
    //             navigate('/');
    //           }
    //         }}
    //         className={`px-1.5 sm:px-2 py-0.5 rounded font-medium transition-colors ${userRole === 'guest'
    //           ? 'bg-blue-600 text-white shadow-xs'
    //           : 'text-slate-400 hover:text-white'
    //           }`}
    //       >
    //         Guest
    //       </button>
    //       <button
    //         onClick={() => {
    //           setRole('user');
    //           if (location.pathname === '/' || location.pathname.startsWith('/admin')) {
    //             navigate('/user/dashboard');
    //           }
    //         }}
    //         className={`px-1.5 sm:px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${userRole === 'user'
    //           ? 'bg-blue-600 text-white shadow-xs'
    //           : 'text-slate-400 hover:text-white'
    //           }`}
    //       >
    //         <User className="w-3 h-3" />
    //         <span>User</span>
    //       </button>
    //       <button
    //         onClick={() => {
    //           setRole('admin');
    //           if (!location.pathname.startsWith('/admin')) {
    //             navigate('/admin/dashboard');
    //           }
    //         }}
    //         className={`px-1.5 sm:px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${userRole === 'admin'
    //           ? 'bg-amber-600 text-white shadow-xs'
    //           : 'text-slate-400 hover:text-white'
    //           }`}
    //       >
    //         <ShieldAlert className="w-3 h-3 text-amber-300" />
    //         <span>Admin</span>
    //       </button>
    //     </div>

    //     <button
    //       onClick={() => setIsCollapsed(true)}
    //       className="text-slate-500 hover:text-slate-300 text-[11px] p-1 shrink-0"
    //       title="Minimize review bar"
    //     >
    //       <Eye className="w-3.5 h-3.5" />
    //     </button>
    //   </div>
    // </div>
  );
};
