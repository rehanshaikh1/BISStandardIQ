import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderTree, Plus, Edit, Trash2, CheckCircle2, X } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  code: string;
  standardsCount: number;
  qcoCount: number;
  ministry: string;
  description: string;
}

export const Screen28_AdminProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: 'cat-it',
      name: 'IT Equipment',
      code: 'IT-CRO',
      standardsCount: 44,
      qcoCount: 5,
      ministry: 'MeitY',
      description: 'Computing hardware, servers, routers, POS terminals, and digital displays under CRS.',
    },
    {
      id: 'cat-batt',
      name: 'Batteries',
      code: 'BATT-CRO',
      standardsCount: 18,
      qcoCount: 3,
      ministry: 'MeitY / MoP',
      description: 'Secondary lithium cells, lead acid, power banks, and EV portable traction modules.',
    },
    {
      id: 'cat-app',
      name: 'Appliances',
      code: 'APP-ISI',
      standardsCount: 62,
      qcoCount: 14,
      ministry: 'DPIIT',
      description: 'Household electrical appliances, immersion heaters, irons, and plugs & sockets.',
    },
    {
      id: 'cat-light',
      name: 'Lighting',
      code: 'LED-CRO',
      standardsCount: 22,
      qcoCount: 4,
      ministry: 'MeitY',
      description: 'Self-ballasted LED lamps, electronic controlgear, and industrial floodlights.',
    },
    {
      id: 'cat-ev',
      name: 'EV Charging',
      code: 'EVSE-ISI',
      standardsCount: 9,
      qcoCount: 2,
      ministry: 'Heavy Industries',
      description: 'AC conductive vehicle chargers, DC fast charging stations, and charging cables.',
    },
    {
      id: 'cat-cables',
      name: 'Cables',
      code: 'CBL-ISI',
      standardsCount: 34,
      qcoCount: 6,
      ministry: 'DPIIT',
      description: 'PVC building wires, XLPE insulated power cables, and elastomeric cords.',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formMinistry, setFormMinistry] = useState('DPIIT');
  const [formDesc, setFormDesc] = useState('');

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormName('');
    setFormCode('');
    setFormMinistry('MeitY');
    setFormDesc('');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCat(cat);
    setFormName(cat.name);
    setFormCode(cat.code);
    setFormMinistry(cat.ministry);
    setFormDesc(cat.description);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCat) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCat.id
            ? { ...c, name: formName, code: formCode, ministry: formMinistry, description: formDesc }
            : c
        )
      );
    } else {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: formName,
        code: formCode.toUpperCase(),
        standardsCount: 0,
        qcoCount: 1,
        ministry: formMinistry,
        description: formDesc,
      };
      setCategories((prev) => [...prev, newCat]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
            Taxonomy Management
          </span>
          <h1 className="text-2xl font-bold text-[#142B4A] tracking-tight mt-0.5">
            Product Categories &amp; QCO Domains
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize BIS compliance standards into regulated industrial categories and map overseeing ministries.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product Category</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {cat.code}
                </span>
                <span className="text-[11px] font-medium text-slate-500">{cat.ministry}</span>
              </div>
              <h3 className="text-base font-bold text-[#142B4A]">{cat.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="space-x-3 text-slate-500">
                <span>
                  <strong>{cat.standardsCount}</strong> Standards
                </span>
                <span>·</span>
                <span>
                  <strong>{cat.qcoCount}</strong> QCOs
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#142B4A]">
                {editingCat ? `Edit Category: ${editingCat.name}` : 'Create New Category'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Solar Photovoltaic Modules"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Code</label>
                <input
                  type="text"
                  required
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="e.g. SOLAR-CRO"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Enforcing Ministry</label>
                <input
                  type="text"
                  value={formMinistry}
                  onChange={(e) => setFormMinistry(e.target.value)}
                  placeholder="e.g. MNRE / MeitY"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Scope of products included..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 text-slate-600 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
