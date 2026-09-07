"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Settings, X, Check, ChevronDown, ChevronUp, Shield } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CONSENT_KEY = "ps_cookie_consent";
const CONSENT_VERSION = "1.0";

function loadSaved(): (CookiePreferences & { version: string }) | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function postConsent(
  prefs: CookiePreferences,
  action: "accept_all" | "reject_all" | "custom"
) {
  try {
    await fetch("/api/cookies/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...prefs, timestamp: new Date().toISOString(), action }),
    });
  } catch {
    // Non-blocking
  }
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({
  id,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
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
        "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 transition-colors duration-200 focus:outline-none",
        disabled
          ? "cursor-not-allowed border-navy/20 bg-navy/20"
          : checked
          ? "cursor-pointer border-navy bg-navy"
          : "cursor-pointer border-navy/30 bg-white",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-md transition-transform duration-200 mt-0.5",
          checked ? "translate-x-5 bg-white" : "translate-x-0.5",
          disabled ? "bg-navy/20" : checked ? "" : "bg-navy/30",
        ].join(" ")}
      />
    </button>
  );
}

// ─── Category Meta ────────────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { label: string; desc: string; examples: string[] }> = {
  essential: {
    label: "Essential Cookies",
    desc: "Required for the website to function correctly. Enables security, authentication, and session management. Cannot be disabled.",
    examples: ["Session token", "CSRF protection", "Load-balancing"],
  },
  analytics: {
    label: "Analytics & Performance",
    desc: "Help us understand how visitors interact with the site so we can improve content and user experience. Data is aggregated and anonymised.",
    examples: ["Page views", "Session duration", "Error tracking"],
  },
  marketing: {
    label: "Marketing & Retargeting",
    desc: "Used to deliver personalised advertisements and measure campaign effectiveness across trusted advertising partners.",
    examples: ["Retargeting pixels", "Ad impression tracking"],
  },
  preferences: {
    label: "Preferences",
    desc: "Remember your settings such as language, region, and portal type so you do not have to re-enter them on every visit.",
    examples: ["Language setting", "Portal preference"],
  },
};

// ─── Category Row ─────────────────────────────────────────────────────────────
function CategoryRow({
  id,
  checked,
  disabled,
  onChange,
}: {
  id: keyof typeof CATEGORY_META;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const meta = CATEGORY_META[id];
  return (
    <div className="border border-navy/10">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-navy/5 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-navy">{meta.label}</span>
          {disabled && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy/50 bg-navy/10 px-1.5 py-0.5">
              Always Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Toggle id={`cookie-toggle-${id}`} checked={checked} disabled={disabled} onChange={onChange} />
          <span className="text-navy/40">
            {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-navy/10 bg-[#f6f4ef] space-y-2">
          <p className="text-xs text-navy/65 leading-relaxed">{meta.desc}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {meta.examples.map((ex) => (
              <span key={ex} className="text-[10px] font-mono bg-navy/8 text-navy/60 px-2 py-0.5 border border-navy/10">
                {ex}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Banner ──────────────────────────────────────────────────────────────
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    setMounted(true);
    const saved = loadSaved();
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
    return;
  }, []);

  const save = (p: CookiePreferences, action: "accept_all" | "reject_all" | "custom") => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...p, version: CONSENT_VERSION }));
    postConsent(p, action);
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () =>
    save({ essential: true, analytics: true, marketing: true, preferences: true }, "accept_all");

  const rejectAll = () =>
    save({ essential: true, analytics: false, marketing: false, preferences: false }, "reject_all");

  const saveCustom = () => save(prefs, "custom");

  if (!mounted || !visible) return null;

  return (
    <>
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="true"
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
        className={[
          "fixed z-[9999]",
          showSettings
            ? "bottom-0 left-0 right-0 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px]"
            : "bottom-0 left-0 right-0",
        ].join(" ")}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        <div className="bg-[#0f1e16] text-white shadow-2xl border-t border-white/10 sm:border sm:border-white/10">

          {/* Compact bar */}
          {!showSettings && (
            <div className="px-6 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between max-w-screen-xl mx-auto">
              <div className="flex items-start gap-3">
                <Cookie className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">We use cookies</p>
                  <p className="text-xs text-white/55 mt-0.5 leading-relaxed max-w-2xl">
                    We use cookies to improve your experience, analyse traffic, and personalise content.{" "}
                    <Link href="/cookie-policy" className="text-gold/80 hover:text-gold underline transition-colors">
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                <button
                  id="cookie-settings-btn"
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2.5 transition-all"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </button>
                <button
                  id="cookie-reject-btn"
                  type="button"
                  onClick={rejectAll}
                  className="text-[11px] uppercase tracking-[0.12em] font-semibold text-white/50 hover:text-white px-4 py-2.5 transition-colors"
                >
                  Reject All
                </button>
                <button
                  id="cookie-accept-btn"
                  type="button"
                  onClick={acceptAll}
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold bg-gold text-[#0f1e16] hover:bg-gold/90 px-5 py-2.5 transition-colors"
                >
                  <Check className="h-3.5 w-3.5" />
                  Accept All
                </button>
              </div>
            </div>
          )}

          {/* Settings panel */}
          {showSettings && (
            <div className="flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0f1e16]">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gold" />
                  <span className="text-sm font-semibold">Cookie Settings</span>
                </div>
                <button
                  id="cookie-settings-close-btn"
                  type="button"
                  onClick={() => setShowSettings(false)}
                  aria-label="Close"
                  className="p-1.5 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 px-5 py-4 bg-[#FBF8F0]">
                <p className="text-xs text-navy/60 leading-relaxed mb-4">
                  Choose which cookies you allow. Essential cookies are always active.{" "}
                  <Link href="/cookie-policy" className="text-navy font-semibold underline">
                    Cookie Policy
                  </Link>
                </p>
                <div className="space-y-2">
                  {(["essential", "analytics", "marketing", "preferences"] as const).map((cat) => (
                    <CategoryRow
                      key={cat}
                      id={cat}
                      checked={cat === "essential" ? true : prefs[cat]}
                      disabled={cat === "essential"}
                      onChange={(v) => setPrefs((p) => ({ ...p, [cat]: v }))}
                    />
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 bg-[#0f1e16] border-t border-white/10 flex flex-col gap-2">
                <button
                  id="cookie-save-custom-btn"
                  type="button"
                  onClick={saveCustom}
                  className="w-full text-[11px] uppercase tracking-[0.12em] font-semibold bg-gold text-[#0f1e16] hover:bg-gold/90 py-3 transition-colors"
                >
                  Save My Preferences
                </button>
                <div className="flex gap-2">
                  <button
                    id="cookie-settings-reject-btn"
                    type="button"
                    onClick={rejectAll}
                    className="flex-1 text-[11px] uppercase tracking-[0.12em] font-semibold text-white/50 hover:text-white border border-white/20 py-2.5 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    id="cookie-settings-accept-btn"
                    type="button"
                    onClick={acceptAll}
                    className="flex-1 text-[11px] uppercase tracking-[0.12em] font-semibold text-white/70 hover:text-white border border-white/20 py-2.5 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
