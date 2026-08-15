import { useRef } from 'react'
import { Link } from 'wouter'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { ArrowRight, MapPin, CheckCircle2, Zap, Shield, Plus, Minus } from 'lucide-react'
import { CallToAction } from '@/components/home/CallToAction'

export interface LocationFaq {
  q: string
  a: string
}

export interface LocationConfig {
  city: string
  building: string
  street: string
  heroImage: string
  splitImage: string
  overlayImage: string
  tagline: string
  description: string
  marketIntro: string
  stats: { value: string; label: string; numeric?: number }[]
  reasons: string[]
  services: { num: string; title: string; desc: string }[]
  faqs: LocationFaq[]
}

/* ── Stagger container ── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeSlideUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const fadeSlideLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export function GenericLocationPage({ config }: { config: LocationConfig }) {
  /* Parallax hero */
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

  return (
    <>
      {/* ── 1. Full-bleed Parallax Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex flex-col overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src={config.heroImage}
            alt={config.city}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/88" />

        {/* city label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 flex items-center gap-3 px-8 md:px-16 pt-36"
        >
          <div className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
            {config.city}, Kenya
          </span>
        </motion.div>

        {/* title block — fades out on scroll */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mt-auto px-8 md:px-16 pb-20 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light font-heading text-white leading-[1.0] mb-6"
          >
            {config.building}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="text-white/65 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10"
          >
            {config.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors"
            >
              Claim This Address <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-white/35 text-white px-8 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-12 bg-white/20 origin-top"
          />
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mt-4">Scroll</span>
        </motion.div>
      </section>

      {/* ── 2. Split: Photo left | Dark text right ── */}
      <section className="flex flex-col lg:flex-row min-h-[70vh]">
        {/* photo half — clips in from left */}
        <motion.div
          variants={clipReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden"
        >
          <img
            src={config.splitImage}
            alt={`${config.city} office`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* text half */}
        <div className="w-full lg:w-1/2 bg-[#0A1F3A] flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeSlideLeft} className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">The Market</span>
            </motion.div>
            <motion.h2 variants={fadeSlideLeft} className="text-3xl md:text-4xl font-light font-heading text-white leading-tight mb-6 max-w-md">
              {config.tagline}
            </motion.h2>
            <motion.p variants={fadeSlideLeft} className="text-white/55 text-base font-light leading-relaxed max-w-md">
              {config.marketIntro}
            </motion.p>
            <motion.div variants={fadeSlideLeft} className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <p className="text-white/40 text-sm">{config.building} · {config.street}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Full-bleed overlay: Why [City] ── */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={config.overlayImage}
            alt={`${config.city} district`}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy/88" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
              Why {config.city}?
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-light font-heading text-white leading-tight mb-16 max-w-2xl"
          >
            A strategic address that <span className="italic text-gold/90">opens doors.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-x-20 gap-y-0"
          >
            {config.reasons.map((reason, i) => (
              <motion.div
                key={i}
                variants={fadeSlideUp}
                className="flex items-start gap-5 py-6 border-b border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                <p className="text-white/75 font-light text-base leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Services — editorial numbered list ── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-navy text-[10px] tracking-[0.35em] uppercase font-semibold whitespace-nowrap">
              Available Here
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex-1 h-px bg-gray-100 origin-left"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid lg:grid-cols-2 gap-x-20"
          >
            {config.services.map((svc, i) => (
              <motion.div
                key={i}
                variants={fadeSlideUp}
                className="group flex items-start gap-6 py-7 border-b border-gray-100 hover:border-gold/30 transition-colors"
              >
                <span className="text-gray-200 font-mono text-xs tracking-widest shrink-0 mt-1 group-hover:text-gold transition-colors">
                  {svc.num}
                </span>
                <div>
                  <h3 className="text-navy font-heading font-semibold text-lg mb-1 group-hover:text-gold transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-dark-gray/50 text-sm font-light leading-relaxed">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Split amenities: dark left | photo right ── */}
      <section className="flex flex-col lg:flex-row min-h-[60vh]">
        {/* dark text half */}
        <div className="w-full lg:w-1/2 bg-navy flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeSlideUp} className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
                Included As Standard
              </span>
            </motion.div>
            <motion.h2 variants={fadeSlideUp} className="text-3xl md:text-4xl font-light font-heading text-white leading-tight mb-10">
              Premium facilities, <span className="italic">no surcharge.</span>
            </motion.h2>

            <div className="grid grid-cols-2 gap-x-8 gap-y-0">
              {[
                'High-Speed Wi-Fi', 'Secure Parking',
                '24 / 7 Security', 'Executive Lounge',
                'Print & Scan', 'AV-Equipped Rooms',
                'Live Receptionist', 'Instant Activation',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                  className="flex items-center gap-3 py-3.5 border-b border-white/10 text-white/65 text-sm font-light"
                >
                  <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeSlideUp} className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-white px-7 py-3 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors"
              >
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* photo half — clips in from right */}
        <motion.div
          variants={{ hidden: { clipPath: 'inset(0 0 0 100%)' }, show: { clipPath: 'inset(0 0 0 0%)' } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden"
        >
          <img
            src={config.heroImage}
            alt={config.city}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.75)' }}
          />
          <div className="absolute inset-0 bg-gold/10 mix-blend-multiply" />
        </motion.div>
      </section>

      {/* ── 7. Location-specific FAQ ── */}
      <section className="bg-white py-28">
        <div className="max-w-4xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
                {config.city} FAQs
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-navy mb-14">
              Questions about <span className="italic">{config.city}.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <Accordion.Root type="single" collapsible className="w-full">
              {config.faqs.map((faq, i) => (
                <motion.div key={i} variants={fadeSlideUp}>
                  <Accordion.Item value={`faq-${i}`} className="border-b border-gray-100">
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left text-navy text-base font-medium group transition-colors hover:text-gold outline-none">
                        {faq.q}
                        <span className="shrink-0 ml-4 text-gray-300 group-hover:text-gold group-data-[state=open]:text-gold transition-colors">
                          <Plus className="w-4 h-4 group-data-[state=open]:hidden" />
                          <Minus className="w-4 h-4 hidden group-data-[state=open]:block" />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <p className="text-dark-gray/55 text-sm font-light leading-relaxed pb-6 pr-8">{faq.a}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                </motion.div>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      {/* ── 8. CTA Banner ── */}
      <section className="relative py-28 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={config.splitImage}
            alt="office"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3) saturate(0.4)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy/70" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <motion.div variants={fadeSlideUp}>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-white mb-3">
              Ready to establish your <span className="text-gold italic">{config.city}</span> presence?
            </h2>
            <p className="text-white/50 font-light">Activate your address in under 24 hours. No lease, no long-term commitment.</p>
            <div className="flex items-center gap-6 mt-6">
              {[
                { Icon: Zap, text: 'Activated in 24 hrs' },
                { Icon: Shield, text: 'Legally compliant' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                  <Icon className="w-4 h-4 text-gold" /> {text}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeSlideUp} className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-white px-9 py-4 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors whitespace-nowrap"
            >
              Claim This Address <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <CallToAction />
    </>
  )
}
