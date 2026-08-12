import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'wouter'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&q=80',
    eyebrow: 'Business Presence Platform',
    heading: (
      <>
        Establish Your<br />
        Business Presence<br />
        <span className="text-gold italic">Anywhere.</span>
      </>
    ),
    body: 'Professional business addresses, mail handling, and meeting rooms in prime locations — without the cost of a traditional office lease.',
    primary: { label: 'Get Started', href: '/contact' },
    secondary: { label: 'Book Consultation', href: '/contact' },
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80',
    eyebrow: 'Prime Nairobi Addresses',
    heading: (
      <>
        A Prestigious Address<br />
        in the Heart of<br />
        <span className="text-gold italic">Nairobi.</span>
      </>
    ),
    body: 'Register your business at a professional Paper Street address in Kisumu from KES 4,200/month.',
    primary: { label: 'View Locations', href: '/locations' },
    secondary: { label: 'See Pricing', href: '/pricing' },
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&q=80',
    eyebrow: 'Meeting & Co-working',
    heading: (
      <>
        Professional Spaces<br />
        That Make Every<br />
        <span className="text-gold italic">Meeting Count.</span>
      </>
    ),
    body: 'Fully equipped boardrooms and day offices available on demand. Impress clients without committing to a long-term lease.',
    primary: { label: 'Book a Room', href: '/contact' },
    secondary: { label: 'Explore Memberships', href: '/memberships' },
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&q=80',
    eyebrow: 'Mail & Reception',
    heading: (
      <>
        Your Mail Handled<br />
        With the Precision<br />
        <span className="text-gold italic">You Deserve.</span>
      </>
    ),
    body: 'Dedicated mail collection, scanning, forwarding, and a live receptionist to answer calls under your company name.',
    primary: { label: 'Learn More', href: '/memberships' },
    secondary: { label: 'Get Started', href: '/contact' },
  },
  {
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&auto=format&q=80',
    eyebrow: 'Built for Growth',
    heading: (
      <>
        Scale Your Business<br />
        Without Scaling<br />
        <span className="text-gold italic">Your Costs.</span>
      </>
    ),
    body: 'From sole traders to growing enterprises — Paper Street flexes with you. Start small, expand your presence as you grow.',
    primary: { label: 'View Plans', href: '/pricing' },
    secondary: { label: 'Talk to Us', href: '/contact' },
  },
]

const AUTOPLAY_MS = 5500

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
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

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, next])

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
    }),
  }

  const slide = slides[current]

  return (
    <section
      className="relative h-[100vh] min-h-[600px] flex items-center bg-[#0a0a0a] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images — crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <motion.img
            key={`image-${current}`}
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08, x: direction > 0 ? '-2%' : '2%', y: '-1%' }}
            animate={
              shouldReduceMotion
                ? { scale: 1 }
                : { scale: 1.16, x: direction > 0 ? '2%' : '-2%', y: '1%' }
            }
            transition={{ duration: AUTOPLAY_MS / 1000 + 1.4, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25"
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.92, 1, 0.92] }}
            transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
              animate={{ x: ['0%', '430%'] }}
              transition={{ duration: 8, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`content-${current}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="max-w-3xl pt-20"
          >
            <p className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-6">
              {slide.eyebrow}
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] font-heading">
              {slide.heading}
            </h1>

            <p className="text-base font-light text-white/70 max-w-md mt-6 leading-relaxed">
              {slide.body}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
              <Link
                href={slide.primary.href}
                className="bg-gold text-white px-8 py-3 text-sm tracking-wide uppercase font-medium hover:bg-gold-400 transition-colors"
              >
                {slide.primary.label}
              </Link>
              <Link
                href={slide.secondary.href}
                className="text-white underline underline-offset-4 text-sm hover:text-white/80 transition-colors"
              >
                {slide.secondary.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar: trust line + dots + arrows */}
        <div className="absolute bottom-10 left-0 right-0 px-6 md:px-12 flex items-center justify-between z-20">
          {/* Trust line */}
          <div className="flex items-center gap-4">
            <div className="w-12 border-t border-gold" />
            <span className="text-white/50 text-xs tracking-widest uppercase hidden sm:block">
              Trusted by 500+ businesses across Kenya
            </span>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-6 h-[3px] bg-gold'
                    : 'w-[3px] h-[3px] bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-[2px] bg-gold z-30"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
        />
      )}
    </section>
  )
}
