"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Flag,
  TrendingUp,
  Cpu,
  Trophy,
  Landmark,
  Film,
  Flame,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Clock,
  Sparkles,
  Zap,
  BarChart3,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { SectionPageData } from "@/data/newspaperData";

interface CategorySummary {
  key: "TRENDING" | "WORLD" | "INDIA" | "BUSINESS" | "TECH" | "SPORTS" | "POLITICS" | "ENTERTAINMENT";
  name: string;
  hindiName: string;
  icon: any;
  color: string;
  accentBg: string;
  leadHeadline: string;
  leadTimeAgo: string;
  sideCount: number;
  topCount: number;
  digestCount: number;
  status: "Live" | "Updated";
}

const CATEGORY_META = [
  {
    key: "TRENDING" as const,
    name: "Trending (Front Page)",
    hindiName: "ट्रेंडिंग समाचार",
    icon: Flame,
    color: "#C13A08",
    accentBg: "bg-red-50 text-red-700 border-red-200",
  },
  {
    key: "WORLD" as const,
    name: "World",
    hindiName: "विश्व / अंतर्राष्ट्रीय",
    icon: Globe,
    color: "#2563EB",
    accentBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    key: "INDIA" as const,
    name: "India",
    hindiName: "भारत / राष्ट्रीय",
    icon: Flag,
    color: "#D97706",
    accentBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    key: "BUSINESS" as const,
    name: "Business & Economy",
    hindiName: "व्यापार और अर्थव्यवस्था",
    icon: TrendingUp,
    color: "#059669",
    accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    key: "TECH" as const,
    name: "Tech & Innovation",
    hindiName: "तकनीक और नवाचार",
    icon: Cpu,
    color: "#7C3AED",
    accentBg: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    key: "SPORTS" as const,
    name: "Sports",
    hindiName: "खेल जगत",
    icon: Trophy,
    color: "#EA580C",
    accentBg: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    key: "POLITICS" as const,
    name: "Politics",
    hindiName: "राजनीति",
    icon: Landmark,
    color: "#475569",
    accentBg: "bg-slate-50 text-slate-700 border-slate-200",
  },
  {
    key: "ENTERTAINMENT" as const,
    name: "Entertainment",
    hindiName: "मनोरंजन और सिनेमा",
    icon: Film,
    color: "#DB2777",
    accentBg: "bg-pink-50 text-pink-700 border-pink-200",
  },
];

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [pipelineData, setPipelineData] = useState<{
    trending: SectionPageData;
    sections: SectionPageData[];
    updates: any[];
    autoPurgeHours?: number;
  } | null>(null);

  const [purging, setPurging] = useState(false);
  const [purgeFeedback, setPurgeFeedback] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();
      if (data && data.trending) {
        setPipelineData(data);
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleManualPurge = async () => {
    try {
      setPurging(true);
      setPurgeFeedback(null);
      const res = await fetch("/api/admin/purge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: 24 }),
      });
      const data = await res.json();
      if (data.success) {
        setPurgeFeedback(`✅ Success: ${data.prunedCount} stories older than 1 day were purged!`);
        await loadData();
      }
    } catch {
      setPurgeFeedback("Failed to run purge");
    } finally {
      setPurging(false);
      setTimeout(() => setPurgeFeedback(null), 5000);
    }
  };

  // Build high-level summary cards for each of the 8 categories
  const categoriesList: CategorySummary[] = CATEGORY_META.map((meta) => {
    const pageData: SectionPageData | undefined =
      meta.key === "TRENDING"
        ? pipelineData?.trending
        : pipelineData?.sections?.find((s) => s.sectionKey === meta.key);

    return {
      key: meta.key,
      name: meta.name,
      hindiName: meta.hindiName,
      icon: meta.icon,
      color: meta.color,
      accentBg: meta.accentBg,
      leadHeadline: pageData?.leadStory?.headline || "Loading dispatches...",
      leadTimeAgo: pageData?.leadStory?.timeAgo || "Live",
      sideCount: pageData?.sideStories?.length || 3,
      topCount: pageData?.topStories?.length || 4,
      digestCount: pageData?.digestItems?.length || 10,
      status: "Live",
    };
  });

  const totalDispatches = categoriesList.reduce(
    (acc, curr) => acc + 1 + curr.sideCount + curr.topCount,
    0
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Newsroom Status & 1-Day Auto-Purge Indicator */}
      <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
                Live Newsroom Engine
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-sans text-stone-500">
                Automated 1-Day Purge Active
              </span>
            </div>
            <h1 className="font-playfair font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
              Newsroom Dashboard
            </h1>
            <p className="text-sm font-sans text-stone-600 mt-1 max-w-2xl">
              High-level overview of all 8 news categories. Stories older than 1 day (24 hours) automatically expire and disappear from live broadsheets.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleManualPurge}
              disabled={purging}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-2xs disabled:opacity-50"
              title="Manually remove any news older than 1 day"
            >
              <Trash2 size={14} className={purging ? "animate-spin" : "text-stone-600"} />
              <span>{purging ? "Purging..." : "Purge >1 Day News"}</span>
            </button>

            <Link
              href="/admin/pipeline"
              className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all shadow-xs"
            >
              <Zap size={14} className="text-amber-400" />
              <span>Publish News (Pipeline)</span>
            </Link>

            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl transition-all shadow-2xs"
              title="Refresh Data"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {purgeFeedback && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>{purgeFeedback}</span>
          </div>
        )}

        {/* 4 Key Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-stone-100">
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
              Categories
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-playfair font-black text-black">
                8
              </span>
              <span className="text-[11px] font-sans text-stone-600">Active</span>
            </div>
          </div>

          <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
              Live Dispatches
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-playfair font-black text-black">
                {totalDispatches}
              </span>
              <span className="text-[11px] font-sans text-emerald-700 font-medium">Published</span>
            </div>
          </div>

          <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
              Retention Window
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-playfair font-black text-black">
                1 Day
              </span>
              <span className="text-[11px] font-sans text-stone-600">(24 Hours)</span>
            </div>
          </div>

          <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
              Telegram Bot
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-playfair font-black text-emerald-700">
                Online
              </span>
              <span className="text-[11px] font-sans text-stone-600">@KhabarganitBot</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PAGE 1 REQUIREMENT: All News Categories Shown Separately (Not in details)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-playfair font-black text-xl text-black uppercase tracking-tight">
              News Categories (8 Sections)
            </h2>
            <p className="text-xs font-sans text-stone-500">
              Each category is shown separately with live story counts and quick publishing controls.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-stone-500">
            Click any section to publish or view
          </span>
        </div>

        {/* 8 Clean Separate Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.key}
                className="bg-white border border-stone-200 hover:border-black/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                      >
                        <Icon size={17} />
                      </div>
                      <div>
                        <h3 className="font-playfair font-black text-sm text-black uppercase tracking-wide group-hover:text-[#C13A08] transition-colors">
                          {cat.name}
                        </h3>
                        <span className="text-[10px] font-sans text-stone-400 block">
                          {cat.hindiName}
                        </span>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active & Live" />
                  </div>

                  {/* Summary Metric Chips (Not in details) */}
                  <div className="flex items-center gap-1.5 flex-wrap my-3 text-[11px] font-sans">
                    <span className="bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md border border-stone-200">
                      1 Lead
                    </span>
                    <span className="bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md border border-stone-200">
                      {cat.sideCount} Side
                    </span>
                    <span className="bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md border border-stone-200">
                      {cat.topCount} Top
                    </span>
                    <span className="bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md border border-stone-200">
                      10 Digest
                    </span>
                  </div>

                  {/* Lead Headline Preview (Shortened, high-level) */}
                  <div className="mt-2 pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Current Lead Headline
                    </span>
                    <p className="font-serif text-xs font-semibold text-black line-clamp-2 leading-snug">
                      {cat.leadHeadline}
                    </p>
                  </div>
                </div>

                {/* Card Action Links */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-sans">
                  <Link
                    href={`/admin/pipeline?section=${cat.key}`}
                    className="text-black hover:text-[#C13A08] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>+ Publish Here</span>
                    <ArrowRight size={13} />
                  </Link>

                  <Link
                    href={cat.key === "TRENDING" ? "/" : `/?cat=${cat.key}`}
                    target="_blank"
                    className="text-stone-500 hover:text-black flex items-center gap-1"
                    title="View this category live on newspaper"
                  >
                    <span>Live Page</span>
                    <ExternalLink size={11} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Bar: Direct Navigation Shortcuts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <Link
          href="/admin/analytics"
          className="bg-white border border-stone-200 hover:border-black rounded-2xl p-5 shadow-xs transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <BarChart3 size={20} />
          </div>
          <div>
            <h4 className="font-playfair font-black text-sm uppercase text-black group-hover:text-blue-700 transition-colors">
              Visitor Analytics
            </h4>
            <p className="text-xs font-sans text-stone-600 mt-0.5">
              View readers count, last day visitors breakdown, device stats, and section popularity.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/pipeline"
          className="bg-white border border-stone-200 hover:border-black rounded-2xl p-5 shadow-xs transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-playfair font-black text-sm uppercase text-black group-hover:text-amber-700 transition-colors">
              New Pipeline Interface
            </h4>
            <p className="text-xs font-sans text-stone-600 mt-0.5">
              Instant multi-link scraper (PIB, World News), manual story composer, photo matcher, and live story manager.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white border border-stone-200 hover:border-black rounded-2xl p-5 shadow-xs transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-playfair font-black text-sm uppercase text-black group-hover:text-stone-900 transition-colors">
              Settings & 1-Day Retention
            </h4>
            <p className="text-xs font-sans text-stone-600 mt-0.5">
              Adjust auto-purge duration, Telegram bot settings, editorial prefixes, and newsroom credentials.
            </p>
          </div>
        </Link>
      </section>

    </div>
  );
}
