import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Private Office in Kisumu CBD | Lockable, Furnished, All-Inclusive | Paper Street',
  description:
    'Private offices in Kisumu CBD — fully furnished, lockable rooms with enterprise internet, automatic generator backup, commercial address, and professional reception. No lease deposit. From KES 28,000/month.',
  keywords: ['private office Kisumu CBD', 'private office in Kisumu CBD', 'private office space Kisumu CBD', 'serviced private office Kisumu CBD'],
  openGraph: {
    title: 'Private Office in Kisumu CBD | Paper Street',
    description: 'Fully furnished, lockable private offices in Kisumu CBD. Enterprise internet, generator backup, commercial address. No deposit. From KES 28,000/month.',
    url: 'https://paperstreet.africa/private-office-kisumu-cbd',
  },
  alternates: { canonical: 'https://paperstreet.africa/private-office-kisumu-cbd' },
}

export default function PrivateOfficeKisumuCBDPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">

      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">
              Private Office · Kisumu CBD · Oginga Odinga Street
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Private Office in Kisumu CBD.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Fully furnished, lockable private offices in the CBD Commercial Center on Oginga Odinga Street. Every room is ready for day-one occupancy — enterprise internet connected, generator backup active, cleaning managed, and a commercial address registered for your business.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Check Office Availability <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              View Plans <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What private means */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">What Private Means</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">What "Private" Actually Means in This Context</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                A private office at Paper Street is a fully enclosed, floor-to-ceiling-walled room with a lockable door. Your team has sole access. Other coworking members on the shared floor cannot see into your space, cannot hear your conversations through open partitions, and do not share your workstations or storage.
              </p>
              <p>
                This distinction matters for several categories of work. Legal and financial professionals have confidentiality obligations — private rooms with acoustic isolation satisfy these. NGO and development sector organisations frequently handle sensitive programme data. Businesses working on competitive product development or commercially sensitive procurement strategies require a space where confidential documents can be left on desks and whiteboards can remain populated overnight without exposure to third parties.
              </p>
              <p>
                A private office at Paper Street is not an open-plan desk with a privacy screen or a "focus pod" in a corner of a coworking floor. It is a proper enclosed office room, accessed only by the occupant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office configurations */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Configurations</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Private Office Configurations & Pricing</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { label: 'Solo Private Office', cap: '1 person', price: 'From KES 28,000 / month', desc: 'A single enclosed private office room with one commercial workstation, ergonomic chair, lockable door, and personal storage. Enterprise fibre Wi-Fi, automatic generator backup, air conditioning, daily cleaning, and a registered business address included. Ideal for attorneys, financial advisors, consultants, and sole practitioners who need an enclosed professional workspace without sharing a desk.' },
              { label: '1–2 Person Private Suite', cap: '1–2 people', price: 'From KES 35,000 / month', desc: 'An enclosed private room with two commercial-grade workstations and seating, lockable access, storage pedestal for each occupant. All infrastructure included. 5 hours monthly meeting room credit. Registered commercial address on Oginga Odinga Street, accepted by BRS, KRA, and banks for all compliance documentation.' },
              { label: '3–5 Person Team Office', cap: '3–5 people', price: 'From KES 65,000 / month', desc: 'A larger enclosed team room with 3 to 5 workstations. Full acoustic separation from the shared coworking floor. Your team has sole key access. All utilities on a single monthly invoice — no separate electricity, internet, cleaning, or generator costs to manage. 10 hours monthly boardroom credit.' },
              { label: '6–10 Person Custom Configuration', cap: '6–10 people', price: 'Contact for pricing', desc: 'Custom larger private office configurations available in the building for teams of 6 to 10 people. Contact our team to discuss current availability, layout, and pricing.' },
            ].map((item, i) => (
              <div key={i} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="text-base font-heading font-medium text-navy">{item.label}</h3>
                  <p className="text-xs font-mono text-navy/50 mt-1">{item.cap}</p>
                  <p className="text-xl font-heading font-light text-navy mt-3">{item.price}</p>
                </div>
                <div className="md:col-span-8 text-sm text-navy/75 font-light leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything included */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — All Inclusive</span>
            <h2 className="text-2xl font-heading font-light text-navy">Everything Included in Your Monthly Fee</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-5">
            {[
              'Commercial workstations and ergonomic seating',
              'Enterprise dual-carrier fibre internet',
              'Automatic standby generator backup',
              'Full air conditioning 8 AM–6 PM',
              'Daily office cleaning and waste management',
              'Lockable door — your key, sole access',
              'Registered commercial address — Oginga Odinga Street, Kisumu CBD',
              'BRS, KRA, and commercial banking compliant address',
              'Professional front-desk reception and client greeting',
              'Mail and courier receipt, logging, and notification',
              'Monthly meeting room credits',
              'Single all-inclusive monthly invoice — no surprise bills',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-navy/80 font-light">
                <span className="text-navy font-bold">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs conventional lease */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — Comparison</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Serviced Private Office vs Conventional Bare Lease</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm text-navy/80 font-light leading-relaxed">
              <p>
                A conventional bare lease on a private office in Kisumu CBD typically requires: 3–6 months deposit (KES 90,000–180,000 for a small office), legal fees (KES 15,000–40,000), fit-out capital for partitions, paint, furniture, and cabling (KES 100,000–250,000), commercial internet setup and first-year cost (KES 60,000–100,000), and generator arrangements.
              </p>
              <p>
                Total pre-operational capital: typically KES 265,000–570,000 before you sit at a desk. And you still manage electricity, cleaning, generator fuel, and maintenance on an ongoing basis on top of the monthly rent.
              </p>
              <p>
                A Paper Street private suite at KES 35,000–65,000/month has zero upfront cost beyond the first month's payment, is operational on day one with all utilities included, and scales with your team size. For teams up to 10 people, the total cost comparison over 12 months overwhelmingly favours the managed serviced private office — even before accounting for the management time saved on operational maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD Commercial Center</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              Your own lockable office in Kisumu CBD — from KES 28,000/month.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              No deposit. No fit-out. Day one occupancy. Enterprise internet, automatic generator, commercial address, and daily cleaning — all included.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Check Availability <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                View All Plans <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
