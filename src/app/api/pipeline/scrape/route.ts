import { NextResponse } from "next/server";
import { scrapeNewsUrl, scrapeMultipleNewsUrls, findUrlsInText, ScrapedNews } from "@/lib/urlScraper";
import { newsPipeline, PublishPayload } from "@/lib/newsPipeline";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let urls: string[] = [];

    if (Array.isArray(body.urls)) {
      urls = body.urls;
    } else if (typeof body.url === "string") {
      urls = [body.url];
    } else if (typeof body.text === "string") {
      urls = findUrlsInText(body.text);
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No valid URLs provided to scrape" },
        { status: 400 }
      );
    }

    const action = body.action || "publish"; // "preview" | "publish"
    const requestedPlacement = (body.placement || "AUTO").toUpperCase();
    const requestedSection = (body.sectionKey || "AUTO").toUpperCase();

    // 1. Scrape all provided URLs concurrently
    const scrapeResults = await scrapeMultipleNewsUrls(urls);

    // 2. If action is preview, return extracted data without publishing
    if (action === "preview") {
      return NextResponse.json({
        ok: true,
        action: "preview",
        count: scrapeResults.length,
        results: scrapeResults,
      });
    }

    // 3. Action is publish: Ingest into KhabarGanit Pipeline
    const publishedStories: any[] = [];
    const failedStories: any[] = [];

    for (let i = 0; i < scrapeResults.length; i++) {
      const item = scrapeResults[i];
      if (!item.success || !item.data) {
        failedStories.push({ url: item.url, error: item.error });
        continue;
      }

      const scraped: ScrapedNews = item.data;

      // Determine placement:
      // If AUTO: First URL is LEAD story, subsequent ones are SIDE, then TOP
      let placement: PublishPayload["placement"] = "TOP";
      if (requestedPlacement === "AUTO") {
        if (i === 0 && scrapeResults.length === 1) {
          placement = "TOP"; // Default single quick scrape to Top story
        } else if (i === 0) {
          placement = "LEAD";
        } else if (i <= 2) {
          placement = "SIDE";
        } else {
          placement = "TOP";
        }
      } else if (["LEAD", "SIDE", "TOP", "DIGEST"].includes(requestedPlacement)) {
        placement = requestedPlacement as PublishPayload["placement"];
      }

      // Determine Section
      let sectionKey: PublishPayload["sectionKey"] = scraped.sectionKey;
      if (requestedSection !== "AUTO") {
        const valid = ["TRENDING", "WORLD", "INDIA", "BUSINESS", "TECH", "SPORTS", "POLITICS", "ENTERTAINMENT"];
        if (valid.includes(requestedSection)) {
          sectionKey = requestedSection as PublishPayload["sectionKey"];
        }
      }

      const payload: PublishPayload = {
        headline: scraped.headline,
        subhead: scraped.subhead,
        summary: scraped.summary,
        paragraphs: scraped.paragraphs,
        image: scraped.image,
        imageCaption: scraped.imageCaption,
        videoUrl: scraped.videoUrl,
        sourceUrl: scraped.url,
        kicker: scraped.kicker,
        author: scraped.author,
        location: scraped.location,
        placement,
        sectionKey,
      };

      const result = newsPipeline.publish(payload);
      publishedStories.push({
        url: scraped.url,
        headline: scraped.headline,
        placement,
        sectionKey,
        image: scraped.image,
        videoUrl: scraped.videoUrl,
        success: result.success,
      });
    }

    return NextResponse.json({
      ok: true,
      action: "publish",
      publishedCount: publishedStories.length,
      failedCount: failedStories.length,
      published: publishedStories,
      failed: failedStories,
    });
  } catch (err: any) {
    console.error("URL scrape endpoint error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
