import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Files, Search, UploadCloud, Download, Eye, Trash2, ExternalLink, X } from 'lucide-react';

interface ManagedDoc {
  id: string;
  name: string;
  type: 'Gazette QCO' | 'Standard Specification' | 'Test Manual' | 'BIS Guideline';
  fileSize: string;
  uploadedDate: string;
  ministry: string;
  downloadUrl: string;
}

export const Screen33_AdminDocumentManagement: React.FC = () => {
  const [docs, setDocs] = useState<ManagedDoc[]>([
    {
      id: 'doc-1',
      name: 'DPIIT_Gazette_Notification_SO_4501E_Electrical_QCO.pdf',
      type: 'Gazette QCO',
      fileSize: '1.4 MB',
      uploadedDate: '2026-10-28',
      ministry: 'DPIIT',
      downloadUrl: '#',
    },
    {
      id: 'doc-2',
      name: 'IS_13252_Part1_2010_IT_Equipment_Specification.pdf',
      type: 'Standard Specification',
      fileSize: '4.8 MB',
      uploadedDate: '2026-10-24',
      ministry: 'MeitY / BIS',
      downloadUrl: '#',
    },
    {
      id: 'doc-3',
      name: 'MeitY_Compulsory_Registration_Scheme_Guidelines_v4.pdf',
      type: 'BIS Guideline',
      fileSize: '2.6 MB',
      uploadedDate: '2026-10-31',
      ministry: 'MeitY',
      downloadUrl: '#',
    },
    {
      id: 'doc-4',
      name: 'IS_16046_Part2_2018_Lithium_Battery_Test_Procedures.pdf',
      type: 'Standard Specification',
      fileSize: '3.2 MB',
      uploadedDate: '2026-10-25',
      ministry: 'MeitY / BIS',
      downloadUrl: '#',
    },
    {
      id: 'doc-5',
      name: 'NABL_126_Specific_Criteria_for_Electrical_Testing.pdf',
      type: 'Test Manual',
      fileSize: '1.9 MB',
      uploadedDate: '2026-09-18',
      ministry: 'NABL India',
      downloadUrl: '#',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [previewDoc, setPreviewDoc] = useState<ManagedDoc | null>(null);

  const filteredDocs = docs.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ministry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'All' || d.type === selectedType;
    return matchSearch && matchType;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete document "${name}"?`)) {
      setDocs((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Repository Management
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Gazette &amp; Regulatory Document Archives
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Store and manage authentic government gazette notifications, Quality Control Orders, and lab testing criteria manuals.
          </p>
        </div>

        <button
          onClick={() => alert('Upload Regulatory Document')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Gazette / PDF</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document name or authority..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
          >
            <option value="All">All Document Types</option>
            <option value="Gazette QCO">Gazette QCOs</option>
            <option value="Standard Specification">Standard Specifications</option>
            <option value="Test Manual">Test Manuals</option>
            <option value="BIS Guideline">BIS Guidelines</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Document File Name</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Date Uploaded</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-900 max-w-sm truncate">
                    {doc.name}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{doc.ministry}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {doc.fileSize}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {doc.uploadedDate}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 rounded hover:bg-slate-100"
                        title="Preview Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => alert(`Downloading ${doc.name}`)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 rounded hover:bg-slate-100"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.name)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete"
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

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-[#142B4A]">Document Metadata</h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[11px]">Filename:</span>
                <span className="font-mono text-slate-900 font-semibold">{previewDoc.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Classification:</span>
                <span className="font-semibold text-blue-700">{previewDoc.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Authority:</span>
                <span className="text-slate-800">{previewDoc.ministry}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">File Size:</span>
                <span className="font-mono text-slate-700">{previewDoc.fileSize}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
