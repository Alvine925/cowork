'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICES = [
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const isHome = pathname === '/'

  const navClasses = cn(
    'fixed top-0 w-full z-50 transition-all duration-500 border-b',
    isScrolled || !isHome || mobileMenuOpen
      ? 'bg-white border-gray-100 py-4 text-navy'
      : 'bg-transparent border-white/20 py-6 text-white'
  )

  const logoClasses = cn(
    'text-lg md:text-xl font-bold tracking-[0.2em] uppercase',
    isScrolled || !isHome || mobileMenuOpen ? 'text-navy' : 'text-white'
  )

  const linkClasses = cn(
    'text-xs font-medium uppercase tracking-widest hover:text-gold transition-colors',
    isScrolled || !isHome || mobileMenuOpen ? 'text-navy' : 'text-white'
  )

  return (
    <header className={navClasses}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className={logoClasses}>
          PRESENCEHQ
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link href="/" className={linkClasses}>
            Home
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={cn(linkClasses, "flex items-center gap-1 py-2")}>
              Services <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white text-navy border-t border-gray-100 p-12 grid grid-cols-3 gap-x-12 gap-y-6 shadow-2xl shadow-black/5"
                >
                  {SERVICES.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="text-sm font-medium text-navy/80 hover:text-navy transition-colors block border-l border-gold pl-4 py-1"
                    >
                      {service.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('locations')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={cn(linkClasses, "flex items-center gap-1 py-2")}>
              Locations <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'locations' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] bg-white text-navy border-t border-gray-100 p-8 flex flex-col gap-4 shadow-2xl shadow-black/5"
                >
                  {LOCATIONS.map((location) => (
                    <Link
                      key={location.href}
                      href={location.href}
                      className="text-sm font-medium text-navy/80 hover:text-navy transition-colors block border-l border-gold pl-4 py-1"
                    >
                      {location.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/pricing" className={linkClasses}>
            Pricing
          </Link>
          <Link href="/about" className={linkClasses}>
            About
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <Link href="/contact" className={cn(
            "text-xs font-medium uppercase tracking-widest px-6 py-2.5 border transition-colors",
            isScrolled || !isHome || mobileMenuOpen 
              ? "border-navy text-navy hover:bg-navy hover:text-white" 
              : "border-white text-white hover:bg-white hover:text-navy"
          )}>
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-navy" />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled || !isHome ? "text-navy" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              <Link href="/" className="text-2xl font-light text-navy tracking-widest uppercase hover:text-gold transition-colors">Home</Link>
              <Link href="/services" className="text-2xl font-light text-navy tracking-widest uppercase hover:text-gold transition-colors">Services</Link>
              <Link href="/locations" className="text-2xl font-light text-navy tracking-widest uppercase hover:text-gold transition-colors">Locations</Link>
              <Link href="/pricing" className="text-2xl font-light text-navy tracking-widest uppercase hover:text-gold transition-colors">Pricing</Link>
              <Link href="/about" className="text-2xl font-light text-navy tracking-widest uppercase hover:text-gold transition-colors">About</Link>
              <Link href="/contact" className="text-2xl font-light text-navy tracking-widest uppercase hover:text-gold transition-colors">Contact</Link>
              
              <Link href="/contact" className="mt-8 border border-navy text-navy hover:bg-navy hover:text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
