import { Link } from 'wouter'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

/* ── Core features with custom inline SVG icons ── */
const FEATURES = [
  {
    label: 'Commercial Business Address',
    detail: 'A prime, recognised address in your chosen city — accepted by banks, KRA, and government offices.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 3C11.029 3 7 7.029 7 12c0 7 9 17 9 17s9-10 9-17c0-4.971-4.029-9-9-9z" />
        <circle cx="16" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: 'Company Registration & Banking',
    detail: 'Use your address for KRA registration, certificate of incorporation, and all bank account applications.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="10" width="26" height="18" rx="2" />
        <path d="M3 15h26" />
        <path d="M16 4L3 10h26L16 4z" />
        <path d="M11 22h2M15 22h6" />
      </svg>
    ),
  },
  {
    label: 'Professional Mail Handling',
    detail: 'Every letter, parcel, and courier delivery received, logged, and stored securely on your behalf.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="7" width="26" height="18" rx="2" />
        <path d="M3 7l13 10L29 7" />
      </svg>
    ),
  },
  {
    label: 'Instant Mail Notifications',
    detail: 'Get notified by email or WhatsApp the moment anything arrives for your business.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 3a10 10 0 0 1 10 10v5l2 4H4l2-4v-5A10 10 0 0 1 16 3z" />
        <path d="M13 25a3 3 0 0 0 6 0" />
        <circle cx="22" cy="8" r="4" fill="currentColor" stroke="none" className="text-gold" />
      </svg>
    ),
  },
  {
    label: 'Dedicated Phone Number',
    detail: 'A local business number answered in your company name by our professional reception team.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M6.5 5h5l2 5-3 2a16 16 0 0 0 9.5 9.5l2-3 5 2v5a2 2 0 0 1-2 2C11 27.5 4.5 21 4.5 7a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    label: 'Live Receptionist',
    detail: 'Real people greet your callers and visitors using your company name — never a generic answer.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="16" cy="10" r="5" />
        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" />
        <path d="M22 20l2 3 4-5" />
      </svg>
    ),
  },
  {
    label: 'Mail Forwarding',
    detail: 'Physical forwarding to any address in Kenya or internationally, or high-res digital scans on demand.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M5 16h18" />
        <path d="M18 10l6 6-6 6" />
        <path d="M5 6v20" strokeDasharray="2 2" />
      </svg>
    ),
  },
]

const ADDONS = [
  { label: 'Workspace & Hot Desk Access' },
  { label: 'Boardroom & Meeting Room Hire' },
  { label: 'Company Registration Assistance' },
  { label: 'Dedicated Desk (Monthly)' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function VirtualOfficePage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Core Service"
        title="Virtual Office."
        subtitle="Everything you need to operate a professional, credible business — without signing a commercial lease."
      >
        <div className="flex flex-wrap gap-4 mt-8">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-gold-400 transition-colors">
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-white/10 transition-colors">
            View Pricing
          </Link>
        </div>
      </PageHero>

      {/* ── Features — no cards, on white ── */}
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
              What's Included
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={up}
                className="group flex items-start gap-5 py-8 border-b border-gray-100 hover:border-gold/30 transition-colors"
              >
                <span className="text-navy/25 group-hover:text-gold transition-colors duration-300 shrink-0 mt-0.5">
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-navy font-heading font-semibold text-base mb-1 group-hover:text-gold transition-colors">
                    {f.label}
                  </h3>
                  <p className="text-dark-gray/50 text-sm font-light leading-relaxed">{f.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Optional Add-ons — navy ── */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-gold" />
                <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">Optional Add-ons</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light font-heading text-white leading-snug">
                Bolt on what your business needs.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-0 md:min-w-[380px]">
              {ADDONS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3 py-4 border-b border-white/10 text-white/60 text-sm font-light"
                >
                  <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                  {a.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROI ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-semibold">The Numbers</span>
              <div className="w-6 h-px bg-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-navy mb-14">
              Simple to start. Immediate impact.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-12"
          >
            {[
              { num: '< 24 hrs', label: 'Setup Time' },
              { num: 'KES 4,200', label: 'Starting From / Month' },
              { num: '0', label: 'Leases to Sign' },
            ].map((s, i) => (
              <motion.div key={i} variants={up}>
                <div className="text-3xl md:text-4xl font-bold font-heading text-navy mb-2">{s.num}</div>
                <div className="text-dark-gray/40 text-[10px] uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-navy text-white px-9 py-4 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-navy-600 transition-colors"
            >
              Claim Your Address <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
