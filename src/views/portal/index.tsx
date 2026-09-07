'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  Clock,
  Copy,
  CreditCard,
  Download,
  FolderOpen,
  Gift,
  Home,
  LifeBuoy,
  LogOut,
  MapPin,
  Menu,
  MessageSquarePlus,
  Package,
  Percent,
  QrCode,
  Receipt,
  Share2,
  Sparkles,
  Tag,
  Ticket,
  UserRound,
  Wifi,
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
import { sendEmailNotification } from '@/lib/emailClient';
import IndividualBookingPage, { type ServiceSlug } from '@/views/individual-booking';
import type { User, Session } from '@supabase/supabase-js';

// ==========================================
// TYPES
// ==========================================
export type PortalType = 'member' | 'client';

export interface WorkspacePackage {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  price_kes: number;
  period_unit: string;
  description: string;
  location_options?: string[];
  features: string[];
  is_popular?: boolean;
  badge?: string;
  capacity?: string;
}

export interface ClientBooking {
  id: number | string;
  user_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  service_title: string;
  location: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_amount_kes: number;
  status: string;
  payment_status: string;
  payment_method: string;
  mpesa_reference?: string;
  created_at: string;
}

export interface ClientPass {
  id: number | string;
  user_id: string;
  pass_code: string;
  service_title: string;
  location: string;
  valid_date: string;
  status: string;
  wifi_network: string;
  wifi_password: string;
  created_at: string;
}

export interface ClientFeedback {
  id: number | string;
  user_id: string;
  client_name: string;
  client_email: string;
  category: string;
  priority: string;
  subject: string;
  message: string;
  location?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export interface ClientInvoice {
  id: number | string;
  user_id: string;
  invoice_number: string;
  description: string;
  amount_kes: number;
  payment_method: string;
  status: string;
  created_at: string;
}

// Fallback seed packages in case DB table is populating
const FALLBACK_PACKAGES: WorkspacePackage[] = [
  {
    id: 1,
    name: 'Hot Desk & Day Passes',
    slug: 'hot-desk',
    category: 'Day Pass',
    price_kes: 1500,
    period_unit: 'day',
    description: 'Walk in, plug in, and work with zero friction. Air-conditioned open workspaces, high-speed fibre Wi-Fi, 100% generator backup, and quiet phone booths.',
    location_options: ['Kisumu CBD Flagship', 'Nairobi Westlands Hub'],
    features: [
      'Half-Day Pass (4 Hours): KES 1,000',
      'Full-Day Pass (8 AM - 6 PM): KES 1,500',
      '5-Day Weekly Flexi Pass: KES 6,500',
      'Monthly Flex Pass (10 Days): KES 14,000',
      'High-speed redundant fibre-optic Wi-Fi',
      'Automatic 100% standby generator power backup',
      'Quiet phone booth access for private calls',
      'Complimentary artisan tea and filtered water',
    ],
    is_popular: true,
    badge: 'Flexible Coworking',
    capacity: '1 Person',
  },
  {
    id: 2,
    name: 'Meeting & Boardrooms',
    slug: 'meeting-rooms',
    category: 'Meeting Room',
    price_kes: 2000,
    period_unit: 'hour',
    description: 'Private executive boardroom with 4K UHD presentation screen, wireless screen casting, conference speakerphone, and reception concierge.',
    location_options: ['Kisumu CBD Flagship', 'Nairobi Westlands Hub'],
    features: [
      'Hourly Reservation: KES 2,000 / hr',
      'Half-Day Block (4 Hours): KES 7,000 (Save KES 1,000)',
      'Full-Day Block (8 Hours): KES 12,000 (Save KES 4,000)',
      '6 to 12 executive ergonomic boardroom chairs',
      '4K presentation display with HDMI, USB-C & AirPlay casting',
      'Omnidirectional conference audio speakerphone & HD camera',
      'Magnetic whiteboard, dry-erase markers & flipchart',
      'Front-desk receptionist client greeting & assistance',
    ],
    is_popular: true,
    badge: 'On-Demand Boardroom',
    capacity: '6–12 Persons',
  },
];

// ==========================================
// SKELETON LOADERS (EDITORIAL SWISS PAPER AESTHETIC)
// ==========================================
export function SkeletonBox({ className = '' }: { className?: string }) {
  return <div className={`bg-navy/10 animate-pulse rounded-none ${className}`} />;
}

export function DashboardMetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-navy/10">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2.5">
          <SkeletonBox className="h-2.5 w-20" />
          <SkeletonBox className="h-8 w-16" />
          <SkeletonBox className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function ActivePassSkeleton() {
  return (
    <div className="p-8 border border-navy/15 bg-navy/5 flex flex-wrap items-center justify-between gap-6">
      <div className="space-y-3 max-w-md w-full">
        <SkeletonBox className="h-2.5 w-36" />
        <SkeletonBox className="h-8 w-3/4" />
        <SkeletonBox className="h-3.5 w-1/2" />
        <SkeletonBox className="h-5 w-2/3" />
      </div>
      <div className="flex items-center gap-6">
        <div className="space-y-2 text-right">
          <SkeletonBox className="h-2.5 w-24 ml-auto" />
          <SkeletonBox className="h-7 w-32 ml-auto" />
        </div>
        <SkeletonBox className="w-14 h-14" />
      </div>
    </div>
  );
}

export function PackagesGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-10 pt-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border-b border-navy/15 pb-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <SkeletonBox className="h-2.5 w-28" />
              <SkeletonBox className="h-2.5 w-16" />
            </div>
            <SkeletonBox className="h-8 w-3/4" />
            <SkeletonBox className="h-3.5 w-full" />
            <SkeletonBox className="h-3.5 w-4/5" />
            <div className="pt-4 border-t border-navy/10 space-y-2">
              <SkeletonBox className="h-8 w-44" />
              <SkeletonBox className="h-2.5 w-32" />
            </div>
            <div className="space-y-2 pt-2">
              <SkeletonBox className="h-3 w-full" />
              <SkeletonBox className="h-3 w-5/6" />
              <SkeletonBox className="h-3 w-4/5" />
            </div>
          </div>
          <SkeletonBox className="h-11 w-full" />
        </div>
      ))}
    </div>
  );
}

export function BookingsListSkeleton() {
  return (
    <div className="divide-y divide-navy/10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-60" />
            <SkeletonBox className="h-3 w-44" />
            <SkeletonBox className="h-2.5 w-28" />
          </div>
          <div className="space-y-2 text-right">
            <SkeletonBox className="h-5 w-24 ml-auto" />
            <SkeletonBox className="h-4 w-16 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PassesListSkeleton() {
  return (
    <div className="divide-y divide-navy/15">
      {[1, 2].map((i) => (
        <div key={i} className="py-8 flex flex-wrap items-center justify-between gap-8 first:pt-0">
          <div className="max-w-md w-full space-y-3">
            <SkeletonBox className="h-2.5 w-28" />
            <SkeletonBox className="h-8 w-4/5" />
            <SkeletonBox className="h-3.5 w-1/2" />
            <SkeletonBox className="h-12 w-full" />
          </div>
          <div className="flex items-center gap-8">
            <div className="space-y-2 text-right">
              <SkeletonBox className="h-2.5 w-24 ml-auto" />
              <SkeletonBox className="h-7 w-32 ml-auto" />
              <SkeletonBox className="h-3 w-28 ml-auto" />
            </div>
            <SkeletonBox className="w-16 h-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeedbackListSkeleton() {
  return (
    <div className="divide-y divide-navy/10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="py-5 space-y-2.5 first:pt-0">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-3 w-20" />
            <SkeletonBox className="h-3 w-16" />
          </div>
          <SkeletonBox className="h-4 w-4/5" />
          <SkeletonBox className="h-3 w-full" />
          <SkeletonBox className="h-2.5 w-28" />
        </div>
      ))}
    </div>
  );
}

export function ReferralsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-navy/10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2.5">
            <SkeletonBox className="h-2.5 w-28" />
            <SkeletonBox className="h-9 w-32" />
            <SkeletonBox className="h-3 w-40" />
          </div>
        ))}
      </div>
      <SkeletonBox className="h-28 w-full" />
      <div className="grid md:grid-cols-12 gap-12 pt-4">
        <div className="md:col-span-6 space-y-4">
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-10 w-full" />
          <SkeletonBox className="h-11 w-full" />
        </div>
        <div className="md:col-span-6 space-y-4">
          <SkeletonBox className="h-6 w-40" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-3 flex justify-between">
                <SkeletonBox className="h-4 w-48" />
                <SkeletonBox className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OffersSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 pt-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border-b border-navy/15 pb-8 space-y-5">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-4 w-20" />
          </div>
          <SkeletonBox className="h-7 w-3/4" />
          <SkeletonBox className="h-3.5 w-full" />
          <SkeletonBox className="h-3.5 w-5/6" />
          <SkeletonBox className="h-14 w-full" />
          <SkeletonBox className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export function InvoicesSkeleton() {
  return (
    <div className="divide-y divide-navy/10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-48" />
            <SkeletonBox className="h-3 w-64" />
            <SkeletonBox className="h-2.5 w-28" />
          </div>
          <div className="space-y-2 text-right">
            <SkeletonBox className="h-5 w-28 ml-auto" />
            <SkeletonBox className="h-7 w-20 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// PORTAL AUTH & CONTEXT
// ==========================================
export interface ClientUserData {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  company?: string;
  portalType: PortalType;
  referralCode?: string;
  discountBalanceKES?: number;
}

interface AuthContextType {
  user: User | null;
  clientUser: ClientUserData | null;
  session: Session | null;
  loading: boolean;
  portalType: PortalType;
  setPortalType: (type: PortalType) => void;
  signOut: () => Promise<void>;
  signInWithDemo: (type: PortalType) => void;
  loginWithOtpUser: (userData: ClientUserData, token?: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  clientUser: null,
  session: null,
  loading: true,
  portalType: 'client',
  setPortalType: () => {},
  signOut: async () => {},
  signInWithDemo: () => {},
  loginWithOtpUser: () => {},
});

export const usePortalAuth = () => useContext(AuthContext);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [clientUser, setClientUser] = useState<ClientUserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalType, setPortalTypeState] = useState<PortalType>(() => {
    if (typeof window === 'undefined') return 'client';
    return (localStorage.getItem('ps_portal_type') as PortalType) || 'client';
  });

  const setPortalType = (type: PortalType) => {
    setPortalTypeState(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ps_portal_type', type);
    }
  };

  useEffect(() => {
    // 1. Check clientUser from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedClient = localStorage.getItem('ps_client_user');
        if (savedClient) {
          const parsed = JSON.parse(savedClient) as ClientUserData;
          setClientUser(parsed);
          const mockAuthUser: User = {
            id: parsed.id,
            email: parsed.email,
            user_metadata: {
              full_name: parsed.fullName,
              phone: parsed.phone,
              company: parsed.company,
              portal_type: parsed.portalType || 'client',
              referral_code: parsed.referralCode,
              discount_balance_kes: parsed.discountBalanceKES || 0,
            },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as unknown as User;
          setUser(mockAuthUser);
          setSession({ user: mockAuthUser, access_token: 'ps-otp-token' } as unknown as Session);
        }
      } catch (e) {
        console.warn('Error reading saved client user:', e);
      }
    }

    // 2. Check Supabase auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        if (session.user.user_metadata?.portal_type) {
          setPortalType(session.user.user_metadata.portal_type);
        }
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        if (session.user.user_metadata?.portal_type) {
          setPortalType(session.user.user_metadata.portal_type);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithOtpUser = (userData: ClientUserData, token?: string) => {
    setClientUser(userData);
    setPortalType(userData.portalType || 'client');
    const mockUser: User = {
      id: userData.id,
      email: userData.email,
      user_metadata: {
        full_name: userData.fullName,
        phone: userData.phone,
        company: userData.company,
        portal_type: userData.portalType || 'client',
        referral_code: userData.referralCode,
        discount_balance_kes: userData.discountBalanceKES || 0,
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    setUser(mockUser);
    setSession({ user: mockUser, access_token: token || 'ps-otp-token' } as unknown as Session);

    if (typeof window !== 'undefined') {
      localStorage.setItem('ps_client_user', JSON.stringify(userData));
      localStorage.setItem('ps_portal_type', userData.portalType || 'client');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setClientUser(null);
    setSession(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ps_client_user');
      localStorage.removeItem('ps_portal_type');
    }
  };

  const signInWithDemo = (type: PortalType) => {
    setPortalType(type);
    const demoData: ClientUserData = {
      id: type === 'member' ? 'mem_001' : 'cli_demo_001',
      fullName: 'Alvine Otieno',
      email: type === 'member' ? 'alvine@psa.africa' : 'otienoalvine925@gmail.com',
      phone: '+254 700 000 000',
      company: type === 'member' ? 'Pamela Steele Associates' : 'Paper Street Client Hub',
      portalType: type,
      referralCode: 'PS-ALVI8291',
      discountBalanceKES: 1000,
    };
    loginWithOtpUser(demoData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        clientUser,
        session,
        loading,
        portalType,
        setPortalType,
        signOut,
        signInWithDemo,
        loginWithOtpUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// HELPERS
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
  const isGood = status === 'active' || status === 'ready' || status === 'confirmed' || status === 'paid' || status === 'resolved';
  const isPending = status === 'pending' || status === 'open' || status === 'under_review';
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
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">{eyebrow}</p>
      <h1 className="mt-2 font-heading text-4xl md:text-5xl font-light text-navy tracking-tight">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-navy/65">{detail}</p>
    </div>
  );
}

// ==========================================
// 1. MEMBER LOGIN (MEMBERS ONLY)
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
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
            Member Access
          </span>
          <h1 className="mt-2 font-heading text-4xl font-light text-navy">Member Sign In</h1>
          <p className="mt-2 text-xs text-navy/60 leading-relaxed">
            Paper Street members manage registered office addresses, mail logging, legal documents, and boardroom credits here.
          </p>
        </div>

        <div className="border-t border-navy/15 pt-8">
          <div className="mb-6 p-4 bg-navy/5 border-l-2 border-navy text-xs text-navy/75 leading-relaxed">
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
            <Link href="/portal/client/login" className="text-navy font-semibold underline hover:text-navy-600">
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
// 2. CLIENT AUTH (LOGIN: EMAIL+PASSWORD, REGISTER: DETAILS+PASSWORD+OTP)
// ==========================================
export function ClientLoginPage() {
  const { user, loginWithOtpUser, signInWithDemo, setPortalType } = usePortalAuth();
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
      setError(emailCheck.error || 'Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your account password');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = sanitizeInput(email, 120).toLowerCase();

      // 1. Supabase standard Email + Password Authentication
      const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authErr) {
        throw new Error(authErr.message || 'Invalid email or password. Please verify your credentials.');
      }

      // 2. Fetch profile from client_profiles or auth metadata
      let clientProfile: ClientUserData | null = null;
      try {
        const { data: profile } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('email', cleanEmail)
          .single();

        if (profile) {
          clientProfile = {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            phone: profile.phone || '',
            company: profile.company || '',
            portalType: 'client',
            referralCode: profile.referral_code || `PS-${cleanEmail.slice(0, 4).toUpperCase()}`,
            discountBalanceKES: profile.discount_balance_kes || 0,
          };
        }
      } catch (err) {
        console.warn('Profile fetch notice:', err);
      }

      if (!clientProfile && authData.user) {
        clientProfile = {
          id: authData.user.id,
          email: authData.user.email || cleanEmail,
          fullName: authData.user.user_metadata?.full_name || cleanEmail.split('@')[0],
          phone: authData.user.user_metadata?.phone || '',
          company: authData.user.user_metadata?.company || '',
          portalType: 'client',
          referralCode: authData.user.user_metadata?.referral_code || `PS-${cleanEmail.slice(0, 4).toUpperCase()}`,
          discountBalanceKES: 0,
        };
      }

      if (clientProfile) {
        loginWithOtpUser(clientProfile, authData.session?.access_token);
      }

      router.push('/portal/client/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your email and password.');
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
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
            Client Portal
          </span>
          <h1 className="mt-2 font-heading text-4xl font-light text-navy">Client Sign In</h1>
          <p className="mt-2 text-xs text-navy/60 leading-relaxed">
            Enter your registered email and password to access on-demand bookings, passes, and account receipts.
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-navy/70">
                  Password
                </label>
              </div>
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
                {loading ? 'Authenticating...' : 'Sign In to Client Desk \u2192'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-between text-xs">
            <span className="text-navy/60">New to Paper Street?</span>
            <Link href="/portal/client/register" className="text-navy font-semibold underline hover:text-navy-600">
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
  const { user, loginWithOtpUser, setPortalType } = usePortalAuth();
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    setPortalType('client');
    if (user) {
      router.push('/portal/client/dashboard');
    }
  }, [user, router, setPortalType]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    const nameCheck = validateName(fullName);
    if (!nameCheck.valid) {
      setError(nameCheck.error || 'Please enter your full name');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error || 'Please enter a valid email address');
      return;
    }

    if (phone) {
      const phoneCheck = validatePhone(phone);
      if (!phoneCheck.valid) {
        setError(phoneCheck.error || 'Please check your phone number');
        return;
      }
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      setError(passCheck.error || 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || null,
          company: company.trim() || null,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to dispatch verification code');
      }

      setStep('otp');
      setCountdown(60);
      setCanResend(false);
      setInfoMessage(`We have dispatched a 6-digit verification code to ${email}.`);
    } catch (err: any) {
      setError(err?.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otp || otp.trim().length < 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();

      // 1. Verify OTP code & dispatch Welcome Email via Brevo
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          otp: otp.trim(),
          password,
          name: fullName.trim(),
          phone: phone.trim() || null,
          company: company.trim() || null,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Invalid or expired code');
      }

      // 2. Register account in Supabase Auth with email & password
      try {
        const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim() || null,
              company: company.trim() || null,
              portal_type: 'client',
              referral_code: data.user?.referralCode,
            },
          },
        });
        if (signUpErr && !signUpErr.message.includes('already registered')) {
          console.warn('Supabase auth sign up notice:', signUpErr);
        }
      } catch (authErr) {
        console.warn('Supabase auth sign up catch:', authErr);
      }

      loginWithOtpUser(data.user, data.token);
      router.push('/portal/client/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Verification error. Please retry.');
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
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
            On-Demand Client Portal
          </span>
          <h1 className="mt-2 font-heading text-4xl font-light text-navy">
            {step === 'details' ? 'Create Client Account' : 'Verify Email'}
          </h1>
          <p className="mt-2 text-xs text-navy/60 leading-relaxed">
            {step === 'details'
              ? 'Register with your credentials and password to book spaces, track history, and claim member perks.'
              : `Enter the 6-digit one-time passcode sent to ${email} to activate your account.`}
          </p>
        </div>

        <div className="border-t border-navy/15 pt-8">
          {error && (
            <div className="mb-6 p-3.5 border-l-2 border-rose-600 bg-rose-50 text-xs text-rose-800">
              {error}
            </div>
          )}

          {infoMessage && (
            <div className="mb-6 p-3.5 border-l-2 border-emerald-600 bg-emerald-50 text-xs text-emerald-900">
              {infoMessage}
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
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
                  Telephone (M-Pesa / SMS Receipts)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 700 000 000"
                  className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                  Company / Organization (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Victoria Consulting"
                  className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
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

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending Verification Code...' : 'Continue & Verify Email \u2192'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                  Enter 6-Digit Email Passcode
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123456"
                  className="w-full border-b-2 border-navy text-center font-mono text-3xl tracking-[0.5em] text-navy py-3 bg-transparent focus:outline-none"
                />
                <p className="text-[11px] text-navy/50 mt-2 text-center">
                  Verification email dispatched via Brevo. Code valid for 10 minutes.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying & Setting Up Account...' : 'Complete Registration & Access Portal \u2192'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-navy/60 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('details');
                    setOtp('');
                  }}
                  className="underline hover:text-navy"
                >
                  &larr; Edit Details
                </button>
                <button
                  type="button"
                  disabled={!canResend || loading}
                  onClick={handleSendOtp}
                  className="underline hover:text-navy disabled:opacity-40"
                >
                  {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-between text-xs">
            <span className="text-navy/60">Already have an account?</span>
            <Link href="/portal/client/login" className="text-navy font-semibold underline hover:text-navy-600">
              Sign In &rarr;
            </Link>
          </div>
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
  { href: '/portal/client/packages', label: 'Workspace Packages', icon: Package },
  { href: '/portal/client/bookings', label: 'Bookings & Schedule', icon: Calendar },
  { href: '/portal/client/passes', label: 'Entry Passes & QR', icon: Ticket },
  { href: '/portal/client/feedback', label: 'Complaints & Concerns', icon: MessageSquarePlus },
  { href: '/portal/client/referrals', label: 'Refer & Earn (KES 500)', icon: Gift },
  { href: '/portal/client/offers', label: 'Exclusive Offers & Perks', icon: Sparkles },
  { href: '/portal/client/invoices', label: 'Orders & Receipts', icon: Receipt },
  { href: '/portal/client/profile', label: 'Profile Settings', icon: UserRound },
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
              Paper Street Workspaces · Nairobi, Kenya · Supabase Realtime
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
// 4. MEMBER DASHBOARD VIEWS (Preserved)
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">Mail Dispatch</p>
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">Meeting Space</p>
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">Direct Desk</p>
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
// 5. CLIENT DASHBOARD OVERVIEW VIEW
// ==========================================
export function ClientDashboardView() {
  const { user } = usePortalAuth();
  const name = user?.user_metadata?.full_name || 'Client';
  const [bookings, setBookings] = useState<ClientBooking[]>([]);
  const [passes, setPasses] = useState<ClientPass[]>([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: bData } = await supabase
          .from('client_bookings')
          .select('*')
          .order('booking_date', { ascending: true });

        const { data: pData } = await supabase
          .from('client_passes')
          .select('*')
          .eq('status', 'active');

        const { count } = await supabase
          .from('client_feedback')
          .select('*', { count: 'exact', head: true });

        if (bData && bData.length > 0) {
          setBookings(bData);
        } else {
          setBookings([
            {
              id: 1,
              user_id: user?.id || 'cli_demo',
              client_name: name,
              client_email: user?.email || 'client@paperstreet.ke',
              service_title: 'The Glasshouse Meeting Suite (6 Pax)',
              location: 'Westlands (Delta Corner)',
              booking_date: '2026-08-26',
              start_time: '10:00 AM',
              end_time: '12:00 PM',
              duration_hours: 2,
              total_amount_kes: 5000,
              status: 'confirmed',
              payment_status: 'paid',
              payment_method: 'M-Pesa',
              created_at: new Date().toISOString(),
            },
          ]);
        }

        if (pData && pData.length > 0) {
          setPasses(pData);
        } else {
          setPasses([
            {
              id: 1,
              user_id: user?.id || 'cli_demo',
              pass_code: 'PS-PASS-8291',
              service_title: 'Full-Day Hot Desk Pass',
              location: 'Westlands (Delta Corner)',
              valid_date: '2026-08-26',
              status: 'active',
              wifi_network: 'PaperStreet-Guest-5G',
              wifi_password: 'Westlands2026!',
              created_at: new Date().toISOString(),
            },
          ]);
        }

        setFeedbackCount(count || 1);
      } catch (err) {
        console.warn('DB load err:', err);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, [user, name]);

  const activePass = passes[0];
  const nextBooking = bookings[0];

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="On-Demand Client Desk"
        title={`Welcome, ${name}.`}
        detail="Manage your active day passes, workspace reservations, packages, and complaints desk."
      />

      {/* Key Metrics Strip */}
      {loading ? (
        <DashboardMetricsSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-navy/10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Active Passes</p>
            <p className="font-heading text-3xl font-light text-navy mt-1">{passes.length}</p>
            <p className="text-xs text-navy/60 mt-1">Ready for check-in</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Reservations</p>
            <p className="font-heading text-3xl font-light text-navy mt-1">{bookings.length}</p>
            <p className="text-xs text-navy/60 mt-1">Scheduled sessions</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Support Tickets</p>
            <p className="font-heading text-3xl font-light text-navy mt-1">{feedbackCount}</p>
            <p className="text-xs text-navy/60 mt-1">Concierge queue</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">WiFi Pass</p>
            <p className="font-heading text-2xl font-light text-navy mt-1 font-mono">PS-GUEST</p>
            <p className="text-xs text-emerald-800 font-semibold mt-1">200Mbps Active</p>
          </div>
        </div>
      )}

      {/* Active Entry Pass Spotlight */}
      {loading ? (
        <ActivePassSkeleton />
      ) : activePass ? (
        <div className="p-8 border border-navy/20 bg-navy/5 flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy font-bold">
              Active Digital Entry Pass
            </span>
            <h2 className="font-heading text-3xl text-navy font-light mt-1">{activePass.service_title}</h2>
            <p className="text-xs text-navy/70 mt-2">
              <strong>Location:</strong> {activePass.location} · <strong>Date:</strong> {formatDate(activePass.valid_date)}
            </p>
            <p className="text-xs text-navy/60 mt-1 flex items-center gap-2">
              <Wifi size={13} className="text-emerald-700" />
              <span>WiFi: <strong className="text-navy">{activePass.wifi_network}</strong> (Password: <code className="bg-navy/10 px-1 py-0.5">{activePass.wifi_password}</code>)</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase text-navy/50">Reception Pass Code</p>
              <p className="font-mono text-2xl font-bold text-navy tracking-wider">{activePass.pass_code}</p>
            </div>
            <div className="p-2 bg-white border border-navy/15">
              <QrCode size={52} className="text-navy" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Quick Action Shortcuts */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/portal/client/packages"
          className="group p-6 border border-navy/15 hover:border-navy hover:bg-navy/5 transition-all flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">Workspace Plans</p>
            <h3 className="font-heading text-2xl text-navy font-light mt-2">Browse Packages</h3>
            <p className="text-xs text-navy/60 mt-2 leading-relaxed">
              Explore full-day passes, 5-day bundles, podcast booths, and conference rooms.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-navy-600 transition-colors">
            View All Packages &rarr;
          </span>
        </Link>

        <Link
          href="/portal/client/bookings"
          className="group p-6 border border-navy/15 hover:border-navy hover:bg-navy/5 transition-all flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">Instant Booking</p>
            <h3 className="font-heading text-2xl text-navy font-light mt-2">Reserve Space</h3>
            <p className="text-xs text-navy/60 mt-2 leading-relaxed">
              Select date, duration, and hub with immediate M-Pesa receipt & pass generation.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-navy-600 transition-colors">
            Book Meeting Room &rarr;
          </span>
        </Link>

        <Link
          href="/portal/client/feedback"
          className="group p-6 border border-navy/15 hover:border-navy hover:bg-navy/5 transition-all flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">Client Care</p>
            <h3 className="font-heading text-2xl text-navy font-light mt-2">Complaints & Feedback</h3>
            <p className="text-xs text-navy/60 mt-2 leading-relaxed">
              File issues regarding Wi-Fi, AV, facilities, or billing directly to management.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-navy-600 transition-colors">
            Submit Feedback Ticket &rarr;
          </span>
        </Link>
      </div>

      {/* Upcoming Bookings Stream */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-navy/50 font-bold block">
              Live Schedule
            </span>
            <h2 className="font-heading text-2xl text-navy font-light mt-0.5">Upcoming Reservations</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/portal/client/bookings?tab=schedule"
              className="text-xs font-semibold text-navy hover:underline hidden sm:inline-block"
            >
              Full Schedule &amp; History &rarr;
            </Link>
            <Link
              href="/portal/client/bookings"
              className="bg-navy text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2 hover:bg-navy-700 transition-colors"
            >
              + Book Space
            </Link>
          </div>
        </div>

        {loading ? (
          <BookingsListSkeleton />
        ) : bookings.length === 0 ? (
          <p className="text-xs text-navy/50 py-6">No scheduled reservations yet.</p>
        ) : (
          <div className="divide-y divide-navy/10">
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="py-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-navy">{b.service_title}</h3>
                  <p className="text-xs text-navy/60 mt-0.5">
                    <strong>{formatDate(b.booking_date)}</strong> · {b.start_time} - {b.end_time} ({b.duration_hours} hrs)
                  </p>
                  <p className="font-mono text-[10px] text-navy/40 mt-1">{b.location}</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-sm font-semibold text-navy">{formatMoney(b.total_amount_kes)}</p>
                    <div className="mt-1"><StatusIndicator status={b.status} /></div>
                  </div>
                  <Link
                    href="/portal/client/passes"
                    className="border border-navy/20 text-navy text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 hover:bg-navy hover:text-white transition-colors"
                  >
                    Pass &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. CLIENT WORKSPACE PACKAGES VIEW (DAY PASS & MEETING ROOMS ONLY)
// ==========================================
export function ClientPackagesView() {
  const [packages, setPackages] = useState<WorkspacePackage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data } = await supabase
          .from('workspace_packages')
          .select('*')
          .in('slug', ['hot-desk', 'meeting-rooms'])
          .eq('is_active', true)
          .order('id', { ascending: true });

        if (data && data.length > 0) {
          const mapped: WorkspacePackage[] = data.map((pkg: any) => {
            let price = pkg.slug === 'hot-desk' ? 1500 : 2000;
            let unit = pkg.slug === 'hot-desk' ? 'day' : 'hour';

            const categoryName =
              pkg.slug === 'hot-desk' ? 'Hot Desk & Day Pass' : 'Meeting & Boardroom';

            return {
              id: pkg.id,
              name: pkg.name,
              slug: pkg.slug,
              category: categoryName,
              price_kes: price,
              period_unit: unit,
              description: pkg.tagline || pkg.description || '',
              features: Array.isArray(pkg.features)
                ? pkg.features
                : typeof pkg.features === 'string'
                ? JSON.parse(pkg.features)
                : [],
              badge: pkg.badge || (pkg.slug === 'hot-desk' ? 'Flexible Coworking' : 'Executive Boardroom'),
              capacity: pkg.slug === 'meeting-rooms' ? '6–12 Persons' : '1 Person',
            };
          });
          setPackages(mapped);
        } else {
          setPackages(FALLBACK_PACKAGES);
        }
      } catch (err) {
        console.warn('Could not load packages from DB, using defaults', err);
        setPackages(FALLBACK_PACKAGES);
      } finally {
        setLoading(false);
      }
    }
    void fetchPackages();
  }, []);

  const categories = ['All', 'Hot Desk & Day Pass', 'Meeting & Boardroom'];

  const filtered = activeCategory === 'All'
    ? packages
    : packages.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleSelectPackage = (pkgName: string, slug: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ps_selected_package', JSON.stringify({ name: pkgName, slug }));
    }
    router.push(`/portal/client/bookings?package=${slug}`);
  };

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="On-Demand Space"
        title="Day Passes &amp; Meeting Rooms"
        detail="Flexible walk-in workstations, 5-day pass bundles, and private executive meeting suites."
      />

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2 border-b border-navy/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-navy text-white'
                : 'border border-navy/20 text-navy/70 hover:border-navy hover:text-navy'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <PackagesGridSkeleton />
      ) : (
        /* Package List Grid (Editorial No-Card Layout) */
        <div className="grid md:grid-cols-2 gap-12">
          {filtered.map((pkg) => (
            <div
              key={pkg.slug}
              className="border-b border-navy/15 pb-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">
                    {pkg.category} {pkg.badge && `· ${pkg.badge}`}
                  </span>
                  <span className="font-mono text-[10px] text-navy/50 uppercase">
                    {pkg.capacity}
                  </span>
                </div>

                <h2 className="font-heading text-3xl text-navy font-light mt-2">{pkg.name}</h2>
                <p className="text-xs text-navy/70 mt-2 leading-relaxed">{pkg.description}</p>

                <div className="mt-5 pt-4 border-t border-navy/10">
                  <p className="font-heading text-3xl text-navy font-light">
                    {formatMoney(pkg.price_kes)}{' '}
                    <span className="text-xs font-mono text-navy/50 font-normal uppercase">
                      / {pkg.period_unit}
                    </span>
                  </p>
                </div>

                {/* Available Rates / Tiers */}
                <div className="mt-6 pt-4 border-t border-navy/10 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-navy/50 font-semibold mb-2">
                    Available Booking Tiers:
                  </p>
                  {pkg.slug === 'hot-desk' ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors">
                        <div>
                          <p className="font-semibold text-navy">Half-Day Pass (4 Hours)</p>
                          <p className="text-[11px] text-navy/60">08:00 - 12:00 or 01:00 - 05:00</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('Half-Day Hot Desk Pass (4 Hours)', 'hot-desk')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 1,000 &rarr;
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors border-l-2 border-navy">
                        <div>
                          <p className="font-semibold text-navy">Full-Day Pass (08:00 AM - 06:00 PM)</p>
                          <p className="text-[11px] text-navy/60">Unlimited day access + tea/coffee</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('Full-Day Hot Desk Pass', 'hot-desk')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 1,500 &rarr;
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors">
                        <div>
                          <p className="font-semibold text-navy">5-Day Weekly Pass Bundle</p>
                          <p className="text-[11px] text-navy/60">5 full days valid for 60 days</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('5-Day Weekly Pass Bundle', 'hot-desk')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 6,500 &rarr;
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors">
                        <div>
                          <p className="font-semibold text-navy">Monthly Flex (10 Days/Month)</p>
                          <p className="text-[11px] text-navy/60">10 flexible days with power backup</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('Monthly Flex Pass (10 Days)', 'hot-desk')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 14,000 &rarr;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors border-l-2 border-navy">
                        <div>
                          <p className="font-semibold text-navy">Hourly Boardroom Reservation</p>
                          <p className="text-[11px] text-navy/60">4K screen, video cam &amp; speakerphone</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('Meeting & Boardroom (Hourly)', 'meeting-rooms')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 2,000 / hr &rarr;
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors">
                        <div>
                          <p className="font-semibold text-navy">Half-Day Block (4 Consecutive Hours)</p>
                          <p className="text-[11px] text-navy/60">Morning or afternoon session (Save KES 1,000)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('Meeting & Boardroom (Half-Day Block)', 'meeting-rooms')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 7,000 &rarr;
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-navy/5 hover:bg-navy/10 transition-colors">
                        <div>
                          <p className="font-semibold text-navy">Full-Day Block (8 Hours: 8:30 AM - 5:30 PM)</p>
                          <p className="text-[11px] text-navy/60">Full day conference &amp; workshop (Save KES 4,000)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPackage('Meeting & Boardroom (Full-Day Block)', 'meeting-rooms')}
                          className="font-mono font-bold text-navy underline hover:text-navy-600"
                        >
                          KES 12,000 &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-navy/50 font-semibold">
                    Inclusions &amp; Amenities:
                  </p>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-navy/80">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg.name, pkg.slug)}
                  className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                >
                  Book {pkg.name} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. CLIENT BOOKING VIEW (RESERVATION ENGINE & SCHEDULE HISTORY)
// ==========================================
export function ClientBookingsView() {
  const { user } = usePortalAuth();
  const name = user?.user_metadata?.full_name || '';
  const email = user?.email || '';
  const phone = user?.user_metadata?.phone || '';
  const company = user?.user_metadata?.company_name || '';

  const [mainTab, setMainTab] = useState<'reserve' | 'schedule'>('reserve');
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>('hot-desk');
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined);
  const [bookings, setBookings] = useState<ClientBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'schedule' || tabParam === 'history') {
        setMainTab('schedule');
      }

      const pkgParam = urlParams.get('package');
      if (pkgParam === 'meeting-rooms' || pkgParam === 'hot-desk') {
        setActiveSlug(pkgParam as ServiceSlug);
      }

      const saved = localStorage.getItem('ps_selected_package');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed?.slug === 'meeting-rooms' || parsed?.slug === 'hot-desk') {
            setActiveSlug(parsed.slug as ServiceSlug);
          }
          localStorage.removeItem('ps_selected_package');
        } catch (_) {}
      }
    }
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      setLoadingBookings(true);
      try {
        const { data, error } = await supabase
          .from('client_bookings')
          .select('*')
          .order('booking_date', { ascending: false });

        if (!error && data && data.length > 0) {
          setBookings(data);
        } else {
          // Fallback initial demo schedule for clear visibility
          setBookings([
            {
              id: 101,
              user_id: user?.id || 'cli_current',
              client_name: name || 'Valued Client',
              client_email: email || 'client@paperstreet.ke',
              service_title: 'Full-Day Hot Desk Pass',
              location: 'Kisumu CBD (CBD Commercial Center)',
              booking_date: '2026-08-27',
              start_time: '08:00 AM',
              end_time: '06:00 PM',
              duration_hours: 10,
              total_amount_kes: 1500,
              status: 'confirmed',
              payment_status: 'paid',
              payment_method: 'Paystack / M-Pesa',
              mpesa_reference: 'QKE829104',
              created_at: new Date().toISOString(),
            },
            {
              id: 102,
              user_id: user?.id || 'cli_current',
              client_name: name || 'Valued Client',
              client_email: email || 'client@paperstreet.ke',
              service_title: 'Executive Boardroom (Half-Day Block)',
              location: 'Kisumu CBD (CBD Commercial Center)',
              booking_date: '2026-08-29',
              start_time: '09:00 AM',
              end_time: '01:00 PM',
              duration_hours: 4,
              total_amount_kes: 7000,
              status: 'confirmed',
              payment_status: 'paid',
              payment_method: 'Paystack / Card',
              mpesa_reference: 'QKE947210',
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.warn('Could not load client bookings:', err);
      } finally {
        setLoadingBookings(false);
      }
    }

    void fetchBookings();
  }, [user, name, email]);

  const upcomingBookings = bookings.filter((b) => {
    const todayStr = new Date().toISOString().split('T')[0];
    return (b.booking_date || '') >= todayStr;
  });

  const pastBookings = bookings.filter((b) => {
    const todayStr = new Date().toISOString().split('T')[0];
    return (b.booking_date || '') < todayStr;
  });

  return (
    <div className="space-y-8 animate-paper-rise">
      <PageHeader
        eyebrow="On-Demand Space"
        title="Bookings &amp; Schedule"
        detail="Reserve daily day passes, 5-day flexi bundles, or private executive boardrooms, and track your scheduled access dates."
      />

      {/* Main Mode Switcher: New Reservation vs Schedule & History */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/15 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMainTab('reserve')}
            className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              mainTab === 'reserve'
                ? 'bg-navy text-white shadow-xs'
                : 'border border-navy/20 text-navy/70 hover:border-navy hover:text-navy bg-white/50'
            }`}
          >
            <Ticket size={14} />
            Reserve Workspace
          </button>

          <button
            type="button"
            onClick={() => setMainTab('schedule')}
            className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              mainTab === 'schedule'
                ? 'bg-navy text-white shadow-xs'
                : 'border border-navy/20 text-navy/70 hover:border-navy hover:text-navy bg-white/50'
            }`}
          >
            <Calendar size={14} />
            My Schedule &amp; History
            <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
              mainTab === 'schedule' ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
            }`}>
              {bookings.length}
            </span>
          </button>
        </div>

        {mainTab === 'schedule' && (
          <button
            type="button"
            onClick={() => setMainTab('reserve')}
            className="text-xs uppercase tracking-wider font-semibold text-navy underline hover:text-navy-600 cursor-pointer"
          >
            + New Booking
          </button>
        )}
      </div>

      {mainTab === 'reserve' ? (
        <div className="space-y-6">
          {/* Service Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveSlug('hot-desk');
                setSelectedTier(undefined);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeSlug === 'hot-desk'
                  ? 'border-b-2 border-navy text-navy font-bold'
                  : 'text-navy/60 hover:text-navy'
              }`}
            >
              Hot Desk &amp; Day Passes
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSlug('meeting-rooms');
                setSelectedTier(undefined);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeSlug === 'meeting-rooms'
                  ? 'border-b-2 border-navy text-navy font-bold'
                  : 'text-navy/60 hover:text-navy'
              }`}
            >
              Meeting &amp; Boardrooms
            </button>
          </div>

          {/* Full Canonical Booking and Payment Engine */}
          <div className="pt-2">
            <IndividualBookingPage
              slug={activeSlug}
              initialUser={{
                fullName: name,
                email: email,
                phone: phone,
                companyName: company,
              }}
              hideNavigation={true}
              selectedPackageTier={selectedTier}
            />
          </div>
        </div>
      ) : (
        /* Schedule & Booking History View */
        <div className="space-y-10 animate-paper-rise">
          {loadingBookings ? (
            <BookingsListSkeleton />
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center border border-navy/15 bg-navy/5 space-y-4">
              <Calendar size={36} className="mx-auto text-navy/40" />
              <h3 className="font-heading text-2xl text-navy">No Scheduled Bookings Found</h3>
              <p className="text-xs text-navy/60 max-w-md mx-auto">
                You haven&apos;t reserved any workspace passes or meeting room sessions yet. Reserve your first session with instant digital check-in.
              </p>
              <button
                type="button"
                onClick={() => setMainTab('reserve')}
                className="bg-navy text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-navy-700 transition-colors inline-block"
              >
                Reserve Workspace Now &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Upcoming / Active Schedule */}
              <div>
                <div className="flex items-center justify-between border-b border-navy/15 pb-3 mb-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-navy/60 font-bold block">
                      Confirmed Itinerary
                    </span>
                    <h2 className="font-heading text-2xl text-navy font-light mt-0.5">
                      Upcoming Scheduled Sessions ({upcomingBookings.length})
                    </h2>
                  </div>
                </div>

                {upcomingBookings.length === 0 ? (
                  <p className="text-xs text-navy/60 italic py-4">No upcoming sessions scheduled.</p>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {upcomingBookings.map((bk) => (
                      <div
                        key={bk.id}
                        className="p-6 border border-navy/20 bg-white shadow-xs space-y-4 hover:border-navy transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 border border-emerald-700/20 mb-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                              {bk.status || 'Confirmed'} · {bk.payment_status || 'Paid'}
                            </span>
                            <h3 className="font-heading text-xl text-navy font-normal">{bk.service_title}</h3>
                          </div>
                          <span className="font-mono text-sm font-bold text-navy">
                            {formatMoney(bk.total_amount_kes)}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs text-navy/70 border-t border-navy/10 pt-3">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={14} className="text-navy/50 shrink-0" />
                            <span><strong>Date:</strong> {formatDate(bk.booking_date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-navy/50 shrink-0" />
                            <span><strong>Time:</strong> {bk.start_time} &rarr; {bk.end_time} ({bk.duration_hours} hrs)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-navy/50 shrink-0" />
                            <span><strong>Location:</strong> {bk.location}</span>
                          </div>
                          {bk.mpesa_reference && (
                            <div className="flex items-center gap-2 font-mono text-[11px] text-navy/50">
                              <CreditCard size={13} />
                              <span>Ref: {bk.mpesa_reference}</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-navy/10 flex items-center justify-between gap-3">
                          <Link
                            href="/portal/client/passes"
                            className="bg-navy text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2 hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
                          >
                            <QrCode size={13} /> View Entry Pass &rarr;
                          </Link>
                          <Link
                            href="/portal/client/invoices"
                            className="border border-navy/20 text-navy text-[11px] uppercase tracking-wider font-semibold px-3 py-2 hover:bg-navy/5 transition-colors"
                          >
                            Receipt
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Bookings Ledger */}
              {pastBookings.length > 0 && (
                <div className="pt-6">
                  <div className="border-b border-navy/15 pb-3 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-navy/50 font-bold block">
                      Archive
                    </span>
                    <h3 className="font-heading text-xl text-navy font-light mt-0.5">
                      Past Completed Bookings ({pastBookings.length})
                    </h3>
                  </div>

                  <div className="divide-y divide-navy/10">
                    {pastBookings.map((bk) => (
                      <div key={bk.id} className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div>
                          <p className="font-semibold text-navy text-sm">{bk.service_title}</p>
                          <p className="text-navy/60 text-[11px] mt-0.5">
                            {formatDate(bk.booking_date)} ({bk.start_time} - {bk.end_time}) · {bk.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <p className="font-mono font-bold text-navy">{formatMoney(bk.total_amount_kes)}</p>
                            <p className="font-mono text-[10px] text-navy/40 uppercase">{bk.payment_method || 'Paid'}</p>
                          </div>
                          <Link
                            href="/portal/client/invoices"
                            className="border border-navy/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-navy hover:bg-navy hover:text-white transition-colors"
                          >
                            View Invoice
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. CLIENT ENTRY PASSES VIEW
// ==========================================
export function ClientPassesView() {
  const { user } = usePortalAuth();
  const [passes, setPasses] = useState<ClientPass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPasses() {
      try {
        const { data } = await supabase
          .from('client_passes')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setPasses(data);
        } else {
          setPasses([
            {
              id: 1,
              user_id: user?.id || 'cli_demo',
              pass_code: 'PS-PASS-8291',
              service_title: 'The Glasshouse Meeting Suite (6 Pax)',
              location: 'Westlands (Delta Corner)',
              valid_date: '2026-08-26',
              status: 'active',
              wifi_network: 'PaperStreet-Guest-5G',
              wifi_password: 'Westlands2026!',
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.warn('Load passes error:', err);
      } finally {
        setLoading(false);
      }
    }
    void loadPasses();
  }, [user]);

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Reception Access"
        title="Active Entry Passes"
        detail="Present your pass code or QR token at reception for building security check-in, desk allocation, and Wi-Fi access."
      />

      {loading ? (
        <PassesListSkeleton />
      ) : passes.length === 0 ? (
        <p className="text-xs text-navy/50 py-6">No active entry passes found.</p>
      ) : (
        <div className="divide-y divide-navy/15">
          {passes.map((pass) => (
            <div key={pass.id} className="py-8 flex flex-wrap items-center justify-between gap-8 first:pt-0">
              <div className="max-w-md">
                <span className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold">
                  Pass Status: <strong className="text-emerald-700 font-semibold">{pass.status}</strong>
                </span>
                <h2 className="font-heading text-3xl text-navy font-light mt-1">{pass.service_title}</h2>
                <p className="text-xs text-navy/70 mt-2">
                  <strong>Facility:</strong> {pass.location} · <strong>Date:</strong> {formatDate(pass.valid_date)}
                </p>
                <div className="mt-4 p-3 bg-navy/5 inline-block text-xs text-navy/80">
                  <span className="font-mono text-[10px] uppercase text-navy/50 block">High-Speed Wi-Fi Credentials</span>
                  <p className="mt-0.5">Network: <strong className="text-navy">{pass.wifi_network}</strong></p>
                  <p>Password: <code className="font-mono bg-white px-1.5 py-0.5 border border-navy/10">{pass.wifi_password}</code></p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase text-navy/40">Reception PIN</p>
                  <p className="font-mono text-2xl font-bold text-navy tracking-widest">{pass.pass_code}</p>
                  <button
                    type="button"
                    onClick={() => alert(`Showing Entry Pass ${pass.pass_code}`)}
                    className="mt-2 text-[11px] font-semibold text-navy underline hover:text-navy-600"
                  >
                    Download Mobile Pass &rarr;
                  </button>
                </div>
                <div className="p-3 bg-white border border-navy/20 shadow-xs">
                  <QrCode size={64} className="text-navy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. CLIENT COMPLAINTS & CONCERNS VIEW (DB & BREVO)
// ==========================================
export function ClientFeedbackView() {
  const { user } = usePortalAuth();
  const name = user?.user_metadata?.full_name || 'Client';
  const email = user?.email || 'otienoalvine925@gmail.com';
  const phone = user?.user_metadata?.phone || '';

  const [category, setCategory] = useState<'facility' | 'wifi' | 'meeting_room' | 'billing' | 'urgent_concern' | 'general'>('general');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');
  const [location, setLocation] = useState('Kisumu CBD Flagship');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [tickets, setTickets] = useState<ClientFeedback[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`/api/portal/feedback?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (data?.tickets && data.tickets.length > 0) {
        setTickets(data.tickets);
      } else {
        setTickets([
          {
            id: 'TCK-201',
            user_id: user?.id || 'cli_demo',
            client_name: name,
            client_email: email,
            category: 'wifi',
            priority: 'urgent',
            subject: 'Meeting Room Screen Casting Assistance',
            message: 'Need help connecting AirPlay to the 4K display in the Glasshouse Room.',
            location: 'Kisumu CBD Flagship',
            status: 'resolved',
            admin_notes: 'Front desk steward configured receiver and provided direct HDMI cable.',
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.warn('Fetch tickets error:', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    void fetchTickets();
  }, [email]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/portal/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          clientName: name,
          clientEmail: email,
          clientPhone: phone || null,
          location,
          category,
          priority,
          subject: sanitizeInput(subject, 120),
          message: sanitizeInput(message, 1000),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to submit concern');
      }

      setSubmittedSuccess(true);
      setSubject('');
      setMessage('');
      void fetchTickets();
    } catch (err: any) {
      console.error('Feedback submission error:', err);
      alert(err?.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Helpdesk & Concierge"
        title="Complaints & Concerns Desk"
        detail="Report facility issues, Wi-Fi connectivity, meeting room equipment, billing discrepancies, or urgent concerns directly to management."
      />

      <div className="grid md:grid-cols-12 gap-12">
        {/* Ticket Submission Form */}
        <div className="md:col-span-6 space-y-6">
          <h2 className="font-heading text-2xl text-navy font-light">Raise a Ticket / Concern</h2>

          {submittedSuccess && (
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 text-xs text-emerald-900 leading-relaxed">
              <strong>Ticket Logged Successfully:</strong> A high-priority alert has been dispatched to the front desk management team. We will review and address it promptly.
            </div>
          )}

          <form onSubmit={handleFeedbackSubmit} className="space-y-5 border-t border-navy/10 pt-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Concern Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy focus:border-navy focus:outline-none"
              >
                <option value="facility">Facility, Desks &amp; Cleanliness</option>
                <option value="wifi">High-Speed Wi-Fi &amp; Internet</option>
                <option value="meeting_room">Meeting Room AV &amp; Presentation</option>
                <option value="billing">Billing, Receipts &amp; Payments</option>
                <option value="urgent_concern">Urgent Concern / Security</option>
                <option value="general">General Suggestion / Inquiries</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy focus:border-navy focus:outline-none"
                >
                  <option value="low">Low (General Inquiry)</option>
                  <option value="normal">Normal (Standard Request)</option>
                  <option value="high">High (Needs Attention)</option>
                  <option value="urgent">Urgent (Immediate Impact)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                  Hub Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy focus:border-navy focus:outline-none"
                >
                  <option>Kisumu CBD Flagship</option>
                  <option>Nairobi Westlands Hub</option>
                  <option>Nairobi Riverside Drive</option>
                  <option>Mombasa CBD Hub</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of the concern..."
                className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                Detailed Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide specific details (desk/room, what happened, or how we can assist)..."
                className="w-full border border-navy/20 bg-transparent p-3 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting & Dispatching Alert...' : 'Submit Concern to Management \u2192'}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Ticket History */}
        <div className="md:col-span-6 space-y-6 border-l border-navy/10 pl-0 md:pl-10">
          <h2 className="font-heading text-2xl text-navy font-light">Your Ticket History</h2>

          {loadingTickets ? (
            <FeedbackListSkeleton />
          ) : tickets.length === 0 ? (
            <p className="text-xs text-navy/50">No tickets submitted yet.</p>
          ) : (
            <div className="divide-y divide-navy/10">
              {tickets.map((t) => (
                <div key={t.id} className="py-5 space-y-2 first:pt-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-navy/50 bg-navy/5 px-2 py-0.5">
                      {t.category}
                    </span>
                    <StatusIndicator status={t.status} />
                  </div>
                  <h3 className="text-sm font-semibold text-navy">{t.subject}</h3>
                  <p className="text-xs text-navy/70 leading-relaxed italic">"{t.message}"</p>
                  {t.admin_notes && (
                    <div className="p-3 bg-navy/5 border-l-2 border-navy text-xs text-navy/80 mt-2">
                      <strong className="text-navy font-semibold">Management Resolution:</strong> {t.admin_notes}
                    </div>
                  )}
                  <p className="font-mono text-[10px] text-navy/40 pt-1">Logged {formatDate(t.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. CLIENT REFERRALS & DISCOUNTS VIEW
// ==========================================
export function ClientReferralsView() {
  const { user, clientUser } = usePortalAuth();
  const name = user?.user_metadata?.full_name || 'Client';
  const email = user?.email || 'otienoalvine925@gmail.com';
  const referralCode = clientUser?.referralCode || user?.user_metadata?.referral_code || `PS-${email.slice(0, 4).toUpperCase()}2026`;
  const discountBalance = clientUser?.discountBalanceKES ?? (user?.user_metadata?.discount_balance_kes ?? 1000);

  const [referredEmail, setReferredEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReferrals() {
      try {
        const res = await fetch(`/api/portal/referrals?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data?.referrals && data.referrals.length > 0) {
          setReferrals(data.referrals);
        } else {
          setReferrals([
            { id: 1, referred_email: 'sarah.mwangi@techfirm.ke', status: 'rewarded', reward_kes: 500, created_at: '2026-08-18' },
            { id: 2, referred_email: 'david.otieno@consultancy.africa', status: 'rewarded', reward_kes: 500, created_at: '2026-08-22' },
          ]);
        }
      } catch (err) {
        console.warn('Referrals load err:', err);
      } finally {
        setLoading(false);
      }
    }
    void loadReferrals();
  }, [email]);

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setInviteSuccess(null);

    try {
      const res = await fetch('/api/portal/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referrerEmail: email,
          referredEmail: referredEmail.trim().toLowerCase(),
          referralCode,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to send invite');

      setInviteSuccess(`Referral invite logged for ${referredEmail}! You will earn KES 500 upon their first booking.`);
      setReferredEmail('');
    } catch (err: any) {
      alert(err?.message || 'Error creating invite');
    } finally {
      setInviting(false);
    }
  };

  const shareText = encodeURIComponent(
    `Hey, join Paper Street Workspaces for on-demand hot desks, conference rooms, and business addresses. Use my referral code ${referralCode} for 10% off your first reservation: https://paperstreet.africa/portal/client/register`
  );

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Referral Program"
        title="Refer Colleagues &amp; Earn Discounts"
        detail="Share your exclusive invite passcode. Your friends get 10% off their first booking, and you earn KES 500 in workspace credits for every referral."
      />

      {loading ? (
        <ReferralsSkeleton />
      ) : (
        <>
          {/* Rewards Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-navy/10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Available Credit Balance</p>
              <p className="font-heading text-4xl text-emerald-800 font-light mt-1">{formatMoney(discountBalance)}</p>
              <p className="text-xs text-navy/60 mt-1">Automatically applied at checkout</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Successful Referrals</p>
              <p className="font-heading text-4xl text-navy font-light mt-1">{referrals.filter(r => r.status === 'rewarded').length}</p>
              <p className="text-xs text-navy/60 mt-1">Friends joined &amp; booked</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Reward Per Referral</p>
              <p className="font-heading text-4xl text-navy font-light mt-1">KES 500</p>
              <p className="text-xs text-navy/60 mt-1">+ 10% discount for referee</p>
            </div>
          </div>

          {/* Referral Code Spotlight */}
          <div className="p-8 border border-navy/20 bg-navy/5 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy font-bold">
              Your Unique Referral Passcode
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-white border border-navy/20 px-6 py-3 font-mono text-2xl font-bold tracking-widest text-navy">
                {referralCode}
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="border border-navy/20 px-5 py-3 text-xs uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors flex items-center gap-2"
              >
                <Copy size={14} /> {copied ? 'Copied to Clipboard!' : 'Copy Passcode'}
              </button>
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#166534] text-white px-5 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-[#14532d] transition-colors flex items-center gap-2"
              >
                <Share2 size={14} /> Share on WhatsApp
              </a>
            </div>
            <p className="text-xs text-navy/70 pt-2">
              Colleagues can enter this passcode at registration or during booking checkout to claim their 10% early-bird rate.
            </p>
          </div>

          {/* Invite by Email */}
          <div className="grid md:grid-cols-12 gap-12 pt-4">
            <div className="md:col-span-6 space-y-6">
              <h2 className="font-heading text-2xl text-navy font-light">Invite by Email</h2>

              {inviteSuccess && (
                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 text-xs text-emerald-900 leading-relaxed">
                  {inviteSuccess}
                </div>
              )}

              <form onSubmit={handleInvite} className="space-y-4 border-t border-navy/10 pt-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-navy/70 mb-1.5">
                    Colleague's Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={referredEmail}
                    onChange={(e) => setReferredEmail(e.target.value)}
                    placeholder="colleague@company.ke"
                    className="w-full border-b border-navy/20 bg-transparent py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={inviting}
                  className="w-full bg-navy text-white py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
                >
                  {inviting ? 'Sending Invite...' : 'Send Referral Invitation \u2192'}
                </button>
              </form>
            </div>

            {/* Referrals History */}
            <div className="md:col-span-6 space-y-6 border-l border-navy/10 pl-0 md:pl-10">
              <h2 className="font-heading text-2xl text-navy font-light">Referral Activity</h2>
              <div className="divide-y divide-navy/10">
                {referrals.map((r, i) => (
                  <div key={i} className="py-4 flex items-center justify-between gap-4 text-xs first:pt-0">
                    <div>
                      <p className="font-semibold text-navy">{r.referred_email}</p>
                      <p className="font-mono text-[10px] text-navy/40 mt-0.5">Invited {formatDate(r.created_at)}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-semibold text-emerald-800">+{formatMoney(r.reward_kes || 500)}</span>
                      <div className="mt-1"><StatusIndicator status={r.status} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ==========================================
// 11. CLIENT OFFERS & MEMBER PERKS VIEW
// ==========================================
export function ClientOffersView() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const offers = [
    {
      id: 1,
      title: 'Kisumu CBD Flagship Launch: 20% Off 1st Month',
      code: 'KISUMU20',
      discount: '20% Off',
      badge: 'Launch Voucher',
      description: 'Applicable to Virtual Office annual contracts, dedicated desks, and 5-day flexi bundles at our new CBD Commercial Center.',
      expiry: 'Valid through 31 Dec 2026',
      terms: 'Minimum 1-month commitment or 5-day bundle.',
    },
    {
      id: 2,
      title: '5 Complimentary Boardroom Hours',
      code: 'BOARDROOM5',
      discount: 'KES 12,500 Value',
      badge: 'Executive Perk',
      description: 'Enjoy 5 free hours in our 4K video-enabled 6-person or 12-person meeting suite with complimentary coffee and front-desk greeter.',
      expiry: 'Valid for 90 days from enrollment',
      terms: 'Advanced reservation required via client portal.',
    },
    {
      id: 3,
      title: 'Visiting Founder Flexi Pass (Buy 4 Days, Get 1 Free)',
      code: 'FLEXI5PLUS',
      discount: '20% Savings',
      badge: 'Bundle Special',
      description: 'Perfect for consultants and founders traveling to Kisumu and Nairobi. Access high-speed internet and generator backup anytime.',
      expiry: 'Ongoing Benefit',
      terms: 'Valid for 60 days from purchase date.',
    },
    {
      id: 4,
      title: 'Company Registration & KRA Utility Pack',
      code: 'CORPCOMPLIANCE',
      discount: 'Free Utility Proof',
      badge: 'Compliance Pack',
      description: 'Receive certified proof of address letters and stamped utility bills accepted by commercial banks and the Business Registration Service (BRS).',
      expiry: 'Included with all Virtual Office tiers',
      terms: 'Available on verified annual leases.',
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Special Perks &amp; Vouchers"
        title="Exclusive Member Offers"
        detail="Take advantage of promotional discount vouchers, launch benefits, and complimentary boardroom hours across our workspace network."
      />

      {loading ? (
        <OffersSkeleton />
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="border-b border-navy/15 pb-8 flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-navy font-bold bg-navy/5 px-2.5 py-1">
                    {offer.badge}
                  </span>
                  <span className="font-heading text-lg font-semibold text-emerald-800">
                    {offer.discount}
                  </span>
                </div>

                <h2 className="font-heading text-2xl text-navy font-light mt-3">{offer.title}</h2>
                <p className="text-xs text-navy/70 mt-2 leading-relaxed">{offer.description}</p>

                <div className="mt-4 p-3 bg-navy/5 border-l-2 border-navy flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-navy/50">Promo Code</p>
                    <p className="font-mono text-base font-bold text-navy tracking-wider">{offer.code}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className="border border-navy/20 bg-white px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <Copy size={12} /> {copiedCode === offer.code ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>

                <div className="mt-3 text-[11px] text-navy/50 space-y-0.5">
                  <p>&bull; {offer.expiry}</p>
                  <p>&bull; {offer.terms}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/portal/client/packages"
                  className="w-full bg-navy text-white py-3 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                >
                  Apply Voucher to Booking &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 12. CLIENT INVOICES & RECEIPTS VIEW
// ==========================================
export function ClientInvoicesView() {
  const { user } = usePortalAuth();
  const [invoices, setInvoices] = useState<ClientInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      try {
        const { data } = await supabase
          .from('client_invoices')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setInvoices(data);
        } else {
          setInvoices([
            {
              id: 1,
              user_id: user?.id || 'cli_demo',
              invoice_number: 'INV-2026-081',
              description: 'The Glasshouse Meeting Suite (2 hrs)',
              amount_kes: 5000,
              payment_method: 'M-Pesa',
              status: 'paid',
              created_at: '2026-08-24T10:00:00Z',
            },
            {
              id: 2,
              user_id: user?.id || 'cli_demo',
              invoice_number: 'INV-2026-074',
              description: '5-Day Flexible Desk Pass Bundle',
              amount_kes: 9000,
              payment_method: 'M-Pesa',
              status: 'paid',
              created_at: '2026-08-12T14:30:00Z',
            },
          ]);
        }
      } catch (err) {
        console.warn('Invoices load err:', err);
      } finally {
        setLoading(false);
      }
    }
    void loadInvoices();
  }, [user]);

  return (
    <div className="space-y-12 animate-paper-rise">
      <PageHeader
        eyebrow="Billing History"
        title="Orders & Tax Invoices"
        detail="Download official KRA-compliant receipts and tax invoices for accounting and expense filing."
      />

      {loading ? (
        <InvoicesSkeleton />
      ) : invoices.length === 0 ? (
        <p className="text-xs text-navy/50 py-6">No invoices or tax receipts found.</p>
      ) : (
        <div className="divide-y divide-navy/10">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-5 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-mono text-navy/50">{inv.invoice_number}</span>
                <h3 className="font-semibold text-navy mt-0.5">{inv.description}</h3>
                <p className="font-mono text-[10px] text-navy/40 mt-1">{formatDate(inv.created_at)} · {inv.payment_method}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-semibold text-navy text-sm">{formatMoney(inv.amount_kes)}</span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading official ETR tax receipt for ${inv.invoice_number}`)}
                  className="border border-navy/20 px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Download size={12} /> PDF Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 13. PROFILE SETTINGS VIEW
// ==========================================
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
            <p className="text-sm text-emerald-800 font-semibold mt-1">Supabase Realtime Auth</p>
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
