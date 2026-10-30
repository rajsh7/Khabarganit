/**
 * KhabarGanit Autonomous URL News Scraper & Ingestion Engine
 * Extracts headlines, subheads, substantive body paragraphs,
 * high-resolution editorial photos, and embedded video dispatches
 * from PIB, national wire agencies, and global news sources.
 */

export interface ScrapedNews {
  url: string;
  headline: string;
  subhead?: string;
  summary?: string;
  paragraphs: string[];
  image?: string;
  imageCaption?: string;
  galleryImages: string[];
  videoUrl?: string;
  sectionKey: "TRENDING" | "WORLD" | "INDIA" | "BUSINESS" | "TECH" | "SPORTS" | "POLITICS" | "ENTERTAINMENT";
  kicker: string;
  author?: string;
  location?: string;
  publishedAt?: string;
}

// Comprehensive HTML entity decoder
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&bull;/g, "•")
    .replace(/&#8377;/g, "₹")
    .replace(/&#(\d+);/g, (_, code) => {
      try {
        return String.fromCharCode(parseInt(code, 10));
      } catch {
        return "";
      }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => {
      try {
        return String.fromCharCode(parseInt(code, 16));
      } catch {
        return "";
      }
    })
    .trim();
}

// Clean HTML tags and scripts into plain text
export function cleanHtmlText(html: string): string {
  if (!html) return "";
  return decodeHtmlEntities(
    html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

// Extract OpenGraph / Twitter / Standard Meta tags
export function extractMeta(html: string, propertyOrName: string): string | undefined {
  const regex1 = new RegExp(
    `<meta\\s+[^>]*?(?:property|name)=["']${propertyOrName}["'][^>]*?content=["']([^"']*)["']`,
    "i"
  );
  const match1 = html.match(regex1);
  if (match1 && match1[1]) return decodeHtmlEntities(match1[1]);

  const regex2 = new RegExp(
    `<meta\\s+[^>]*?content=["']([^"']*)["'][^>]*?(?:property|name)=["']${propertyOrName}["']`,
    "i"
  );
  const match2 = html.match(regex2);
  if (match2 && match2[1]) return decodeHtmlEntities(match2[1]);

  return undefined;
}

// Extract Schema.org JSON-LD Article
export function extractJsonLd(html: string): any {
  const matches = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const m of matches) {
    try {
      const data = JSON.parse(m[1].trim());
      const items = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      for (const item of items) {
        const type = String(item["@type"] || "");
        if (
          type.includes("Article") ||
          type.includes("News") ||
          type.includes("Report") ||
          item.headline ||
          item.articleBody
        ) {
          return item;
        }
      }
    } catch {}
  }
  return null;
}

// Extract Video (YouTube, MP4, og:video)
export function extractVideo(html: string): string | undefined {
  // 1. YouTube embeds or links
  const ytMatch = html.match(
    /(?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // 2. OpenGraph video
  const ogVideo = extractMeta(html, "og:video") || extractMeta(html, "og:video:url") || extractMeta(html, "og:video:secure_url");
  if (ogVideo) {
    const ytInOg = ogVideo.match(
      /(?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
    );
    if (ytInOg && ytInOg[1]) {
      return `https://www.youtube.com/embed/${ytInOg[1]}`;
    }
    if (ogVideo.startsWith("http")) return ogVideo;
  }

  // 3. HTML5 <video src="...">
  const videoMatch = html.match(/<video[^>]+src=["']([^"']+)["']/i);
  if (videoMatch && videoMatch[1] && videoMatch[1].startsWith("http")) {
    return videoMatch[1];
  }

  return undefined;
}

// Extract valid, high-resolution editorial photos
export function extractImages(html: string, baseUrl: string, jsonLd: any): { primary?: string; gallery: string[] } {
  const images: string[] = [];

  // Helper to test if image is a valid editorial photo
  const isValidPhoto = (url?: string): boolean => {
    if (!url || typeof url !== "string") return false;
    const lower = url.toLowerCase();
    if (!lower.startsWith("http")) return false;
    // Filter out icons, tracking pixels, logos, badges, and ads
    const junkPatterns = [
      "pixel",
      "logo",
      "icon",
      "emblem",
      "favicon",
      "blank.gif",
      "spacer.gif",
      "ad.",
      "ads.",
      "analytics",
      "facebook.com/tr",
      "doubleclick",
      "gravatar",
      ".svg",
      "1x1",
    ];
    return !junkPatterns.some((pattern) => lower.includes(pattern));
  };

  // 1. Check og:image & twitter:image
  const ogImg = extractMeta(html, "og:image:secure_url") || extractMeta(html, "og:image");
  if (isValidPhoto(ogImg)) images.push(ogImg!);

  const twitterImg = extractMeta(html, "twitter:image");
  if (isValidPhoto(twitterImg) && !images.includes(twitterImg!)) images.push(twitterImg!);

  // 2. Check JSON-LD
  if (jsonLd?.image) {
    const jl = jsonLd.image;
    if (typeof jl === "string" && isValidPhoto(jl)) {
      if (!images.includes(jl)) images.push(jl);
    } else if (Array.isArray(jl)) {
      for (const item of jl) {
        const u = typeof item === "string" ? item : item?.url;
        if (isValidPhoto(u) && !images.includes(u)) images.push(u);
      }
    } else if (typeof jl === "object" && jl?.url && isValidPhoto(jl.url)) {
      if (!images.includes(jl.url)) images.push(jl.url);
    }
  }

  // 3. In-page images (especially PIB release images like /WriteReadData/userfiles/...)
  const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  for (const match of imgMatches) {
    let src = match[1];
    if (src) {
      try {
        const absolute = new URL(src, baseUrl).href;
        if (isValidPhoto(absolute) && !images.includes(absolute)) {
          // If it's a PIB userfile or press release photo, prioritize it!
          if (absolute.includes("WriteReadData") || absolute.includes("userfiles") || absolute.includes("content")) {
            images.unshift(absolute);
          } else {
            images.push(absolute);
          }
        }
      } catch {}
    }
  }

  return {
    primary: images[0],
    gallery: images.slice(1, 5),
  };
}

// Clean and extract substantive story paragraphs
export function extractParagraphs(html: string, jsonLd: any, domain: string): string[] {
  const paragraphs: string[] = [];

  // Helper to validate substantive paragraphs
  const isJunkParagraph = (p: string): boolean => {
    if (!p || p.length < 25) return true;
    const lower = p.toLowerCase();
    const junkStarters = [
      "also read:",
      "read also:",
      "click here to",
      "subscribe to",
      "follow us on",
      "follow our whatsapp",
      "download our app",
      "advertisement",
      "sponsored content",
      "all rights reserved",
      "copyright ©",
      "terms of use",
      "privacy policy",
      "cookie policy",
      "share this story",
      "listen to this story",
    ];
    return junkStarters.some((j) => lower.startsWith(j) || lower.includes(j));
  };

  // 1. PIB Specific Extraction
  if (domain.includes("pib.gov.in")) {
    const pibContainerMatch =
      html.match(/<div[^>]+id=["']?Release-Details["']?[^>]*>([\s\S]*?)<\/div>/i) ||
      html.match(/<div[^>]+class=["'][^"']*innner-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);

    const contentHtml = pibContainerMatch ? pibContainerMatch[1] : html;
    const pMatches = contentHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);

    for (const match of pMatches) {
      const text = cleanHtmlText(match[1]);
      if (!isJunkParagraph(text)) {
        paragraphs.push(text);
      }
    }

    if (paragraphs.length > 0) return paragraphs;
  }

  // 2. Check JSON-LD articleBody
  if (jsonLd?.articleBody && typeof jsonLd.articleBody === "string") {
    const rawBody = cleanHtmlText(jsonLd.articleBody);
    const chunks = rawBody.split(/(?:\r?\n){1,2}/).map((c) => c.trim()).filter((c) => !isJunkParagraph(c));
    if (chunks.length > 0) return chunks;
  }

  // 3. Look for semantic <article> or main content blocks
  const articleBlock =
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
    html.match(/<div[^>]+class=["'][^"']*(?:article-body|story-content|story-body|article__body|entry-content|main-content)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

  const targetHtml = articleBlock ? articleBlock[1] : html;
  const pMatches = targetHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);

  for (const match of pMatches) {
    const text = cleanHtmlText(match[1]);
    if (!isJunkParagraph(text)) {
      paragraphs.push(text);
    }
  }

  return paragraphs;
}

// Intelligent Category Classification
export function detectCategory(
  title: string,
  body: string,
  metaSection?: string,
  urlPath?: string
): ScrapedNews["sectionKey"] {
  const combined = `${title} ${body} ${metaSection || ""} ${urlPath || ""}`.toLowerCase();

  const scores: Record<ScrapedNews["sectionKey"], number> = {
    TRENDING: 0,
    POLITICS: 0,
    BUSINESS: 0,
    TECH: 0,
    SPORTS: 0,
    WORLD: 0,
    ENTERTAINMENT: 0,
    INDIA: 0,
  };

  const keywords: Record<ScrapedNews["sectionKey"], string[]> = {
    POLITICS: [
      "election", "bjp", "congress", "modi", "rahul gandhi", "parliament", "lok sabha",
      "rajya sabha", "cabinet", "supreme court", "governor", "assembly", "minister",
      "mlc", "political", "vote", "opposition", "voting", "constituency", "samajwadi party"
    ],
    BUSINESS: [
      "sensex", "nifty", "gdp", "rbi", "economy", "market", "inflation", "finance",
      "tax", "gst", "bank", "stock", "rupee", "earnings", "fiscal", "crore scheme",
      "semiconductor", "investment", "trade", "export", "import", "shares", "monetary policy"
    ],
    TECH: [
      "ai", "isro", "space", "satellite", "smartphone", "apple", "google", "chip",
      "software", "cyber", "technology", "tech", "gadget", "rocket", "algorithm",
      "digital", "nasa", "semiconductors", "computing"
    ],
    SPORTS: [
      "cricket", "bcci", "ipl", "wicket", "tournament", "football", "fifa", "olympics",
      "medal", "badminton", "tennis", "hockey", "match", "score", "stadium", "kohli",
      "rohit sharma", "century", "championship"
    ],
    WORLD: [
      "global", "united nations", "russia", "ukraine", "china", "israel", "gaza",
      "iran", "white house", "us president", "europe", "bilateral", "foreign minister",
      "geopolitics", "summit", "nato", "middle east", "diplomacy"
    ],
    ENTERTAINMENT: [
      "bollywood", "cinema", "film", "movie", "box office", "actor", "actress",
      "trailer", "song", "director", "theatre", "hollywood", "oscar", "ott"
    ],
    INDIA: [
      "delhi", "mumbai", "india", "national", "railway", "highway", "state government",
      "citizens", "police", "army", "navy", "air force", "defence"
    ],
    TRENDING: [],
  };

  for (const [cat, words] of Object.entries(keywords)) {
    const key = cat as ScrapedNews["sectionKey"];
    for (const w of words) {
      if (combined.includes(w)) {
        scores[key] += title.toLowerCase().includes(w) ? 4 : 1;
      }
    }
  }

  let topCategory: ScrapedNews["sectionKey"] = "INDIA";
  let maxScore = 0;

  for (const [cat, score] of Object.entries(scores)) {
    const key = cat as ScrapedNews["sectionKey"];
    if (score > maxScore) {
      maxScore = score;
      topCategory = key;
    }
  }

  return maxScore > 0 ? topCategory : "TRENDING";
}

// Generate source attribution kicker
export function extractSourceKicker(domain: string, siteName?: string): string {
  if (domain.includes("pib.gov.in")) return "PIB NEW DELHI";
  if (domain.includes("reuters.com")) return "REUTERS DISPATCH";
  if (domain.includes("bbc.")) return "BBC WORLD SERVICE";
  if (domain.includes("thehindu.com")) return "THE HINDU BUREAU";
  if (domain.includes("ndtv.com")) return "NDTV NATIONAL DESK";
  if (domain.includes("indianexpress.com")) return "THE INDIAN EXPRESS";
  if (domain.includes("timesofindia")) return "TIMES NEWS NETWORK";
  if (domain.includes("aninews.in") || domain.includes("ani.in")) return "ANI NEWS WIRE";
  if (domain.includes("apnews.com")) return "ASSOCIATED PRESS";
  if (domain.includes("bloomberg.com")) return "BLOOMBERG NEWS";

  if (siteName) return siteName.toUpperCase();
  const cleanDomain = domain.replace(/^www\./, "").split(".")[0].toUpperCase();
  return `${cleanDomain} WIRE`;
}

// Extract all URLs from a block of text
export function findUrlsInText(text: string): string[] {
  if (!text) return [];
  const urlRegex = /https?:\/\/[^\s<>"'{}|\\^`]+[^\s<>"'{}|\\^`.,;:!?)\]]/gi;
  const matches = text.match(urlRegex) || [];
  return Array.from(new Set(matches));
}

/**
 * Main Scraper: Fetches and parses any news URL
 */
export async function scrapeNewsUrl(rawUrl: string): Promise<ScrapedNews> {
  let targetUrl = rawUrl.trim();
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  const urlObj = new URL(targetUrl);
  const domain = urlObj.hostname.toLowerCase();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  let html = "";
  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} from ${domain}`);
    }

    html = await res.text();
  } finally {
    clearTimeout(timeoutId);
  }

  // 1. JSON-LD Schema
  const jsonLd = extractJsonLd(html);

  // 2. Headline
  let headline =
    extractMeta(html, "og:title") ||
    extractMeta(html, "twitter:title") ||
    jsonLd?.headline ||
    jsonLd?.name;

  if (!headline) {
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) headline = cleanHtmlText(h1Match[1]);
  }

  if (!headline) {
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch) headline = cleanHtmlText(titleMatch[1]);
  }

  if (headline) {
    headline = decodeHtmlEntities(headline)
      .replace(/\s*::\s*Press Information Bureau\s*$/i, "")
      .replace(/\s*\|\s*NDTV(?:\.com)?\s*$/i, "")
      .replace(/\s*-\s*The Hindu\s*$/i, "")
      .replace(/\s*-\s*Times of India\s*$/i, "")
      .replace(/\s*\|\s*Reuters\s*$/i, "")
      .replace(/\s*-\s*BBC News\s*$/i, "")
      .replace(/\s*\|\s*The Indian Express\s*$/i, "")
      .replace(/\s*\|\s*ABP Live\s*$/i, "")
      .trim();
  } else {
    headline = "Latest News Dispatch from " + domain;
  }

  // 3. Subhead / Description
  const subhead =
    extractMeta(html, "og:description") ||
    extractMeta(html, "twitter:description") ||
    extractMeta(html, "description") ||
    jsonLd?.description ||
    undefined;

  // 4. Images
  const { primary: image, gallery: galleryImages } = extractImages(html, targetUrl, jsonLd);

  // 5. Video
  const videoUrl = extractVideo(html);

  // 6. Body Paragraphs
  const paragraphs = extractParagraphs(html, jsonLd, domain);

  // 7. Site Name & Source
  const siteName = extractMeta(html, "og:site_name");
  const kicker = extractSourceKicker(domain, siteName);

  // 8. Category
  const metaSection = extractMeta(html, "article:section");
  const sectionKey = detectCategory(headline, paragraphs.join(" "), metaSection, urlObj.pathname);

  // 9. Author & Location
  let author: string | undefined = jsonLd?.author?.name || jsonLd?.author?.[0]?.name;
  if (!author && domain.includes("pib.gov.in")) {
    author = "Press Information Bureau";
  }

  let location: string | undefined = "New Delhi";
  if (paragraphs.length > 0 && /^[A-Z\s]{3,15},\s*[A-Z][a-z]+/i.test(paragraphs[0])) {
    const locMatch = paragraphs[0].match(/^([A-Z\s]{3,15}),/i);
    if (locMatch) location = locMatch[1].trim();
  }

  return {
    url: targetUrl,
    headline,
    subhead: subhead ? decodeHtmlEntities(subhead) : undefined,
    summary: subhead ? decodeHtmlEntities(subhead) : paragraphs[0] || headline,
    paragraphs: paragraphs.length > 0 ? paragraphs : [subhead || headline],
    image,
    imageCaption: image ? `${headline} (Photo: ${kicker})` : undefined,
    galleryImages,
    videoUrl,
    sectionKey,
    kicker,
    author: author || `${kicker} Bureau`,
    location,
    publishedAt: new Date().toISOString(),
  };
}

/**
 * Batch Scraper: Scrapes multiple URLs concurrently with rate limiting
 */
export async function scrapeMultipleNewsUrls(
  urls: string[]
): Promise<Array<{ url: string; success: boolean; data?: ScrapedNews; error?: string }>> {
  const cleanUrls = Array.from(new Set(urls.map((u) => u.trim()).filter(Boolean)));
  const results = await Promise.allSettled(
    cleanUrls.map(async (url) => {
      const data = await scrapeNewsUrl(url);
      return data;
    })
  );

  return results.map((res, idx) => {
    const url = cleanUrls[idx];
    if (res.status === "fulfilled") {
      return { url, success: true, data: res.value };
    } else {
      return { url, success: false, error: res.reason?.message || "Failed to scrape URL" };
    }
  });
}
