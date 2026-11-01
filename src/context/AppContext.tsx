import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  ScreenId,
  UserRole,
  BISStandard,
  TestingLab,
  LicenceVerificationResult,
  ComplianceAssessment,
  UserProfile,
  AdminRAGDoc,
  SystemLogItem,
  AIChatMessage,
  PDFAnalysisDoc,
} from '../types';
import {
  INITIAL_STANDARDS,
  INITIAL_TESTING_LABS,
  INITIAL_LICENCES,
  INITIAL_USER_PROFILE,
  INITIAL_RAG_DOCS,
  INITIAL_SYSTEM_LOGS,
  INITIAL_ASSESSMENTS,
} from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenId;
  userRole: UserRole;
  userProfile: UserProfile | null;
  standards: BISStandard[];
  selectedStandard: BISStandard;
  labs: TestingLab[];
  selectedLab: TestingLab;
  licences: LicenceVerificationResult[];
  savedStandardIds: string[];
  savedLabIds: string[];
  assessments: ComplianceAssessment[];
  activeAssessment: ComplianceAssessment | null;
  verificationHistory: LicenceVerificationResult[];
  ragDocs: AdminRAGDoc[];
  systemLogs: SystemLogItem[];
  chatMessages: AIChatMessage[];
  pdfDocs: PDFAnalysisDoc[];
  guestModalOpen: boolean;
  guestModalConfig: { title: string; description: string; targetScreen?: ScreenId };
  // Navigation & Actions
  navigate: (screen: ScreenId, opts?: { standardId?: string; labId?: string }) => void;
  setRole: (role: UserRole) => void;
  openGuestModal: (title?: string, description?: string, targetScreen?: ScreenId) => void;
  closeGuestModal: () => void;
  requireAuth: (targetScreen: ScreenId, featureName?: string) => boolean;
  toggleSaveStandard: (id: string) => void;
  toggleSaveLab: (id: string) => void;
  verifyLicenceNumber: (query: string, type: 'ISI' | 'CRS') => LicenceVerificationResult;
  saveNewAssessment: (assessment: ComplianceAssessment) => void;
  setActiveAssessment: (assessment: ComplianceAssessment | null) => void;
  setSelectedStandardById: (id: string) => void;
  setSelectedLabById: (id: string) => void;
  sendChatMessage: (content: string) => void;
  clearChat: () => void;
  uploadPDFAnalysis: (file: { name: string; size: number }) => PDFAnalysisDoc;
  // Admin actions
  adminAddStandard: (std: BISStandard) => void;
  adminUpdateStandard: (std: BISStandard) => void;
  adminDeleteStandard: (id: string) => void;
  adminAddLab: (lab: TestingLab) => void;
  adminUpdateLab: (lab: TestingLab) => void;
  adminDeleteLab: (id: string) => void;
  adminTriggerReindex: (docId: string) => void;
  adminAddRAGDoc: (doc: AdminRAGDoc) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('public-landing');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [standards, setStandards] = useState<BISStandard[]>(INITIAL_STANDARDS);
  const [selectedStandardId, setSelectedStandardId] = useState<string>(INITIAL_STANDARDS[0].id);

  const [labs, setLabs] = useState<TestingLab[]>(INITIAL_TESTING_LABS);
  const [selectedLabId, setSelectedLabId] = useState<string>(INITIAL_TESTING_LABS[0].id);

  const [licences, setLicences] = useState<LicenceVerificationResult[]>(INITIAL_LICENCES);
  const [savedStandardIds, setSavedStandardIds] = useState<string[]>(['is-13252-1', 'is-16046-2']);
  const [savedLabIds, setSavedLabIds] = useState<string[]>(['lab-ertl-north', 'lab-ul-bangalore']);

  const [assessments, setAssessments] = useState<ComplianceAssessment[]>(INITIAL_ASSESSMENTS);
  const [activeAssessment, setActiveAssessment] = useState<ComplianceAssessment | null>(INITIAL_ASSESSMENTS[0]);

  const [verificationHistory, setVerificationHistory] = useState<LicenceVerificationResult[]>([
    INITIAL_LICENCES[0],
    INITIAL_LICENCES[2],
  ]);

  const [ragDocs, setRagDocs] = useState<AdminRAGDoc[]>(INITIAL_RAG_DOCS);
  const [systemLogs, setSystemLogs] = useState<SystemLogItem[]>(INITIAL_SYSTEM_LOGS);

  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestModalConfig, setGuestModalConfig] = useState<{
    title: string;
    description: string;
    targetScreen?: ScreenId;
  }>({
    title: 'Unlock the Full Power of StandardsIQ',
    description: 'Create a free account to access AI-powered compliance guidance, analyse your documents and save your compliance reports.',
  });

  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      content:
        'Namaste! I am your **BIS StandardsIQ Regulatory Intelligence Assistant**.\n\nYou can ask me about Indian Standards (IS), mandatory Quality Control Orders (QCOs), testing protocols under NABL accreditation, or the differences between ISI Mark (Scheme-I) and CRS (Scheme-II).\n\nWhat product or standard would you like to explore today?',
      timestamp: '10:00 AM',
    },
  ]);

  const [pdfDocs, setPdfDocs] = useState<PDFAnalysisDoc[]>([
    {
      id: 'pdf-doc-1',
      fileName: 'ApexRouter_Technical_Datasheet_v2.pdf',
      fileSize: '3.4 MB',
      pagesCount: 18,
      uploadedAt: '2026-10-31 16:45',
      processingStatus: 'Completed',
      extractedStandards: ['IS 13252 (Part 1):2010', 'IS 16333 (Part 3):2022'],
      summary:
        'The technical specification document details the circuit layout, power adapter ratings (12V 1.5A DC), external casing flammability rating (UL94 V-0), and internal Wi-Fi antennas for the model AeroLink AC1200. Identified mandatory requirements under IS 13252 Clause 1.5 and Clause 2.1.',
      extractedClauses: [
        {
          clauseNumber: 'Clause 1.5',
          title: 'Components Compliance',
          status: 'Compliant',
          notes: 'Power adapter carries valid CRS R-number R-41002918.',
        },
        {
          clauseNumber: 'Clause 2.1',
          title: 'Electric Shock Protection',
          status: 'Compliant',
          notes: 'Creepage distance 4.2mm verified on PCB Gerber layer.',
        },
        {
          clauseNumber: 'Clause 4.2',
          title: 'Mechanical Drop Test (750mm)',
          status: 'Testing Required',
          notes: 'Must be verified physically at accredited NABL laboratory.',
        },
      ],
    },
  ]);

  const selectedStandard =
    standards.find((s) => s.id === selectedStandardId) || standards[0];
  const selectedLab = labs.find((l) => l.id === selectedLabId) || labs[0];

  const navigate = (screen: ScreenId, opts?: { standardId?: string; labId?: string }) => {
    if (opts?.standardId) setSelectedStandardId(opts.standardId);
    if (opts?.labId) setSelectedLabId(opts.labId);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'guest') {
      setUserProfile(null);
      if (currentScreen.startsWith('user-') || currentScreen.startsWith('admin-')) {
        setCurrentScreen('public-landing');
      }
    } else if (role === 'user') {
      setUserProfile(INITIAL_USER_PROFILE);
      if (currentScreen.startsWith('admin-')) {
        setCurrentScreen('user-dashboard');
      }
    } else if (role === 'admin') {
      setUserProfile({
        ...INITIAL_USER_PROFILE,
        fullName: 'Admin Director (BIS Operations)',
        email: 'admin.director@standardsiq.gov.in',
        role: 'admin',
        businessType: 'Consultant / Lab',
      });
      if (currentScreen.startsWith('public-') || currentScreen.startsWith('user-')) {
        setCurrentScreen('admin-dashboard');
      }
    }
  };

  const openGuestModal = (
    title = 'Unlock the Full Power of StandardsIQ',
    description = 'Create a free account to access AI-powered compliance guidance, analyse your documents and save your compliance reports.',
    targetScreen?: ScreenId
  ) => {
    setGuestModalConfig({ title, description, targetScreen });
    setGuestModalOpen(true);
  };

  const closeGuestModal = () => setGuestModalOpen(false);

  const requireAuth = (targetScreen: ScreenId, featureName = 'this feature'): boolean => {
    if (userRole === 'guest') {
      openGuestModal(
        'Unlock the Full Power of StandardsIQ',
        `Create a free account or log in to access ${featureName}, download personalized compliance audits, and unlock deep AI analysis.`,
        targetScreen
      );
      return false;
    }
    navigate(targetScreen);
    return true;
  };

  const toggleSaveStandard = (id: string) => {
    if (userRole === 'guest') {
      openGuestModal('Save Standards to Your Workspace', 'Create a free account to save standards, track regulatory updates, and bookmark important clauses.');
      return;
    }
    setSavedStandardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSaveLab = (id: string) => {
    if (userRole === 'guest') {
      openGuestModal('Save Accredited Laboratories', 'Create an account to bookmark NABL test labs and request direct fee quotations.');
      return;
    }
    setSavedLabIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const verifyLicenceNumber = (query: string, type: 'ISI' | 'CRS'): LicenceVerificationResult => {
    const cleanQuery = query.trim().toUpperCase();
    const existing = licences.find(
      (l) => l.queryNumber.toUpperCase() === cleanQuery && l.type === type
    );

    let result: LicenceVerificationResult;
    if (existing) {
      result = existing;
    } else {
      // Generate synthetic verification response if format looks plausible
      const isCM = cleanQuery.startsWith('CM/L-') || /^\d{7}$/.test(cleanQuery);
      const isR = cleanQuery.startsWith('R-') || /^41\d{6}$/.test(cleanQuery);

      if (type === 'ISI' && isCM) {
        result = {
          queryNumber: cleanQuery.startsWith('CM/L-') ? cleanQuery : `CM/L-${cleanQuery}`,
          type: 'ISI',
          status: 'Valid',
          licenseeName: 'Bharat Electronics Components LLP',
          factoryAddress: 'Sector 63, Phase III, Industrial Area, Noida, UP 201301',
          applicableStandard: 'IS 302-2-3:2007 (Electrical Appliances Safety)',
          productDescription: 'Electrical Heating Elements and Thermostats',
          brandName: 'BHARAT SAFE',
          validFrom: '2023-04-01',
          validTo: '2027-03-31',
          issuingBranch: 'BIS Regional Office Delhi-II',
          lastSurveillanceDate: '2026-07-14',
        };
      } else if (type === 'CRS' && isR) {
        result = {
          queryNumber: cleanQuery.startsWith('R-') ? cleanQuery : `R-${cleanQuery}`,
          type: 'CRS',
          status: 'Valid',
          licenseeName: 'InnoTech Hardware Pvt Ltd',
          factoryAddress: 'Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka 560100',
          applicableStandard: 'IS 13252 (Part 1):2010 (IT Equipment)',
          productDescription: 'Smart Wi-Fi IoT Gateway Router',
          brandName: 'INNOTECH IOT',
          validFrom: '2024-01-10',
          validTo: '2027-01-09',
          issuingBranch: 'Central Registration Department (CRS Portal)',
          lastSurveillanceDate: '2026-05-19',
        };
      } else {
        result = {
          queryNumber: cleanQuery,
          type,
          status: 'Invalid',
          licenseeName: 'No match in National BIS Database',
          factoryAddress: 'N/A',
          applicableStandard: 'Record Not Found',
          productDescription: `No active license or registration matches query "${cleanQuery}" on BIS manakonline portal.`,
          brandName: 'N/A',
          validFrom: '-',
          validTo: '-',
          issuingBranch: 'N/A',
        };
      }
    }

    setVerificationHistory((prev) => [result, ...prev.filter((p) => p.queryNumber !== result.queryNumber)]);
    return result;
  };

  const saveNewAssessment = (assessment: ComplianceAssessment) => {
    setAssessments((prev) => [assessment, ...prev]);
    setActiveAssessment(assessment);
  };

  const setSelectedStandardById = (id: string) => {
    setSelectedStandardId(id);
  };

  const setSelectedLabById = (id: string) => {
    setSelectedLabId(id);
  };

  const sendChatMessage = (content: string) => {
    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Generate intelligent AI response based on Indian BIS domain
    setTimeout(() => {
      let replyContent = '';
      let citations: AIChatMessage['citations'] = [];
      const lower = content.toLowerCase();

      if (lower.includes('router') || lower.includes('wi-fi') || lower.includes('wifi') || lower.includes('13252')) {
        replyContent = `### Applicable BIS Standard for Wi-Fi Routers\n\nWi-Fi Routers and Network Switches are classified as Information Technology Equipment and fall under the **Compulsory Registration Scheme (CRS - Scheme II)** regulated by the Ministry of Electronics and Information Technology (MeitY).\n\n#### 1. Primary Standard:\n- **IS 13252 (Part 1):2010**: *Information Technology Equipment – Safety – General Requirements* (equivalent to IEC 60950-1).\n\n#### 2. Key Testing Clauses Required:\n1. **Clause 1.5 – Component Approval**: External AC/DC power adapters must possess separate valid CRS registrations.\n2. **Clause 2.1 – Electric Shock Hazards**: Clearance ($\ge 2.5\\text{ mm}$) and creepage ($\ge 4.0\\text{ mm}$) on mains PCB traces.\n3. **Clause 4.2 – Mechanical Strength**: Drop test from 750 mm onto hardwood surface without exposing internal electronics.\n4. **Clause 4.5 – Thermal Rise**: Continuous full-load temperature logging of CPU heatsink, transformers, and plastic enclosure.\n\n#### 3. WPC ETA Dual Requirement:\nBecause Wi-Fi operates in 2.4 GHz / 5.8 GHz unlicensed spectrum bands, you also need an **ETA (Equipment Type Approval)** from the Wireless Planning & Coordination (WPC) wing of DoT India.\n\n#### 4. Certification Roadmap:\n1. Prepare sample with test software & factory power adapter.\n2. Submit to NABL-accredited test lab (e.g., ERTL North or UL Bangalore).\n3. Obtain test report within ~15 working days.\n4. Apply online on BIS manakonline CRS portal for **R-Number grant**.`;
        citations = [
          {
            standardNumber: 'IS 13252 (Part 1):2010',
            clauseNumber: 'Clause 2.1.4',
            title: 'Creepage Distances and Clearances',
            pageNumber: 34,
            excerpt: 'Clearance and creepage distances between primary circuits and accessible parts shall withstand dielectric test voltages without arc discharge.',
          },
          {
            standardNumber: 'MeitY CRO Phase I',
            clauseNumber: 'Order S.O. 2357(E)',
            title: 'Compulsory Registration Order for IT Goods',
            excerpt: 'No person shall manufacture or store for sale, import, sell or distribute goods specified in the Schedule without BIS registration.',
          },
        ];
      } else if (lower.includes('battery') || lower.includes('lithium') || lower.includes('16046') || lower.includes('power bank')) {
        replyContent = `### BIS Certification Requirements for Lithium Batteries\n\nPortable secondary lithium cells and battery packs are strictly regulated under **IS 16046 (Part 2):2018** under the **Compulsory Registration Scheme (CRS)**.\n\n#### Mandatory Classification:\n- **Coin/Cylindrical/Pouch Cells**: Must be tested individually (IS 16046 Part 2:2018).\n- **Battery Packs with BMS**: The entire pack assembly requires independent registration.\n\n#### Essential Safety Tests (Annexure):**\n1. **External Short Circuit (Clause 7.3.2)** at 20°C and 55°C ambient.\n2. **Free Fall Drop Test (Clause 7.3.3)** from 1 meter height.\n3. **Crush Test (Clause 7.3.6)** with hydraulic force up to 13 kN.\n4. **Overcharge Test (Clause 7.3.8)**: Safety protection circuit shut-off verification.\n5. **Thermal Abuse (Clause 7.3.5)**: 130°C temperature chamber for 10 minutes.\n\n#### MSME Testing Grant:\nRegistered MSMEs can avail a **50% concession on testing fees** through MSME Testing Centres or the ZED reimbursement program.`;
        citations = [
          {
            standardNumber: 'IS 16046 (Part 2):2018',
            clauseNumber: 'Clause 7.3.2',
            title: 'External Short-Circuit Test for Portable Lithium Systems',
            pageNumber: 22,
            excerpt: 'The cell or battery shall not catch fire or explode during or within 24 hours after short-circuit test at maximum operating temperature.',
          },
        ];
      } else if (lower.includes('ev') || lower.includes('charger') || lower.includes('17017')) {
        replyContent = `### EV Charger Certification under BIS\n\nElectric Vehicle Supply Equipment (EVSE) AC conductive chargers are governed by **IS 17017 (Part 1):2018** under the **ISI Mark (Scheme-I)** certification framework.\n\n#### Essential Compliance Checkpoints:\n- **Earth Leakage Protection (Clause 6.4)**: Integrated Type B RCD or 30mA Type A + 6mA DC residual sensor.\n- **Control Pilot PWM Protocol (Clause 10.2)**: Strict adherence to Annex A resistor ladders for states A (standby), B (connected), C (charging), and D (ventilation).\n- **Outdoor Enclosure**: IP54 minimum for sheltered wallbox, IP65 for unshaded public chargers.\n- **Cable Roll-over Test**: 5,000 N crushing resistance test over charging nozzle and heavy-duty 3-core cable.`;
        citations = [
          {
            standardNumber: 'IS 17017 (Part 1):2018',
            clauseNumber: 'Clause 6.4.1',
            title: 'Residual Current Device (RCD) Specifications',
            pageNumber: 16,
            excerpt: 'Each EV socket-outlet or connector shall be protected by an individual RCD of at least Type A with 6mA smooth DC detection.',
          },
        ];
      } else {
        replyContent = `### Regulatory Intelligence Analysis for "${content}"\n\nBased on your query against the Bureau of Indian Standards (BIS) e-Standard Repository and Gazette Notifications:\n\n1. **Standard Assessment**: Products falling into this category must be checked against Quality Control Orders (QCOs) issued by the relevant Ministry (MeitY for electronics/IT, DPIIT for electrical machinery and consumer durables, Ministry of Power for cables and transformers).\n\n2. **Certification Scheme Route**:\n   - **CRS (Scheme-II)**: Self-declaration of conformity based on laboratory test reports. Factory audit is **not** required prior to licence issuance.\n   - **ISI Mark (Scheme-I)**: Requires factory quality audit, on-site testing equipment verification, and ongoing surveillance marking fees.\n\n3. **Recommended Next Steps**:\n   - Use our **Compliance Wizard** to map your specific product specifications.\n   - Check our **Laboratory Finder** for accredited test centers with verified NABL scopes.`;
        citations = [
          {
            standardNumber: 'BIS Act 2016',
            clauseNumber: 'Section 16',
            title: 'Central Government Power to Direct Compulsory Conformity',
            pageNumber: 8,
            excerpt: 'The Central Government may direct in relation to any article or process of any scheduled industry that it shall conform to the Indian Standard.',
          },
        ];
      }

      const assistantMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
        retrievedDocs: [
          { docId: 'rag-1', title: 'IS 13252 IT Equipment Safety Code', relevanceScore: 0.94 },
          { docId: 'rag-2', title: 'MeitY CRS Electronics Regulatory Order', relevanceScore: 0.88 },
        ],
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: 'Conversation cleared. How can I assist you with BIS standards, QCO mandates, or testing guidelines?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const uploadPDFAnalysis = (file: { name: string; size: number }): PDFAnalysisDoc => {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    const newDoc: PDFAnalysisDoc = {
      id: `pdf-${Date.now()}`,
      fileName: file.name,
      fileSize: `${sizeMb} MB`,
      pagesCount: Math.floor(Math.random() * 15) + 6,
      uploadedAt: new Date().toLocaleString(),
      processingStatus: 'Completed',
      extractedStandards: ['IS 13252 (Part 1):2010', 'IS 16046 (Part 2):2018'],
      summary: `Automated RAG parsing extracted technical parameters, component specifications, and insulation clearances from "${file.name}". Verified against BIS database and identified 4 mandatory testing clauses.`,
      extractedClauses: [
        {
          clauseNumber: 'Clause 1.5',
          title: 'Components Conformance',
          status: 'Compliant',
          notes: 'Component list indicates safety critical parts with test certificates.',
        },
        {
          clauseNumber: 'Clause 2.1.2',
          title: 'Dielectric Insulation Resistance',
          status: 'Testing Required',
          notes: 'High-voltage hi-pot test must be conducted at accredited laboratory.',
        },
        {
          clauseNumber: 'Clause 4.5',
          title: 'Thermal Limits',
          status: 'Compliant',
          notes: 'Maximum specified operating temperature is 45°C, below threshold.',
        },
      ],
    };
    setPdfDocs((prev) => [newDoc, ...prev]);
    return newDoc;
  };

  // Admin actions
  const adminAddStandard = (std: BISStandard) => {
    setStandards((prev) => [std, ...prev]);
    setSystemLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        level: 'INFO',
        event: `Standard added: ${std.isNumber}`,
        module: 'Standards Sync',
        userOrIp: userProfile?.email || 'admin',
        latencyMs: 45,
        details: `Created record for ${std.title} under ${std.scheme}`,
      },
      ...prev,
    ]);
  };

  const adminUpdateStandard = (std: BISStandard) => {
    setStandards((prev) => prev.map((s) => (s.id === std.id ? std : s)));
  };

  const adminDeleteStandard = (id: string) => {
    setStandards((prev) => prev.filter((s) => s.id !== id));
  };

  const adminAddLab = (lab: TestingLab) => {
    setLabs((prev) => [lab, ...prev]);
  };

  const adminUpdateLab = (lab: TestingLab) => {
    setLabs((prev) => prev.map((l) => (l.id === lab.id ? lab : l)));
  };

  const adminDeleteLab = (id: string) => {
    setLabs((prev) => prev.filter((l) => l.id !== id));
  };

  const adminTriggerReindex = (docId: string) => {
    setRagDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'Embedding' } : d))
    );
    setTimeout(() => {
      setRagDocs((prev) =>
        prev.map((d) =>
          d.id === docId
            ? { ...d, status: 'Indexed', lastIndexed: new Date().toISOString().replace('T', ' ').slice(0, 16) }
            : d
        )
      );
    }, 1500);
  };

  const adminAddRAGDoc = (doc: AdminRAGDoc) => {
    setRagDocs((prev) => [doc, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        userRole,
        userProfile,
        standards,
        selectedStandard,
        labs,
        selectedLab,
        licences,
        savedStandardIds,
        savedLabIds,
        assessments,
        activeAssessment,
        verificationHistory,
        ragDocs,
        systemLogs,
        chatMessages,
        pdfDocs,
        guestModalOpen,
        guestModalConfig,
        navigate,
        setRole,
        openGuestModal,
        closeGuestModal,
        requireAuth,
        toggleSaveStandard,
        toggleSaveLab,
        verifyLicenceNumber,
        saveNewAssessment,
        setActiveAssessment,
        setSelectedStandardById,
        setSelectedLabById,
        sendChatMessage,
        clearChat,
        uploadPDFAnalysis,
        adminAddStandard,
        adminUpdateStandard,
        adminDeleteStandard,
        adminAddLab,
        adminUpdateLab,
        adminDeleteLab,
        adminTriggerReindex,
        adminAddRAGDoc,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
