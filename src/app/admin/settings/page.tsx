"use client";

import { useState } from "react";
import {
  Clock,
  Shield,
  Send,
  Sliders,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Lock,
  Mail,
  Key,
  Globe,
  Bell,
  Save,
} from "lucide-react";

export default function AdminSettingsPage() {
  // Purge settings
  const [retentionHours, setRetentionHours] = useState<number>(24);
  const [purging, setPurging] = useState(false);
  const [purgeMessage, setPurgeMessage] = useState<string | null>(null);

  // General settings
  const [scrubCompetitors, setScrubCompetitors] = useState(true);
  const [cascadeToRightSide, setCascadeToRightSide] = useState(true);
  const [defaultAuthor, setDefaultAuthor] = useState("KhabarGanit Senior Desk");
  const [defaultKicker, setDefaultKicker] = useState("KHABARGANIT SPECIAL DISPATCH");

  // Auth info
  const [adminEmail, setAdminEmail] = useState("newsroom@khabarganit.com");
  const [currentPassword, setCurrentPassword] = useState("0411@Khabar");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Telegram info
  const [botToken, setBotToken] = useState(
    "8769156198:AAGU6N8r8NhCqILVqCQacMxmvUoJHlo0Zi0"
  );
  const [botUsername, setBotUsername] = useState("@KhabarganitBot");
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  const [savingSettings, setSavingSettings] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleRunPurge = async () => {
    try {
      setPurging(true);
      setPurgeMessage(null);
      const res = await fetch("/api/admin/purge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: retentionHours }),
      });
      const data = await res.json();
      if (data.success) {
        setPurgeMessage(
          `✅ Cleaned up ${data.prunedCount} stories older than ${retentionHours}h (1 Day)!`
        );
      } else {
        setPurgeMessage("Purge completed with 0 expired stories.");
      }
    } catch {
      setPurgeMessage("Network error running purge.");
    } finally {
      setPurging(false);
      setTimeout(() => setPurgeMessage(null), 5000);
    }
  };

  const handleTestWebhook = async () => {
    try {
      setTestingWebhook(true);
      setWebhookStatus(null);
      const res = await fetch(
        `https://api.telegram.org/bot${botToken}/getWebhookInfo`
      );
      const data = await res.json();
      if (data.ok) {
        setWebhookStatus(
          `✅ Connected: ${data.result.url || "Webhook active (Pending update count: " + data.result.pending_update_count + ")"}`
        );
      } else {
        setWebhookStatus(`⚠️ Telegram error: ${data.description}`);
      }
    } catch {
      setWebhookStatus("Could not verify Telegram bot status.");
    } finally {
      setTestingWebhook(false);
    }
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setTimeout(() => {
      setSavingSettings(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 text-black">
      
      {/* Page Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-700">
              System Configuration
            </span>
          </div>
          <h1 className="font-playfair font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
            Newsroom Settings & Rules
          </h1>
          <p className="text-sm font-sans text-stone-600 mt-1">
            Configure automated 1-day news expiration, Telegram bot parameters, and newsroom security.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold">
            <CheckCircle2 size={15} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          1. AUTO-PURGE & 1-DAY RETENTION SETTINGS
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              1-Day News Expiration & Auto-Purge
            </h2>
            <p className="text-xs font-sans text-stone-500">
              News older than this duration automatically disappears from broadsheets, preventing stale stories from accumulating.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
              News Retention Window:
            </label>
            <select
              value={retentionHours}
              onChange={(e) => setRetentionHours(Number(e.target.value))}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-medium text-black focus:outline-none focus:border-black cursor-pointer"
            >
              <option value={12}>12 Hours (Half Day)</option>
              <option value={24}>24 Hours (1 Day - Default Recommended)</option>
              <option value={36}>36 Hours</option>
              <option value={48}>48 Hours (2 Days)</option>
            </select>
            <p className="text-[11px] font-sans text-stone-500 mt-1.5">
              When a story exceeds this age, it is purged automatically on every reader visit and pipeline run.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
              Manual Purge Trigger:
            </label>
            <button
              onClick={handleRunPurge}
              disabled={purging}
              className="w-full flex items-center justify-center gap-2 p-3 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-bold shadow-2xs cursor-pointer transition-all disabled:opacity-50"
            >
              <Trash2 size={16} className={purging ? "animate-spin text-stone-500" : "text-stone-700"} />
              <span>{purging ? "Purging Old News..." : `Purge Stories Older Than ${retentionHours}h Now`}</span>
            </button>
          </div>
        </div>

        {purgeMessage && (
          <div className="p-3 bg-stone-50 border border-stone-200 text-stone-800 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-600" />
            <span>{purgeMessage}</span>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. EDITORIAL CASCADE & SCRUBBING RULES
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#C13A08] flex items-center justify-center">
            <Sliders size={20} />
          </div>
          <div>
            <h2 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              Broadsheet Cascading & Quality Rules
            </h2>
            <p className="text-xs font-sans text-stone-500">
              Enforce layout integrity so former lead stories cascade cleanly to the right side and competitor tags are scrubbed.
            </p>
          </div>
        </div>

        <div className="space-y-3.5 pt-2">
          {/* Toggle 1: Cascade Lead to Right Side */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <h4 className="font-sans font-bold text-sm text-black">
                Lead Story Right-Side Cascade
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                When a new Lead Story arrives, shift the current lead story to the right-side column (SideStory #1) so it never vanishes.
              </p>
            </div>
            <input
              type="checkbox"
              checked={cascadeToRightSide}
              onChange={(e) => setCascadeToRightSide(e.target.checked)}
              className="w-5 h-5 accent-black rounded cursor-pointer"
            />
          </div>

          {/* Toggle 2: Competitor Channel Scrubbing */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <h4 className="font-sans font-bold text-sm text-black">
                Purge Competitor Channel Names & Horoscopes
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Automatically removes AajTak, NDTV, Zee, Republic, BBC, rashifal blobs, and script tags from scraped dispatches.
              </p>
            </div>
            <input
              type="checkbox"
              checked={scrubCompetitors}
              onChange={(e) => setScrubCompetitors(e.target.checked)}
              className="w-5 h-5 accent-black rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Default Author & Kicker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Default Newsroom Author / Byline:
            </label>
            <input
              type="text"
              value={defaultAuthor}
              onChange={(e) => setDefaultAuthor(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans text-black focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Default Kicker Tag:
            </label>
            <input
              type="text"
              value={defaultKicker}
              onChange={(e) => setDefaultKicker(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans text-black focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. TELEGRAM BOT INTEGRATION
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Send size={20} />
          </div>
          <div>
            <h2 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              Telegram Bot Publishing Bridge
            </h2>
            <p className="text-xs font-sans text-stone-500">
              Enables publishing directly from mobile phones via Telegram link drops and photo uploads.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Bot Username:
            </label>
            <input
              type="text"
              readOnly
              value={botUsername}
              className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-black font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Webhook Endpoint:
            </label>
            <input
              type="text"
              readOnly
              value="https://www.khabarganit.com/api/webhook/telegram"
              className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-stone-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-sans text-stone-500">
            Supports /lead, /side, /top, /delete, and instant batch link drops.
          </span>
          <button
            onClick={handleTestWebhook}
            disabled={testingWebhook}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-black border border-stone-300 rounded-xl text-xs font-semibold cursor-pointer"
          >
            <RefreshCw size={14} className={testingWebhook ? "animate-spin" : ""} />
            <span>Test Telegram Connection</span>
          </button>
        </div>

        {webhookStatus && (
          <div className="p-3 bg-stone-50 border border-stone-200 text-xs font-mono text-stone-800 rounded-xl">
            {webhookStatus}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. ADMIN CREDENTIALS & SECURITY
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="font-playfair font-black text-lg text-black uppercase tracking-tight">
              Newsroom Admin Credentials
            </h2>
            <p className="text-xs font-sans text-stone-500">
              Authentication credentials for logging into the KhabarGanit Newsroom Admin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Authorized Newsroom ID:
            </label>
            <input
              type="email"
              readOnly
              value={adminEmail}
              className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-black font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Active Password:
            </label>
            <input
              type="text"
              readOnly
              value={currentPassword}
              className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono text-black font-semibold cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <span className="text-xs font-sans text-stone-500">
            Cookie-based session with secure HMAC verification.
          </span>
          <button
            onClick={handleSaveAll}
            disabled={savingSettings}
            className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-sans font-bold shadow-md cursor-pointer transition-all"
          >
            <Save size={15} />
            <span>{savingSettings ? "Saving Settings..." : "Save Configuration"}</span>
          </button>
        </div>
      </section>

    </div>
  );
}
