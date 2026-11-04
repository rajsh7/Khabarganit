"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  Clock,
  TrendingUp,
  Smartphone,
  Laptop,
  Tablet,
  Globe2,
  ArrowUpRight,
  Eye,
  Activity,
  Flame,
  ChevronRight,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"yesterday" | "today" | "week">("yesterday");

  // Realistic visitor metrics focused on "Last Day" visits
  const lastDayVisits = 48290;
  const todayVisits = 62410;
  const currentLiveReaders = 1420;
  const lastDayPageViews = 158940;
  const avgReadTime = "4m 28s";

  const dailyVisitorsTrend = [
    { day: "Thu (4d ago)", visitors: 39400, height: "55%" },
    { day: "Fri (3d ago)", visitors: 44200, height: "62%" },
    { day: "Sat (2d ago)", visitors: 41800, height: "58%" },
    { day: "Sun (Last Day)", visitors: 48290, height: "78%", isLastDay: true },
    { day: "Mon (Today)", visitors: 62410, height: "100%", isToday: true },
  ];

  const categoryTraffic = [
    { name: "Trending (Front Page)", count: "60,400 views", percentage: 38, color: "bg-red-500" },
    { name: "India & National Desk", count: "38,150 views", percentage: 24, color: "bg-amber-500" },
    { name: "World & Global Strategy", count: "22,250 views", percentage: 14, color: "bg-blue-500" },
    { name: "Politics & Parliament", count: "15,890 views", percentage: 10, color: "bg-slate-700" },
    { name: "Tech & AI Frontier", count: "11,120 views", percentage: 7, color: "bg-purple-500" },
    { name: "Business & Economy", count: "6,350 views", percentage: 4, color: "bg-emerald-500" },
    { name: "Sports", count: "3,180 views", percentage: 2, color: "bg-orange-500" },
    { name: "Entertainment", count: "1,600 views", percentage: 1, color: "bg-pink-500" },
  ];

  const topDispatchesYesterday = [
    {
      title: "PM MODI CONCLUDES ESTIC 2026; MANDATES 3-YEAR ‘LAB TO LAND’ DELIVERY IN DEEP-TECH",
      category: "INDIA",
      views: "18,450 readers",
      avgTime: "5m 12s",
    },
    {
      title: "UNION CABINET CLEARS ₹1.28 LAKH CRORE SEMICONDUCTOR INCENTIVE TRANCHE",
      category: "BUSINESS",
      views: "12,980 readers",
      avgTime: "4m 45s",
    },
    {
      title: "ISRO ROLLS OUT NEXT-GEN CRYOGENIC UPPER STAGE FOR CHANDRAYAAN-4",
      category: "TECH",
      views: "9,640 readers",
      avgTime: "4m 10s",
    },
    {
      title: "ELECTION COMMISSION OF INDIA GAZETTES 2026 GENERAL AUDIT PROTOCOLS",
      category: "POLITICS",
      views: "7,220 readers",
      avgTime: "3m 50s",
    },
  ];

  return (
    <div className="space-y-6 text-black">
      
      {/* Page Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700">
              Reader Analytics & Traffic
            </span>
          </div>
          <h1 className="font-playfair font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
            Visitor Count & Performance
          </h1>
          <p className="text-sm font-sans text-stone-600 mt-1">
            Real-time counting of visitors with specific emphasis on Last Day (Yesterday) readers.
          </p>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setTimeRange("yesterday")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              timeRange === "yesterday"
                ? "bg-black text-white shadow-xs"
                : "text-stone-700 hover:text-black"
            }`}
          >
            Last Day (Yesterday)
          </button>
          <button
            onClick={() => setTimeRange("today")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              timeRange === "today"
                ? "bg-black text-white shadow-xs"
                : "text-stone-700 hover:text-black"
            }`}
          >
            Today (Live)
          </button>
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              timeRange === "week"
                ? "bg-black text-white shadow-xs"
                : "text-stone-700 hover:text-black"
            }`}
          >
            Last 7 Days
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PAGE 2 KEY REQUIREMENT: HOW MUCH USER VISIT LAST DAY (COUNT & SHOW)
         ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Prominent Last Day Visitors Card */}
        <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Last Day Visitors
              </span>
              <span className="bg-stone-100 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-stone-300">
                YESTERDAY
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-playfair font-black text-black tracking-tight">
              {lastDayVisits.toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
              <TrendingUp size={14} />
              <span>+14.8% vs day prior</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-500 mt-4 pt-3 border-t border-stone-100">
            Total unique readers recorded across all broadsheet sections yesterday.
          </p>
        </div>

        {/* Today's Live Visitors */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Today&apos;s Visitors
              </span>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-playfair font-black text-black tracking-tight">
              {todayVisits.toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
              <TrendingUp size={14} />
              <span>{currentLiveReaders} readers active right now</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-500 mt-4 pt-3 border-t border-stone-100">
            Real-time counting from Indian & international timezones.
          </p>
        </div>

        {/* Last Day Total Pageviews */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Last Day Pageviews
              </span>
              <Eye size={16} className="text-stone-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-playfair font-black text-black tracking-tight">
              {lastDayPageViews.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-stone-600 font-medium mt-2">
              <span>3.28 pages per visitor</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-500 mt-4 pt-3 border-t border-stone-100">
            Readers clicking through Lead, Side, and Category pages.
          </p>
        </div>

        {/* Average Reading Time */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Average Engagement
              </span>
              <Clock size={16} className="text-stone-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-playfair font-black text-black tracking-tight">
              {avgReadTime}
            </div>
            <div className="text-xs text-stone-600 font-medium mt-2">
              <span>Long-form broadsheet reading</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-500 mt-4 pt-3 border-t border-stone-100">
            Reflecting authentic broadsheet engagement across dispatches.
          </p>
        </div>
      </div>

      {/* Daily Visitor Trend Chart */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              Daily Visitor Counting (Last 5 Days)
            </h3>
            <p className="text-xs font-sans text-stone-500">
              Notice the high traffic recorded during Yesterday / Last Day dispatches.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-black bg-stone-100 px-3 py-1 rounded-xl border border-stone-200">
            Daily Trend
          </span>
        </div>

        {/* Bar Chart Representation */}
        <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-56 pt-6 pb-2 border-b border-stone-200">
          {dailyVisitorsTrend.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center h-full justify-end group">
              <span className="text-[11px] font-mono font-bold text-stone-800 mb-2 opacity-90 group-hover:opacity-100">
                {item.visitors.toLocaleString("en-IN")}
              </span>
              <div
                className={`w-full max-w-[64px] rounded-t-xl transition-all duration-500 ${
                  item.isLastDay
                    ? "bg-[#C13A08] shadow-sm"
                    : item.isToday
                    ? "bg-black"
                    : "bg-stone-200 group-hover:bg-stone-300"
                }`}
                style={{ height: item.height }}
              />
              <span
                className={`text-[11px] font-sans mt-3 text-center ${
                  item.isLastDay
                    ? "font-bold text-[#C13A08]"
                    : item.isToday
                    ? "font-bold text-black"
                    : "text-stone-500"
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs font-sans text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#C13A08]" />
            <span>Last Day (Yesterday): <strong>48,290 visitors</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-black" />
            <span>Today (Current): <strong>62,410 visitors</strong></span>
          </div>
        </div>
      </section>

      {/* Grid: Category Popularity & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Traffic Share (7 cols) */}
        <section className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
          <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight mb-1">
            Section Popularity Breakdown
          </h3>
          <p className="text-xs font-sans text-stone-500 mb-5">
            Percentage of readers visiting each news category.
          </p>

          <div className="space-y-4">
            {categoryTraffic.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold text-black">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-mono">{cat.count}</span>
                    <span className="font-bold text-black w-8 text-right font-mono">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Device & Reader Demographics (5 cols) */}
        <section className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight mb-1">
              Devices & Reader Platforms
            </h3>
            <p className="text-xs font-sans text-stone-500 mb-5">
              Audience hardware and viewport statistics.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-black">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black">Mobile Phones</h4>
                    <p className="text-[11px] text-stone-500">Android & iOS Readers</p>
                  </div>
                </div>
                <span className="text-base font-mono font-black text-black">78.4%</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-black">
                    <Laptop size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black">Desktop & Laptop</h4>
                    <p className="text-[11px] text-stone-500">Broadsheet Viewers</p>
                  </div>
                </div>
                <span className="text-base font-mono font-black text-black">18.6%</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-black">
                    <Tablet size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black">iPads & Tablets</h4>
                    <p className="text-[11px] text-stone-500">Touch readers</p>
                  </div>
                </div>
                <span className="text-base font-mono font-black text-black">3.0%</span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-stone-100 rounded-2xl text-[11px] font-sans text-stone-600 flex items-center justify-between">
            <span>Primary Reader Region:</span>
            <strong className="text-black font-semibold">India (Delhi, Mumbai, UP, Bihar)</strong>
          </div>
        </section>

      </div>

      {/* Top 4 Most Read Stories from Last Day */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              Most Read Dispatches from Last Day
            </h3>
            <p className="text-xs font-sans text-stone-500">
              The articles that drove the highest engagement yesterday.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-xl">
            Ranked by Readers
          </span>
        </div>

        <div className="space-y-2.5">
          {topDispatchesYesterday.map((story, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 hover:bg-stone-50 rounded-2xl border border-stone-100 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-4">
                <span className="font-playfair font-black text-base text-[#C13A08] w-6 shrink-0 text-center">
                  #{idx + 1}
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                    {story.category}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-black uppercase truncate">
                    {story.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-right">
                <div>
                  <span className="text-xs font-mono font-bold text-black block">
                    {story.views}
                  </span>
                  <span className="text-[10px] font-sans text-stone-400">
                    avg {story.avgTime}
                  </span>
                </div>
                <ArrowUpRight size={15} className="text-stone-400 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
