/**
 * useLoginRateLimit
 * Client-side brute-force protection for login forms.
 * Tracks failed attempts per (portal, email) pair in localStorage.
 * After MAX_ATTEMPTS failures the account is locked for LOCKOUT_MS milliseconds.
 */

import { useCallback, useEffect, useState } from 'react';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitState {
  attempts: number;
  lockedUntil: number | null; // epoch ms
}

function storageKey(portal: 'member' | 'client', email: string): string {
  // Simple hash — not cryptographic, just for storage key uniqueness
  const encoded = btoa(email.trim().toLowerCase()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  return `ps_rl_${portal}_${encoded}`;
}

function readState(key: string): RateLimitState {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as RateLimitState;
  } catch {
    // ignore parse errors
  }
  return { attempts: 0, lockedUntil: null };
}

function writeState(key: string, state: RateLimitState): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // ignore storage errors (private browsing etc.)
  }
}

function clearState(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export interface UseLoginRateLimitReturn {
  /** True when the account is currently locked out */
  isLocked: boolean;
  /** How many attempts remain before lockout (0 when locked) */
  attemptsLeft: number;
  /** Minutes remaining in lockout (rounded up), or 0 when not locked */
  lockoutMinutesLeft: number;
  /** Seconds remaining in lockout, for a live countdown */
  lockoutSecondsLeft: number;
  /** Call after a confirmed failed login */
  recordFailure: () => void;
  /** Call after a successful login to clear the counter */
  resetLimit: () => void;
}

export function useLoginRateLimit(
  portal: 'member' | 'client',
  email: string,
): UseLoginRateLimitReturn {
  const [tick, setTick] = useState(0); // force re-renders for countdown

  // Derive state from localStorage on every render/tick
  const key = email.trim().length > 0 ? storageKey(portal, email) : null;
  const state: RateLimitState = key ? readState(key) : { attempts: 0, lockedUntil: null };

  const now = Date.now();
  const isLocked = !!state.lockedUntil && state.lockedUntil > now;
  const msLeft = isLocked ? (state.lockedUntil! - now) : 0;
  const lockoutSecondsLeft = Math.ceil(msLeft / 1000);
  const lockoutMinutesLeft = Math.ceil(msLeft / 60_000);
  const attemptsLeft = isLocked ? 0 : Math.max(0, MAX_ATTEMPTS - state.attempts);

  // Tick every second when locked so the countdown updates
  useEffect(() => {
    if (!isLocked) return;
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isLocked]);

  const recordFailure = useCallback(() => {
    if (!key) return;
    const current = readState(key);
    const newAttempts = current.attempts + 1;
    const lockedUntil = newAttempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : current.lockedUntil;
    writeState(key, { attempts: newAttempts, lockedUntil });
    setTick((t) => t + 1); // trigger re-render
  }, [key]);

  const resetLimit = useCallback(() => {
    if (!key) return;
    clearState(key);
    setTick((t) => t + 1);
  }, [key]);

  return {
    isLocked,
    attemptsLeft,
    lockoutMinutesLeft,
    lockoutSecondsLeft,
    recordFailure,
    resetLimit,
  };
}
