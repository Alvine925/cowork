import Image from 'next/image'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
          alt="Modern office building facade"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0F2D52]/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <span className="text-gold tracking-[0.4em] text-xs font-semibold uppercase block mb-6">
          Ready?
        </span>
        
        <h2 className="text-4xl md:text-5xl font-light font-[family-name:var(--font-heading)] text-white mb-4">
          Establish your business presence today.
        </h2>
        
        <p className="text-white/60 text-base font-light max-w-lg mx-auto mb-10">
          Join hundreds of companies that trust us with their professional image and infrastructure.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <Link 
            href="/contact"
            className="bg-gold text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-gold-400 transition-colors w-full sm:w-auto"
          >
            Get Started
          </Link>
          <Link 
            href="/contact"
            className="border border-white/40 text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-[#0F2D52] transition-colors w-full sm:w-auto"
          >
            Book Consultation
          </Link>
        </div>

        <p className="text-white/40 text-xs tracking-wide uppercase">
          No setup fees &middot; Cancel anytime &middot; 24-hour activation
        </p>

      </div>
    </section>
  )
}
