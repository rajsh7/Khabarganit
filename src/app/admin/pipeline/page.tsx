"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Zap,
  FileText,
  Image as ImageIcon,
  Trash2,
  Send,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Clock,
  Layers,
  ArrowRight,
  Video,
  Eye,
} from "lucide-react";
import { SectionPageData } from "@/data/newspaperData";

type CategoryKey = "TRENDING" | "WORLD" | "INDIA" | "BUSINESS" | "TECH" | "SPORTS" | "POLITICS" | "ENTERTAINMENT";
type PlacementKey = "LEAD" | "SIDE" | "TOP" | "DIGEST";

function PipelineContent() {
  const searchParams = useSearchParams();
  const initialSection = (searchParams.get("section")?.toUpperCase() as CategoryKey) || "TRENDING";

  const [activeTab, setActiveTab] = useState<"url" | "manual" | "photo" | "manage">("url");

  // Tab 1: Instant URL Scraper State
  const [urlInput, setUrlInput] = useState("");
  const [urlPlacement, setUrlPlacement] = useState<"AUTO" | "LEAD" | "SIDE" | "TOP">("AUTO");
  const [urlSection, setUrlSection] = useState<"AUTO" | CategoryKey>("AUTO");
  const [scraping, setScraping] = useState(false);
  const [scrapeResults, setScrapeResults] = useState<any[] | null>(null);

  // Tab 2: Manual Composer State
  const [manualSection, setManualSection] = useState<CategoryKey>(initialSection);
  const [manualPlacement, setManualPlacement] = useState<PlacementKey>("LEAD");
  const [manualHeadline, setManualHeadline] = useState("");
  const [manualSubhead, setManualSubhead] = useState("");
  const [manualKicker, setManualKicker] = useState("");
  const [manualStory, setManualStory] = useState("");
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [manualVideoUrl, setManualVideoUrl] = useState("");
  const [manualAuthor, setManualAuthor] = useState("KhabarGanit Senior Desk");
  const [manualPublishing, setManualPublishing] = useState(false);

  // Tab 3: Photo Matcher State
  const [photoHeadline, setPhotoHeadline] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [attachingPhoto, setAttachingPhoto] = useState(false);

  // Status & Live Data
  const [liveData, setLiveData] = useState<{
    trending: SectionPageData;
    sections: SectionPageData[];
    updates: any[];
  } | null>(null);
  const [loadingLive, setLoadingLive] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadLiveData = async () => {
    try {
      setLoadingLive(true);
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();
      if (data?.trending) {
        setLiveData(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoadingLive(false);
    }
  };

  useEffect(() => {
    loadLiveData();
  }, []);

  // Handler: Scrape & Ingest URLs
  const handleScrapePublish = async () => {
    if (!urlInput.trim()) {
      setFeedback({ type: "error", text: "Please paste at least one valid news URL." });
      return;
    }

    try {
      setScraping(true);
      setFeedback(null);
      setScrapeResults(null);

      const res = await fetch("/api/pipeline/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: urlInput,
          placement: urlPlacement,
          sectionKey: urlSection,
          action: "publish",
        }),
      });

      const data = await res.json();

      if (data.ok && data.published) {
        setScrapeResults(data.published);
        setFeedback({
          type: "success",
          text: `🎉 Successfully ingested & published ${data.published.length} story/stories to the broadsheet!`,
        });
        setUrlInput("");
        await loadLiveData();
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to extract news content from the provided URLs.",
        });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error while scraping. Please verify URLs." });
    } finally {
      setScraping(false);
    }
  };

  // Handler: Manual Dispatch Publish
  const handleManualPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualHeadline.trim()) {
      setFeedback({ type: "error", text: "Headline is required." });
      return;
    }

    try {
      setManualPublishing(true);
      setFeedback(null);

      const paragraphs = manualStory
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: manualSection,
          placement: manualPlacement,
          headline: manualHeadline,
          subhead: manualSubhead || undefined,
          kicker: manualKicker || undefined,
          author: manualAuthor || undefined,
          image: manualImageUrl || undefined,
          videoUrl: manualVideoUrl || undefined,
          paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFeedback({
          type: "success",
          text: `✅ Published: "${manualHeadline}" to ${manualSection} (${manualPlacement}). Former lead cascaded to right side!`,
        });
        // Clear fields
        setManualHeadline("");
        setManualSubhead("");
        setManualStory("");
        setManualImageUrl("");
        setManualVideoUrl("");
        await loadLiveData();
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to publish news." });
      }
    } catch {
      setFeedback({ type: "error", text: "Error connecting to news publishing API." });
    } finally {
      setManualPublishing(false);
    }
  };

  // Handler: Attach Photo to Headline
  const handleAttachPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoHeadline.trim() || !photoUrl.trim()) {
      setFeedback({ type: "error", text: "Both headline query and photo URL are required." });
      return;
    }

    try {
      setAttachingPhoto(true);
      setFeedback(null);

      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline: photoHeadline,
          image: photoUrl,
          imageCaption: photoCaption || undefined,
          placement: "LEAD",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          text: `📸 Photo attached successfully to matching story: "${photoHeadline}"`,
        });
        setPhotoHeadline("");
        setPhotoUrl("");
        setPhotoCaption("");
        await loadLiveData();
      } else {
        setFeedback({ type: "error", text: data.message || "Could not attach photo." });
      }
    } catch {
      setFeedback({ type: "error", text: "Failed to connect to image attachment API." });
    } finally {
      setAttachingPhoto(false);
    }
  };

  // Handler: Delete / Remove a story
  const handleDeleteStory = async (headline: string) => {
    if (!confirm(`Are you sure you want to remove this story?\n"${headline}"`)) return;

    try {
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          text: `🗑️ Removed story: "${headline}". Restored broadsheet baseline.`,
        });
        await loadLiveData();
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to remove story." });
      }
    } catch {
      setFeedback({ type: "error", text: "Error removing story." });
    }
  };

  return (
    <div className="space-y-6 text-black">
      
      {/* Top Page Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
              News Pipeline & CMS Engine
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-sans text-stone-500">1-Day Auto-Purge Protected</span>
          </div>
          <h1 className="font-playfair font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
            News Pipeline (New Design)
          </h1>
          <p className="text-sm font-sans text-stone-600 mt-1 max-w-2xl">
            Instant URL scraper, multi-link batch importer, manual news composer, and live broadsheet story manager.
          </p>
        </div>

        {/* Telegram Quick Status */}
        <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 p-3 rounded-2xl shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center">
            <Send size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-sans font-bold text-black">Telegram Bot Ready</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[11px] font-mono text-stone-500">@KhabarganitBot</span>
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-sm font-medium flex items-center justify-between gap-3 border shadow-2xs ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Modern 4-Tab Navigation */}
      <div className="bg-white border border-stone-200 rounded-2xl p-1.5 shadow-xs flex items-center flex-wrap gap-1.5">
        <button
          onClick={() => setActiveTab("url")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
            activeTab === "url"
              ? "bg-black text-white shadow-xs"
              : "text-stone-700 hover:text-black hover:bg-stone-100"
          }`}
        >
          <Zap size={15} className={activeTab === "url" ? "text-amber-400" : "text-stone-500"} />
          <span>⚡ Instant URL & Batch Importer</span>
        </button>

        <button
          onClick={() => setActiveTab("manual")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
            activeTab === "manual"
              ? "bg-black text-white shadow-xs"
              : "text-stone-700 hover:text-black hover:bg-stone-100"
          }`}
        >
          <FileText size={15} className={activeTab === "manual" ? "text-white" : "text-stone-500"} />
          <span>✍️ Manual News Composer</span>
        </button>

        <button
          onClick={() => setActiveTab("photo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
            activeTab === "photo"
              ? "bg-black text-white shadow-xs"
              : "text-stone-700 hover:text-black hover:bg-stone-100"
          }`}
        >
          <ImageIcon size={15} className={activeTab === "photo" ? "text-white" : "text-stone-500"} />
          <span>📸 Attach Photo to Headline</span>
        </button>

        <button
          onClick={() => setActiveTab("manage")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
            activeTab === "manage"
              ? "bg-black text-white shadow-xs"
              : "text-stone-700 hover:text-black hover:bg-stone-100"
          }`}
        >
          <Layers size={15} className={activeTab === "manage" ? "text-white" : "text-stone-500"} />
          <span>📰 Live Stories Manager</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: INSTANT URL & BATCH IMPORTER
         ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "url" && (
        <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Sparkles size={14} />
              <span>Autonomous Ingestion Engine</span>
            </div>
            <h2 className="font-playfair font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
              Instant News URL & Batch Link Importer
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 mt-1">
              Paste single or multiple links from PIB, World News, ANI, BBC, Reuters, or national portals. The engine automatically extracts headlines, full paragraphs, high-res photos, video dispatches, classifies the category, purges competitor branding, and cascades the former lead to the right side.
            </p>
          </div>

          {/* URL Input Box */}
          <div className="space-y-2">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block">
              Paste News Links (One per line or inside text):
            </label>
            <textarea
              rows={4}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://pib.gov.in/PressReleasePage.aspx?PRID=...&#10;https://www.reuters.com/...&#10;https://www.bbc.com/..."
              className="w-full p-4 bg-stone-50 border border-stone-300 rounded-2xl text-sm font-mono text-black placeholder:text-stone-400 focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* Configuration Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Target Section Category:
              </label>
              <select
                value={urlSection}
                onChange={(e) => setUrlSection(e.target.value as any)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-medium text-black focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="AUTO">🤖 Auto-Detect Category (AI Classifier)</option>
                <option value="TRENDING">TRENDING (Front Page)</option>
                <option value="WORLD">WORLD (Global & Diplomacy)</option>
                <option value="INDIA">INDIA (National News)</option>
                <option value="BUSINESS">BUSINESS (Markets & Economy)</option>
                <option value="TECH">TECH (AI, Deep-Tech & Space)</option>
                <option value="SPORTS">SPORTS (Cricket & Games)</option>
                <option value="POLITICS">POLITICS (Parliament & Elections)</option>
                <option value="ENTERTAINMENT">ENTERTAINMENT (Cinema & Box Office)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Story Placement Hierarchy:
              </label>
              <select
                value={urlPlacement}
                onChange={(e) => setUrlPlacement(e.target.value as any)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-medium text-black focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="AUTO">⚡ Smart Auto (Lead Story with Right-Side Cascade)</option>
                <option value="LEAD">Hero Lead Story (Current lead shifts to Right Side)</option>
                <option value="SIDE">Right Column Side Story</option>
                <option value="TOP">Top 4 Broadsheet Grid Story</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <span className="text-xs font-sans text-stone-500">
              Purges all competitor channel names and horoscopes automatically.
            </span>
            <button
              onClick={handleScrapePublish}
              disabled={scraping || !urlInput.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-stone-800 text-white rounded-2xl text-xs sm:text-sm font-sans font-bold shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              {scraping ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Extracting & Publishing...</span>
                </>
              ) : (
                <>
                  <Zap size={16} className="text-amber-400" />
                  <span>Scrape & Ingest to Broadsheet</span>
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {scrapeResults && scrapeResults.length > 0 && (
            <div className="mt-6 pt-6 border-t border-stone-200 space-y-3">
              <h3 className="font-playfair font-black text-sm uppercase tracking-wide text-black">
                Successfully Published Stories ({scrapeResults.length}):
              </h3>
              <div className="space-y-2">
                {scrapeResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-bold text-emerald-700 uppercase font-mono mr-2">
                        [{item.placement} · {item.sectionKey}]
                      </span>
                      <strong className="text-black uppercase">{item.headline}</strong>
                    </div>
                    <span className="shrink-0 text-stone-400 font-mono text-[11px]">Live Now</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 2: MANUAL NEWS COMPOSER
         ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "manual" && (
        <form
          onSubmit={handleManualPublish}
          className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5"
        >
          <div>
            <h2 className="font-playfair font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
              Manual Editorial Dispatch Composer
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 mt-1">
              Directly compose and publish dispatches. When publishing as a Lead Story, the current lead automatically moves to the right-side column without disappearing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Target Section:
              </label>
              <select
                value={manualSection}
                onChange={(e) => setManualSection(e.target.value as CategoryKey)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-medium text-black focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="TRENDING">TRENDING (Front Page)</option>
                <option value="WORLD">WORLD</option>
                <option value="INDIA">INDIA</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="TECH">TECH</option>
                <option value="SPORTS">SPORTS</option>
                <option value="POLITICS">POLITICS</option>
                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Placement:
              </label>
              <select
                value={manualPlacement}
                onChange={(e) => setManualPlacement(e.target.value as PlacementKey)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-medium text-black focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="LEAD">Hero Lead Story (Cascades current lead to Right Side)</option>
                <option value="SIDE">Right Column Side Story</option>
                <option value="TOP">Top 4 Broadsheet Grid Story</option>
                <option value="DIGEST">Top 10 Digest List Dispatch</option>
              </select>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Headline (Main Title) *:
            </label>
            <input
              type="text"
              required
              value={manualHeadline}
              onChange={(e) => setManualHeadline(e.target.value)}
              placeholder="e.g. PARLIAMENT COMMITTEE PASSES NEW QUANTUM TECHNOLOGY ACT 2026"
              className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-serif font-bold text-black uppercase placeholder:normal-case placeholder:font-sans placeholder:font-normal focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          {/* Subhead & Kicker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Sub-headline / Tagline:
              </label>
              <input
                type="text"
                value={manualSubhead}
                onChange={(e) => setManualSubhead(e.target.value)}
                placeholder="Brief summary of the breaking story..."
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Kicker Tag:
              </label>
              <input
                type="text"
                value={manualKicker}
                onChange={(e) => setManualKicker(e.target.value)}
                placeholder="e.g. SPECIAL REPORT · NEW DELHI"
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans text-black uppercase focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          {/* Story Body Paragraphs (No 1,000-char limit) */}
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Story Paragraphs (Separate each paragraph with an empty line):
            </label>
            <textarea
              rows={6}
              value={manualStory}
              onChange={(e) => setManualStory(e.target.value)}
              placeholder="Paragraph 1: High-level administrative authorities announced today...&#10;&#10;Paragraph 2: The directive encompasses comprehensive fiscal frameworks...&#10;&#10;Paragraph 3: Implementation protocols have been formally notified."
              className="w-full p-4 bg-stone-50 border border-stone-300 rounded-2xl text-xs sm:text-sm font-serif leading-relaxed text-black focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          {/* Image & Video URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Photo URL (High Resolution):
              </label>
              <input
                type="url"
                value={manualImageUrl}
                onChange={(e) => setManualImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or uploaded photo link"
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Video Embed URL (YouTube or MP4 - Optional):
              </label>
              <input
                type="url"
                value={manualVideoUrl}
                onChange={(e) => setManualVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or direct MP4 link"
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <span className="text-xs font-sans text-stone-500">
              Published directly to live broadsheet edition.
            </span>
            <button
              type="submit"
              disabled={manualPublishing}
              className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-stone-800 text-white rounded-2xl text-xs sm:text-sm font-sans font-bold shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              {manualPublishing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Publishing Dispatch...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Publish Dispatch Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 3: PHOTO & MEDIA MATCHER
         ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "photo" && (
        <form
          onSubmit={handleAttachPhoto}
          className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5"
        >
          <div>
            <h2 className="font-playfair font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
              Attach Photo to Existing Headline
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 mt-1">
              If a news story was published without a picture, provide the headline and photo URL below to instantly attach it to the story across all broadsheets.
            </p>
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Matching Headline Query *:
            </label>
            <input
              type="text"
              required
              value={photoHeadline}
              onChange={(e) => setPhotoHeadline(e.target.value)}
              placeholder="e.g. PM MODI CONCLUDES ESTIC 2026"
              className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-serif font-bold text-black uppercase focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Photo URL *:
            </label>
            <input
              type="url"
              required
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono text-black focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Photo Caption (Optional):
            </label>
            <input
              type="text"
              value={photoCaption}
              onChange={(e) => setPhotoCaption(e.target.value)}
              placeholder="Photo: KhabarGanit National Newsroom Desk"
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-serif text-black focus:outline-none focus:border-black focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-stone-200">
            <button
              type="submit"
              disabled={attachingPhoto}
              className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-stone-800 text-white rounded-2xl text-xs sm:text-sm font-sans font-bold shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              <ImageIcon size={16} />
              <span>{attachingPhoto ? "Attaching Photo..." : "Attach Photo to Story"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 4: LIVE STORIES MANAGER
         ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "manage" && (
        <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
                Live Active Broadsheet Dispatches
              </h2>
              <p className="text-xs sm:text-sm font-sans text-stone-600 mt-1">
                View all stories currently live across Front Page and the 7 sections. Click Remove to delete any story and restore baseline.
              </p>
            </div>
            <button
              onClick={loadLiveData}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold"
            >
              <RefreshCw size={13} className={loadingLive ? "animate-spin" : ""} />
              <span>Refresh Feed</span>
            </button>
          </div>

          {/* Front Page Lead Story Card */}
          {liveData?.trending?.leadStory && (
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C13A08] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  MAIN FRONT-PAGE LEAD STORY
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {liveData.trending.leadStory.timeAgo || "Live"}
                </span>
              </div>
              <h3 className="font-playfair font-black text-base sm:text-lg text-black uppercase leading-snug">
                {liveData.trending.leadStory.headline}
              </h3>
              <p className="font-serif text-xs text-stone-600 leading-relaxed line-clamp-2">
                {liveData.trending.leadStory.subhead}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                <span className="text-stone-500">
                  {liveData.trending.leadStory.col1?.length || 0} columns
                </span>
                <button
                  onClick={() => handleDeleteStory(liveData.trending.leadStory.headline)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Remove Lead</span>
                </button>
              </div>
            </div>
          )}

          {/* Right Side Stories List */}
          <div className="space-y-3 pt-2">
            <h4 className="font-playfair font-black text-sm uppercase text-black">
              Right-Side Column Dispatches ({liveData?.trending?.sideStories?.length || 0}):
            </h4>
            <div className="space-y-2">
              {liveData?.trending?.sideStories?.map((side, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#C13A08] block mb-0.5 uppercase">
                      {side.kicker || "SIDE STORY"}
                    </span>
                    <strong className="text-black font-serif uppercase truncate block">
                      {side.headline}
                    </strong>
                    <span className="text-stone-500 line-clamp-1 text-[11px]">
                      {side.summary}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteStory(side.headline)}
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Remove story"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates History */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <h4 className="font-playfair font-black text-sm uppercase text-black">
              Recent Publication Updates Log ({liveData?.updates?.length || 0}):
            </h4>
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-2 font-mono text-xs">
              {liveData?.updates?.slice(0, 15).map((u, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-stone-50 rounded-lg border border-stone-100 flex items-center justify-between text-stone-700"
                >
                  <span className="truncate max-w-[70%]">{u.headline}</span>
                  <span className="text-[10px] text-stone-400 shrink-0">
                    {new Date(u.timestamp).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export default function AdminPipelinePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-white border border-stone-200 rounded-3xl p-8 text-stone-500 font-sans">
          <div className="flex items-center gap-2">
            <RefreshCw size={18} className="animate-spin text-stone-700" />
            <span>Loading News Pipeline...</span>
          </div>
        </div>
      }
    >
      <PipelineContent />
    </Suspense>
  );
}
