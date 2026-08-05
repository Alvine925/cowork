'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[600px] flex items-center bg-[#0a0a0a] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&q=80"
          alt="Professional business office"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="max-w-3xl pt-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-6"
          >
            Business Presence Platform
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] font-[family-name:var(--font-heading)]"
          >
            Establish Your<br />
            Business Presence<br />
            <span className="text-gold italic">Anywhere.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base font-light text-white/70 max-w-md mt-6 leading-relaxed"
          >
            Professional business addresses, mail handling, and meeting rooms in prime locations — without the cost of a traditional office lease.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12"
          >
            <Link 
              href="/contact"
              className="bg-gold text-white px-8 py-3 text-sm tracking-wide uppercase font-medium hover:bg-gold-400 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/contact"
              className="text-white underline underline-offset-4 text-sm hover:text-white/80 transition-colors"
            >
              Book Consultation
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom row absolute */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4"
        >
          <div className="w-12 border-t border-gold"></div>
          <span className="text-white/50 text-xs tracking-widest uppercase">
            Trusted by 500+ businesses across Kenya
          </span>
        </motion.div>
      </div>
    </section>
  )
}
