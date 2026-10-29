"use client";

import { useState } from "react";
import { Megaphone, Eye, EyeOff, Edit2 } from "lucide-react";

const AD_SLOTS = [
  { id: "1", name: "Header Banner", position: "header-banner", size: "728×90", description: "हेडर के नीचे लीडरबोर्ड", active: false },
  { id: "2", name: "After Hero Leaderboard", position: "after-hero", size: "728×90", description: "हीरो सेक्शन के बाद", active: false },
  { id: "3", name: "Sidebar Top", position: "sidebar-top", size: "300×250", description: "साइडबार के ऊपर", active: false },
  { id: "4", name: "Sidebar Middle Half Page", position: "sidebar-middle", size: "300×600", description: "साइडबार के बीच में", active: false },
  { id: "5", name: "Sidebar Bottom", position: "sidebar-bottom", size: "300×250", description: "साइडबार के नीचे", active: false },
  { id: "6", name: "In-Content 1", position: "in-content-1", size: "728×90", description: "सामग्री के बीच में (पहला)", active: false },
  { id: "7", name: "In-Content 2", position: "in-content-2", size: "300×250", description: "सामग्री के बीच में (दूसरा)", active: false },
  { id: "8", name: "In-Article", position: "in-article", size: "300×250", description: "लेख के अंदर (पैरा 3 के बाद)", active: false },
  { id: "9", name: "Category Top Banner", position: "category-top", size: "728×90", description: "विभाग पेज का बैनर", active: false },
  { id: "10", name: "Footer Banner", position: "footer", size: "728×90", description: "फ़ुटर के ऊपर", active: false },
];

export default function AdminAdsPage() {
  const [slots, setSlots] = useState(AD_SLOTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adCode, setAdCode] = useState("");

  const toggleSlot = (id: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-jost font-black text-gray-900">विज्ञापन स्लॉट प्रबंधन</h1>
          <p className="text-sm font-sarala text-gray-500 mt-1">
            विज्ञापन स्लॉट को सक्रिय/निष्क्रिय करें और Google AdSense या अन्य कोड जोड़ें
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
          <p className="text-xs font-jost font-semibold text-amber-700">
            ⚠️ सभी स्लॉट अभी प्लेसहोल्डर मोड में हैं
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-2xl font-jost font-black text-gray-900">{slots.length}</p>
          <p className="text-sm font-sarala text-gray-500">कुल स्लॉट</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-2xl font-jost font-black text-green-600">{slots.filter((s) => s.active).length}</p>
          <p className="text-sm font-sarala text-gray-500">सक्रिय</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-2xl font-jost font-black text-gray-400">{slots.filter((s) => !s.active).length}</p>
          <p className="text-sm font-sarala text-gray-500">प्लेसहोल्डर</p>
        </div>
      </div>

      {/* Slots Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th className="text-left">नाम</th>
              <th className="text-left">स्थान</th>
              <th className="text-left">आकार</th>
              <th className="text-left">स्थिति</th>
              <th className="text-left">कोड</th>
              <th className="text-left">कार्य</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <>
                <tr key={slot.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Megaphone size={15} className="text-gray-400" />
                      <div>
                        <p className="font-jost font-semibold text-sm text-gray-800">{slot.name}</p>
                        <p className="text-xs text-gray-400 font-sarala">{slot.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-600">
                      {slot.position}
                    </code>
                  </td>
                  <td className="font-mono text-sm text-gray-600">{slot.size}</td>
                  <td>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-jost font-semibold px-2 py-0.5 rounded ${
                        slot.active
                          ? "text-green-700 bg-green-50 border border-green-200"
                          : "text-gray-500 bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {slot.active ? "● सक्रिय" : "○ प्लेसहोल्डर"}
                    </span>
                  </td>
                  <td>
                    {slot.active ? (
                      <span className="text-xs text-green-600 font-jost">कोड जोड़ा गया ✓</span>
                    ) : (
                      <span className="text-xs text-gray-400 font-sarala">अभी खाली</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSlot(slot.id)}
                        className={`p-1.5 rounded transition-colors ${
                          slot.active
                            ? "text-green-600 hover:bg-red-50 hover:text-red-500"
                            : "text-gray-400 hover:bg-green-50 hover:text-green-600"
                        }`}
                        title={slot.active ? "निष्क्रिय करें" : "सक्रिय करें"}
                      >
                        {slot.active ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => setEditingId(editingId === slot.id ? null : slot.id)}
                        className="p-1.5 text-gray-400 hover:text-[#E84A0C] hover:bg-orange-50 rounded transition-colors"
                        title="कोड संपादित करें"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                {editingId === slot.id && (
                  <tr key={`edit-${slot.id}`}>
                    <td colSpan={6} className="bg-orange-50 p-4">
                      <div className="max-w-2xl">
                        <label className="block font-jost font-semibold text-sm text-gray-700 mb-2">
                          AdSense / विज्ञापन कोड पेस्ट करें:
                        </label>
                        <textarea
                          value={adCode}
                          onChange={(e) => setAdCode(e.target.value)}
                          placeholder={`<!-- Google AdSense या अन्य विज्ञापन कोड यहाँ पेस्ट करें -->\n<ins class="adsbygoogle"...></ins>`}
                          rows={6}
                          className="w-full border border-gray-300 rounded-lg p-3 font-mono text-xs bg-white focus:outline-none focus:border-[#E84A0C]"
                        />
                        <div className="flex gap-2 mt-3">
                          <button className="bg-[#E84A0C] text-white font-jost font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#C13A08] transition-colors">
                            सेव करें और सक्रिय करें
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="border border-gray-300 text-gray-600 font-jost text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            रद्द करें
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-jost font-bold text-blue-800 mb-2">📋 विज्ञापन जोड़ने के निर्देश</h3>
        <ol className="space-y-1 text-sm font-sarala text-blue-700">
          <li>1. Google AdSense या किसी अन्य विज्ञापन नेटवर्क पर जाएं</li>
          <li>2. अपना विज्ञापन कोड (HTML snippet) कॉपी करें</li>
          <li>3. ऊपर दिए गए संबंधित स्लॉट के ✏️ बटन पर क्लिक करें</li>
          <li>4. कोड पेस्ट करें और "सेव करें और सक्रिय करें" पर क्लिक करें</li>
        </ol>
      </div>
    </div>
  );
}
