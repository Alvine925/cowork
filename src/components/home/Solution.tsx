'use client'

import { motion } from 'framer-motion'

export function Solution() {
  return (
    <section className="bg-white py-0">
      <div className="relative w-full min-h-[420px] md:min-h-[480px] overflow-hidden flex items-center bg-black">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
          alt="Paper Street Kisumu workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Neutral dark overlay - Zero blue tint */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto px-6 md:px-12 py-16">
            <div className="max-w-2xl text-white">
              <span className="text-gold tracking-[0.25em] text-[11px] font-semibold uppercase block mb-3 font-mono">
                Our Solution
              </span>
              <h2 className="text-2xl md:text-4xl font-light font-heading leading-tight">
                The credibility you need to win clients and close deals.
              </h2>
              <p className="text-white/80 font-light mt-4 text-xs md:text-sm leading-relaxed">
                Start with a virtual office or a registered business address in Kisumu CBD. Drop in on a day pass when you need a desk. Meeting rooms and dedicated desks are in the same hub — without a traditional office lease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
