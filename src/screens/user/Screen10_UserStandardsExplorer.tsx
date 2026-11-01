import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Bookmark,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  BookmarkCheck,
  Download,
} from 'lucide-react';

export const Screen10_UserStandardsExplorer: React.FC = () => {
  const { standards, savedStandardIds, toggleSaveStandard, navigate, setSelectedStandardById } =
    useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(standards.map((s) => s.productCategory)))];
  }, [standards]);

  const filteredStandards = useMemo(() => {
    return standards.filter((s) => {
      const matchesSearch =
        searchQuery === '' ||
        s.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || s.productCategory === selectedCategory;
      const matchesScheme = selectedScheme === 'All' || s.scheme.startsWith(selectedScheme);
      const matchesSaved = !showSavedOnly || savedStandardIds.includes(s.id);

      return matchesSearch && matchesCat && matchesScheme && matchesSaved;
    });
  }, [standards, searchQuery, selectedCategory, selectedScheme, showSavedOnly, savedStandardIds]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Workspace Standards Explorer
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            BIS Standards Directory &amp; Bookmarks
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse Indian Standards, save bookmarks to your enterprise workspace, and query technical clauses with AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              showSavedOnly
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-blue-600" />
            <span>Saved Bookmarks ({savedStandardIds.length})</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IS number or product application..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Scheme</label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All">All Schemes</option>
              <option value="CRS">CRS (Scheme-II)</option>
              <option value="ISI">ISI Mark (Scheme-I)</option>
            </select>
          </div>

          <div className="flex items-end sm:col-span-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedScheme('All');
                setShowSavedOnly(false);
              }}
              className="px-4 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-10">Save</th>
                <th className="py-3 px-4">IS Number</th>
                <th className="py-3 px-4">Standard Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">QCO Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStandards.map((std) => {
                const isSaved = savedStandardIds.includes(std.id);

                return (
                  <tr
                    key={std.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    onClick={() => {
                      setSelectedStandardById(std.id);
                      navigate('user-standard-detail', { standardId: std.id });
                    }}
                  >
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSaveStandard(std.id)}
                        className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                          isSaved ? 'text-blue-600' : 'text-slate-300 hover:text-slate-600'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Bookmark Standard'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {std.isNumber}
                    </td>

                    <td className="py-3 px-4 text-slate-800 font-medium max-w-sm">
                      <div className="line-clamp-2">{std.title}</div>
                    </td>

                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {std.productCategory}
                    </td>

                    <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap">
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

                    <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedStandardById(std.id);
                            navigate('user-ai-assistant');
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded border border-blue-200 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Ask AI</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedStandardById(std.id);
                            navigate('user-standard-detail', { standardId: std.id });
                          }}
                          className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-2 py-1"
                        >
                          Details →
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
