"use client";

import { useState } from "react";
import { ArrowLeft, Image as ImageIcon, Eye, Save } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [breaking, setBreaking] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/articles" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-jost font-black text-gray-900">नया लेख लिखें</h1>
          <p className="text-sm font-sarala text-gray-500">सभी फ़ील्ड भरें और प्रकाशित करें</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5">
              {/* Title */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="लेख का शीर्षक लिखें..."
                className="w-full text-xl font-jost font-bold text-gray-900 placeholder-gray-300 border-0 outline-none border-b-2 border-gray-100 pb-3 mb-4 focus:border-[#E84A0C] transition-colors"
              />

              {/* Excerpt */}
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="संक्षिप्त विवरण (150 शब्द तक)..."
                rows={3}
                className="w-full font-sarala text-gray-700 placeholder-gray-300 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#E84A0C] transition-colors mb-4 resize-none"
              />

              {/* Editor tabs */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setActiveTab("write")}
                  className={`px-4 py-1.5 rounded font-jost font-semibold text-sm transition-colors ${activeTab === "write" ? "bg-[#E84A0C] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  ✏️ लिखें
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-1.5 rounded font-jost font-semibold text-sm transition-colors ${activeTab === "preview" ? "bg-[#E84A0C] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Eye size={14} className="inline mr-1" />प्रीव्यू
                </button>
              </div>

              {/* Toolbar */}
              {activeTab === "write" && (
                <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-gray-100">
                  {["B", "I", "U", "H1", "H2", "H3", '""', "🔗", "IMG", "≡", "—"].map((btn) => (
                    <button
                      key={btn}
                      className="px-2.5 py-1 text-xs font-jost font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}

              {/* Content */}
              {activeTab === "write" ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="यहाँ लेख लिखें..."
                  rows={18}
                  className="w-full font-sarala text-gray-700 placeholder-gray-300 border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:border-[#E84A0C] transition-colors resize-y"
                />
              ) : (
                <div className="min-h-64 border border-gray-200 rounded-lg p-4">
                  {content ? (
                    <div className="prose max-w-none font-sarala text-gray-800">
                      <h1 className="font-jost">{title}</h1>
                      <p className="text-gray-500">{excerpt}</p>
                      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }} />
                    </div>
                  ) : (
                    <p className="text-gray-400 font-sarala">प्रीव्यू के लिए कुछ लिखें...</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <label className="block font-jost font-semibold text-sm text-gray-700 mb-2">
              <ImageIcon size={14} className="inline mr-2" />मुख्य छवि URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]"
            />
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="mt-3 rounded-lg w-full h-40 object-cover" />
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <label className="block font-jost font-semibold text-sm text-gray-700 mb-2">टैग्स</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="GDP, अर्थव्यवस्था, भारत (कॉमा से अलग करें)"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]"
            />
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-jost font-bold text-sm text-gray-900 mb-4 uppercase tracking-wide">प्रकाशन</h3>
            <div className="space-y-3 mb-5">
              {[
                { value: "DRAFT", label: "ड्राफ्ट" },
                { value: "PUBLISHED", label: "प्रकाशित" },
                { value: "ARCHIVED", label: "संग्रहित" },
              ].map((s) => (
                <label key={s.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={s.value}
                    checked={status === s.value}
                    onChange={() => setStatus(s.value)}
                    className="accent-[#E84A0C]"
                  />
                  <span className="text-sm font-jost text-gray-700">{s.label}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2 pb-4 border-b border-gray-100 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={breaking}
                  onChange={(e) => setBreaking(e.target.checked)}
                  className="accent-[#E84A0C]"
                />
                <span className="text-sm font-jost text-gray-700">🔴 ब्रेकिंग न्यूज़</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-[#E84A0C]"
                />
                <span className="text-sm font-jost text-gray-700">⭐ फीचर्ड</span>
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-bold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Save size={15} /> प्रकाशित करें
              </button>
              <button className="w-full border border-gray-300 text-gray-600 font-jost font-semibold text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                ड्राफ्ट सेव करें
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-jost font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide">विभाग</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]"
            >
              <option value="">विभाग चुनें</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* SEO Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-jost font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide">SEO प्रीव्यू</h3>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <p className="text-[#1a0dab] text-sm font-jost mb-1 truncate">{title || "लेख का शीर्षक"}</p>
              <p className="text-[#006621] text-xs font-sarala mb-1">khabarganit.in/article/...</p>
              <p className="text-gray-600 text-xs font-sarala line-clamp-2">{excerpt || "लेख का संक्षिप्त विवरण यहाँ दिखेगा..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
