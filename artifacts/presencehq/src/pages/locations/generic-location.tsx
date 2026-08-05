import { Link } from 'wouter'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, CheckCircle2, Zap, Shield } from 'lucide-react'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

export interface LocationConfig {
  city: string
  building: string
  street: string
  heroImage: string        // full-bleed hero photo
  splitImage: string       // interior / office photo (split section)
  overlayImage: string     // second full-bleed photo (why-city section)
  tagline: string          // short punchy line e.g. "East Africa's business nerve centre."
  description: string      // hero subtitle
  marketIntro: string      // 2–3 sentence paragraph about the city market
  stats: { value: string; label: string }[]
  reasons: string[]
  services: { num: string; title: string; desc: string }[]
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export function GenericLocationPage({ config }: { config: LocationConfig }) {
  return (
    <>
      {/* ── 1. Full-bleed Hero ── */}
      <section className="relative h-screen min-h-[640px] flex flex-col overflow-hidden">
        <img
          src={config.heroImage}
          alt={config.city}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* strong gradient: light at top, very dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85" />

        {/* vertical rule + city label pinned top-left */}
        <div className="relative z-10 flex items-center gap-3 px-8 md:px-16 pt-36">
          <div className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
            {config.city}, Kenya
          </span>
        </div>

        {/* main title, bottom-left anchored */}
        <div className="relative z-10 mt-auto px-8 md:px-16 pb-20 max-w-5xl">
          <motion.h1
            {...inView()}
            className="text-5xl md:text-7xl lg:text-8xl font-light font-heading text-white leading-[1.0] mb-6"
          >
            {config.building}
          </motion.h1>
          <motion.p
            {...inView(0.1)}
            className="text-white/65 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10"
          >
            {config.description}
          </motion.p>
          <motion.div {...inView(0.2)} className="flex flex-wrap gap-4">
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
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/20" />
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mt-4">Scroll</span>
        </div>
      </section>

      {/* ── 2. Stats on Navy ── */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-b border-white/10">
            {config.stats.map((s, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.06)}
                className="py-10 px-6 md:px-10"
              >
                <p className="text-gold text-3xl md:text-4xl font-bold font-heading mb-1">{s.value}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.25em]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Split: Photo left | Dark text right ── */}
      <section className="flex flex-col lg:flex-row min-h-[70vh]">
        {/* photo half */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden">
          <img
            src={config.splitImage}
            alt={`${config.city} office`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* text half — dark navy, no border */}
        <div className="w-full lg:w-1/2 bg-[#0A1F3A] flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <motion.div {...inView()}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
                The Market
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-white leading-tight mb-6 max-w-md">
              {config.tagline}
            </h2>
            <p className="text-white/55 text-base font-light leading-relaxed max-w-md">
              {config.marketIntro}
            </p>

            <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <p className="text-white/40 text-sm">{config.building} · {config.street}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Full-bleed overlay: Why [City] ── */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <img
          src={config.overlayImage}
          alt={`${config.city} district`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* heavy dark overlay so text is legible */}
        <div className="absolute inset-0 bg-navy/88" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
              Why {config.city}?
            </span>
          </div>
          <motion.h2
            {...inView()}
            className="text-4xl md:text-5xl font-light font-heading text-white leading-tight mb-16 max-w-2xl"
          >
            A strategic address that <span className="italic text-gold/90">opens doors.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-0">
            {config.reasons.map((reason, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.07)}
                className="flex items-start gap-5 py-6 border-b border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                <p className="text-white/75 font-light text-base leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Services — editorial numbered list on white ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-navy text-[10px] tracking-[0.35em] uppercase font-semibold whitespace-nowrap">
              Available Here
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid lg:grid-cols-2 gap-x-20">
            {config.services.map((svc, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.06)}
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
          </div>
        </div>
      </section>

      {/* ── 6. Split: text on dark left | street photo right ── */}
      <section className="flex flex-col lg:flex-row min-h-[60vh]">
        {/* dark text half */}
        <div className="w-full lg:w-1/2 bg-navy flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <motion.div {...inView()}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">
                Included As Standard
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-white leading-tight mb-10">
              Premium facilities, <span className="italic">no surcharge.</span>
            </h2>

            <div className="grid grid-cols-2 gap-x-8 gap-y-0">
              {[
                'High-Speed Wi-Fi',
                'Secure Parking',
                '24 / 7 Security',
                'Executive Lounge',
                'Print & Scan',
                'AV-Equipped Rooms',
                'Live Receptionist',
                'Instant Activation',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3.5 border-b border-white/10 text-white/65 text-sm font-light"
                >
                  <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-white px-7 py-3 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors"
              >
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* photo half */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden">
          <img
            src={config.heroImage}
            alt={config.city}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.75)' }}
          />
          {/* subtle gold tint overlay */}
          <div className="absolute inset-0 bg-gold/10 mix-blend-multiply" />
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
      <section className="relative py-28 overflow-hidden">
        <img
          src={config.splitImage}
          alt="office"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) saturate(0.4)' }}
        />
        <div className="absolute inset-0 bg-navy/70" />

        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
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
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-white px-9 py-4 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors whitespace-nowrap"
            >
              Claim This Address <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <CallToAction />
    </>
  )
}
