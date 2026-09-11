import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  Download,
  FileText,
  FolderOpen,
  Headphones,
  Home,
  Landmark,
  LifeBuoy,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Plus,
  QrCode,
  Receipt,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserCheck,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Link, Redirect, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { supabase } from './lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

// ==========================================
// SUPABASE AUTH CONTEXT
// ==========================================
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: 'member' | 'client';
  setRole: (role: 'member' | 'client') => void;
  signOut: () => Promise<void>;
  signInWithDemo: (role: 'member' | 'client') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: 'member',
  setRole: () => { },
  signOut: async () => { },
  signInWithDemo: () => { },
});

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRoleState] = useState<'member' | 'client'>(() => {
    return (localStorage.getItem('ps_user_role') as 'member' | 'client') || 'member';
  });

  const setRole = (newRole: 'member' | 'client') => {
    setRoleState(newRole);
    localStorage.setItem('ps_user_role', newRole);
  };

  useEffect(() => {
    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.role) {
        setRole(session.user.user_metadata.role);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.role) {
        setRole(session.user.user_metadata.role);
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

  const signInWithDemo = (demoRole: 'member' | 'client') => {
    setRole(demoRole);
    const mockUser: User = {
      id: demoRole === 'member' ? 'mem_001_paperstreet' : 'cli_002_paperstreet',
      app_metadata: {},
      user_metadata: {
        full_name: demoRole === 'member' ? 'Alvine Otieno' : 'Wanjiku Mwangi',
        role: demoRole,
        company: demoRole === 'member' ? 'Pamela Steele Associates' : 'Horizon Tech Labs',
      },
      aud: 'authenticated',
      created_at: new Date(2025, 0, 15).toISOString(),
      email: demoRole === 'member' ? 'alvine@psa.africa' : 'wanjiku@horizonlabs.ke',
      phone: '+254 712 345 678',
    } as unknown as User;
    setUser(mockUser);
    setSession({ user: mockUser, access_token: 'demo-token' } as unknown as Session);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, role, setRole, signOut, signInWithDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// UTILITIES
// ==========================================
function formatDate(value?: string | null) {
  if (!value) return 'Not scheduled';
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

function StatusPill({ status }: { status: string }) {
  const isGood = status === 'active' || status === 'ready' || status === 'confirmed';
  const isPending = status === 'pending' || status === 'pending_payment';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono-app text-[10px] font-bold uppercase tracking-[0.14em] ${isGood
          ? 'bg-[#DCEBE0] text-[#35624C]'
          : isPending
            ? 'bg-[#F2E7C8] text-[#80652D]'
            : 'bg-[#F4E1DD] text-[#8D352E]'
        }`}
    >
      {isGood ? <CircleCheck size={12} /> : <Clock3 size={12} />}
      {status.replaceAll('_', ' ')}
    </span>
  );
}

function LogoLockup({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`focus-ring inline-flex items-center gap-3 ${light ? 'text-[#F3EDDF]' : 'text-foreground'}`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl font-serif-app text-lg font-bold ${light ? 'bg-accent text-primary' : 'bg-primary text-accent'
          }`}
      >
        P
      </span>
      <span>
        <span className="block font-serif-app text-[15px] leading-none tracking-[-0.03em]">Paper Street</span>
        <span
          className={`mt-1 block font-mono-app text-[8px] uppercase tracking-[0.22em] ${light ? 'text-[#BFC9D2]' : 'text-muted-foreground'
            }`}
        >
          Nairobi · Workspace
        </span>
      </span>
    </Link>
  );
}

function FullScreenMessage({
  eyebrow,
  title,
  detail,
  icon: Icon = CircleAlert,
  action,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  icon?: LucideIcon;
  action?: ReactNode;
}) {
  return (
    <main className="paper-grain flex min-h-[100dvh] items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md text-center animate-paper-rise">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-accent shadow-sm">
          <Icon size={24} strokeWidth={1.6} />
        </div>
        <p className="font-mono-app text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-3 font-serif-app text-3xl tracking-[-0.03em] text-foreground">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
        {action ? <div className="mt-7">{action}</div> : null}
      </div>
    </main>
  );
}

function LoadingScreen({ label = 'Preparing your workspace' }: { label?: string }) {
  return (
    <FullScreenMessage
      eyebrow="Paper Street / Secure portal"
      title={label}
      detail="Connecting your session with Supabase and bringing your workspace into focus."
      icon={Clock3}
    />
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'quiet';
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${variant === 'primary'
          ? 'bg-primary text-primary-foreground shadow-sm hover:bg-[#1B3658]'
          : 'border border-border bg-card/70 text-foreground hover:bg-secondary'
        } ${className}`}
    >
      {children}
    </Link>
  );
}

function PageIntro({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono-app text-[10px] uppercase tracking-[0.22em] text-[#96722C]">{eyebrow}</p>
      <h1 className="mt-3 font-serif-app text-4xl tracking-[-0.05em] sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{detail}</p>
    </div>
  );
}

// ==========================================
// AUTH PAGES (SUPABASE POWERED)
// ==========================================
function SignInPage() {
  const { user, signInWithDemo, role, setRole } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setLocation(role === 'client' ? '/client/dashboard' : '/dashboard');
    }
  }, [user, role, setLocation]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      if (data.user) {
        setLocation(role === 'client' ? '/client/dashboard' : '/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="paper-grain flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md animate-paper-rise">
        <div className="text-center mb-8">
          <LogoLockup />
          <h1 className="mt-6 font-serif-app text-3xl text-foreground">Welcome to Paper Street</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your member or client operating desk</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6 flex rounded-xl bg-secondary/80 p-1">
          <button
            type="button"
            onClick={() => setRole('member')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${role === 'member' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <UserCheck size={14} /> Member Account
          </button>
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${role === 'client' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Building2 size={14} /> Client Account
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-md sm:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-[#D7A19A] bg-[#F4E1DD] p-3.5 text-xs text-[#8D352E]">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'member' ? 'member@company.com' : 'client@company.com'}
                className="w-full rounded-xl border border-border bg-[#FBF8F0] px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-[#FBF8F0] px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-full bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-[#1B3658] transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating with Supabase...' : `Sign in to ${role === 'member' ? 'Member Portal' : 'Client Desk'}`}
            </button>
          </form>

          {/* Instant Demo Login Button */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-center text-xs text-muted-foreground mb-3">Quick evaluation mode:</p>
            <button
              type="button"
              onClick={() => signInWithDemo(role)}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-[#FBF5E5] py-2.5 text-xs font-semibold text-[#80652D] hover:bg-[#F4EACF] transition-colors"
            >
              <Sparkles size={14} className="text-gold" /> Instant 1-Click {role === 'member' ? 'Member' : 'Client'} Access
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/sign-up" className="text-xs text-muted-foreground hover:text-foreground font-medium">
              Don't have an account? <span className="text-primary font-semibold">Sign up with Supabase</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function SignUpPage() {
  const { user, role, setRole, signInWithDemo } = useAuth();
  const [, setLocation] = useLocation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setLocation(role === 'client' ? '/client/dashboard' : '/dashboard');
    }
  }, [user, role, setLocation]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });
      if (authError) throw authError;
      if (data.session) {
        setLocation(role === 'client' ? '/client/dashboard' : '/dashboard');
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="paper-grain flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md animate-paper-rise">
        <div className="text-center mb-8">
          <LogoLockup />
          <h1 className="mt-6 font-serif-app text-3xl text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Join Paper Street flexible workspace network in Kenya</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6 flex rounded-xl bg-secondary/80 p-1">
          <button
            type="button"
            onClick={() => setRole('member')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${role === 'member' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <UserCheck size={14} /> Member (Virtual/Cowork)
          </button>
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${role === 'client' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Building2 size={14} /> Client (Day Passes/Rooms)
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-md sm:p-8">
          {success ? (
            <div className="text-center py-6">
              <CircleCheck size={40} className="mx-auto text-[#35624C] mb-4" />
              <h2 className="font-serif-app text-2xl">Check your email</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-6">
                We've sent a verification link to <strong className="text-foreground">{email}</strong>. Once confirmed, you can sign in directly.
              </p>
              <ButtonLink href="/sign-in" className="mt-6 w-full">Back to Sign In</ButtonLink>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 rounded-xl border border-[#D7A19A] bg-[#F4E1DD] p-3.5 text-xs text-[#8D352E]">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alvine Otieno"
                    className="w-full rounded-xl border border-border bg-[#FBF8F0] px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-border bg-[#FBF8F0] px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    Create Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl border border-border bg-[#FBF8F0] px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-full bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-[#1B3658] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating Supabase Account...' : `Register ${role === 'member' ? 'Member' : 'Client'} Account`}
                </button>
              </form>

              <div className="mt-6 border-t border-border pt-6">
                <p className="text-center text-xs text-muted-foreground mb-3">Or try instant demo:</p>
                <button
                  type="button"
                  onClick={() => signInWithDemo(role)}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-[#FBF5E5] py-2.5 text-xs font-semibold text-[#80652D] hover:bg-[#F4EACF] transition-colors"
                >
                  <Sparkles size={14} className="text-gold" /> Instant 1-Click {role === 'member' ? 'Member' : 'Client'} Access
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link href="/sign-in" className="text-xs text-muted-foreground hover:text-foreground font-medium">
                  Already have an account? <span className="text-primary font-semibold">Sign in</span>
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
// SHELL LAYOUT (SHARED FOR MEMBERS & CLIENTS)
// ==========================================
const memberNavItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/membership', label: 'Membership', icon: Receipt },
  { href: '/documents', label: 'Documents', icon: FolderOpen },
  { href: '/support', label: 'Support', icon: LifeBuoy },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

const clientNavItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/client/dashboard', label: 'Client Desk', icon: Home },
  { href: '/client/bookings', label: 'Room & Desk Bookings', icon: CalendarDays },
  { href: '/client/passes', label: 'Day Passes & Access', icon: Ticket },
  { href: '/client/invoices', label: 'Orders & Receipts', icon: Receipt },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

function PortalShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut, role, setRole } = useAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Member';
  const navItems = role === 'client' ? clientNavItems : memberNavItems;

  const closeAndNavigate = () => setMobileOpen(false);
  const handleSignOut = () => {
    if (window.confirm('Sign out of your Paper Street portal?')) {
      void signOut();
      setLocation('/sign-in');
    }
  };

  const switchRole = (newRole: 'member' | 'client') => {
    setRole(newRole);
    setLocation(newRole === 'client' ? '/client/dashboard' : '/dashboard');
  };

  return (
    <div className="paper-grain min-h-[100dvh] bg-background">
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-sidebar px-5 py-6 text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between">
          <LogoLockup light />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="focus-ring rounded-lg p-2 text-[#BFC9D2] hover:bg-sidebar-accent lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Portal Mode Indicator */}
        <div className="mt-8 flex items-center justify-between rounded-xl bg-sidebar-accent/50 p-1.5 border border-sidebar-border">
          <button
            type="button"
            onClick={() => switchRole('member')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${role === 'member' ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' : 'text-[#91A0AF] hover:text-white'
              }`}
          >
            Member
          </button>
          <button
            type="button"
            onClick={() => switchRole('client')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${role === 'client' ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' : 'text-[#91A0AF] hover:text-white'
              }`}
          >
            Client
          </button>
        </div>

        <div className="mt-8">
          <p className="px-3 font-mono-app text-[9px] uppercase tracking-[0.22em] text-[#91A0AF]">
            {role === 'client' ? 'Client Workspace' : 'Member Workspace'}
          </p>
          <nav className="mt-3 space-y-1" aria-label="Portal navigation">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = location === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAndNavigate}
                  className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active
                      ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
                      : 'text-[#BFC9D2] hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground'
                    }`}
                >
                  <Icon size={17} strokeWidth={active ? 2 : 1.6} />
                  {label}
                  {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" /> : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto rounded-2xl border border-sidebar-border bg-sidebar-accent/60 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary font-serif-app text-sm text-sidebar-primary-foreground">
              {initials(name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">{name}</p>
              <p className="mt-0.5 truncate text-xs text-[#91A0AF]">
                {role === 'client' ? 'Client Access' : 'Verified Member'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="focus-ring mt-4 flex w-full items-center gap-2 rounded-lg px-1 py-1 text-xs text-[#BFC9D2] transition-colors hover:text-sidebar-accent-foreground"
          >
            <LogOut size={14} /> Sign out securely
          </button>
        </div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border/80 bg-background/90 px-5 backdrop-blur-md sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="focus-ring rounded-xl border border-border bg-card p-2.5 text-foreground lg:hidden"
          >
            <Menu size={19} />
          </button>
          <div className="hidden lg:block">
            <p className="font-mono-app text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Paper Street / Operating desk · Supabase
            </p>
            <p className="mt-1 text-sm font-semibold">
              {role === 'client' ? 'Client Operations' : 'Member Overview'}
            </p>
          </div>
          <Link
            href="/profile"
            className="focus-ring ml-auto flex items-center gap-3 rounded-full pl-2 pr-1.5 transition-colors hover:bg-secondary"
          >
            <span className="hidden text-right sm:block">
              <span className="block text-xs font-semibold">{name}</span>
              <span className="block text-[10px] text-muted-foreground">{user?.email}</span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8D7AC] font-serif-app text-sm font-bold text-primary">
              {initials(name)}
            </span>
          </Link>
        </header>
        <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">{children}</main>
      </div>
    </div>
  );
}

// ==========================================
// MEMBER DASHBOARD
// ==========================================
function MemberDashboard() {
  const { user } = useAuth();
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
    { id: 1, label: 'Official Mail Received', detail: 'KRA Registered Notice scanned and filed in Documents', date: '2026-08-20', kind: 'document' },
    { id: 2, label: 'Annual Subscription Renewal', detail: 'KES 45,000 processed via M-Pesa Till', date: '2026-08-15', kind: 'billing' },
    { id: 3, label: 'Boardroom Reservation', detail: '10-seater Executive Boardroom booked for 2 hours', date: '2026-08-10', kind: 'support' },
  ];

  return (
    <div className="animate-paper-rise space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-8 text-primary-foreground shadow-lg sm:px-9 sm:py-10">
        <div className="absolute -right-14 -top-20 h-64 w-64 rounded-full border-[34px] border-accent/20" />
        <div className="absolute bottom-[-100px] right-32 h-52 w-52 rounded-full border-[22px] border-accent/10" />
        <div className="relative max-w-2xl">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.22em] text-[#CFC4A5]">
            Paper Street Member Operating Desk
          </p>
          <h1 className="mt-4 font-serif-app text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
            Good day, {name}.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#C2CCD5]">
            Your virtual office address and workspace memberships in Westlands, Nairobi are active and fully operational.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/documents" className="bg-accent text-primary hover:bg-[#E2C889]">
              Review documents <ArrowUpRight size={15} />
            </ButtonLink>
            <ButtonLink
              href="/support"
              variant="quiet"
              className="border-sidebar-border bg-transparent text-primary-foreground hover:bg-sidebar-accent"
            >
              Contact concierge <ChevronRight size={15} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
        <MetricCard label="Current plan" value={memberPlan.plan} detail={<StatusPill status={memberPlan.status} />} icon={Landmark} tone="navy" />
        <MetricCard label="Next billing" value={formatDate(memberPlan.nextBillingDate)} detail={formatMoney(memberPlan.price)} icon={CalendarDays} />
        <MetricCard label="Documents ready" value="4 / 4" detail="All verified & active" icon={FileText} />
        <MetricCard label="Workspace" value="Westlands, Nairobi" detail="Delta Corner Tower A" icon={MapPin} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-2xl border border-card-border bg-card p-6 shadow-sm sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono-app text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Operating log</p>
              <h2 className="mt-2 font-serif-app text-2xl tracking-[-0.03em]">Recent activity</h2>
            </div>
            <Link href="/membership" className="focus-ring text-xs font-semibold text-[#80652D] hover:underline">
              View terms
            </Link>
          </div>
          <div className="mt-7 space-y-0">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#80652D]">
                  {activity.kind === 'billing' ? <Banknote size={16} /> : activity.kind === 'document' ? <FileText size={16} /> : <Headphones size={16} />}
                </div>
                <div className="min-w-0 flex-1 border-b border-border pb-5 last:border-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold">{activity.label}</p>
                    <time className="font-mono-app text-[10px] text-muted-foreground">{formatDate(activity.date)}</time>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{activity.detail}</p>
                </div>
                {index !== 0 ? <span className="absolute left-[17px] top-[-24px] h-[24px] w-px bg-border" /> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-card-border bg-[#EDE5D6] p-6 sm:p-7">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Member concierge</p>
          <h2 className="mt-2 font-serif-app text-2xl tracking-[-0.03em]">Quick Member Actions</h2>
          <div className="mt-6 space-y-3">
            <ActionRow href="/documents" icon={FolderOpen} title="Proof of Address Letter" detail="Download utility bills & lease agreement" />
            <ActionRow href="/support" icon={Headphones} title="Book Boardroom (Credit)" detail="4 hours included this month" />
            <ActionRow href="/profile" icon={ShieldCheck} title="Company Registration Details" detail="KRA PIN & CR12 linked" />
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'light',
}: {
  label: string;
  value: string;
  detail: ReactNode;
  icon: LucideIcon;
  tone?: 'light' | 'navy';
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${tone === 'navy' ? 'border-primary bg-primary text-primary-foreground' : 'border-card-border bg-card'
        }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={`font-mono-app text-[9px] uppercase tracking-[0.17em] ${tone === 'navy' ? 'text-[#C2CCD5]' : 'text-muted-foreground'}`}>
          {label}
        </p>
        <Icon size={17} className={tone === 'navy' ? 'text-accent' : 'text-[#96722C]'} />
      </div>
      <p className="mt-4 truncate font-serif-app text-[1.35rem] tracking-[-0.03em]">{value}</p>
      <div className={`mt-2 text-xs ${tone === 'navy' ? 'text-[#C2CCD5]' : 'text-muted-foreground'}`}>{detail}</div>
    </div>
  );
}

function ActionRow({ href, icon: Icon, title, detail }: { href: string; icon: LucideIcon; title: string; detail: string }) {
  return (
    <Link
      href={href}
      className="focus-ring group flex items-center gap-3 rounded-xl border border-border/80 bg-card/65 p-3 transition-transform hover:-translate-y-0.5 hover:bg-card"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8D7AC] text-primary">
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

// ==========================================
// CLIENT DASHBOARD (NEW!)
// ==========================================
function ClientDashboard() {
  const { user } = useAuth();
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

  const recentReceipts = [
    { id: 'RCP-892', item: 'Meeting Room (2 hrs)', date: '2026-08-24', amount: 5000, method: 'M-Pesa Express' },
    { id: 'RCP-851', item: '5-Day Flexible Desk Bundle', date: '2026-08-12', amount: 10000, method: 'Card (Visa)' },
  ];

  return (
    <div className="animate-paper-rise space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#143224] px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
        <div className="absolute -right-14 -top-20 h-64 w-64 rounded-full border-[34px] border-emerald-500/10" />
        <div className="relative max-w-2xl">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.22em] text-[#A3D9B5]">
            Paper Street On-Demand Client Hub
          </p>
          <h1 className="mt-4 font-serif-app text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
            Welcome, {name}.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#C2CCD5]">
            Book premium meeting rooms, reserve day desks, and access high-speed workspaces across Nairobi with zero lease commitment.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/client/bookings" className="bg-[#E8D7AC] text-primary hover:bg-[#D4C18F]">
              <Plus size={15} /> Book a Room or Desk
            </ButtonLink>
            <ButtonLink
              href="/client/passes"
              variant="quiet"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <QrCode size={15} /> View Entry Pass
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Passes" value="1 Day Pass" detail={<StatusPill status="ready" />} icon={Ticket} />
        <MetricCard label="Next Booking" value="Wed, Aug 26" detail="10:00 AM · Westlands" icon={CalendarDays} />
        <MetricCard label="Total Bookings" value="7 Sessions" detail="All receipts available" icon={Building2} />
        <MetricCard label="Access PIN" value="PS-8291" detail="Scan QR at reception" icon={QrCode} />
      </div>

      {/* Upcoming Bookings Table */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <section className="rounded-2xl border border-card-border bg-card p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono-app text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Upcoming reservations</p>
              <h2 className="mt-1 font-serif-app text-2xl">Scheduled Workspaces</h2>
            </div>
            <Link href="/client/bookings" className="text-xs font-semibold text-primary hover:underline">
              + New reservation
            </Link>
          </div>

          <div className="mt-6 divide-y divide-border">
            {upcomingBookings.map((b) => (
              <div key={b.id} className="py-4 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8D7AC] text-primary">
                    <Building2 size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{b.room}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.location} · {b.time}</p>
                    <p className="font-mono-app text-[10px] text-[#80652D] mt-1">{formatDate(b.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatMoney(b.amount)}</p>
                  <div className="mt-1"><StatusPill status={b.status} /></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instant M-Pesa Receipts */}
        <section className="rounded-2xl border border-card-border bg-card p-6 shadow-sm sm:p-7">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Financial receipts</p>
          <h2 className="mt-1 font-serif-app text-2xl">Recent Orders</h2>
          <div className="mt-6 space-y-4">
            {recentReceipts.map((r) => (
              <div key={r.id} className="rounded-xl border border-border/80 bg-secondary/40 p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">{r.item}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{r.method} · {formatDate(r.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold">{formatMoney(r.amount)}</p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Receipt ${r.id} for ${formatMoney(r.amount)} downloaded.`);
                    }}
                    className="inline-flex items-center gap-1 text-[10px] text-[#80652D] font-semibold hover:underline mt-1"
                  >
                    <Download size={11} /> Receipt
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/client/bookings"
            className="mt-6 block text-center rounded-full border border-border py-2.5 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            Explore Available Spaces
          </Link>
        </section>
      </div>
    </div>
  );
}

// Client Bookings Page
function ClientBookingsPage() {
  const [selectedLocation, setSelectedLocation] = useState('Westlands');
  const [selectedService, setSelectedService] = useState('Meeting Room (6 Pax)');
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

  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="On-demand booking"
        title="Reserve a Space"
        detail="Flexible workspaces across Nairobi bookable by the hour or day with immediate confirmation."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-4">
          <h2 className="font-serif-app text-2xl">Available Spaces</h2>
          <div className="grid gap-4">
            {spaces.map((space) => (
              <div
                key={space.title}
                onClick={() => { setSelectedService(space.title); setBooked(false); }}
                className={`cursor-pointer rounded-2xl border p-5 transition-all ${selectedService === space.title
                    ? 'border-primary bg-[#FBF8F0] shadow-md ring-1 ring-primary'
                    : 'border-card-border bg-card hover:bg-[#FAF7F2]'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground text-base">{space.title}</h3>
                  <p className="font-serif-app text-lg text-[#80652D]">
                    {formatMoney(space.price)} <span className="text-xs font-sans text-muted-foreground">{space.unit}</span>
                  </p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-5">{space.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-sm">
          {booked ? (
            <div className="text-center py-8">
              <CircleCheck size={44} className="mx-auto text-[#35624C] mb-4" />
              <h3 className="font-serif-app text-2xl">Reservation Confirmed!</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-5">
                Your booking for <strong className="text-foreground">{selectedService}</strong> on {formatDate(date)} in {selectedLocation} is recorded in Supabase.
              </p>
              <div className="mt-6 rounded-xl bg-secondary p-4 text-xs space-y-1">
                <p className="font-semibold">Check-in Reference: <span className="font-mono text-[#80652D]">PS-BOK-984</span></p>
                <p className="text-muted-foreground">Reception desk notified at Delta Corner, Westlands.</p>
              </div>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="mt-6 w-full rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
              >
                Book Another Space
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <h3 className="font-serif-app text-2xl">Complete Booking</h3>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FBF8F0] p-2.5 text-sm"
                >
                  <option>Westlands (Delta Corner)</option>
                  <option>Riverside Drive</option>
                  <option>Kilimani (Argwings Kodhek)</option>
                  <option>CBD (Kenyatta Avenue)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FBF8F0] p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Duration / Hours</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-[#FBF8F0] p-2.5 text-sm"
                />
              </div>
              <div className="border-t border-border pt-4 mt-6">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Total Due:</span>
                  <span className="font-serif-app text-xl text-[#80652D]">
                    {formatMoney((selectedService.includes('Day Pass') ? 2000 : 2500) * (selectedService.includes('Day Pass') ? 1 : hours))}
                  </span>
                </div>
                <button
                  type="submit"
                  className="mt-5 w-full rounded-full bg-primary py-3 text-xs font-semibold text-primary-foreground hover:bg-[#1B3658] transition-colors"
                >
                  Confirm & Pay via M-Pesa / Card
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Client Passes Page
function ClientPassesPage() {
  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="Access & Check-in"
        title="Day Passes & QR Codes"
        detail="Present this pass at the reception for instant entrance, WiFi credentials, and beverage credits."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground sm:p-9">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono-app text-[10px] uppercase tracking-widest text-accent">Active Entry Pass</p>
              <h2 className="mt-3 font-serif-app text-3xl">Delta Corner, Westlands</h2>
            </div>
            <QrCode size={40} className="text-accent" />
          </div>
          <div className="mt-8 border-t border-sidebar-border pt-6 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[#91A0AF]">Valid For</p>
              <p className="mt-1 font-semibold text-base">Full-Day Access</p>
            </div>
            <div>
              <p className="text-[#91A0AF]">Pass Code</p>
              <p className="mt-1 font-mono font-bold text-accent text-base">PS-7742-KE</p>
            </div>
          </div>
          <div className="mt-8 rounded-xl bg-sidebar-accent/70 p-4 text-xs flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>High-Speed 200Mbps WiFi & Barista Coffee active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Client Invoices Page
function ClientInvoicesPage() {
  const invoices = [
    { id: 'INV-2026-081', desc: 'Boardroom Reservation (2 hrs)', date: '2026-08-24', amount: 5000, status: 'paid' },
    { id: 'INV-2026-074', desc: '5-Day Flexible Desk Bundle', date: '2026-08-12', amount: 10000, status: 'paid' },
    { id: 'INV-2026-062', desc: 'Day Pass + Podcast Studio (1 hr)', date: '2026-07-29', amount: 5500, status: 'paid' },
  ];

  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="Billing trail"
        title="Orders & Tax Invoices"
        detail="All on-demand space reservations with KRA ETR-compliant receipts and instant payment references."
      />
      <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm">
        <div className="hidden grid-cols-[1.2fr_1.5fr_.8fr_.8fr_auto] gap-4 border-b border-border bg-secondary/60 px-6 py-4 font-mono-app text-[9px] uppercase tracking-[0.17em] text-muted-foreground sm:grid">
          <span>Invoice #</span>
          <span>Description</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Action</span>
        </div>
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="grid gap-2 border-b border-border p-5 last:border-0 sm:grid-cols-[1.2fr_1.5fr_.8fr_.8fr_auto] sm:items-center sm:px-6"
          >
            <div className="font-mono text-xs font-semibold text-primary">{inv.id}</div>
            <div className="text-sm font-medium">{inv.desc}</div>
            <div className="text-xs text-muted-foreground">{formatDate(inv.date)}</div>
            <div className="font-semibold text-sm">{formatMoney(inv.amount)}</div>
            <div>
              <button
                type="button"
                onClick={() => alert(`Downloading PDF Invoice ${inv.id}`)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
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

// ==========================================
// REMAINING MEMBER SUB-PAGES
// ==========================================
function Membership() {
  const data = {
    plan: 'Professional Virtual Office',
    location: 'Delta Corner, Westlands, Nairobi',
    status: 'active',
    billingCycle: 'annual',
    annualPrice: 45000,
    monthlyPrice: 4500,
    depositAmount: 10000,
    nextBillingDate: '2026-11-15',
    renewalDate: '2026-11-15',
    lastPaymentDate: '2025-11-15',
    includedServices: [
      'Prestigious Nairobi Business Address (Delta Corner)',
      'Official Mail Handling & Notification',
      'Daily Mail Forwarding to Email (PDF Scans)',
      '4 Hours Boardroom / Meeting Space per month',
      'Proof of Address Utility Documents for KRA & Banking',
      'Front Desk Concierge & Call Reception in Your Name',
    ],
  };

  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="Member account / 01"
        title="Membership"
        detail="A clear view of the services, dates, and terms that keep your Paper Street presence running."
      />
      <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground shadow-lg sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-[#C2CCD5]">Your plan</p>
              <h2 className="mt-3 font-serif-app text-4xl tracking-[-0.05em]">{data.plan}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#C2CCD5]">
                <MapPin size={14} /> {data.location}
              </p>
            </div>
            <StatusPill status={data.status} />
          </div>
          <div className="mt-10 grid gap-6 border-t border-sidebar-border pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs text-[#91A0AF]">Billing cycle</p>
              <p className="mt-1 font-semibold capitalize">{data.billingCycle}</p>
            </div>
            <div>
              <p className="text-xs text-[#91A0AF]">Recurring amount</p>
              <p className="mt-1 font-semibold">
                {formatMoney(data.annualPrice)} <span className="text-xs font-normal text-[#91A0AF]">/year</span>
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-sm sm:p-9">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Important dates</p>
          <div className="mt-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-[#80652D]">
                <CalendarDays size={16} />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Next billing date</p>
                <p className="mt-1 text-sm font-semibold">{formatDate(data.nextBillingDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-[#80652D]">
                <Receipt size={16} />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Renewal date</p>
                <p className="mt-1 text-sm font-semibold">{formatDate(data.renewalDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-[#80652D]">
                <Check size={16} />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Last payment received</p>
                <p className="mt-1 text-sm font-semibold">{formatDate(data.lastPaymentDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-2xl border border-card-border bg-card p-7 shadow-sm">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Financial notes</p>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">Security deposit held</p>
              <p className="mt-1 font-serif-app text-2xl">{formatMoney(data.depositAmount)}</p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-xs leading-5 text-muted-foreground">
                Deposit is refundable upon formal termination of lease notice.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-card-border bg-card p-7 shadow-sm">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Included in your desk</p>
          <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {data.includedServices.map((service, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCEBE0] text-[#35624C]">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Documents() {
  const documents = [
    { id: 1, name: 'Paper Street Virtual Office Lease Agreement', category: 'Legal', status: 'ready', description: 'Fully executed annual agreement with building management.', updatedDate: '2026-08-15', downloadUrl: '#' },
    { id: 2, name: 'Proof of Address Letter (KRA & Bank verified)', category: 'Compliance', status: 'ready', description: 'Official certified utility bill and landlord consent letter.', updatedDate: '2026-08-15', downloadUrl: '#' },
    { id: 3, name: 'August 2026 Scanned Post & Mail Receipt', category: 'Mail', status: 'ready', description: '3 parcels collected and signed by reception.', updatedDate: '2026-08-20', downloadUrl: '#' },
    { id: 4, name: 'Annual Membership Tax Invoice & ETR', category: 'Billing', status: 'ready', description: 'M-Pesa Till payment receipt with VAT breakdown.', updatedDate: '2025-11-15', downloadUrl: '#' },
  ];

  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="Member account / 02"
        title="Documents"
        detail="Your legal agreements, compliance letters, and scanned mail records stored safely."
      />
      <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm">
        <div className="hidden grid-cols-[1.5fr_.7fr_.7fr_auto] gap-4 border-b border-border bg-secondary/60 px-6 py-4 font-mono-app text-[9px] uppercase tracking-[0.17em] text-muted-foreground sm:grid">
          <span>Document</span>
          <span>Category</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="grid gap-4 border-b border-border px-5 py-5 last:border-0 sm:grid-cols-[1.5fr_.7fr_.7fr_auto] sm:items-center sm:gap-4 sm:px-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8D7AC] text-primary">
                <FileText size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">{doc.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{doc.description}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{doc.category}</div>
            <div>
              <StatusPill status={doc.status} />
            </div>
            <div>
              <button
                type="button"
                onClick={() => alert(`Downloading ${doc.name}`)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Support() {
  const requests = [
    { icon: Mail, title: 'Mail Forwarding Request', detail: 'Request physical dispatch via courier to your home or office.', subject: 'Mail Forwarding' },
    { icon: Building2, title: 'Meeting Room Reservation', detail: 'Book the 6-person or 12-person boardroom in Delta Corner.', subject: 'Room Booking' },
    { icon: Banknote, title: 'Billing & Invoicing Query', detail: 'Request custom invoice, change billing contact or update details.', subject: 'Billing' },
  ];

  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="Paper Street / Member care"
        title="Support & Concierge"
        detail="A dedicated workspace concierge team in Westlands to assist you at all times."
      />
      <section className="grid gap-4 lg:grid-cols-3">
        {requests.map(({ icon: Icon, title, detail, subject }) => (
          <a
            key={title}
            href={`mailto:hello@paperstreet.co.ke?subject=${encodeURIComponent(subject)}`}
            className="group rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8D7AC] text-primary">
              <Icon size={20} />
            </span>
            <h2 className="mt-7 font-serif-app text-xl text-foreground">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            <span className="mt-6 block text-xs font-semibold text-[#80652D]">Email the team &rarr;</span>
          </a>
        ))}
      </section>
      <section className="grid gap-6 rounded-[1.5rem] bg-primary p-7 text-primary-foreground sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-[#C2CCD5]">Direct desk line</p>
          <h2 className="mt-3 font-serif-app text-3xl">Reception is open.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#C2CCD5]">
            Call during business hours (Mon-Fri, 8:30 AM - 5:30 PM EAT) for immediate help.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <a
            href="tel:0110486677"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-primary hover:bg-[#E2C889]"
          >
            <Headphones size={16} /> 0110486677
          </a>
        </div>
      </section>
    </div>
  );
}

function Profile() {
  const { user, signOut, role } = useAuth();
  const name = user?.user_metadata?.full_name || 'Paper Street Member';
  const email = user?.email || 'member@paperstreet.co.ke';

  return (
    <div className="animate-paper-rise space-y-8">
      <PageIntro
        eyebrow="Account Settings"
        title="Profile & Identity"
        detail="The contact details and company identity tied to your Paper Street workspace."
      />
      <section className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground sm:p-9">
          <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-accent font-serif-app text-3xl font-bold text-primary">
            {initials(name)}
          </span>
          <h2 className="mt-7 font-serif-app text-3xl">{name}</h2>
          <p className="mt-2 break-all text-sm text-[#C2CCD5]">{email}</p>
          <div className="mt-8 border-t border-sidebar-border pt-5">
            <p className="font-mono-app text-[9px] uppercase tracking-[0.16em] text-[#91A0AF]">Account type</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#76B38A]" />
              {role === 'client' ? 'Registered Client' : 'Verified Member'}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-sm sm:p-9">
          <h2 className="font-serif-app text-2xl">Identity details</h2>
          <div className="mt-6 grid gap-x-6 gap-y-6 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="mt-1 font-semibold">{name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="mt-1 font-semibold">{email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="mt-1 font-semibold">Nairobi, Kenya</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Authentication Provider</p>
              <p className="mt-1 font-semibold text-emerald-700">Supabase Auth (Active)</p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 flex gap-3">
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold hover:bg-secondary"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Protected Route wrapper
function Authenticated({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Redirect to="/sign-in" />;
  return <PortalShell>{children}</PortalShell>;
}

// Main App Router
export default function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <WouterRouter base={basePath}>
              <Switch>
                <Route path="/sign-in" component={SignInPage} />
                <Route path="/sign-up" component={SignUpPage} />

                {/* Member Portal Routes */}
                <Route path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <Route path="/dashboard">
                  <Authenticated><MemberDashboard /></Authenticated>
                </Route>
                <Route path="/membership">
                  <Authenticated><Membership /></Authenticated>
                </Route>
                <Route path="/documents">
                  <Authenticated><Documents /></Authenticated>
                </Route>
                <Route path="/support">
                  <Authenticated><Support /></Authenticated>
                </Route>

                {/* Client Portal Routes */}
                <Route path="/client/dashboard">
                  <Authenticated><ClientDashboard /></Authenticated>
                </Route>
                <Route path="/client/bookings">
                  <Authenticated><ClientBookingsPage /></Authenticated>
                </Route>
                <Route path="/client/passes">
                  <Authenticated><ClientPassesPage /></Authenticated>
                </Route>
                <Route path="/client/invoices">
                  <Authenticated><ClientInvoicesPage /></Authenticated>
                </Route>

                {/* Shared Profile */}
                <Route path="/profile">
                  <Authenticated><Profile /></Authenticated>
                </Route>

                {/* Catch All */}
                <Route>
                  <FullScreenMessage
                    eyebrow="404 / Paper Street"
                    title="Page not found"
                    detail="This page does not exist in the portal."
                    action={<ButtonLink href="/dashboard">Return to Dashboard</ButtonLink>}
                  />
                </Route>
              </Switch>
            </WouterRouter>
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ErrorBoundary>
  );
}