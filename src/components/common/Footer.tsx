import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">BIS StandardsIQ</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered regulatory intelligence platform assisting Indian electronics manufacturers,
              importers and MSMEs to discover applicable BIS standards, navigate QCOs, and certify with confidence.
            </p>
            <div className="text-xs text-slate-400">
              <span>National Support Cell</span>
              <span className="block text-slate-200 font-mono mt-0.5">1800-11-4000 (Toll Free)</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Discovery Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('public-standards-explorer')} className="hover:text-white transition-colors">
                  BIS Standards Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('public-compliance-checker')} className="hover:text-white transition-colors">
                  Product Compliance Checker
                </button>
              </li>
              <li>
                <button onClick={() => navigate('public-licence-verification')} className="hover:text-white transition-colors">
                  ISI / CRS Licence Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigate('public-lab-finder')} className="hover:text-white transition-colors">
                  Accredited Testing Labs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Official Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.services.bis.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>Bureau of Indian Standards Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://www.meity.gov.in/esdm/standards" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>MeitY Compulsory Registration (CRS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>DPIIT Quality Control Orders</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://nabl-india.org" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>NABL Accredited Testing Directory</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">MSME &amp; Compliance Hub</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('auth-register')} className="hover:text-white transition-colors">
                  MSME 50% Concession Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => navigate('auth-login')} className="hover:text-white transition-colors">
                  Manufacturer Sign-in
                </button>
              </li>
              <li>
                <button onClick={() => navigate('public-landing')} className="hover:text-white transition-colors">
                  Privacy Policy &amp; Terms
                </button>
              </li>
            </ul>
            <div className="mt-4 p-2.5 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 leading-tight">
              Disclaimer: BIS StandardsIQ is an independent compliance discovery tool. Refer to official BIS gazette publications for legal certifications.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 BIS StandardsIQ. All rights reserved. Built for Indian Electronics Manufacturers.</p>
          <div className="flex items-center gap-4">
            <span>New Delhi · Bengaluru · Mumbai</span>
            <span className="text-slate-400">·</span>
            <span>Version 2.4-Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
