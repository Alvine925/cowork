import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hot Desk in Kisumu CBD | Day Pass & Monthly | Paper Street',
  description:
    'Hot desks in Kisumu CBD on Oginga Odinga Street. Flexible drop-in desk access with enterprise fibre internet, automatic generator backup, and professional reception. From KES 1,000/day.',
  keywords: ['hot desk Kisumu CBD', 'hot desk in Kisumu CBD', 'day pass Kisumu CBD', 'flexible desk Kisumu CBD', 'drop-in workspace Kisumu CBD'],
  openGraph: {
    title: 'Hot Desk in Kisumu CBD | Paper Street',
    description: 'Flexible hot desk access in Kisumu CBD — enterprise Wi-Fi, generator backup, professional reception. From KES 1,000/day or KES 12,000/month.',
    url: 'https://paperstreet.africa/hot-desk-kisumu-cbd',
  },
  alternates: { canonical: 'https://paperstreet.africa/hot-desk-kisumu-cbd' },
}

export default function HotDeskKisumuCBDPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">

      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">
              Hot Desk · Kisumu CBD · Oginga Odinga Street
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Hot Desk in Kisumu CBD.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Flexible, drop-in desk access at Paper Street Kisumu CBD — on Oginga Odinga Street. Enterprise fibre internet, automatic generator backup, air-conditioned workspace, and professional reception. No booking required. Walk in during business hours. From KES 1,000/day.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/hot-desk" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Get a Day Pass — KES 1,000 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              View Monthly Plans <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-black/10">
            {[
              ['KES 1,000', 'Day pass'],
              ['KES 4,500', 'Weekly pass (5 days)'],
              ['KES 12,000', 'Monthly unlimited'],
              ['No Booking', 'Walk in during business hours'],
            ].map(([val, label]) => (
              <div key={label}>
                <span className="text-lg sm:text-xl font-heading font-light text-navy">{val}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What a hot desk is */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">What Is a Hot Desk</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">What Hot Desk Access Gives You at Paper Street Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                A hot desk is a flexible, non-assigned desk on the Paper Street coworking floor. You arrive, choose any available seat, and work for the day or for the period you have purchased. There is no permanently reserved position — you use whatever is available on a first-come basis.
              </p>
              <p>
                At Paper Street Kisumu CBD, every hot desk seat comes with access to the same infrastructure as any other workspace in the building: the enterprise dual-carrier fibre internet connection, automatic standby generator backup, air conditioning, power socket access, and professional front-desk reception. There is no tiered internet or "premium desk" differentiation — every seat has the same commercial-grade infrastructure.
              </p>
              <p>
                The hot desk is the right option for professionals who need a productive, reliable, and professional workspace in Kisumu CBD but do not need a permanently reserved seat every single day. For professionals using the space 4 or more days per week, the monthly hot desk plan at KES 12,000 delivers significantly better value than daily drop-in rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Hot Desk Plans</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Hot Desk Plans at Paper Street Kisumu CBD</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                name: 'Day Pass',
                price: 'KES 1,000 / day',
                detail: 'No booking required — walk in during business hours (8 AM–6 PM).',
                body: 'Full business day access on the coworking floor. Choose any available desk and work for the full day. Enterprise fibre Wi-Fi, automatic generator backup, power socket access, air conditioning, and professional reception — all included. No minimum commitment, no advance booking required. Pay at the front desk on arrival.'
              },
              {
                name: 'Weekly Pass',
                price: 'KES 4,500 / week',
                detail: '5 consecutive business days — KES 900/day.',
                body: 'Five consecutive days of flexible hot desk access. A 10% saving on the daily drop-in rate. Ideal for visiting professionals in Kisumu for a defined assignment period, project-sprint weeks, or professionals testing regular coworking before committing to a monthly plan. All day pass inclusions apply.'
              },
              {
                name: 'Monthly Hot Desk',
                price: 'KES 12,000 / month',
                detail: 'Unlimited access throughout the calendar month — approximately KES 545/working day.',
                body: 'Unlimited flexible desk access throughout the calendar month. Includes all daily inclusions plus 2 hours monthly meeting room credit, front-desk mail and parcel receipt with email notification, and your name listed as a building recipient. The most cost-effective option for professionals working from the space 4 or more days per week. Upgrade to a dedicated desk (KES 16,500/month) to add a permanently reserved seat, lockable storage, and a registered commercial address.'
              },
            ].map((item) => (
              <div key={item.name} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="text-lg font-heading font-medium text-navy">{item.name}</h3>
                  <p className="text-xl font-heading font-light text-navy mt-2">{item.price}</p>
                  <p className="text-xs font-mono text-navy/50 mt-2 leading-relaxed">{item.detail}</p>
                </div>
                <div className="md:col-span-8 text-sm text-navy/75 font-light leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What every hot desk includes */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — Included</span>
            <h2 className="text-2xl font-heading font-light text-navy">What Every Hot Desk Access Includes</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-5">
            {[
              'Enterprise dual-carrier symmetrical fibre internet',
              'Automatic standby generator backup — zero KPLC interruption',
              'Air-conditioned coworking floor',
              'Power socket access at every desk',
              'Professional front-desk reception',
              'Ergonomic desk and seating',
              'Access to shared printer (per print charge applies)',
              'Daily cleaning and maintained workplace standards',
              'Meeting room booking at published rates',
              'Secure lockers available for day use (ask at reception)',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-navy/80 font-light">
                <span className="text-navy font-bold">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who uses hot desks */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — Common Users</span>
            <h2 className="text-2xl font-heading font-light text-navy">Who Uses the Hot Desk at Paper Street Kisumu CBD</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { who: 'Remote employees working for upcountry or international employers', why: 'A reliable workspace with enterprise internet and guaranteed power when working from Kisumu for companies based in Nairobi, Mombasa, or internationally.' },
              { who: 'Freelancers and independent consultants', why: 'A professional workspace for full working days — particularly for days involving client video calls, deadline-driven deliverables, or confidential document preparation where home environments are unsuitable.' },
              { who: 'Visiting professionals in Kisumu for assignments', why: 'Lawyers on client site visits, consultants on field assignments, NGO programme officers during active field periods, and business development managers visiting Kisumu for defined periods.' },
              { who: 'Professionals escaping home power or internet outages', why: 'The automatic generator backup and enterprise internet make Paper Street the reliable fallback when KPLC load-shedding or residential internet issues would otherwise disrupt a critical work day.' },
              { who: 'Entrepreneurs and startup founders in early stage', why: 'Before committing to a monthly membership or a private office, the day pass lets early-stage founders access a commercial CBD workspace and address on the days that matter most.' },
            ].map((item, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-5 font-heading text-sm font-medium text-navy">{item.who}</div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{item.why}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD Commercial Center</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              A professional hot desk in Kisumu CBD — from KES 1,000.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Enterprise internet. Automatic generator backup. Air conditioning. Professional reception. Walk in — no booking required.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/hot-desk" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Get a Day Pass <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                View Monthly Plans <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
