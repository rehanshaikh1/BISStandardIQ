import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const Screen04_PublicComplianceChecker: React.FC = () => {
  const { navigate, openGuestModal } = useApp();

  const [step, setStep] = useState(1);
  const [productName, setProductName] = useState('Smart Wi-Fi Mesh Access Point');
  const [category, setCategory] = useState('IT Equipment');
  const [inputVoltage, setInputVoltage] = useState('12V DC via 230V AC Adapter');
  const [powerRating, setPowerRating] = useState('18W');
  const [hasBattery, setHasBattery] = useState(false);
  const [isWireless, setIsWireless] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
    setIsGenerated(true);
  };

  const handleReset = () => {
    setStep(1);
    setIsGenerated(false);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Regulatory Assessment</span>
            <span aria-hidden="true">/</span>
            <span className="text-blue-600 font-medium">Public Compliance Checker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
            Product Compliance Checker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Instant guest assessment to discover applicable Indian Standards, certification scheme, and mandatory testing protocols.
          </p>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                1
              </span>
              <span>Product Info</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                2
              </span>
              <span>Category</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                3
              </span>
              <span>Specifications</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <div className={`flex items-center gap-2 ${step === 4 ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                4
              </span>
              <span>Assessment</span>
            </div>
          </div>
        </div>

        {/* Steps Content */}
        {!isGenerated ? (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#142B4A]">Step 1: What product are you manufacturing or importing?</h3>
                <p className="text-xs text-slate-500">
                  Enter the commercial or engineering trade name of your hardware device.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Dual-Band Wi-Fi 6 Router, Smart LED Driver, Li-ion Pack"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <span>Next: Select Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#142B4A]">Step 2: Select the product category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'IT Equipment', label: 'IT & Electronic Equipment', desc: 'Computers, Routers, POS, Servers, Adapters' },
                    { id: 'Batteries', label: 'Batteries & Portable Power', desc: 'Lithium-ion cells, Power banks, Battery packs' },
                    { id: 'Appliances', label: 'Household Electrical Appliances', desc: 'Electric irons, Immersion heaters, Plugs & sockets' },
                    { id: 'Lighting', label: 'Lighting & Luminaires', desc: 'LED bulbs, LED drivers, Controlgear' },
                    { id: 'EV Charging', label: 'EV Charging Systems', desc: 'AC Wallbox, Mode 2 chargers, EV connectors' },
                    { id: 'Cables', label: 'Cables & Conductors', desc: 'PVC building wires, Flexible cords' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3.5 text-left rounded-lg border transition-all ${
                        category === cat.id
                          ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-900">{cat.label}</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">{cat.desc}</span>
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <span>Next: Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#142B4A]">Step 3: Basic Electrical &amp; Operational Specs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rated Input Voltage</label>
                    <input
                      type="text"
                      value={inputVoltage}
                      onChange={(e) => setInputVoltage(e.target.value)}
                      placeholder="e.g. 230V AC or 12V DC"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Power Rating / Capacity</label>
                    <input
                      type="text"
                      value={powerRating}
                      onChange={(e) => setPowerRating(e.target.value)}
                      placeholder="e.g. 15W or 5000 mAh"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBattery}
                      onChange={(e) => setHasBattery(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Contains internal rechargeable Lithium-ion / Li-polymer battery</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isWireless}
                      onChange={(e) => setIsWireless(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Equipped with wireless Wi-Fi, Bluetooth, or RF transceiver</span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Compliance Assessment</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Step 4: Compliance Assessment Results */
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                    Assessment Result
                  </span>
                  <h3 className="text-xl font-bold text-[#142B4A] mt-0.5">{productName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>Category: {category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Rating: {powerRating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Start New Check</span>
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-blue-900 block text-sm">
                    Mandatory Registration Required under MeitY CRO Phase I
                  </span>
                  <p className="text-blue-800 mt-0.5 leading-relaxed">
                    This hardware category cannot be sold or cleared through Indian Customs without a valid BIS Registration Number (R-Number).
                  </p>
                </div>
              </div>

              {/* Assessment Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-500 block">Primary Applicable Standard</span>
                  <span className="font-mono font-bold text-sm text-blue-700 block">
                    IS 13252 (Part 1):2010
                  </span>
                  <p className="text-slate-600">
                    Safety of Information Technology Equipment – General Requirements (IEC 60950-1).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-500 block">Applicable Certification Scheme</span>
                  <span className="font-bold text-sm text-slate-900 block">
                    Compulsory Registration Scheme (CRS - Scheme II)
                  </span>
                  <p className="text-slate-600">
                    Self-declaration of conformity based on testing report from NABL accredited laboratory.
                  </p>
                </div>
              </div>

              {/* Key Requirements Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Technical &amp; Documentation Requirements
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Power adapter must hold independent valid CRS registration under IS 13252</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Enclosure plastic must satisfy Glow-Wire 650°C and Flammability V-0 (Clause 4.7)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>High-voltage dielectric strength test at 1500V AC without flashover</span>
                  </div>
                  {isWireless && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Dual Regulation: Wireless modules also require WPC ETA Approval from Department of Telecommunications</span>
                    </div>
                  )}
                  {hasBattery && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Secondary lithium cells inside battery pack must comply with IS 16046 (Part 2):2018</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Certification Roadmap */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Basic Certification Roadmap
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-blue-600 block mb-1">Stage 1</span>
                    <span className="font-semibold text-slate-800 block">Sample Lab Testing</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">12–15 working days at NABL lab</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-blue-600 block mb-1">Stage 2</span>
                    <span className="font-semibold text-slate-800 block">BIS Portal Filing</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">Online form submission + fee</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-blue-600 block mb-1">Stage 3</span>
                    <span className="font-semibold text-slate-800 block">R-Number Grant</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">Final approval in 10–14 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt for Registered Access */}
            <div className="bg-[#142B4A] rounded-xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Save this Assessment &amp; Download PDF Audit</h4>
                <p className="text-xs text-slate-300">
                  Guest results are temporary. Create a free account to save reports, access AI clause chat, and calculate 50% MSME subsidies.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    openGuestModal(
                      'Download Full PDF Compliance Audit',
                      'Create a free account to download the complete 8-page compliance roadmap with laboratory quotation requests and MSME subsidy calculation.'
                    )
                  }
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={() => navigate('auth-register')}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
