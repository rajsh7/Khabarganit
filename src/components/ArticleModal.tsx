"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X as CloseIcon, Share2, Copy, Check, User } from "lucide-react";

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
      const text = encodeURIComponent(`${article.title} | ख़बरगणित`);
      window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${article.title} - ख़बरगणित पर पढ़ें: `);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn select-text">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modern Editorial Reading Modal */}
      <article className="relative bg-white text-black max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-2xl border border-stone-200 shadow-2xl p-5 sm:p-9 md:p-11 z-10">
        
        {/* Sticky Close Button in Top Corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-stone-100 hover:bg-black hover:text-white border border-stone-300 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm group"
          title="बंद करें (Esc)"
        >
          <CloseIcon size={18} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Category & Kicker */}
        <div className="flex items-center gap-2 mb-2 select-none pr-10">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C13A08] animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[#C13A08]">
            {article.kicker || article.category || "समाचार बुलेटिन"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-black leading-snug tracking-tight mb-3">
          {article.title}
        </h1>

        {/* Subhead / Standfirst */}
        {article.subhead && (
          <p className="font-serif italic text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed border-l-4 border-[#C13A08] pl-3.5 my-3.5 bg-stone-50 py-2 rounded-r-md">
            {article.subhead}
          </p>
        )}

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between text-xs font-sans text-stone-600 border-y border-stone-200 py-3 my-4 gap-2 select-none">
          <div className="flex items-center flex-wrap gap-4">
            {article.author && (
              <span className="flex items-center gap-1.5 font-bold text-stone-900">
                <User size={14} className="text-[#C13A08]" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1 font-medium text-stone-500">
              ⏱ {article.date || "05 Nov 2026"}
            </span>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareX}
              className="px-2.5 py-1 border border-stone-300 hover:border-black rounded-md text-xs font-sans font-medium flex items-center gap-1 transition-colors"
              title="X पर शेयर करें"
            >
              <Share2 size={12} /> 𝕏
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-2.5 py-1 border border-emerald-300 hover:border-emerald-600 bg-emerald-50 text-emerald-800 rounded-md text-xs font-sans font-bold transition-colors"
              title="WhatsApp पर शेयर करें"
            >
              WhatsApp
            </button>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 border border-stone-300 hover:border-black rounded-md text-xs font-sans font-medium flex items-center gap-1 transition-colors"
              title="लिंक कॉपी करें"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copied ? "कॉपी हुआ" : "कॉपी"}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.image && (
          <div className="my-5">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-stone-100 border border-stone-200 shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs font-serif text-stone-500 italic pt-2 border-b border-stone-200 pb-2">
                {article.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Embedded Video Dispatch if present */}
        {article.videoUrl && (
          <div className="my-5">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-black border border-stone-300 shadow-md">
              <iframe
                src={article.videoUrl}
                title={article.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* Full Article Body Paragraphs */}
        <div className="text-stone-900 text-base sm:text-lg font-serif leading-[1.8] space-y-4 my-6 text-justify">
          {article.paragraphs.map((p, idx) => (
            <p key={idx}>
              {p}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-stone-200 my-6" />

        {/* Follow KhabarGanit on Social Channels */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div>
            <span className="font-sans font-bold text-base text-black block">
              ख़बरगणित को सोशल मीडिया पर फ़ॉलो करें
            </span>
            <p className="text-xs font-serif text-stone-600">
              ताज़ा समाचार, तथ्य और आँकड़ों के साथ सटीक विश्लेषण प्राप्त करें।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.youtube.com/@KhabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-200 rounded-full hover:scale-110 transition-transform shadow-xs"
              title="YouTube"
            >
              <Image src="/social/youtube.png" alt="YouTube" width={22} height={22} className="object-contain" />
            </a>
            <a
              href="https://x.com/khabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-200 rounded-full hover:scale-110 transition-transform shadow-xs"
              title="X"
            >
              <Image src="/social/x.png" alt="X" width={22} height={22} className="object-contain" />
            </a>
            <a
              href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-200 rounded-full hover:scale-110 transition-transform shadow-xs"
              title="Instagram"
            >
              <Image src="/social/instagram.png" alt="Instagram" width={22} height={22} className="object-contain" />
            </a>
            <a
              href="https://khabarganit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white border border-stone-200 rounded-full hover:scale-110 transition-transform shadow-xs"
              title="वेबसाइट"
            >
              <Image src="/social/google.png" alt="Website" width={22} height={22} className="object-contain" />
            </a>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-black text-white hover:bg-[#C13A08] px-6 py-2.5 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            ← मुख्य पृष्ठ पर लौटें
          </button>
        </div>
      </article>
    </div>
  );
}
