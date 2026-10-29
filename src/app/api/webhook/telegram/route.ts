import { NextResponse } from "next/server";
import { newsPipeline, PublishPayload } from "@/lib/newsPipeline";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
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
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  let headline = "";
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
      } else if (!headline) {
        headline = line;
      } else if (!subhead) {
        subhead = line;
      } else {
        paragraphs.push(line);
      }
    }
  }

  if (!headline) return null;

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
        `*📝 FORMAT TO PUBLISH:*\n` +
        `Send text or send a photo with this format:\n\n` +
        `*Headline:* Your Breaking Headline\n` +
        `*Section:* TRENDING _(or INDIA, WORLD, TECH, BUSINESS, SPORTS, POLITICS, ENTERTAINMENT)_\n` +
        `*Placement:* LEAD _(or SIDE, TOP, DIGEST)_\n` +
        `*Subhead:* Brief 1-line summary\n` +
        `*Story:* Full news paragraphs...\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `*⚡ QUICK PUBLISH:* Send any photo with just:\n` +
        `First line: Headline\n` +
        `Second line: Story\n\n` +
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
        `🔴 *Current Trending Lead*: ${lead}\n` +
        `📈 *Dynamic Updates Processed*: ${count}\n` +
        `🌐 *Site Status*: Live (200 OK)\n` +
        `🔗 https://www.khabarganit.com`
      );
      return NextResponse.json({ ok: true });
    }

    // Handle Photo if present
    let imageUrl: string | undefined;
    if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
      const largest = message.photo[message.photo.length - 1];
      imageUrl = await getTelegramPhotoUrl(largest.file_id);
    }

    // Parse news content
    const payload = parseNewsMessage(rawText, imageUrl);

    if (!payload || !payload.headline) {
      await sendTelegramMessage(
        chatId,
        `⚠️ *Could not detect headline!*\n\nPlease provide at least a headline. Example:\n\n` +
        `*Headline:* ISRO Launches New Satellite Mission\n` +
        `*Section:* TECH\n` +
        `*Story:* ISRO successfully placed the satellite in orbit today...`
      );
      return NextResponse.json({ ok: true });
    }

    // Publish to the live pipeline!
    const result = newsPipeline.publish(payload);

    const targetSection = (payload.sectionKey || "TRENDING").toLowerCase();
    const liveUrl = targetSection === "trending" 
      ? "https://www.khabarganit.com" 
      : `https://www.khabarganit.com/${targetSection}`;

    const confirmationMsg = `✅ *NEWS PUBLISHED SUCCESSFULLY!* 🚀\n\n` +
      `📰 *Headline:* ${payload.headline}\n` +
      `📁 *Section:* ${payload.sectionKey} (${payload.placement})\n` +
      `📸 *Photo:* ${imageUrl ? "Attached ✅" : "Default Broadsheet Image"}\n` +
      `⏰ *Published at:* ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST\n\n` +
      `🌐 *View on Website:*\n${liveUrl}`;

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
