'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const PRIORITY_SERVICES = [
  { name: 'Virtual Office', href: '/services/virtual-office', note: 'Address, mail scanning & meeting hours' },
  { name: 'Business Address', href: '/services/business-address', note: 'Registered office for BRS, KRA & banks' },
  { name: 'Day Pass', href: '/services/hot-desk', note: 'Half-day or full-day desk in Kisumu CBD' },
]

const HUB_SERVICES = [
  { name: 'Meeting Rooms', href: '/services/meeting-rooms' },
  { name: 'Dedicated Desk', href: '/services/dedicated-desk' },
  { name: 'Mail Handling', href: '/services/addons/mail-handling' },
  { name: 'Mail Forwarding', href: '/services/addons/mail-forwarding' },
  { name: 'All Services', href: '/services' },
]

const LOCATIONS = [
  { name: 'Kisumu (Open)', href: '/locations/kisumu' },
  { name: 'Nairobi (Coming Soon)', href: '/locations/nairobi' },
  { name: 'Mombasa (Coming Soon)', href: '/locations/mombasa' },
  { name: 'Nakuru (Coming Soon)', href: '/locations/nakuru' },
  { name: 'Eldoret (Coming Soon)', href: '/locations/eldoret' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [authUser, setAuthUser] = useState<any>(null)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data?.user || null)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user || null)
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  if (pathname?.startsWith('/portal')) {
    return null
  }

  const isHome = pathname === '/'
  const solidNav = isScrolled || !isHome || sidebarOpen

  const navCls = cn(
    'fixed top-0 w-full z-50 transition-all duration-500 border-b',
    solidNav ? 'bg-white border-gray-100 py-3.5' : 'bg-transparent border-white/20 py-5'
  )
  const logoCls = cn(
    'text-base font-bold tracking-[0.2em] uppercase font-heading',
    solidNav ? 'text-navy' : 'text-white'
  )
  const linkCls = cn(
    'text-[11px] font-medium uppercase tracking-widest transition-colors',
    solidNav ? 'text-navy hover:text-navy-400' : 'text-white hover:text-gold'
  )

  const quoteBtn = cn(
    'text-[11px] font-medium uppercase tracking-widest px-4 py-2 border transition-colors',
    solidNav
      ? 'border-navy/30 text-navy hover:bg-navy/5'
      : 'border-white/40 text-white hover:bg-white/10'
  )
  const dayPassBtn = cn(
    'text-[11px] font-semibold uppercase tracking-widest px-5 py-2 transition-colors',
    solidNav
      ? 'bg-navy text-white hover:bg-navy-600'
      : 'bg-gold text-navy font-bold hover:bg-gold-400'
  )

  return (
    <>
      <header className={navCls}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          <Link href="/" className={logoCls}>PAPER STREET</Link>

          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" className={linkCls}>Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={cn(linkCls, 'flex items-center gap-1 py-2')}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown((v) => (v === 'services' ? null : 'services'))}
              >
                Services <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-white text-navy border-t border-gray-100 px-10 py-9 grid grid-cols-2 gap-x-12 gap-y-2 shadow-xl shadow-black/5"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-semibold mb-4">
                        Priority
                      </p>
                      <div className="flex flex-col gap-4">
                        {PRIORITY_SERVICES.map((s) => (
                          <Link key={s.href} href={s.href} className="block group">
                            <span className="text-[13px] font-medium text-navy group-hover:text-navy/70">
                              {s.name}
                            </span>
                            <span className="block text-[11px] text-navy/45 mt-0.5 leading-snug">
                              {s.note}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-semibold mb-4">
                        Also in the hub
                      </p>
                      <div className="flex flex-col gap-3">
                        {HUB_SERVICES.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="text-[12px] font-medium text-navy/70 hover:text-navy border-l border-navy/20 pl-3 py-0.5"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('locations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={cn(linkCls, 'flex items-center gap-1 py-2')}
                aria-expanded={activeDropdown === 'locations'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown((v) => (v === 'locations' ? null : 'locations'))}
              >
                Locations <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'locations' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white text-navy border-t border-gray-100 px-8 py-7 flex flex-col gap-4 shadow-xl shadow-black/5"
                  >
                    {LOCATIONS.map((loc, i) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        className={cn(
                          'text-[12px] font-medium hover:text-navy transition-colors block border-l pl-3 py-0.5',
                          i === 0
                            ? 'text-navy border-gold font-semibold'
                            : 'text-navy/70 border-navy/20'
                        )}
                      >
                        {loc.name}
                      </Link>
                    ))}
                    <Link
                      href="/locations"
                      className="text-[11px] uppercase tracking-wider text-navy/50 hover:text-navy pt-1"
                    >
                      All locations &amp; waitlist
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className={linkCls}>Pricing</Link>
            <Link href="/about" className={linkCls}>About</Link>
            <Link href="/faq" className={linkCls}>FAQ</Link>
            <Link href="/blog" className={linkCls}>Insights</Link>
            <Link href="/contact" className={linkCls}>Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {authUser ? (
              <Link
                href="/portal/client/dashboard"
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-widest px-4 py-2 border transition-colors flex items-center gap-2',
                  solidNav
                    ? 'border-navy bg-navy text-white hover:bg-navy-700'
                    : 'border-white bg-white/10 text-white hover:bg-white/20'
                )}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Portal Desk
              </Link>
            ) : (
              <Link href="/portal/client/login" className={quoteBtn}>
                Log in
              </Link>
            )}
            <Link href="/quote/virtual-office" className={quoteBtn}>
              Get Quote
            </Link>
            <Link href="/book/hot-desk" className={dayPassBtn}>
              Day Pass
            </Link>
          </div>

          <button
            className="lg:hidden p-2 relative z-50"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {sidebarOpen
              ? <X className="w-5 h-5 text-navy" />
              : <Menu className={cn('w-5 h-5', solidNav ? 'text-navy' : 'text-white')} />
            }
          </button>
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.div
              key="drawer"
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-gray-100">
                <span className="text-sm font-bold tracking-[0.2em] uppercase font-heading text-navy">Menu</span>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                  <X className="w-5 h-5 text-navy/60" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-7 py-6 flex flex-col">
                <Link href="/" className="block py-3 text-sm font-medium text-navy border-b border-gray-50">
                  Home
                </Link>
                <p className="pt-4 pb-1 text-[10px] uppercase tracking-[0.2em] text-navy/40 font-semibold">
                  Priority
                </p>
                {PRIORITY_SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2.5 text-sm font-medium text-navy"
                  >
                    {item.name}
                  </Link>
                ))}
                <p className="pt-4 pb-1 text-[10px] uppercase tracking-[0.2em] text-navy/40 font-semibold">
                  Also in the hub
                </p>
                {HUB_SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm font-medium text-navy/70"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 border-t border-gray-50 pt-2">
                  {[
                    { label: 'Pricing', href: '/pricing' },
                    { label: 'Locations', href: '/locations' },
                    { label: 'About', href: '/about' },
                    { label: 'FAQ', href: '/faq' },
                    { label: 'Insights', href: '/blog' },
                    { label: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-3 text-sm font-medium text-navy border-b border-gray-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="px-7 pb-10 space-y-2.5">
                <Link
                  href="/quote/virtual-office"
                  onClick={() => setSidebarOpen(false)}
                  className="block text-center border border-navy/30 text-navy text-xs font-semibold uppercase tracking-widest py-3 hover:bg-navy/5 transition-colors"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/book/hot-desk"
                  onClick={() => setSidebarOpen(false)}
                  className="block text-center bg-navy text-white text-xs font-semibold uppercase tracking-widest py-3.5 hover:bg-navy-700 transition-colors"
                >
                  Book a Day Pass
                </Link>
                {authUser ? (
                  <Link
                    href="/portal/client/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className="block bg-navy text-white text-center text-xs font-semibold uppercase tracking-widest py-3 hover:bg-navy-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Client Portal
                  </Link>
                ) : (
                  <Link
                    href="/portal/client/login"
                    onClick={() => setSidebarOpen(false)}
                    className="block border border-navy/30 text-center text-xs font-semibold uppercase tracking-widest text-navy py-3 hover:bg-navy/5 transition-colors"
                  >
                    Client &amp; Member Log in
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
