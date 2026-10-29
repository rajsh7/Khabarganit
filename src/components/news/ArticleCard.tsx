"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, Clock } from "lucide-react";
import { formatRelativeDate, formatViews } from "@/lib/utils";

export interface Article {
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

// Fallback safe image component preventing broken image icon
export function SafeImage({
  src,
  alt,
  fill,
  className,
  priority,
  categoryColor,
}: {
  src?: string | null;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  categoryColor?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1c1208] via-gray-900 to-gray-800 ${
          className || ""
        }`}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${categoryColor || "#E84A0C"} 0%, transparent 70%)`,
          }}
        />
        <span className="text-3xl opacity-60 relative z-10">📰</span>
        <span className="text-[10px] font-jost text-gray-400 mt-1 uppercase tracking-wider relative z-10">
          ख़बर गणित
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}

// Main featured Hero Card (Left 2 columns) — News outside & below the image
export function HeroCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col w-full bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200/80 overflow-hidden transition-all duration-300"
    >
      {/* Hero Image Container */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-gray-100">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          categoryColor={article.category.color}
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* News Content Outside / Below the Image */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            {article.breaking && (
              <span className="bg-[#E84A0C] text-white text-xs font-jost font-bold px-2 py-0.5 rounded animate-pulse">
                🔴 ब्रेकिंग
              </span>
            )}
            <span
              className="category-badge text-white text-xs font-semibold px-2.5 py-0.5 rounded"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
          </div>
          <h2 className="text-gray-900 font-jost font-bold text-xl sm:text-2xl lg:text-3xl leading-snug mb-3 group-hover:text-[#E84A0C] transition-colors line-clamp-3">
            {article.title}
          </h2>
          {article.excerpt && (
            <p className="text-gray-600 text-sm sm:text-base font-sarala leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-xs font-jost pt-3 border-t border-gray-100 mt-auto">
          <span className="text-gray-700 font-medium">{article.author.name}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {article.publishedAt ? formatRelativeDate(article.publishedAt) : ""}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {formatViews(article.views)}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Compact Hero Card for Right-side hero stack — News outside & below the image
export function CompactHeroCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col w-full bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200/80 overflow-hidden transition-all duration-300 flex-1"
    >
      {/* Compact Image Container */}
      <div className="relative w-full aspect-[16/9] sm:h-[150px] overflow-hidden bg-gray-100">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          categoryColor={article.category.color}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* News Content Outside / Below the Image */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {article.breaking && (
              <span className="bg-[#E84A0C] text-white text-[10px] font-jost font-bold px-1.5 py-0.5 rounded animate-pulse">
                🔴 ब्रेकिंग
              </span>
            )}
            <span
              className="category-badge text-white text-[10px] font-semibold px-2 py-0.5 rounded"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
          </div>
          <h3 className="text-gray-900 font-jost font-bold text-sm sm:text-base leading-snug mb-1.5 group-hover:text-[#E84A0C] transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-600 text-xs font-sarala leading-relaxed line-clamp-2 mb-2">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-[11px] font-jost pt-2 border-t border-gray-100 mt-auto">
          <span className="text-gray-700 font-medium">{article.author.name}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {article.publishedAt ? formatRelativeDate(article.publishedAt) : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Standard card for feeds
export function ArticleCard({
  article,
  size = "md",
}: {
  article: Article;
  size?: "sm" | "md" | "lg";
}) {
  const isLg = size === "lg";
  const isSm = size === "sm";

  return (
    <Link
      href={`/article/${article.slug}`}
      className="article-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col h-full"
    >
      <div
        className={`relative overflow-hidden flex-shrink-0 w-full ${
          isLg ? "h-52" : isSm ? "h-36" : "h-44"
        }`}
      >
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          categoryColor={article.category.color}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.breaking && (
          <span className="absolute top-2.5 left-2.5 bg-[#E84A0C] text-white text-[11px] font-jost font-bold px-2 py-0.5 rounded shadow animate-pulse z-10">
            🔴 LIVE
          </span>
        )}
        <span
          className="absolute top-2.5 right-2.5 category-badge text-white text-[10px] shadow z-10"
          style={{ backgroundColor: article.category.color }}
        >
          {article.category.name}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3
          className={`font-jost font-bold text-gray-900 group-hover:text-[#E84A0C] transition-colors leading-snug mb-2 ${
            isLg ? "text-lg" : isSm ? "text-sm" : "text-base"
          } line-clamp-2`}
        >
          {article.title}
        </h3>
        {!isSm && article.excerpt && (
          <p className="text-gray-500 text-xs font-sarala line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-gray-400 font-jost border-t border-gray-50">
          <span className="truncate max-w-[120px]">{article.author.name}</span>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.publishedAt ? formatRelativeDate(article.publishedAt) : ""}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {formatViews(article.views)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Horizontal list card
export function ListCard({
  article,
  index,
}: {
  article: Article;
  index?: number;
}) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0"
    >
      {index !== undefined && (
        <span className="font-jost font-black text-2xl text-gray-300 group-hover:text-[#E84A0C] w-7 flex-shrink-0 leading-none pt-1 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          categoryColor={article.category.color}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="inline-block text-[10px] font-jost font-semibold mb-1 px-1.5 py-0.5 rounded text-white"
          style={{ backgroundColor: article.category.color }}
        >
          {article.category.name}
        </span>
        <h4 className="text-xs sm:text-sm font-jost font-semibold text-gray-800 group-hover:text-[#E84A0C] transition-colors leading-snug line-clamp-2">
          {article.title}
        </h4>
        <p className="text-[11px] text-gray-400 mt-1 font-jost flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {article.publishedAt ? formatRelativeDate(article.publishedAt) : ""}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={10} />
            {formatViews(article.views)}
          </span>
        </p>
      </div>
    </Link>
  );
}
