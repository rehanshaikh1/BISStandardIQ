import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, CheckCircle2, XCircle, ShieldCheck, Mail, Building, Eye, X } from 'lucide-react';

interface ManagedUser {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  businessType: string;
  udyamNumber?: string;
  registeredDate: string;
  status: 'Active' | 'Suspended';
  assessmentsCount: number;
}

export const Screen31_AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'usr-10029',
      fullName: 'Rehan Shaikh',
      email: 'rehanshaikh1457@gmail.com',
      companyName: 'Apex Electronics & Smart Mobility Pvt Ltd',
      businessType: 'MSME',
      udyamNumber: 'UDYAM-DL-08-0049281',
      registeredDate: '2026-02-14',
      status: 'Active',
      assessmentsCount: 6,
    },
    {
      id: 'usr-10030',
      fullName: 'Aarav Singhania',
      email: 'aarav@dixontech.in',
      companyName: 'Dixon Technologies (India) Ltd',
      businessType: 'Manufacturer',
      udyamNumber: 'N/A (Large Enterprise)',
      registeredDate: '2026-03-01',
      status: 'Active',
      assessmentsCount: 19,
    },
    {
      id: 'usr-10031',
      fullName: 'Pooja Venkatesh',
      email: 'pooja.v@havells.com',
      companyName: 'Havells India Ltd',
      businessType: 'Manufacturer',
      udyamNumber: 'N/A',
      registeredDate: '2026-04-12',
      status: 'Active',
      assessmentsCount: 14,
    },
    {
      id: 'usr-10032',
      fullName: 'Karan Mehra',
      email: 'karan@voltastech.co.in',
      companyName: 'Voltas ElectroComponents LLP',
      businessType: 'MSME',
      udyamNumber: 'UDYAM-MH-12-0081294',
      registeredDate: '2026-05-20',
      status: 'Active',
      assessmentsCount: 3,
    },
    {
      id: 'usr-10033',
      fullName: 'Rajesh Gokhale',
      email: 'rajesh@innotrade.in',
      companyName: 'InnoTrade Global Importers',
      businessType: 'Importer',
      udyamNumber: 'N/A',
      registeredDate: '2026-06-11',
      status: 'Suspended',
      assessmentsCount: 1,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            User Governance
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Registered Manufacturer Accounts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit registered enterprise tenants, verify Udyam registration credentials, and manage account authorization.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          Role Policy: All registered accounts strictly hold <strong>User</strong> role.
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by full name, registered email, or company name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Business Type</th>
                <th className="py-3 px-4">Udyam Verification</th>
                <th className="py-3 px-4">Assessments</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 block">{u.fullName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{u.email}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium whitespace-nowrap">
                    {u.companyName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{u.businessType}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {u.udyamNumber && u.udyamNumber.startsWith('UDYAM') ? (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                        {u.udyamNumber}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Non-MSME</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                    {u.assessmentsCount} audits
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="text-xs font-semibold text-blue-600 hover:underline px-2 py-1"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`text-xs font-semibold px-2 py-1 rounded ${u.status === 'Active'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-[#142B4A]">User Account Dossier</h3>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="text-slate-400 block text-[11px]">Full Name:</span>
                <span className="font-bold text-sm text-slate-900">{selectedUser.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email:</span>
                <span className="font-mono text-slate-800">{selectedUser.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Enterprise:</span>
                <span className="font-semibold text-slate-800">{selectedUser.companyName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Business Classification:</span>
                <span className="text-slate-700">{selectedUser.businessType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Udyam Registration:</span>
                <span className="font-mono text-slate-800">{selectedUser.udyamNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Registration Date:</span>
                <span className="text-slate-700">{selectedUser.registeredDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
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
