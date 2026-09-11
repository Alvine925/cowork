import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Office Space for Rent in Kisumu | Serviced Commercial Offices | Paper Street',
  description:
    'Looking for office space for rent in Kisumu? Paper Street provides turnkey furnished offices in Kisumu CBD with internet, generator backup, and zero fit-out costs.',
  keywords: ['office space for rent in Kisumu', 'office space Kisumu', 'serviced offices Kisumu', 'commercial office rental Kisumu'],
  openGraph: {
    title: 'Office Space for Rent in Kisumu: Serviced Commercial Offices',
    description: 'Find flexible, furnished office space for rent in Kisumu CBD. Move in immediately with all utilities included.',
    url: 'https://paperstreet.co.ke/office-space-for-rent-in-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/office-space-for-rent-in-kisumu' },
}

export default function OfficeSpaceForRentKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Commercial Office Space / Kisumu CBD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Office Space for Rent in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Furnished, serviced private office suites and team spaces in Kisumu Central Business District. Ready for day one occupancy with high-speed fibre internet, automatic generator backup, daily cleaning, and reception services included on a single monthly invoice.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Inquire Available Suites <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              View Office Pricing <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Comparison</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Traditional Leases vs Serviced Office Space</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Renting traditional bare office space in Kisumu requires significant upfront capital: landlords demand 3 to 6 months of rent as a deposit, commercial lawyers charge fees to draft leases, and you must fund dry-wall partitioning, painting, furniture acquisition, and individual utility contracts.
              </p>
              <p>
                Serviced office space at Paper Street removes these barriers entirely. Your office suite is fully furnished with ergonomic workstations, connected to dual-carrier high-speed fibre, backed by an automatic generator, and cleaned daily by our facility team. You pay a single monthly bill and can scale your team size up or down as required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 / Suite Options</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Office Configurations Available in Kisumu CBD</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                title: 'Solo Private Suite (1 Person)',
                price: 'From KES 28,000 / month',
                desc: 'An enclosed, lockable private office room for independent professionals, consultants, and legal advocates needing complete acoustic privacy and dedicated personal storage.',
              },
              {
                title: 'Partner Suite (2 to 3 People)',
                price: 'From KES 35,000 / month',
                desc: 'Furnished office suite for small professional partnerships and startup co-founders. Includes commercial desks, high-speed fibre, generator backup, and meeting room credits.',
              },
              {
                title: 'Team Office (4 to 8 People)',
                price: 'From KES 65,000 / month',
                desc: 'Spacious lockable team office for expanding regional branches, NGO field programmes, and tech startups. Includes commercial business address and boardroom hours.',
              },
            ].map((suite, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-5 font-heading text-lg font-medium text-navy">
                  {suite.title}
                  <p className="text-sm font-mono text-navy font-semibold mt-1">{suite.price}</p>
                </div>
                <div className="md:col-span-7 text-sm text-navy/75 font-light leading-relaxed">{suite.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 / Questions</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                q: 'What is included in the monthly office rental price?',
                a: 'Your rent covers fully furnished commercial workstations, ergonomic chairs, dual-carrier enterprise fibre internet, automatic standby generator backup, electricity, water, daily cleaning, reception services, and monthly boardroom hours.',
              },
              {
                q: 'Do I need to pay a 3 to 6 month security deposit?',
                a: 'No. Traditional commercial landlords in Kisumu demand 3 to 6 months deposit upfront plus legal drafting fees. Paper Street offers flexible monthly or quarterly terms with zero lease deposits.',
              },
              {
                q: 'How quickly can our team move into an office suite?',
                a: 'Our suites are turnkey ready. You can complete agreement onboarding and move in within 24 hours with internet and power running immediately.',
              },
              {
                q: 'Can we use the office address for BRS company incorporation on eCitizen?',
                a: 'Yes. Every private office membership includes an official commercial registered address on Oginga Odinga Street compliant with BRS and KRA requirements.',
              },
              {
                q: 'What team sizes can you accommodate in Kisumu CBD?',
                a: 'We have private office options ranging from 1 to 2 person executive rooms to 4 to 8 person team suites and scalable multi-desk layouts.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="py-6 grid md:grid-cols-12 gap-4">
                <div className="md:col-span-5 font-heading text-sm font-medium text-navy">{faq.q}</div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street / Kisumu CBD Commercial Center</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              Move into your Kisumu CBD office today.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Zero lease deposit. Fully furnished. High-speed internet and generator backup included.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Schedule a Viewing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                View Pricing Plans <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
