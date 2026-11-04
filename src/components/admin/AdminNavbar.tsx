"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  BarChart3,
  Zap,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Clock,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/pipeline", label: "Pipeline", icon: Zap },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-2 sm:px-6 pt-2 pb-0">
      {/* Curved White Navbar Container */}
      <div className="w-full bg-white text-black border border-stone-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-md">
        
        {/* Left: Brand & Live Newspaper Link */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-serif font-black text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform">
              खग
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-playfair font-black text-base sm:text-lg tracking-tight uppercase text-black leading-tight">
                  KhabarGanit
                </span>
                <span className="text-[10px] font-sans font-bold bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200 tracking-wider">
                  ADMIN
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 block">
                NEWSROOM OS v2.4
              </span>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-[11px] font-sans font-medium text-stone-600 hover:text-black bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg border border-stone-200 transition-colors"
            title="View Live Broadsheet Website"
          >
            <span>View Broadsheet</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {/* Center: Top Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || (href !== "/admin" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-sans transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-black text-white font-semibold shadow-xs"
                    : "text-stone-700 hover:text-black hover:bg-stone-100/90 font-medium"
                }`}
              >
                <Icon size={16} className={isActive ? "text-white" : "text-stone-500"} />
                <span className="tracking-wide">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Live Badge + User + Top Right Logout Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* 24h Purge Status Badge */}
          <div className="hidden xl:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl text-[11px] font-sans font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>1-Day Retention (24h Auto-Purge)</span>
          </div>

          {/* User Profile Mini */}
          <div className="hidden md:flex items-center gap-2 bg-stone-50 border border-stone-200 px-2.5 py-1.5 rounded-xl">
            <div className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
              N
            </div>
            <span className="text-xs font-mono font-medium text-stone-700 max-w-[130px] truncate">
              newsroom@khabarganit.com
            </span>
          </div>

          {/* TOP RIGHT LOGOUT BUTTON (Pure black text, clean white curved border) */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-black hover:text-red-600 hover:bg-red-50 hover:border-red-300 border border-stone-300 rounded-xl text-xs sm:text-sm font-sans font-semibold shadow-2xs transition-all cursor-pointer"
            title="Log out of KhabarGanit Admin"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
