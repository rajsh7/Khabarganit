import { FileText, Eye, Users, TrendingUp, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { SAMPLE_ARTICLES } from "@/lib/constants";
import { formatRelativeDate, formatViews } from "@/lib/utils";

function StatCard({
  label,
  value,
  change,
  positive,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-jost font-semibold ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-jost font-black text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-sarala text-gray-500">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const stats = [
    { label: "कुल लेख", value: "1,247", change: "+12%", positive: true, icon: FileText, color: "#E84A0C" },
    { label: "आज के पाठक", value: "84,320", change: "+8.3%", positive: true, icon: Eye, color: "#5B9BD5" },
    { label: "पंजीकृत उपयोगकर्ता", value: "12,845", change: "+5.1%", positive: true, icon: Users, color: "#6BBF8E" },
    { label: "मासिक ट्रैफिक", value: "24.5L", change: "-2.4%", positive: false, icon: TrendingUp, color: "#F5A623" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-jost font-black text-gray-900">डैशबोर्ड</h1>
          <p className="text-sm font-sarala text-gray-500 mt-1">खबरगणित CRM — नमस्ते, Admin!</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> नया लेख
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-jost font-bold text-gray-900">हाल के लेख</h2>
            <Link href="/admin/articles" className="text-xs font-jost text-[#E84A0C] hover:text-[#C13A08]">
              सब देखें →
            </Link>
          </div>
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">शीर्षक</th>
                <th className="text-left">विभाग</th>
                <th className="text-left">स्थिति</th>
                <th className="text-left">पाठक</th>
                <th className="text-left">समय</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ARTICLES.map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link href={`/admin/articles/${a.id}`} className="font-jost text-sm text-gray-800 hover:text-[#E84A0C] transition-colors line-clamp-1">
                      {a.title}
                    </Link>
                  </td>
                  <td>
                    <span
                      className="category-badge text-white text-xs"
                      style={{ backgroundColor: a.category.color }}
                    >
                      {a.category.name}
                    </span>
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-xs font-jost font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                      ● प्रकाशित
                    </span>
                  </td>
                  <td className="text-sm font-jost text-gray-600">{formatViews(a.views)}</td>
                  <td className="text-xs font-jost text-gray-400">
                    {a.publishedAt ? formatRelativeDate(a.publishedAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Stats Panel */}
        <div className="space-y-5">
          {/* Top Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-jost font-bold text-gray-900">विभाग प्रदर्शन</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { name: "राष्ट्रीय", pct: 82, color: "#E84A0C" },
                { name: "खेल", pct: 74, color: "#6BBF8E" },
                { name: "तकनीक", pct: 68, color: "#00BCD4" },
                { name: "व्यापार", pct: 55, color: "#F5A623" },
                { name: "मनोरंजन", pct: 91, color: "#E91E63" },
              ].map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm font-jost mb-1">
                    <span className="text-gray-700">{cat.name}</span>
                    <span className="font-semibold text-gray-900">{cat.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-jost font-bold text-gray-900">त्वरित कार्य</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { label: "नया लेख", href: "/admin/articles/new", icon: "✏️" },
                { label: "विभाग जोड़ें", href: "/admin/categories/new", icon: "📂" },
                { label: "उपयोगकर्ता", href: "/admin/users", icon: "👥" },
                { label: "विज्ञापन", href: "/admin/ads", icon: "📢" },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-[#E84A0C] hover:bg-orange-50 transition-colors text-center"
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-xs font-jost font-semibold text-gray-700">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
