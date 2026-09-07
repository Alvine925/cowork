'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck, Zap, Building, Users } from 'lucide-react'
import { CallToAction } from '@/components/home/CallToAction'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const up: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const PERSONAS = [
  {
    tag: 'Freelancers & Independent Consultants',
    headline: 'Stop losing high-value deals to residential addresses.',
    body: "You deliver top-tier work, but prospective clients second-guess your rates when they see a home estate on your invoice or have to meet you in a crowded cafe. Paper Street gives you an official commercial address in Kisumu CBD and a private meeting room to close proposals with authority.",
    cta: 'Explore Business Address',
    href: '/services/business-address',
  },
  {
    tag: 'Expanding National Companies & SMEs',
    headline: 'Establish your Western Kenya branch in 24 hours.',
    body: "Bidding on Lake basin tenders or serving clients in Kisumu, Kakamega, and surrounding counties? Establish an active commercial branch contact in Kisumu CBD without paying 6 months deposit, legal fees, and fit-out costs for a traditional office lease.",
    cta: 'Set Up Branch Address',
    href: '/services/virtual-office',
  },
  {
    tag: 'Remote Engineers & Creators',
    headline: 'A quiet, distraction-free environment for deep focus.',
    body: "Skip home distractions and power blackouts. Our hot desks and dedicated desks provide ergonomic seating, automatic generator backup, and high-speed internet so you can ship work without interruptions.",
    cta: 'Book Desk Access',
    href: '/services/hot-desk',
  },
  {
    tag: 'Consulting Firms & Project Teams',
    headline: 'Private 4K presentation rooms bookable by the hour.',
    body: "Host client presentations, strategy reviews, and partner negotiations in an acoustically isolated room equipped with a 4K presentation display, video conferencing, and front-desk reception greeting for your guests.",
    cta: 'Reserve Meeting Room',
    href: '/services/meeting-rooms',
  },
]

const PRINCIPLES = [
  {
    icon: Building,
    title: 'Legitimate Commercial Presence',
    desc: 'Every business address we provide is tied to our physical commercial facility in Kisumu CBD—authorized for business registration, banking, tax documentation, and tender proposals.',
  },
  {
    icon: Zap,
    title: 'Zero Downtime Infrastructure',
    desc: 'We treat reliability seriously. Our facility is equipped with redundant commercial internet links and automatic generator power backup so your work and video calls never drop.',
  },
  {
    icon: ShieldCheck,
    title: 'Discreet, Professional Front Desk',
    desc: 'Our front-desk team acts as your on-site reception—logging incoming letters, greeting visiting clients, and delivering instant notifications straight to your portal.',
  },
  {
    icon: Users,
    title: 'Zero Property Lease Overhead',
    desc: 'Traditional commercial leases demand deposits, utility bills, maintenance, and long lock-ins. We provide transparent monthly and annual plans that flex with your workflow.',
  },
]

export function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-navy">
      {/* ── 1. Hero ── */}
      <section className="relative min-h-[50vh] flex items-center bg-black text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&q=85"
          alt="Paper Street Kisumu CBD"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 py-20 max-w-5xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Our Purpose & Background
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight max-w-2xl">
            Commercial presence and workspace infrastructure in <span className="text-gold italic">Kisumu CBD.</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-white/75 font-light max-w-xl leading-relaxed">
            Paper Street exists to remove the overhead, risk, and friction of establishing a business presence in Western Kenya. We provide commercial registered addresses, mail management, and quiet meeting spaces for ambitious founders and expanding companies.
          </p>
        </div>
      </section>

      {/* ── 2. The Problem We Solved (The Origin) ── */}
      <section className="py-20 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-1.5">
                The Reality
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-light text-navy leading-tight">
                Why we built Paper Street.
              </h2>
            </div>

            <div className="md:col-span-7 space-y-4 text-xs md:text-sm text-navy/70 leading-relaxed font-light">
              <p>
                For years, businesses wanting to operate in Kisumu faced an unreasonable choice: spend hundreds of thousands of shillings on 6-month office deposits, broker fees, furniture, and utility setups—or work from residential estates and noisy cafes that hurt client trust.
              </p>
              <p>
                At the same time, national companies and Nairobi-based firms needed a verified commercial contact address in Kisumu to bid on Western Kenya tenders and serve local partners, but couldn't justify the overhead of a full branch office lease.
              </p>
              <p>
                We built Paper Street in Kisumu CBD to solve this: an enterprise-grade commercial presence, front-desk mail receiving, and private meeting rooms available immediately on flexible terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Who We Serve (4 Grounded Segments) ── */}
      <section className="py-20 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
              Who We Serve
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-light text-navy mt-1.5">
              Designed for serious operators in Western Kenya.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
            {PERSONAS.map((p, i) => (
              <div key={i} className="border-t border-navy/10 pt-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-navy font-bold block mb-2">
                    {p.tag}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-navy leading-snug mb-3">
                    {p.headline}
                  </h3>
                  <p className="text-xs text-navy/65 leading-relaxed font-light mb-6">
                    {p.body}
                  </p>
                </div>
                <Link
                  href={p.href}
                  className="text-xs font-semibold text-navy hover:text-navy-600 uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                >
                  {p.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Our Core Standards ── */}
      <section className="py-24 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
              Our Operating Standards
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-light text-navy mt-1.5">
              Built on reliability and transparency.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
            {PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon
              return (
                <div key={idx} className="border-t border-navy/10 pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-navy mb-2">
                    <Icon size={18} />
                    <span className="font-mono text-[10px] text-navy font-bold">0{idx + 1}</span>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg text-navy">{principle.title}</h3>
                  <p className="text-xs text-navy/70 leading-relaxed font-light">
                    {principle.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Kisumu CBD Location Summary ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-navy/10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-1">
                Central Location
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-light text-navy">
                Based in the Central Business District (CBD) of Kisumu
              </h3>
              <p className="mt-2 text-xs text-navy/65 max-w-xl leading-relaxed">
                Accessible to regional banks, county administrative offices, and Lake Victoria transit links. Open Monday to Saturday for members and on-demand bookings.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/pricing"
                className="bg-navy text-white px-6 py-3 text-[11px] uppercase tracking-wider font-semibold hover:bg-gold hover:text-white transition-colors inline-flex items-center gap-2"
              >
                View Plans & Pricing <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  )
}
export default AboutPage
