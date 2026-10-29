"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Megaphone,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "डैशबोर्ड", icon: LayoutDashboard },
  { href: "/admin/articles", label: "लेख", icon: FileText },
  { href: "/admin/categories", label: "विभाग", icon: FolderOpen },
  { href: "/admin/users", label: "उपयोगकर्ता", icon: Users },
  { href: "/admin/ads", label: "विज्ञापन स्लॉट", icon: Megaphone },
  { href: "/admin/analytics", label: "एनालिटिक्स", icon: BarChart3 },
  { href: "/admin/settings", label: "सेटिंग्स", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#1C1208] min-h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <Image src="/logo.png" alt="खबरगणित" width={150} height={42} className="object-contain brightness-0 invert" />
        <p className="text-xs text-gray-500 font-jost mt-1">Admin CRM</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`admin-sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={14} className="text-[#E84A0C]" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-[#E84A0C] rounded-full flex items-center justify-center text-white font-jost font-bold text-sm">
            A
          </div>
          <div>
            <p className="text-white font-jost text-sm font-semibold">Admin</p>
            <p className="text-gray-500 text-xs">admin@khabarganit.in</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 text-gray-500 hover:text-red-400 text-xs font-jost transition-colors">
          <LogOut size={14} /> साइन आउट
        </button>
      </div>
    </aside>
  );
}
