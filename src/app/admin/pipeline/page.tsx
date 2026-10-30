"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Globe,
  Bot,
  Sparkles,
  RefreshCw,
  Trash2,
  LogOut,
  Link2,
  Layers,
  Image as ImageIcon,
  Video,
  ExternalLink,
  Eye,
} from "lucide-react";

export default function PipelinePage() {
  // Mode Tab: "url" (Instant URL/Bulk Importer) vs "manual" (Form)
  const [activeTab, setActiveTab] = useState<"url" | "manual">("url");

  // URL Importer State
  const [urlInput, setUrlInput] = useState("");
  const [urlPlacement, setUrlPlacement] = useState("AUTO");
  const [urlSection, setUrlSection] = useState("AUTO");
  const [scraping, setScraping] = useState(false);
  const [scrapeResults, setScrapeResults] = useState<any[]>([]);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeSuccess, setScrapeSuccess] = useState<string | null>(null);

  // Manual Form State
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
    } catch {
      alert("Error removing story");
    }
  };

  // ── URL INGESTION HANDLER ──
  const handleScrapeAndPublish = async (action: "preview" | "publish") => {
    const urls = urlInput
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.startsWith("http://") || u.startsWith("https://"));

    if (urls.length === 0) {
      setScrapeError("Please paste at least one valid news URL (starting with http:// or https://)");
      return;
    }

    setScraping(true);
    setScrapeError(null);
    setScrapeSuccess(null);
    setScrapeResults([]);

    try {
      const res = await fetch("/api/pipeline/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urls,
          placement: urlPlacement,
          sectionKey: urlSection,
          action,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to process links");
      }

      if (action === "preview") {
        setScrapeResults(data.results || []);
        setScrapeSuccess(`Extracted preview for ${data.count} stories successfully.`);
      } else {
        setScrapeResults(data.published || []);
        setScrapeSuccess(`🎉 ${data.publishedCount} stories published directly to KhabarGanit!`);
        setUrlInput("");
        fetchStatus();
      }
    } catch (err: any) {
      setScrapeError(err.message || "Network error while scraping");
    } finally {
      setScraping(false);
    }
  };

  // ── MANUAL FORM SUBMISSION ──
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
      <div className="max-w-5xl mx-auto">
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
            Publish single or multiple news links directly from PIB, Reuters, BBC, NDTV, or Telegram with instant photo and video extraction.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-300 pb-2">
          <button
            onClick={() => setActiveTab("url")}
            className={`px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === "url"
                ? "border-[#C13A08] text-[#C13A08] bg-white shadow-sm"
                : "border-transparent text-stone-600 hover:text-black bg-stone-200/60"
            }`}
          >
            <Link2 size={15} /> ⚡ Instant URL & Bulk Importer (Links)
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={`px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
              activeTab === "manual"
                ? "border-[#C13A08] text-[#C13A08] bg-white shadow-sm"
                : "border-transparent text-stone-600 hover:text-black bg-stone-200/60"
            }`}
          >
            <Sparkles size={15} /> 📝 Manual News Form
          </button>
        </div>

        {/* Main Grid: Left Column Editor + Right Column Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-6 shadow-sm">
            {/* TAB 1: INSTANT URL & BULK IMPORTER */}
            {activeTab === "url" && (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black">
                  <h2 className="font-playfair font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                    <Link2 size={18} className="text-[#C13A08]" /> Bulk URL Auto-Scraper
                  </h2>
                  <span className="text-[10px] font-serif font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded">
                    PIB · Reuters · Wires
                  </span>
                </div>

                <p className="text-xs font-serif text-stone-600 mb-4 leading-relaxed">
                  Paste one or more news URLs (one per line). The engine will crawl the articles, pull official photos, YouTube videos, full text, and automatically assign the right broadsheet section.
                </p>

                {scrapeSuccess && (
                  <div className="p-3 mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-serif rounded flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                    <span>{scrapeSuccess}</span>
                  </div>
                )}

                {scrapeError && (
                  <div className="p-3 mb-4 bg-red-50 border border-red-300 text-red-800 text-xs font-serif rounded flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0 text-red-600" />
                    <span>{scrapeError}</span>
                  </div>
                )}

                <div className="space-y-4 text-xs font-serif">
                  {/* Settings row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                        Placement Strategy:
                      </label>
                      <select
                        value={urlPlacement}
                        onChange={(e) => setUrlPlacement(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 p-2 font-serif font-bold uppercase text-xs focus:ring-1 focus:ring-black outline-none"
                      >
                        <option value="AUTO">Auto-Distribute (1st Lead, then Side/Top)</option>
                        <option value="LEAD">Front-Page Lead Story</option>
                        <option value="SIDE">Broadsheet Side Story</option>
                        <option value="TOP">Top Stories Carousel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider mb-1 text-stone-700">
                        Category / Section:
                      </label>
                      <select
                        value={urlSection}
                        onChange={(e) => setUrlSection(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 p-2 font-serif font-bold uppercase text-xs focus:ring-1 focus:ring-black outline-none"
                      >
                        <option value="AUTO">Auto-Detect from Article Content</option>
                        <option value="INDIA">INDIA (National)</option>
                        <option value="WORLD">WORLD DISPATCHES</option>
                        <option value="BUSINESS">BUSINESS & MARKETS</option>
                        <option value="TECH">TECH & AI</option>
                        <option value="SPORTS">SPORTS MONITOR</option>
                        <option value="POLITICS">POLITICS & GOVERNANCE</option>
                        <option value="ENTERTAINMENT">ENTERTAINMENT & ARTS</option>
                      </select>
                    </div>
                  </div>

                  {/* Textarea for URLs */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold uppercase tracking-wider text-stone-700">
                        News URLs (One per line):
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setUrlInput(
                            "https://pib.gov.in/PressReleasePage.aspx?PRID=2069812\nhttps://pib.gov.in/PressReleasePage.aspx?PRID=2069820"
                          )
                        }
                        className="text-[10px] text-[#C13A08] hover:underline font-bold"
                      >
                        + Insert Sample PIB Links
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="https://pib.gov.in/PressReleasePage.aspx?PRID=...&#10;https://www.reuters.com/...&#10;https://www.thehindu.com/..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 p-2.5 font-mono text-xs focus:ring-1 focus:ring-black outline-none leading-relaxed"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      type="button"
                      disabled={scraping || !urlInput.trim()}
                      onClick={() => handleScrapeAndPublish("publish")}
                      className="flex-1 bg-black text-white hover:bg-[#C13A08] py-2.5 px-4 font-serif font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {scraping ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" /> Scraping & Publishing...
                        </>
                      ) : (
                        <>
                          <Send size={14} /> Fetch & Publish to KhabarGanit
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={scraping || !urlInput.trim()}
                      onClick={() => handleScrapeAndPublish("preview")}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 py-2.5 px-4 font-serif font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Eye size={14} /> Preview First
                    </button>
                  </div>
                </div>

                {/* Scraped Results Display */}
                {scrapeResults.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-stone-200 space-y-3">
                    <h3 className="font-playfair font-bold text-xs uppercase tracking-wider text-stone-700">
                      Processed News Items ({scrapeResults.length}):
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {scrapeResults.map((item, idx) => {
                        const data = item.data || item;
                        return (
                          <div
                            key={idx}
                            className="bg-stone-50 border border-stone-300 p-3 rounded text-xs font-serif flex gap-3 items-start"
                          >
                            {data.image && (
                              <img
                                src={data.image}
                                alt={data.headline}
                                className="w-20 h-16 object-cover border border-stone-300 rounded shrink-0 bg-stone-200"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider mb-1">
                                <span className="font-bold text-[#C13A08]">
                                  {data.sectionKey || "TRENDING"}
                                </span>
                                <span>·</span>
                                <span className="bg-stone-200 px-1.5 py-0.2 rounded font-semibold text-stone-700">
                                  {data.placement || "TOP"}
                                </span>
                                {data.videoUrl && (
                                  <span className="flex items-center gap-0.5 text-blue-600 font-bold">
                                    <Video size={10} /> Video
                                  </span>
                                )}
                              </div>
                              <h4 className="font-bold text-stone-900 line-clamp-1 leading-snug">
                                {data.headline}
                              </h4>
                              {data.subhead && (
                                <p className="text-stone-600 line-clamp-1 text-[11px] mt-0.5">
                                  {data.subhead}
                                </p>
                              )}
                              <div className="mt-1 flex items-center gap-3 text-[10px] text-stone-400">
                                <span>{data.kicker || "Wire Report"}</span>
                                <span>·</span>
                                <span>{data.paragraphs?.length || 1} paragraphs</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MANUAL NEWS FORM */}
            {activeTab === "manual" && (
              <div>
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
            )}
          </div>

          {/* Right Column: Telegram Bot & Live Activity Log (5 cols) */}
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
                You can publish directly from your mobile phone! Simply send or forward any news link to your Telegram Bot:
              </p>

              <div className="bg-stone-50 border border-stone-200 p-3.5 mb-4 text-xs font-serif space-y-2.5">
                <div className="font-bold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-1.5">
                  <Link2 size={13} className="text-[#C13A08]" />
                  ⚡ Send Links to Bot (@KhabarganitDeskBot):
                </div>
                <p className="text-stone-600">Send 1 or 10 links in a single message:</p>
                <pre className="bg-stone-900 text-emerald-400 p-2 rounded font-mono text-[10px] overflow-x-auto whitespace-pre-wrap">
{`https://pib.gov.in/PressReleasePage.aspx?PRID=...
https://www.reuters.com/...`}
                </pre>
                <p className="text-[11px] text-stone-500">
                  Optional placement commands: <br />
                  <code className="bg-stone-200 text-stone-800 px-1 py-0.5 rounded font-mono">/lead &lt;url&gt;</code> ·{" "}
                  <code className="bg-stone-200 text-stone-800 px-1 py-0.5 rounded font-mono">/side &lt;url&gt;</code> ·{" "}
                  <code className="bg-stone-200 text-stone-800 px-1 py-0.5 rounded font-mono">/top &lt;url&gt;</code>
                </p>
              </div>

              <div className="border-t border-stone-200 pt-3 text-[11px] font-serif text-stone-600 space-y-1.5">
                <div>
                  <strong>Webhook Endpoint:</strong>
                  <div className="font-mono text-[10px] bg-stone-100 p-1 mt-0.5 rounded break-all">
                    https://www.khabarganit.com/api/webhook/telegram
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
                  className="text-[10px] font-serif font-bold uppercase text-stone-500 hover:text-black cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {recentUpdates.length === 0 ? (
                <p className="text-xs font-serif text-stone-500 italic">
                  No dynamic stories published yet today. Stories published via Telegram or URL links will appear here.
                </p>
              ) : (
                <ul className="space-y-2.5 text-xs font-serif">
                  {recentUpdates.slice(0, 6).map((up, i) => (
                    <li key={i} className="pb-2 border-b border-stone-100 last:border-0">
                      <div className="flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-wider mb-0.5">
                        <span className="font-bold text-[#C13A08]">{up.section}</span>
                        <span>
                          {new Date(up.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-stone-900 line-clamp-1">{up.headline}</div>
                        <button
                          onClick={() => handleDelete(up.headline)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 shrink-0 cursor-pointer"
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
