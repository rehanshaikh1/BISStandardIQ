import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  FileSearch,
  Award,
  Zap,
  HelpCircle,
  Cpu,
  BadgeAlert,
  Layers,
} from 'lucide-react';

export const Screen01_PublicLanding: React.FC = () => {
  const { navigate, openGuestModal } = useApp();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next-Gen Regulatory Intelligence for Indian Manufacturers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#142B4A] tracking-tight leading-[1.15] text-balance">
                Navigate BIS Compliance with Intelligence.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Discover Indian Standards, simplify product compliance, verify ISI &amp; CRS licences, and connect with accredited testing laboratories with AI-powered regulatory intelligence.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => navigate('public-standards-explorer')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Explore Standards</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() =>
                    openGuestModal(
                      'Try AI Standards Assistant',
                      'Create a free account to query technical clauses, upload datasheets, and receive personalized BIS certification guidance.'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors border border-slate-200"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Try AI Assistant</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Scheme-I (ISI) &amp; Scheme-II (CRS)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>MeitY &amp; DPIIT QCO Tracked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>50% MSME Testing Subsidy Guided</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Hero Photo / Platform Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_bis_standards_1793539430782.jpg"
                  alt="BIS Compliance and Testing Laboratory in India"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NABL Accredited Testing Protocol</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    IS 13252 / IS 16046 Automated Verification
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Calibrated instrument test benches &amp; Gazette Quality Control compliance workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-xl border border-slate-200/80">
              <span className="block text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
                21,400+
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Indian Standards Catalogued
              </span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80">
              <span className="block text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
                142+
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Active QCOs Tracked
              </span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80">
              <span className="block text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
                380+
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                NABL Testing Laboratories
              </span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80">
              <span className="block text-3xl font-extrabold text-[#142B4A] font-mono tabular-nums">
                ₹18.4 Cr+
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                MSME Concessions Unlocked
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Built for Electronics &amp; Hardware Teams
          </span>
          <h2 className="text-3xl font-bold text-[#142B4A] mt-2">
            Everything Required to Certify with the Bureau of Indian Standards
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Eliminate compliance ambiguity, reduce test lab turnaround times, and prevent customs clearance rejections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => navigate('public-standards-explorer')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mb-2">
              Semantic Standards Discovery
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Search by product name, HS code, or Indian Standard (IS) number. Filter by voluntary vs mandatory Quality Control Orders.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
              <span>Search standards</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('public-compliance-checker')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mb-2">
              Automated Compliance Wizard
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Input your hardware specifications, power ratings, and intended use to automatically determine Scheme-I (ISI) vs Scheme-II (CRS) applicability.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
              <span>Run compliance check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('public-licence-verification')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mb-2">
              Real-time Licence Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Verify ISI CM/L licence numbers and CRS R-registration numbers directly against the national central BIS database for validity and expiry dates.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
              <span>Verify CM/L or R-Number</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => navigate('public-lab-finder')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mb-2">
              NABL Laboratory Network
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Locate government (ERTL, SAMEER, CPRI) and private accredited labs across India with verified testing scopes and direct contact details.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
              <span>Find testing centers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 5 */}
          <div
            onClick={() =>
              openGuestModal(
                'AI Document Intelligence',
                'Upload your internal circuit schematics and component BOM PDFs to extract mandatory testing clauses automatically.'
              )
            }
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mb-2">
              Technical Datasheet Analysis
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Upload PDF product specs up to 10 MB. Our RAG engine extracts critical parameters, creepage clearances, and fire retardance ratings.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
              <span>Analyze PDF documents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 6 */}
          <div
            onClick={() =>
              openGuestModal(
                'MSME Concession Calculator',
                'Discover 50% testing fee subsidies and annual marking fee rebates under the MSME Sambandh & ZED schemes.'
              )
            }
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A] mb-2">
              MSME Subsidy Roadmap
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Calculate exact statutory testing subsidies for Udyam registered enterprises, reducing compliance costs by up to 50% on laboratory tests.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
              <span>View MSME concessions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Step-by-Step Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142B4A] mt-2">
              From Product Conception to BIS Standard Mark
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-600 font-mono">01. Discovery</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">Identify Applicable IS</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Map your hardware product specifications to mandatory Indian Standards and check active QCO enforcement dates.
              </p>
            </div>

            <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-600 font-mono">02. Pre-Audit</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">Verify Critical Components</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirm your internal power supplies, battery cells, and cords possess valid underlying BIS registrations.
              </p>
            </div>

            <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-600 font-mono">03. Laboratory Testing</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">NABL Sample Testing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dispatch golden samples to an accredited testing center with our standardized Test Request Form (TRF).
              </p>
            </div>

            <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-blue-600 font-mono">04. Grant of Licence</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">BIS Portal Application</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit test reports to the BIS Manakonline portal for final issuance of your CM/L licence or CRS R-number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for MSMEs & Manufacturers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#142B4A] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Support for Atmanirbhar Bharat
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Designed specifically for Indian Electronics MSMEs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Navigating the Bureau of Indian Standards no longer requires high-cost liaison consultants. StandardsIQ puts authoritative regulatory intelligence, clause-level compliance checklists, and testing lab directories directly into your engineering team’s hands.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50% testing subsidy guidance for Udyam holders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Customs import HS-code to IS cross-mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Surveillance audit preparation checklists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant licence validity and counterfeit check</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('auth-register')}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
                >
                  Create Free Manufacturer Account
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-xl border border-slate-700/80 space-y-4 text-xs">
              <h4 className="font-bold text-white text-sm">Regulatory Scheme Comparison</h4>
              <div className="space-y-3">
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-400">ISI Mark (Scheme-I)</span>
                    <span className="text-[10px] text-slate-400 font-mono">DPIIT / BIS</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Requires factory pre-licence inspection, complete in-house test bench, and ongoing surveillance marking fees.
                  </p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-emerald-400">CRS (Scheme-II)</span>
                    <span className="text-[10px] text-slate-400 font-mono">MeitY / CRO</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Self-declaration of conformity based solely on third-party NABL test report. No mandatory preliminary factory visit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">FAQ</span>
            <h2 className="text-2xl font-bold text-[#142B4A] mt-2">
              Frequently Asked Compliance Questions
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Is BIS certification mandatory for all electronics in India?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Certification is mandatory for products covered under Quality Control Orders (QCOs) issued by Central Ministries such as MeitY (for IT goods like laptops, routers, and power banks) and DPIIT (for household electrical appliances, cables, and toys). Unregistered products cannot be sold, stored, or imported.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                What is the typical timeline and cost to certify under CRS?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                For CRS products, testing at an accredited NABL lab takes approximately 10 to 18 working days. Following test report submission, BIS central scrutiny typically completes in 10 to 14 days. Statutory fees are ₹1,000 for portal registration plus laboratory fees.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                How do MSMEs claim the 50% testing fee concession?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Enterprises possessing a valid Udyam Registration Certificate are entitled to a 50% concession on testing fees at Government-run MSME Testing Centres (New Delhi, Mumbai, Kolkata, Chennai) as well as fee reimbursements through the Ministry of MSME ZED scheme.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
