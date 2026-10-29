"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X } from "lucide-react";
import { CATEGORIES, BREAKING_NEWS } from "@/lib/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState("बुधवार, 28 अक्टूबर 2026");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const vyaparTabRef = useRef<HTMLLIElement>(null);
  const [vyaparWidth, setVyaparWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const updateVyaparWidth = () => {
      if (navContainerRef.current && vyaparTabRef.current) {
        const containerLeft = navContainerRef.current.getBoundingClientRect().left;
        const vyaparRight = vyaparTabRef.current.getBoundingClientRect().right;
        const computed = Math.round(vyaparRight - containerLeft);
        if (computed > 300) {
          setVyaparWidth(computed);
        }
      }
    };

    updateVyaparWidth();
    window.addEventListener("resize", updateVyaparWidth);
    const fontTimer = setTimeout(updateVyaparWidth, 250);

    try {
      setCurrentDateStr(
        new Intl.DateTimeFormat("hi-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date())
      );
    } catch {
      // keep fallback
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateVyaparWidth);
      clearTimeout(fontTimer);
    };
  }, []);

  const handleToggleSearch = () => {
    setSearchOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => searchInputRef.current?.focus(), 150);
      }
      return nextState;
    });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* ── TOP UTILITY BAR ── */}
      <div className="bg-[#1C1208] text-white text-xs py-1.5 px-4 border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <span className="font-jost tracking-wide opacity-80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E84A0C] inline-block animate-pulse" />
            {currentDateStr}
          </span>
          <div className="flex items-center gap-4">
            <Link href="/rss.xml" className="hidden sm:inline hover:text-[#E84A0C] transition-colors">
              📡 RSS
            </Link>
            <Link href="/about" className="hidden sm:inline hover:text-[#E84A0C] transition-colors">
              हमारे बारे में
            </Link>
            <Link href="/contact" className="hover:text-[#E84A0C] transition-colors">
              संपर्क करें
            </Link>
            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                title="Facebook"
              >
                <Image src="/social/facebook.png" alt="Facebook" width={20} height={20} className="w-full h-full object-contain" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                title="Twitter / X"
              >
                <Image src="/social/twitter.png" alt="Twitter" width={20} height={20} className="w-full h-full object-contain" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                title="Instagram"
              >
                <Image src="/social/instagram.png" alt="Instagram" width={20} height={20} className="w-full h-full object-contain" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                title="YouTube"
              >
                <Image src="/social/youtube.png" alt="YouTube" width={20} height={20} className="w-full h-full object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── BREAKING NEWS TICKER ── */}
      <div className="bg-white border-b border-gray-200 py-1.5 flex items-center overflow-hidden">
        <div className="max-w-screen-xl mx-auto w-full px-4 flex items-center">
          <div className="bg-[#E84A0C] text-white font-jost font-bold text-xs px-3 py-1 rounded-sm flex-shrink-0 flex items-center gap-1.5 mr-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" /> ब्रेकिंग
          </div>
          <div className="ticker-wrap flex-1">
            <div className="ticker-content text-xs sm:text-sm font-sarala text-gray-700">
              {BREAKING_NEWS.join("   ✦   ")}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER (Clean White Bar, Logo has dedicated #1C1208 Background Badge) ── */}
      <header
        className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-[85px] gap-4">

            {/* Logo Wrapper — Starts at 'Home' and stretches till 'Vyapar' with logo bar along with text, centered */}
            <Link
              href="/"
              style={{
                width: vyaparWidth ? `${vyaparWidth}px` : undefined,
              }}
              className="flex-shrink-0 flex items-center justify-center bg-[#1C1208] px-4 py-1.5 rounded-xl shadow-md border border-black/40 group hover:shadow-lg transition-all duration-200 w-auto lg:w-[500px] h-[65px]"
              title="ख़बर गणित — Homepage"
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="inline-flex items-center gap-3">
                  <Image
                    src="/logo-emblem.png"
                    alt="ख़बर गणित"
                    width={56}
                    height={56}
                    className="h-[51px] w-auto object-contain flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    priority
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className="text-white text-2xl sm:text-[28px] font-sarala font-extrabold tracking-tight">
                        खबर
                      </span>
                      <span className="text-[#FE5C01] text-2xl sm:text-[28px] font-sarala font-extrabold tracking-tight">
                        गणित
                      </span>
                    </div>
                    <div className="text-[11.5px] sm:text-[12.5px] font-sarala text-[#FE5C01] font-semibold tracking-normal sm:tracking-wide leading-tight mt-1 whitespace-nowrap">
                      हर ख़बर की कहानी, आँकड़ों की ज़ुबानी
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Ad Space — Header Banner (468x60) */}
            <div className="hidden xl:flex items-center flex-shrink-0">
              <div
                className="ad-placeholder bg-gray-50 border border-dashed border-gray-300 text-gray-500 rounded-lg"
                style={{ width: 468, height: 60 }}
              >
                <span className="text-xs font-jost text-gray-400">विज्ञापन · 468×60</span>
              </div>
            </div>

            {/* Actions: IN-PLACE EXPANDING SEARCH (No second navbar) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative flex items-center">
                {/* Expanding Search Input Box */}
                <form
                  onSubmit={handleSearchSubmit}
                  className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
                    searchOpen
                      ? "w-56 sm:w-72 md:w-80 opacity-100 border border-[#E84A0C] bg-white shadow-sm px-3 py-1.5 rounded-full mr-2"
                      : "w-0 opacity-0 border-transparent p-0 m-0 pointer-events-none"
                  }`}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news here..."
                    className="w-full bg-transparent font-sarala text-sm text-gray-800 placeholder-gray-400 focus:outline-none pr-1"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
                      title="Clear"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-[#E84A0C] hover:bg-[#C13A08] text-white text-xs font-jost font-semibold px-2.5 py-1 rounded-full transition-colors flex-shrink-0 ml-1"
                  >
                    खोजें
                  </button>
                </form>

                {/* Search Toggle Icon */}
                <button
                  type="button"
                  onClick={handleToggleSearch}
                  className={`p-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                    searchOpen
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "text-gray-700 hover:text-[#E84A0C] hover:bg-gray-100"
                  }`}
                  aria-label="Search"
                  title={searchOpen ? "Close search" : "Open search"}
                >
                  {searchOpen ? (
                    <i className="fi fi-rr-cross text-base leading-none block" />
                  ) : (
                    <i className="fi fi-rr-search text-lg leading-none block" />
                  )}
                </button>
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                aria-label="Open menu"
              >
                {menuOpen ? (
                  <i className="fi fi-rr-cross text-lg leading-none block" />
                ) : (
                  <i className="fi fi-rr-menu-burger text-lg leading-none block" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── NAVIGATION BAR (Sticky below header) ── */}
      <nav className="bg-[#1C1208] border-b-2 border-[#E84A0C] hidden lg:block sticky top-[85px] z-40 shadow-sm">
        <div ref={navContainerRef} className="max-w-screen-xl mx-auto px-4">
          <ul className="flex items-center h-11 text-sm font-jost">
            <li>
              <Link
                href="/"
                className="flex items-center h-11 px-4 text-white font-semibold hover:bg-[#E84A0C] transition-colors"
              >
                🏠 Home
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.slug} ref={cat.slug === "vyapar" ? vyaparTabRef : undefined}>
                <Link
                  href={`/${cat.slug}`}
                  className="flex items-center gap-1.5 h-11 px-3.5 text-gray-300 font-medium hover:text-white hover:bg-[#E84A0C] transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.englishName}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/videos"
                className="flex items-center gap-1.5 h-11 px-3.5 text-amber-400 font-semibold hover:text-white hover:bg-[#E84A0C] transition-colors"
              >
                <span>🎥</span>
                <span>Videos</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1C1208] p-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo-emblem.png"
                  alt="ख़बर गणित"
                  width={36}
                  height={36}
                  className="h-[32px] w-auto object-contain"
                />
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1 leading-none">
                    <span className="text-white text-lg font-sarala font-extrabold">खबर</span>
                    <span className="text-[#FE5C01] text-lg font-sarala font-extrabold">गणित</span>
                  </div>
                  <span className="text-[9px] font-sarala text-[#FE5C01] mt-0.5">
                    हर ख़बर की कहानी, आँकड़ों की ज़ुबानी
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-sarala focus:outline-none focus:border-[#E84A0C]"
                />
                <button
                  type="submit"
                  className="bg-[#E84A0C] text-white px-3 py-2 rounded-lg font-jost text-xs font-semibold"
                >
                  खोजें
                </button>
              </form>
            </div>

            {/* Mobile Navigation List (in English) */}
            <div className="p-4 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-jost font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#E84A0C] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                🏠 Home
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-jost text-gray-700 hover:bg-orange-50 hover:text-[#E84A0C] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.englishName}</span>
                </Link>
              ))}
              <Link
                href="/videos"
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-jost font-semibold text-amber-600 hover:bg-orange-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-lg">🎥</span>
                <span>Videos</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
