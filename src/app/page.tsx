"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import GoogleTranslate from "@/components/GoogleTranslate";
import { SECTION_PAGES, SectionPageData } from "@/data/newspaperData";

export default function NewspaperPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [turning, setTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");

  const activePage: SectionPageData =
    SECTION_PAGES.find((p) => p.pageNumber === currentPage) || SECTION_PAGES[0];

  const goToPage = (page: number, direction?: "next" | "prev") => {
    if (page === currentPage || turning || page < 1 || page > SECTION_PAGES.length) return;
    const dir = direction || (page > currentPage ? "next" : "prev");
    setTurnDirection(dir);
    setTurning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
    setTimeout(() => {
      setTurning(false);
    }, 2200);
  };

  const handleNext = () => {
    if (currentPage < SECTION_PAGES.length) {
      goToPage(currentPage + 1, "next");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1, "prev");
    }
  };

  // Keyboard navigation for page flip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, turning]);

  // Section Navigation Order: World, India, Business, Tech, Sports, Opinion, Entertainment
  const navItems = [
    { label: "WORLD", targetPage: 2 },
    { label: "INDIA", targetPage: 1 },
    { label: "BUSINESS", targetPage: 3 },
    { label: "TECH", targetPage: 4 },
    { label: "SPORTS", targetPage: 5 },
    { label: "OPINION", targetPage: 6 },
    { label: "ENTERTAINMENT", targetPage: 7 },
  ];

  // Reusable Section Navigation (Identical for each page, no forced highlight on India)
  const renderNavbar = () => (
    <>
      <div className="w-full h-[2.5px] bg-black my-2" />
      <nav className="w-full py-2.5 flex items-center justify-center select-none">
        <ul className="flex items-center justify-center flex-wrap gap-3.5 sm:gap-5 md:gap-8 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.2em] text-stone-900 leading-none">
          {navItems.map((item) => {
            const isCurrent = currentPage === item.targetPage;
            return (
              <li key={item.label}>
                <button
                  onClick={() => goToPage(item.targetPage)}
                  className={`hover:text-[#C13A08] transition-colors tracking-[0.2em] cursor-pointer py-1 ${
                    isCurrent ? "border-b-2 border-black" : ""
                  }`}
                  title={`Go to ${item.label} Edition (Page ${item.targetPage})`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="w-full h-[1.5px] bg-stone-900 mt-0 mb-6 sm:mb-7" />
    </>
  );

  // Reusable Broadsheet Footer (Same for each page) - Only copyright at bottom center
  const renderFooter = () => (
    <footer className="mt-12 pt-6 pb-4 border-t-[2.5px] border-black select-none text-center">
      <p className="text-xs sm:text-sm font-serif font-bold tracking-widest text-stone-800 uppercase">
        © 2026 KhabarGanit. All rights reserved.
      </p>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 md:py-10 px-2 sm:px-4 md:px-8 flex flex-col items-center justify-start font-sans antialiased text-black relative selection:bg-stone-200 selection:text-black">
      
      {/* ── Fixed Navigation Controls: Previous on Left Side, Next on Right Side ── */}
      {/* Left Side: Previous Button */}
      <div className="fixed left-4 sm:left-8 bottom-6 sm:bottom-8 z-50">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1 || turning}
          className={`flex items-center gap-2 bg-white text-stone-900 px-4 sm:px-5 py-2.5 rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.15)] border-2 border-black font-serif font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
            currentPage === 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-black hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
          }`}
          title="Previous Page (Left Arrow)"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous Page</span>
          <span className="sm:hidden">Prev</span>
        </button>
      </div>

      {/* Right Side: Next Button */}
      <div className="fixed right-4 sm:right-8 bottom-6 sm:bottom-8 z-50">
        <button
          onClick={handleNext}
          disabled={currentPage === SECTION_PAGES.length || turning}
          className={`flex items-center gap-2 bg-white text-stone-900 px-4 sm:px-5 py-2.5 rounded-full shadow-[0_6px_25px_rgba(0,0,0,0.15)] border-2 border-black font-serif font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
            currentPage === SECTION_PAGES.length
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-black hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
          }`}
          title="Next Page (Right Arrow)"
        >
          <span className="hidden sm:inline">Next Page</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ── Perspective 3D Newspaper Container ── */}
      <div className="perspective-container w-full max-w-[960px] transition-all duration-500">
        
        {/* ── Pure White Broadsheet Newspaper Page ── */}
        <div
          className={`w-full bg-white text-black shadow-[0_4px_35px_rgba(0,0,0,0.08)] border-2 border-black px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-10 transition-all duration-300 ${
            turning
              ? turnDirection === "next"
                ? "animate-turn-forward"
                : "animate-turn-backward"
              : ""
          }`}
        >

          {/* ── Top Strip: Date/Edition pinned to far left, Google Translate pinned to far right ── */}
          <div className="flex items-center justify-between w-full text-[10px] sm:text-xs font-serif font-bold uppercase tracking-[0.16em] text-stone-900 pb-2 select-none">
            <span className="font-bold tracking-[0.16em] shrink-0 whitespace-nowrap">
              {activePage.topStripLabel}
            </span>
            <div className="shrink-0 ml-auto flex items-center justify-end">
              <GoogleTranslate />
            </div>
          </div>

          {/* Thick Rule below top strip */}
          <div className="w-full h-[2.5px] bg-black mb-1.5 sm:mb-2" />

          {/* ── Masthead: KhabarGanit in large Playfair Display serif ── */}
          <header className="text-center py-1 sm:py-2 select-none">
            <h1 className="font-playfair font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-black leading-none">
              KhabarGanit
            </h1>
            <p className="font-serif italic text-xs sm:text-sm text-stone-600 tracking-wide mt-1">
              हर ख़बर की कहानी, आँकड़ों की ज़ुबानी
            </p>
          </header>

          {/* Navbar (Same for each page) */}
          {renderNavbar()}

          {/* ════════════════════════════════════════════════════════════════
              1. HERO SECTION: LEAD STORY + 3 SIDE STORIES
             ════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-stretch">
            
            {/* Left Column: Lead Story (~67%) */}
            <section className="md:col-span-8 md:pr-6 md:border-r md:border-stone-300 flex flex-col">
              {/* Hook / Kicker */}
              <div className="flex items-center gap-2 mb-2 select-none">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.2em] text-red-700">
                  {activePage.leadStory.kicker}
                </span>
              </div>

              {/* Lead Headline */}
              <h2 className="font-playfair font-black text-2xl sm:text-3xl md:text-[38px] leading-[1.06] tracking-tight text-black uppercase mb-2">
                {activePage.leadStory.headline}
              </h2>

              {/* Sub-headline / Tagline */}
              <p className="font-serif italic text-stone-700 text-sm sm:text-base md:text-lg leading-snug mb-3.5">
                {activePage.leadStory.subhead}
              </p>

              {/* Photo Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-100 border border-stone-300 mb-2 group shadow-sm">
                <Image
                  src={activePage.leadStory.image}
                  alt={activePage.leadStory.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 67vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              {/* Photo Caption */}
              <p className="text-[11px] font-serif text-stone-500 italic pb-3 border-b border-stone-200 mb-4">
                {activePage.leadStory.caption}
              </p>

              {/* 2 Columns of Detailed Reporting below photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-[13px] font-serif leading-relaxed text-stone-800 text-justify">
                <div>
                  {activePage.leadStory.col1.map((p, idx) => (
                    <p key={idx} className="mb-3">
                      {p}
                    </p>
                  ))}
                </div>
                <div>
                  {activePage.leadStory.col2.map((p, idx) => (
                    <p key={idx} className="mb-3">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Right Column: 3 Stories in same Playfair Display fonts (~33%) */}
            <aside className="md:col-span-4 md:pl-6 flex flex-col justify-start">
              {activePage.sideStories.map((story, idx) => (
                <div key={idx}>
                  <article className="pb-5">
                    <span className="text-[10px] font-serif font-bold uppercase tracking-[0.16em] text-[#C13A08] block mb-1">
                      {story.kicker}
                    </span>
                    <h3 className="font-playfair font-black text-base sm:text-lg leading-tight tracking-tight text-black uppercase mb-1.5 hover:text-[#C13A08] transition-colors">
                      {story.headline}
                    </h3>
                    <p className="text-xs font-serif leading-relaxed text-stone-700">
                      {story.summary}
                    </p>
                  </article>
                  {idx < activePage.sideStories.length - 1 && (
                    <div className="w-full h-[1px] bg-stone-300 mb-5" />
                  )}
                </div>
              ))}
            </aside>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              2. TOP STORIES SECTION (DOMAIN DISPATCHES)
             ════════════════════════════════════════════════════════════════ */}
          <section className="mt-10 pt-6 border-t-[2.5px] border-black">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 mb-6 border-b border-black">
              <h3 className="font-playfair font-black text-xl sm:text-2xl uppercase tracking-wider text-black">
                TOP STORIES
              </h3>
              <span className="text-[11px] font-serif uppercase tracking-[0.18em] text-stone-600 font-semibold">
                DISPATCHES FOR {activePage.sectionTitle}
              </span>
            </div>

            {/* 4-Column Broadsheet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activePage.topStories.map((story, idx) => (
                <article
                  key={idx}
                  className={`flex flex-col justify-between ${
                    idx < 3 ? "border-b sm:border-b-0 sm:border-r border-stone-300 sm:pr-4 pb-4 sm:pb-0" : ""
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#C13A08] block mb-1">
                      {story.kicker}
                    </span>
                    <h4 className="font-playfair font-bold text-sm sm:text-base leading-snug text-black uppercase mb-2">
                      {story.headline}
                    </h4>
                    <p className="text-xs font-serif text-stone-700 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-200 text-[10px] font-serif text-stone-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{story.author}</span>
                    <span>{story.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              3. TOP 10 DIGEST & INTELLIGENCE MONITOR
             ════════════════════════════════════════════════════════════════ */}
          <section className="mt-10 pt-6 border-t-[2.5px] border-black">
            <div className="flex items-center justify-between pb-2 mb-6 border-b border-black">
              <div className="flex items-center gap-2">
                <Bookmark size={15} className="text-[#C13A08]" />
                <h3 className="font-playfair font-black text-xl sm:text-2xl uppercase tracking-wider text-black">
                  {activePage.digestTitle}
                </h3>
              </div>
              <span className="text-[11px] font-serif uppercase tracking-[0.18em] text-stone-600 font-semibold">
                FULL 10-POINT MONITOR
              </span>
            </div>

            {/* 2-Column High-Density Digest Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-serif">
              {activePage.digestItems.map((item) => (
                <div
                  key={item.number}
                  className="flex items-start gap-3 pb-3 border-b border-stone-200"
                >
                  <span className="font-playfair font-black text-base text-[#C13A08] shrink-0 w-6">
                    {String(item.number).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-500 block">
                      {item.category}
                    </span>
                    <h5 className="font-playfair font-bold text-[13px] text-black uppercase leading-tight mb-1">
                      {item.headline}
                    </h5>
                    <p className="text-stone-700 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              4. ARTICLES & ANALYSIS SECTION
             ════════════════════════════════════════════════════════════════ */}
          <section className="mt-12 pt-6 border-t-[2.5px] border-black">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 mb-6 border-b border-black">
              <h3 className="font-playfair font-black text-xl sm:text-2xl uppercase tracking-wider text-black">
                ARTICLES & ANALYSIS
              </h3>
              <span className="text-[11px] font-serif uppercase tracking-[0.18em] text-stone-600 font-semibold">
                EDITORIALS, ESSAYS & DEEP DATA
              </span>
            </div>

            {/* Lead Essay + 3 Sidebar Articles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-stone-300">
              {/* Lead Editorial (8 Cols) */}
              <article className="lg:col-span-8 lg:pr-6 lg:border-r border-stone-300">
                <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#C13A08] block mb-1">
                  {activePage.editorial.kicker}
                </span>
                <h4 className="font-playfair font-black text-2xl sm:text-3xl leading-tight tracking-tight text-black uppercase mb-3">
                  {activePage.editorial.headline}
                </h4>
                <p className="font-serif italic text-sm sm:text-base text-stone-700 mb-4 leading-snug">
                  {activePage.editorial.subhead}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-[13px] font-serif leading-relaxed text-stone-800 text-justify">
                  <div>
                    {activePage.editorial.col1.map((p, idx) => (
                      <p key={idx} className="mb-3">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div>
                    {activePage.editorial.col2.map((p, idx) => (
                      <p key={idx} className="mb-3">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-200 text-xs font-serif text-stone-600 flex items-center justify-between italic">
                  <span>{activePage.editorial.author}</span>
                  <span>{activePage.editorial.bureau}</span>
                </div>
              </article>

              {/* 3 Sidebar Columns (4 Cols) */}
              <aside className="lg:col-span-4 flex flex-col justify-between space-y-6">
                {activePage.editorial.sideArticles.map((art, idx) => (
                  <article
                    key={idx}
                    className={`pb-5 ${
                      idx < activePage.editorial.sideArticles.length - 1
                        ? "border-b border-stone-200"
                        : ""
                    }`}
                  >
                    <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#C13A08] block mb-1">
                      {art.kicker}
                    </span>
                    <h5 className="font-playfair font-bold text-base leading-snug text-black uppercase mb-1.5">
                      {art.headline}
                    </h5>
                    <p className="text-xs font-serif text-stone-700 leading-relaxed mb-2">
                      {art.summary}
                    </p>
                    <span className="text-[10px] font-serif text-stone-500 uppercase tracking-wider block">
                      {art.byline}
                    </span>
                  </article>
                ))}
              </aside>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              5. BROADSHEET FOOTER (SAME FOR EACH PAGE)
             ════════════════════════════════════════════════════════════════ */}
          {renderFooter()}
        </div>
      </div>
    </div>
  );
}
