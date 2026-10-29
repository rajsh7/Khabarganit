"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function AdminCategoriesPage() {
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("#E84A0C");
  const [icon, setIcon] = useState("");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-jost font-black text-gray-900">विभाग प्रबंधन</h1>
          <p className="text-sm font-sarala text-gray-500 mt-1">न्यूज़ कैटेगरी जोड़ें, संपादित करें या हटाएं</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> नया विभाग
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 animate-fade-in">
          <h3 className="font-jost font-bold text-gray-900 mb-4">नया विभाग जोड़ें</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-600 mb-1">नाम</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="जैसे: राष्ट्रीय"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]" />
            </div>
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-600 mb-1">Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="rashtriya"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]" />
            </div>
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-600 mb-1">रंग</label>
              <div className="flex gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-14 rounded border border-gray-200 cursor-pointer" />
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-jost focus:outline-none focus:border-[#E84A0C]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-jost font-semibold text-gray-600 mb-1">आइकन (इमोजी)</label>
              <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="🏛️"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-2xl font-sarala focus:outline-none focus:border-[#E84A0C]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-semibold text-sm px-6 py-2 rounded-lg transition-colors">
              सेव करें
            </button>
            <button onClick={() => setShowNew(false)} className="border border-gray-300 text-gray-600 font-jost text-sm px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              रद्द करें
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th className="text-left">विभाग</th>
              <th className="text-left">Slug</th>
              <th className="text-left">रंग</th>
              <th className="text-left">लेख</th>
              <th className="text-left">कार्य</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => (
              <tr key={cat.slug}>
                <td>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-jost font-semibold text-gray-800">{cat.name}</span>
                  </div>
                </td>
                <td className="font-mono text-sm text-gray-500">{cat.slug}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: cat.color }} />
                    <span className="font-mono text-xs text-gray-500">{cat.color}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="category-badge text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.slug.length * 18 + 45} लेख
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-[#E84A0C] hover:bg-orange-50 rounded transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
