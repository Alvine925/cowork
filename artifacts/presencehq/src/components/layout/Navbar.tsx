import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const MEMBERSHIPS = [
  { name: 'Virtual Office', href: '/services/virtual-office' },
  { name: 'Business Address', href: '/services/business-address' },
  { name: 'Mail Handling', href: '/services/mail-handling' },
  { name: 'Mail Forwarding', href: '/services/mail-forwarding' },
  { name: 'Meeting Rooms', href: '/services/meeting-rooms' },
  { name: 'Hot Desk', href: '/services/hot-desk' },
  { name: 'Dedicated Desk', href: '/services/dedicated-desk' },
  { name: 'Reception Services', href: '/services/reception-services' },
  { name: 'Business Expansion', href: '/services/business-expansion' },
  { name: 'Company Registration', href: '/services/company-registration' },
]

const LOCATIONS = [
  { name: 'Nairobi', href: '/locations/nairobi' },
  { name: 'Mombasa', href: '/locations/mombasa' },
  { name: 'Kisumu', href: '/locations/kisumu' },
  { name: 'Nakuru', href: '/locations/nakuru' },
  { name: 'Eldoret', href: '/locations/eldoret' },
]

const MOBILE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Memberships', href: '/services' },
  { label: 'Locations', href: '/locations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [location] = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
    setActiveDropdown(null)
  }, [location])

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const isHome = location === '/'
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
    'text-[11px] font-medium uppercase tracking-widest hover:text-gold transition-colors',
    solidNav ? 'text-navy' : 'text-white'
  )

  return (
    <>
      <header className={navCls}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className={logoCls}>PAPER STREET</Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={linkCls}>Home</Link>

            {/* Memberships dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('memberships')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={cn(linkCls, 'flex items-center gap-1 py-2')}>
                Memberships <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'memberships' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white text-navy border-t border-gray-100 px-12 py-10 grid grid-cols-3 gap-x-10 gap-y-5 shadow-xl shadow-black/5"
                  >
                    {MEMBERSHIPS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="text-[12px] font-medium text-navy/70 hover:text-navy transition-colors block border-l border-gold/60 pl-3 py-0.5 leading-snug"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locations dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('locations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={cn(linkCls, 'flex items-center gap-1 py-2')}>
                Locations <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'locations' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white text-navy border-t border-gray-100 px-8 py-7 flex flex-col gap-4 shadow-xl shadow-black/5"
                  >
                    {LOCATIONS.map((loc) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        className="text-[12px] font-medium text-navy/70 hover:text-navy transition-colors block border-l border-gold/60 pl-3 py-0.5"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className={linkCls}>Pricing</Link>
            <Link href="/about" className={linkCls}>About</Link>
            <Link href="/blog" className={linkCls}>Insights</Link>
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/login"
              className={cn(
                'text-[11px] font-medium uppercase tracking-widest px-5 py-2 border transition-colors',
                solidNav
                  ? 'border-navy text-navy hover:bg-navy hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-navy'
              )}
            >
              Log in
            </Link>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-gray-100">
                <span className="text-sm font-bold tracking-[0.2em] uppercase font-heading text-navy">Menu</span>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                  <X className="w-5 h-5 text-navy/60" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-7 py-8 flex flex-col gap-1">
                {MOBILE_LINKS.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-3 text-sm font-medium text-navy hover:text-gold transition-colors border-b border-gray-50 last:border-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="px-7 pb-10">
                <Link
                  href="/login"
                  className="mb-3 block border border-navy text-center text-xs font-semibold uppercase tracking-widest text-navy py-3.5 hover:bg-navy hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/contact"
                  className="block text-center bg-navy text-white text-xs font-semibold uppercase tracking-widest py-3.5 hover:bg-navy-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
