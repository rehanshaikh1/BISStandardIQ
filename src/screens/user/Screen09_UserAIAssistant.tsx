import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Sparkles,
  Paperclip,
  RotateCcw,
  BookOpen,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bot,
  User,
} from 'lucide-react';

export const Screen09_UserAIAssistant: React.FC = () => {
  const { chatMessages, sendChatMessage, clearChat, standards, setSelectedStandardById, navigate } =
    useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Which BIS standard applies to Wi-Fi routers?',
    'Explain IS 13252.',
    'Does a lithium battery require CRS registration?',
    'What are the certification requirements for EV chargers?',
  ];

  const handleSend = (text?: string) => {
    const query = text || inputPrompt;
    if (!query.trim()) return;

    setIsTyping(true);
    sendChatMessage(query);
    setInputPrompt('');

    setTimeout(() => {
      setIsTyping(false);
    }, 700);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-160px)] lg:h-[calc(100vh-140px)]">
      {/* Left 8 cols: Conversational Workspace */}
      <div className="lg:col-span-8 flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden h-[540px] sm:h-[600px] lg:h-full">
        {/* Assistant Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#142B4A]">AI Standards Intelligence Assistant</h2>
              <span className="text-[11px] text-slate-500">
                Grounded in Gazette QCOs, BIS e-Repository &amp; NABL Protocols
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Conversation</span>
            </button>
          </div>
        </div>

        {/* Chat Stream Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none space-y-3'
                }`}
              >
                {/* Message Content Rendered */}
                <div className="whitespace-pre-line prose-xs">
                  {msg.content}
                </div>

                {/* Citations Box if Present */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Source Citations from Bureau of Indian Standards
                    </span>
                    <div className="space-y-2">
                      {msg.citations.map((cite, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-bold text-blue-700">
                              {cite.standardNumber} · {cite.clauseNumber}
                            </span>
                            {cite.pageNumber && (
                              <span className="text-slate-400">Page {cite.pageNumber}</span>
                            )}
                          </div>
                          <span className="font-semibold text-slate-900 block">{cite.title}</span>
                          <p className="text-slate-500 text-[11px] italic">"{cite.excerpt}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3.5 items-center text-xs text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Retrieving relevant clauses from BIS knowledge base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="px-6 py-2 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">Try asking:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] text-slate-700 bg-white hover:bg-slate-100 hover:text-blue-700 px-2.5 py-1 rounded-md border border-slate-200 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => navigate('user-pdf-analysis')}
              className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Attach Technical Datasheet PDF"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask about Indian Standards, mandatory test clauses, creepage limits, or QCO dates..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-xs disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right 4 cols: Grounding & Retrieved Standards Panel */}
      <div className="lg:col-span-4 space-y-6 overflow-y-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#142B4A] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Retrieved Standards &amp; Source Documents</span>
          </h3>
          <p className="text-xs text-slate-500">
            Dynamic RAG vector search results matching your current discussion:
          </p>

          <div className="space-y-3">
            {standards.slice(0, 3).map((std) => (
              <div
                key={std.id}
                onClick={() => {
                  setSelectedStandardById(std.id);
                  navigate('user-standard-detail', { standardId: std.id });
                }}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 cursor-pointer transition-colors space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-700">{std.isNumber}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    94% Match
                  </span>
                </div>
                <h4 className="font-medium text-slate-900 line-clamp-1">{std.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>{std.scheme}</span>
                  <span className="text-blue-600 hover:underline">View Clauses →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Guidance Note */}
        <div className="bg-blue-50/70 rounded-xl border border-blue-200 p-5 text-xs text-blue-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-950">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>AI Regulatory Grounding</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Every AI response is grounded against Gazette Quality Control Orders, official Bureau of Indian Standards specifications, and laboratory test parameters.
          </p>
        </div>
      </div>
    </div>
  );
};
