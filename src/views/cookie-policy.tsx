"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Shield, BarChart2, Target, SlidersHorizontal, Check, RotateCcw } from "lucide-react";

const lastUpdated = "September 4, 2026";
const CONSENT_KEY = "ps_cookie_consent";
const CONSENT_VERSION = "1.0";

type CategoryId = "essential" | "analytics" | "marketing" | "preferences";

interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CATEGORIES: {
  id: CategoryId;
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  description: string;
  cookies: { name: string; purpose: string; duration: string }[];
}[] = [
  {
    id: "essential",
    icon: <Shield className="h-5 w-5" />,
    label: "Essential",
    required: true,
    description:
      "These cookies are strictly necessary for the website to operate. Without them, services like account login, security, and session continuity would not function. They cannot be disabled.",
    cookies: [
      { name: "ps_session", purpose: "Maintains your authenticated session", duration: "Session" },
      { name: "ps_csrf", purpose: "Prevents cross-site request forgery attacks", duration: "Session" },
      { name: "ps_portal_type", purpose: "Remembers which portal (member/client) you accessed", duration: "30 days" },
    ],
  },
  {
    id: "analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    label: "Analytics & Performance",
    description:
      "These cookies help us understand how people use the site — which pages are most visited, where people drop off, and how fast pages load. All data is anonymised and never sold.",
    cookies: [
      { name: "_ga", purpose: "Google Analytics — distinguishes unique users", duration: "2 years" },
      { name: "_ga_*", purpose: "Google Analytics — session tracking", duration: "2 years" },
      { name: "ps_perf", purpose: "Internal performance timing", duration: "7 days" },
    ],
  },
  {
    id: "marketing",
    icon: <Target className="h-5 w-5" />,
    label: "Marketing & Retargeting",
    description:
      "These cookies allow us to show relevant advertisements to people who have visited our site, and measure how effective our campaigns are. Opting out will not remove ads — it will make them less relevant.",
    cookies: [
      { name: "_fbp", purpose: "Facebook — ad attribution and retargeting", duration: "3 months" },
      { name: "_gcl_au", purpose: "Google Ads — conversion tracking", duration: "3 months" },
    ],
  },
  {
    id: "preferences",
    icon: <SlidersHorizontal className="h-5 w-5" />,
    label: "Preferences",
    description:
      "These cookies remember your personal settings so we can personalise your experience. For example, remembering your language preference or your portal access type.",
    cookies: [
      { name: "ps_client_user", purpose: "Stores your portal profile locally", duration: "Persistent" },
      { name: "ps_cookie_consent", purpose: "Records your cookie consent choices", duration: "12 months" },
    ],
  },
];

function Toggle({
  checked,
  disabled,
  onChange,
  id,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={[
        "relative inline-flex h-7 w-12 flex-shrink-0 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2",
        disabled
          ? "cursor-not-allowed border-navy/20 bg-navy/15"
          : checked
          ? "cursor-pointer border-navy bg-navy"
          : "cursor-pointer border-navy/30 bg-white",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition-transform duration-200 mt-0.5",
          checked ? "translate-x-5 bg-white" : "translate-x-0.5 bg-navy/25",
          disabled && "bg-navy/20",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookiePolicyPage() {
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        setPrefs({
          essential: true,
          analytics: parsed.analytics ?? false,
          marketing: parsed.marketing ?? false,
          preferences: parsed.preferences ?? false,
        });
      }
    } catch {
      // ignore malformed or empty stored value
      localStorage.removeItem(CONSENT_KEY);
    }
  }, []);

  const handleSave = async () => {
    const record = { ...prefs, version: CONSENT_VERSION };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    try {
      await fetch("/api/cookies/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prefs, timestamp: new Date().toISOString(), action: "custom" }),
      });
    } catch {
      // non-blocking
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem(CONSENT_KEY);
    setPrefs({ essential: true, analytics: false, marketing: false, preferences: false });
  };

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Cookie Policy."
        subtitle="Transparent and straightforward — here is exactly what we store, why, and how to control it."
        height="h-[50vh] min-h-[380px]"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">

          {/* Meta */}
          <p className="text-sm text-dark-gray/40 font-mono mb-16">Last updated: {lastUpdated}</p>

          {/* Intro */}
          <div className="prose prose-gray prose-headings:font-heading prose-headings:text-navy max-w-3xl mb-20">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They allow the
              site to remember information about your visit — for example, your preferred language or login
              status — making your next visit easier and the site more useful to you.
            </p>
            <p>
              Paper Street uses cookies and similar technologies (such as local storage and session tokens)
              on <strong>paperstreet.africa</strong> to keep you securely signed in, understand how our
              site is used, and show relevant content.
            </p>

            <h2>2. Types of Cookies We Use</h2>
            <p>
              We group our cookies into four categories. You can accept or decline each category below —
              except for essential cookies which are always active.
            </p>

            <h2>3. Third-Party Cookies</h2>
            <p>
              Some cookies are set by third-party services embedded in our site (e.g. Google Analytics,
              Facebook Pixel). These providers have their own privacy policies, which we encourage you to
              review. We do not sell your data to advertisers.
            </p>

            <h2>4. Managing Cookies</h2>
            <p>
              You can update your preferences at any time using the settings panel below. You can also
              clear cookies through your browser settings — note that doing so may log you out of your
              portal and reset your preferences.
            </p>

            <h2>5. Contact</h2>
            <p>
              Questions about our cookie practices? Email us at{" "}
              <a href="mailto:privacy@paperstreet.africa">privacy@paperstreet.africa</a> or visit our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>

          {/* ── Live Settings Panel ── */}
          <div id="cookie-settings" className="border border-navy/15 bg-[#f9f8f4]">
            <div className="px-8 py-6 border-b border-navy/10 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
                  Your Preferences
                </p>
                <h2 className="mt-1 font-heading text-2xl text-navy font-light">
                  Cookie Settings
                </h2>
                {!mounted ? null : (
                  <p className="text-xs text-navy/50 mt-1">
                    Changes take effect immediately and are saved for 12 months.
                  </p>
                )}
              </div>
              <button
                id="cookie-policy-reset-btn"
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-navy/50 hover:text-navy border border-navy/20 hover:border-navy/50 px-4 py-2 transition-all"
              >
                <RotateCcw className="h-3 w-3" />
                Reset All
              </button>
            </div>

            <div className="divide-y divide-navy/10">
              {CATEGORIES.map((cat) => {
                const isChecked = cat.id === "essential" ? true : prefs[cat.id];
                return (
                  <div key={cat.id} className="px-8 py-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <span className="text-navy/40 mt-0.5 flex-shrink-0">{cat.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-navy">{cat.label}</span>
                            {cat.required && (
                              <span className="text-[10px] font-mono uppercase tracking-wider text-navy/50 bg-navy/10 px-1.5 py-0.5">
                                Always Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-navy/60 leading-relaxed max-w-xl">
                            {cat.description}
                          </p>
                          {/* Cookie table */}
                          <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-navy/10">
                                  <th className="text-left font-mono text-[10px] uppercase tracking-wider text-navy/40 pb-2 pr-6">
                                    Cookie Name
                                  </th>
                                  <th className="text-left font-mono text-[10px] uppercase tracking-wider text-navy/40 pb-2 pr-6">
                                    Purpose
                                  </th>
                                  <th className="text-left font-mono text-[10px] uppercase tracking-wider text-navy/40 pb-2">
                                    Duration
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-navy/5">
                                {cat.cookies.map((c) => (
                                  <tr key={c.name}>
                                    <td className="py-2 pr-6 font-mono text-[11px] text-navy/70">{c.name}</td>
                                    <td className="py-2 pr-6 text-navy/55">{c.purpose}</td>
                                    <td className="py-2 text-navy/40">{c.duration}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 pt-1">
                        <Toggle
                          id={`cookie-policy-toggle-${cat.id}`}
                          checked={isChecked}
                          disabled={cat.required}
                          onChange={(v) => setPrefs((p) => ({ ...p, [cat.id]: v }))}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-8 py-6 border-t border-navy/10 flex items-center gap-4 flex-wrap">
              <button
                id="cookie-policy-save-btn"
                type="button"
                onClick={handleSave}
                disabled={!mounted}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-semibold bg-navy text-white hover:bg-navy/90 disabled:opacity-40 px-6 py-3 transition-colors"
              >
                {saved ? <Check className="h-3.5 w-3.5" /> : null}
                {saved ? "Saved!" : "Save My Preferences"}
              </button>
              <p className="text-[11px] text-navy/40">
                Your choice is stored locally in your browser and respected on every visit.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
