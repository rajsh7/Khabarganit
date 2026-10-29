import { ListCard } from "@/components/news/ArticleCard";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
  category: { name: string; slug: string; color: string };
  author: { name: string };
  publishedAt: Date | null;
  views: number;
  featured?: boolean;
  breaking?: boolean;
}

export default function Sidebar({ trendingArticles }: { trendingArticles: Article[] }) {
  return (
    <aside className="space-y-6">
      {/* Ad Slot — Sidebar Top (300x250) */}
      <div className="flex justify-center">
        <AdSlot position="sidebar-top" width={300} height={250} label="300×250 Sidebar Top" />
      </div>

      {/* Trending */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1C1208] px-4 py-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-[#E84A0C]" />
          <h3 className="text-white font-jost font-bold text-sm uppercase tracking-wider">
            सर्वाधिक पढ़े गए
          </h3>
        </div>
        <div>
          {trendingArticles.slice(0, 5).map((article, i) => (
            <ListCard key={article.id} article={article} index={i} />
          ))}
        </div>
        <div className="p-3 border-t border-gray-100">
          <Link href="/trending" className="block text-center text-xs font-jost font-semibold text-[#E84A0C] hover:text-[#C13A08]">
            और देखें →
          </Link>
        </div>
      </div>

      {/* Ad Slot — Sidebar Middle (300x600) */}
      <div className="flex justify-center">
        <AdSlot position="sidebar-middle" width={300} height={600} label="300×600 Half Page" />
      </div>

      {/* Category Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1C1208] px-4 py-3">
          <h3 className="text-white font-jost font-bold text-sm uppercase tracking-wider">
            विभाग
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-px bg-gray-100">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="bg-white px-3 py-3 text-xs font-jost font-semibold text-gray-700 hover:text-white hover:bg-[#E84A0C] transition-colors flex items-center gap-1.5"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Slot — Sidebar Bottom (300x250) */}
      <div className="flex justify-center">
        <AdSlot position="sidebar-bottom" width={300} height={250} label="300×250 Sidebar Bottom" />
      </div>
    </aside>
  );
}
