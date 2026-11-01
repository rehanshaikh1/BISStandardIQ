import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplianceAssessment } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Layers,
  FileCheck,
} from 'lucide-react';

export const Screen12_UserComplianceWizard: React.FC = () => {
  const { navigate, saveNewAssessment, userProfile } = useApp();

  const [step, setStep] = useState(1);
  const [productName, setProductName] = useState('Apex Industrial 4G IoT Gateway Router');
  const [modelNumber, setModelNumber] = useState('AIG-400-IN');
  const [category, setCategory] = useState('IT Equipment');
  const [inputVoltage, setInputVoltage] = useState('12V - 24V DC (via 230V AC adapter)');
  const [powerRating, setPowerRating] = useState('25W');
  const [hasBattery, setHasBattery] = useState(true);
  const [isWireless, setIsWireless] = useState(true);
  const [hasMSME, setHasMSME] = useState(true);

  const handleComplete = () => {
    const assessment: ComplianceAssessment = {
      id: `assess-${Date.now()}`,
      productName,
      category,
      productSpecs: {
        inputVoltage,
        powerRating,
        batteryType: hasBattery ? 'Lithium-ion Backup Cell (18650 format)' : 'None',
        wirelessCapability: isWireless,
        intendedUse: 'Industrial IoT Telemetry and Remote Edge Computing',
      },
      applicableStandards: [
        'IS 13252 (Part 1):2010 (IT Equipment Safety)',
        ...(hasBattery ? ['IS 16046 (Part 2):2018 (Lithium Cells/Batteries)'] : []),
      ],
      scheme: 'CRS (Compulsory Registration Scheme - Scheme-II)',
      qcoStatus: 'Mandatory under MeitY Compulsory Registration Order',
      mandatoryClauses: [
        'Clause 1.5 - Component Conformance (AC/DC Adapter CRS certification)',
        'Clause 2.1 - Electric Shock and Energy Hazards (< 0.25 mA leakage current)',
        'Clause 4.2 - Mechanical Drop & Enclosure Impact (750mm drop test)',
        'Clause 4.5 - Thermal Rise at 55°C Ambient Operating Limits',
        'Clause 5.3 - Abnormal Short Circuit & Overload Protection',
      ],
      documentationChecklist: [
        'Complete Circuit Schematic & PCB Gerber Layouts',
        'Bill of Materials (BOM) with certified critical components list',
        'Indian Representative Authorization (if foreign manufactured)',
        'User Manual with Indian safety markings & instructions',
        'Factory ISO 9001 quality system documentation',
        'Test Request Form (TRF) pre-filled for NABL Laboratory',
      ],
      testingRequirements: [
        'Dielectric Insulation Strength at 1500V AC',
        'Earth Continuity (< 0.1 ohm)',
        'Glow-wire casing flammability test (650°C / UL94 V-0)',
        'RF Conducted & Radiated Emissions (WPC ETA Approval link)',
      ],
      roadmapSteps: [
        {
          step: 1,
          title: 'Critical Component Pre-Audit',
          duration: '3–5 Days',
          description: 'Verify adapter and battery cells possess valid CRS R-numbers.',
        },
        {
          step: 2,
          title: 'Sample Dispatch to NABL Lab (ERTL or SAMEER)',
          duration: '2–3 Days',
          description: 'Dispatch 2 production units with test firmware and technical specifications.',
        },
        {
          step: 3,
          title: 'Laboratory Testing & Test Report Issuance',
          duration: '12–15 Days',
          description: 'Lab executes safety test protocol and issues endorsed test report.',
        },
        {
          step: 4,
          title: 'BIS Portal Filing on Manakonline',
          duration: '3–5 Days',
          description: 'Submit Form-I, test report, and application fee.',
        },
        {
          step: 5,
          title: 'R-Number Registration Issuance',
          duration: '10–14 Days',
          description: 'Bureau approves file and generates unique R-number with Standard Mark.',
        },
      ],
      msmeConcessions: {
        eligible: hasMSME,
        testingFeeSubsidy: '50% Testing Fee Subsidy under MSME Testing Scheme (Govt. Lab)',
        markingFeeRebate: '₹1,000 flat portal registration',
        zedSchemeBonus: 'Eligible for ₹50,000 reimbursement under ZED Gold Certification',
      },
      createdAt: new Date().toISOString().split('T')[0],
      savedByUserId: userProfile?.id || 'usr-10029',
    };

    saveNewAssessment(assessment);
    navigate(`/user/compliance/${assessment.id}/results`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          Enterprise Compliance Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-0.5">
          Product Compliance Assessment Wizard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Guided 5-step regulatory evaluation mapping your hardware specifications to mandatory BIS schemes, NABL testing clauses, and verified MSME subsidies.
        </p>
      </div>

      {/* Stepper */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold overflow-x-auto pb-1">
          {[
            { num: 1, label: 'Product Info' },
            { num: 2, label: 'Category' },
            { num: 3, label: 'Specs & HW' },
            { num: 4, label: 'Assessment' },
            { num: 5, label: 'Roadmap & Fees' },
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div
                className={`flex items-center gap-2 shrink-0 ${
                  step >= s.num ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step >= s.num ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
              </div>
              {idx < 4 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Wizard Form Panels */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Step 1: Product Identification</h3>
            <p className="text-xs text-slate-500">
              Provide identifying information for the hardware model to be certified.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Commercial Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Model / SKU Identifier
                </label>
                <input
                  type="text"
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Next: Category Selection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Step 2: Regulatory Category</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'IT Equipment', label: 'IT & Electronic Equipment', desc: 'IS 13252 (MeitY CRS)' },
                { id: 'Batteries', label: 'Batteries & Portable Power', desc: 'IS 16046 (MeitY CRS)' },
                { id: 'Appliances', label: 'Electrical Appliances', desc: 'IS 302-2-3 / IS 1293 (ISI Scheme-I)' },
                { id: 'Lighting', label: 'LED Lighting & Luminaires', desc: 'IS 16102 / IS 15885' },
                { id: 'EV Charging', label: 'EV Charging Systems', desc: 'IS 17017 (ISI Mark Scheme-I)' },
                { id: 'Cables', label: 'Cables & Conductors', desc: 'IS 694:2010 (ISI Scheme-I)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3.5 text-left rounded-lg border transition-all ${
                    category === cat.id
                      ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold text-slate-900">{cat.label}</span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">{cat.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-xs text-slate-600 hover:text-slate-900">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Next: Hardware Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Step 3: Hardware Architecture Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operating / Input Voltage
                </label>
                <input
                  type="text"
                  value={inputVoltage}
                  onChange={(e) => setInputVoltage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Power Consumption
                </label>
                <input
                  type="text"
                  value={powerRating}
                  onChange={(e) => setPowerRating(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBattery}
                  onChange={(e) => setHasBattery(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span>Includes internal rechargeable Lithium-ion backup cell (requires IS 16046 check)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWireless}
                  onChange={(e) => setIsWireless(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span>Contains cellular / Wi-Fi / Bluetooth transceiver (requires WPC ETA check)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMSME}
                  onChange={(e) => setHasMSME(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span>Company possesses active Udyam Registration (entitles 50% lab concession)</span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-xs text-slate-600 hover:text-slate-900">
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Next: Review Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Step 4: AI Regulatory Compliance Assessment</h3>
            <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Certification Scheme: Compulsory Registration Scheme (CRS - Scheme II)</span>
              </div>
              <p>
                Mandatory under MeitY Compulsory Registration Order. Third-party testing at NABL accredited laboratory is mandatory. Factory physical audit is not required prior to grant of registration.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-700 block">Identified Mandatory Indian Standards:</span>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-blue-700 block">IS 13252 (Part 1):2010</span>
                  <span className="text-slate-600 text-[11px]">Safety of Information Technology Equipment</span>
                </div>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Mandatory QCO
                </span>
              </div>

              {hasBattery && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-blue-700 block">IS 16046 (Part 2):2018</span>
                    <span className="text-slate-600 text-[11px]">Secondary Lithium Cells &amp; Batteries</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Mandatory QCO
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button onClick={() => setStep(3)} className="text-xs text-slate-600 hover:text-slate-900">
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Next: Certification Roadmap &amp; Fees</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-[#142B4A]">Step 5: Verified Certification Roadmap &amp; MSME Concessions</h3>

            {/* MSME Subsidies */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <span className="font-bold text-sm block">Udyam MSME Subsidies Applied</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-emerald-700 block">Testing Fee Concession:</span>
                  <span className="font-bold">50% Statutory Rebate at Govt. NABL Labs</span>
                </div>
                <div>
                  <span className="text-emerald-700 block">Estimated Savings:</span>
                  <span className="font-bold">~₹22,500 Saved per sample model</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                Estimated Timeline to R-Number Grant: 25 – 35 Working Days
              </span>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Lab Testing at ERTL North / UL: 12 – 15 working days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Online Portal Filing on Manakonline: 3 – 5 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>BIS Scrutiny &amp; Registration Grant: 10 – 14 days</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button onClick={() => setStep(4)} className="text-xs text-slate-600 hover:text-slate-900">
                Back
              </button>
              <button
                onClick={handleComplete}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save Assessment &amp; View Results</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
