import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { UserSidebar } from './components/common/UserSidebar';
import { AdminSidebar } from './components/common/AdminSidebar';
import { TopScreenNavigator } from './components/common/TopScreenNavigator';
import { GuestLoginModal } from './components/common/GuestLoginModal';
import { Menu, ShieldCheck } from 'lucide-react';

// Public Screens (1-7)
import { Screen01_PublicLanding } from './screens/public/Screen01_PublicLanding';
import { Screen02_PublicStandardsExplorer } from './screens/public/Screen02_PublicStandardsExplorer';
import { Screen03_PublicStandardDetail } from './screens/public/Screen03_PublicStandardDetail';
import { Screen04_PublicComplianceChecker } from './screens/public/Screen04_PublicComplianceChecker';
import { Screen05_PublicLicenceVerification } from './screens/public/Screen05_PublicLicenceVerification';
import { Screen06_PublicLabFinder } from './screens/public/Screen06_PublicLabFinder';
import { Screen07_PublicLabDetail } from './screens/public/Screen07_PublicLabDetail';

// User Screens (8-20)
import { Screen08_UserDashboard } from './screens/user/Screen08_UserDashboard';
import { Screen09_UserAIAssistant } from './screens/user/Screen09_UserAIAssistant';
import { Screen10_UserStandardsExplorer } from './screens/user/Screen10_UserStandardsExplorer';
import { Screen11_UserStandardDetail } from './screens/user/Screen11_UserStandardDetail';
import { Screen12_UserComplianceWizard } from './screens/user/Screen12_UserComplianceWizard';
import { Screen13_UserComplianceResults } from './screens/user/Screen13_UserComplianceResults';
import { Screen14_UserPDFAnalysis } from './screens/user/Screen14_UserPDFAnalysis';
import { Screen15_UserLicenceVerification } from './screens/user/Screen15_UserLicenceVerification';
import { Screen16_UserLabFinder } from './screens/user/Screen16_UserLabFinder';
import { Screen17_UserLabDetail } from './screens/user/Screen17_UserLabDetail';
import { Screen18_UserReportsHistory } from './screens/user/Screen18_UserReportsHistory';
import { Screen19_UserProfile } from './screens/user/Screen19_UserProfile';
import { Screen20_UserSettings } from './screens/user/Screen20_UserSettings';

// Auth Screens (21-24)
import { Screen21_AuthLogin } from './screens/auth/Screen21_AuthLogin';
import { Screen22_AuthRegister } from './screens/auth/Screen22_AuthRegister';
import { Screen23_AuthForgotPassword } from './screens/auth/Screen23_AuthForgotPassword';
import { Screen24_AuthResetPassword } from './screens/auth/Screen24_AuthResetPassword';

// Admin Screens (25-35)
import { Screen25_AdminDashboard } from './screens/admin/Screen25_AdminDashboard';
import { Screen26_AdminManageStandards } from './screens/admin/Screen26_AdminManageStandards';
import { Screen27_AdminAddEditStandard } from './screens/admin/Screen27_AdminAddEditStandard';
import { Screen28_AdminProductCategories } from './screens/admin/Screen28_AdminProductCategories';
import { Screen29_AdminComplianceRules } from './screens/admin/Screen29_AdminComplianceRules';
import { Screen30_AdminTestingLabs } from './screens/admin/Screen30_AdminTestingLabs';
import { Screen31_AdminUserManagement } from './screens/admin/Screen31_AdminUserManagement';
import { Screen32_AdminRAGKnowledgeBase } from './screens/admin/Screen32_AdminRAGKnowledgeBase';
import { Screen33_AdminDocumentManagement } from './screens/admin/Screen33_AdminDocumentManagement';
import { Screen34_AdminSystemLogs } from './screens/admin/Screen34_AdminSystemLogs';
import { Screen35_AdminSettings } from './screens/admin/Screen35_AdminSettings';

/**
 * ScrollToTop helper on route change
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

/**
 * Access Control Gate for Registered User Routes (/user/*)
 */
const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userRole } = useApp();
  const location = useLocation();

  if (userRole === 'guest') {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

/**
 * Access Control Gate for Admin Routes (/admin/*)
 */
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userRole } = useApp();
  const location = useLocation();

  if (userRole === 'guest') {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  if (userRole !== 'admin') {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <>{children}</>;
};

/**
 * Public Layout Wrapper (Header + Content + Footer)
 */
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * Auth Layout Wrapper
 */
const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Outlet />
    </div>
  );
};

/**
 * User Portal Layout (Sidebar + Top Bar + Responsive Content)
 */
const UserLayout: React.FC = () => {
  const { setIsMobileSidebarOpen } = useApp();
  const location = useLocation();

  // Extract readable title from path
  const pathPart = location.pathname.split('/')[2] || 'dashboard';
  const screenTitle = pathPart.replace(/-/g, ' ');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* User Sidebar Drawer & Desktop Panel */}
        <UserSidebar />

        {/* Content Shell */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar with Mobile Hamburger Toggle */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-1.5 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">Workspace</span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span className="capitalize font-medium text-slate-600">{screenTitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden sm:inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Regulatory DB:</span>
                <strong className="text-emerald-700">Online</strong>
              </span>
            </div>
          </header>

          {/* Main Route Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

/**
 * Admin Portal Layout (Sidebar + Top Bar + Responsive Content)
 */
const AdminLayout: React.FC = () => {
  const { setIsMobileSidebarOpen } = useApp();
  const location = useLocation();

  // Extract readable title from path
  const pathPart = location.pathname.split('/')[2] || 'dashboard';
  const screenTitle = pathPart.replace(/-/g, ' ');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Sidebar Drawer & Desktop Panel */}
        <AdminSidebar />

        {/* Content Shell */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar with Mobile Hamburger Toggle */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-1.5 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Open admin navigation sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-amber-700">Admin Console</span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span className="capitalize font-medium text-slate-600">{screenTitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded font-semibold text-[11px] inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Administrative Privilege</span>
              </span>
            </div>
          </header>

          {/* Main Route Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

/**
 * Core Application Router with All 35 Screens Mapped to Dedicated URLs
 */
const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Universal Screen Review Bar */}
      <TopScreenNavigator />

      {/* Guest Login Modal for Gated Features */}
      <GuestLoginModal />

      <ScrollToTop />

      <Routes>
        {/* 1. Public / Guest Routes (Screens 1 - 7) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Screen01_PublicLanding />} />
          <Route path="/standards" element={<Screen02_PublicStandardsExplorer />} />
          <Route path="/standards/:id" element={<Screen03_PublicStandardDetail />} />
          <Route path="/compliance-checker" element={<Screen04_PublicComplianceChecker />} />
          <Route path="/verify-licence" element={<Screen05_PublicLicenceVerification />} />
          <Route path="/laboratories" element={<Screen06_PublicLabFinder />} />
          <Route path="/laboratories/:id" element={<Screen07_PublicLabDetail />} />
        </Route>

        {/* 2. Authentication Routes (Screens 21 - 24) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Screen21_AuthLogin />} />
          <Route path="/register" element={<Screen22_AuthRegister />} />
          <Route path="/forgot-password" element={<Screen23_AuthForgotPassword />} />
          <Route path="/reset-password" element={<Screen24_AuthResetPassword />} />
        </Route>

        {/* 3. Registered User Routes (Screens 8 - 20) */}
        <Route
          path="/user"
          element={
            <ProtectedUserRoute>
              <UserLayout />
            </ProtectedUserRoute>
          }
        >
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<Screen08_UserDashboard />} />
          <Route path="ai-assistant" element={<Screen09_UserAIAssistant />} />
          <Route path="standards" element={<Screen10_UserStandardsExplorer />} />
          <Route path="standards/:id" element={<Screen11_UserStandardDetail />} />
          <Route path="compliance" element={<Screen12_UserComplianceWizard />} />
          <Route path="compliance/:id/results" element={<Screen13_UserComplianceResults />} />
          <Route path="compliance/results" element={<Screen13_UserComplianceResults />} />
          <Route path="pdf-analysis" element={<Screen14_UserPDFAnalysis />} />
          <Route path="licence-verification" element={<Screen15_UserLicenceVerification />} />
          <Route path="laboratories" element={<Screen16_UserLabFinder />} />
          <Route path="laboratories/:id" element={<Screen17_UserLabDetail />} />
          <Route path="reports" element={<Screen18_UserReportsHistory />} />
          <Route path="profile" element={<Screen19_UserProfile />} />
          <Route path="settings" element={<Screen20_UserSettings />} />
        </Route>

        {/* 4. Administrator Routes (Screens 25 - 35) */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Screen25_AdminDashboard />} />
          <Route path="standards" element={<Screen26_AdminManageStandards />} />
          <Route path="standards/create" element={<Screen27_AdminAddEditStandard />} />
          <Route path="standards/:id/edit" element={<Screen27_AdminAddEditStandard />} />
          <Route path="categories" element={<Screen28_AdminProductCategories />} />
          <Route path="compliance-rules" element={<Screen29_AdminComplianceRules />} />
          <Route path="laboratories" element={<Screen30_AdminTestingLabs />} />
          <Route path="users" element={<Screen31_AdminUserManagement />} />
          <Route path="knowledge-base" element={<Screen32_AdminRAGKnowledgeBase />} />
          <Route path="documents" element={<Screen33_AdminDocumentManagement />} />
          <Route path="system-logs" element={<Screen34_AdminSystemLogs />} />
          <Route path="settings" element={<Screen35_AdminSettings />} />
        </Route>

        {/* 5. Catch-All Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
