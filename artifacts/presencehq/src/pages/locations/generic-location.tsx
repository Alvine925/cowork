import { Link } from 'wouter'
import { motion } from 'framer-motion'
import {
  MapPin,
  Building2,
  Mail,
  Phone,
  CalendarCheck,
  Wifi,
  Car,
  Shield,
  Coffee,
  Printer,
  Users,
  MonitorSmartphone,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Globe,
  TrendingUp,
  Landmark,
  Zap,
  Award,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

interface LocationConfig {
  city: string
  building: string
  street: string
  image: string
  description: string
  reasons: string[]
  stats?: { label: string; value: string }[]
  amenities?: { icon: React.ElementType; label: string }[]
  services?: { icon: React.ElementType; title: string; desc: string }[]
  reasonIcons?: React.ElementType[]
}

const DEFAULT_AMENITIES = [
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
  { icon: Car, label: 'Secure Parking' },
  { icon: Shield, label: '24 / 7 Security' },
  { icon: Coffee, label: 'Executive Lounge' },
  { icon: Printer, label: 'Print & Scan' },
  { icon: MonitorSmartphone, label: 'AV-Equipped Rooms' },
  { icon: Phone, label: 'Live Receptionist' },
  { icon: Clock, label: 'Instant Activation' },
]

const DEFAULT_SERVICES = [
  {
    icon: Building2,
    title: 'Virtual Office',
    desc: 'Complete professional identity — prime address, mail management, and reception under one plan.',
  },
  {
    icon: MapPin,
    title: 'Business Address',
    desc: 'Use our prestigious address for company registration, correspondence, and your website.',
  },
  {
    icon: Mail,
    title: 'Mail Handling',
    desc: 'We receive, sort, and securely store all your physical mail and packages on your behalf.',
  },
  {
    icon: Globe,
    title: 'Mail Forwarding',
    desc: 'Digital scans or physical forwarding of your mail — locally or internationally.',
  },
  {
    icon: Users,
    title: 'Meeting Rooms',
    desc: 'Book fully equipped, boardroom-quality meeting spaces by the hour, with no membership needed.',
  },
  {
    icon: Briefcase,
    title: 'Hot Desk Access',
    desc: 'Flexible drop-in coworking in a professional environment whenever you need it.',
  },
]

const REASON_ICONS = [Globe, Landmark, TrendingUp, Zap, Award, Star]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
}

export function GenericLocationPage({ config }: { config: LocationConfig }) {
  const amenities = config.amenities ?? DEFAULT_AMENITIES
  const services = config.services ?? DEFAULT_SERVICES
  const reasonIcons = config.reasonIcons ?? REASON_ICONS
  const stats = config.stats ?? [
    { value: '24 hr', label: 'Activation Time' },
    { value: '100%', label: 'Legal Compliance' },
    { value: 'KES 2,500', label: 'Starting From' },
    { value: '5★', label: 'Client Rating' },
  ]

  return (
    <>
      {/* ─── Hero ─── */}
      <PageHero
        image={config.image}
        eyebrow={`${config.city}, Kenya`}
        title={config.building}
        subtitle={config.description}
        height="h-[80vh] min-h-[600px]"
      >
        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            href="/contact"
            className="bg-gold text-white px-8 py-3 text-sm uppercase tracking-[0.12em] font-medium hover:bg-gold-400 transition-colors flex items-center gap-2"
          >
            Get This Address <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="border border-white/40 text-white px-8 py-3 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white/10 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </PageHero>

      {/* ─── Stats Strip ─── */}
      <section className="bg-navy">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="py-8 px-6 text-center"
              >
                <p className="text-gold text-2xl md:text-3xl font-bold font-heading">{s.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services at this Location ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-14">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-3">
              What's Available
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-navy leading-tight max-w-2xl">
              Everything your business needs,{' '}
              <span className="italic font-normal">right here in {config.city}.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="bg-white p-8 group hover:bg-navy transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-navy font-heading font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-dark-gray/60 text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors">
                    {svc.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Why This City — Icon Cards ─── */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: heading + reason cards */}
            <div>
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-3">
                Why {config.city}?
              </span>
              <h2 className="text-3xl md:text-4xl font-light font-heading text-navy leading-tight mb-10">
                A strategic address that{' '}
                <span className="italic">opens doors.</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {config.reasons.map((reason, i) => {
                  const Icon = reasonIcons[i % reasonIcons.length]
                  return (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-60px' }}
                      className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md hover:border-gold/30 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-navy" />
                      </div>
                      <p className="text-dark-gray text-sm font-light leading-relaxed pt-1">{reason}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: premium address card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative accent */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/20 rounded-3xl pointer-events-none" />

              <div className="bg-navy rounded-3xl overflow-hidden relative z-10">
                {/* Card header */}
                <div className="px-8 pt-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
                      Your Address
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-heading font-semibold mt-3">
                    {config.building}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    {config.street}, {config.city}, Kenya
                  </p>
                </div>

                {/* Card body details */}
                <div className="px-8 py-6 space-y-5">
                  {[
                    { label: 'Building', value: config.building },
                    { label: 'Street', value: config.street },
                    { label: 'City', value: `${config.city}, Kenya` },
                  ].map((d, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-white/40 text-xs uppercase tracking-widest">{d.label}</span>
                      <span className="text-white text-sm font-medium">{d.value}</span>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <CalendarCheck className="w-4 h-4 text-gold" />
                    <span className="text-white/60 text-sm">Available for immediate registration</span>
                  </div>
                </div>

                {/* CTA row */}
                <div className="px-8 pb-8">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3.5 text-sm uppercase tracking-[0.12em] font-medium hover:bg-gold-400 transition-colors rounded-xl"
                  >
                    Claim This Address <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Amenities Grid ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-14 text-center">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-3">
              Facilities
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-navy">
              Premium amenities, <span className="italic">included.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {amenities.map((a, i) => {
              const Icon = a.icon
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-col items-center gap-3 py-8 px-4 rounded-2xl border border-gray-100 bg-light-gray hover:border-gold/40 hover:bg-gold/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:border-gold/30 transition-colors">
                    <Icon className="w-5 h-5 text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <span className="text-dark-gray text-xs font-medium text-center">{a.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-white text-2xl font-heading font-light mb-2">
                Ready to establish your {config.city} presence?
              </h3>
              <p className="text-white/50 text-sm font-light">
                Activate your address in under 24 hours. No lease. No long-term commitment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-gold text-white px-7 py-3 text-sm uppercase tracking-[0.12em] font-medium hover:bg-gold-400 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="border border-white/30 text-white px-7 py-3 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                See Pricing
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
            {[
              { icon: CheckCircle2, text: 'No hidden fees or surprises' },
              { icon: Zap, text: 'Activated within 24 hours' },
              { icon: Shield, text: 'Fully legal & compliant address' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-white/60 text-sm font-light">{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FAQ />
      <CallToAction />
    </>
  )
}
