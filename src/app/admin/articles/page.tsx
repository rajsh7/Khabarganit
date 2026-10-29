"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import { SAMPLE_ARTICLES } from "@/lib/constants";
import { formatRelativeDate, formatViews } from "@/lib/utils";

export default function AdminArticlesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = SAMPLE_ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-jost font-black text-gray-900">लेख प्रबंधन</h1>
          <p className="text-sm font-sarala text-gray-500 mt-1">सभी प्रकाशित और ड्राफ्ट लेख</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> नया लेख
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="लेख खोजें..."
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]"
          />
        </div>
        <div className="flex gap-2">
          {["all", "published", "draft", "breaking"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-jost font-medium transition-colors ${
                filter === f
                  ? "bg-[#E84A0C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "सभी" : f === "published" ? "प्रकाशित" : f === "draft" ? "ड्राफ्ट" : "ब्रेकिंग"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th className="text-left" style={{ width: "40%" }}>शीर्षक</th>
              <th className="text-left">विभाग</th>
              <th className="text-left">लेखक</th>
              <th className="text-left">स्थिति</th>
              <th className="text-left">पाठक</th>
              <th className="text-left">प्रकाशन</th>
              <th className="text-left">कार्य</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>
                  <div>
                    <Link
                      href={`/admin/articles/${a.id}`}
                      className="font-jost font-semibold text-sm text-gray-800 hover:text-[#E84A0C] transition-colors line-clamp-2"
                    >
                      {a.title}
                    </Link>
                    {a.breaking && (
                      <span className="inline-block mt-1 text-xs text-red-500 font-jost font-bold">🔴 BREAKING</span>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className="category-badge text-white text-xs whitespace-nowrap"
                    style={{ backgroundColor: a.category.color }}
                  >
                    {a.category.name}
                  </span>
                </td>
                <td className="text-sm font-sarala text-gray-600 whitespace-nowrap">{a.author.name}</td>
                <td>
                  <span className="inline-flex items-center gap-1 text-xs font-jost font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded whitespace-nowrap">
                    ● प्रकाशित
                  </span>
                </td>
                <td className="text-sm font-jost text-gray-600">{formatViews(a.views)}</td>
                <td className="text-xs font-jost text-gray-400 whitespace-nowrap">
                  {a.publishedAt ? formatRelativeDate(a.publishedAt) : "—"}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link href={`/article/${a.slug}`} className="p-1.5 text-gray-400 hover:text-[#5B9BD5] hover:bg-blue-50 rounded transition-colors" title="देखें">
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/articles/${a.id}/edit`} className="p-1.5 text-gray-400 hover:text-[#E84A0C] hover:bg-orange-50 rounded transition-colors" title="संपादित करें">
                      <Edit2 size={14} />
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="हटाएं">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm font-sarala text-gray-500">
          {filtered.length} में से 1–{Math.min(10, filtered.length)} लेख दिखाए जा रहे हैं
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-9 h-9 rounded-lg font-jost font-bold text-sm transition-colors ${
                p === 1
                  ? "bg-[#E84A0C] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#E84A0C]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
