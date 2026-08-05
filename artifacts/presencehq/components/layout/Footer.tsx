import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-32 pb-12 overflow-hidden">
      {/* Decorative large background text */}
      <div className="absolute top-0 right-0 -translate-y-1/4 select-none pointer-events-none">
        <span className="text-[120px] md:text-[200px] font-bold text-white/5 tracking-tighter leading-none">
          PRESENCEHQ
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] uppercase text-white">
            PRESENCEHQ
          </Link>
          <nav className="flex flex-wrap items-center gap-6 md:gap-10">
            {['Services', 'Locations', 'Pricing', 'About', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`}
                className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 my-16"></div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mb-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Services</h4>
            <Link href="/services/virtual-office" className="text-xs text-white/40 hover:text-white transition-colors">Virtual Office</Link>
            <Link href="/services/business-address" className="text-xs text-white/40 hover:text-white transition-colors">Business Address</Link>
            <Link href="/services/mail-handling" className="text-xs text-white/40 hover:text-white transition-colors">Mail Handling</Link>
            <Link href="/services/meeting-rooms" className="text-xs text-white/40 hover:text-white transition-colors">Meeting Rooms</Link>
            <Link href="/services" className="text-xs text-white/40 hover:text-white transition-colors">View All Services</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Locations</h4>
            <Link href="/locations/nairobi" className="text-xs text-white/40 hover:text-white transition-colors">Nairobi</Link>
            <Link href="/locations/mombasa" className="text-xs text-white/40 hover:text-white transition-colors">Mombasa</Link>
            <Link href="/locations/kisumu" className="text-xs text-white/40 hover:text-white transition-colors">Kisumu</Link>
            <Link href="/locations/nakuru" className="text-xs text-white/40 hover:text-white transition-colors">Nakuru</Link>
            <Link href="/locations/eldoret" className="text-xs text-white/40 hover:text-white transition-colors">Eldoret</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-2">Contact</h4>
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              Westlands Business Park, Waiyaki Way<br/>
              Nairobi, Kenya
            </p>
            <p className="text-xs text-white/40 mt-2">+254 700 000 000</p>
            <p className="text-xs text-white/40">hello@presencehq.com</p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} PresenceHQ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/20 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/20 hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies" className="text-xs text-white/20 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
