import { useRef } from 'react'
import { Link } from 'wouter'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight, CheckCircle2, Eye, Target, Heart } from 'lucide-react'
import { CallToAction } from '@/components/home/CallToAction'

/* ── animation helpers ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const up = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const left = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const clipH = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show:  { clipPath: 'inset(0 0% 0 0)',   transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
const clipV = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show:  { clipPath: 'inset(0 0 0% 0)',   transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

/* ── who we serve personas ── */
const PERSONAS = [
  {
    tag: 'Freelancer & Consultant',
    headline: 'Stop letting a home address cost you the deal.',
    body: "You're brilliant at what you do. Your address shouldn't be the reason a client hesitates. A PresenceHQ address gives your proposal the same credibility as a firm ten times your size — from day one.",
    cta: 'Start for KES 2,500 / month',
  },
  {
    tag: 'Startup & New Business',
    headline: 'Look established before you feel established.',
    body: "Investors, banks, and early customers all judge your business before they know your product. A prime Nairobi or Mombasa address signals commitment. KRA registration, bank account opening, and first impressions — sorted.",
    cta: 'Register your business address',
  },
  {
    tag: 'SME & Growing Business',
    headline: 'Scale your footprint without scaling your costs.',
    body: 'Need a Kisumu address for your western Kenya clients while you run operations from Nairobi? Add cities as fast as you add markets — with no lease negotiations, no deposits, and no wasted space.',
    cta: 'Expand to new cities',
  },
  {
    tag: 'Regional & Enterprise',
    headline: 'A presence in every Kenyan market that matters.',
    body: "Multinationals and regional enterprises use PresenceHQ to plant flags in secondary cities ahead of physical expansion. Low commitment, high credibility — the way smart brands grow across East Africa.",
    cta: 'Talk to our enterprise team',
  },
]

const VALUES = [
  {
    icon: Heart,
    title: 'Inclusive by design',
    body: 'We do not believe professional credibility should be a privilege. Whether you are registering your first business or opening your twentieth office, we give you the same premium experience.',
  },
  {
    icon: CheckCircle2,
    title: 'Uncompromising professionalism',
    body: 'Our front desk is your front desk. We train every team member to represent your business with the same discretion and polish you would expect from your own staff.',
  },
  {
    icon: ArrowRight,
    title: 'Radical flexibility',
    body: 'Business is unpredictable. We do not lock clients into rigid, long-term leases. Start with an address, add services, open new city locations — all on your timeline.',
  },
]

export default function AboutPage() {
  /* parallax on hero */
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      {/* ── 1. Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex flex-col overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&auto=format&q=85"
            alt="PresenceHQ team"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/85" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative z-10 flex items-center gap-3 px-8 md:px-16 pt-36"
        >
          <div className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">Our Story</span>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mt-auto px-8 md:px-16 pb-20 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light font-heading text-white leading-[1.0] mb-6"
          >
            Built for every business.<br />
            <span className="italic text-gold/90">Not just the big ones.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/65 text-lg md:text-xl font-light max-w-xl leading-relaxed"
          >
            We believe every business — from a one-person freelance practice to a regional enterprise — deserves a professional presence it can be proud of.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
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

      {/* ── 2. Who We Serve ── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">Who We Serve</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light font-heading text-navy leading-tight max-w-2xl">
              Whether you're just starting or already scaling —<span className="italic"> we've got you.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-px bg-gray-100 border border-gray-100"
          >
            {PERSONAS.map((p, i) => (
              <motion.div
                key={i}
                variants={up}
                className="bg-white p-10 group hover:bg-navy transition-colors duration-300"
              >
                <span className="inline-block text-[10px] text-gold tracking-[0.3em] uppercase font-semibold border border-gold/30 px-3 py-1 mb-6 group-hover:border-gold/50 transition-colors">
                  {p.tag}
                </span>
                <h3 className="text-xl font-heading font-semibold text-navy mb-3 leading-snug group-hover:text-white transition-colors">
                  {p.headline}
                </h3>
                <p className="text-dark-gray/60 text-sm font-light leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                  {p.body}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.15em] font-semibold hover:gap-3 transition-all group-hover:text-gold"
                >
                  {p.cta} <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Story — Split: image left | text right ── */}
      <section className="flex flex-col lg:flex-row min-h-[70vh]">
        <motion.div
          variants={clipH}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&auto=format&q=85"
            alt="PresenceHQ founders"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <div className="w-full lg:w-1/2 bg-[#0A1F3A] flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={left} className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">Why We Started</span>
            </motion.div>
            <motion.h2 variants={left} className="text-3xl md:text-4xl font-light font-heading text-white leading-tight mb-8 max-w-md">
              The problem wasn't just about big deals. It was about dignity.
            </motion.h2>
            <motion.div variants={left} className="text-white/55 space-y-4 font-light leading-relaxed text-sm max-w-md">
              <p>
                Our founders saw the same wall from two directions. One was a consultant who lost an enterprise contract because their firm was registered to a residential address. Another ran a small tailoring business and was rejected for a loan because she had no official premises.
              </p>
              <p>
                Same problem. Different scale. The professional address — something that should be table stakes — was gatekeeping opportunity for businesses of every size.
              </p>
              <p>
                PresenceHQ was built to tear down that wall. Not just for the startup chasing Series A, but for the freelancer pitching their first retainer. Not just for the regional enterprise opening its fifth office, but for the salon owner who wants their business to feel real.
              </p>
              <p>
                Today, over 500 businesses across five Kenyan cities use PresenceHQ as their professional home — from solo operators to multi-city SMEs to international firms entering the East African market.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Mission — full-bleed dark ── */}
      <section className="relative py-36 overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&auto=format&q=80"
            alt="Mission"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <Target className="w-4 h-4 text-gold" />
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">Our Mission</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl md:text-6xl font-light font-heading text-white leading-[1.1] mb-8"
          >
            To make professional credibility <span className="italic text-gold/90">accessible to every business</span> — regardless of size, budget, or stage.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/50 text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            We provide premium addresses, mail management, meeting spaces, and reception services that give every business — from day one — the infrastructure to compete.
          </motion.p>
        </div>
      </section>

      {/* ── 5. Vision — split: text left | photo right ── */}
      <section className="flex flex-col lg:flex-row-reverse min-h-[70vh]">
        <motion.div
          variants={{ hidden: { clipPath: 'inset(0 0 0 100%)' }, show: { clipPath: 'inset(0 0 0 0%)' } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&q=85"
            alt="Vision — Kenya skyline"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gold/10 mix-blend-multiply" />
        </motion.div>

        <div className="w-full lg:w-1/2 bg-light-gray flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={up} className="inline-flex items-center gap-3 mb-8">
              <Eye className="w-4 h-4 text-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">Our Vision</span>
            </motion.div>
            <motion.h2 variants={up} className="text-3xl md:text-4xl font-light font-heading text-navy leading-tight mb-6 max-w-md">
              A Kenya where your address never limits your ambition.
            </motion.h2>
            <motion.p variants={up} className="text-dark-gray/60 text-base font-light leading-relaxed max-w-md mb-8">
              We envision a business landscape where the freelancer in Kisumu has the same professional standing as the law firm in Westlands. Where a business registered in Nakuru can win contracts in Dubai. Where growing to five cities takes five conversations, not five years.
            </motion.p>
            <motion.p variants={up} className="text-dark-gray/60 text-base font-light leading-relaxed max-w-md mb-10">
              PresenceHQ is building the infrastructure layer that makes this possible — starting with Kenya's five major cities and expanding wherever East African ambition takes us.
            </motion.p>
            <motion.div variants={up}>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy-600 transition-colors"
              >
                See Our Locations <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Stats — navy ── */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-b border-white/10"
          >
            {[
              { value: '500+', label: 'Businesses Served' },
              { value: '5',    label: 'Cities Covered' },
              { value: '98%',  label: 'Client Satisfaction' },
              { value: '24 hr',label: 'Activation Time' },
            ].map((s, i) => (
              <motion.div key={i} variants={up} className="py-10 px-6 md:px-10">
                <p className="text-gold text-3xl md:text-4xl font-bold font-heading mb-1">{s.value}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.25em]">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. Values — white, editorial ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-navy text-[10px] tracking-[0.35em] uppercase font-semibold whitespace-nowrap">
              What We Stand For
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
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-x-16 gap-y-12"
          >
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div key={i} variants={up}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div className="w-8 h-px bg-gold" />
                  </div>
                  <h3 className="text-navy font-heading font-semibold text-lg mb-3">{v.title}</h3>
                  <p className="text-dark-gray/55 text-sm font-light leading-relaxed">{v.body}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 8. Full-bleed team promise ── */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&auto=format&q=80"
            alt="Team"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(0.5)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy/75" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <motion.div variants={up}>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-white mb-4">
              Ready to look the part —<br />
              <span className="italic text-gold/90">whatever size you are?</span>
            </h2>
            <p className="text-white/50 font-light max-w-md">
              Join 500+ Kenyan businesses that trust PresenceHQ with their professional identity. Start small. Stay as long as you need. Grow on your terms.
            </p>
          </motion.div>
          <motion.div variants={up} className="shrink-0 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors whitespace-nowrap"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              See Pricing
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <CallToAction />
    </>
  )
}
