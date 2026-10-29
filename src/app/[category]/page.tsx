import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { ArticleCard } from "@/components/news/ArticleCard";
import AdSlot from "@/components/ads/AdSlot";
import { SAMPLE_ARTICLES, CATEGORIES } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  const trending = [...SAMPLE_ARTICLES].sort((a, b) => b.views - a.views);

  if (!cat) {
    notFound();
  }

  // Filter 5-6 articles specific to this section
  const categoryArticles = SAMPLE_ARTICLES.filter(
    (a) => a.category.slug === cat.slug
  );

  const displayArticles =
    categoryArticles.length > 0 ? categoryArticles : SAMPLE_ARTICLES.slice(0, 6);

  return (
    <>
      <Header />
      <main className="bg-[#F4F4F4] min-h-screen">
        {/* Category Header */}
        <div className="bg-[#1C1208] py-8 border-b-2 border-[#E84A0C]">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center gap-2 text-xs font-jost text-gray-400 mb-3">
              <Link href="/" className="hover:text-white transition-colors">
                होम
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#E84A0C] font-semibold">{cat.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl p-3 bg-white/10 rounded-2xl border border-white/10">
                {cat.icon}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-jost font-black text-white">
                  {cat.name} समाचार
                </h1>
                <p className="text-gray-300 text-sm font-sarala mt-1">
                  {cat.description || `${cat.name} से जुड़ी हर ताज़ा ख़बर और विश्लेषण`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="bg-white border-b border-gray-200 py-3.5">
          <div className="max-w-screen-xl mx-auto px-4 flex justify-center">
            <AdSlot
              position="category-top"
              width={728}
              height={90}
              label={`${cat.name} शीर्ष विज्ञापन (728×90)`}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
                <p className="text-sm font-jost text-gray-600 font-semibold">
                  कुल {displayArticles.length} विशेष खबरें प्रदर्शित
                </p>
                <span
                  className="category-badge text-white text-xs px-2.5 py-1 rounded"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.name}
                </span>
              </div>

              {/* 5-6 Articles Specific to this Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {displayArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* In-feed Ad Slot */}
              <div className="my-8 flex justify-center">
                <AdSlot
                  position={`category-mid-${cat.slug}`}
                  width={728}
                  height={90}
                  label="इन-फ़ीड विज्ञापन (728×90)"
                />
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-lg font-jost font-bold text-sm transition-colors ${
                      p === 1
                        ? "bg-[#E84A0C] text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#E84A0C] hover:text-[#E84A0C]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button className="px-3.5 h-9 rounded-lg font-jost text-sm bg-white border border-gray-200 text-gray-600 hover:border-[#E84A0C] transition-colors">
                  अगला →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="relative">
              <Sidebar trendingArticles={trending} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
