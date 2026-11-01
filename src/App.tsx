import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { UserSidebar } from './components/common/UserSidebar';
import { AdminSidebar } from './components/common/AdminSidebar';
import { TopScreenNavigator } from './components/common/TopScreenNavigator';
import { GuestLoginModal } from './components/common/GuestLoginModal';

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

const AppContent: React.FC = () => {
  const { currentScreen, userRole } = useApp();

  const isPublicScreen = currentScreen.startsWith('public-');
  const isUserScreen = currentScreen.startsWith('user-');
  const isAdminScreen = currentScreen.startsWith('admin-');
  const isAuthScreen = currentScreen.startsWith('auth-');

  const renderActiveScreen = () => {
    switch (currentScreen) {
      // Public Screens (1-7)
      case 'public-landing':
        return <Screen01_PublicLanding />;
      case 'public-standards-explorer':
        return <Screen02_PublicStandardsExplorer />;
      case 'public-standard-detail':
        return <Screen03_PublicStandardDetail />;
      case 'public-compliance-checker':
        return <Screen04_PublicComplianceChecker />;
      case 'public-licence-verification':
        return <Screen05_PublicLicenceVerification />;
      case 'public-lab-finder':
        return <Screen06_PublicLabFinder />;
      case 'public-lab-detail':
        return <Screen07_PublicLabDetail />;

      // User Screens (8-20)
      case 'user-dashboard':
        return <Screen08_UserDashboard />;
      case 'user-ai-assistant':
        return <Screen09_UserAIAssistant />;
      case 'user-standards-explorer':
        return <Screen10_UserStandardsExplorer />;
      case 'user-standard-detail':
        return <Screen11_UserStandardDetail />;
      case 'user-compliance-wizard':
        return <Screen12_UserComplianceWizard />;
      case 'user-compliance-results':
        return <Screen13_UserComplianceResults />;
      case 'user-pdf-analysis':
        return <Screen14_UserPDFAnalysis />;
      case 'user-licence-verification':
        return <Screen15_UserLicenceVerification />;
      case 'user-lab-finder':
        return <Screen16_UserLabFinder />;
      case 'user-lab-detail':
        return <Screen17_UserLabDetail />;
      case 'user-reports-history':
        return <Screen18_UserReportsHistory />;
      case 'user-profile':
        return <Screen19_UserProfile />;
      case 'user-settings':
        return <Screen20_UserSettings />;

      // Auth Screens (21-24)
      case 'auth-login':
        return <Screen21_AuthLogin />;
      case 'auth-register':
        return <Screen22_AuthRegister />;
      case 'auth-forgot-password':
        return <Screen23_AuthForgotPassword />;
      case 'auth-reset-password':
        return <Screen24_AuthResetPassword />;

      // Admin Screens (25-35)
      case 'admin-dashboard':
        return <Screen25_AdminDashboard />;
      case 'admin-manage-standards':
        return <Screen26_AdminManageStandards />;
      case 'admin-add-edit-standard':
        return <Screen27_AdminAddEditStandard />;
      case 'admin-product-categories':
        return <Screen28_AdminProductCategories />;
      case 'admin-compliance-rules':
        return <Screen29_AdminComplianceRules />;
      case 'admin-testing-labs':
        return <Screen30_AdminTestingLabs />;
      case 'admin-user-management':
        return <Screen31_AdminUserManagement />;
      case 'admin-rag-knowledge-base':
        return <Screen32_AdminRAGKnowledgeBase />;
      case 'admin-document-management':
        return <Screen33_AdminDocumentManagement />;
      case 'admin-system-logs':
        return <Screen34_AdminSystemLogs />;
      case 'admin-settings':
        return <Screen35_AdminSettings />;

      default:
        return <Screen01_PublicLanding />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Universal Screen Review Bar */}
      {/* <TopScreenNavigator /> */}

      {/* Guest Login Modal for Gated Features */}
      <GuestLoginModal />

      {/* Layout Routing */}
      {isPublicScreen && (
        <>
          <Header />
          <main className="flex-1">{renderActiveScreen()}</main>
          <Footer />
        </>
      )}

      {isAuthScreen && (
        <main className="flex-1">{renderActiveScreen()}</main>
      )}

      {isUserScreen && (
        <div className="flex-1 flex flex-col md:flex-row">
          <UserSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {/* User Main Top Header */}
            <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">Workspace</span>
                <span aria-hidden="true">/</span>
                <span className="capitalize">{currentScreen.replace('user-', '').replace(/-/g, ' ')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Regulatory DB: <strong className="text-emerald-700">Online</strong>
                </span>
              </div>
            </header>
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{renderActiveScreen()}</main>
          </div>
        </div>
      )}

      {isAdminScreen && (
        <div className="flex-1 flex flex-col md:flex-row">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Admin Main Top Header */}
            <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-amber-700">Admin Console</span>
                <span aria-hidden="true">/</span>
                <span className="capitalize">{currentScreen.replace('admin-', '').replace(/-/g, ' ')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded font-semibold text-[11px]">
                  Administrative Privilege
                </span>
              </div>
            </header>
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{renderActiveScreen()}</main>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
