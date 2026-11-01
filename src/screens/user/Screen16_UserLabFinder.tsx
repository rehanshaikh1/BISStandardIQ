import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Search,
  Bookmark,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Scale,
  X,
  Phone,
  Mail,
} from 'lucide-react';

export const Screen16_UserLabFinder: React.FC = () => {
  const { labs, savedLabIds, toggleSaveLab, navigate, setSelectedLabById } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [compareLabIds, setCompareLabIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const cities = useMemo(() => {
    return ['All', ...Array.from(new Set(labs.map((l) => l.city)))];
  }, [labs]);

  const filteredLabs = useMemo(() => {
    return labs.filter((l) => {
      const matchesSearch =
        searchQuery === '' ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity = selectedCity === 'All' || l.city === selectedCity;
      const matchesSaved = !showSavedOnly || savedLabIds.includes(l.id);

      return matchesSearch && matchesCity && matchesSaved;
    });
  }, [labs, searchQuery, selectedCity, showSavedOnly, savedLabIds]);

  const toggleCompare = (id: string) => {
    setCompareLabIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const comparedLabs = labs.filter((l) => compareLabIds.includes(l.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Accredited Testing Directory
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Testing Laboratories &amp; Vendor Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare lab turnaround times, bookmark preferred testing facilities, and request MSME subsidized quotes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {compareLabIds.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Scale className="w-4 h-4 text-blue-400" />
              <span>Compare Selected ({compareLabIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              showSavedOnly
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>Saved Labs ({savedLabIds.length})</span>
          </button>
        </div>
      </div>

      {/* Search & City Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by lab name, city, or accreditation..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Cities' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLabs.map((lab) => {
          const isSaved = savedLabIds.includes(lab.id);
          const isComparing = compareLabIds.includes(lab.id);

          return (
            <div
              key={lab.id}
              onClick={() => {
                setSelectedLabById(lab.id);
                navigate('user-lab-detail', { labId: lab.id });
              }}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
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

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleCompare(lab.id)}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        isComparing
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                      }`}
                      title="Add to Comparison"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSaveLab(lab.id)}
                      className={`p-1.5 rounded text-xs transition-colors ${
                        isSaved
                          ? 'text-blue-600'
                          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                      }`}
                      title="Bookmark Lab"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{lab.city}, {lab.state}</span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>NABL Scope: <strong className="font-mono text-slate-800">{lab.nablCertificateNo}</strong></div>
                  <div>Turnaround: <strong className="text-slate-800">{lab.turnaroundDays}</strong></div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {lab.supportedStandards.slice(0, 3).map((std, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {std}
                    </span>
                  ))}
                  {lab.supportedStandards.length > 3 && (
                    <span className="text-[10px] text-slate-400 px-1 py-0.5">
                      +{lab.supportedStandards.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{lab.contactPerson.split('(')[0]}</span>
                <span className="font-semibold text-blue-600 group-hover:underline inline-flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-[#142B4A]">Laboratory Comparison Matrix</h3>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {comparedLabs.map((lab) => (
                <div key={lab.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">{lab.name}</h4>
                  <div className="space-y-1.5 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Type:</span>
                      <span className="font-semibold">{lab.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Turnaround Time:</span>
                      <span className="font-bold text-blue-700">{lab.turnaroundDays}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Accreditation:</span>
                      <span>{lab.accreditation} ({lab.nablCertificateNo})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Location:</span>
                      <span>{lab.city}, {lab.state}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsCompareOpen(false);
                        setSelectedLabById(lab.id);
                        navigate('user-lab-detail', { labId: lab.id });
                      }}
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                    >
                      Open Full Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
