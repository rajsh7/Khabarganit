"use client";

import { Plus, Edit2, Trash2, Shield, User } from "lucide-react";

const USERS = [
  { id: "1", name: "राहुल शर्मा", email: "rahul@khabarganit.in", role: "ADMIN", articles: 245, joined: "जनवरी 2024" },
  { id: "2", name: "प्रिया वर्मा", email: "priya@khabarganit.in", role: "EDITOR", articles: 132, joined: "मार्च 2024" },
  { id: "3", name: "विक्रम सिंह", email: "vikram@khabarganit.in", role: "AUTHOR", articles: 87, joined: "अप्रैल 2024" },
  { id: "4", name: "अमित पटेल", email: "amit@khabarganit.in", role: "AUTHOR", articles: 56, joined: "जून 2024" },
  { id: "5", name: "डॉ. सुनीता मेहता", email: "sunita@khabarganit.in", role: "AUTHOR", articles: 93, joined: "फरवरी 2024" },
];

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "#E84A0C",
  EDITOR: "#5B9BD5",
  AUTHOR: "#6BBF8E",
};

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "एडमिन",
  EDITOR: "संपादक",
  AUTHOR: "लेखक",
};

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-jost font-black text-gray-900">उपयोगकर्ता प्रबंधन</h1>
          <p className="text-sm font-sarala text-gray-500 mt-1">सभी लेखक, संपादक और एडमिन</p>
        </div>
        <button className="flex items-center gap-2 bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> नया उपयोगकर्ता
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "एडमिन", count: 1, color: "#E84A0C", icon: Shield },
          { label: "संपादक", count: 1, color: "#5B9BD5", icon: User },
          { label: "लेखक", count: 3, color: "#6BBF8E", icon: User },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}20` }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-jost font-black text-gray-900">{s.count}</p>
              <p className="text-sm font-sarala text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th className="text-left">उपयोगकर्ता</th>
              <th className="text-left">ईमेल</th>
              <th className="text-left">भूमिका</th>
              <th className="text-left">लेख</th>
              <th className="text-left">जुड़े</th>
              <th className="text-left">कार्य</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-jost font-bold text-sm"
                      style={{ backgroundColor: ROLE_COLORS[user.role] }}
                    >
                      {user.name[0]}
                    </div>
                    <span className="font-jost font-semibold text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="text-sm font-sarala text-gray-600">{user.email}</td>
                <td>
                  <span
                    className="category-badge text-white"
                    style={{ backgroundColor: ROLE_COLORS[user.role] }}
                  >
                    {ROLE_LABELS[user.role]}
                  </span>
                </td>
                <td className="text-sm font-jost font-semibold text-gray-700">{user.articles}</td>
                <td className="text-sm font-sarala text-gray-500">{user.joined}</td>
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
