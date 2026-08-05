import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-10 border-t border-navy-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-1">
              Presence<span className="text-gold">HQ</span>
              <div className="w-1.5 h-1.5 bg-gold rounded-full mb-2 ml-0.5"></div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              The premium business presence platform for ambitious companies. Establish your professional address, manage mail, and access workspaces across prime locations.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold mb-2">Services</h4>
            <Link href="/services/virtual-office" className="text-white/70 hover:text-gold transition-colors text-sm">Virtual Office</Link>
            <Link href="/services/business-address" className="text-white/70 hover:text-gold transition-colors text-sm">Business Address</Link>
            <Link href="/services/mail-handling" className="text-white/70 hover:text-gold transition-colors text-sm">Mail Handling</Link>
            <Link href="/services/meeting-rooms" className="text-white/70 hover:text-gold transition-colors text-sm">Meeting Rooms</Link>
            <Link href="/services/company-registration" className="text-white/70 hover:text-gold transition-colors text-sm">Company Registration</Link>
            <Link href="/services" className="text-gold hover:text-gold-400 transition-colors text-sm font-semibold mt-2">View all services &rarr;</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold mb-2">Locations</h4>
            <Link href="/locations/nairobi" className="text-white/70 hover:text-gold transition-colors text-sm">Nairobi</Link>
            <Link href="/locations/mombasa" className="text-white/70 hover:text-gold transition-colors text-sm">Mombasa</Link>
            <Link href="/locations/kisumu" className="text-white/70 hover:text-gold transition-colors text-sm">Kisumu</Link>
            <Link href="/locations/nakuru" className="text-white/70 hover:text-gold transition-colors text-sm">Nakuru</Link>
            <Link href="/locations/eldoret" className="text-white/70 hover:text-gold transition-colors text-sm">Eldoret</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <div className="flex items-start gap-3 text-white/70 text-sm">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <span>Westlands Business Park<br />Waiyaki Way, Nairobi<br />Kenya</span>
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <a href="tel:+254700000000" className="hover:text-gold transition-colors">+254 700 000 000</a>
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <a href="mailto:hello@presencehq.com" className="hover:text-gold transition-colors">hello@presencehq.com</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} PresenceHQ. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
