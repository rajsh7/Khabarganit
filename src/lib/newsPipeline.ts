import fs from "fs";
import path from "path";
import os from "os";
import { TRENDING_PAGE, SECTION_PAGES, SectionPageData, LeadStory, SideStory, TopStory, DigestItem } from "@/data/newspaperData";

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
}

// In-memory + /tmp file cache for dynamic news updates
// Preserves static fallback while allowing instant Telegram/API publishing
class NewsPipelineStore {
  private trendingPage: SectionPageData = JSON.parse(JSON.stringify(TRENDING_PAGE));
  private sectionPages: SectionPageData[] = JSON.parse(JSON.stringify(SECTION_PAGES));
  private recentUpdates: Array<{ timestamp: string; headline: string; section: string }> = [];

  constructor() {
    this.loadFromDisk();
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

  private saveToDisk() {
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

    const paragraphs = payload.paragraphs && payload.paragraphs.length > 0
      ? payload.paragraphs
      : [
          payload.subhead || payload.summary || "Full breaking coverage delivered by the KhabarGanit National Desk.",
          "Field correspondents and domain specialists confirmed that regulatory oversight and administrative protocols are underway.",
          "Further updates and statistical metrics will be gazetted as verified data becomes accessible.",
        ];

    // 1. LEAD STORY (Main Hero News)
    if (placement === "LEAD") {
      const mid = Math.ceil(paragraphs.length / 2);
      const col1 = paragraphs.slice(0, mid);
      const col2 = paragraphs.slice(mid);

      targetPage.leadStory = {
        kicker: payload.kicker || `${section} BREAKING BULLETIN`,
        headline: payload.headline.toUpperCase(),
        subhead: payload.subhead || paragraphs[0] || "Breaking dispatches from the KhabarGanit newsroom.",
        image: payload.image || targetPage.leadStory.image,
        imageAlt: payload.headline,
        caption: payload.imageCaption || `${payload.headline} reported on ${new Date().toLocaleDateString('en-GB')}. (Photo: KhabarGanit)`,
        col1: col1.length > 0 ? col1 : targetPage.leadStory.col1,
        col2: col2.length > 0 ? col2 : targetPage.leadStory.col2,
      };
    }
    // 2. SIDE STORY (Right-side 33% column)
    else if (placement === "SIDE") {
      const newSideStory: SideStory = {
        kicker: payload.kicker || `${section} REPORT`,
        headline: payload.headline.toUpperCase(),
        summary: payload.subhead || payload.summary || paragraphs[0],
        image: payload.image,
        imageCaption: payload.imageCaption,
        author: payload.author || "KhabarGanit Desk",
        location: payload.location || "New Delhi",
        paragraphs: paragraphs,
      };

      // Prepend to sideStories (keeps 3)
      targetPage.sideStories = [newSideStory, targetPage.sideStories[0], targetPage.sideStories[1]] as [SideStory, SideStory, SideStory];
    }
    // 3. TOP STORY (4-column domain dispatch)
    else if (placement === "TOP") {
      const newTopStory: TopStory = {
        kicker: payload.kicker || `${section} DISPATCH`,
        headline: payload.headline.toUpperCase(),
        summary: payload.subhead || payload.summary || paragraphs[0],
        author: payload.author || "Special Correspondent",
        location: payload.location || "National Bureau",
        image: payload.image,
        imageCaption: payload.imageCaption,
        paragraphs: paragraphs,
      };

      // Prepend to topStories (keeps 4)
      targetPage.topStories = [newTopStory, targetPage.topStories[0], targetPage.topStories[1], targetPage.topStories[2]] as [TopStory, TopStory, TopStory, TopStory];
    }
    // 4. DIGEST ITEM (Top 10 Monitor)
    else if (placement === "DIGEST") {
      const newDigest: DigestItem = {
        number: 1,
        category: payload.kicker || section,
        headline: payload.headline,
        summary: payload.subhead || payload.summary || paragraphs[0],
      };

      // Shift existing numbers down
      const updated = [newDigest, ...targetPage.digestItems.slice(0, 9)].map((item, idx) => ({
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

    if (this.recentUpdates.length > 20) {
      this.recentUpdates.pop();
    }

    this.saveToDisk();

    return {
      success: true,
      message: `Successfully published '${payload.headline}' to ${section} (${placement})`,
      page: targetPage,
    };
  }
}

// Global singleton to preserve updates during runtime
const globalStore = globalThis as unknown as { __newsPipelineStore?: NewsPipelineStore };
if (!globalStore.__newsPipelineStore) {
  globalStore.__newsPipelineStore = new NewsPipelineStore();
}

export const newsPipeline = globalStore.__newsPipelineStore;
