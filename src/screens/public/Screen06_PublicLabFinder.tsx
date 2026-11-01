import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Search,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  ArrowRight,
  Filter,
  Layers,
  Map,
} from 'lucide-react';

export const Screen06_PublicLabFinder: React.FC = () => {
  const { labs, navigate, setSelectedLabById, openGuestModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedAccreditation, setSelectedAccreditation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMapView, setShowMapView] = useState(false);

  const cities = useMemo(() => {
    return ['All', ...Array.from(new Set(labs.map((l) => l.city)))];
  }, [labs]);

  const categories = ['All', 'IT Equipment', 'Batteries', 'Appliances', 'Lighting', 'Cables', 'EV Charging'];

  const filteredLabs = useMemo(() => {
    return labs.filter((l) => {
      const matchesSearch =
        searchQuery === '' ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.supportedStandards.some((std) => std.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCity = selectedCity === 'All' || l.city === selectedCity;
      const matchesAccreditation =
        selectedAccreditation === 'All' || l.accreditation.includes(selectedAccreditation);
      const matchesCategory =
        selectedCategory === 'All' || l.productCategories.includes(selectedCategory);

      return matchesSearch && matchesCity && matchesAccreditation && matchesCategory;
    });
  }, [labs, searchQuery, selectedCity, selectedAccreditation, selectedCategory]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Conformity Assessment</span>
              <span aria-hidden="true">/</span>
              <span className="text-blue-600 font-medium">Accredited Laboratory Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
              BIS Recognized Testing Laboratories
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Locate government research centers and NABL accredited test facilities across India for safety, EMI/EMC, and environmental tests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMapView(!showMapView)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Map className="w-3.5 h-3.5 text-blue-600" />
              <span>{showMapView ? 'Switch to Card List' : 'View Geographic Map'}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city (e.g. Delhi, Bengaluru), laboratory name (e.g. ERTL, CPRI), or IS standard (e.g. IS 13252)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {/* City */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">City / Region</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Accreditation */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Accreditation</label>
              <select
                value={selectedAccreditation}
                onChange={(e) => setSelectedAccreditation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Accreditations</option>
                <option value="Both">Both NABL &amp; BIS</option>
                <option value="NABL">NABL Accredited</option>
                <option value="BIS">BIS Recognized</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Product Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('All');
                  setSelectedAccreditation('All');
                  setSelectedCategory('All');
                }}
                className="w-full py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Map View Simulation if toggled */}
        {showMapView && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">Geographic Testing Cluster Map (India)</h3>
              </div>
              <span className="text-xs text-slate-400">8 Principal Testing Nodes Verified</span>
            </div>

            {/* Simulated Interactive Vector Map Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="font-bold text-blue-300 block">Delhi NCR Hub</span>
                <span className="text-slate-400 text-[11px]">ERTL North, MSME Delhi, TÜV Gurugram</span>
                <span className="text-[10px] text-emerald-400 block mt-1">3 Active Labs</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="font-bold text-blue-300 block">Bengaluru Hub</span>
                <span className="text-slate-400 text-[11px]">CPRI High-Voltage, UL India Whitefield</span>
                <span className="text-[10px] text-emerald-400 block mt-1">2 Active Labs</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="font-bold text-blue-300 block">Mumbai Region</span>
                <span className="text-slate-400 text-[11px]">Intertek Chandivali, SAMEER Navi Mumbai</span>
                <span className="text-[10px] text-emerald-400 block mt-1">2 Active Labs</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="font-bold text-blue-300 block">Chennai Hub</span>
                <span className="text-slate-400 text-[11px]">SAMEER Electromagnetics Taramani</span>
                <span className="text-[10px] text-emerald-400 block mt-1">1 Active Lab</span>
              </div>
            </div>
          </div>
        )}

        {/* Labs List */}
        <div className="space-y-4">
          <div className="text-xs text-slate-500 px-1">
            Found <span className="font-semibold text-slate-800 tabular-nums">{filteredLabs.length}</span> accredited testing facilities
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLabs.map((lab) => (
              <div
                key={lab.id}
                onClick={() => {
                  setSelectedLabById(lab.id);
                  navigate('public-lab-detail', { labId: lab.id });
                }}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
                        {lab.type}
                      </span>
                      <h3 className="text-sm font-bold text-[#142B4A] group-hover:text-blue-600 transition-colors mt-0.5">
                        {lab.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      {lab.accreditation}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{lab.address}</span>
                  </div>

                  <div className="pt-1 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>NABL Certificate: <strong className="font-mono text-slate-800">{lab.nablCertificateNo}</strong> (Valid till {lab.validUntil})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Typical Turnaround: <strong>{lab.turnaroundDays}</strong></span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Tested Standards:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {lab.supportedStandards.map((std, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    <span>Contact: {lab.contactPerson.split('(')[0]}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLabById(lab.id);
                      navigate('public-lab-detail', { labId: lab.id });
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:gap-1.5 transition-all"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
