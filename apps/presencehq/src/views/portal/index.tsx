'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FolderOpen,
  Home,
  LifeBuoy,
  LogOut,
  Menu,
  QrCode,
  Receipt,
  Ticket,
  UserRound,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  sanitizeInput,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '@/lib/sanitize';
import type { User, Session } from '@supabase/supabase-js';

// ==========================================
// PORTAL AUTH & CONTEXT
// ==========================================
export type PortalType = 'member' | 'client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  portalType: PortalType;
  setPortalType: (type: PortalType) => void;
  signOut: () => Promise<void>;
  signInWithDemo: (type: PortalType) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  portalType: 'member',
  setPortalType: () => {},
  signOut: async () => {},
  signInWithDemo: () => {},
});

export const usePortalAuth = () => useContext(AuthContext);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalType, setPortalTypeState] = useState<PortalType>(() => {
    if (typeof window === 'undefined') return 'member';
    return (localStorage.getItem('ps_portal_type') as PortalType) || 'member';
  });

  const setPortalType = (type: PortalType) => {
    setPortalTypeState(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ps_portal_type', type);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.portal_type) {
        setPortalType(session.user.user_metadata.portal_type);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.portal_type) {
        setPortalType(session.user.user_metadata.portal_type);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const signInWithDemo = (type: PortalType) => {
    setPortalType(type);
    const mockUser: User = {
      id: type === 'member' ? 'mem_001' : 'cli_001',
      user_metadata: {
        full_name: type === 'member' ? 'Alvine Otieno' : 'Wanjiku Mwangi',
        portal_type: type,
        company: type === 'member' ? 'Pamela Steele Associates' : 'Horizon Labs Kenya',
      },
      aud: 'authenticated',
      created_at: new Date(2025, 0, 15).toISOString(),
      email: type === 'member' ? 'alvine@psa.africa' : 'wanjiku@horizonlabs.ke',
      phone: '+254 712 345 678',
    } as unknown as User;
    setUser(mockUser);
    setSession({ user: mockUser, access_token: 'demo-token' } as unknown as Session);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        portalType,
        setPortalType,
        signOut,
        signInWithDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function formatDate(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
}

function formatMoney(value?: number | null) {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value);
}

function initials(name?: string | null) {
  return (name || 'PS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function StatusIndicator({ status }: { status: string }) {
  const isGood = status === 'active' || status === 'ready' || status === 'confirmed';
  const isPending = status === 'pending' || status === 'pending_payment';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold border ${
        isGood
          ? 'border-emerald-700/20 bg-emerald-50 text-emerald-800'
          : isPending
            ? 'border-amber-700/20 bg-amber-50 text-amber-800'
            : 'border-rose-700/20 bg-rose-50 text-rose-800'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isGood ? 'bg-emerald-600' : isPending ? 'bg-amber-600' : 'bg-rose-600'
        }`}
      />
      {status.replaceAll('_', ' ')}
    </span>
  );
}

function PageHeader({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <div className="pb-8 border-b border-navy/10 max-w-3xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">{eyebrow}</p>
      <h1 className="mt-2 font-heading text-4xl md:text-5xl font-light text-navy tracking-tight">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-navy/65">{detail}</p>
    </div>
  );
}

// ==========================================
// 1. MEMBER LOGIN (MEMBERS ONLY - NO SIGNUP)
// ==========================================
export function MemberLoginPage() {
  const { user, signInWithDemo, setPortalType } = usePortalAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPortalType('member');
    if (user) {
      router.push('/portal/member/dashboard');
    }
  }, [user, router, setPortalType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error || 'Invalid email');
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      setError(passCheck.error || 'Invalid password');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = sanitizeInput(email, 120).toLowerCase();
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (authErr) throw authErr;
      if (data.user) {
        setPortalType('member');
        router.push('/portal/member/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid member credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF8F0] pt-20 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy/60 hover:text-navy mb-12 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Paper Street
        </Link>

        <div className="mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
            Member Access
          </span>
          <h1 className="mt-2 font-heading text-4xl font-light text-navy">Member Sign In</h1>
          <p className="mt-2 text-xs text-navy/60 leading-relaxed">
            Paper Street members manage registered office addresses, mail logging, legal documents, and boardroom credits here.
          </p>
        </div>

        <div className="border-t border-navy/15 pt-8">
          <div className="mb-6 p-4 bg-navy/5 border-l-2 border-gold text-xs text-navy/75 leading-relaxed">
            <strong>Member Credentials Notice:</strong> Member accounts are provisioned exclusively upon office lease confirmation. Self-registration is restricted.
          </div>

          {error && (
            <div className="mb-6 p-3.5 border-l-2 border-rose-600 bg-rose-50 text-xs text-rose-800">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@company.africa"
                className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Member Portal'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-between text-xs text-navy/60">
            <span>Need to book a meeting room?</span>
            <Link href="/portal/client/login" className="text-gold font-semibold hover:underline">
              Client Portal &rarr;
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-navy/10 text-center">
            <button
              type="button"
              onClick={() => signInWithDemo('member')}
              className="text-xs font-mono text-navy/60 hover:text-navy underline"
            >
              [Dev Demo: 1-Click Member Sign In]
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ==========================================
// 2. CLIENT AUTH (LOGIN & REGISTER)
// ==========================================
export function ClientLoginPage() {
  const { user, signInWithDemo, setPortalType } = usePortalAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPortalType('client');
    if (user) {
      router.push('/portal/client/dashboard');
    }
  }, [user, router, setPortalType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error || 'Invalid email');
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      setError(passCheck.error || 'Invalid password');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = sanitizeInput(email, 120).toLowerCase();
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (authErr) throw authErr;
      if (data.user) {
        setPortalType('client');
        router.push('/portal/client/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid client credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF8F0] pt-20 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy/60 hover:text-navy mb-12 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Paper Street
        </Link>

        <div className="mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
            Client Portal
          </span>
          <h1 className="mt-2 font-heading text-4xl font-light text-navy">Client Sign In</h1>
          <p className="mt-2 text-xs text-navy/60 leading-relaxed">
            Access day passes, meeting room reservations, guest passes, and payment receipts.
          </p>
        </div>

        <div className="border-t border-navy/15 pt-8">
          {error && (
            <div className="mb-6 p-3.5 border-l-2 border-rose-600 bg-rose-50 text-xs text-rose-800">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.ke"
                className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Client Desk'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-between text-xs">
            <span className="text-navy/60">New client?</span>
            <Link href="/portal/client/register" className="text-gold font-semibold hover:underline">
              Create Client Account &rarr;
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-navy/10 text-center">
            <button
              type="button"
              onClick={() => signInWithDemo('client')}
              className="text-xs font-mono text-navy/60 hover:text-navy underline"
            >
              [Dev Demo: 1-Click Client Sign In]
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ClientRegisterPage() {
  const { user, setPortalType } = usePortalAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    setPortalType('client');
    if (user) {
      router.push('/portal/client/dashboard');
    }
  }, [user, router, setPortalType]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameCheck = validateName(fullName);
    if (!nameCheck.valid) {
      setError(nameCheck.error || 'Invalid name');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error || 'Invalid email');
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      setError(passCheck.error || 'Invalid password');
      return;
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.error || 'Invalid phone number');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = sanitizeInput(email, 120).toLowerCase();
      const { data, error: authErr } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: nameCheck.cleanName,
            phone: phoneCheck.cleanPhone,
            portal_type: 'client',
          },
        },
      });

      if (authErr) throw authErr;

      if (data.session) {
        setPortalType('client');
        router.push('/portal/client/dashboard');
      } else {
        setCreated(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration error. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF8F0] pt-20 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <Link
          href="/portal/client/login"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy/60 hover:text-navy mb-12 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
        </Link>

        <div className="mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
            On-Demand Access
          </span>
          <h1 className="mt-2 font-heading text-4xl font-light text-navy">Create Client Account</h1>
          <p className="mt-2 text-xs text-navy/60 leading-relaxed">
            Register to reserve conference rooms, day desks, and audio booths across Nairobi.
          </p>
        </div>

        <div className="border-t border-navy/15 pt-8">
          {created ? (
            <div className="py-6 border-l-2 border-emerald-600 pl-4">
              <h2 className="font-heading text-2xl text-navy">Account Created</h2>
              <p className="mt-2 text-xs text-navy/70 leading-relaxed">
                Verification link sent to <strong className="text-navy">{email}</strong>. You can now log in to manage your bookings.
              </p>
              <Link
                href="/portal/client/login"
                className="mt-6 inline-block bg-navy text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
              >
                Go to Sign In &rarr;
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-3.5 border-l-2 border-rose-600 bg-rose-50 text-xs text-rose-800">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Samuel Njoroge"
                    className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="samuel@company.ke"
                    className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                    Telephone (M-Pesa Notifications)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                    Password (Min 6 Characters)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Register Client Account'}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-navy/60">Already registered?</span>
                <Link href="/portal/client/login" className="text-gold font-semibold hover:underline">
                  Sign In &rarr;
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// ==========================================
// 3. EDITORIAL SHELL LAYOUT (NO CARDS)
// ==========================================
const memberNav = [
  { href: '/portal/member/dashboard', label: 'Overview', icon: Home },
  { href: '/portal/member/membership', label: 'Membership Terms', icon: Receipt },
  { href: '/portal/member/documents', label: 'Documents & Leases', icon: FolderOpen },
  { href: '/portal/member/support', label: 'Concierge Desk', icon: LifeBuoy },
  { href: '/portal/member/profile', label: 'Account Profile', icon: UserRound },
];

const clientNav = [
  { href: '/portal/client/dashboard', label: 'Client Desk', icon: Home },
  { href: '/portal/client/bookings', label: 'Reserve Workspace', icon: Receipt },
  { href: '/portal/client/passes', label: 'Entry Passes & QR', icon: Ticket },
  { href: '/portal/client/invoices', label: 'Orders & Receipts', icon: Receipt },
  { href: '/portal/client/profile', label: 'Profile', icon: UserRound },
];

export function PortalShellLayout({ children, type }: { children: ReactNode; type: PortalType }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = usePortalAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || (type === 'member' ? 'Member' : 'Client');
  const navItems = type === 'member' ? memberNav : clientNav;

  const handleSignOut = () => {
    if (window.confirm('Sign out of Paper Street?')) {
      void signOut();
      router.push(type === 'member' ? '/portal/member/login' : '/portal/client/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F0] flex">
      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Clean Editorial Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#0F2D52] px-7 py-8 text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-gold font-serif-app text-lg font-bold text-navy">
              P
            </span>
            <div>
              <span className="block font-heading text-lg tracking-tight leading-none">Paper Street</span>
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-white/50 mt-1">
                {type === 'member' ? 'Member Operating Desk' : 'Client Workspace'}
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1 text-white/60 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-14 flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold font-bold mb-4">
            Navigation
          </p>
          <nav className="space-y-1.5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs tracking-wide transition-colors ${
                    active
                      ? 'bg-white/10 text-white font-semibold border-l-2 border-gold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={16} strokeWidth={active ? 2 : 1.5} className={active ? 'text-gold' : ''} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Status Bottom Line */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-white/10 font-mono text-xs font-bold text-gold">
              {initials(name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">{name}</p>
              <p className="truncate text-[10px] text-white/50 uppercase tracking-wider font-mono">
                {type === 'member' ? 'Verified Member' : 'Client Access'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-4 flex items-center gap-2 text-[11px] text-white/50 hover:text-white transition-colors"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 border-b border-navy/10 bg-[#FBF8F0]/95 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 text-navy lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/50 font-bold">
              Paper Street / Nairobi, Kenya · Supabase Authenticated
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4 text-xs text-navy/70">
            <span className="font-medium">{name}</span>
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
          </div>
        </header>

        <main className="flex-1 px-6 md:px-12 py-10 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 4. MEMBER DASHBOARD VIEW
// ==========================================
export function MemberDashboardView() {
  const { user } = usePortalAuth();
  const name = user?.user_metadata?.full_name || 'Member';

  const memberPlan = {
    plan: 'Professional Virtual Office',
    status: 'active',
    location: 'Delta Corner, Westlands, Nairobi',
    billingCycle: 'annual',
    price: 45000,
    nextBillingDate: '2026-11-15',
    depositAmount: 10000,
  };

  const activities = [
    { id: 1, label: 'Official Mail Logged', detail: 'KRA Notice scanned and filed to member documents', date: '2026-08-20' },
    { id: 2, label: 'Annual Lease Term Active', detail: 'KES 45,000 processed via M-Pesa Till', date: '2026-08-15' },
    { id: 3, label: 'Boardroom Session Reserved', detail: 'Executive Suite booked for 2 hours in Delta Corner', date: '2026-08-10' },
  ];

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Member Operating Desk"
        title={`Welcome, ${name}.`}
        detail="Your registered corporate address and flexible workspace amenities in Westlands are active."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-navy/10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Membership</p>
          <p className="font-heading text-2xl font-light text-navy mt-1">{memberPlan.plan}</p>
          <div className="mt-2"><StatusIndicator status={memberPlan.status} /></div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Annual Rate</p>
          <p className="font-heading text-2xl font-light text-navy mt-1">{formatMoney(memberPlan.price)}</p>
          <p className="text-xs text-navy/60 mt-1">Renews {formatDate(memberPlan.nextBillingDate)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Documents</p>
          <p className="font-heading text-2xl font-light text-navy mt-1">4 Verified</p>
          <p className="text-xs text-navy/60 mt-1">Lease & Utility Proofs</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Primary Location</p>
          <p className="font-heading text-2xl font-light text-navy mt-1">Delta Corner</p>
          <p className="text-xs text-navy/60 mt-1">Westlands, Nairobi</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 pt-4">
        <div>
          <h2 className="font-heading text-2xl text-navy font-light mb-6">Recent Activity Log</h2>
          <div className="divide-y divide-navy/10">
            {activities.map((act) => (
              <div key={act.id} className="py-4 first:pt-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-navy">{act.label}</span>
                  <span className="font-mono text-navy/40">{formatDate(act.date)}</span>
                </div>
                <p className="text-xs text-navy/65 mt-1 leading-relaxed">{act.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-navy font-light mb-6">Member Services</h2>
          <div className="space-y-4">
            <Link
              href="/portal/member/documents"
              className="group flex items-center justify-between p-4 border border-navy/15 hover:border-navy hover:bg-navy/5 transition-all"
            >
              <div>
                <p className="text-xs font-semibold text-navy">Proof of Address Package</p>
                <p className="text-[11px] text-navy/60 mt-0.5">Download landlord consent & utility bills for KRA / Banks</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy/40 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portal/member/support"
              className="group flex items-center justify-between p-4 border border-navy/15 hover:border-navy hover:bg-navy/5 transition-all"
            >
              <div>
                <p className="text-xs font-semibold text-navy">Book Boardroom with Credits</p>
                <p className="text-[11px] text-navy/60 mt-0.5">4 hours complementary conference space available</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy/40 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portal/member/membership"
              className="group flex items-center justify-between p-4 border border-navy/15 hover:border-navy hover:bg-navy/5 transition-all"
            >
              <div>
                <p className="text-xs font-semibold text-navy">View Membership Inclusions</p>
                <p className="text-[11px] text-navy/60 mt-0.5">Review mail handling, phone answering, and terms</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy/40 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemberMembershipView() {
  const data = {
    plan: 'Professional Virtual Office',
    location: 'Delta Corner, Westlands, Nairobi',
    status: 'active',
    billingCycle: 'annual',
    annualPrice: 45000,
    depositAmount: 10000,
    nextBillingDate: '2026-11-15',
    renewalDate: '2026-11-15',
    lastPaymentDate: '2025-11-15',
    includedServices: [
      'Prestigious Nairobi Business Address (Delta Corner, Westlands)',
      'Official Mail Handling & Reception Notification',
      'Daily Mail Forwarding to Email (High-Resolution PDF Scans)',
      '4 Hours Boardroom / Meeting Space per month',
      'Certified Proof of Address Utility Documents for KRA & Banking',
      'Front Desk Receptionist & Call Answering in Your Entity Name',
    ],
  };

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Contract Terms"
        title="Membership Details"
        detail="A clear view of your active services, billing cycles, and legal provisions."
      />

      <div className="grid md:grid-cols-2 gap-12 py-6 border-b border-navy/10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Plan & Location</p>
          <h2 className="font-heading text-3xl text-navy mt-1">{data.plan}</h2>
          <p className="text-xs text-navy/60 mt-2">{data.location}</p>
          <div className="mt-4"><StatusIndicator status={data.status} /></div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Billing Frequency</p>
            <p className="font-heading text-2xl text-navy mt-1 capitalize">{data.billingCycle}</p>
            <p className="text-xs text-navy/60 mt-1">{formatMoney(data.annualPrice)} / year</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Security Deposit</p>
            <p className="font-heading text-2xl text-navy mt-1">{formatMoney(data.depositAmount)}</p>
            <p className="text-xs text-navy/60 mt-1">Refundable on lease exit</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-2xl text-navy font-light mb-6">Included Services Checklist</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {data.includedServices.map((service, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-navy/10 text-xs text-navy/80">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MemberDocumentsView() {
  const documents = [
    { id: 1, name: 'Paper Street Virtual Office Lease Agreement', category: 'Legal', status: 'ready', description: 'Fully executed annual agreement with building management.', updatedDate: '2026-08-15' },
    { id: 2, name: 'Proof of Address Letter (KRA & Bank verified)', category: 'Compliance', status: 'ready', description: 'Official certified utility bill and landlord consent letter.', updatedDate: '2026-08-15' },
    { id: 3, name: 'August 2026 Scanned Post & Mail Receipt', category: 'Mail', status: 'ready', description: '3 parcels collected and signed by reception.', updatedDate: '2026-08-20' },
    { id: 4, name: 'Annual Membership Tax Invoice & ETR', category: 'Billing', status: 'ready', description: 'M-Pesa Till payment receipt with VAT breakdown.', updatedDate: '2025-11-15' },
  ];

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Records & Compliance"
        title="Document Shelf"
        detail="Official lease contracts, bank utility proofs, and scanned mail logs."
      />

      <div className="divide-y divide-navy/10">
        {documents.map((doc) => (
          <div key={doc.id} className="py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-navy">{doc.name}</h3>
                <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 bg-navy/5 px-2 py-0.5">
                  {doc.category}
                </span>
              </div>
              <p className="text-xs text-navy/60 mt-1">{doc.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-navy/40">Updated {formatDate(doc.updatedDate)}</span>
              <button
                type="button"
                onClick={() => alert(`Downloading ${doc.name} (PDF)`)}
                className="inline-flex items-center gap-1.5 border border-navy/20 px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
              >
                <Download size={13} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MemberSupportView() {
  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Dedicated Support"
        title="Concierge & Reception"
        detail="Direct communication lines to the Westlands front desk team."
      />

      <div className="grid md:grid-cols-3 gap-6 py-6 border-b border-navy/10">
        <div className="p-6 border border-navy/15">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Mail Dispatch</p>
          <h3 className="font-heading text-xl text-navy mt-2">Physical Forwarding</h3>
          <p className="text-xs text-navy/60 mt-2 leading-relaxed">
            Request courier dispatch of received original parcels to your physical location.
          </p>
          <a
            href="mailto:hello@paperstreet.africa?subject=Mail%20Forwarding%20Request"
            className="inline-block mt-6 text-xs font-semibold text-navy underline"
          >
            Dispatch Request &rarr;
          </a>
        </div>

        <div className="p-6 border border-navy/15">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Meeting Space</p>
          <h3 className="font-heading text-xl text-navy mt-2">Boardroom Booking</h3>
          <p className="text-xs text-navy/60 mt-2 leading-relaxed">
            Reserve the 6-person or 12-person boardroom with your monthly member credits.
          </p>
          <a
            href="mailto:hello@paperstreet.africa?subject=Boardroom%20Reservation"
            className="inline-block mt-6 text-xs font-semibold text-navy underline"
          >
            Book Room &rarr;
          </a>
        </div>

        <div className="p-6 border border-navy/15">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Direct Desk</p>
          <h3 className="font-heading text-xl text-navy mt-2">Telephone Reception</h3>
          <p className="text-xs text-navy/60 mt-2 leading-relaxed">
            Call the front desk during office hours (Mon-Fri 8:30 AM - 5:30 PM EAT).
          </p>
          <a
            href="tel:+254709123456"
            className="inline-block mt-6 text-xs font-semibold text-navy underline"
          >
            +254 709 123 456 &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. CLIENT DASHBOARD VIEW
// ==========================================
export function ClientDashboardView() {
  const { user } = usePortalAuth();
  const name = user?.user_metadata?.full_name || 'Client';

  const upcomingBookings = [
    {
      id: 'BK-2041',
      room: 'The Glasshouse Meeting Room (6 Pax)',
      location: 'Delta Corner, Westlands',
      date: '2026-08-26',
      time: '10:00 AM - 12:00 PM',
      status: 'confirmed',
      amount: 5000,
    },
    {
      id: 'BK-2042',
      room: 'Full-Day Hot Desk Pass',
      location: 'Riverside Drive Hub',
      date: '2026-08-28',
      time: '08:30 AM - 06:00 PM',
      status: 'confirmed',
      amount: 2500,
    },
  ];

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="On-Demand Client Hub"
        title={`Welcome, ${name}.`}
        detail="Manage your day passes, meeting room reservations, and instant payment receipts."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-navy/10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Active Passes</p>
          <p className="font-heading text-2xl font-light text-navy mt-1">1 Day Pass</p>
          <div className="mt-2"><StatusIndicator status="ready" /></div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Next Reservation</p>
          <p className="font-heading text-2xl font-light text-navy mt-1">Wed, Aug 26</p>
          <p className="text-xs text-navy/60 mt-1">10:00 AM · Westlands</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Check-in PIN</p>
          <p className="font-heading text-2xl font-light text-navy mt-1 font-mono">PS-8291</p>
          <p className="text-xs text-navy/60 mt-1">Scan QR at reception</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">New Booking</p>
          <Link
            href="/portal/client/bookings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-gold mt-2 hover:underline"
          >
            + Reserve Space
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl text-navy font-light">Scheduled Reservations</h2>
          <Link href="/portal/client/bookings" className="text-xs font-semibold text-navy hover:underline">
            + Book another space &rarr;
          </Link>
        </div>

        <div className="divide-y divide-navy/10">
          {upcomingBookings.map((b) => (
            <div key={b.id} className="py-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-navy">{b.room}</h3>
                <p className="text-xs text-navy/60 mt-0.5">{b.location} · {b.time}</p>
                <p className="font-mono text-[10px] text-navy/40 mt-1">{formatDate(b.date)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-navy">{formatMoney(b.amount)}</p>
                <div className="mt-1"><StatusIndicator status={b.status} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientBookingsView() {
  const [selectedService, setSelectedService] = useState('The Glasshouse Meeting Room (6 Pax)');
  const [selectedLocation, setSelectedLocation] = useState('Westlands (Delta Corner)');
  const [date, setDate] = useState('2026-08-27');
  const [hours, setHours] = useState(2);
  const [booked, setBooked] = useState(false);

  const spaces = [
    { title: 'Hot Desk Day Pass', price: 2000, unit: 'per day', desc: 'High-speed internet, power backup, specialty tea & coffee included.' },
    { title: 'The Glasshouse Meeting Room (6 Pax)', price: 2500, unit: 'per hour', desc: '4K Presentation display, whiteboard, conference phone.' },
    { title: 'Executive Boardroom (12 Pax)', price: 4500, unit: 'per hour', desc: 'Premium ergonomic leather seats, video conferencing suite.' },
    { title: 'Podcast Studio & Audio Booth', price: 3500, unit: 'per hour', desc: 'Soundproofed acoustic booth with Shure SM7B mics and Rodecaster.' },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const totalDue = (selectedService.includes('Day Pass') ? 2000 : 2500) * (selectedService.includes('Day Pass') ? 1 : hours);

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="On-Demand Spaces"
        title="Reserve Workspace"
        detail="Book conference rooms or flexible desk passes across Nairobi with instant confirmation."
      />

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl text-navy font-light mb-4">Select Space</h2>
          <div className="divide-y divide-navy/10 border-t border-b border-navy/10">
            {spaces.map((s) => (
              <div
                key={s.title}
                onClick={() => { setSelectedService(s.title); setBooked(false); }}
                className={`py-4 cursor-pointer transition-colors ${
                  selectedService === s.title ? 'bg-navy/5 pl-3 border-l-2 border-navy' : 'hover:bg-navy/[0.02]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-navy">{s.title}</h3>
                  <span className="font-heading text-lg text-gold font-light">{formatMoney(s.price)}</span>
                </div>
                <p className="text-xs text-navy/60 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-navy font-light mb-4">Reservation Details</h2>
          {booked ? (
            <div className="py-6 border-l-2 border-emerald-600 pl-4 space-y-3">
              <h3 className="font-heading text-2xl text-navy">Reservation Confirmed</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Your space for <strong className="text-navy">{selectedService}</strong> in {selectedLocation} on {formatDate(date)} is locked in.
              </p>
              <p className="font-mono text-xs text-navy/50">Reference: PS-RES-881</p>
              <div className="pt-4 flex gap-4">
                <Link
                  href="/portal/client/passes"
                  className="bg-navy text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold"
                >
                  View Entry Pass &rarr;
                </Link>
                <button
                  type="button"
                  onClick={() => setBooked(false)}
                  className="text-xs text-navy/60 underline"
                >
                  Book Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-5 border-t border-navy/10 pt-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border-b border-navy/20 bg-transparent py-2 text-sm text-navy focus:border-navy focus:outline-none"
                >
                  <option>Westlands (Delta Corner)</option>
                  <option>Riverside Drive</option>
                  <option>Kilimani (Argwings Kodhek)</option>
                  <option>CBD (Kenyatta Avenue)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-2 text-sm text-navy focus:border-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1">
                    Duration (Hours)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full border-b border-navy/20 bg-transparent py-2 text-sm text-navy focus:border-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-navy/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase text-navy/50">Total Amount:</span>
                  <p className="font-heading text-2xl text-navy font-light">{formatMoney(totalDue)}</p>
                </div>
                <button
                  type="submit"
                  className="bg-navy text-white px-7 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-navy/90 transition-colors"
                >
                  Confirm & Pay (M-Pesa)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ClientPassesView() {
  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Reception Check-In"
        title="Active Entry Passes"
        detail="Present this pass upon arrival at reception for building access and WiFi authorization."
      />

      <div className="py-8 border-y border-navy/10 flex flex-wrap items-center justify-between gap-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Entry Pass</p>
          <h2 className="font-heading text-3xl text-navy mt-1">Delta Corner, Westlands</h2>
          <p className="text-xs text-navy/60 mt-2">Full-Day Access · 200Mbps High-Speed WiFi & Barista Coffee</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase text-navy/40">Pass Code</p>
            <p className="font-mono text-xl font-bold text-navy">PS-7742-KE</p>
          </div>
          <QrCode size={56} className="text-navy" />
        </div>
      </div>
    </div>
  );
}

export function ClientInvoicesView() {
  const invoices = [
    { id: 'INV-2026-081', desc: 'Boardroom Reservation (2 hrs)', date: '2026-08-24', amount: 5000 },
    { id: 'INV-2026-074', desc: '5-Day Flexible Desk Bundle', date: '2026-08-12', amount: 10000 },
  ];

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Billing History"
        title="Orders & Receipts"
        detail="Download tax invoices and official transaction receipts for business expense tracking."
      />

      <div className="divide-y divide-navy/10">
        {invoices.map((inv) => (
          <div key={inv.id} className="py-4 flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-mono text-navy/50">{inv.id}</span>
              <h3 className="font-semibold text-navy mt-0.5">{inv.desc}</h3>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-mono text-navy/40">{formatDate(inv.date)}</span>
              <span className="font-semibold text-navy">{formatMoney(inv.amount)}</span>
              <button
                type="button"
                onClick={() => alert(`Downloading Invoice ${inv.id}`)}
                className="border border-navy/20 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
              >
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortalProfileView({ type }: { type: PortalType }) {
  const { user, signOut } = usePortalAuth();
  const name = user?.user_metadata?.full_name || 'Paper Street User';
  const email = user?.email || 'user@paperstreet.africa';
  const phone = user?.user_metadata?.phone || '+254 700 000 000';

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Account Details"
        title="Identity & Profile"
        detail="The personal and entity credentials connected to your Paper Street workspace."
      />

      <div className="grid md:grid-cols-2 gap-12 py-6 border-b border-navy/10">
        <div className="space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Full Name</p>
            <p className="font-heading text-2xl text-navy mt-1">{name}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Email Address</p>
            <p className="text-sm text-navy mt-1">{email}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Phone Number</p>
            <p className="text-sm text-navy mt-1">{phone}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Account Classification</p>
            <p className="font-heading text-2xl text-navy mt-1 capitalize">
              {type === 'member' ? 'Corporate Member (Virtual Office)' : 'Client (On-Demand Spaces)'}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Authentication Service</p>
            <p className="text-sm text-emerald-800 font-semibold mt-1">Supabase Auth (Protected)</p>
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => signOut()}
              className="border border-navy/20 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProtectedPortalWrapper({ children, type }: { children: ReactNode; type: PortalType }) {
  const { user, loading } = usePortalAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(type === 'member' ? '/portal/member/login' : '/portal/client/login');
    }
  }, [loading, user, router, type]);

  if (loading) {
    return <div className="min-h-screen bg-[#FBF8F0] p-12 text-center text-navy/50">Loading session...</div>;
  }

  if (!user) {
    return null;
  }

  return <PortalShellLayout type={type}>{children}</PortalShellLayout>;
}
