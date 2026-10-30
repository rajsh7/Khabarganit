import fs from "fs";
import path from "path";
import os from "os";
import { TRENDING_PAGE, SECTION_PAGES, SectionPageData, LeadStory, SideStory, TopStory, DigestItem } from "@/data/newspaperData";
import liveNewsBaseline from "@/data/liveNews.json";
import { scrubCompetitorNames, isJunkParagraph } from "@/lib/urlScraper";

const CACHE_FILE = path.join(os.tmpdir(), "khabarganit_pipeline_v1.json");

export interface PublishPayload {
  sectionKey?: "TRENDING" | "WORLD" | "INDIA" | "BUSINESS" | "TECH" | "SPORTS" | "POLITICS" | "ENTERTAINMENT";
  placement?: "LEAD" | "SIDE" | "TOP" | "DIGEST";
  kicker?: string;
  headline: string;
  subhead?: string;
  summary?: string;
  image?: string;
  imageCaption?: string;
  author?: string;
  location?: string;
  paragraphs?: string[];
  videoUrl?: string;
  sourceUrl?: string;
}

const SECTION_FALLBACK_IMAGES: Record<string, string> = {
  TRENDING: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000&q=80",
  WORLD: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&q=80",
  INDIA: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1000&q=80",
  BUSINESS: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&q=80",
  TECH: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80",
  SPORTS: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&q=80",
  POLITICS: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&q=80",
  ENTERTAINMENT: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&q=80",
};

// Multi-tier persistent store:
// Tier 1: Cloud KV (Vercel KV / Upstash Redis REST API)
// Tier 2: GitHub Repository auto-commit (if GITHUB_TOKEN set)
// Tier 3: Local /tmp disk cache
// Tier 4: Committed static baseline (src/data/liveNews.json)
class NewsPipelineStore {
  private trendingPage: SectionPageData =
    (liveNewsBaseline?.trending as SectionPageData) || JSON.parse(JSON.stringify(TRENDING_PAGE));
  private sectionPages: SectionPageData[] =
    (liveNewsBaseline?.sections as SectionPageData[]) || JSON.parse(JSON.stringify(SECTION_PAGES));
  private recentUpdates: Array<{ timestamp: string; headline: string; section: string }> =
    (liveNewsBaseline?.updates as any[]) || [];

  private lastCloudSync = 0;
  private pendingImages: Array<{ headline: string; imageUrl: string; timestamp: number }> = [];

  constructor() {
    this.loadFromDisk();
  }

  public registerPendingImage(headline: string, imageUrl: string) {
    const clean = headline.trim().toUpperCase();
    this.pendingImages.unshift({
      headline: clean,
      imageUrl,
      timestamp: Date.now(),
    });
    if (this.pendingImages.length > 20) {
      this.pendingImages.pop();
    }
  }

  public getPendingImageForHeadline(headline: string): string | undefined {
    const clean = headline.trim().toUpperCase();
    const now = Date.now();
    const foundIdx = this.pendingImages.findIndex(
      (p) =>
        now - p.timestamp < 30 * 60 * 1000 &&
        (clean.includes(p.headline) || p.headline.includes(clean))
    );
    if (foundIdx !== -1) {
      const img = this.pendingImages[foundIdx].imageUrl;
      this.pendingImages.splice(foundIdx, 1);
      return img;
    }
    return undefined;
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const raw = fs.readFileSync(CACHE_FILE, "utf-8");
        const data = JSON.parse(raw);
        if (data.trending) this.trendingPage = data.trending;
        if (data.sections) this.sectionPages = data.sections;
        if (data.updates) this.recentUpdates = data.updates;
      }
    } catch {
      // Fallback gracefully
    }
  }

  private async saveToCloud() {
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (kvUrl && kvToken) {
      try {
        const payloadStr = JSON.stringify({
          trending: this.trendingPage,
          sections: this.sectionPages,
          updates: this.recentUpdates,
        });

        await fetch(`${kvUrl}/set/khabarganit_pipeline_v1`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${kvToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadStr),
        });
      } catch (err) {
        console.error("Cloud KV write error:", err);
      }
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (githubToken) {
      try {
        const repo = "rajsh7/Khabarganit";
        const filePath = "src/data/liveNews.json";
        const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

        const getRes = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        let sha: string | undefined;
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }

        const newContent = JSON.stringify(
          {
            trending: this.trendingPage,
            sections: this.sectionPages,
            updates: this.recentUpdates,
          },
          null,
          2
        );

        await fetch(getUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `feat(news): publish '${this.recentUpdates[0]?.headline || "latest"}' via pipeline`,
            content: Buffer.from(newContent).toString("base64"),
            sha,
          }),
        });
      } catch (err) {
        console.error("GitHub commit error:", err);
      }
    }
  }

  public async syncFromCloud() {
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    const now = Date.now();
    if (now - this.lastCloudSync < 3000) return;
    this.lastCloudSync = now;

    if (kvUrl && kvToken) {
      try {
        const res = await fetch(`${kvUrl}/get/khabarganit_pipeline_v1`, {
          headers: {
            Authorization: `Bearer ${kvToken}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const json = await res.json();
          if (json && json.result) {
            const data = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
            if (data.trending) this.trendingPage = data.trending;
            if (data.sections) this.sectionPages = data.sections;
            if (data.updates) this.recentUpdates = data.updates;
            this.saveToLocalDisk();
          }
        }
      } catch (err) {
        console.error("Cloud KV read error:", err);
      }
    }
  }

  private saveToLocalDisk() {
    try {
      fs.writeFileSync(
        CACHE_FILE,
        JSON.stringify({
          trending: this.trendingPage,
          sections: this.sectionPages,
          updates: this.recentUpdates,
        }),
        "utf-8"
      );
    } catch {
      // Ignore disk write errors
    }
  }

  public getAllPages(): { trending: SectionPageData; sections: SectionPageData[]; updates: any[] } {
    this.loadFromDisk();
    return {
      trending: this.trendingPage,
      sections: this.sectionPages,
      updates: this.recentUpdates,
    };
  }

  public getSection(sectionKey: string | null): SectionPageData {
    this.loadFromDisk();
    if (!sectionKey || sectionKey.toUpperCase() === "TRENDING") {
      return this.trendingPage;
    }
    const found = this.sectionPages.find(
      (p) => p.sectionKey.toUpperCase() === sectionKey.toUpperCase()
    );
    return found || this.trendingPage;
  }

  public publish(payload: PublishPayload): { success: boolean; message: string; page: SectionPageData } {
    this.loadFromDisk();
    const section = (payload.sectionKey || "TRENDING").toUpperCase() as SectionPageData["sectionKey"];
    const placement = (payload.placement || "LEAD").toUpperCase() as "LEAD" | "SIDE" | "TOP" | "DIGEST";

    let targetPage = section === "TRENDING" ? this.trendingPage : this.sectionPages.find((p) => p.sectionKey === section);

    if (!targetPage) {
      targetPage = this.trendingPage;
    }

    const defaultImg = SECTION_FALLBACK_IMAGES[section] || SECTION_FALLBACK_IMAGES.TRENDING;

    // Check pending images queue if payload.image is missing
    if (!payload.image) {
      const pendingImg = this.getPendingImageForHeadline(payload.headline);
      if (pendingImg) {
        payload.image = pendingImg;
      }
    }

    // Scrub competitor news channel names from all input & sanitize
    const cleanHeadline = scrubCompetitorNames(payload.headline).toUpperCase();
    const cleanSubhead = payload.subhead ? scrubCompetitorNames(payload.subhead) : undefined;
    const cleanSummary = payload.summary ? scrubCompetitorNames(payload.summary) : undefined;
    const cleanKicker = payload.kicker
      ? scrubCompetitorNames(payload.kicker).toUpperCase()
      : `KHABARGANIT ${section} REPORT`;
    const cleanAuthor = payload.author && !payload.author.toLowerCase().includes("aajtak")
      ? scrubCompetitorNames(payload.author)
      : "KhabarGanit Senior Desk";
    const cleanCaption = payload.imageCaption
      ? scrubCompetitorNames(payload.imageCaption)
      : `${cleanHeadline} (Photo: KhabarGanit Desk)`;

    const rawParas = payload.paragraphs && payload.paragraphs.length > 0
      ? payload.paragraphs
      : [
          cleanSubhead || cleanSummary || "Full breaking coverage delivered by the KhabarGanit National Desk.",
          "Field correspondents and domain specialists confirmed that regulatory oversight and administrative protocols are underway.",
          "Further updates and statistical metrics will be gazetted as verified data becomes accessible.",
        ];

    const paragraphs = rawParas
      .map((p) => scrubCompetitorNames(p))
      .filter((p) => !isJunkParagraph(p));

    if (paragraphs.length === 0) {
      paragraphs.push(cleanSubhead || cleanHeadline);
    }

    // 1. LEAD STORY (Main Hero News)
    if (placement === "LEAD") {
      const mid = Math.ceil(paragraphs.length / 2);
      const col1 = paragraphs.slice(0, mid);
      const col2 = paragraphs.slice(mid);

      const leadData: LeadStory = {
        kicker: cleanKicker,
        headline: cleanHeadline,
        subhead: payload.subhead || paragraphs[0] || "Breaking dispatches from the KhabarGanit newsroom.",
        image: payload.image || targetPage.leadStory.image || defaultImg,
        imageAlt: cleanHeadline,
        caption: cleanCaption,
        col1: col1.length > 0 ? col1 : targetPage.leadStory.col1,
        col2: col2.length > 0 ? col2 : targetPage.leadStory.col2,
        publishedAt: new Date().toISOString(),
        timeAgo: "Just now",
        videoUrl: payload.videoUrl,
        sourceUrl: payload.sourceUrl,
      };

      // Archive former lead story to sideStories so it NEVER vanishes
      if (targetPage.leadStory && targetPage.leadStory.headline !== leadData.headline) {
        const formerLead: SideStory = {
          kicker: targetPage.leadStory.kicker,
          headline: targetPage.leadStory.headline,
          summary: targetPage.leadStory.subhead,
          image: targetPage.leadStory.image || defaultImg,
          imageCaption: targetPage.leadStory.caption,
          paragraphs: [...targetPage.leadStory.col1, ...targetPage.leadStory.col2],
          author: "KhabarGanit Senior Desk",
          location: "National Bureau",
          publishedAt: targetPage.leadStory.publishedAt,
          timeAgo: targetPage.leadStory.timeAgo,
          videoUrl: targetPage.leadStory.videoUrl,
          sourceUrl: targetPage.leadStory.sourceUrl,
        };
        const alreadyInSide = targetPage.sideStories.some(s => s.headline === formerLead.headline);
        if (!alreadyInSide) {
          targetPage.sideStories = [formerLead, ...targetPage.sideStories];
        }
      }

      targetPage.leadStory = leadData;
      // Front Page Mirror
      this.trendingPage.leadStory = leadData;
    }
    // 2. SIDE STORY (Never discard previous stories; prepend or update existing)
    else if (placement === "SIDE") {
      const newSideStory: SideStory = {
        kicker: cleanKicker,
        headline: cleanHeadline,
        summary: cleanSubhead || cleanSummary || paragraphs[0],
        image: payload.image || defaultImg,
        imageCaption: cleanCaption,
        author: cleanAuthor,
        location: payload.location || "New Delhi",
        paragraphs: paragraphs,
        publishedAt: new Date().toISOString(),
        timeAgo: "Just now",
        videoUrl: payload.videoUrl,
        sourceUrl: payload.sourceUrl,
      };

      // Update in place if same headline, otherwise prepend without dropping
      const existIdx = targetPage.sideStories.findIndex(s => s.headline === newSideStory.headline);
      if (existIdx !== -1) {
        targetPage.sideStories[existIdx] = newSideStory;
      } else {
        targetPage.sideStories = [newSideStory, ...targetPage.sideStories];
      }

      if (targetPage !== this.trendingPage) {
        const trendIdx = this.trendingPage.sideStories.findIndex(s => s.headline === newSideStory.headline);
        if (trendIdx !== -1) {
          this.trendingPage.sideStories[trendIdx] = newSideStory;
        } else {
          this.trendingPage.sideStories = [newSideStory, ...this.trendingPage.sideStories];
        }
      }
    }
    // 3. TOP STORY (Never discard previous stories; prepend or update existing)
    else if (placement === "TOP") {
      const newTopStory: TopStory = {
        kicker: cleanKicker,
        headline: cleanHeadline,
        summary: cleanSubhead || cleanSummary || paragraphs[0],
        author: cleanAuthor,
        location: payload.location || "National Bureau",
        image: payload.image || defaultImg,
        imageCaption: cleanCaption,
        paragraphs: paragraphs,
        publishedAt: new Date().toISOString(),
        timeAgo: "Just now",
        videoUrl: payload.videoUrl,
        sourceUrl: payload.sourceUrl,
      };

      const existTopIdx = targetPage.topStories.findIndex(t => t.headline === newTopStory.headline);
      if (existTopIdx !== -1) {
        targetPage.topStories[existTopIdx] = newTopStory;
      } else {
        targetPage.topStories = [newTopStory, ...targetPage.topStories];
      }

      if (targetPage !== this.trendingPage) {
        const trendTopIdx = this.trendingPage.topStories.findIndex(t => t.headline === newTopStory.headline);
        if (trendTopIdx !== -1) {
          this.trendingPage.topStories[trendTopIdx] = newTopStory;
        } else {
          this.trendingPage.topStories = [newTopStory, ...this.trendingPage.topStories];
        }
      }
    }
    // 4. DIGEST ITEM
    else if (placement === "DIGEST") {
      const newDigest: DigestItem = {
        number: 1,
        category: payload.kicker || section,
        headline: payload.headline,
        summary: cleanSubhead || cleanSummary || paragraphs[0],
      };

      const updated = [newDigest, ...targetPage.digestItems].map((item, idx) => ({
        ...item,
        number: idx + 1,
      }));
      targetPage.digestItems = updated;
    }

    this.recentUpdates.unshift({
      timestamp: new Date().toISOString(),
      headline: payload.headline,
      section,
    });

    if (this.recentUpdates.length > 50) {
      this.recentUpdates.pop();
    }

    this.saveToLocalDisk();
    this.saveToCloud().catch(() => {});

    return {
      success: true,
      message: `Successfully published '${payload.headline}' to ${section} (${placement})`,
      page: targetPage,
    };
  }

  public attachImage(
    headlineQuery: string,
    imageUrl: string,
    caption?: string
  ): { success: boolean; message: string; headline: string; section?: string } {
    this.loadFromDisk();
    const clean = headlineQuery.trim().toUpperCase();



    // 1. Trending lead story
    if (
      !clean ||
      this.trendingPage.leadStory.headline.includes(clean) ||
      clean.includes(this.trendingPage.leadStory.headline)
    ) {
      this.trendingPage.leadStory.image = imageUrl;
      if (caption) this.trendingPage.leadStory.caption = caption;

      for (const sec of this.sectionPages) {
        if (
          !clean ||
          sec.leadStory.headline.includes(clean) ||
          clean.includes(sec.leadStory.headline)
        ) {
          sec.leadStory.image = imageUrl;
          if (caption) sec.leadStory.caption = caption;
        }
      }

      this.saveToLocalDisk();
      this.saveToCloud().catch(() => {});
      return {
        success: true,
        message: "Attached photo to Front-Page Lead Story",
        headline: this.trendingPage.leadStory.headline,
        section: "TRENDING",
      };
    }

    // 2. Section lead stories
    for (const sec of this.sectionPages) {
      if (
        sec.leadStory.headline.includes(clean) ||
        clean.includes(sec.leadStory.headline)
      ) {
        sec.leadStory.image = imageUrl;
        if (caption) sec.leadStory.caption = caption;
        this.saveToLocalDisk();
        this.saveToCloud().catch(() => {});
        return {
          success: true,
          message: `Attached photo to ${sec.sectionKey} Lead Story`,
          headline: sec.leadStory.headline,
          section: sec.sectionKey,
        };
      }
    }

    // 3. Side Stories
    for (const page of [this.trendingPage, ...this.sectionPages]) {
      for (const side of page.sideStories) {
        if (side.headline.includes(clean) || clean.includes(side.headline)) {
          side.image = imageUrl;
          if (caption) side.imageCaption = caption;
          this.saveToLocalDisk();
          this.saveToCloud().catch(() => {});
          return {
            success: true,
            message: "Attached photo to Side Story",
            headline: side.headline,
          };
        }
      }
    }

    // 4. Top Stories
    for (const page of [this.trendingPage, ...this.sectionPages]) {
      for (const top of page.topStories) {
        if (top.headline.includes(clean) || clean.includes(top.headline)) {
          top.image = imageUrl;
          if (caption) top.imageCaption = caption;
          this.saveToLocalDisk();
          this.saveToCloud().catch(() => {});
          return {
            success: true,
            message: "Attached photo to Top Story",
            headline: top.headline,
          };
        }
      }
    }

    // 5. Register in pending queue
    this.registerPendingImage(headlineQuery, imageUrl);
    return {
      success: true,
      message: `Photo registered for headline: "${headlineQuery}". Send the news text now and it will be attached automatically!`,
      headline: headlineQuery,
    };
  }

  public removeNews(headlineQuery: string): {
    success: boolean;
    message: string;
    removedHeadline: string;
    section?: string;
  } {
    this.loadFromDisk();
    const clean = headlineQuery.trim().toUpperCase();


    if (!clean) {
      return { success: false, message: "Please specify a headline to remove", removedHeadline: "" };
    }

    const defaultTrending = (liveNewsBaseline?.trending as SectionPageData) || TRENDING_PAGE;
    const defaultSections = (liveNewsBaseline?.sections as SectionPageData[]) || SECTION_PAGES;

    if (
      clean === "LEAD" ||
      this.trendingPage.leadStory.headline.includes(clean) ||
      clean.includes(this.trendingPage.leadStory.headline)
    ) {
      const removed = this.trendingPage.leadStory.headline;
      this.trendingPage.leadStory = JSON.parse(JSON.stringify(defaultTrending.leadStory));

      for (let i = 0; i < this.sectionPages.length; i++) {
        if (
          clean === "LEAD" ||
          this.sectionPages[i].leadStory.headline.includes(clean) ||
          clean.includes(this.sectionPages[i].leadStory.headline)
        ) {
          this.sectionPages[i].leadStory = JSON.parse(
            JSON.stringify(defaultSections[i]?.leadStory || defaultTrending.leadStory)
          );
        }
      }

      this.recentUpdates = this.recentUpdates.filter((u) => !u.headline.toUpperCase().includes(clean));
      this.saveToLocalDisk();
      this.saveToCloud().catch(() => {});
      return {
        success: true,
        message: `Removed Lead Story: "${removed}" and restored default edition`,
        removedHeadline: removed,
        section: "TRENDING",
      };
    }

    for (let i = 0; i < this.sectionPages.length; i++) {
      const sec = this.sectionPages[i];
      if (sec.leadStory.headline.includes(clean) || clean.includes(sec.leadStory.headline)) {
        const removed = sec.leadStory.headline;
        sec.leadStory = JSON.parse(
          JSON.stringify(defaultSections[i]?.leadStory || defaultTrending.leadStory)
        );
        this.recentUpdates = this.recentUpdates.filter((u) => !u.headline.toUpperCase().includes(clean));
        this.saveToLocalDisk();
        this.saveToCloud().catch(() => {});
        return {
          success: true,
          message: `Removed ${sec.sectionKey} Lead Story: "${removed}"`,
          removedHeadline: removed,
          section: sec.sectionKey,
        };
      }
    }

    for (const page of [this.trendingPage, ...this.sectionPages]) {
      const idx = page.sideStories.findIndex(
        (s) => s.headline.includes(clean) || clean.includes(s.headline)
      );
      if (idx !== -1) {
        const removed = page.sideStories[idx].headline;
        page.sideStories.splice(idx, 1);
        this.recentUpdates = this.recentUpdates.filter((u) => !u.headline.toUpperCase().includes(clean));
        this.saveToLocalDisk();
        this.saveToCloud().catch(() => {});
        return { success: true, message: `Removed Side Story: "${removed}"`, removedHeadline: removed };
      }
    }

    for (const page of [this.trendingPage, ...this.sectionPages]) {
      const idx = page.topStories.findIndex(
        (t) => t.headline.includes(clean) || clean.includes(t.headline)
      );
      if (idx !== -1) {
        const removed = page.topStories[idx].headline;
        page.topStories.splice(idx, 1);
        this.recentUpdates = this.recentUpdates.filter((u) => !u.headline.toUpperCase().includes(clean));
        this.saveToLocalDisk();
        this.saveToCloud().catch(() => {});
        return { success: true, message: `Removed Top Story: "${removed}"`, removedHeadline: removed };
      }
    }

    for (const page of [this.trendingPage, ...this.sectionPages]) {
      const idx = page.digestItems.findIndex(
        (d) =>
          d.headline.toUpperCase().includes(clean) || clean.includes(d.headline.toUpperCase())
      );
      if (idx !== -1) {
        const removed = page.digestItems[idx].headline;
        page.digestItems.splice(idx, 1);
        page.digestItems.forEach((item, num) => (item.number = num + 1));
        this.recentUpdates = this.recentUpdates.filter((u) => !u.headline.toUpperCase().includes(clean));
        this.saveToLocalDisk();
        this.saveToCloud().catch(() => {});
        return { success: true, message: `Removed Digest Item: "${removed}"`, removedHeadline: removed };
      }
    }

    return {
      success: false,
      message: `No live news found matching: "${headlineQuery}"`,
      removedHeadline: headlineQuery,
    };
  }
}

// Global singleton to preserve updates during runtime
const globalStore = globalThis as unknown as { __newsPipelineStore?: NewsPipelineStore };
if (!globalStore.__newsPipelineStore) {
  globalStore.__newsPipelineStore = new NewsPipelineStore();
}

export const newsPipeline = globalStore.__newsPipelineStore;
