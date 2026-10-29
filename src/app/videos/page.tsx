import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { SafeImage } from "@/components/news/ArticleCard";
import AdSlot from "@/components/ads/AdSlot";
import { SAMPLE_ARTICLES } from "@/lib/constants";
import { formatRelativeDate, formatViews } from "@/lib/utils";
import Link from "next/link";
import { Play, Clock, Eye, Film } from "lucide-react";

export const metadata = {
  title: "वीडियो समाचार (Video News) — ख़बर गणित",
  description: "ख़बर गणित वीडियो: देश-दुनिया की बड़ी खबरों के एक्सक्लूसिव वीडियो, ग्राउंड रिपोर्ट और खास विश्लेषण।",
};

export default function VideosPage() {
  const videoArticles = SAMPLE_ARTICLES.filter((a) => a.isVideo);
  const featuredVideo = videoArticles[0] || SAMPLE_ARTICLES[0];
  const regularVideos = videoArticles.slice(1);
  const trending = [...SAMPLE_ARTICLES].sort((a, b) => b.views - a.views);

  return (
    <>
      <Header />
      <main className="bg-[#F4F4F4] min-h-screen">
        {/* Page Banner */}
        <div className="bg-[#1C1208] text-white py-8 border-b-2 border-[#E84A0C]">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center gap-2 text-xs font-jost text-gray-400 mb-2">
              <Link href="/" className="hover:text-white transition-colors">
                होम
              </Link>
              <span>›</span>
              <span className="text-[#E84A0C] font-semibold">वीडियो समाचार</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-3 bg-[#E84A0C] text-white rounded-2xl shadow-sm">
                <Film size={26} />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-jost font-black text-white">
                  ख़बर गणित वीडियो हब
                </h1>
                <p className="text-gray-300 text-sm font-sarala mt-0.5">
                  ग्राउंड रिपोर्ट, एक्सक्लूसिव इंटरव्यू, मैच हाइलाइट्स और विशेष विश्लेषण
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="max-w-screen-xl mx-auto px-4 flex justify-center">
            <AdSlot
              position="videos-top"
              width={728}
              height={90}
              label="वीडियो हब शीर्ष विज्ञापन (728×90)"
            />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Stream */}
            <div className="lg:col-span-2 space-y-10">
              {/* Featured Big Video */}
              <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                <div className="relative w-full h-[320px] sm:h-[420px] group cursor-pointer">
                  <SafeImage
                    src={featuredVideo.image}
                    alt={featuredVideo.title}
                    fill
                    priority
                    className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E84A0C] text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play size={32} className="ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute top-4 right-4 bg-black/80 text-white font-jost font-bold text-xs px-2.5 py-1 rounded-md border border-white/20">
                    ⏱ {featuredVideo.videoDuration || "06:20"}
                  </span>

                  {/* Category Pill */}
                  <span
                    className="absolute top-4 left-4 category-badge text-white text-xs px-2.5 py-1 rounded shadow"
                    style={{ backgroundColor: featuredVideo.category.color }}
                  >
                    विशेष वीडियो
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h2 className="text-white font-jost font-bold text-lg sm:text-2xl leading-snug mb-2 group-hover:text-[#F5A623] transition-colors">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm font-sarala line-clamp-2 mb-3">
                      {featuredVideo.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-jost text-gray-400">
                      <span className="text-gray-300">रिपोर्टर: {featuredVideo.author.name}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {featuredVideo.publishedAt ? formatRelativeDate(featuredVideo.publishedAt) : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {formatViews(featuredVideo.views)} व्यूज
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Grid (5 videos) */}
              <div>
                <h3 className="font-jost font-black text-xl text-gray-900 pl-3 border-l-4 border-[#E84A0C] mb-6 uppercase">
                  सभी ताज़ा वीडियो बुलेटिन
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {regularVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-all"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative w-full h-44 overflow-hidden">
                        <SafeImage
                          src={video.image}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />

                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 bg-black/70 group-hover:bg-[#E84A0C] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow">
                            <Play size={18} className="ml-0.5 fill-current" />
                          </div>
                        </div>

                        {/* Duration */}
                        <span className="absolute bottom-2.5 right-2.5 bg-black/85 text-white font-jost font-semibold text-[11px] px-2 py-0.5 rounded">
                          {video.videoDuration || "04:15"}
                        </span>

                        <span
                          className="absolute top-2.5 left-2.5 category-badge text-white text-[10px]"
                          style={{ backgroundColor: video.category.color }}
                        >
                          {video.category.name}
                        </span>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-jost font-bold text-gray-900 group-hover:text-[#E84A0C] transition-colors leading-snug line-clamp-2 text-sm sm:text-base mb-2">
                          {video.title}
                        </h4>
                        <p className="text-gray-500 text-xs font-sarala line-clamp-2 mb-3">
                          {video.excerpt}
                        </p>
                        <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-gray-400 font-jost border-t border-gray-50">
                          <span>{video.author.name}</span>
                          <div className="flex items-center gap-2.5">
                            <span className="flex items-center gap-1">
                              <Eye size={11} />
                              {formatViews(video.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {video.publishedAt ? formatRelativeDate(video.publishedAt) : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mid-page Ad Slot */}
              <div className="my-6 flex justify-center">
                <AdSlot
                  position="videos-in-feed"
                  width={728}
                  height={90}
                  label="वीडियो फ़ीड विज्ञापन (728×90)"
                />
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
