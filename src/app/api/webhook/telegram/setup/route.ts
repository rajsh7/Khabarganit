import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error: "Missing Telegram Bot Token",
        instructions:
          "Provide ?token=YOUR_BOT_TOKEN in the URL query string or set TELEGRAM_BOT_TOKEN in Vercel environment variables.",
      },
      { status: 400 }
    );
  }

  // Production webhook URL
  const webhookUrl = "https://www.khabarganit.com/api/webhook/telegram";

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}&drop_pending_updates=true`
    );
    const data = await res.json();

    return NextResponse.json({
      setup: "KhabarGanit Telegram Auto-Pipeline",
      webhookUrl,
      telegramResponse: data,
      instructions: data.ok
        ? "Webhook registered successfully! You can now open Telegram and send /start to your bot."
        : "Failed to register webhook with Telegram. Check your bot token.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to connect to Telegram API", details: err.message },
      { status: 500 }
    );
  }
}
