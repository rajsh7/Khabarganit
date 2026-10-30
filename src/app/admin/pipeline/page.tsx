"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, ArrowLeft, Globe, Bot, Sparkles, RefreshCw, Trash2, LogOut } from "lucide-react";

export default function PipelinePage() {
  const [section, setSection] = useState("TRENDING");
  const [placement, setPlacement] = useState("LEAD");
  const [kicker, setKicker] = useState("");
  const [headline, setHeadline] = useState("");
  const [subhead, setSubhead] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [story, setStory] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [recentUpdates, setRecentUpdates] = useState<any[]>([]);

  const fetchStatus = () => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.updates) {
          setRecentUpdates(data.updates);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleDelete = async (hl: string) => {
    if (!confirm(`Are you sure you want to remove "${hl}" from the broadsheet?`)) return;
    try {
      const res = await fetch(`/api/news?headline=${encodeURIComponent(hl)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message);
        fetchStatus();
      } else {
        alert(data.error || data.message || "Failed to remove story");
      }
    } catch (err) {
      alert("Error removing story");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) {
      alert("Please enter a headline");
      return;
    }

    setSubmitting(true);
    setResult(null);

    const paragraphs = story
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: section,
          placement,
          kicker: kicker || undefined,
          headline,
          subhead: subhead || undefined,
          image: imageUrl || undefined,
          paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult({ success: true, message: data.message });
        setHeadline("");
        setSubhead("");
        setStory("");
        setKicker("");
        fetchStatus();
      } else {
        setResult({ success: false, message: data.error || "Failed to publish" });
      }
    } catch (err: any) {
      setResult({ success: false, message: err.message || "Network error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-300">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-stone-700 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} /> Back to Broadsheet
            </Link>
            <span className="text-stone-300">|</span>
            <button
              onClick={async () => {
                await fetch("/api/admin/auth/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className="flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
              title="Sign Out of Newsroom"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-stone-600">
              Live Auto-Pipeline Active
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-playfair font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-2">
            KhabarGanit Auto-News Publishing Pipeline
          </h1>
          <p className="text-stone-600 text-sm font-serif">
            Publish news directly to your live newspaper from this dashboard or directly via Telegram Bot without needing an AI agent or code commits.
          </p>
        </div>

        {/* Two-Column Grid: Web Form + Telegram Bot Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Web Publishing Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-black">
              <h2 className="font-playfair font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={16} className="text-[#C13A08]" /> Quick Web Publisher
              </h2>
            </div>

            {result && (
              <div
                className={`p-3.5 mb-5 rounded border text-xs font-serif flex items-center gap-2 ${
                  result.success
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-red-50 border-red-300 text-red-800"
                }`}
              >
                {result.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{result.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-serif">
              {/* Section & Placement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                    Newspaper Section:
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 p-2 font-serif font-bold uppercase text-xs focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="TRENDING">TRENDING FRONT PAGE</option>
                    <option value="INDIA">INDIA (National)</option>
                    <option value="WORLD">WORLD DISPATCHES</option>
                    <option value="BUSINESS">BUSINESS & MARKETS</option>
                    <option value="TECH">TECH & AI</option>
                    <option value="SPORTS">SPORTS MONITOR</option>
                    <option value="POLITICS">POLITICS & GOVERNANCE</option>
                    <option value="ENTERTAINMENT">ENTERTAINMENT & ARTS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                    Placement Position:
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 p-2 font-serif font-bold uppercase text-xs focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="LEAD">Main Lead Story (Left Column)</option>
                    <option value="SIDE">Side Story (Right Column)</option>
                    <option value="TOP">Top Story (Domain Dispatch)</option>
                    <option value="DIGEST">Top 10 Digest Item</option>
                  </select>
                </div>
              </div>

              {/* Kicker / Tag */}
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                  Kicker / Topic Tag (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. BREAKING BULLETIN · NEW DELHI"
                  value={kicker}
                  onChange={(e) => setKicker(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 font-serif text-xs focus:ring-1 focus:ring-black outline-none"
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                  Headline <span className="text-red-600">*</span>:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter the main headline in uppercase or mixed case"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 font-playfair font-bold text-sm focus:ring-1 focus:ring-black outline-none uppercase"
                />
              </div>

              {/* Subhead */}
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                  Sub-headline / Summary:
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary sentence..."
                  value={subhead}
                  onChange={(e) => setSubhead(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 font-serif text-xs focus:ring-1 focus:ring-black outline-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                  Image URL (Optional):
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or /images/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 font-mono text-xs focus:ring-1 focus:ring-black outline-none"
                />
              </div>

              {/* Story Body Paragraphs */}
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                  Story Paragraphs (Separate with double line break):
                </label>
                <textarea
                  rows={5}
                  placeholder="First paragraph of in-depth reporting...&#10;&#10;Second paragraph covering official statements and background..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 font-serif text-xs focus:ring-1 focus:ring-black outline-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white hover:bg-[#C13A08] py-2.5 px-4 font-serif font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> Publishing...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Publish Story to Live Broadsheet
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Telegram Bot Pipeline Connection (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Telegram Card */}
            <div className="bg-white border-2 border-black p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-black">
                <Bot size={18} className="text-[#0088cc]" />
                <h2 className="font-playfair font-bold text-lg uppercase tracking-wider">
                  Telegram Bot Auto-Pipeline
                </h2>
              </div>

              <p className="text-xs font-serif text-stone-700 leading-relaxed mb-4">
                You can publish directly from your mobile phone on Telegram! Send a photo with a caption or send text, and it updates the live broadsheet instantly.
              </p>

              <div className="bg-stone-50 border border-stone-200 p-3.5 mb-4 text-xs font-serif space-y-2">
                <div className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1">
                  How to Publish via Telegram:
                </div>
                <p className="text-stone-600">Send text or attach a photo with this message format:</p>
                <pre className="bg-stone-900 text-emerald-400 p-2.5 rounded font-mono text-[10px] overflow-x-auto whitespace-pre-wrap">
{`Headline: ISRO Clears Launch Timeline
Section: TECH
Placement: LEAD
Subhead: Mission approved for next quarter
Story: First paragraph of reporting...

Second paragraph of reporting...`}
                </pre>
              </div>

              <div className="border-t border-stone-200 pt-3 text-[11px] font-serif text-stone-600 space-y-1.5">
                <div>
                  <strong>Webhook Endpoint:</strong>
                  <div className="font-mono text-[10px] bg-stone-100 p-1 mt-0.5 rounded break-all">
                    https://www.khabarganit.com/api/webhook/telegram
                  </div>
                </div>
                <div>
                  <strong>Setup Helper:</strong>
                  <div className="font-mono text-[10px] bg-stone-100 p-1 mt-0.5 rounded break-all">
                    /api/webhook/telegram/setup?token=BOT_TOKEN
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Live Updates Activity Log */}
            <div className="bg-white border-2 border-black p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-black">
                <h3 className="font-playfair font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Globe size={14} className="text-[#C13A08]" /> Recent Pipeline Stories
                </h3>
                <button
                  onClick={fetchStatus}
                  className="text-[10px] font-serif font-bold uppercase text-stone-500 hover:text-black"
                >
                  Refresh
                </button>
              </div>

              {recentUpdates.length === 0 ? (
                <p className="text-xs font-serif text-stone-500 italic">
                  No dynamic stories published yet today. Stories published via Telegram or this form will appear here.
                </p>
              ) : (
                <ul className="space-y-2.5 text-xs font-serif">
                  {recentUpdates.slice(0, 5).map((up, i) => (
                    <li key={i} className="pb-2 border-b border-stone-100 last:border-0">
                      <div className="flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-wider mb-0.5">
                        <span className="font-bold text-[#C13A08]">{up.section}</span>
                        <span>{new Date(up.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-stone-900 line-clamp-1">{up.headline}</div>
                        <button
                          onClick={() => handleDelete(up.headline)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 shrink-0"
                          title="Remove from Broadsheet"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
