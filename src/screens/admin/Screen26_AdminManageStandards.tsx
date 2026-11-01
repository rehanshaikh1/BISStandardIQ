import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const Screen26_AdminManageStandards: React.FC = () => {
  const { standards, adminDeleteStandard, navigate, setSelectedStandardById } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [schemeFilter, setSchemeFilter] = useState('All');

  const filtered = useMemo(() => {
    return standards.filter((s) => {
      const matchSearch =
        searchQuery === '' ||
        s.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = categoryFilter === 'All' || s.productCategory === categoryFilter;
      const matchScheme = schemeFilter === 'All' || s.scheme.startsWith(schemeFilter);

      return matchSearch && matchCat && matchScheme;
    });
  }, [standards, searchQuery, categoryFilter, schemeFilter]);

  const handleDelete = (id: string, isNum: string) => {
    if (window.confirm(`Are you sure you want to delete standard ${isNum}?`)) {
      adminDeleteStandard(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Catalogue Administration
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Manage Bureau of Indian Standards
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain national standards catalogue, assign Quality Control Order gazettes, and update testing clauses.
          </p>
        </div>

        <button
          onClick={() => navigate('admin-add-edit-standard')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Standard</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IS number, title, or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
          >
            <option value="All">All Categories</option>
            <option value="IT Equipment">IT Equipment</option>
            <option value="Batteries">Batteries</option>
            <option value="Appliances">Appliances</option>
            <option value="Lighting">Lighting</option>
            <option value="EV Charging">EV Charging</option>
            <option value="Cables">Cables</option>
          </select>
        </div>

        <div className="sm:w-44">
          <select
            value={schemeFilter}
            onChange={(e) => setSchemeFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
          >
            <option value="All">All Schemes</option>
            <option value="CRS">CRS (Scheme-II)</option>
            <option value="ISI">ISI Mark (Scheme-I)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">IS Number</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">QCO Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {std.isNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium max-w-sm">
                    <div className="line-clamp-1">{std.title}</div>
                    <span className="text-[10px] text-slate-400">
                      {std.keyClauses.length} Clauses Tracked · Edition {std.editionYear}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {std.productCategory}
                  </td>
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {std.scheme}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-semibold ${
                        std.qcoStatus === 'Mandatory' ? 'text-red-700' : 'text-slate-600'
                      }`}
                    >
                      {std.qcoStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedStandardById(std.id);
                          navigate('admin-add-edit-standard');
                        }}
                        className="p-1 text-slate-600 hover:text-blue-600 rounded hover:bg-slate-100"
                        title="Edit Standard"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(std.id, std.isNumber)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete Standard"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
