import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck, Search, Plus, CheckCircle2, AlertTriangle, ShieldCheck, Edit, Trash2 } from 'lucide-react';

interface ComplianceRule {
  id: string;
  ruleCode: string;
  productKeyword: string;
  mappedStandard: string;
  scheme: 'CRS (Scheme-II)' | 'ISI Mark (Scheme-I)' | 'FMCS';
  qcoMandatory: boolean;
  testingClausesCount: number;
  criticalThreshold: string;
  active: boolean;
}

export const Screen29_AdminComplianceRules: React.FC = () => {
  const [rules, setRules] = useState<ComplianceRule[]>([
    {
      id: 'rule-1',
      ruleCode: 'RULE-IT-001',
      productKeyword: 'Wi-Fi Router / Access Point',
      mappedStandard: 'IS 13252 (Part 1):2010',
      scheme: 'CRS (Scheme-II)',
      qcoMandatory: true,
      testingClausesCount: 5,
      criticalThreshold: 'Creepage >= 4.0mm, Adapter CRS verified',
      active: true,
    },
    {
      id: 'rule-2',
      ruleCode: 'RULE-BATT-002',
      productKeyword: 'Lithium-ion Pack / Cell',
      mappedStandard: 'IS 16046 (Part 2):2018',
      scheme: 'CRS (Scheme-II)',
      qcoMandatory: true,
      testingClausesCount: 6,
      criticalThreshold: 'Short-circuit < 80 mOhm, 13 kN crush invariant',
      active: true,
    },
    {
      id: 'rule-3',
      ruleCode: 'RULE-APP-003',
      productKeyword: 'Electric Dry / Steam Iron',
      mappedStandard: 'IS 302-2-3:2007',
      scheme: 'ISI Mark (Scheme-I)',
      qcoMandatory: true,
      testingClausesCount: 8,
      criticalThreshold: '1000V Dielectric withstand at working temp',
      active: true,
    },
    {
      id: 'rule-4',
      ruleCode: 'RULE-CBL-004',
      productKeyword: 'PVC Flexible Copper Wire',
      mappedStandard: 'IS 694:2010',
      scheme: 'ISI Mark (Scheme-I)',
      qcoMandatory: true,
      testingClausesCount: 4,
      criticalThreshold: 'Spark test 6 kV, Oxygen index > 29%',
      active: true,
    },
    {
      id: 'rule-5',
      ruleCode: 'RULE-EV-005',
      productKeyword: 'AC EV Wallbox / Mode 2 Charger',
      mappedStandard: 'IS 17017 (Part 1):2018',
      scheme: 'ISI Mark (Scheme-I)',
      qcoMandatory: true,
      testingClausesCount: 7,
      criticalThreshold: 'Type B RCD or 30mA Type A + 6mA DC residual',
      active: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredRules = rules.filter(
    (r) =>
      r.ruleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.mappedStandard.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRuleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Rule Inference Engine
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Compliance Rules &amp; Standard Mapping Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain algorithmic heuristics for matching hardware specs and HS codes to Indian Standards, mandatory clauses, and schemes.
          </p>
        </div>

        <button
          onClick={() => alert('New compliance rule mapping form')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Compliance Rule</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rule code, product keyword, or mapped IS standard..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Rule Code</th>
                <th className="py-3 px-4">Product Pattern / Keyword</th>
                <th className="py-3 px-4">Mapped Standard</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">QCO Mandatory</th>
                <th className="py-3 px-4">Critical Threshold</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {rule.ruleCode}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                    {rule.productKeyword}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800 whitespace-nowrap">
                    {rule.mappedStandard}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {rule.scheme}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-semibold ${
                        rule.qcoMandatory ? 'text-red-700' : 'text-slate-500'
                      }`}
                    >
                      {rule.qcoMandatory ? 'Mandatory Order' : 'Voluntary'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                    {rule.criticalThreshold}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleRuleActive(rule.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rule.active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {rule.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1 text-slate-400 hover:text-blue-600 rounded">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-600 rounded">
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
