'use client'

import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
          alt="Modern office building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <span className="text-gold tracking-[0.4em] text-xs font-semibold uppercase block mb-6">Ready?</span>

        <h2 className="text-4xl md:text-5xl font-light font-heading text-white mb-4">
          Establish your business presence today.
        </h2>

        <p className="text-white/60 text-base font-light max-w-lg mx-auto mb-10">
          Start with a Kisumu virtual office or business address, or book a day pass for today. Meeting rooms and dedicated desks are in the same hub.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <Link
            href="/quote/virtual-office"
            className="bg-gold text-navy px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-navy transition-colors w-full sm:w-auto text-center"
          >
            Get a Quote
          </Link>
          <Link
            href="/book/hot-desk"
            className="border border-white/40 text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-navy transition-colors w-full sm:w-auto text-center"
          >
            Book a Day Pass
          </Link>
        </div>

        <p className="text-white/40 text-xs tracking-wide uppercase">
          KYC required for address plans &middot; Day pass from KES 1,000 &middot; 24-hour activation after documents
        </p>
      </div>
    </section>
  )
}
