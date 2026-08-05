'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

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

  const isHome = pathname === '/'

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

  const navClasses = cn(
    'fixed top-0 w-full z-50 transition-all duration-300 border-b',
    isScrolled || !isHome
      ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm py-3 text-navy'
      : 'bg-transparent border-transparent py-5 text-white'
  )

  const logoClasses = cn(
    'text-2xl font-bold tracking-tight flex items-center gap-1',
    isScrolled || !isHome ? 'text-navy' : 'text-white'
  )

  return (
    <header className={navClasses}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className={logoClasses}>
          Presence<span className="text-gold">HQ</span>
          <div className="w-1.5 h-1.5 bg-gold rounded-full mb-2 ml-0.5"></div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-gold transition-colors">
            Home
          </Link>
          
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium hover:text-gold transition-colors py-2">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white text-navy shadow-lg border border-gray-100 rounded-lg p-6 grid grid-cols-2 gap-x-8 gap-y-4"
                >
                  {SERVICES.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="text-sm font-medium hover:text-gold transition-colors block p-2 rounded hover:bg-gray-50"
                    >
                      {service.name}
                    </Link>
                  ))}
                  <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
                    <Link href="/services" className="text-sm font-bold text-gold hover:text-gold-600 flex items-center gap-1">
                      View All Services &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('locations')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium hover:text-gold transition-colors py-2">
              Locations <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'locations' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white text-navy shadow-lg border border-gray-100 rounded-lg p-2 flex flex-col gap-1"
                >
                  {LOCATIONS.map((location) => (
                    <Link
                      key={location.href}
                      href={location.href}
                      className="text-sm font-medium hover:text-gold transition-colors block p-3 rounded hover:bg-gray-50"
                    >
                      {location.name}
                    </Link>
                  ))}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <Link href="/locations" className="text-sm font-bold text-gold hover:text-gold-600 flex items-center gap-1 p-2">
                      All Locations &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/pricing" className="text-sm font-medium hover:text-gold transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-gold transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-gold transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact">
            <Button variant={isScrolled || !isHome ? 'primary' : 'gold'}>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className={cn("w-6 h-6", isScrolled || !isHome ? "text-navy" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled || !isHome ? "text-navy" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white text-navy shadow-xl overflow-y-auto border-t"
          >
            <div className="flex flex-col p-6 gap-6 pb-32">
              <Link href="/" className="text-lg font-semibold">Home</Link>
              
              <div className="flex flex-col gap-3">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Services</div>
                {SERVICES.map((service) => (
                  <Link key={service.href} href={service.href} className="text-base">
                    {service.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Locations</div>
                {LOCATIONS.map((location) => (
                  <Link key={location.href} href={location.href} className="text-base">
                    {location.name}
                  </Link>
                ))}
              </div>

              <Link href="/pricing" className="text-lg font-semibold">Pricing</Link>
              <Link href="/industries" className="text-lg font-semibold">Industries</Link>
              <Link href="/about" className="text-lg font-semibold">About</Link>
              <Link href="/contact" className="text-lg font-semibold">Contact</Link>

              <Link href="/contact" className="mt-4">
                <Button className="w-full" size="lg">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
