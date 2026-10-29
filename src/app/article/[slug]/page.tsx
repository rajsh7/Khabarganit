import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArticleCard, ListCard, SafeImage } from "@/components/news/ArticleCard";
import AdSlot from "@/components/ads/AdSlot";
import { SAMPLE_ARTICLES } from "@/lib/constants";
import { formatDate, formatViews } from "@/lib/utils";
import { Eye, Clock, Share2, Link as LinkIcon } from "lucide-react";

export async function generateStaticParams() {
  return SAMPLE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = SAMPLE_ARTICLES.find((a) => a.slug === slug) || SAMPLE_ARTICLES[0];
  const sameCat = SAMPLE_ARTICLES.filter(
    (a) => a.id !== article.id && a.category.slug === article.category.slug
  );
  const related = sameCat.length >= 2 ? sameCat.slice(0, 4) : SAMPLE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 4);

  return (
    <>
      <Header />
      <main className="bg-[#F4F4F4] min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Article */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Article Image */}
                <div className="relative w-full h-72 sm:h-96">
                  <SafeImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    categoryColor={article.category.color}
                    priority
                  />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="category-badge text-white text-xs"
                      style={{ backgroundColor: article.category.color }}
                    >
                      {article.category.name}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Breaking badge */}
                  {article.breaking && (
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-jost font-bold px-3 py-1 rounded mb-4">
                      <span className="animate-pulse">●</span> ब्रेकिंग न्यूज़
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="font-jost font-black text-2xl sm:text-3xl text-gray-900 leading-snug mb-4">
                    {article.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 pb-4 mb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#E84A0C] rounded-full flex items-center justify-center text-white font-jost font-bold text-sm">
                        {article.author.name[0]}
                      </div>
                      <span className="text-sm font-jost font-semibold text-gray-700">{article.author.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-jost flex items-center gap-1">
                      <Clock size={14} />
                      {article.publishedAt ? formatDate(article.publishedAt) : ""}
                    </span>
                    <span className="text-sm text-gray-500 font-jost flex items-center gap-1">
                      <Eye size={14} />
                      {formatViews(article.views)} पाठक
                    </span>
                    {article.source && (
                      <span className="text-xs font-jost font-medium px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/60 rounded">
                        📌 स्रोत: {article.source}
                      </span>
                    )}
                  </div>

                  {/* Share bar */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-jost font-semibold text-gray-500 uppercase tracking-wide">शेयर करें:</span>
                    <button className="flex items-center gap-1.5 bg-[#1877F2] text-white text-xs font-jost font-semibold px-3 py-1.5 rounded hover:opacity-90 transition-opacity">
                      <Image src="/social/facebook.png" alt="Facebook" width={14} height={14} className="w-3.5 h-3.5 object-contain" /> Facebook
                    </button>
                    <button className="flex items-center gap-1.5 bg-black text-white text-xs font-jost font-semibold px-3 py-1.5 rounded hover:opacity-90 transition-opacity">
                      <Image src="/social/twitter.png" alt="Twitter" width={14} height={14} className="w-3.5 h-3.5 object-contain" /> X (Twitter)
                    </button>
                    <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white text-xs font-jost font-semibold px-3 py-1.5 rounded hover:opacity-90 transition-opacity">
                      <Image src="/social/instagram.png" alt="Instagram" width={14} height={14} className="w-3.5 h-3.5 object-contain" /> Instagram
                    </button>
                    <button className="flex items-center gap-1.5 bg-gray-200 text-gray-700 text-xs font-jost font-semibold px-3 py-1.5 rounded hover:bg-gray-300 transition-colors">
                      <LinkIcon size={12} /> लिंक कॉपी
                    </button>
                  </div>

                  {/* Content */}
                  <div className="prose max-w-none font-sarala text-gray-700 leading-relaxed text-base">
                    {article.excerpt && (
                      <p className="text-lg font-semibold text-gray-800 mb-5 leading-relaxed bg-orange-50/60 p-4 rounded-lg border-l-4 border-[#E84A0C]">
                        {article.excerpt}
                      </p>
                    )}
                    {article.content && article.content.length > 0 ? (
                      article.content.map((para, idx) => (
                        <div key={idx}>
                          {para.startsWith("## ") ? (
                            <h2 className="text-xl font-bold font-jost text-gray-900 mt-6 mb-3">{para.replace("## ", "")}</h2>
                          ) : (
                            <p className="mb-4 text-justify leading-relaxed">{para}</p>
                          )}
                          {idx === 1 && (
                            <div className="my-6 flex justify-center not-prose">
                              <AdSlot position="in-article" width={300} height={250} label="In-Article Ad 300×250" />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <p className="mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="my-6 flex justify-center not-prose">
                          <AdSlot position="in-article" width={300} height={250} label="In-Article Ad 300×250" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <span className="text-xs font-jost font-semibold text-gray-500 uppercase tracking-wide">टैग्स: </span>
                    {(article.tags && article.tags.length > 0
                      ? article.tags
                      : [article.category.name, "ताज़ा ख़बर", "भारत 2026"]
                    ).map((tag) => (
                      <a
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="inline-block mr-2 mt-2 px-3 py-1 bg-gray-100 hover:bg-[#E84A0C] hover:text-white text-xs font-jost rounded transition-colors text-gray-600"
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              {/* Related */}
              <div className="mt-8">
                <h3 className="font-jost font-black text-lg text-gray-900 mb-4 pl-3 border-l-4 border-[#E84A0C] uppercase">
                  संबंधित खबरें
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} size="sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AdSlot position="article-sidebar-top" width={300} height={250} />
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#1C1208] px-4 py-3">
                  <h3 className="text-white font-jost font-bold text-sm uppercase">और पढ़ें</h3>
                </div>
                {related.map((a) => (
                  <ListCard key={a.id} article={a} />
                ))}
              </div>
              <AdSlot position="article-sidebar-mid" width={300} height={600} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
