import { NextResponse } from "next/server";

const MAX_LENGTH = { name: 100, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ponytail: per-instance memory only — a determined attacker spread across cold instances gets
// more than this. Vercel Firewall rate limiting is the upgrade path if abuse ever shows up.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX_REQUESTS = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentRequests.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentRequests.set(ip, recent);
  if (recentRequests.size > 5000) recentRequests.clear(); // keep a long-lived instance bounded
  return recent.length > RATE_MAX_REQUESTS;
}

/**
 * Forwards contact-form submissions to a Google Apps Script Web App, deployed and owned by the
 * client in her own Google account — the destination email lives entirely there, never in this
 * repo, never in an env var here, never in any response this route sends. This code only knows
 * an opaque webhook URL (CONTACT_WEBHOOK_URL), which reveals nothing about where mail ends up.
 */
export async function POST(request: Request) {
  // Vercel overwrites x-forwarded-for with the real client IP, so its first entry can be trusted.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages — please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, source } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "Please fill out every field." }, { status: 400 });
  }

  // Name and email are single-line fields: collapse any line breaks so they can't be used to
  // smuggle extra lines/headers into whatever the webhook builds from them.
  const cleanName = name.replace(/\s+/g, " ").trim();
  const cleanEmail = email.replace(/\s+/g, " ").trim();
  const cleanMessage = message.trim();

  if (
    cleanName.length > MAX_LENGTH.name ||
    cleanEmail.length > MAX_LENGTH.email ||
    cleanMessage.length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(cleanEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "The contact form isn't fully set up yet — please try again soon." },
      { status: 500 },
    );
  }

  try {
    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        // Only the two pages that render the form are real sources; never echo arbitrary input.
        source: source === "Hire Us" || source === "Join Us" ? source : "Unknown",
      }),
      signal: AbortSignal.timeout(10_000),
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
