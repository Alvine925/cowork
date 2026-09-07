'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&q=80',
    eyebrow: 'Virtual Office · Kisumu CBD',
    heading: (
      <>
        A commercial address, mail handling, and meeting hours —{' '}
        <span className="text-gold italic">without a lease.</span>
      </>
    ),
    body: 'Paper Street’s flagship virtual office gives you a verifiable Kisumu presence for registration, banking, and client visits.',
    primary: { label: 'Get a Virtual Office Quote', href: '/quote/virtual-office' },
    secondary: { label: 'See Pricing', href: '/pricing' },
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80',
    eyebrow: 'Business Address',
    heading: (
      <>
        Register and bank from a professional address in{' '}
        <span className="text-gold italic">Kisumu.</span>
      </>
    ),
    body: 'Use our commercial address for BRS eCitizen, KRA, and KYC — mail receiving included, without renting an office.',
    primary: { label: 'Get an Address Quote', href: '/quote/business-address' },
    secondary: { label: 'How It Works', href: '/services/business-address' },
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&q=80',
    eyebrow: 'Day Pass',
    heading: (
      <>
        Work from Kisumu CBD for a half day or a{' '}
        <span className="text-gold italic">full day.</span>
      </>
    ),
    body: 'Generator backup, dual-carrier fibre, and a quiet desk when you need to be on site. Meeting rooms and dedicated desks are available in the same hub.',
    primary: { label: 'Book a Day Pass', href: '/book/hot-desk' },
    secondary: { label: 'View the Hub', href: '/locations/kisumu' },
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&q=80',
    eyebrow: 'Also in the hub',
    heading: (
      <>
        Book a boardroom or keep a dedicated{' '}
        <span className="text-gold italic">desk.</span>
      </>
    ),
    body: 'Hourly meeting rooms and resident desks sit alongside the virtual office — use them when you need the space, not as the starting point.',
    primary: { label: 'Book a Meeting Room', href: '/book/meeting-rooms' },
    secondary: { label: 'Dedicated Desk Quote', href: '/quote/dedicated-desk' },
  },
  {
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&auto=format&q=80',
    eyebrow: 'Mail & reception',
    heading: (
      <>
        Your mail scanned, held, or forwarded with{' '}
        <span className="text-gold italic">front-desk care.</span>
      </>
    ),
    body: 'Mail handling is built into the virtual office plan. Add forwarding, extra meeting hours, or drop-in coworking when you need them.',
    primary: { label: 'Virtual Office Details', href: '/services/virtual-office' },
    secondary: { label: 'Talk to Us', href: '/contact' },
  },
]

const AUTOPLAY_MS = 4500

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const shouldReduceMotion = useReducedMotion()

  const go = useCallback(
    (index: number, dir: number) => {
      setDirection(dir)
      setCurrent((index + slides.length) % slides.length)
    },
    []
  )

  const next = useCallback(() => go(current + 1, 1), [current, go])
  const prev = useCallback(() => go(current - 1, -1), [current, go])

  // Continuous Automatic Carousel Transitions
  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next])

  const slide = slides[current]

  return (
    <section
      aria-label="Hero carousel"
      className="relative min-h-[92vh] flex items-center bg-black text-white overflow-hidden"
    >
      {/* Background Image Carousel with smooth crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            {/* Natural Neutral Overlays - Zero Blue Tint */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Slide Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Eyebrow badge */}
              <span className="font-mono text-gold tracking-[0.25em] text-[11px] font-semibold uppercase block mb-4">
                {slide.eyebrow}
              </span>

              {/* Headline */}
              <h1 className="text-3xl md:text-5xl font-light font-heading leading-tight tracking-tight mb-5">
                {slide.heading}
              </h1>

              {/* Body */}
              <p className="text-white/80 text-sm md:text-base font-light max-w-xl mb-8 leading-relaxed">
                {slide.body}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={slide.primary.href}
                  className="bg-gold text-navy px-6 py-3 text-[11px] tracking-widest font-bold hover:bg-white hover:text-navy transition-colors uppercase text-center"
                >
                  {slide.primary.label}
                </Link>
                <Link
                  href={slide.secondary.href}
                  className="border border-white/40 text-white px-6 py-3 text-[11px] tracking-widest font-semibold hover:border-white hover:bg-white/10 transition-colors uppercase text-center"
                >
                  {slide.secondary.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom controls: slide dots + arrows */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  i === current ? 'w-8 bg-gold' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="w-10 h-10 border border-white/25 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="w-10 h-10 border border-white/25 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
