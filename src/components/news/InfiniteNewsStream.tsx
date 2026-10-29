"use client";

import { useEffect, useRef, useState } from "react";
import { ArticleCard, Article } from "@/components/news/ArticleCard";
import AdSlot from "@/components/ads/AdSlot";
import { Loader2, Radio } from "lucide-react";

export default function InfiniteNewsStream({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          loadMoreNews();
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [loading, loadCount, articles.length]);

  const loadMoreNews = () => {
    setLoading(true);

    // Simulate real-time continuous feed arrival
    setTimeout(() => {
      const nextBatchIndex = (loadCount * 4) % initialArticles.length;
      const sliced = [
        ...initialArticles.slice(nextBatchIndex, nextBatchIndex + 4),
        ...initialArticles.slice(0, Math.max(0, 4 - (initialArticles.length - nextBatchIndex))),
      ].slice(0, 4);

      // Create new fresh article clones with unique keys and realistic metadata
      const newClones: Article[] = sliced.map((item, idx) => ({
        ...item,
        id: `stream-${loadCount}-${idx}-${Date.now()}`,
        slug: `${item.slug}?batch=${loadCount}&idx=${idx}`,
        views: item.views + Math.floor((loadCount * 170) + (idx * 45)),
        publishedAt: new Date(Date.now() - (idx * 1800000 + loadCount * 3600000)),
      }));

      setArticles((prev) => [...prev, ...newClones]);
      setLoadCount((prev) => prev + 1);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {articles.map((article, index) => (
          <div key={article.id} className="contents">
            <ArticleCard article={article} />

            {/* Organically insert an in-feed ad every 8 articles */}
            {(index + 1) % 8 === 0 && (
              <div className="sm:col-span-2 py-4 flex justify-center">
                <AdSlot
                  position={`stream-feed-${index}`}
                  width={728}
                  height={90}
                  label="इन-फ़ीड विज्ञापन (In-Feed Ad 728×90)"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Infinite Sentinel & Live Status */}
      <div ref={sentinelRef} className="py-6 flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm px-6 py-3 rounded-full text-sm font-jost text-gray-700 animate-pulse">
            <Loader2 size={18} className="animate-spin text-[#E84A0C]" />
            <span className="font-semibold text-gray-800">
              और ताज़ा खबरें लोड हो रही हैं...
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-jost text-gray-400">
            <Radio size={14} className="text-[#E84A0C] animate-ping" />
            <span>अविरल लाइव न्यूज़ स्ट्रीम सक्रिय है (Never-Ending Feed)</span>
          </div>
        )}
      </div>
    </div>
  );
}
