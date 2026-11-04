"use client";

import AdminNavbar from "@/components/admin/AdminNavbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Top Curved Navbar with White Background and Logout at top-right */}
      <AdminNavbar />

      {/* Main Admin Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {children}
      </main>
    </div>
  );
}
