import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArticleCard } from "@/components/news/ArticleCard";
import { SAMPLE_ARTICLES } from "@/lib/constants";
import { Search } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || "";
  const results = query
    ? SAMPLE_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <Header />
      <main className="bg-[#F4F4F4] min-h-screen">
        <div className="bg-[#1C1208] py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-white font-jost font-black text-2xl mb-4">खबर खोजें</h1>
            <form className="flex gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="कोई भी विषय खोजें..."
                  className="w-full bg-white border-0 rounded-xl pl-12 pr-4 py-3 font-sarala text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E84A0C]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#E84A0C] text-white font-jost font-bold px-8 py-3 rounded-xl hover:bg-[#C13A08] transition-colors"
              >
                खोजें
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 py-8">
          {query && (
            <p className="font-sarala text-gray-600 mb-6">
              <strong className="font-jost">"{query}"</strong> के लिए{" "}
              <strong className="text-[#E84A0C]">{results.length}</strong> परिणाम मिले
            </p>
          )}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <p className="font-jost font-bold text-xl text-gray-700 mb-2">कोई परिणाम नहीं मिला</p>
              <p className="font-sarala text-gray-500">अलग शब्दों से खोजने का प्रयास करें।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {SAMPLE_ARTICLES.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
