import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  FileSearch,
  AlertTriangle,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
} from 'lucide-react';

export const Screen14_UserPDFAnalysis: React.FC = () => {
  const { pdfDocs, uploadPDFAnalysis } = useApp();

  const [selectedDocId, setSelectedDocId] = useState(pdfDocs[0]?.id || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [docQuery, setDocQuery] = useState('');
  const [docMessages, setDocMessages] = useState<{ sender: 'user' | 'assistant'; text: string; page?: number }[]>([
    {
      sender: 'assistant',
      text: 'I have analyzed the technical datasheet for **ApexRouter_Technical_Datasheet_v2.pdf**. I identified 18 pages covering circuit diagrams, internal SMPS power components, and enclosure flammability ratings.\n\nAsk me any question regarding Clause 1.5, thermal limits, or mandatory testing protocols.',
    },
  ]);

  const activeDoc = pdfDocs.find((d) => d.id === selectedDocId) || pdfDocs[0];

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const newDoc = uploadPDFAnalysis({ name: file.name, size: file.size });
          setSelectedDocId(newDoc.id);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDocQuestion = (qText: string) => {
    if (!qText.trim()) return;

    const userEntry = { sender: 'user' as const, text: qText };
    setDocMessages((prev) => [...prev, userEntry]);
    setDocQuery('');

    setTimeout(() => {
      let reply = '';
      let pageNum = 4;
      const lower = qText.toLowerCase();

      if (lower.includes('summar') || lower.includes('overview')) {
        reply = `**Document Summary**:\nThis technical datasheet covers the AeroLink AC1200 Wi-Fi 6 wireless gateway. Key hardware characteristics:\n- Power: 12V 1.5A DC input via external Class II power adapter.\n- Internal PCB: FR-4 copper clad laminate with UL94 V-0 flame rating.\n- Operating Ambient: 0°C to 45°C.\n- Mandatory Standard: IS 13252 (Part 1):2010.`;
        pageNum = 2;
      } else if (lower.includes('clause') || lower.includes('testing') || lower.includes('requirement')) {
        reply = `**Mandatory Testing Analysis**:\nBased on page 7-9 of this document:\n1. **Clause 1.5 (Components)**: The external 12V adapter is specified as model DSA-18PFB with existing CRS registration R-41002918.\n2. **Clause 2.1 (Electric Shock)**: Primary to secondary creepage distance measures 4.2mm (standard requires $\\ge 4.0\\text{ mm}$).\n3. **Clause 4.2 (Drop Test)**: Requires 750mm drop test on hardwood floor at NABL laboratory.`;
        pageNum = 8;
      } else if (lower.includes('safety') || lower.includes('parameter') || lower.includes('temperature')) {
        reply = `**Safety Parameters Extracted**:\n- Dielectric Withstand: 1500 V AC between AC line and low-voltage secondary.\n- Leakage Current: < 0.25 mA at 240 V AC 50 Hz.\n- Flame Retardance: Glow-wire test at 650°C for outer enclosure (Page 12).`;
        pageNum = 12;
      } else {
        reply = `In section 3.2 (Page ${pageNum}) of the uploaded datasheet, the manufacturer specifies electrical insulation ratings and continuous duty cycles conforming to BIS technical guidelines. No unapproved components were detected in the primary BOM.`;
      }

      setDocMessages((prev) => [...prev, { sender: 'assistant', text: reply, page: pageNum }]);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
          Document Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight mt-0.5">
          PDF Document Analysis &amp; Extraction
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Upload hardware technical specification sheets, circuit schematics, or laboratory test reports to automatically extract compliance parameters and query clauses with AI.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center space-y-3 hover:border-blue-400 transition-colors relative">
        <input
          type="file"
          accept=".pdf"
          onChange={handleSimulatedUpload}
          disabled={isUploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {isUploading ? 'Analyzing PDF with RAG...' : 'Drop your technical PDF document here or browse'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Supports technical specification sheets, BOMs, and schematics up to 10 MB.
          </p>
        </div>

        {isUploading && (
          <div className="max-w-xs mx-auto space-y-1">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-500">{uploadProgress}% processing...</span>
          </div>
        )}

        <div className="text-[11px] text-slate-400">
          Documents are processed temporarily in a secure sandbox and not permanently retained.
        </div>
      </div>

      {/* Two Column Analysis: Document Preview & AI Assistant */}
      {activeDoc && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Document Overview & Extracted Clauses */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {activeDoc.processingStatus}
                  </span>
                  <h3 className="text-base font-bold text-[#142B4A] mt-2">{activeDoc.fileName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{activeDoc.fileSize}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeDoc.pagesCount} pages</span>
                    <span aria-hidden="true">·</span>
                    <span>Uploaded {activeDoc.uploadedAt}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900 block mb-1">Extracted Summary:</span>
                {activeDoc.summary}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Mapped Indian Standards
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDoc.extractedStandards.map((std, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Extracted Clause Compliance Status
                </span>
                <div className="space-y-2">
                  {activeDoc.extractedClauses.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-200 bg-white text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-900">{c.clauseNumber}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            c.status === 'Compliant'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <span className="font-medium text-slate-800 block">{c.title}</span>
                      <p className="text-slate-500 text-[11px]">{c.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Q&A with Citations */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[600px] overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900">Document Intelligence Q&amp;A</h3>
              </div>
              <span className="text-[11px] text-slate-500">Page-level Grounding</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {docMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-md rounded-xl p-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none space-y-2'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    {msg.page && (
                      <div className="text-[10px] font-mono text-blue-700 pt-1 border-t border-slate-200 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>Source: Page {msg.page} of {activeDoc.fileName}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Chips */}
            <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 shrink-0">Ask:</span>
              <button
                onClick={() => handleDocQuestion('Summarise this document')}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap"
              >
                Summarise
              </button>
              <button
                onClick={() => handleDocQuestion('Identify mandatory testing requirements')}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap"
              >
                Mandatory tests
              </button>
              <button
                onClick={() => handleDocQuestion('Extract important safety parameters')}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap"
              >
                Safety params
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleDocQuestion(docQuery);
              }}
              className="p-3 border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={docQuery}
                onChange={(e) => setDocQuery(e.target.value)}
                placeholder="Ask a question about this technical datasheet..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!docQuery.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
