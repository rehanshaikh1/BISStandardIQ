import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TestingLab } from '../../types';
import { Building2, Search, Plus, Edit, Trash2, ShieldCheck, MapPin, X } from 'lucide-react';

export const Screen30_AdminTestingLabs: React.FC = () => {
  const { labs, adminAddLab, adminDeleteLab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [labName, setLabName] = useState('');
  const [labType, setLabType] = useState<TestingLab['type']>('Govt. / PSU');
  const [accreditation, setAccreditation] = useState<TestingLab['accreditation']>('Both NABL & BIS');
  const [certificateNo, setCertificateNo] = useState('');
  const [validUntil, setValidUntil] = useState('2028-12-31');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [turnaroundDays, setTurnaroundDays] = useState('10 – 15 working days');

  const filteredLabs = labs.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.nablCertificateNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setLabName('');
    setCertificateNo('');
    setCity('');
    setState('');
    setAddress('');
    setPinCode('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setModalOpen(true);
  };

  const handleSaveLab = (e: React.FormEvent) => {
    e.preventDefault();
    const newLab: TestingLab = {
      id: `lab-${Date.now()}`,
      name: labName,
      type: labType,
      accreditation,
      nablCertificateNo: certificateNo || 'TC-9999',
      validUntil,
      city,
      state,
      address,
      pinCode,
      supportedStandards: ['IS 13252 (Part 1):2010', 'IS 16046 (Part 2):2018'],
      productCategories: ['IT Equipment', 'Batteries'],
      contactPerson,
      email,
      phone,
      turnaroundDays,
      facilitiesAvailable: ['Semi-anechoic Chamber', 'Hi-pot & Earth Continuity Bench'],
      coordinates: { lat: 28.6139, lng: 77.209 },
    };
    adminAddLab(newLab);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Network Governance
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Testing Laboratory Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain accreditation records, verify NABL certification expiries, and update testing capacity.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testing Laboratory</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laboratory name, NABL certificate number, or city..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Laboratories Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Laboratory Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">NABL Cert No.</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Turnaround</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLabs.map((lab) => (
                <tr key={lab.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">
                    <div className="truncate">{lab.name}</div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {lab.supportedStandards.length} Standards Scope
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{lab.type}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-700 whitespace-nowrap">
                    {lab.nablCertificateNo}
                  </td>
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">{lab.validUntil}</td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {lab.city}, {lab.state}
                  </td>
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {lab.turnaroundDays}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => alert(`Edit ${lab.name}`)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100"
                        title="Edit Lab"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => adminDeleteLab(lab.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete Lab"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lab Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#142B4A]">Register New Testing Facility</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLab} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Laboratory Legal Name</label>
                <input
                  type="text"
                  required
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  placeholder="e.g. National Test House (NR)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Facility Type</label>
                  <select
                    value={labType}
                    onChange={(e) => setLabType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs"
                  >
                    <option value="Govt. / PSU">Govt. / PSU</option>
                    <option value="Private NABL">Private NABL</option>
                    <option value="Autonomous Research Institute">Autonomous Research Institute</option>
                    <option value="BIS Central Lab">BIS Central Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Accreditation</label>
                  <select
                    value={accreditation}
                    onChange={(e) => setAccreditation(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs"
                  >
                    <option value="Both NABL & BIS">Both NABL &amp; BIS</option>
                    <option value="NABL Accredited">NABL Accredited</option>
                    <option value="BIS Recognized">BIS Recognized</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NABL Certificate No.</label>
                  <input
                    type="text"
                    required
                    value={certificateNo}
                    onChange={(e) => setCertificateNo(e.target.value)}
                    placeholder="e.g. TC-5890"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Accreditation Valid Until</label>
                  <input
                    type="date"
                    required
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Facility Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pin Code</label>
                  <input
                    type="text"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Turnaround Estimate</label>
                  <input
                    type="text"
                    value={turnaroundDays}
                    onChange={(e) => setTurnaroundDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Officer</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Technical Officer Name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 text-slate-600 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg"
                >
                  Save Laboratory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
