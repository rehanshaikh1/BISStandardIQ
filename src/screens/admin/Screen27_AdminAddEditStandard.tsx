import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BISStandard } from '../../types';
import { ArrowLeft, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Screen27_AdminAddEditStandard: React.FC = () => {
  const { selectedStandard, adminAddStandard, adminUpdateStandard, navigate } = useApp();

  const isEditing = Boolean(selectedStandard?.id);

  const [isNumber, setIsNumber] = useState(selectedStandard?.isNumber || 'IS 18000:2026');
  const [title, setTitle] = useState(
    selectedStandard?.title || 'Smart Grid Energy Storage Systems – Safety Specifications'
  );
  const [category, setCategory] = useState(selectedStandard?.productCategory || 'Batteries');
  const [editionYear, setEditionYear] = useState(selectedStandard?.editionYear || 2026);
  const [scheme, setScheme] = useState<BISStandard['scheme']>(
    selectedStandard?.scheme || 'CRS (Scheme-II)'
  );
  const [qcoStatus, setQcoStatus] = useState<BISStandard['qcoStatus']>(
    selectedStandard?.qcoStatus || 'Mandatory'
  );
  const [qcoOrderNumber, setQcoOrderNumber] = useState(
    selectedStandard?.qcoOrderNumber || 'S.O. 5012(E) / Ministry of Power'
  );
  const [qcoEffectiveDate, setQcoEffectiveDate] = useState(
    selectedStandard?.qcoEffectiveDate || '2026-12-01'
  );
  const [ministry, setMinistry] = useState<BISStandard['ministry']>(
    selectedStandard?.ministry || 'Ministry of Power'
  );
  const [overview, setOverview] = useState(
    selectedStandard?.overview ||
      'Defines safety requirements, thermal runaway suppression, and grid isolation for stationary battery storage.'
  );
  const [scope, setScope] = useState(
    selectedStandard?.scope || 'Applicable to industrial commercial BESS installations exceeding 10 kWh.'
  );
  const [officialBisUrl, setOfficialBisUrl] = useState(
    selectedStandard?.officialBisUrl || 'https://www.services.bis.gov.in/standards'
  );
  const [pdfReferenceUrl, setPdfReferenceUrl] = useState(
    selectedStandard?.pdfReferenceUrl || 'https://bis.gov.in/standards/doc.pdf'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const standardObj: BISStandard = {
      id: isEditing ? selectedStandard.id : `is-${Date.now()}`,
      isNumber,
      title,
      productCategory: category,
      editionYear: Number(editionYear),
      scheme,
      qcoStatus,
      qcoOrderNumber,
      qcoEffectiveDate,
      ministry,
      overview,
      scope,
      applicability: ['Commercial BESS Units', 'Industrial Battery Cabinets'],
      keyClauses: selectedStandard?.keyClauses || [
        {
          clauseNumber: 'Clause 6.1',
          title: 'Thermal Propagation Invariant',
          description: 'Single-cell failure must not cascade across module boundaries.',
          isMandatoryTest: true,
        },
      ],
      officialBisUrl,
      pdfReferenceUrl,
      testingParameters: ['Thermal propagation', 'Drop and impact', 'Dielectric withstand'],
      sampleFeeEstimate: {
        testingFeeRange: '₹60,000 – ₹1,20,000',
        markingFee: '₹1,000 flat portal registration',
        msmeDiscountPercent: 50,
      },
    };

    if (isEditing) {
      adminUpdateStandard(standardObj);
    } else {
      adminAddStandard(standardObj);
    }

    navigate('admin-manage-standards');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('admin-manage-standards')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Standards Catalogue</span>
        </button>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            {isEditing ? 'Edit Standard Record' : 'Create New Standard'}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            {isEditing ? `Edit ${isNumber}` : 'Add New Indian Standard to Catalogue'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Specify technical details, regulatory gazette number, and certification scheme parameters.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Indian Standard (IS) Number</label>
              <input
                type="text"
                required
                value={isNumber}
                onChange={(e) => setIsNumber(e.target.value)}
                placeholder="e.g. IS 13252 (Part 1):2010"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                <option value="IT Equipment">IT Equipment</option>
                <option value="Batteries">Batteries</option>
                <option value="Appliances">Appliances</option>
                <option value="Lighting">Lighting</option>
                <option value="EV Charging">EV Charging</option>
                <option value="Cables">Cables</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Standard Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Full official title of the standard"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Publication Year</label>
              <input
                type="number"
                required
                value={editionYear}
                onChange={(e) => setEditionYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Certification Scheme</label>
              <select
                value={scheme}
                onChange={(e) => setScheme(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                <option value="CRS (Scheme-II)">CRS (Scheme-II)</option>
                <option value="ISI Mark (Scheme-I)">ISI Mark (Scheme-I)</option>
                <option value="FMCS">FMCS (Foreign Manufacturers)</option>
                <option value="Voluntary">Voluntary</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">QCO Order Status</label>
              <select
                value={qcoStatus}
                onChange={(e) => setQcoStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                <option value="Mandatory">Mandatory QCO</option>
                <option value="Voluntary">Voluntary Standard</option>
                <option value="Draft QCO">Draft QCO Issued</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Enforcing Ministry</label>
              <select
                value={ministry}
                onChange={(e) => setMinistry(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                <option value="MeitY">MeitY (Electronics &amp; IT)</option>
                <option value="DPIIT">DPIIT (Industry &amp; Internal Trade)</option>
                <option value="Ministry of Power">Ministry of Power</option>
                <option value="Heavy Industries">Heavy Industries</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gazette Order Number</label>
              <input
                type="text"
                value={qcoOrderNumber}
                onChange={(e) => setQcoOrderNumber(e.target.value)}
                placeholder="e.g. S.O. 2357(E)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Effective Date</label>
              <input
                type="date"
                value={qcoEffectiveDate}
                onChange={(e) => setQcoEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Overview &amp; Purpose</label>
              <textarea
                rows={3}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Scope</label>
              <textarea
                rows={2}
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Official BIS Portal Link</label>
              <input
                type="url"
                value={officialBisUrl}
                onChange={(e) => setOfficialBisUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('admin-manage-standards')}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Standard Updates' : 'Add Standard to Catalogue'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
