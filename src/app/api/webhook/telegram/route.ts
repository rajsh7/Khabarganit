import { NextResponse } from "next/server";
import { newsPipeline, PublishPayload } from "@/lib/newsPipeline";
import { findUrlsInText, scrapeMultipleNewsUrls } from "@/lib/urlScraper";

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8769156198:AAGU6N8r8NhCqILVqCQacMxmvUoJHlo0Zi0";
const TELEGRAM_ALLOWED_USER_ID = process.env.TELEGRAM_ALLOWED_USER_ID;

// Helper: send reply to Telegram chat
async function sendTelegramMessage(chatId: number | string, text: string) {
  if (!TELEGRAM_BOT_TOKEN) return;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Telegram sendMessage error:", err);
  }
}

// Helper: resolve Telegram photo file URL
async function getTelegramPhotoUrl(fileId: string): Promise<string | undefined> {
  if (!TELEGRAM_BOT_TOKEN) return undefined;
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
    const data = await res.json();
    if (data.ok && data.result?.file_path) {
      return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${data.result.file_path}`;
    }
  } catch (err) {
    console.error("Failed to get Telegram photo URL:", err);
  }
  return undefined;
}

// Parse user message text or photo caption into PublishPayload
function parseNewsMessage(rawText: string, imageUrl?: string): PublishPayload | null {
  const lines = rawText.split("\n").map((l: string) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  let headline = "";
  let hasExplicitHeadline = false;
  let sectionKey: PublishPayload["sectionKey"] = "TRENDING";
  let placement: PublishPayload["placement"] = "LEAD";
  let kicker = "";
  let subhead = "";
  const paragraphs: string[] = [];

  let inStoryBlock = false;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith("headline:") || lower.startsWith("title:") || lower.startsWith("शीर्षक:")) {
      headline = line.replace(/^(headline|title|शीर्षक):\s*/i, "").trim();
      hasExplicitHeadline = true;
      inStoryBlock = false;
    } else if (lower.startsWith("section:") || lower.startsWith("category:") || lower.startsWith("वर्ग:")) {
      const sec = line.replace(/^(section|category|वर्ग):\s*/i, "").trim().toUpperCase();
      const valid = ["TRENDING", "WORLD", "INDIA", "BUSINESS", "TECH", "SPORTS", "POLITICS", "ENTERTAINMENT"];
      if (valid.includes(sec)) {
        sectionKey = sec as PublishPayload["sectionKey"];
      }
      inStoryBlock = false;
    } else if (lower.startsWith("placement:") || lower.startsWith("स्थान:")) {
      const plc = line.replace(/^(placement|स्थान):\s*/i, "").trim().toUpperCase();
      if (["LEAD", "SIDE", "TOP", "DIGEST"].includes(plc)) {
        placement = plc as PublishPayload["placement"];
      }
      inStoryBlock = false;
    } else if (lower.startsWith("kicker:") || lower.startsWith("टैग:")) {
      kicker = line.replace(/^(kicker|टैग):\s*/i, "").trim();
      inStoryBlock = false;
    } else if (lower.startsWith("subhead:") || lower.startsWith("summary:") || lower.startsWith("उपशीर्षक:")) {
      subhead = line.replace(/^(subhead|summary|उपशीर्षक):\s*/i, "").trim();
      inStoryBlock = false;
    } else if (lower.startsWith("story:") || lower.startsWith("content:") || lower.startsWith("समाचार:")) {
      inStoryBlock = true;
      const initial = line.replace(/^(story|content|समाचार):\s*/i, "").trim();
      if (initial) paragraphs.push(initial);
    } else {
      if (inStoryBlock) {
        paragraphs.push(line);
      } else if (!hasExplicitHeadline && imageUrl) {
        // Quick photo publish: First line of photo caption is headline
        headline = line;
        hasExplicitHeadline = true;
      } else if (hasExplicitHeadline && !subhead) {
        subhead = line;
      } else {
        paragraphs.push(line);
      }
    }
  }

  // Prevent random text or continuation chunks without "Headline:" or photo from overwriting lead news
  if (!headline || (!hasExplicitHeadline && !imageUrl)) {
    return null;
  }

  return {
    headline,
    sectionKey,
    placement,
    kicker: kicker || undefined,
    subhead: subhead || undefined,
    image: imageUrl,
    paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const update = await request.json();
    const message = update.message || update.channel_post;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat?.id;
    const fromId = message.from?.id ? String(message.from.id) : String(chatId);
    const rawText = (message.text || message.caption || "").trim();

    // Security: Check allowed user ID if configured
    if (TELEGRAM_ALLOWED_USER_ID && fromId !== TELEGRAM_ALLOWED_USER_ID) {
      await sendTelegramMessage(
        chatId,
        `⛔ *Access Denied*\n\nThis KhabarGanit publisher bot is restricted.\nYour Telegram ID: \`${fromId}\`\nAdd this to \`TELEGRAM_ALLOWED_USER_ID\` in Vercel to authorize yourself.`
      );
      return NextResponse.json({ ok: true });
    }

    // Command: /start or /help
    if (rawText.startsWith("/start") || rawText.startsWith("/help")) {
      const helpMsg = `📰 *KhabarGanit Auto-News Pipeline Bot*\n\n` +
        `Send news directly to your broadsheet newspaper on *KhabarGanit.com* without touching code or opening a laptop!\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `*📝 METHOD 1: SEND LONG STORY + PHOTO SEPARATELY (No 1,000-char limit!)*\n\n` +
        `1️⃣ *Send your full story text first:*\n` +
        `*Headline:* Your Story Headline\n` +
        `*Section:* POLITICS _(or INDIA, WORLD, TECH, etc.)_\n` +
        `*Placement:* LEAD _(or SIDE, TOP)_\n` +
        `*Subhead:* Brief summary...\n` +
        `*Story:* Full news paragraphs (as long as you want)...\n\n` +
        `2️⃣ *Then send your photo:*\n` +
        `Caption: *Headline:* Your Story Headline\n` +
        `_(Or simply send the photo with no caption right after!)_\n` +
        `➡️ The bot will automatically attach the photo to that story!\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `*🗑️ HOW TO DELETE / REMOVE A STORY:*\n` +
        `Send: \`/delete Your Headline\` or \`/remove Your Headline\`\n` +
        `_(Or send \`/delete lead\` to reset the main front-page story)_\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `*⚡ METHOD 2: ALL-IN-ONE QUICK PUBLISH*\n` +
        `Send a photo with short caption:\n` +
        `Line 1: Headline\n` +
        `Line 2: Story...\n\n` +
        `*Your Telegram ID:* \`${fromId}\`\n` +
        `🌐 *Live Site:* https://www.khabarganit.com`;

      await sendTelegramMessage(chatId, helpMsg);
      return NextResponse.json({ ok: true });
    }

    // Command: /status
    if (rawText.startsWith("/status")) {
      const data = newsPipeline.getAllPages();
      const lead = data.trending.leadStory.headline;
      const count = data.updates.length;
      await sendTelegramMessage(
        chatId,
        `📊 *KhabarGanit Pipeline Status*\n\n` +
        `🔴 *Current Front-Page Lead*: ${lead}\n` +
        `📈 *Dynamic Updates Processed*: ${count}\n` +
        `🌐 *Site Status*: Live (200 OK)\n` +
        `🔗 https://www.khabarganit.com`
      );
      return NextResponse.json({ ok: true });
    }

    // Command: /delete or /remove
    if (rawText.startsWith("/delete") || rawText.startsWith("/remove")) {
      const query = rawText.replace(/^\/(delete|remove)\s*/i, "").trim();
      if (!query) {
        await sendTelegramMessage(
          chatId,
          "⚠️ *Please provide the headline to delete.*\n\nExample:\n`/delete MLC Election Results 2026`\nOr to reset the lead story:\n`/delete lead`"
        );
        return NextResponse.json({ ok: true });
      }

      const delResult = newsPipeline.removeNews(query);
      if (delResult.success) {
        await sendTelegramMessage(
          chatId,
          `🗑️ *STORY REMOVED SUCCESSFULLY!* 🚀\n\n` +
            `📰 *Removed:* ${delResult.removedHeadline}\n` +
            `✅ The broadsheet edition has been restored.\n\n` +
            `🌐 *View on Website:*\nhttps://www.khabarganit.com`
        );
      } else {
        await sendTelegramMessage(
          chatId,
          `⚠️ *Could not find story:* "${query}"\n\nSend /status to view the current live headline.`
        );
      }
      return NextResponse.json({ ok: true, result: delResult });
    }

    // ── FEATURE: INSTANT URL & BATCH LINK INGESTION (PIB, Reuters, BBC, etc.) ──
    const extractedUrls = findUrlsInText(rawText);
    const hasExplicitHeadline = /^(headline|title|शीर्षक):/im.test(rawText);

    if (extractedUrls.length > 0 && !hasExplicitHeadline) {
      let forcedPlacement: "LEAD" | "SIDE" | "TOP" | undefined;
      if (/^\/lead\b/i.test(rawText)) forcedPlacement = "LEAD";
      else if (/^\/side\b/i.test(rawText)) forcedPlacement = "SIDE";
      else if (/^\/top\b/i.test(rawText)) forcedPlacement = "TOP";

      let photoUrl: string | undefined;
      if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
        const largest = message.photo[message.photo.length - 1];
        photoUrl = await getTelegramPhotoUrl(largest.file_id);
      }

      await sendTelegramMessage(
        chatId,
        `⏳ *Processing ${extractedUrls.length} news ${extractedUrls.length === 1 ? "link" : "links"}...*\nFetching headlines, full text, photos, and video media.`
      );

      const scrapeResults = await scrapeMultipleNewsUrls(extractedUrls);
      const publishedSummaries: string[] = [];

      for (let i = 0; i < scrapeResults.length; i++) {
        const item = scrapeResults[i];
        if (!item.success || !item.data) {
          publishedSummaries.push(`❌ Failed to scrape: \`${item.url}\` (${item.error || "Network error"})`);
          continue;
        }

        const scraped = item.data;

        // Determine placement: single drop is LEAD, multiple drops distribute LEAD -> SIDE -> TOP
        let placement: PublishPayload["placement"] = "TOP";
        if (forcedPlacement) {
          placement = forcedPlacement;
        } else if (extractedUrls.length === 1) {
          placement = "LEAD";
        } else if (i === 0) {
          placement = "LEAD";
        } else if (i <= 2) {
          placement = "SIDE";
        } else {
          placement = "TOP";
        }

        const payload: PublishPayload = {
          headline: scraped.headline,
          subhead: scraped.subhead,
          summary: scraped.summary,
          paragraphs: scraped.paragraphs,
          image: photoUrl || scraped.image,
          imageCaption: scraped.imageCaption,
          videoUrl: scraped.videoUrl,
          sourceUrl: scraped.url,
          kicker: scraped.kicker,
          author: scraped.author,
          location: scraped.location,
          placement,
          sectionKey: scraped.sectionKey,
        };

        newsPipeline.publish(payload);

        const photoIcon = photoUrl || scraped.image ? "📸" : "📰";
        const videoIcon = scraped.videoUrl ? " 📹" : "";
        publishedSummaries.push(
          `*${i + 1}. [${placement} · ${scraped.sectionKey}]* ${scraped.headline} ${photoIcon}${videoIcon}\n` +
            `   _Source: ${scraped.kicker} (${scraped.paragraphs.length} paragraphs)_`
        );
      }

      const replyMsg =
        `✅ *${scrapeResults.filter((s) => s.success).length} NEWS STORIES PUBLISHED TO KHABARGANIT!* 🚀\n\n` +
        publishedSummaries.join("\n\n") +
        `\n\n⏰ *Published at:* ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST\n` +
        `🌐 *Live Front Page:*\nhttps://www.khabarganit.com`;

      await sendTelegramMessage(chatId, replyMsg);
      return NextResponse.json({ ok: true, count: scrapeResults.length });
    }

    // Handle Photo if present
    let imageUrl: string | undefined;
    if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
      const largest = message.photo[message.photo.length - 1];
      imageUrl = await getTelegramPhotoUrl(largest.file_id);
    }

    // ── FEATURE: SEPARATE PHOTO ATTACHMENT ──
    const hasStoryTag = /^(story|content|समाचार):/im.test(rawText);
    const hasMultipleParagraphs = rawText.split("\n\n").length > 2;

    if (imageUrl && !hasStoryTag && !hasMultipleParagraphs) {
      let targetHeadline = "";
      for (const line of rawText.split("\n").map((l: string) => l.trim()).filter(Boolean)) {
        if (/^(headline|title|शीर्षक):/i.test(line)) {
          targetHeadline = line.replace(/^(headline|title|शीर्षक):\s*/i, "").trim();
          break;
        } else if (!targetHeadline) {
          targetHeadline = line;
        }
      }

      const attachResult = newsPipeline.attachImage(
        targetHeadline,
        imageUrl,
        targetHeadline ? `${targetHeadline} (Photo: KhabarGanit)` : undefined
      );

      if (attachResult.success) {
        const attachConfirmation = `📸 *PHOTO ATTACHED SUCCESSFULLY!* 🚀\n\n` +
          `📰 *Story:* ${attachResult.headline}\n` +
          `🖼️ *Placement:* Attached to ${attachResult.section || "Lead"} broadsheet edition\n` +
          `⏰ *Updated at:* ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST\n\n` +
          `🌐 *View Live on Website:*\nhttps://www.khabarganit.com`;

        await sendTelegramMessage(chatId, attachConfirmation);
        return NextResponse.json({ ok: true, result: attachResult });
      }
    }

    // Parse news content for standard publishing
    const payload = parseNewsMessage(rawText, imageUrl);

    if (!payload || !payload.headline) {
      await sendTelegramMessage(
        chatId,
        `⚠️ *Headline not detected!*\n\nPlease start your news with *Headline:* so I can publish it accurately. Example:\n\n` +
        `*Headline:* Election Results Announced\n` +
        `*Section:* POLITICS\n` +
        `*Placement:* LEAD\n` +
        `*Subhead:* Official vote counts finalized\n` +
        `*Story:* Full story details here...`
      );
      return NextResponse.json({ ok: true });
    }

    // Publish to the live pipeline!
    const result = newsPipeline.publish(payload);

    const targetSection = (payload.sectionKey || "TRENDING").toLowerCase();
    const liveUrl = targetSection === "trending" 
      ? "https://www.khabarganit.com" 
      : `https://www.khabarganit.com/${targetSection}`;

    const confirmationMsg = `✅ *NEWS PUBLISHED TO KHABARGANIT!* 🚀\n\n` +
      `📰 *Headline:* ${payload.headline}\n` +
      `📁 *Section:* ${payload.sectionKey} (${payload.placement})\n` +
      `📸 *Photo:* ${payload.image ? "Attached ✅" : "Broadsheet Visual"}\n` +
      `⏰ *Published at:* ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST\n\n` +
      `🌐 *Front Page & Broadsheet:*\nhttps://www.khabarganit.com\n\n` +
      `📂 *Section View:*\n${liveUrl}`;

    await sendTelegramMessage(chatId, confirmationMsg);

    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error("Telegram webhook processing error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// GET handler to verify endpoint availability
export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "KhabarGanit Telegram Auto-Pipeline Webhook",
    webhook_url: "https://www.khabarganit.com/api/webhook/telegram",
  });
}
