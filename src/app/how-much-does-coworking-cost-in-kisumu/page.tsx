import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does Coworking Cost in Kisumu? 2025 Price Guide | Paper Street',
  description:
    'A full breakdown of coworking costs in Kisumu: day passes, weekly rates, monthly desks, private offices, and virtual office plans. Transparent pricing with all utilities included.',
  keywords: ['coworking cost Kisumu', 'coworking price Kisumu', 'how much is coworking Kisumu', 'coworking rates Kisumu 2025'],
  openGraph: {
    title: 'How Much Does Coworking Cost in Kisumu? 2025 Price Guide',
    description: 'Exact pricing for coworking in Kisumu: day passes, monthly hot desks, dedicated desks, private offices, and virtual office plans.',
    url: 'https://paperstreet.africa/how-much-does-coworking-cost-in-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.africa/how-much-does-coworking-cost-in-kisumu' },
}

export default function CoworkingCostKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Kisumu Coworking Pricing Guide / 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            How Much Does Coworking Cost in Kisumu?
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Exact, transparent pricing for every type of workspace in Kisumu: from a single day pass to a full serviced private office suite. No hidden utility fees, no surprise service charges.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/pricing" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              View All Plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Get a Custom Quote <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Context</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">What Drives Coworking Pricing in Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Coworking prices in Kisumu vary based on three primary factors: the type of access (shared flexible desk, dedicated reserved workstation, or private enclosed office), the duration of commitment (daily, weekly, or monthly), and the level of commercial infrastructure provided.
              </p>
              <p>
                A low headline day pass price is counterproductive if the space lacks automatic generator backup during KPLC power cuts or if the internet connection drops during international client video calls. Paper Street Kisumu CBD rates are all-inclusive: enterprise dual-carrier symmetrical fibre, automatic standby generator backup, air conditioning, daily maintenance, and front-desk reception.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 / Price Breakdown</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Paper Street Kisumu Workspace Rates</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                type: 'Day Pass',
                price: 'KES 1,000 / day',
                terms: '8:00 AM to 6:00 PM access',
                desc: 'Walk-in desk access for a full business day. Includes high-speed fibre Wi-Fi, automatic generator backup, air conditioning, and power sockets at every desk. No advance reservation required.',
                bestFor: 'Remote professionals, travelling consultants, and those needing a reliable workspace during home power outages.',
              },
              {
                no: '02',
                type: 'Weekly Pass',
                price: 'KES 4,500 / week',
                terms: '5 consecutive business days',
                desc: 'Full access for five consecutive days (KES 900 per day, saving 10% on daily rates). Covers all day pass amenities with consistent daily seating.',
                bestFor: 'Visiting teams on weekly assignments, project sprints, and short-term remote work in Kisumu.',
              },
              {
                no: '03',
                type: 'Monthly Hot Desk',
                price: 'KES 12,000 / month',
                terms: 'Calendar month unlimited access',
                desc: 'Unlimited flexible desk access during business hours. Averages KES 545 per working day. Includes 2 hours monthly meeting room credit and front-desk parcel receipt.',
                bestFor: 'Freelancers, remote workers, and consultants working regularly in Kisumu CBD.',
              },
              {
                no: '04',
                type: 'Dedicated Desk',
                price: 'KES 16,500 / month',
                terms: 'Permanent reserved workstation',
                desc: 'Your own permanently assigned desk with a lockable storage pedestal. Includes an official registered commercial business address on Oginga Odinga Street (BRS and KRA compliant) plus 5 hours monthly meeting room credit.',
                bestFor: 'Established solo practitioners, legal advocates, and financial consultants needing a permanent desk and registered address.',
              },
              {
                no: '05',
                type: 'Private Office Suite',
                price: 'From KES 35,000 / month',
                terms: 'Month-to-month or annual terms',
                desc: 'Lockable, fully enclosed private office room for 1 to 10 people. Fully furnished with commercial workstations. All utilities, internet, generator, cleaning, registered business address, and meeting credits included on one bill.',
                bestFor: 'Startups, regional NGO field offices, law firms, and expanding companies needing privacy and security.',
              },
              {
                no: '06',
                type: 'Virtual Office (Business Address)',
                price: 'KES 3,500 / month',
                terms: 'Annual or monthly billing',
                desc: 'Use our prestigious Kisumu CBD Commercial Center address on Oginga Odinga Street for company registration on eCitizen (BRS), KRA PIN, bank accounts, and mail handling without renting a daily physical desk.',
                bestFor: 'Remote companies, diaspora entrepreneurs, and businesses establishing a verifiable Kisumu presence.',
              },
            ].map((item) => (
              <div key={item.no} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{item.no}</div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-heading font-medium text-navy">{item.type}</h3>
                  <p className="text-xl font-heading font-light text-navy mt-1">{item.price}</p>
                  <p className="text-xs font-mono text-navy/50 mt-1">{item.terms}</p>
                </div>
                <div className="md:col-span-7 space-y-3">
                  <p className="text-sm text-navy/80 font-light leading-relaxed">{item.desc}</p>
                  <p className="text-xs text-navy/60 font-light"><strong className="font-medium text-navy">Best for:</strong> {item.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 / Value Comparison</span>
            <h2 className="text-2xl font-heading font-light text-navy">Comparing Total Monthly Office Costs in Kisumu</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="text-left py-3 pr-6 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Expense Category</th>
                  <th className="text-right py-3 pr-6 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Conventional Bare Lease</th>
                  <th className="text-right py-3 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Paper Street Coworking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-navy/80 font-light">
                {[
                  ['Upfront Lease Deposit', '3 to 6 months rent upfront', 'Zero deposit required'],
                  ['Office Fit-Out & Partitions', 'KES 150,000 to 400,000 upfront', 'Zero capital expenditure'],
                  ['Office Desks & Chairs', 'KES 60,000 to 180,000 upfront', 'Fully furnished included'],
                  ['Dedicated Fibre Internet', 'KES 8,000 to 15,000 per month', 'High-speed dual fibre included'],
                  ['Standby Generator & Fuel', 'KES 10,000 to 25,000 per month', 'Automatic generator included'],
                  ['Daily Cleaning & Maintenance', 'KES 5,000 to 10,000 per month', 'Daily cleaning included'],
                  ['Front-Desk Receptionist', 'KES 25,000 to 40,000 per month', 'Professional reception included'],
                ].map(([category, lease, ps]) => (
                  <tr key={category}>
                    <td className="py-3 pr-6 text-xs">{category}</td>
                    <td className="py-3 pr-6 text-xs text-right font-mono text-navy/70">{lease}</td>
                    <td className="py-3 text-xs text-right font-mono text-navy font-medium">{ps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 / Questions</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                q: 'How much does a coworking day pass cost in Kisumu?',
                a: 'A single walk-in Day Pass at Paper Street Kisumu CBD starts from KES 1,000. It grants full business day access (8:00 AM to 6:00 PM) to our air-conditioned workspace, high-speed fibre Wi-Fi, and automatic generator backup.',
              },
              {
                q: 'What is the monthly cost for a dedicated desk in Kisumu?',
                a: 'A Dedicated Desk starts from KES 16,500 per month. This includes a permanently assigned workstation, a lockable storage pedestal, high-speed fibre internet, an official registered commercial business address for BRS and KRA, and 5 hours of monthly meeting room credits.',
              },
              {
                q: 'Are electricity and internet bills charged separately?',
                a: 'No. All utilities (electricity, water, automatic standby generator fuel, enterprise fibre Wi-Fi, and daily cleaning) are completely included in your single monthly membership fee.',
              },
              {
                q: 'Do I have to pay a multi-month deposit when renting private office space?',
                a: 'No. Unlike traditional commercial leases in Kisumu that demand 3 to 6 months of rent upfront, Paper Street operates on flexible monthly or quarterly terms with zero lease deposits.',
              },
              {
                q: 'What does a virtual office in Kisumu cost?',
                a: 'Our virtual office business address plans start from KES 3,500 per month. This provides an official registered address at Kisumu CBD Commercial Center on Oginga Odinga Street for company incorporation on eCitizen, KRA PIN, and banking.',
              },
              {
                q: 'What payment methods do you accept for workspace memberships?',
                a: 'We accept M-Pesa, debit/credit cards (Visa and Mastercard), and direct electronic bank transfers.',
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
              Flexible workspace in Kisumu starting from KES 1,000.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Work from a modern commercial building on Oginga Odinga Street. Enterprise fibre internet, automatic generator backup, and professional meeting facilities.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/hot-desk" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Get a Day Pass <ArrowRight className="w-3.5 h-3.5" />
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
