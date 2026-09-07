import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coworking Space in Kisumu CBD | Paper Street — Oginga Odinga Street',
  description:
    'Professional coworking space in Kisumu CBD on Oginga Odinga Street. Enterprise fibre internet, automatic generator backup, commercial address, and professional reception — from KES 1,000/day.',
  keywords: ['coworking space Kisumu CBD', 'coworking space in Kisumu CBD', 'shared workspace Kisumu CBD', 'coworking Kisumu CBD'],
  openGraph: {
    title: 'Coworking Space in Kisumu CBD | Paper Street',
    description: 'Professional coworking in Kisumu CBD — enterprise internet, generator backup, commercial address. From KES 1,000/day.',
    url: 'https://paperstreet.africa/coworking-space-kisumu-cbd',
  },
  alternates: { canonical: 'https://paperstreet.africa/coworking-space-kisumu-cbd' },
}

export default function CoworkingSpaceKisumuCBDPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">

      {/* Hero */}
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">
              Kisumu CBD · Oginga Odinga Street
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Coworking Space in Kisumu CBD.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Paper Street is a professionally managed coworking space in Kisumu Central Business District, operating from the CBD Commercial Center on Oginga Odinga Street. Enterprise infrastructure. Commercial address. Professional reception. Day passes, monthly desks, and private offices — all in one building.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/hot-desk" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Get a Day Pass — KES 1,000 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Book a Free Tour <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-black/10">
            {[
              ['KES 1,000', 'Day pass from'],
              ['KES 12,000', 'Monthly hot desk'],
              ['Dual Fibre', 'Enterprise internet'],
              ['Auto Generator', 'Zero outage risk'],
            ].map(([val, label]) => (
              <div key={label}>
                <span className="text-xl sm:text-2xl font-heading font-light text-navy">{val}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Building */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Location</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Kisumu CBD — Commercial Center, Oginga Odinga Street</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Oginga Odinga Street is Kisumu's primary commercial spine — the address where banks, law firms, government offices, professional services, and institutional offices are concentrated. A business address on this street carries the professional weight of a central business district location, not a peripheral estate or residential neighbourhood.
              </p>
              <p>
                Paper Street operates within an established commercial building that is purpose-configured for commercial occupancy — not a converted residential flat, not a retail space adapted for desk use. The building has a staffed front desk at the ground floor entrance, lift access, commercial-standard ablution facilities, and dedicated office floors above street level.
              </p>
              <p>
                The CBD location places you within walking distance of Kisumu's major commercial bank branches, the Kisumu Law Courts, county government offices, major procurement institutions, and the professional services corridor that your clients, partners, and suppliers are also operating from.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — Infrastructure</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">What Is Inside the Building</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                title: 'Enterprise Dual-Carrier Fibre Internet',
                body: 'Internet connectivity is served via two independent enterprise fibre carriers operating simultaneously. If the primary carrier experiences a fault, the secondary line maintains full connectivity automatically — no manual intervention, no dropped sessions. The total available bandwidth supports concurrent video conferencing, cloud application use, large file transfers, and developer toolchains across all active members simultaneously. This is not a residential or commercial DSL connection resold through a router — it is enterprise-grade infrastructure designed for professional multi-user commercial use.'
              },
              {
                no: '02',
                title: 'Automatic Standby Generator',
                body: 'KPLC load shedding in Kisumu and Western Kenya is a routine operational reality. Paper Street\'s building runs on an automatic standby generator that detects grid failure and switches the facility to generator power within seconds — before any connected device has time to register an outage. The transition is invisible to members. Your video call continues. Your file upload does not fail. Your screen does not go dark. The generator is maintained on a scheduled servicing programme and keeps an active diesel fuel inventory.'
              },
              {
                no: '03',
                title: 'Air-Conditioned Workspace',
                body: 'The coworking floor is fully air-conditioned to a consistent working temperature throughout the business day. This is a non-trivial operational consideration in Kisumu, where ambient temperatures regularly reach 28–32°C during peak daytime hours. An uncomfortable thermal environment has a measurable impact on concentration and output quality — climate control is infrastructure, not a luxury.'
              },
              {
                no: '04',
                title: 'Professional Front-Desk Reception',
                body: 'A staffed reception team operates at the building entrance during business hours. They receive visitors for members, handle incoming mail and parcels, direct couriers to the correct department, provide building assistance, and manage the general professional presentation of the facility. For coworking members expecting client visits, the front-desk reception provides a professional first point of contact without requiring you to be at the building entrance when your client arrives.'
              },
              {
                no: '05',
                title: 'Meeting Rooms — Bookable by the Hour',
                body: 'Private meeting rooms and an executive boardroom are available to book by the hour. Small rooms seat 2–4 people from KES 1,500/hour. The boardroom seats 6–12 from KES 2,500/hour. All rooms include presentation screens, fibre Wi-Fi, generator backup, and air conditioning. Monthly members receive included meeting room credits — hot desk members get 2 hours monthly, dedicated desk members get 5 hours monthly.'
              },
            ].map((item) => (
              <div key={item.no} className="py-8 grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold">{item.no}</div>
                <div className="md:col-span-4">
                  <h3 className="text-base font-heading font-medium text-navy">{item.title}</h3>
                </div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — Plans</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Coworking Plans at Paper Street Kisumu CBD</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { plan: 'Day Pass', price: 'KES 1,000 / day', desc: 'Walk-in flexible desk access for a full business day, 8 AM–6 PM. No booking required during business hours. Enterprise Wi-Fi, generator backup, air conditioning, power sockets.' },
              { plan: 'Weekly Pass', price: 'KES 4,500 / week', desc: '5 consecutive business days of flexible hot desk access. KES 900/day — a 10% saving on daily rates. All standard day pass inclusions.' },
              { plan: 'Monthly Hot Desk', price: 'KES 12,000 / month', desc: 'Unlimited flexible desk access throughout the calendar month. Includes 2 hours meeting room credit, front-desk mail receipt, email notifications. Approx. KES 545/working day.' },
              { plan: 'Dedicated Desk', price: 'KES 16,500 / month', desc: 'Your own permanently reserved desk with lockable storage pedestal. Registered commercial address on Oginga Odinga Street. 5 hours meeting room credit monthly. BRS and banking address compliant.' },
              { plan: 'Private Team Suite', price: 'From KES 35,000 / month', desc: 'Enclosed, lockable private office for 1–10 people. Fully furnished with commercial workstations. All utilities included. Registered business address. Meeting room credits.' },
            ].map((item, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-4">
                  <h3 className="text-base font-heading font-medium text-navy">{item.plan}</h3>
                  <p className="text-lg font-heading font-light text-navy mt-1">{item.price}</p>
                </div>
                <div className="md:col-span-8 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address section */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">04 — Business Address</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">A Kisumu CBD Address on Every Plan</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm text-navy/80 font-light leading-relaxed">
              <p>
                From the dedicated desk plan upwards, your membership includes the Paper Street commercial address at Kisumu CBD Commercial Center, Oginga Odinga Street as your registered office address. This address is accepted by the Business Registration Service (BRS eCitizen) for company incorporation, by the Kenya Revenue Authority for PIN and VAT registration, and by major Kenyan commercial banks for corporate account opening.
              </p>
              <p>
                Virtual office members — who need the address without a daily physical desk — can access the address from KES 3,500/month through the Business Address plan. This covers company registration, banking, and mail handling for businesses that operate primarily remotely but need a verifiable Kisumu CBD presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD Commercial Center</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              Professional coworking in Kisumu CBD — from KES 1,000.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Day passes, monthly desks, private offices, and virtual office plans — all in a single commercial building on Oginga Odinga Street, Kisumu CBD.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/hot-desk" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Get a Day Pass <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Schedule a Tour <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
