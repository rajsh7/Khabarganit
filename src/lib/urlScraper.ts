/**
 * KhabarGanit Autonomous URL News Scraper & Ingestion Engine
 * Extracts headlines, subheads, substantive body paragraphs,
 * high-resolution editorial photos, and embedded video dispatches
 * while strictly purging JavaScript code, HTML comments, competitor
 * news channel names, and SEO keyword spam.
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
  author: string;
  location?: string;
  publishedAt?: string;
}

// Competitor Channel & Network patterns to purge from all published output
const COMPETITOR_PATTERNS = [
  /aaj\s*tak\s*news/gi,
  /aaj\s*tak/gi,
  /aajtak/gi,
  /आज\s*तक\s*न्यूज़/gi,
  /आज\s*तक/gi,
  /आजतक/gi,
  /ndtv(?:\s*india|\s*24x7|\s*profit)?/gi,
  /एनडीटीवी(?:\s*इंडिया)?/gi,
  /abp(?:\s*news|\s*live|\s*ganga)?/gi,
  /एबीपी(?:\s*न्यूज़|\s*लाइव)?/gi,
  /zee(?:\s*news|\s*hindustan|\s*business)?/gi,
  /ज़ी\s*न्यूज़|जी\s*न्यूज|ज़ी\s*हिंदुस्तान/gi,
  /india\s*today/gi,
  /इंडिया\s*टुडे/gi,
  /news18(?:\s*hindi|\s*india)?|news\s*18/gi,
  /न्यूज़\s*18|न्यूज\s*18/gi,
  /republic(?:\s*bharat|\s*world|\s*tv)?/gi,
  /रिपब्लिक\s*भारत|रिपब्लिक/gi,
  /tv9(?:\s*bharatvarsh)?/gi,
  /टीवी9(?:\s*भारतवर्ष)?/gi,
  /dainik\s*bhaskar/gi,
  /दैनिक\s*भास्कर/gi,
  /amar\s*ujala/gi,
  /अमर\s*उजाला/gi,
  /dainik\s*jagran/gi,
  /दैनिक\s*जागरण/gi,
  /live\s*hindustan/gi,
  /लाइव\s*हिंदुस्तान/gi,
  /navbharat\s*times/gi,
  /नवभारत\s*टाइम्स/gi,
  /jansatta/gi,
  /जनसत्ता/gi,
  /times\s*of\s*india/gi,
  /hindustan\s*times/gi,
  /the\s*hindu/gi,
  /indian\s*express/gi,
  /the\s*economic\s*times/gi,
  /bbc(?:\s*hindi|\s*news)?/gi,
  /बीबीसी(?:\s*हिंदी|\s*न्यूज)?/gi,
  /reuters/gi,
  /ani(?:\s*news)?/gi,
  /associated\s*press/gi,
  /bloomberg/gi,
];

// Scrub competitor channel names, slogans, and branding
export function scrubCompetitorNames(str: string): string {
  if (!str) return "";
  let cleaned = str;
  for (const pat of COMPETITOR_PATTERNS) {
    cleaned = cleaned.replace(pat, "");
  }
  return cleaned
    .replace(/\(\s*photo\s*:\s*[^\)]*\)/gi, "(Photo: KhabarGanit)")
    .replace(/\(\s*फोटो\s*:\s*[^\)]*\)/gi, "(Photo: KhabarGanit)")
    .replace(/\bphoto\s*:\s*[a-z0-9_-]+/gi, "Photo: KhabarGanit")
    .replace(/\b(read more on|follow us on|download app|live tv)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[:\s\-|,;]+|[:\s\-|,;]+$/g, "")
    .trim();
}

// Check if string is a repetitive SEO tag dump rather than an authentic headline
export function isSeoTagDump(str: string): boolean {
  if (!str) return true;
  const lower = str.toLowerCase();
  const markers = [
    "hindi news",
    "हिंदी न्यूज़",
    "हिंदी न्यूज़",
    "hindi samachar",
    "हिंदी समाचार",
    "breaking news",
    "breaking news in hindi",
    "ताजा ख़बरें",
    "ताज़ा ख़बरें",
    "latest news",
    "latest news in hindi",
    "watch live tv",
  ];
  let hits = 0;
  for (const m of markers) {
    if (lower.includes(m)) hits++;
  }
  return hits >= 2;
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

// Pre-sanitize entire raw HTML to guarantee zero script, comment, or style leakage
export function preSanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";
  return rawHtml
    // 1. Remove all HTML comments
    .replace(/<!--[\s\S]*?-->/g, " ")
    // 2. Remove all script tags and inner contents (multiline)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    // 3. Remove all style tags and inner contents
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    // 4. Remove all noscript, svg, canvas, audio tags
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<canvas\b[\s\S]*?<\/canvas>/gi, " ");
}

// Clean HTML tags into plain text
export function cleanHtmlText(html: string): string {
  if (!html) return "";
  const sanitized = preSanitizeHtml(html);
  return decodeHtmlEntities(
    sanitized
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
  const ytMatch = html.match(
    /(?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

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

  const videoMatch = html.match(/<video[^>]+src=["']([^"']+)["']/i);
  if (videoMatch && videoMatch[1] && videoMatch[1].startsWith("http")) {
    return videoMatch[1];
  }

  return undefined;
}

// Extract valid, high-resolution editorial photos
export function extractImages(html: string, baseUrl: string, jsonLd: any): { primary?: string; gallery: string[] } {
  const images: string[] = [];

  const isValidPhoto = (url?: string): boolean => {
    if (!url || typeof url !== "string") return false;
    const lower = url.toLowerCase();
    if (!lower.startsWith("http")) return false;
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
      "share",
      "bell",
    ];
    return !junkPatterns.some((pattern) => lower.includes(pattern));
  };

  const ogImg = extractMeta(html, "og:image:secure_url") || extractMeta(html, "og:image");
  if (isValidPhoto(ogImg)) images.push(ogImg!);

  const twitterImg = extractMeta(html, "twitter:image");
  if (isValidPhoto(twitterImg) && !images.includes(twitterImg!)) images.push(twitterImg!);

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

  // In-page images
  const sanitized = preSanitizeHtml(html);
  const imgMatches = sanitized.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  for (const match of imgMatches) {
    const src = match[1];
    if (src) {
      try {
        const absolute = new URL(src, baseUrl).href;
        if (isValidPhoto(absolute) && !images.includes(absolute)) {
          if (absolute.includes("WriteReadData") || absolute.includes("userfiles") || absolute.includes("upload")) {
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

// Rigorous Paragraph Filter: Discards JavaScript, Cookie code, Horoscopes, and Ad junk
export function isJunkParagraph(p: string): boolean {
  if (!p || p.length < 30) return true;
  const lower = p.toLowerCase();

  // 1. JavaScript, Cookie, & Syntax patterns
  const jsPatterns = [
    "var ", "let ", "const ", "function", "=>", "$(", "document.", "window.",
    "cookie", "favicon", "setinterval", "settimeout", "ajax", "eval(",
    "-->", "<!--", "/*", "*/", "__at", "slideup", "removeclass", "toggleclass",
    "location.href", "encodeuricomponent", "split('", "split(\"", "return false",
    "{", "}", "();", ");", "];", "};"
  ];

  if (jsPatterns.some((pattern) => lower.includes(pattern))) {
    return true;
  }

  // 2. Horoscope / Rashifal widget spam
  const rashiList = [
    "मेष राशि", "वृषभ राशि", "मिथुन राशि", "कर्क राशि", "सिंह राशि", "कन्या राशि",
    "तुला राशि", "वृश्चिक राशि", "धनु राशि", "मकर राशि", "कुंभ राशि", "मीन राशि"
  ];
  if (rashiList.some((r) => p.startsWith(r) || lower.includes(r.toLowerCase()))) {
    return true;
  }

  // 3. Generic SEO Tag dumps
  if (isSeoTagDump(p)) return true;

  // 4. Common web junk
  const junkStarters = [
    "also read:", "read also:", "click here to", "subscribe to", "follow us on",
    "follow our whatsapp", "download our app", "advertisement", "sponsored content",
    "all rights reserved", "copyright ©", "terms of use", "privacy policy",
    "cookie policy", "share this story", "listen to this story", "photo credit",
    "read more on", "watch live", "लाइव टीवी", "डाउनलोड करें"
  ];

  return junkStarters.some((j) => lower.startsWith(j) || lower.includes(j));
}

// Clean and extract substantive story paragraphs
export function extractParagraphs(html: string, jsonLd: any, domain: string): string[] {
  const paragraphs: string[] = [];
  const cleanHtml = preSanitizeHtml(html);

  // 1. PIB Specific Extraction
  if (domain.includes("pib.gov.in")) {
    const pibContainerMatch =
      cleanHtml.match(/<div[^>]+id=["']?Release-Details["']?[^>]*>([\s\S]*?)<\/div>/i) ||
      cleanHtml.match(/<div[^>]+class=["'][^"']*innner-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);

    const contentHtml = pibContainerMatch ? pibContainerMatch[1] : cleanHtml;
    const pMatches = contentHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);

    for (const match of pMatches) {
      const text = scrubCompetitorNames(cleanHtmlText(match[1]));
      if (!isJunkParagraph(text)) {
        paragraphs.push(text);
      }
    }

    if (paragraphs.length > 0) return paragraphs;
  }

  // 2. Check JSON-LD articleBody
  if (jsonLd?.articleBody && typeof jsonLd.articleBody === "string") {
    const rawBody = scrubCompetitorNames(cleanHtmlText(jsonLd.articleBody));
    const chunks = rawBody
      .split(/(?:\r?\n){1,2}/)
      .map((c) => c.trim())
      .filter((c) => !isJunkParagraph(c));
    if (chunks.length > 0) return chunks;
  }

  // 3. Look for semantic <article> or main content blocks
  const articleBlock =
    cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
    cleanHtml.match(/<div[^>]+class=["'][^"']*(?:article-body|story-content|story-body|article__body|entry-content|main-content)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
    cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

  const targetHtml = articleBlock ? articleBlock[1] : cleanHtml;
  const pMatches = targetHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);

  for (const match of pMatches) {
    const text = scrubCompetitorNames(cleanHtmlText(match[1]));
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
      "mlc", "political", "vote", "opposition", "voting", "constituency", "samajwadi party",
      "चुनाव", "भाजपा", "कांग्रेस", "संसद", "मंत्रिमंडल", "सुप्रीम कोर्ट", "मुख्यमंत्री", "विधानसभा"
    ],
    BUSINESS: [
      "sensex", "nifty", "gdp", "rbi", "economy", "market", "inflation", "finance",
      "tax", "gst", "bank", "stock", "rupee", "earnings", "fiscal", "crore scheme",
      "semiconductor", "investment", "trade", "export", "import", "shares", "monetary policy",
      "सेंसेक्स", "निफ्टी", "अर्थव्यवस्था", "शेयर बाजार", "आरबीआई", "सोना", "चांदी", "मुद्रास्फीति"
    ],
    TECH: [
      "ai", "isro", "space", "satellite", "smartphone", "apple", "google", "chip",
      "software", "cyber", "technology", "tech", "gadget", "rocket", "algorithm",
      "digital", "nasa", "semiconductors", "computing", "इसरो", "सैटेलाइट", "स्मार्टफोन"
    ],
    SPORTS: [
      "cricket", "bcci", "ipl", "wicket", "tournament", "football", "fifa", "olympics",
      "medal", "badminton", "tennis", "hockey", "match", "score", "stadium", "kohli",
      "rohit sharma", "century", "championship", "क्रिकेट", "मैच", "विकेट", "आईपीएल", "विश्व कप"
    ],
    WORLD: [
      "global", "united nations", "russia", "ukraine", "china", "israel", "gaza",
      "iran", "white house", "us president", "europe", "bilateral", "foreign minister",
      "geopolitics", "summit", "nato", "middle east", "diplomacy", "अमेरिका", "रूस", "चीन", "इजरायल"
    ],
    ENTERTAINMENT: [
      "bollywood", "cinema", "film", "movie", "box office", "actor", "actress",
      "trailer", "song", "director", "theatre", "hollywood", "oscar", "ott", "बॉलीवुड", "फिल्म", "अभिनेता"
    ],
    INDIA: [
      "delhi", "mumbai", "india", "national", "railway", "highway", "state government",
      "citizens", "police", "army", "navy", "air force", "defence", "भारत", "दिल्ली", "रेलवे", "सेना"
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

  return maxScore > 0 ? topCategory : "INDIA";
}

// Autonomous KhabarGanit Editorial Kicker Generator (NO competitor names!)
export function generateEditorialKicker(sectionKey: ScrapedNews["sectionKey"]): string {
  switch (sectionKey) {
    case "POLITICS":
      return "KHABARGANIT POLITICAL MONITOR";
    case "BUSINESS":
      return "KHABARGANIT FINANCIAL DESK";
    case "WORLD":
      return "KHABARGANIT GLOBAL DISPATCH";
    case "TECH":
      return "KHABARGANIT TECH FRONTIER";
    case "SPORTS":
      return "KHABARGANIT SPORTS MONITOR";
    case "ENTERTAINMENT":
      return "KHABARGANIT CULTURE & CINEMA";
    case "INDIA":
      return "KHABARGANIT NATIONAL NEWSROOM";
    default:
      return "KHABARGANIT SPECIAL BULLETIN";
  }
}

// Extract all URLs from a block of text
export function findUrlsInText(text: string): string[] {
  if (!text) return [];
  const urlRegex = /https?:\/\/[^\s<>"'{}|\\^`]+[^\s<>"'{}|\\^`.,;:!?)\]]/gi;
  const matches = text.match(urlRegex) || [];
  return Array.from(new Set(matches));
}

/**
 * Main Scraper: Fetches and parses any news URL with total protection against
 * competitor channels, JavaScript scripts, and SEO spam.
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

  let rawHtml = "";
  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "hi,en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} from ${domain}`);
    }

    rawHtml = await res.text();
  } finally {
    clearTimeout(timeoutId);
  }

  // Pre-sanitize entire HTML before doing anything
  const cleanHtml = preSanitizeHtml(rawHtml);

  // 1. JSON-LD Schema
  const jsonLd = extractJsonLd(rawHtml);

  // 2. Headline Extraction & Scrubbing
  let headline =
    extractMeta(rawHtml, "og:title") ||
    extractMeta(rawHtml, "twitter:title") ||
    jsonLd?.headline ||
    jsonLd?.name;

  // If the extracted title is a repetitive SEO tag dump (e.g. from a homepage), discard it!
  if (!headline || isSeoTagDump(headline)) {
    const h1Match = cleanHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) {
      const h1Text = cleanHtmlText(h1Match[1]);
      if (!isSeoTagDump(h1Text)) headline = h1Text;
    }
  }

  if (!headline || isSeoTagDump(headline)) {
    const titleMatch = cleanHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      const titleText = cleanHtmlText(titleMatch[1]);
      if (!isSeoTagDump(titleText)) headline = titleText;
    }
  }

  // Scrub competitor channel names completely from headline
  if (headline) {
    headline = scrubCompetitorNames(decodeHtmlEntities(headline))
      .replace(/\s*::\s*Press Information Bureau\s*$/i, "")
      .trim();
  }

  // If still empty or just SEO keywords (e.g. user pasted homepage root), extract first valid story headline from the page!
  if (!headline || isSeoTagDump(headline) || headline.length < 5) {
    const storyLinkMatch = cleanHtml.match(/<(?:h2|h3)[^>]*>([\s\S]*?)<\/(?:h2|h3)>/i);
    if (storyLinkMatch) {
      const candidate = scrubCompetitorNames(cleanHtmlText(storyLinkMatch[1]));
      if (candidate.length > 15 && !isSeoTagDump(candidate)) {
        headline = candidate;
      }
    }
  }

  if (!headline || isSeoTagDump(headline)) {
    headline = "Latest National News Dispatch";
  }

  // 3. Subhead / Description Scrubbing
  let subhead =
    extractMeta(rawHtml, "og:description") ||
    extractMeta(rawHtml, "twitter:description") ||
    extractMeta(rawHtml, "description") ||
    jsonLd?.description ||
    undefined;

  if (subhead) {
    subhead = scrubCompetitorNames(decodeHtmlEntities(subhead));
    if (isSeoTagDump(subhead) || isJunkParagraph(subhead)) {
      subhead = undefined;
    }
  }

  // 4. Images
  const { primary: image, gallery: galleryImages } = extractImages(rawHtml, targetUrl, jsonLd);

  // 5. Video
  const videoUrl = extractVideo(cleanHtml);

  // 6. Body Paragraphs (Guaranteed clean of scripts and competitor branding)
  const paragraphs = extractParagraphs(rawHtml, jsonLd, domain);

  // 7. Auto Category
  const metaSection = extractMeta(rawHtml, "article:section");
  const sectionKey = detectCategory(headline, paragraphs.join(" "), metaSection, urlObj.pathname);

  // 8. Editorial Kicker (KhabarGanit Branding ONLY!)
  const kicker = generateEditorialKicker(sectionKey);

  // 9. Author & Location (Always KhabarGanit Desk!)
  const author = "KhabarGanit Special Desk";
  let location: string | undefined = "New Delhi";

  if (paragraphs.length > 0 && /^[A-Z\s\u0900-\u097F]{2,15},/i.test(paragraphs[0])) {
    const locMatch = paragraphs[0].match(/^([A-Z\s\u0900-\u097F]{2,15}),/i);
    if (locMatch) location = locMatch[1].trim();
  }

  return {
    url: targetUrl,
    headline,
    subhead: subhead || (paragraphs[0] ? paragraphs[0].slice(0, 160) + "..." : undefined),
    summary: subhead || paragraphs[0] || headline,
    paragraphs: paragraphs.length > 0 ? paragraphs : [subhead || headline],
    image,
    imageCaption: image ? `${headline} (Photo: KhabarGanit Desk)` : undefined,
    galleryImages,
    videoUrl,
    sectionKey,
    kicker,
    author,
    location,
    publishedAt: new Date().toISOString(),
  };
}

/**
 * Batch Scraper: Scrapes multiple URLs concurrently
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
