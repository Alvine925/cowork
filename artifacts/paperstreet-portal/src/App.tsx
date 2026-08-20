import { useEffect, useState, type ReactNode } from 'react';
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
  Receipt,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  ClerkProvider,
  SignIn,
  SignUp,
  useAuth,
  useClerk,
  useUser,
} from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  useGetPortalDocuments,
  useGetPortalSubscription,
  useGetPortalSummary,
} from '../../../lib/api-client-react/src/generated/api';
import type { PortalActivity, PortalDocument, PortalSubscription, PortalSummary } from '../../../lib/api-client-react/src/generated/api.schemas';
import { Link, Redirect, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

function stripBase(path: string) {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: '#10233B',
    colorForeground: '#10233B',
    colorMutedForeground: '#5D6670',
    colorDanger: '#A83F37',
    colorBackground: '#F3EDDF',
    colorInput: '#FBF8F0',
    colorInputForeground: '#10233B',
    colorNeutral: '#D8D0C0',
    fontFamily: 'DM Sans, sans-serif',
    borderRadius: '0.75rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#F3EDDF] rounded-2xl w-[440px] max-w-full overflow-hidden',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-[#10233B] font-serif',
    headerSubtitle: 'text-[#5D6670]',
    socialButtonsBlockButtonText: 'text-[#10233B]',
    formFieldLabel: 'text-[#10233B]',
    footerActionLink: 'text-[#10233B] font-semibold',
    footerActionText: 'text-[#5D6670]',
    dividerText: 'text-[#5D6670]',
    identityPreviewEditButton: 'text-[#10233B]',
    formFieldSuccessText: 'text-[#35624C]',
    alertText: 'text-[#8D352E]',
    logoBox: 'h-14',
    logoImage: 'h-14 w-14 rounded-xl',
    socialButtonsBlockButton: 'border-[#D8D0C0] bg-[#FBF8F0] hover:bg-[#EDE5D6]',
    formButtonPrimary: 'bg-[#10233B] text-[#FBF8F0] hover:bg-[#1B3658]',
    formFieldInput: 'border-[#D8D0C0] bg-[#FBF8F0] text-[#10233B]',
    footerAction: 'text-[#5D6670]',
    dividerLine: 'bg-[#D8D0C0]',
    alert: 'border-[#D7A19A] bg-[#F4E1DD]',
    otpCodeFieldInput: 'border-[#D8D0C0] bg-[#FBF8F0] text-[#10233B]',
    formFieldRow: 'gap-1',
    main: 'bg-[#F3EDDF]',
  },
};

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

function displayError(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return 'The Paper Street service did not return a response.';
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

function LoadingScreen({ label = 'Preparing your desk' }: { label?: string }) {
  return (
    <FullScreenMessage
      eyebrow="Paper Street / Secure portal"
      title={label}
      detail="Checking your member session and bringing your workspace into focus."
      icon={Clock3}
    />
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'quiet';
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-testid={`link-${href.replaceAll('/', '').replaceAll('*', '') || 'home'}`}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
        variant === 'primary'
          ? 'bg-primary text-primary-foreground shadow-sm hover:bg-[#1B3658]'
          : 'border border-border bg-card/70 text-foreground hover:bg-secondary'
      } ${className}`}
    >
      {children}
    </Link>
  );
}

function StatusPill({ status }: { status: string }) {
  const isGood = status === 'active' || status === 'ready';
  const isPending = status === 'pending' || status === 'pending_payment';
  return (
    <span
      data-testid={`status-${status}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono-app text-[10px] font-bold uppercase tracking-[0.14em] ${
        isGood
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
      data-testid="link-paper-street-logo"
      className={`focus-ring inline-flex items-center gap-3 ${light ? 'text-[#F3EDDF]' : 'text-foreground'}`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl font-serif-app text-lg font-bold ${light ? 'bg-accent text-primary' : 'bg-primary text-accent'}`}>P</span>
      <span>
        <span className="block font-serif-app text-[15px] leading-none tracking-[-0.03em]">Paper Street</span>
        <span className={`mt-1 block font-mono-app text-[8px] uppercase tracking-[0.22em] ${light ? 'text-[#BFC9D2]' : 'text-muted-foreground'}`}>Nairobi · Members</span>
      </span>
    </Link>
  );
}

function PublicHome() {
  return (
    <main className="paper-grain min-h-[100dvh] overflow-hidden bg-background">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <LogoLockup />
        <div className="flex items-center gap-2">
          <ButtonLink href="/sign-in" variant="quiet">Sign in <ArrowUpRight size={15} /></ButtonLink>
          <ButtonLink href="/sign-up" className="hidden sm:inline-flex">Join Paper Street <ArrowUpRight size={15} /></ButtonLink>
        </div>
      </header>
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.06fr_.94fr] lg:px-12 lg:pb-28 lg:pt-20">
        <div className="relative z-10 max-w-2xl animate-paper-rise">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.25em] text-[#96722C]">Your business, properly placed</p>
          <h1 className="mt-5 font-serif-app text-[clamp(3rem,7vw,6.6rem)] leading-[.98] tracking-[-0.065em] text-foreground">
            A quieter way to <span className="text-[#96722C]">work.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Your Paper Street member desk brings the practical side of business together — a credible Nairobi address, flexible workspace, mail support, and a team that keeps the details moving.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/sign-in">Enter member portal <ArrowUpRight size={16} /></ButtonLink>
            <a href="mailto:hello@paperstreet.co.ke" data-testid="link-contact-paper-street" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Talk to the team <ChevronRight size={16} />
            </a>
          </div>
        </div>
        <div className="relative min-h-[390px] animate-paper-rise [animation-delay:120ms] lg:min-h-[510px]">
          <div className="absolute right-0 top-5 h-[74%] w-[78%] rotate-3 rounded-[2rem] bg-primary shadow-xl sm:w-[68%]" />
          <div className="animate-paper-drift absolute bottom-0 left-4 z-10 w-[86%] rounded-[1.5rem] border border-[#D8D0C0] bg-card p-6 shadow-lg sm:left-12 sm:w-[76%]">
            <div className="flex items-start justify-between border-b border-border pb-6">
              <div>
                <p className="font-mono-app text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Member desk / 04</p>
                <p className="mt-3 font-serif-app text-2xl text-foreground">Business, in order.</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8D7AC] text-primary"><Landmark size={19} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div><p className="text-xs text-muted-foreground">Address</p><p className="mt-1 text-sm font-semibold">Westlands, Nairobi</p></div>
              <div><p className="text-xs text-muted-foreground">Workspace</p><p className="mt-1 text-sm font-semibold">Ready when you are</p></div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#35624C]"><span className="h-2 w-2 rounded-full bg-[#5A9872]" /> Member services operational</div>
          </div>
          <div className="absolute left-0 top-24 z-20 flex h-20 w-20 -rotate-6 items-center justify-center rounded-2xl border border-[#D8D0C0] bg-[#E8D7AC] text-primary shadow-md sm:left-10 sm:h-24 sm:w-24"><Building2 size={34} strokeWidth={1.4} /></div>
          <span className="absolute bottom-2 right-3 font-mono-app text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Since 2018 / KE</span>
        </div>
      </section>
      <section className="border-y border-border bg-[#EDE5D6]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8 lg:px-12">
          {[
            ['01', 'One clear desk', 'Membership, billing, documents and requests in one considered place.'],
            ['02', 'Local by design', 'Built around how businesses actually operate in Nairobi and across Kenya.'],
            ['03', 'People in the loop', 'When a detail needs a human, the Paper Street team is close by.'],
          ].map(([number, title, copy]) => (
            <div key={number} data-testid={`text-benefit-${number}`} className="max-w-xs">
              <span className="font-mono-app text-[10px] tracking-[0.2em] text-[#96722C]">{number}</span>
              <h2 className="mt-4 font-serif-app text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <LogoLockup />
        <span>Private offices, flexible space, and virtual presence in Kenya.</span>
      </footer>
    </main>
  );
}

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/membership', label: 'Membership', icon: Receipt },
  { href: '/documents', label: 'Documents', icon: FolderOpen },
  { href: '/support', label: 'Support', icon: LifeBuoy },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

function PortalShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const name = user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Member';

  const closeAndNavigate = () => setMobileOpen(false);
  const handleSignOut = () => {
    if (window.confirm('Sign out of your Paper Street member portal?')) {
      void signOut({ redirectUrl: basePath || '/' });
    }
  };

  return (
    <div className="paper-grain min-h-[100dvh] bg-background">
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      ) : null}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-sidebar px-5 py-6 text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <LogoLockup light />
          <button type="button" onClick={() => setMobileOpen(false)} data-testid="button-close-mobile-menu" className="focus-ring rounded-lg p-2 text-[#BFC9D2] hover:bg-sidebar-accent lg:hidden"><X size={18} /></button>
        </div>
        <div className="mt-12">
          <p className="px-3 font-mono-app text-[9px] uppercase tracking-[0.22em] text-[#91A0AF]">Member portal</p>
          <nav className="mt-3 space-y-1" aria-label="Member navigation">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = location === href || (href === '/dashboard' && location === '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAndNavigate}
                  data-testid={`link-nav-${label.toLowerCase()}`}
                  className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground' : 'text-[#BFC9D2] hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground'}`}
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
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary font-serif-app text-sm text-sidebar-primary-foreground">{initials(user?.fullName || name)}</span>
            <div className="min-w-0">
              <p data-testid="text-sidebar-user" className="truncate text-sm font-semibold text-sidebar-accent-foreground">{user?.fullName || name}</p>
              <p className="mt-0.5 truncate text-xs text-[#91A0AF]">Member account</p>
            </div>
          </div>
          <button type="button" onClick={handleSignOut} data-testid="button-sidebar-sign-out" className="focus-ring mt-4 flex w-full items-center gap-2 rounded-lg px-1 py-1 text-xs text-[#BFC9D2] transition-colors hover:text-sidebar-accent-foreground"><LogOut size={14} /> Sign out securely</button>
        </div>
      </aside>
      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border/80 bg-background/90 px-5 backdrop-blur-md sm:px-8 lg:px-12">
          <button type="button" onClick={() => setMobileOpen(true)} data-testid="button-open-mobile-menu" className="focus-ring rounded-xl border border-border bg-card p-2.5 text-foreground lg:hidden"><Menu size={19} /></button>
          <div className="hidden lg:block"><p className="font-mono-app text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Paper Street / Operating desk</p><p className="mt-1 text-sm font-semibold">{location === '/dashboard' ? 'Good to see you' : navItems.find((item) => item.href === location)?.label}</p></div>
          <Link href="/profile" data-testid="link-header-profile" className="focus-ring ml-auto flex items-center gap-3 rounded-full pl-2 pr-1.5 transition-colors hover:bg-secondary">
            <span className="hidden text-right sm:block"><span className="block text-xs font-semibold">{user?.fullName || name}</span><span className="block text-[10px] text-muted-foreground">{user?.primaryEmailAddress?.emailAddress || 'Member account'}</span></span>
            <span data-testid="img-header-avatar" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8D7AC] font-serif-app text-sm font-bold text-primary">{initials(user?.fullName || name)}</span>
          </Link>
        </header>
        <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">{children}</main>
      </div>
    </div>
  );
}

function QueryError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-[#D7A19A] bg-[#F4E1DD] p-5 text-[#6F302B]">
      <div className="flex gap-3"><CircleAlert className="mt-0.5 shrink-0" size={18} /><div><p className="text-sm font-semibold">We could not load this section</p><p className="mt-1 text-sm leading-6">{message}</p><button type="button" onClick={onRetry} data-testid="button-retry-query" className="focus-ring mt-3 rounded-full bg-[#6F302B] px-3 py-2 text-xs font-semibold text-[#F9EEE9]">Try again</button></div></div>
    </div>
  );
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-secondary ${className}`} aria-label="Loading content" />;
}

function Dashboard() {
  const { user } = useUser();
  const summary = useGetPortalSummary<PortalSummary>();
  const documents = useGetPortalDocuments<PortalDocument[]>();
  const name = user?.firstName || 'there';

  if (summary.isLoading) return <DashboardSkeleton />;
  if (summary.isError || !summary.data) return <QueryError message={displayError(summary.error)} onRetry={() => void summary.refetch()} />;
  const summaryData = summary.data as PortalSummary;
  const subscription = summaryData.subscription;
  const activities: PortalActivity[] = summaryData.recentActivity || [];
  const documentsCount = summaryData.documentsCount ?? 0;
  const readyDocumentsCount = summaryData.readyDocumentsCount ?? 0;
  return (
    <div className="animate-paper-rise space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-8 text-primary-foreground shadow-lg sm:px-9 sm:py-10">
        <div className="absolute -right-14 -top-20 h-64 w-64 rounded-full border-[34px] border-accent/20" />
        <div className="absolute bottom-[-100px] right-32 h-52 w-52 rounded-full border-[22px] border-accent/10" />
        <div className="relative max-w-2xl">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.22em] text-[#CFC4A5]">Tuesday, your member desk</p>
          <h1 data-testid="text-dashboard-greeting" className="mt-4 font-serif-app text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">Good morning, {name}.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#C2CCD5]">Everything is in place for another clear day of running your business from Nairobi.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/documents" className="bg-accent text-primary hover:bg-[#E2C889]">Review documents <ArrowUpRight size={15} /></ButtonLink>
            <ButtonLink href="/support" variant="quiet" className="border-sidebar-border bg-transparent text-primary-foreground hover:bg-sidebar-accent">Contact support <ChevronRight size={15} /></ButtonLink>
          </div>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
        <MetricCard label="Current plan" value={subscription?.plan || '—'} detail={subscription ? <StatusPill status={subscription.status} /> : 'No plan details'} icon={Landmark} tone="navy" />
        <MetricCard label="Next billing" value={formatDate(subscription?.nextBillingDate)} detail={subscription ? formatMoney(subscription.billingCycle === 'annual' ? subscription.annualPrice : subscription.monthlyPrice) : '—'} icon={CalendarDays} />
        <MetricCard label="Documents ready" value={`${readyDocumentsCount} / ${documentsCount}`} detail={documentsCount === 0 ? 'No documents yet' : 'Available to review'} icon={FileText} />
        <MetricCard label="Workspace" value={subscription?.location || '—'} detail="Your member location" icon={MapPin} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-2xl border border-card-border bg-card p-6 shadow-sm sm:p-7">
          <div className="flex items-start justify-between gap-4"><div><p className="font-mono-app text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Your paper trail</p><h2 className="mt-2 font-serif-app text-2xl tracking-[-0.03em]">Recent activity</h2></div><Link href="/membership" data-testid="link-view-membership-from-activity" className="focus-ring text-xs font-semibold text-[#80652D] hover:underline">View membership</Link></div>
          {activities.length === 0 ? <EmptyInline icon={Clock3} title="No activity to show yet" detail="Your billing, document and service updates will appear here." /> : <div className="mt-7 space-y-0">{activities.slice(0, 5).map((activity, index) => <ActivityRow key={activity.id} activity={activity} first={index === 0} />)}</div>}
        </section>
        <section className="rounded-2xl border border-card-border bg-[#EDE5D6] p-6 sm:p-7">
          <p className="font-mono-app text-[10px] uppercase tracking-[0.18em] text-muted-foreground">A useful next step</p>
          <h2 className="mt-2 font-serif-app text-2xl tracking-[-0.03em]">Keep your desk current.</h2>
          <div className="mt-6 space-y-3">
            <ActionRow href="/documents" icon={FolderOpen} title="Check your documents" detail={documents.isLoading ? 'Checking readiness…' : documents.isError ? 'Documents could not be checked' : `${readyDocumentsCount} ready to view`} />
            <ActionRow href="/support" icon={Headphones} title="Ask for a hand" detail="Our team is close by" />
            <ActionRow href="/profile" icon={ShieldCheck} title="Review account details" detail="Keep your contact info current" />
          </div>
        </section>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return <div className="space-y-8"><SkeletonBlock className="h-64 rounded-[1.75rem]" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[1, 2, 3, 4].map((item) => <SkeletonBlock key={item} className="h-32" />)}</div><div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]"><SkeletonBlock className="h-96" /><SkeletonBlock className="h-96" /></div></div>;
}

function MetricCard({ label, value, detail, icon: Icon, tone = 'light' }: { label: string; value: string; detail: ReactNode; icon: LucideIcon; tone?: 'light' | 'navy' }) {
  return <div data-testid={`card-metric-${label.toLowerCase().replaceAll(' ', '-')}`} className={`rounded-2xl border p-5 shadow-sm ${tone === 'navy' ? 'border-primary bg-primary text-primary-foreground' : 'border-card-border bg-card'}`}><div className="flex items-start justify-between gap-3"><p className={`font-mono-app text-[9px] uppercase tracking-[0.17em] ${tone === 'navy' ? 'text-[#C2CCD5]' : 'text-muted-foreground'}`}>{label}</p><Icon size={17} className={tone === 'navy' ? 'text-accent' : 'text-[#96722C]'} /></div><p data-testid={`text-metric-${label.toLowerCase().replaceAll(' ', '-')}`} className="mt-4 truncate font-serif-app text-[1.35rem] tracking-[-0.03em]">{value}</p><div className={`mt-2 text-xs ${tone === 'navy' ? 'text-[#C2CCD5]' : 'text-muted-foreground'}`}>{detail}</div></div>;
}

function ActivityRow({ activity, first }: { activity: PortalActivity; first: boolean }) {
  const Icon = activity.kind === 'billing' ? Banknote : activity.kind === 'document' ? FileText : Headphones;
  return <div data-testid={`row-activity-${activity.id}`} className="relative flex gap-4 pb-6 last:pb-0"><div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#80652D]"><Icon size={16} /></div><div className="min-w-0 flex-1 border-b border-border pb-5 last:border-0"><div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-sm font-semibold">{activity.label}</p><time className="font-mono-app text-[10px] text-muted-foreground">{formatDate(activity.date)}</time></div><p className="mt-1 text-xs leading-5 text-muted-foreground">{activity.detail}</p></div>{!first ? <span className="absolute left-[17px] top-[-24px] h-[24px] w-px bg-border" /> : null}</div>;
}

function ActionRow({ href, icon: Icon, title, detail }: { href: string; icon: LucideIcon; title: string; detail: string }) {
  return <Link href={href} data-testid={`link-action-${title.toLowerCase().replaceAll(' ', '-')}`} className="focus-ring group flex items-center gap-3 rounded-xl border border-border/80 bg-card/65 p-3 transition-transform hover:-translate-y-0.5 hover:bg-card"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8D7AC] text-primary"><Icon size={16} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{title}</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{detail}</span></span><ChevronRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" /></Link>;
}

function EmptyInline({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return <div data-testid="empty-inline-state" className="mt-7 rounded-xl border border-dashed border-border bg-background/50 px-5 py-8 text-center"><Icon className="mx-auto text-muted-foreground" size={22} /><p className="mt-3 text-sm font-semibold">{title}</p><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground">{detail}</p></div>;
}

function Membership() {
  const subscription = useGetPortalSubscription<PortalSubscription>();
  if (subscription.isLoading) return <div className="space-y-6"><SkeletonBlock className="h-44" /><div className="grid gap-6 lg:grid-cols-2"><SkeletonBlock className="h-80" /><SkeletonBlock className="h-80" /></div></div>;
  if (subscription.isError || !subscription.data) return <QueryError message={displayError(subscription.error)} onRetry={() => void subscription.refetch()} />;
  const data = subscription.data as PortalSubscription;
  const billingAmount = data.billingCycle === 'annual' ? data.annualPrice : data.monthlyPrice;
  const includedServices: string[] = (data.includedServices || []) as string[];
  return <div className="animate-paper-rise space-y-8">
    <PageIntro eyebrow="Member account / 01" title="Membership" detail="A clear view of the services, dates, and terms that keep your Paper Street presence running." />
    <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground shadow-lg sm:p-9"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-[#C2CCD5]">Your plan</p><h2 data-testid="text-membership-plan" className="mt-3 font-serif-app text-4xl tracking-[-0.05em]">{data.plan}</h2><p className="mt-2 flex items-center gap-2 text-sm text-[#C2CCD5]"><MapPin size={14} /> {data.location}</p></div><StatusPill status={data.status} /></div><div className="mt-10 grid gap-6 border-t border-sidebar-border pt-6 sm:grid-cols-2"><div><p className="text-xs text-[#91A0AF]">Billing cycle</p><p data-testid="text-billing-cycle" className="mt-1 font-semibold capitalize">{data.billingCycle}</p></div><div><p className="text-xs text-[#91A0AF]">Recurring amount</p><p data-testid="text-recurring-amount" className="mt-1 font-semibold">{formatMoney(billingAmount)} <span className="text-xs font-normal text-[#91A0AF]">/{data.billingCycle === 'annual' ? 'year' : 'month'}</span></p></div></div></div>
      <div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-sm sm:p-9"><p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Important dates</p><div className="mt-7 space-y-6"><DateDetail icon={CalendarDays} label="Next billing date" value={data.nextBillingDate} /><DateDetail icon={Receipt} label="Renewal date" value={data.renewalDate} /><DateDetail icon={Check} label="Last payment received" value={data.lastPaymentDate} /></div></div>
    </section>
    <section className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><div className="rounded-2xl border border-card-border bg-card p-7 shadow-sm"><p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Financial notes</p><div className="mt-6 space-y-5"><div><p className="text-sm text-muted-foreground">Security deposit</p><p data-testid="text-deposit-amount" className="mt-1 font-serif-app text-2xl">{formatMoney(data.depositAmount)}</p></div><div className="border-t border-border pt-5"><p className="text-xs leading-5 text-muted-foreground">Questions about a charge or need a copy of a receipt? Send the team a note and reference your plan name.</p><ButtonLink href="/support" variant="quiet" className="mt-4">Ask about billing <ChevronRight size={15} /></ButtonLink></div></div></div><div className="rounded-2xl border border-card-border bg-card p-7 shadow-sm"><p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Included in your desk</p><div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">{includedServices.length === 0 ? <EmptyInline icon={ShieldCheck} title="No services listed" detail="Contact the Paper Street team to confirm your membership inclusions." /> : includedServices.map((service, index) => <div key={`${service}-${index}`} data-testid={`text-included-service-${index}`} className="flex items-start gap-3 text-sm"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCEBE0] text-[#35624C]"><Check size={12} strokeWidth={3} /></span><span>{service}</span></div>)}</div></div></section>
  </div>;
}

function DateDetail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-[#80652D]"><Icon size={16} /></span><div><p className="text-xs text-muted-foreground">{label}</p><p data-testid={`text-date-${label.toLowerCase().replaceAll(' ', '-')}`} className="mt-1 text-sm font-semibold">{formatDate(value)}</p></div></div>;
}

function PageIntro({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return <div className="max-w-2xl"><p className="font-mono-app text-[10px] uppercase tracking-[0.22em] text-[#96722C]">{eyebrow}</p><h1 className="mt-3 font-serif-app text-4xl tracking-[-0.05em] sm:text-5xl">{title}</h1><p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{detail}</p></div>;
}

function Documents() {
  const documents = useGetPortalDocuments<PortalDocument[]>();
  const [filter, setFilter] = useState('All');
  if (documents.isLoading) return <div className="space-y-6"><SkeletonBlock className="h-36" /><SkeletonBlock className="h-[470px]" /></div>;
  if (documents.isError) return <QueryError message={displayError(documents.error)} onRetry={() => void documents.refetch()} />;
  const items: PortalDocument[] = (documents.data as PortalDocument[] | undefined) || [];
  const categories = ['All', ...Array.from(new Set(items.map((doc) => doc.category)))];
  const filtered = filter === 'All' ? items : items.filter((doc) => doc.category === filter);
  return <div className="animate-paper-rise space-y-8"><PageIntro eyebrow="Member account / 02" title="Documents" detail="Your agreements, receipts, and business records — held here for easy reference." /><div className="flex flex-wrap items-center gap-2 border-b border-border pb-5">{categories.map((category) => <button type="button" key={category} onClick={() => setFilter(category)} data-testid={`button-filter-${category.toLowerCase().replaceAll(' ', '-')}`} className={`focus-ring rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${filter === category ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{category}</button>)}<span className="ml-auto font-mono-app text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{items.length} {items.length === 1 ? 'record' : 'records'}</span></div>{items.length === 0 ? <EmptyDocuments /> : filtered.length === 0 ? <EmptyInline icon={FolderOpen} title="No documents in this category" detail="Choose another category to see your available records." /> : <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm"><div className="hidden grid-cols-[1.5fr_.7fr_.7fr_auto] gap-4 border-b border-border bg-secondary/60 px-6 py-4 font-mono-app text-[9px] uppercase tracking-[0.17em] text-muted-foreground sm:grid"><span>Document</span><span>Category</span><span>Status</span><span> </span></div>{filtered.map((doc) => <DocumentRow key={doc.id} doc={doc} />)}</div>}</div>;
}

function DocumentRow({ doc }: { doc: PortalDocument }) {
  return <div data-testid={`row-document-${doc.id}`} className="grid gap-4 border-b border-border px-5 py-5 last:border-0 sm:grid-cols-[1.5fr_.7fr_.7fr_auto] sm:items-center sm:gap-4 sm:px-6"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8D7AC] text-primary"><FileText size={18} /></span><div className="min-w-0"><p data-testid={`text-document-name-${doc.id}`} className="text-sm font-semibold">{doc.name}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{doc.description}</p><p className="mt-2 font-mono-app text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:hidden">Updated {formatDate(doc.updatedDate)}</p></div></div><div className="pl-[52px] text-xs text-muted-foreground sm:pl-0">{doc.category}</div><div className="pl-[52px] sm:pl-0"><StatusPill status={doc.status} /></div><div className="pl-[52px] sm:pl-0">{doc.downloadUrl ? <a href={doc.downloadUrl} target="_blank" rel="noreferrer" data-testid={`link-download-document-${doc.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary"><Download size={14} /> Download</a> : <Link href="/support" data-testid={`link-request-document-${doc.id}`} className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"><Mail size={14} /> Request copy</Link>}</div></div>;
}

function EmptyDocuments() {
  return <div data-testid="empty-documents-state" className="rounded-[1.5rem] border border-dashed border-border bg-card px-6 py-16 text-center shadow-sm"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-[#80652D]"><FolderOpen size={24} /></div><h2 className="mt-5 font-serif-app text-2xl tracking-[-0.03em]">Your document shelf is empty</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">There are no records attached to your member account yet. If you expected an agreement or receipt, ask the Paper Street team to add it here.</p><ButtonLink href="/support" variant="quiet" className="mt-6">Request a document <Mail size={15} /></ButtonLink></div>;
}

function Support() {
  const requests: { icon: LucideIcon; title: string; detail: string; subject: string }[] = [
    { icon: Mail, title: 'Mail & address', detail: 'Forwarding, collection, or a change to your business address.', subject: 'Member support: mail and address' },
    { icon: Building2, title: 'Workspace help', detail: 'Book a day, ask about a room, or plan your next visit.', subject: 'Member support: workspace' },
    { icon: Banknote, title: 'Billing question', detail: 'A receipt, charge, renewal, or plan detail to clarify.', subject: 'Member support: billing' },
  ];
  return <div className="animate-paper-rise space-y-8"><PageIntro eyebrow="Paper Street / Member care" title="Support" detail="A good operating desk includes a human who knows where to look. Tell us what you need and we will take it from there." /><section className="grid gap-4 lg:grid-cols-3">{requests.map(({ icon: Icon, title, detail, subject }) => <a key={title} href={`mailto:hello@paperstreet.co.ke?subject=${encodeURIComponent(subject)}`} data-testid={`link-support-${title.toLowerCase().replaceAll(' ', '-')}`} className="focus-ring group rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8D7AC] text-primary"><Icon size={20} /></span><div className="mt-7 flex items-start justify-between gap-3"><h2 className="font-serif-app text-xl">{title}</h2><ArrowUpRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p><span className="mt-6 block text-xs font-semibold text-[#80652D]">Email the team</span></a>)}</section><section className="grid gap-6 rounded-[1.5rem] bg-primary p-7 text-primary-foreground sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-[#C2CCD5]">Direct line</p><h2 className="mt-3 font-serif-app text-3xl tracking-[-0.04em]">We are close by.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#C2CCD5]">For anything time-sensitive, call the front desk during working hours. For a written trail, email works best.</p></div><div className="flex flex-col items-start gap-3 lg:items-end"><a href="tel:+254709123456" data-testid="link-call-support" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-primary hover:bg-[#E2C889]"><Headphones size={16} /> +254 709 123 456</a><a href="mailto:hello@paperstreet.co.ke" data-testid="link-email-support" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[#E8D7AC] hover:underline"><Mail size={15} /> hello@paperstreet.co.ke</a></div></section><p className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 size={14} /> Team hours: Monday–Friday, 8:30am–5:30pm EAT.</p></div>;
}

function Profile() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  if (!isLoaded) return <div className="space-y-6"><SkeletonBlock className="h-44" /><SkeletonBlock className="h-80" /></div>;
  const email = user?.primaryEmailAddress?.emailAddress || 'No primary email on file';
  const name = user?.fullName || user?.firstName || 'Paper Street member';
  const handleSignOut = () => {
    if (window.confirm('Sign out of your Paper Street member portal?')) void signOut({ redirectUrl: basePath || '/' });
  };
  return <div className="animate-paper-rise space-y-8"><PageIntro eyebrow="Member account / 03" title="Profile" detail="The identity and contact details connected to your Paper Street account." /><section className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]"><div className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground sm:p-9"><span data-testid="img-profile-avatar" className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-accent font-serif-app text-3xl font-bold text-primary">{initials(name)}</span><h2 data-testid="text-profile-name" className="mt-7 font-serif-app text-3xl tracking-[-0.04em]">{name}</h2><p data-testid="text-profile-email" className="mt-2 break-all text-sm text-[#C2CCD5]">{email}</p><div className="mt-8 border-t border-sidebar-border pt-5"><p className="font-mono-app text-[9px] uppercase tracking-[0.16em] text-[#91A0AF]">Account status</p><p className="mt-2 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-[#76B38A]" /> Authenticated member</p></div></div><div className="rounded-[1.5rem] border border-card-border bg-card p-7 shadow-sm sm:p-9"><div className="flex items-start justify-between gap-4"><div><p className="font-mono-app text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Identity details</p><h2 className="mt-2 font-serif-app text-2xl">Your account</h2></div><ShieldCheck className="text-[#96722C]" size={22} /></div><div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2"><ProfileField label="Full name" value={user?.fullName || user?.firstName || 'Not provided'} testId="text-account-full-name" /><ProfileField label="Primary email" value={email} testId="text-account-email" /><ProfileField label="Email verification" value={user?.primaryEmailAddress?.verification?.status === 'verified' ? 'Verified' : 'Check your inbox'} testId="text-account-verification" /><ProfileField label="Member since" value={user?.createdAt ? formatDate(user.createdAt.toISOString()) : 'Not available'} testId="text-account-created" /></div><div className="mt-9 border-t border-border pt-6"><p className="text-xs leading-5 text-muted-foreground">To update your identity details or email, use your Clerk account settings or contact the Paper Street team for help.</p><div className="mt-5 flex flex-wrap gap-3"><a href="mailto:hello@paperstreet.co.ke?subject=Update%20my%20member%20details" data-testid="link-update-profile" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-[#1B3658]"><Mail size={14} /> Request an update</a><button type="button" onClick={handleSignOut} data-testid="button-profile-sign-out" className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold hover:bg-secondary"><LogOut size={14} /> Sign out</button></div></div></div></section></div>;
}

function ProfileField({ label, value, testId }: { label: string; value: string; testId: string }) {
  return <div><p className="text-xs text-muted-foreground">{label}</p><p data-testid={testId} className="mt-1 break-words text-sm font-semibold">{value}</p></div>;
}

function Authenticated({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <LoadingScreen />;
  if (!isSignedIn) return <Redirect to="/" />;
  return <PortalShell>{children}</PortalShell>;
}

function HomeRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (isLoaded && isSignedIn) setLocation('/dashboard');
  }, [isLoaded, isSignedIn, setLocation]);
  if (!isLoaded) return <LoadingScreen />;
  return isSignedIn ? <LoadingScreen label="Opening your member desk" /> : <PublicHome />;
}

function SignInPage() {
  return <div className="paper-grain flex min-h-[100dvh] items-center justify-center bg-background px-4 py-8"><SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} /></div>;
}

function SignUpPage() {
  return <div className="paper-grain flex min-h-[100dvh] items-center justify-center bg-background px-4 py-8"><SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} /></div>;
}

function PortalRouter() {
  return <Switch>
    <Route path="/" component={HomeRoute} />
    <Route path="/sign-in/*?" component={SignInPage} />
    <Route path="/sign-up/*?" component={SignUpPage} />
    <Route path="/dashboard"><Authenticated><Dashboard /></Authenticated></Route>
    <Route path="/membership"><Authenticated><Membership /></Authenticated></Route>
    <Route path="/documents"><Authenticated><Documents /></Authenticated></Route>
    <Route path="/support"><Authenticated><Support /></Authenticated></Route>
    <Route path="/profile"><Authenticated><Profile /></Authenticated></Route>
    <Route><NotFound /></Route>
  </Switch>;
}

function NotFound() {
  return <FullScreenMessage eyebrow="404 / Paper Street" title="That page is not on this floor." detail="The link may be out of date, but your member desk is still right here." action={<ButtonLink href="/dashboard">Return to overview <Home size={15} /></ButtonLink>} />;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();
  return <ClerkProvider publishableKey={clerkPubKey} proxyUrl={clerkProxyUrl} appearance={clerkAppearance} signInUrl={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} localization={{ signIn: { start: { title: 'Welcome back', subtitle: 'Sign in to your Paper Street member desk' } }, signUp: { start: { title: 'Join Paper Street', subtitle: 'Create your member account to get started' } } }} routerPush={(to) => setLocation(stripBase(to))} routerReplace={(to) => setLocation(stripBase(to), { replace: true })}><QueryClientProvider client={queryClient}><PortalRouter /></QueryClientProvider></ClerkProvider>;
}

function App() {
  return <ErrorBoundary><TooltipProvider><WouterRouter base={basePath}><ClerkProviderWithRoutes /></WouterRouter><Toaster /></TooltipProvider></ErrorBoundary>;
}

export default App;