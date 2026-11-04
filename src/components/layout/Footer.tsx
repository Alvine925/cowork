'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/portal')) {
    return null
  }
  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-32 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 select-none pointer-events-none">
        <span className="text-[120px] md:text-[200px] font-bold text-white/5 tracking-tighter leading-none font-heading">
          PAPER STREET
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] uppercase text-white font-heading">
            PAPER STREET
          </Link>
          <nav className="flex flex-wrap items-center gap-6 md:gap-10">
            {[
              ['Services', '/services'],
              ['Locations', '/locations'],
              ['Pricing', '/pricing'],
              ['Book', '/book'],
              ['About', '/about'],
              ['FAQ', '/faq'],
              ['Insights', '/blog'],
              ['Contact', '/contact'],
            ].map(([item, href]) => (
              <Link
                key={item}
                href={href}
                className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 my-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 mb-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Priority services</h4>
            <Link href="/services/virtual-office" className="text-xs text-white/40 hover:text-white transition-colors">Virtual Office</Link>
            <Link href="/services/business-address" className="text-xs text-white/40 hover:text-white transition-colors">Business Address</Link>
            <Link href="/services/hot-desk" className="text-xs text-white/40 hover:text-white transition-colors">Day Pass</Link>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mt-4 mb-1">Also in the hub</h4>
            <Link href="/services/meeting-rooms" className="text-xs text-white/40 hover:text-white transition-colors">Meeting Rooms</Link>
            <Link href="/services/dedicated-desk" className="text-xs text-white/40 hover:text-white transition-colors">Dedicated Desk</Link>
            <Link href="/services" className="text-xs text-gold/80 hover:text-gold transition-colors mt-1">View All Services &rarr;</Link>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mt-4 mb-1">Managed Offices</h4>
            <Link href="/office-management" className="text-xs text-white/40 hover:text-white transition-colors">Office Management</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Kisumu Hub</h4>
            <Link href="/coworking-space-kisumu" className="text-xs text-white/40 hover:text-white transition-colors">Coworking Space Kisumu</Link>
            <Link href="/virtual-office-kisumu" className="text-xs text-white/40 hover:text-white transition-colors">Virtual Office Kisumu</Link>
            <Link href="/private-offices-kisumu" className="text-xs text-white/40 hover:text-white transition-colors">Private Offices Kisumu</Link>
            <Link href="/meeting-rooms-kisumu" className="text-xs text-white/40 hover:text-white transition-colors">Meeting Rooms Kisumu</Link>
            <Link href="/business-address-kisumu" className="text-xs text-white/40 hover:text-white transition-colors">Business Address Kisumu</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Locations</h4>
            <Link href="/locations/kisumu" className="text-xs text-white hover:text-gold transition-colors font-medium">Kisumu (Open)</Link>
            <Link href="/locations/nairobi" className="text-xs text-white/30 hover:text-white/60">Nairobi (Coming Soon)</Link>
            <Link href="/locations/mombasa" className="text-xs text-white/30 hover:text-white/60">Mombasa (Coming Soon)</Link>
            <Link href="/locations/nakuru" className="text-xs text-white/30 hover:text-white/60">Nakuru (Coming Soon)</Link>
            <Link href="/locations/eldoret" className="text-xs text-white/30 hover:text-white/60">Eldoret (Coming Soon)</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Contact & Hub</h4>
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              Central Business District (CBD)<br />
              Kisumu, Kenya
            </p>
            <p className="text-xs text-white/40 mt-2">
              <a href="tel:0110486677" className="hover:text-white transition-colors">0110486677</a> &middot; <a href="https://wa.me/254110486677" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp</a>
            </p>
            <p className="text-xs text-white/40">hello@paperstreet.co.ke</p>
            <Link href="/quote/virtual-office" className="text-xs text-gold/80 hover:text-gold mt-2">Get a virtual office quote &rarr;</Link>
            <Link href="/book/hot-desk" className="text-xs text-white/40 hover:text-white">Book a day pass &rarr;</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Paper Street. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/20 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-xs text-white/20 hover:text-white transition-colors">Master Terms</Link>
            <Link href="/daily-booking-terms" className="text-xs text-white/20 hover:text-white transition-colors">Daily Booking Terms</Link>
            <Link href="/refund-policy" className="text-xs text-white/20 hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/cookie-policy" className="text-xs text-white/20 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
