"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X as CloseIcon, Share2, Copy, Check, Clock, MapPin, User, ExternalLink } from "lucide-react";

export interface ArticleModalData {
  title: string;
  kicker?: string;
  subhead?: string;
  author?: string;
  location?: string;
  date?: string;
  timeAgo?: string;
  image?: string;
  imageCaption?: string;
  paragraphs: string[];
  category?: string;
  videoUrl?: string;
  sourceUrl?: string;
}

interface ArticleModalProps {
  article: ArticleModalData | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareX = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${article.title} | KhabarGanit`);
      window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${article.title} - Read more on KhabarGanit: `);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn select-text">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Broadsheet Article Card */}
      <article className="relative bg-white text-black max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-5 sm:p-9 md:p-11 z-10">
        
        {/* Sticky Close Button in Top Corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-stone-100 hover:bg-black hover:text-white border border-stone-400 p-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm group"
          title="Close article (Esc)"
        >
          <CloseIcon size={18} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Category & Kicker */}
        <div className="flex items-center gap-2 mb-2 select-none pr-10">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C13A08]">
            {article.kicker || article.category || "DISPATCH BULLETIN"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-playfair font-black text-2xl sm:text-3xl md:text-4xl text-black leading-[1.24] tracking-normal mb-3">
          {article.title}
        </h1>

        {/* Subhead / Standfirst */}
        {article.subhead && (
          <p className="font-serif italic text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed border-l-3 border-[#C13A08] pl-3.5 my-3.5 bg-stone-50 py-1.5">
            {article.subhead}
          </p>
        )}

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-serif text-stone-600 border-y border-stone-300 py-2.5 my-4 gap-2 select-none">
          <div className="flex items-center flex-wrap gap-4">
            {article.author && (
              <span className="flex items-center gap-1 font-semibold text-stone-900">
                <User size={13} className="text-[#C13A08]" />
                {article.author}
              </span>
            )}
            {article.location && (
              <span className="flex items-center gap-1 uppercase tracking-wider">
                <MapPin size={13} className="text-stone-500" />
                {article.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-stone-500" />
              {article.timeAgo ? `${article.timeAgo} · ` : ""}
              {article.date || "Today's Edition"} · 3 min read
            </span>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareX}
              className="px-2 py-0.5 border border-stone-300 hover:border-black rounded text-[10px] font-sans font-bold flex items-center gap-1 transition-colors"
              title="Share on X"
            >
              <Share2 size={11} /> Share
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-2 py-0.5 border border-stone-300 hover:border-emerald-600 text-emerald-700 rounded text-[10px] font-sans font-bold transition-colors"
              title="Share on WhatsApp"
            >
              WhatsApp
            </button>
            <button
              onClick={handleCopy}
              className="px-2 py-0.5 border border-stone-300 hover:border-black rounded text-[10px] font-sans font-bold flex items-center gap-1 transition-colors"
              title="Copy article link"
            >
              {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.image && (
          <div className="my-5">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-stone-100 border border-stone-300 shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-[11px] font-serif text-stone-500 italic pt-2 border-b border-stone-200 pb-2">
                {article.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Embedded Video Dispatch if present */}
        {article.videoUrl && (
          <div className="my-5">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-black border border-stone-300 shadow-md">
              <iframe
                src={article.videoUrl}
                title={article.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <p className="text-[11px] font-serif text-stone-500 italic pt-1.5 border-b border-stone-200 pb-2">
              📹 Video Dispatch & Media Coverage
            </p>
          </div>
        )}

        {/* Full Article Body Paragraphs */}
        <div className="text-stone-900 text-sm sm:text-base font-serif leading-[1.8] space-y-4 my-6 text-justify">
          {article.paragraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? "first-letter:font-playfair first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-2.5 first-letter:leading-none first-letter:text-black" : ""}>
              {p}
            </p>
          ))}
        </div>

        {/* Source Attribution Link if present */}
        {article.sourceUrl && (
          <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-serif text-stone-600 flex items-center gap-1.5 select-text">
            <ExternalLink size={13} className="text-[#C13A08] shrink-0" />
            <span>मूल समाचार स्रोत (Source):</span>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C13A08] hover:underline font-semibold truncate max-w-xs sm:max-w-md inline-block"
            >
              {article.sourceUrl}
            </a>
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-[1.5px] bg-black my-6" />

        {/* Follow KhabarGanit on Social Channels */}
        <div className="bg-stone-50 border border-stone-300 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div>
            <span className="font-playfair font-black text-lg text-black block">
              Follow KhabarGanit Dispatches
            </span>
            <p className="text-xs font-serif text-stone-600">
              Get data-verified journalism, breaking alerts, and quantitative insights.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.youtube.com/@KhabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-300 rounded-full hover:scale-110 hover:border-red-600 transition-all"
              title="YouTube: @KhabarGanit"
            >
              <Image src="/social/youtube.png" alt="YouTube" width={22} height={22} className="object-contain" />
            </a>
            <a
              href="https://x.com/khabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-300 rounded-full hover:scale-110 hover:border-black transition-all"
              title="X: @khabarGanit"
            >
              <Image src="/social/x.png" alt="X" width={22} height={22} className="object-contain" />
            </a>
            <a
              href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-300 rounded-full hover:scale-110 hover:border-pink-600 transition-all"
              title="Instagram: @khabarganit"
            >
              <Image src="/social/instagram.png" alt="Instagram" width={22} height={22} className="object-contain" />
            </a>
            <a
              href="https://khabarganit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-300 rounded-full hover:scale-110 hover:border-blue-600 transition-all"
              title="Website: khabarganit.com"
            >
              <Image src="/social/google.png" alt="Google" width={22} height={22} className="object-contain" />
            </a>
          </div>
        </div>

        {/* Back to Broadsheet Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-black text-white hover:bg-[#C13A08] px-6 py-2.5 font-serif font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            ← Return to Broadsheet Edition
          </button>
        </div>
      </article>
    </div>
  );
}
