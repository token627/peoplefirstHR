import { NextRequest, NextResponse } from "next/server";
import { applicationSchema, sanitizeString } from "@/lib/validation";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many submissions. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Silently discard honeypot-filled submissions
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  }

  const payload = {
    timestamp: new Date().toISOString(),
    fullName: sanitizeString(data.fullName),
    email: data.email,
    role: data.role,
    experience: data.experience,
    interestNote: sanitizeString(data.interestNote),
    portfolioUrl: data.portfolioUrl ? sanitizeString(data.portfolioUrl) : "",
    linkedinUrl: data.linkedinUrl ? sanitizeString(data.linkedinUrl) : "",
  };

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { success: false, message: "Service unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const n8nRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      console.error("n8n webhook returned", n8nRes.status);
      return NextResponse.json(
        { success: false, message: "Failed to submit application. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (err) {
    console.error("n8n webhook error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to submit application. Please try again." },
      { status: 502 }
    );
  }
}
