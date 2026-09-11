import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Office Space in Kisumu CBD | Furnished & Serviced | Paper Street',
  description:
    'Furnished, serviced office space in Kisumu CBD on Oginga Odinga Street. Private offices for 1–10 people, month-to-month terms, enterprise internet, generator backup. No deposit, no fit-out.',
  keywords: ['office space Kisumu CBD', 'office space in Kisumu CBD', 'serviced office Kisumu CBD', 'furnished office Kisumu CBD', 'office rental Kisumu CBD'],
  openGraph: {
    title: 'Office Space in Kisumu CBD | Paper Street',
    description: 'Private, furnished, serviced office space in Kisumu CBD. Month-to-month. No deposit. Enterprise internet included. From KES 35,000/month.',
    url: 'https://paperstreet.co.ke/office-space-kisumu-cbd',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/office-space-kisumu-cbd' },
}

export default function OfficeSpaceKisumuCBDPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">

      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">
              Kisumu CBD · Office Space · Oginga Odinga Street
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Office Space in Kisumu CBD.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Fully furnished, immediately operational office space in Kisumu's Central Business District. No deposit. No fit-out costs. No separate internet or generator contracts. One monthly invoice covering everything — from KES 35,000/month.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              View Available Offices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/services/dedicated-desk" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              See All Options <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-black/10">
            {[
              ['From KES 35,000', 'Private office per month'],
              ['No Deposit', 'Zero upfront capital'],
              ['Day 1 Ready', 'Move in immediately'],
              ['All Inclusive', 'Internet, power, cleaning'],
            ].map(([val, label]) => (
              <div key={label}>
                <span className="text-lg sm:text-xl font-heading font-light text-navy">{val}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The problem with conventional office leases */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Context</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">What Finding Office Space in Kisumu CBD Usually Involves</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                The conventional route to office space in Kisumu CBD starts with a bare shell: empty floor, exposed concrete or screed, unpainted walls, bare electrical conduit. From that point you negotiate a lease (requiring a lawyer), pay 3 months deposit, source and install partitions, paint, procure and transport furniture, negotiate a commercial internet contract (with a fibre installation fee), and sort out generator coverage — either through a building landlord arrangement or your own unit.
              </p>
              <p>
                By the time a small team of 3 people is sitting at working desks in a conventional CBD office, they have typically spent KES 200,000–500,000 in pre-operational capital, signed a 1–3 year lease commitment, and used 4–12 weeks of lead time before a single productive work session occurred in that space.
              </p>
              <p>
                Paper Street eliminates every element of that process. The space is already furnished, already connected to enterprise fibre, already on generator backup, already cleaned daily, and already managed by a professional front desk. You sign a month-to-month agreement and you are working on day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office types */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Office Options</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Available Office Configurations</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                type: 'Solo Private Office',
                capacity: '1 person',
                price: 'From KES 28,000 / month',
                body: 'An enclosed, lockable private room with a single commercial workstation, ergonomic chair, and storage. Includes enterprise fibre connection, generator backup, air conditioning, daily cleaning, and a registered commercial business address on Oginga Odinga Street. Suitable for sole traders, attorneys operating a satellite office, consultants, and professionals who require a private enclosed workspace without a shared-desk arrangement.'
              },
              {
                type: '1–2 Person Suite',
                capacity: '1–2 people',
                price: 'From KES 35,000 / month',
                body: 'A furnished private suite with 2 commercial-grade workstations, ergonomic seating, lockable door, and dedicated storage. All utilities — fibre internet, generator, air conditioning, daily cleaning — are included. The suite provides full acoustic privacy from the open coworking floor. Registered business address on Oginga Odinga Street included. 5 hours monthly meeting room credit.'
              },
              {
                type: '3–5 Person Team Office',
                capacity: '3–5 people',
                price: 'From KES 65,000 / month',
                body: 'A larger private enclosed office for a small team. Configured with 3 to 5 commercial workstations, lockable access, team-level storage, and the same all-inclusive infrastructure package. Suitable for startup teams, small professional services firms, NGO field offices, and growing businesses that need team cohesion and privacy without a conventional lease commitment. 10 hours monthly meeting room credit.'
              },
              {
                type: '6–10 Person Office',
                capacity: '6–10 people',
                price: 'On request',
                body: 'Custom larger office configurations for teams of 6 to 10 people are available in the Paper Street commercial building. Contact us directly to discuss current availability, layout options, and pricing for team offices at this scale. Custom configurations for specific team requirements — additional storage, specialist equipment, dedicated server space — can be accommodated.'
              },
            ].map((item, i) => (
              <div key={i} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="text-lg font-heading font-medium text-navy">{item.type}</h3>
                  <p className="text-xs font-mono text-navy/50 mt-1">{item.capacity}</p>
                  <p className="text-xl font-heading font-light text-navy mt-3">{item.price}</p>
                </div>
                <div className="md:col-span-8 text-sm text-navy/75 font-light leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What every office includes */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — All Inclusive</span>
            <h2 className="text-2xl font-heading font-light text-navy">What Every Office Includes</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-6">
            {[
              'Fully furnished with commercial workstations and seating',
              'Enterprise dual-carrier fibre internet',
              'Automatic standby generator — zero KPLC interruption',
              'Full air conditioning throughout',
              'Daily office cleaning and waste management',
              'Professional front-desk reception',
              'Registered commercial address — Oginga Odinga Street',
              'BRS, KRA, and banking address compliant',
              'Lockable private access — your key, your space',
              'Monthly meeting room credits',
              'Courier and mail receipt, logging, and notification',
              'All utilities on a single monthly invoice',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-navy/80 font-light">
                <span className="text-navy font-bold text-base leading-tight">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — Location</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Why Kisumu CBD on Oginga Odinga Street</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm text-navy/80 font-light leading-relaxed">
              <p>
                Oginga Odinga Street is the commercial and institutional centre of Kisumu — Kenya's third-largest city and the capital of Kisumu County and the Lake Victoria basin. The street hosts the concentration of commercial banks, legal chambers, government agencies, county departments, and established professional services firms that constitute Kisumu's formal business district.
              </p>
              <p>
                A Kisumu CBD office address on this street is the strongest commercial address your business can have in Western Kenya. It is the address that procurement departments, legal counterparties, banks, and institutional clients expect from a professionally operating business. It carries more weight in a company CR12, a tender submission, or a bank account opening pack than any Kisumu residential or peripheral address.
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
              Fully serviced office space in Kisumu CBD — from KES 35,000/month.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Move in on day one. No deposit. No fit-out. All-inclusive: internet, generator, air conditioning, cleaning, address, and reception.
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
