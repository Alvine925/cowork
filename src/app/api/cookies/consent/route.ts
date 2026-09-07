import { NextRequest, NextResponse } from "next/server";

export interface CookieConsentPayload {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  userAgent?: string;
  action: "accept_all" | "reject_all" | "custom";
}

/** POST /api/cookies/consent — record a consent decision */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CookieConsentPayload;

    if (!body.timestamp || !body.action) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const record = {
      ...body,
      essential: true,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? body.userAgent ?? "unknown",
      receivedAt: new Date().toISOString(),
    };

    // Persistence hook – uncomment to save to Supabase:
    // const { error } = await supabase.from("cookie_consent_log").insert([record]);
    // if (error) throw error;

    console.log("[CookieConsent]", JSON.stringify(record));

    return NextResponse.json({ ok: true, id: "consent_" + Date.now() }, { status: 201 });
  } catch (err) {
    console.error("[CookieConsent] Error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error." }, { status: 500 });
  }
}

/** GET /api/cookies/consent — returns cookie category descriptions */
export async function GET() {
  return NextResponse.json({
    categories: [
      {
        id: "essential",
        label: "Essential Cookies",
        description:
          "Required for the website to function correctly. These enable core features such as security, authentication, and session management. They cannot be disabled.",
        required: true,
        examples: ["Session token", "CSRF protection", "Load-balancing"],
      },
      {
        id: "analytics",
        label: "Analytics & Performance",
        description:
          "Help us understand how visitors interact with the site so we can improve content and experience. All data is aggregated and anonymised.",
        required: false,
        examples: ["Page views", "Session duration", "Error tracking"],
      },
      {
        id: "marketing",
        label: "Marketing & Retargeting",
        description:
          "Used to deliver personalised advertisements and measure campaign effectiveness. Shared with trusted advertising partners.",
        required: false,
        examples: ["Retargeting pixels", "Ad impression tracking"],
      },
      {
        id: "preferences",
        label: "Preferences & Personalisation",
        description:
          "Remember your settings and personalisation choices so you do not have to re-enter them on every visit.",
        required: false,
        examples: ["Language setting", "Portal preference", "Theme"],
      },
    ],
  });
}
