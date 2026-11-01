import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminRAGDoc } from '../../types';
import {
  Cpu,
  Search,
  UploadCloud,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  AlertTriangle,
  Zap,
} from 'lucide-react';

export const Screen32_AdminRAGKnowledgeBase: React.FC = () => {
  const { ragDocs, adminTriggerReindex } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<AdminRAGDoc | null>(null);

  const filteredDocs = ragDocs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Vector Embeddings &amp; Retrieval Engine
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            RAG Knowledge Base &amp; Vector Index
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage chunking strategies, embeddings, and vector similarity indexes for official Bureau of Indian Standards PDFs and Gazette orders.
          </p>
        </div>

        <button
          onClick={() => alert('PDF Upload to RAG Vector Pipeline')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Standard PDF to Index</span>
        </button>
      </div>

      {/* Vector Engine Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Embedding Model</span>
          <span className="font-mono font-bold text-xs text-slate-900 block mt-1">
            text-embedding-004
          </span>
          <span className="text-[10px] text-blue-600 font-mono">768-dimensional vectors</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Indexed Chunks</span>
          <span className="font-mono font-bold text-lg text-slate-900 block mt-1">
            1,096 Chunks
          </span>
          <span className="text-[10px] text-emerald-600">512 token chunk overlap</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Retrieval MRR (k=5)</span>
          <span className="font-mono font-bold text-lg text-slate-900 block mt-1">
            0.942
          </span>
          <span className="text-[10px] text-emerald-600">Cosine similarity metric</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] block">Active Corpus</span>
          <span className="font-mono font-bold text-lg text-slate-900 block mt-1">
            {ragDocs.length} Documents
          </span>
          <span className="text-[10px] text-slate-500">All gazettes synced</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indexed standard, document name, or IS number..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Standard / Document Title</th>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chunks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Indexed</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 max-w-xs font-medium text-slate-900">
                    <div className="font-bold text-blue-700 font-mono text-[11px]">{doc.isNumber}</div>
                    <div className="line-clamp-1">{doc.title}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px] max-w-xs truncate">
                    {doc.fileName}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">{doc.fileSize}</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                    {doc.chunksCount} chunks
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                        doc.status === 'Indexed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : doc.status === 'Embedding'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {doc.lastIndexed}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => adminTriggerReindex(doc.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Re-index Document"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => alert(`Remove ${doc.fileName}`)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                        title="Delete Document"
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
    </div>
  );
};
