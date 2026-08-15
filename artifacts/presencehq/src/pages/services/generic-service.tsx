import { useState, type ReactNode } from 'react'
import { Link } from 'wouter'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  MapPin,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
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

export interface ServiceConfig {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  features: string[]
  description: string
  imageAlt?: string
  imagePosition?: string
  audience?: string
  outcome?: string
  stats?: ServiceStat[]
  process?: ServiceStep[]
  faqs?: ServiceFaq[]
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
}

const defaultProfile: ServiceProfile = {
  kicker: 'A better way to work',
  problemTitle: 'The overhead should not be the story.',
  problem:
    'When the practical details of running a business start taking more time than the business itself, momentum gets expensive. Paper Street takes those details off your desk and puts them in capable hands.',
  answerTitle: 'A credible presence, ready when you are.',
  answer:
    'We give ambitious businesses the structure to show up properly in Kenya — without asking you to take on a lease, a full-time team, or commitments that no longer fit.',
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
}

const profiles: Record<string, Partial<ServiceProfile>> = {
  'Business Address.': {
    kicker: 'Look established from day one',
    problemTitle: 'A home address should not carry your business.',
    problem:
      'Clients, banks and official institutions make judgements quickly. A residential address can make a serious company look temporary, while a conventional office lease can tie up capital before you need the space.',
    answerTitle: 'Give your business an address with weight.',
    answer:
      'Use a recognised Paper Street address in Nairobi or another Kenyan city for registration, correspondence and customer-facing materials — then add the support you need around it.',
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
      'Government letters, signed documents and courier deliveries still matter. When you work across locations or spend time away from the office, the risk is not knowing what arrived — or when.',
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
      'A Paper Street hot desk gives you the rhythm of a real office with the flexibility of a day pass — dependable WiFi, a comfortable seat and a team around to help.',
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
      { value: '24/7', label: 'Key card access' },
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
      'Our reception team answers in your company name, takes clear messages and welcomes visitors with the care you would expect from an in-house team — in English and Swahili.',
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

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
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
  }
}

function ActionLink({ href, children, inverse = false }: { href: string; children: ReactNode; inverse?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:px-7 ${
        inverse
          ? 'border border-white/35 text-white hover:border-gold hover:bg-white/10'
          : 'bg-gold text-white hover:bg-gold-400'
      }`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}

export function GenericServicePage({ config }: { config: ServiceConfig }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const profile = getProfile(config)
  const features = config.features.slice(0, 8)

  return (
    <main className="overflow-hidden bg-[#fbfaf7] text-dark-gray">
      <section className="relative min-h-[700px] bg-navy text-white lg:min-h-[760px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(201,162,39,0.16),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[700px] max-w-7xl items-center gap-12 px-6 pb-20 pt-32 sm:px-10 lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-16 lg:pb-24">
          <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
            <motion.div variants={reveal} className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              {config.eyebrow} <span className="text-white/35">/</span> Paper Street Kenya
            </motion.div>
            <motion.h1 variants={reveal} className="max-w-2xl font-heading text-5xl font-light leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.5rem]">
              {config.title}
            </motion.h1>
            <motion.p variants={reveal} className="mt-7 max-w-xl text-base font-light leading-8 text-white/68 sm:text-lg">
              {config.subtitle}
            </motion.p>
            <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="/contact">Talk to our team</ActionLink>
              <ActionLink href="/pricing" inverse>Explore pricing</ActionLink>
            </motion.div>
            <motion.div variants={reveal} className="mt-12 flex items-center gap-4 text-xs text-white/48">
              <div className="flex -space-x-2">
                {['PS', 'NK', 'EA'].map((initials) => (
                  <span key={initials} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-navy bg-[#d9d2bd] text-[9px] font-bold text-navy">
                    {initials}
                  </span>
                ))}
              </div>
              <span>Built for businesses that mean business.</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 lg:mt-12"
          >
            <div className="absolute -inset-5 border border-gold/25 sm:-inset-7" />
            <div className="relative aspect-[0.92] overflow-hidden bg-navy-800 sm:aspect-[1.06]">
              <img
                src={config.image}
                alt={config.imageAlt ?? config.title}
                className={`h-full w-full object-cover ${profile.imagePosition} opacity-90`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/75 via-transparent to-gold/10" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 p-6 sm:p-8">
                <p className="max-w-[180px] text-xs font-light leading-5 text-white/75">{profile.imageNote}</p>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/35 text-gold">
                  <ArrowDownRight className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-5 hidden w-44 bg-[#f3eee4] p-5 text-navy shadow-2xl sm:block lg:-left-10">
              <MapPin className="mb-4 h-5 w-5 text-gold" />
              <p className="font-heading text-sm font-semibold leading-5">A Kenyan base for serious work.</p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#fbfaf7] [clip-path:polygon(0_100%,0_55%,18%_75%,38%_45%,61%_76%,82%_50%,100%_68%,100%_100%)]" />
      </section>

      <section className="border-b border-navy/10 bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-navy/10 px-6 sm:px-10 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-16">
          {profile.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-center gap-4 py-7 md:justify-center md:py-8"
            >
              <span className="font-heading text-2xl font-semibold text-navy sm:text-3xl">{stat.value}</span>
              <span className="max-w-[120px] text-[10px] uppercase leading-4 tracking-[0.13em] text-dark-gray/48">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.p variants={reveal} className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">{profile.kicker}</motion.p>
            <motion.h2 variants={reveal} className="max-w-md font-heading text-3xl font-light leading-[1.1] text-navy sm:text-4xl">
              {profile.problemTitle}
            </motion.h2>
            <motion.div variants={reveal} className="mt-10 h-px w-16 bg-gold" />
            <motion.p variants={reveal} className="mt-7 max-w-md text-sm font-light leading-7 text-dark-gray/62">{profile.problem}</motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="relative border-l border-gold/40 pl-7 sm:pl-12"
          >
            <span className="absolute -left-[9px] top-0 h-[17px] w-[17px] rounded-full border-4 border-[#fbfaf7] bg-gold" />
            <motion.p variants={reveal} className="max-w-2xl font-heading text-3xl font-light leading-[1.14] text-navy sm:text-5xl">
              {profile.answerTitle}
            </motion.p>
            <motion.p variants={reveal} className="mt-7 max-w-2xl text-base font-light leading-8 text-dark-gray/62">{profile.answer}</motion.p>
            <motion.div variants={reveal} className="mt-10 flex items-start gap-3 text-sm text-navy">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>{profile.outcome}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f1eee7] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[1.08] overflow-hidden"
          >
            <img src={config.image} alt="" className={`h-full w-full object-cover ${profile.imagePosition} saturate-[0.75]`} />
            <div className="absolute inset-0 bg-navy/15 mix-blend-multiply" />
            <div className="absolute bottom-5 left-5 bg-[#fbfaf7] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy sm:bottom-7 sm:left-7">
              Paper Street / Nairobi
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }} variants={stagger}>
            <motion.p variants={reveal} className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Why it works</motion.p>
            <motion.h2 variants={reveal} className="max-w-xl font-heading text-3xl font-light leading-[1.1] text-navy sm:text-4xl">
              Practical support, with the polish your business deserves.
            </motion.h2>
            <motion.p variants={reveal} className="mt-6 max-w-xl text-sm font-light leading-7 text-dark-gray/62">{config.description}</motion.p>
            <motion.div variants={reveal} className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, label: 'Handled with discretion' },
                { icon: Clock3, label: 'Built around your time' },
                { icon: Headphones, label: 'A team you can reach' },
                { icon: Sparkles, label: 'A better first impression' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 border-t border-navy/10 pt-4 text-sm text-navy">
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <motion.p variants={reveal} className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">What you get</motion.p>
              <motion.h2 variants={reveal} className="font-heading text-3xl font-light text-navy sm:text-4xl">Everything in the detail.</motion.h2>
            </div>
            <motion.p variants={reveal} className="max-w-xs text-sm font-light leading-6 text-dark-gray/50">A straightforward service, thoughtfully delivered from our Kenyan locations.</motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid border-t border-navy/12 sm:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div key={feature} variants={reveal} className="group flex gap-5 border-b border-navy/12 py-7 pr-4 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1eee7] font-heading text-xs font-semibold text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex items-start gap-3 pt-1">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <p className="text-sm leading-6 text-navy">{feature}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-navy py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-xl">
            <motion.p variants={reveal} className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">A simple start</motion.p>
            <motion.h2 variants={reveal} className="font-heading text-3xl font-light leading-tight sm:text-4xl">From first conversation to fully up and running.</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="mt-16 grid gap-0 md:grid-cols-3">
            {profile.process.map((step, index) => (
              <motion.div key={step.title} variants={reveal} className="relative border-t border-white/20 py-7 md:border-l md:border-t-0 md:pl-8 md:pr-8 md:first:border-l-0 md:first:pl-0">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-heading text-4xl font-light text-gold/80">0{index + 1}</span>
                  {index < profile.process.length - 1 && <ArrowRight className="hidden h-4 w-4 text-white/30 md:block" />}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-6 text-white/52">{step.detail}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-16 flex flex-col gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-white/65">
              <MessageCircle className="h-4 w-4 text-gold" />
              Not sure which option is right? We will help you work it out.
            </div>
            <ActionLink href="/contact">Start a conversation</ActionLink>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28 lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={reveal} className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Questions, answered</motion.p>
            <motion.h2 variants={reveal} className="font-heading text-3xl font-light leading-tight text-navy sm:text-4xl">Clarity before commitment.</motion.h2>
            <motion.p variants={reveal} className="mt-6 max-w-sm text-sm font-light leading-7 text-dark-gray/55">If you are still weighing it up, send us a note. A useful answer is better than a hard sell.</motion.p>
            <motion.div variants={reveal} className="mt-8">
              <Link href="/contact" className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                Ask our team <MoveUpRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </motion.div>
          <div className="border-t border-navy/15">
            {profile.faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={faq.question} className="border-b border-navy/15">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="font-heading text-base font-semibold text-navy sm:text-lg">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-8 text-sm font-light leading-7 text-dark-gray/58">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#e8dfca] py-20 sm:py-28">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[36px] border-gold/20" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border border-navy/10" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-9 px-6 sm:px-10 md:flex-row md:items-end md:justify-between lg:px-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-2xl">
            <motion.p variants={reveal} className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-700">Make the next move</motion.p>
            <motion.h2 variants={reveal} className="font-heading text-4xl font-light leading-[1.05] text-navy sm:text-5xl">A professional base for where you are going.</motion.h2>
            <motion.p variants={reveal} className="mt-5 max-w-xl text-sm leading-7 text-navy/65">{profile.audience}</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="flex shrink-0 flex-wrap gap-3">
            <ActionLink href="/contact">Get a recommendation</ActionLink>
            <Link href="/pricing" className="group inline-flex items-center gap-3 border border-navy/25 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white sm:px-7">
              View pricing <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}