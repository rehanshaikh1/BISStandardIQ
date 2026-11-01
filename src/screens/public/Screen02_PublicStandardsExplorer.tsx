import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ArrowUpRight, ShieldCheck, Download, RefreshCw } from 'lucide-react';

export const Screen02_PublicStandardsExplorer: React.FC = () => {
  const { standards, navigate, openGuestModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [selectedQco, setSelectedQco] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Categories list
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(standards.map((s) => s.productCategory)))];
  }, [standards]);

  // Filtered standards
  const filteredStandards = useMemo(() => {
    return standards.filter((s) => {
      const matchesSearch =
        searchQuery === '' ||
        s.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.applicability.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || s.productCategory === selectedCategory;
      const matchesScheme = selectedScheme === 'All' || s.scheme.startsWith(selectedScheme);
      const matchesQco = selectedQco === 'All' || s.qcoStatus === selectedQco;
      const matchesYear = selectedYear === 'All' || s.editionYear.toString() === selectedYear;

      return matchesSearch && matchesCat && matchesScheme && matchesQco && matchesYear;
    });
  }, [standards, searchQuery, selectedCategory, selectedScheme, selectedQco, selectedYear]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedScheme('All');
    setSelectedQco('All');
    setSelectedYear('All');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header / Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>National Standards Repository</span>
              <span aria-hidden="true">/</span>
              <span>Bureau of Indian Standards</span>
              <span aria-hidden="true">/</span>
              <span className="text-blue-600 font-medium">Public Explorer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
              BIS Standards Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explore mandatory and voluntary Indian Standards across IT electronics, appliances, batteries, and cables.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openGuestModal(
                  'Download BIS Standards Index',
                  'Register a free account to export comprehensive standards catalogues, gazette orders, and testing matrices in CSV or PDF format.'
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Catalogue</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS Number (e.g. IS 13252), product name (e.g. Wi-Fi router, lithium battery)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-1">
            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Category</label>
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

            {/* Scheme Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Certification Scheme</label>
              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Schemes</option>
                <option value="CRS">CRS (Scheme-II)</option>
                <option value="ISI">ISI Mark (Scheme-I)</option>
                <option value="Voluntary">Voluntary</option>
              </select>
            </div>

            {/* QCO Status */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">QCO Order Status</label>
              <select
                value={selectedQco}
                onChange={(e) => setSelectedQco(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Mandatory">Mandatory QCO</option>
                <option value="Voluntary">Voluntary</option>
                <option value="Draft QCO">Draft QCO</option>
              </select>
            </div>

            {/* Publication Year */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Edition Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Editions</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2014">2014</option>
                <option value="2012">2012</option>
                <option value="2010">2010</option>
                <option value="2007">2007</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div>
            Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredStandards.length}</span> Indian Standards
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Sorted by IS Priority</span>
            <span>·</span>
            <span>Refreshed daily against Gazette orders</span>
          </div>
        </div>

        {/* Structured Standards Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">IS Number</th>
                  <th className="py-3 px-4">Standard Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Edition</th>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4">QCO Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStandards.length > 0 ? (
                  filteredStandards.map((std) => (
                    <tr
                      key={std.id}
                      onClick={() => navigate('public-standard-detail', { standardId: std.id })}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {std.isNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 font-medium max-w-md">
                        <div className="line-clamp-2">{std.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          Applies to: {std.applicability.slice(0, 3).join(', ')}...
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {std.productCategory}
                      </td>
                      <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600 whitespace-nowrap">
                        {std.editionYear}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[11px] font-medium text-slate-700">
                          {std.scheme}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold ${
                            std.qcoStatus === 'Mandatory'
                              ? 'text-red-700'
                              : std.qcoStatus === 'Draft QCO'
                              ? 'text-amber-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {std.qcoStatus === 'Mandatory' ? 'Mandatory QCO' : std.qcoStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('public-standard-detail', { standardId: std.id });
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 group-hover:underline"
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Filter className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-sm font-semibold text-slate-700">No matching standards found</p>
                        <p className="text-xs text-slate-500">
                          Try clearing search filters or entering generic terms like "battery", "router", or "cables".
                        </p>
                        <button
                          onClick={handleReset}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold mt-2"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guest Promotion Banner */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#142B4A]">
                Need to map custom internal SKUs against these standards?
              </h4>
              <p className="text-xs text-slate-500">
                Log in to bookmark standards, track revision notifications, and receive clause-level AI audits.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('auth-register')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  );
};
