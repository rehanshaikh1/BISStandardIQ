import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sliders,
  Cpu,
  Shield,
  Layers,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Database,
} from 'lucide-react';

export const Screen35_AdminSettings: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.75);
  const [topK, setTopK] = useState(5);
  const [rateLimitPerMin, setRateLimitPerMin] = useState(60);
  const [maxUploadMb, setMaxUploadMb] = useState(10);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          Platform Architecture
        </span>
        <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
          Admin Systems &amp; AI Model Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Tune inference parameters for the RAG regulatory assistant, manage API gateway rate limits, and configure database security policies.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Platform configuration parameters applied and synced to gateway.</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">Applied</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI & RAG Configuration */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-[#142B4A]">Gemini AI &amp; RAG Semantic Engine</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Inference Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (Fast Regulatory Q&amp;A)</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (Deep Technical Syntheses)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Vector Similarity Cosine Threshold ({similarityThreshold})
              </label>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">Lower = higher recall, Higher = strict precision</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Temperature ({temperature})
              </label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">0.2 recommended for factual statutory accuracy</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Top-K Chunk Retrieval</label>
              <input
                type="number"
                min="3"
                max="10"
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Rate Limits & Gateway */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-[#142B4A]">Gateway &amp; Ingestion Limits</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Guest Rate Limit (Requests / minute)
              </label>
              <input
                type="number"
                value={rateLimitPerMin}
                onChange={(e) => setRateLimitPerMin(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Max PDF Upload Size (MB)
              </label>
              <input
                type="number"
                value={maxUploadMb}
                onChange={(e) => setMaxUploadMb(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>Maintenance Mode (Temporarily suspend guest queries for database migration)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Admin Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
};
