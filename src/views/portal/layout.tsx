'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Calendar,
  FolderOpen,
  Gift,
  Home,
  LifeBuoy,
  LogOut,
  Menu,
  MessageSquarePlus,
  Package,
  Receipt,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { usePortalAuth, type PortalType } from './auth-context';

function initials(name?: string | null) {
  return (name || 'PS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

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
    <div className="min-h-screen bg-[#fbfaf7] flex">
      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Clean Editorial Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#1c3227] px-7 py-8 text-white transition-transform duration-300 lg:translate-x-0 ${
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
        <header className="sticky top-0 z-30 h-16 border-b border-navy/10 bg-[#fbfaf7]/95 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
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

export function ProtectedPortalWrapper({ children, type }: { children: ReactNode; type: PortalType }) {
  const { user, loading } = usePortalAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(type === 'member' ? '/portal/member/login' : '/portal/client/login');
    }
  }, [loading, user, router, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center text-navy/60 font-mono text-xs uppercase tracking-widest">
        Loading session...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <PortalShellLayout type={type}>{children}</PortalShellLayout>;
}

export default PortalShellLayout;
