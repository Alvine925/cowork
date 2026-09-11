'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
} from 'lucide-react'

interface ServiceFaq {
  question: string
  answer: string
}

interface ServiceStat {
  value: string
  label: string
}

interface ServiceStep {
  title: string
  detail: string
}

interface ServiceDetail {
  label: string
  detail: string
}

export interface ServiceFeatureItem {
  title: string
  desc?: string
}

export interface ServiceConfig {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  features: (string | ServiceFeatureItem)[]
  description: string
  imageAlt?: string
  imagePosition?: string
  audience?: string
  outcome?: string
  stats?: ServiceStat[]
  process?: ServiceStep[]
  faqs?: ServiceFaq[]
  operational?: ServiceDetail[]
  detailsTitle?: string
  detailsIntro?: string
}

interface ServiceProfile {
  kicker: string
  problemTitle: string
  problem: string
  answerTitle: string
  answer: string
  audience: string
  outcome: string
  imagePosition: string
  imageNote: string
  stats: ServiceStat[]
  process: ServiceStep[]
  faqs: ServiceFaq[]
  operational: ServiceDetail[]
  detailsTitle: string
  detailsIntro: string
}

const defaultProfile: ServiceProfile = {
  kicker: 'A better way to work',
  problemTitle: 'The overhead should not be the story.',
  problem:
    'When the practical details of running a business start taking more time than the business itself, momentum gets expensive. Paper Street takes those details off your desk and puts them in capable hands.',
  answerTitle: 'A credible presence, ready when you are.',
  answer:
    'We give ambitious businesses the structure to show up properly in Kenya, without asking you to take on a lease, a full-time team, or commitments that no longer fit.',
  audience: 'For founders, growing teams and global businesses entering Kenya.',
  outcome: 'More room to focus on the work that moves the business forward.',
  imagePosition: 'object-center',
  imageNote: 'A considered place to do serious work.',
  stats: [
    { value: '24 hrs', label: 'Typical setup time' },
    { value: '5 cities', label: 'Kenyan presence' },
    { value: 'One team', label: 'To keep things moving' },
  ],
  process: [
    { title: 'Tell us what you need', detail: 'A short conversation gives us the context to recommend the right fit.' },
    { title: 'Make it yours', detail: 'We set up the service, details and preferences that represent your business.' },
    { title: 'Get on with business', detail: 'Your Paper Street team handles the practical work from here.' },
  ],
  faqs: [
    {
      question: 'How quickly can I get started?',
      answer: 'Most services can be set up within one business day once we have the required business details. We will confirm the exact timing before anything is activated.',
    },
    {
      question: 'Can I combine this with another Paper Street service?',
      answer: 'Yes. Services are designed to work together, so you can add workspace, meeting rooms, mail support or reception as your needs change.',
    },
    {
      question: 'Do I need to sign a long-term lease?',
      answer: 'No. Paper Street services are designed to give you a professional operating base without the cost and inflexibility of a conventional lease.',
    },
  ],
  operational: [
    { label: 'A clear brief', detail: 'We confirm your business details, preferred location and how you want the service used before activation.' },
    { label: 'A named point of contact', detail: 'Your questions go to a real Paper Street team member who knows your setup and can keep things moving.' },
    { label: 'Room to change', detail: 'Add workspace, forwarding or reception support later without rebuilding your operating base.' },
  ],
  detailsTitle: 'The useful part is how it works day to day.',
  detailsIntro: 'Paper Street is designed around the small operational moments that make a business feel reliable.',
}

const profiles: Record<string, Partial<ServiceProfile>> = {
  'Business Address.': {
    kicker: 'Look established from day one',
    problemTitle: 'A home address should not carry your business.',
    problem:
      'Clients, banks and official institutions make judgements quickly. A residential address can make a serious company look temporary, while a conventional office lease can tie up capital before you need the space.',
    answerTitle: 'Give your business an address with weight.',
    answer:
      'Use a recognised Paper Street address in Nairobi or another Kenyan city for registration, correspondence and customer-facing materials, then add the support you need around it.',
    audience: 'For new companies, remote teams and established businesses that need a stronger Kenyan footprint.',
    outcome: 'A professional address that helps your business pass the first glance.',
    imagePosition: 'object-center',
    imageNote: 'Your business, anchored in the right place.',
    stats: [
      { value: '5 cities', label: 'Kenyan locations' },
      { value: 'Same day', label: 'Mail notifications' },
      { value: 'No lease', label: 'Required' },
    ],
    faqs: [
      {
        question: 'Can I use the address for company registration?',
        answer: 'Yes. Our business addresses are designed for company registration and ongoing registered office needs. We will confirm the location and documentation for your situation.',
      },
      {
        question: 'Can I use it for a bank account application?',
        answer: 'Our addresses are accepted by major Kenyan banks, although each bank has its own verification requirements. We can help you understand what to prepare.',
      },
    ],
  },
  'Mail Handling.': {
    kicker: 'Nothing important gets lost',
    problemTitle: 'A missed envelope can become a missed opportunity.',
    problem:
      'Government letters, signed documents and courier deliveries still matter. When you work across locations or spend time away from the office, the risk is not knowing what arrived, or when.',
    answerTitle: 'A reliable pair of hands for every delivery.',
    answer:
      'Paper Street receives, records and stores your business mail securely. You receive a clear notification and choose what happens next, without chasing a receptionist or a courier.',
    audience: 'For busy founders, distributed teams and businesses with important documents moving through Nairobi.',
    outcome: 'Confidence that every letter has been received, recorded and looked after.',
    imagePosition: 'object-[center_40%]',
    imageNote: 'Handled carefully. Reported clearly.',
    stats: [
      { value: 'Same day', label: 'Arrival notification' },
      { value: '1 log', label: 'For every item' },
      { value: 'Secure', label: 'Storage on site' },
    ],
  },
  'Mail Forwarding.': {
    kicker: 'Keep business moving',
    problemTitle: 'Your work should not stop at the mailbox.',
    problem:
      'A document waiting in Nairobi can hold up a decision in London, Kisumu or Cape Town. Without a dependable forwarding rhythm, small delays become expensive interruptions.',
    answerTitle: 'Your mail, delivered on your terms.',
    answer:
      'Choose digital scans for speed or physical forwarding for originals and parcels. We consolidate, package and send items according to the schedule that suits the way you work.',
    audience: 'For travelling founders, international businesses and teams that work between cities.',
    outcome: 'Fewer interruptions, faster decisions and a business that travels with you.',
    imagePosition: 'object-[center_45%]',
    imageNote: 'From our desk to wherever work takes you.',
    stats: [
      { value: 'Global', label: 'Forwarding available' },
      { value: 'On demand', label: 'Or scheduled' },
      { value: 'Tracked', label: 'Courier options' },
    ],
  },
  'Meeting Rooms.': {
    kicker: 'Meetings with a point of view',
    problemTitle: 'The room changes how the conversation starts.',
    problem:
      'A first pitch, a board meeting or a delicate interview deserves more than a noisy café and a borrowed screen. The setting should help everyone arrive prepared and stay focused.',
    answerTitle: 'Bring the right people into the room.',
    answer:
      'Book a polished, practical meeting room by the hour. From a four-person working session to a 20-person presentation, Paper Street gives the conversation a professional home.',
    audience: 'For client-facing teams, consultants, recruiters and businesses that need a room only when it matters.',
    outcome: 'A better setting for decisions, trust and the work that follows.',
    imagePosition: 'object-center',
    imageNote: 'A room that is ready before your guests arrive.',
    stats: [
      { value: '4–20', label: 'Seats available' },
      { value: 'By hour', label: 'Flexible booking' },
      { value: 'Ready', label: 'Tech and refreshments' },
    ],
  },
  'Hot Desk.': {
    kicker: 'A change of scene, on demand',
    problemTitle: 'Working from home is not always working.',
    problem:
      'Some days need quiet focus, a stronger internet connection or simply a professional room around you. Committing to a permanent desk for those days does not make sense.',
    answerTitle: 'Drop in, settle quickly, get momentum back.',
    answer:
      'A Paper Street hot desk gives you the rhythm of a real office with the flexibility of a day pass: dependable WiFi, a comfortable seat and a team around to help.',
    audience: 'For independent professionals, hybrid teams and founders who need a productive base between meetings.',
    outcome: 'The focus of an office, without giving up the freedom of your schedule.',
    imagePosition: 'object-[center_55%]',
    imageNote: 'A professional place to get into the work.',
    stats: [
      { value: '8–6', label: 'Business-hour access' },
      { value: 'Fibre', label: 'Reliable WiFi' },
      { value: 'Flexible', label: 'No permanent desk' },
    ],
  },
  'Dedicated Desk.': {
    kicker: 'Your place in the room',
    problemTitle: 'Some work needs a consistent home.',
    problem:
      'If your laptop, notebooks and team calls are part of your daily rhythm, moving between cafés and spare desks adds friction. You need a place that is yours when you arrive.',
    answerTitle: 'A desk you can return to every day.',
    answer:
      'Your dedicated workspace is set up for continuity: keep your essentials close, work with dependable access and use the wider Paper Street environment when the day calls for it.',
    audience: 'For independent professionals and small teams ready for consistency without a private-office lease.',
    outcome: 'Less setup time. More headspace for the work in front of you.',
    imagePosition: 'object-[center_60%]',
    imageNote: 'A familiar starting point for every workday.',
    stats: [
      { value: 'Mon–Sat', label: 'Daytime access' },
      { value: 'Your own', label: 'Reserved desk' },
      { value: 'Included', label: 'Business address' },
    ],
  },
  'Reception Services.': {
    kicker: 'The first hello matters',
    problemTitle: 'Every call is part of your brand.',
    problem:
      'When a call goes unanswered or a visitor is met without context, confidence drops before you have had a chance to show what you do. A small team should still sound considered.',
    answerTitle: 'A warm, capable voice for your business.',
    answer:
      'Our reception team answers in your company name, takes clear messages and welcomes visitors with the care you would expect from an in-house team: in English and Swahili.',
    audience: 'For growing businesses that want a polished front desk without adding another full-time hire.',
    outcome: 'More trust in the moments before the real conversation begins.',
    imagePosition: 'object-[center_35%]',
    imageNote: 'Professional, human and always on brief.',
    stats: [
      { value: '2 languages', label: 'English and Swahili' },
      { value: 'Every call', label: 'Answered in your name' },
      { value: 'Monthly', label: 'Call reporting' },
    ],
  },
  'Business Expansion.': {
    kicker: 'Test the market before the lease',
    problemTitle: 'Expansion should start with evidence.',
    problem:
      'A new city can be a real opportunity, but a full office lease before demand is proven is a costly way to find out. You need local credibility without locking the business into a fixed footprint.',
    answerTitle: 'Put down a smart, credible first marker.',
    answer:
      'Paper Street gives you a local address, phone presence and support team so you can begin conversations in a new Kenyan market, learn what works and scale with confidence.',
    audience: 'For regional teams, international companies and Kenyan businesses opening their next location.',
    outcome: 'A local presence that grows at the speed of your opportunity.',
    imagePosition: 'object-[center_45%]',
    imageNote: 'A new market, made easier to enter.',
    stats: [
      { value: '5 cities', label: 'Ready for rollout' },
      { value: '24 hrs', label: 'Typical launch window' },
      { value: '1 team', label: 'Across locations' },
    ],
  },
  'Company Registration.': {
    kicker: 'Start on solid ground',
    problemTitle: 'Formation paperwork should not slow a good idea.',
    problem:
      'Registering a company in Kenya comes with details, documents and decisions that are easy to get wrong when you are also trying to launch. Uncertainty at the start creates avoidable delays later.',
    answerTitle: 'A clearer route from idea to incorporated.',
    answer:
      'We coordinate the practical steps with our legal and business advisory partners, including the registered address and guidance for the filings your new company needs.',
    audience: 'For Kenyan founders, international entrepreneurs and teams establishing a formal local entity.',
    outcome: 'A properly prepared foundation for the business you are building.',
    imagePosition: 'object-[center_45%]',
    imageNote: 'A practical start for serious ambitions.',
    stats: [
      { value: '1 team', label: 'To guide the process' },
      { value: 'KRA PIN', label: 'Registration support' },
      { value: 'Ongoing', label: 'Registered office option' },
    ],
  },
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

function getProfile(config: ServiceConfig) {
  const custom = profiles[config.title] ?? {}
  return {
    ...defaultProfile,
    ...custom,
    audience: config.audience ?? custom.audience ?? defaultProfile.audience,
    outcome: config.outcome ?? custom.outcome ?? defaultProfile.outcome,
    imagePosition: config.imagePosition ?? custom.imagePosition ?? defaultProfile.imagePosition,
    stats: config.stats ?? custom.stats ?? defaultProfile.stats,
    process: config.process ?? custom.process ?? defaultProfile.process,
    faqs: config.faqs ?? custom.faqs ?? defaultProfile.faqs,
    operational: config.operational ?? custom.operational ?? defaultProfile.operational,
    detailsTitle: config.detailsTitle ?? custom.detailsTitle ?? defaultProfile.detailsTitle,
    detailsIntro: config.detailsIntro ?? custom.detailsIntro ?? defaultProfile.detailsIntro,
  }
}

function ActionLink({ href, children, inverse = false, testId }: { href: string; children: ReactNode; inverse?: boolean; testId?: string }) {
  return (
    <Link
      href={href}
      data-testid={testId}
      className={`group inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:px-7 ${
        inverse
          ? 'border border-white/35 text-white hover:border-gold hover:bg-white/10'
          : 'bg-gold text-navy font-bold hover:bg-gold-400'
      }`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}

const FEATURE_ADDON_LINKS: Record<string, string> = {
  'Mail & Package Receiving': '/services/addons/mail-handling',
  'Digital Mail Scanning': '/services/addons/mail-handling',
  'Mail Handling & Physical Reception': '/services/addons/mail-handling',
  'High-Resolution Digital Mail Scanning': '/services/addons/mail-handling',
  'Mail Forwarding': '/services/addons/mail-forwarding',
  'Physical Mail Forwarding': '/services/addons/mail-forwarding',
  'Meeting Room Credits': '/services/addons/meeting-room-hours',
  'Monthly Meeting Room Credits': '/services/addons/meeting-room-hours',
  'Drop-In Coworking Access': '/services/addons/coworking-access',
  'Drop-In Coworking Day Pass Credits': '/services/addons/coworking-access',
  'Lockable Steel Pedestal Storage Drawer': '/services/addons/lockable-storage',
  'Lockable Pedestal Storage Drawer': '/services/addons/lockable-storage',
  'Prime Commercial Business Address': '/services/business-address',
  'Registered Commercial Business Address': '/services/business-address',
  'Local Branch Business Address in Kisumu': '/services/business-address',
  'Regional Mail & Inquiries Receiving': '/services/addons/mail-handling',
}

export function GenericServicePage({ config }: { config: ServiceConfig }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const profile = getProfile(config)
  const features = config.features
  const contactHref = `/contact?service=${encodeURIComponent(config.title.replace('.', ''))}`
  const serviceSlug =
    config.title.toLowerCase().includes('virtual') ? 'virtual-office'
    : config.title.toLowerCase().includes('address') ? 'business-address'
    : config.title.toLowerCase().includes('meeting') || config.title.toLowerCase().includes('boardroom') ? 'meeting-rooms'
    : config.title.toLowerCase().includes('hot') || config.title.toLowerCase().includes('day') ? 'hot-desk'
    : config.title.toLowerCase().includes('dedicated') ? 'dedicated-desk'
    : 'virtual-office'
  const isInstantBook = serviceSlug === 'hot-desk' || serviceSlug === 'meeting-rooms'
  const bookHref = isInstantBook ? `/book/${serviceSlug}` : `/quote/${serviceSlug}`
  const bookLabel =
    serviceSlug === 'hot-desk'
      ? 'Book Day Pass'
      : serviceSlug === 'meeting-rooms'
        ? 'Book Room'
        : 'Get Quote'

  return (
    <main className="overflow-hidden bg-[#fbfaf7] text-dark-gray">

      {/* ── HERO: Full-bleed image background ── */}
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden bg-navy text-white lg:min-h-screen">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={config.image}
            alt={config.imageAlt ?? config.title}
            className={`h-full w-full object-cover ${profile.imagePosition}`}
          />
          {/* Multi-layer overlay for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/65 to-navy/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
        </div>

        {/* Subtle gold accent line at top */}
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-gold via-gold/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={reveal} className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              {config.eyebrow} <span className="text-white/35">/</span> Paper Street Kisumu
            </motion.div>
            <motion.h1 variants={reveal} className="font-heading text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {config.title}
            </motion.h1>
            <motion.p variants={reveal} className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
              {config.subtitle}
            </motion.p>
            <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-3">
              <Link
                href={bookHref}
                className="inline-flex items-center gap-2 bg-gold px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy transition-all hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20"
              >
                {bookLabel} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={contactHref}
                data-testid="link-service-contact"
                className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:border-gold hover:text-gold"
              >
                Talk to our team <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats bar anchored to bottom */}
          {profile.stats && profile.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-20 flex flex-wrap gap-0 border-t border-white/15 pt-8 sm:mt-24 lg:mt-28"
            >
              {profile.stats.map((stat, i) => (
                <div key={stat.label} className={`flex flex-col gap-1 pr-10 ${i > 0 ? 'border-l border-white/15 pl-10' : ''}`}>
                  <span className="font-heading text-2xl font-light text-gold sm:text-3xl">{stat.value}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── WHY IT WORKS ── */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.p variants={reveal} className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-navy font-mono">{profile.kicker}</motion.p>
            <motion.h2 variants={reveal} className="max-w-md font-heading text-2xl font-light leading-snug text-navy sm:text-3xl">
              {profile.problemTitle}
            </motion.h2>
            <motion.div variants={reveal} className="mt-8 h-px w-14 bg-navy" />
            <motion.p variants={reveal} className="mt-6 max-w-md text-xs sm:text-sm font-light leading-relaxed text-dark-gray/62">{profile.problem}</motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="relative border-l border-navy/20 pl-6 sm:pl-10"
          >
            <span className="absolute -left-[9px] top-0 h-[17px] w-[17px] rounded-full border-4 border-[#fbfaf7] bg-navy" />
            <motion.p variants={reveal} className="max-w-2xl font-heading text-2xl font-light leading-snug text-navy sm:text-3xl">
              {profile.answerTitle}
            </motion.p>
            <motion.p variants={reveal} className="mt-5 max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-dark-gray/62">{profile.answer}</motion.p>
            <motion.div variants={reveal} className="mt-8 flex items-start gap-3 text-xs sm:text-sm text-navy">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
              <span>{profile.outcome}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOU GET — magazine-style numbered feature grid ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.p variants={reveal} className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 font-mono">What's included</motion.p>
              <motion.h2 variants={reveal} className="font-heading text-3xl font-light text-navy sm:text-4xl">Everything in the detail.</motion.h2>
            </div>
            <motion.p variants={reveal} className="max-w-xs text-xs font-light leading-relaxed text-dark-gray/45 md:text-right">
              Thoughtfully delivered from our Kisumu flagship hub.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid gap-px bg-navy/8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => {
              const isObj = typeof feature === 'object' && feature !== null
              const title = isObj ? feature.title : feature
              const desc = isObj ? feature.desc : null
              const addonLink = FEATURE_ADDON_LINKS[title]

              return (
                <motion.div
                  key={title}
                  variants={reveal}
                  className="group relative bg-white p-7 transition-colors duration-300 hover:bg-navy"
                >
                  <span className="mb-5 block font-mono text-[10px] font-bold text-navy/25 transition-colors group-hover:text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      {addonLink ? (
                        <Link href={addonLink} className="font-heading text-sm font-semibold text-navy transition-colors group-hover:text-white inline-flex items-center gap-1.5">
                          {title}
                          <MoveUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <h3 className="font-heading text-sm font-semibold text-navy transition-colors group-hover:text-white">{title}</h3>
                      )}
                      {desc && (
                        <p className="mt-2 text-xs leading-relaxed text-navy/60 transition-colors group-hover:text-white/60">{desc}</p>
                      )}
                      {addonLink && (
                        <Link href={addonLink} className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold hover:underline">
                          Learn more →
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS — horizontal timeline on dark ── */}
      <section className="bg-navy py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.p variants={reveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 font-mono">How it works</motion.p>
              <motion.h2 variants={reveal} className="font-heading text-3xl font-light leading-tight sm:text-4xl">
                From first conversation to<br className="hidden sm:block" /> fully up and running.
              </motion.h2>
            </div>
            <motion.div variants={reveal} className="flex items-center gap-3 text-sm text-white/50">
              <MessageCircle className="h-4 w-4 text-gold shrink-0" />
              Not sure which option fits? We will help you work it out.
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="relative grid gap-0 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 md:block" />
            {profile.process.map((step, index) => (
              <motion.div key={step.title} variants={reveal} className="relative border-t border-white/10 pt-8 md:border-t-0 md:pr-12">
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-gold/30 bg-navy font-heading text-2xl font-light text-gold">
                    0{index + 1}
                  </span>
                  {index < profile.process.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-white/20 md:block ml-auto" />
                  )}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-6 text-white/50">{step.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm font-light text-white/40">Ready when you are. No long-term commitment required to get started.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={bookHref}
                className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy transition-all hover:bg-gold/90"
              >
                {bookLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:text-gold"
              >
                Start a conversation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IN PRACTICE — numbered rows, warm bg ── */}
      <section className="bg-[#f7f3ea] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="mb-14">
            <motion.p variants={reveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 font-mono">In practice</motion.p>
            <motion.h2 variants={reveal} className="font-heading text-4xl font-light leading-tight text-navy sm:text-5xl">{profile.detailsTitle}</motion.h2>
            <motion.p variants={reveal} className="mt-4 max-w-lg text-sm font-light leading-7 text-dark-gray/55">{profile.detailsIntro}</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="divide-y divide-navy/10">
            {profile.operational.map((detail, index) => (
              <motion.div key={detail.label} variants={reveal} className="group grid gap-4 py-8 sm:grid-cols-[80px_1fr_2fr] sm:gap-10 sm:py-10">
                <span className="font-heading text-4xl font-light text-navy/15 transition-colors group-hover:text-navy/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="self-center font-heading text-base font-semibold text-navy">{detail.label}</h3>
                <p className="text-sm font-light leading-7 text-dark-gray/60">{detail.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQs — sticky left column, editorial layout ── */}
      <section className="bg-[#fbfaf7] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:sticky lg:top-28 lg:self-start">
              <motion.p variants={reveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 font-mono">Questions answered</motion.p>
              <motion.h2 variants={reveal} className="font-heading text-4xl font-light leading-tight text-navy sm:text-5xl">
                Clarity<br />before<br />commitment.
              </motion.h2>
              <motion.p variants={reveal} className="mt-6 max-w-xs text-sm font-light leading-7 text-dark-gray/50">
                If you are still weighing it up, send us a note. A useful answer is better than a hard sell.
              </motion.p>
              <motion.div variants={reveal} className="mt-8">
                <Link href={contactHref} data-testid="link-ask-team" className="group inline-flex items-center gap-2 border-b border-navy pb-0.5 text-xs font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold hover:text-gold">
                  Ask our team <MoveUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </motion.div>
            <div className="divide-y divide-navy/10">
              {profile.faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      data-testid={`button-faq-${index}`}
                      className="flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className={`font-heading text-base font-semibold transition-colors sm:text-lg ${isOpen ? 'text-gold' : 'text-navy'}`}>
                        {faq.question}
                      </span>
                      <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center border transition-all duration-300 ${isOpen ? 'border-gold bg-gold text-navy' : 'border-navy/20 text-navy'}`}>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div id={`faq-answer-${index}`} className="overflow-hidden">
                        <p className="max-w-2xl pb-7 pr-10 text-sm font-light leading-7 text-dark-gray/58">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — cinematic navy, no decorative circles ── */}
      <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,255,72,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-2xl">
              <motion.p variants={reveal} className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-gold/60 font-mono">Make the next move</motion.p>
              <motion.h2 variants={reveal} className="font-heading text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
                A professional base<br className="hidden sm:block" /> for where you are going.
              </motion.h2>
              <motion.p variants={reveal} className="mt-6 max-w-lg text-sm font-light leading-7 text-white/45">{profile.audience}</motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-start"
            >
              <Link
                href={bookHref}
                className="inline-flex items-center gap-2 bg-gold px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy transition-all hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/10"
              >
                {bookLabel} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:border-gold hover:text-gold"
              >
                Get a recommendation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/pricing?service=${encodeURIComponent(config.title.replace('.', ''))}`}
                data-testid="link-bottom-pricing"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white"
              >
                View pricing →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}