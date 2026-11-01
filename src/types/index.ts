export type UserRole = 'guest' | 'user' | 'admin';

export type ScreenId =
  // Public (1-7)
  | 'public-landing'
  | 'public-standards-explorer'
  | 'public-standard-detail'
  | 'public-compliance-checker'
  | 'public-licence-verification'
  | 'public-lab-finder'
  | 'public-lab-detail'
  // User (8-20)
  | 'user-dashboard'
  | 'user-ai-assistant'
  | 'user-standards-explorer'
  | 'user-standard-detail'
  | 'user-compliance-wizard'
  | 'user-compliance-results'
  | 'user-pdf-analysis'
  | 'user-licence-verification'
  | 'user-lab-finder'
  | 'user-lab-detail'
  | 'user-reports-history'
  | 'user-profile'
  | 'user-settings'
  // Auth (21-24)
  | 'auth-login'
  | 'auth-register'
  | 'auth-forgot-password'
  | 'auth-reset-password'
  // Admin (25-35)
  | 'admin-dashboard'
  | 'admin-manage-standards'
  | 'admin-add-edit-standard'
  | 'admin-product-categories'
  | 'admin-compliance-rules'
  | 'admin-testing-labs'
  | 'admin-user-management'
  | 'admin-rag-knowledge-base'
  | 'admin-document-management'
  | 'admin-system-logs'
  | 'admin-settings';

export interface BISStandard {
  id: string;
  isNumber: string;
  title: string;
  editionYear: number;
  productCategory: string;
  scheme: 'ISI Mark (Scheme-I)' | 'CRS (Scheme-II)' | 'FMCS' | 'Voluntary';
  qcoStatus: 'Mandatory' | 'Voluntary' | 'Draft QCO';
  qcoOrderNumber?: string;
  qcoEffectiveDate?: string;
  ministry?: 'MeitY' | 'DPIIT' | 'Ministry of Power' | 'Heavy Industries';
  overview: string;
  scope: string;
  applicability: string[];
  keyClauses: {
    clauseNumber: string;
    title: string;
    description: string;
    isMandatoryTest: boolean;
  }[];
  officialBisUrl: string;
  pdfReferenceUrl?: string;
  testingParameters: string[];
  sampleFeeEstimate: {
    testingFeeRange: string;
    markingFee: string;
    msmeDiscountPercent: number;
  };
}

export interface TestingLab {
  id: string;
  name: string;
  type: 'Govt. / PSU' | 'Private NABL' | 'BIS Central Lab' | 'Autonomous Research Institute';
  accreditation: 'NABL Accredited' | 'BIS Recognized' | 'ILAC-MRA' | 'Both NABL & BIS';
  nablCertificateNo: string;
  validUntil: string;
  city: string;
  state: string;
  address: string;
  pinCode: string;
  supportedStandards: string[];
  productCategories: string[];
  contactPerson: string;
  email: string;
  phone: string;
  turnaroundDays: string;
  facilitiesAvailable: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LicenceVerificationResult {
  queryNumber: string;
  type: 'ISI' | 'CRS';
  status: 'Valid' | 'Expired' | 'Invalid' | 'Suspended';
  licenseeName: string;
  factoryAddress: string;
  applicableStandard: string;
  productDescription: string;
  brandName: string;
  validFrom: string;
  validTo: string;
  issuingBranch: string;
  lastSurveillanceDate?: string;
}

export interface ComplianceAssessment {
  id: string;
  productName: string;
  category: string;
  productSpecs: {
    inputVoltage?: string;
    powerRating?: string;
    batteryType?: string;
    wirelessCapability?: boolean;
    intendedUse?: string;
  };
  applicableStandards: string[];
  scheme: string;
  qcoStatus: string;
  mandatoryClauses: string[];
  documentationChecklist: string[];
  testingRequirements: string[];
  roadmapSteps: {
    step: number;
    title: string;
    duration: string;
    description: string;
  }[];
  msmeConcessions: {
    eligible: boolean;
    testingFeeSubsidy: string;
    markingFeeRebate: string;
    zedSchemeBonus: string;
  };
  createdAt: string;
  savedByUserId?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: {
    standardNumber: string;
    clauseNumber: string;
    title: string;
    pageNumber?: number;
    excerpt: string;
  }[];
  retrievedDocs?: {
    docId: string;
    title: string;
    relevanceScore: number;
  }[];
}

export interface PDFAnalysisDoc {
  id: string;
  fileName: string;
  fileSize: string;
  pagesCount: number;
  uploadedAt: string;
  processingStatus: 'Completed' | 'Processing' | 'Failed';
  extractedStandards: string[];
  summary: string;
  extractedClauses: {
    clauseNumber: string;
    title: string;
    status: 'Compliant' | 'Non-Compliant' | 'Testing Required';
    notes: string;
  }[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  businessType: 'Manufacturer' | 'Importer' | 'MSME' | 'Consultant / Lab';
  udyamNumber?: string;
  phone: string;
  city: string;
  state: string;
  role: 'user' | 'admin';
  avatarInitials: string;
  registeredDate: string;
  standardsCount: number;
  assessmentsCount: number;
}

export interface AdminRAGDoc {
  id: string;
  title: string;
  isNumber: string;
  fileName: string;
  fileSize: string;
  chunksCount: number;
  embeddingModel: string;
  status: 'Indexed' | 'Embedding' | 'Queued' | 'Error';
  lastIndexed: string;
  vectorDimensions: number;
}

export interface SystemLogItem {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  event: string;
  module: 'RAG Pipeline' | 'Licence Verification' | 'AI Assistant' | 'Auth Service' | 'Standards Sync';
  userOrIp: string;
  latencyMs: number;
  details: string;
}
