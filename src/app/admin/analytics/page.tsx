"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  TrendingUp,
  Smartphone,
  Laptop,
  Tablet,
  Eye,
  RefreshCw,
  Activity,
} from "lucide-react";

interface AnalyticsData {
  realData: boolean;
  todayCount: number;
  lastDayCount: number;
  totalCount: number;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  sectionBreakdown: Array<{ name: string; count: string; percentage: number }>;
  dailyTrend: Array<{ day: string; visitors: number; isLastDay?: boolean; isToday?: boolean }>;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/analytics/stats", { cache: "no-store" });
      const json = await res.json();
      if (json) {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load real stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const lastDayVisits = data?.lastDayCount ?? 0;
  const todayVisits = data?.todayCount ?? 0;
  const totalVisits = data?.totalCount ?? 0;

  const maxTrend = Math.max(...(data?.dailyTrend?.map((d) => d.visitors) || [1]), 1);

  return (
    <div className="space-y-6 text-black">
      
      {/* Page Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Live Real-Time Reader Counting
            </span>
          </div>
          <h1 className="font-playfair font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
            Visitor Analytics (Real Data Only)
          </h1>
          <p className="text-sm font-sans text-stone-600 mt-1">
            Tracking actual reader visits. Zero dummy or simulated metrics.
          </p>
        </div>

        <button
          onClick={loadStats}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-black border border-stone-300 rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Live Stats</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PAGE 2 KEY REQUIREMENT: HOW MUCH USER VISIT LAST DAY (COUNT & SHOW)
         ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Prominent Last Day Visitors Card */}
        <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Last Day Visitors (Real Count)
              </span>
              <span className="bg-stone-100 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-stone-300">
                YESTERDAY
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-playfair font-black text-black tracking-tight">
              {lastDayVisits.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-stone-600 font-medium mt-2">
              <span>Verified unique reader sessions in the previous 24h window</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-400 mt-4 pt-3 border-t border-stone-100">
            Counted directly from client telemetry beacons.
          </p>
        </div>

        {/* Today's Visitors Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Today&apos;s Visitors (Real Count)
              </span>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-playfair font-black text-black tracking-tight">
              {todayVisits.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-stone-600 font-medium mt-2">
              <span>Live sessions recorded today</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-400 mt-4 pt-3 border-t border-stone-100">
            Updates in real-time as readers open the website.
          </p>
        </div>

        {/* Total Page Views */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500">
                Total Recorded Visits
              </span>
              <Eye size={16} className="text-stone-400" />
            </div>
            <div className="text-4xl sm:text-5xl font-playfair font-black text-black tracking-tight">
              {totalVisits.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-stone-600 font-medium mt-2">
              <span>Cumulative reader engagements logged</span>
            </div>
          </div>
          <p className="text-[11px] font-sans text-stone-400 mt-4 pt-3 border-t border-stone-100">
            Real visitor data only. No simulated records.
          </p>
        </div>
      </div>

      {/* Daily Visitor Trend Chart */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              Real Visitor Count Trend (Last 5 Days)
            </h3>
            <p className="text-xs font-sans text-stone-500">
              Comparing yesterday (Last Day) against surrounding daily traffic.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-black bg-stone-100 px-3 py-1 rounded-xl border border-stone-200">
            Actual Telemetry
          </span>
        </div>

        {/* Bar Chart Representation */}
        <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-48 pt-6 pb-2 border-b border-stone-200">
          {(data?.dailyTrend || []).map((item, idx) => {
            const pct = Math.max(Math.round((item.visitors / maxTrend) * 100), 12);

            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <span className="text-xs font-mono font-bold text-stone-900 mb-2">
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
                  style={{ height: `${pct}%` }}
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
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs font-sans text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#C13A08]" />
            <span>Last Day (Yesterday): <strong>{lastDayVisits.toLocaleString("en-IN")} visitors</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-black" />
            <span>Today (Live): <strong>{todayVisits.toLocaleString("en-IN")} visitors</strong></span>
          </div>
        </div>
      </section>

      {/* Grid: Real Category Popularity & Real Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Real Category Views Share (7 cols) */}
        <section className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
          <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight mb-1">
            Real Section Popularity Breakdown
          </h3>
          <p className="text-xs font-sans text-stone-500 mb-5">
            Actual visits recorded across news sections.
          </p>

          <div className="space-y-4">
            {(data?.sectionBreakdown || []).length > 0 ? (
              data!.sectionBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-semibold text-black uppercase">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500 font-mono">{cat.count}</span>
                      <span className="font-bold text-black w-8 text-right font-mono">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{ width: `${Math.max(cat.percentage, 4)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-400 font-sans py-4">
                Telemetry initializing. Section views will appear as readers navigate the broadsheet.
              </p>
            )}
          </div>
        </section>

        {/* Real Device Breakdown (5 cols) */}
        <section className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-playfair font-black text-lg text-black uppercase tracking-tight mb-1">
              Real Device Breakdown
            </h3>
            <p className="text-xs font-sans text-stone-500 mb-5">
              Detected from actual reader user-agents.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-black">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black">Mobile Phones</h4>
                    <p className="text-[11px] text-stone-500">Android & iOS</p>
                  </div>
                </div>
                <span className="text-base font-mono font-black text-black">
                  {data?.deviceBreakdown?.mobile ?? 0}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-black">
                    <Laptop size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black">Desktop / Laptop</h4>
                    <p className="text-[11px] text-stone-500">Windows & Mac</p>
                  </div>
                </div>
                <span className="text-base font-mono font-black text-black">
                  {data?.deviceBreakdown?.desktop ?? 0}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-black">
                    <Tablet size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black">Tablets</h4>
                    <p className="text-[11px] text-stone-500">iPads & Tablets</p>
                  </div>
                </div>
                <span className="text-base font-mono font-black text-black">
                  {data?.deviceBreakdown?.tablet ?? 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-stone-100 rounded-2xl text-[11px] font-sans text-stone-600">
            Zero fake numbers. Connected directly to live telemetry API.
          </div>
        </section>

      </div>

    </div>
  );
}
