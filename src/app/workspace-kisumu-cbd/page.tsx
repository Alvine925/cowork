import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Workspace in Kisumu CBD | Professional Workspace on Oginga Odinga Street | Paper Street',
  description:
    'Professional workspace in Kisumu CBD — hot desks, dedicated desks, private offices, and virtual office plans in the CBD Commercial Center on Oginga Odinga Street. Enterprise internet, generator backup, commercial address.',
  keywords: ['workspace Kisumu CBD', 'workspace in Kisumu CBD', 'professional workspace Kisumu CBD', 'work space Kisumu CBD', 'shared workspace Kisumu CBD'],
  openGraph: {
    title: 'Workspace in Kisumu CBD | Paper Street',
    description: 'Every type of professional workspace in Kisumu CBD — hot desks, private offices, virtual office plans. Enterprise internet, generator backup, commercial address.',
    url: 'https://paperstreet.co.ke/workspace-kisumu-cbd',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/workspace-kisumu-cbd' },
}

export default function WorkspaceKisumuCBDPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">

      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">
              Professional Workspace · Kisumu CBD · Oginga Odinga Street
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Professional Workspace in Kisumu CBD.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Paper Street is a professionally managed commercial workspace in Kisumu Central Business District. Day passes, dedicated desks, private team offices, meeting rooms, and virtual office plans — all operating from the CBD Commercial Center on Oginga Odinga Street. Enterprise infrastructure. One building. Every type of workspace your business needs.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/pricing" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              View All Plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Book a Free Tour <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-black/10">
            {[
              ['KES 1,000', 'Day pass from'],
              ['KES 3,500', 'Virtual office from'],
              ['KES 12,000', 'Monthly hot desk'],
              ['KES 35,000', 'Private office from'],
            ].map(([val, label]) => (
              <div key={label}>
                <span className="text-lg sm:text-xl font-heading font-light text-navy">{val}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why workspace in CBD */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Why Kisumu CBD</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Professional Workspace in the Right Location</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                The Kisumu Central Business District on Oginga Odinga Street is where Kisumu's professional, commercial, and institutional infrastructure is concentrated. Banks, county government offices, law chambers, procurement institutions, and professional services firms operate from this corridor. It is the address that carries weight in Kisumu's commercial ecosystem.
              </p>
              <p>
                Operating your workspace — and your registered office address — from the CBD is not simply a location preference. It is a professional positioning decision. A business based at a CBD commercial address in Kisumu sits in the same institutional context as the banks, law firms, and established businesses that your clients, partners, and procurement officers operate from. A business based in a residential estate or peripheral location does not have the same contextual credibility, regardless of the quality of the work being done there.
              </p>
              <p>
                Paper Street brings professional commercial workspace to Kisumu CBD at accessible, transparent rates — without the capital commitment, fit-out overhead, and contractual risk of a conventional commercial lease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Every workspace type */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Workspace Options</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Every Type of Workspace at Paper Street Kisumu CBD</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                type: 'Hot Desk — Day Pass',
                price: 'KES 1,000 / day',
                desc: 'Flexible, walk-in desk access for a full business day. No booking required. Enterprise fibre internet, automatic generator backup, air conditioning, power sockets, and front-desk reception. The right option for occasional professional workspace needs, important deadline days, or client video calls from a reliable commercial environment.'
              },
              {
                no: '02',
                type: 'Hot Desk — Monthly',
                price: 'KES 12,000 / month',
                desc: 'Unlimited flexible desk access throughout the calendar month. Includes 2 hours monthly meeting room credit and front-desk mail receipt. Approximately KES 545/working day — significantly more cost-effective than daily drop-in for regular users. The right option for remote workers and freelancers who need a reliable primary workspace in Kisumu CBD.'
              },
              {
                no: '03',
                type: 'Dedicated Desk — Monthly',
                price: 'KES 16,500 / month',
                desc: 'Your own permanently reserved desk — same physical seat, every day — with a lockable storage pedestal. Includes a registered commercial business address on Oginga Odinga Street (BRS, KRA, and banking compliant), 5 hours monthly meeting room credit, and front-desk mail receipt. The right option for consultants, lawyers, financial professionals, and solo practitioners who need a permanent professional workspace and a formal business address.'
              },
              {
                no: '04',
                type: 'Private Team Office Suite',
                price: 'From KES 35,000 / month',
                desc: 'A fully enclosed, lockable private office room for 1–10 people. Fully furnished with commercial workstations, ergonomic seating, and lockable storage. All utilities — fibre internet, generator, air conditioning, daily cleaning — on a single monthly invoice. Registered commercial address, meeting room credits, and professional reception included. No deposit. Day one occupancy.'
              },
              {
                no: '05',
                type: 'Virtual Office — Business Address',
                price: 'KES 3,500 / month',
                desc: 'A Kisumu CBD commercial address without a daily physical desk. The address is accepted by BRS, KRA, and banks. Mail and parcel receipt, email notifications, 30-day storage, and discounted meeting room rates. The right option for remote operators, home-based businesses, and companies entering Kisumu who need compliance infrastructure without a full workspace commitment.'
              },
              {
                no: '06',
                type: 'Meeting Rooms',
                price: 'From KES 1,500 / hour',
                desc: 'Private meeting rooms and an executive boardroom bookable by the hour, half-day, or full day. Small rooms (2–4 people) from KES 1,500/hour. Boardroom (6–12 people) from KES 2,500/hour. Conference/training room (8–20 people) from KES 9,000/half-day. All rooms include presentation screens, enterprise Wi-Fi, generator backup, air conditioning, and front-desk reception.'
              },
            ].map((item) => (
              <div key={item.no} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{item.no}</div>
                <div className="md:col-span-11">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-lg font-heading font-medium text-navy">{item.type}</h3>
                    <span className="text-sm font-mono font-medium text-navy whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-sm text-navy/75 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — Building Infrastructure</span>
            <h2 className="text-2xl font-heading font-light text-navy">What Every Workspace in the Building Has</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-5">
            {[
              'Enterprise dual-carrier symmetrical fibre internet',
              'Automatic standby generator — zero outage risk',
              'Full building air conditioning',
              'Professional front-desk reception (business hours)',
              'Commercial registered address — Oginga Odinga Street',
              'BRS, KRA, and banking compliant address available',
              'Daily cleaning and maintained facility standards',
              'Power socket access at all workstations',
              'Bookable meeting rooms in the same building',
              'Lift and stair access — fully accessible building',
              'Secure parking in the CBD vicinity',
              'Single monthly invoice — all utilities included',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-navy/80 font-light">
                <span className="text-navy font-bold">—</span>
                <span>{item}</span>
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
              Professional workspace in Kisumu CBD — every type, one building.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Day passes from KES 1,000. Monthly hot desks from KES 12,000. Private offices from KES 35,000. Virtual office from KES 3,500. All on Oginga Odinga Street.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                View All Plans <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Book a Tour <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
