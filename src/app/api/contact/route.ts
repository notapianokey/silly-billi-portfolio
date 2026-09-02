import { NextResponse } from "next/server";

/**
 * Forwards contact-form submissions to a Google Apps Script Web App, deployed and owned by the
 * client in her own Google account — the destination email lives entirely there, never in this
 * repo, never in an env var here, never in any response this route sends. This code only knows
 * an opaque webhook URL (CONTACT_WEBHOOK_URL), which reveals nothing about where mail ends up.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, source } = body as Record<string, unknown>;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return NextResponse.json({ error: "Please fill out every field." }, { status: 400 });
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "The contact form isn't fully set up yet — please try again soon." },
        { status: 500 },
      );
    }

    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        source: typeof source === "string" ? source : "Unknown",
      }),
    });

    if (!webhookRes.ok) {
      throw new Error(`Webhook responded with ${webhookRes.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 },
    );
  }
}
