'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Star, ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-navy text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-900 opacity-90"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-gold"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">Premium Business Presence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              Establish Your Business Presence <span className="text-gold">Anywhere.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed text-balance">
              Professional business address, mail handling, and meeting rooms in prime locations — without the cost of a traditional office.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/pricing">
                <Button variant="gold" size="lg" className="w-full sm:w-auto text-base">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Book Consultation
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-6 mt-4 border-t border-white/10">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-navy bg-white/20 flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-bold">{String.fromCharCode(64+i)}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm font-medium text-white/80">Trusted by 500+ businesses</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-navy-900/50 border border-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format"
              alt="Premium office interior with professional design"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-gold fill-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm md:text-base">Westlands Business Park</h4>
                  <p className="text-xs md:text-sm text-dark-gray/70">Waiyaki Way, Nairobi • Premium Address</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  )
}
