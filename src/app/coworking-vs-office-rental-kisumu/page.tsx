import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coworking Space vs Renting an Office in Kisumu: Cost & Flexibility | Paper Street',
  description:
    'Comparing the true cost of renting a traditional bare office in Kisumu versus managed coworking and serviced offices. Detailed first-year cost breakdown.',
  keywords: ['coworking vs office rental Kisumu', 'coworking space vs renting an office Kisumu', 'office rental comparison Kisumu', 'serviced office vs traditional lease Kisumu'],
  openGraph: {
    title: 'Coworking Space vs Renting an Office in Kisumu',
    description: 'A detailed financial comparison of traditional bare office leases versus managed coworking in Kisumu CBD.',
    url: 'https://paperstreet.africa/coworking-vs-office-rental-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.africa/coworking-vs-office-rental-kisumu' },
}

export default function CoworkingVsOfficeRentalKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Financial Analysis / Kisumu Commercial Real Estate</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Coworking Space vs Renting an Office in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            A line-by-line financial analysis comparing a traditional bare commercial lease against serviced coworking in Kisumu CBD. Discover where capital is saved and operational risk is eliminated.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/pricing" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Compare Workspace Plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Schedule a Consultation <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">The Hidden Costs</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">The Hidden Traps of Bare Office Leases in Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                When searching for commercial property in Kisumu town, the quoted price per square foot or month is only the beginning of your actual expense.
              </p>
              <p>
                A standard commercial landlord delivers a bare concrete shell. Before your team can work, you must pay a 3 to 6 month security deposit, legal lease registration fees, drywall partitioning, painting, commercial carpet or tiling, office furniture procurement, dual-carrier internet installation, and an automatic generator unit.
              </p>
              <p>
                In contrast, Paper Street provides all-inclusive turnkey workspaces in Kisumu CBD on Oginga Odinga Street. You pay one monthly invoice that covers your workstations, enterprise fibre, generator backup, air conditioning, daily janitorial services, and front-desk reception.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 / Financial Comparison</span>
            <h2 className="text-2xl font-heading font-light text-navy">Year 1 Total Cost Comparison (3-Person Team)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="text-left py-3 pr-6 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Cost Item</th>
                  <th className="text-right py-3 pr-6 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Conventional Bare Lease</th>
                  <th className="text-right py-3 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Paper Street Coworking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-navy/80 font-light">
                {[
                  ['Upfront Lease Deposit (3-6 Months)', 'KES 90,000 to 180,000', 'KES 0 (Zero deposit)'],
                  ['Legal Drafting & Stamp Duty', 'KES 15,000 to 40,000', 'KES 0 (Zero legal fees)'],
                  ['Fit-out (Partitions, Paint, Conduit)', 'KES 120,000 to 250,000', 'KES 0 (Turnkey ready)'],
                  ['Office Desks, Chairs & Pedestals', 'KES 60,000 to 120,000', 'KES 0 (Furnished included)'],
                  ['Internet Setup & 12 Months Fibre', 'KES 96,000 to 144,000', 'Included in monthly plan'],
                  ['Generator Setup & Fuel Reserves', 'KES 80,000 to 160,000', 'Included in monthly plan'],
                  ['Cleaning & Janitorial (12 Months)', 'KES 48,000 to 72,000', 'Included in monthly plan'],
                  ['12 Months Office Rent / Membership', 'KES 360,000 to 600,000', 'KES 594,000 (3 Dedicated Desks)'],
                ].map(([item, lease, ps]) => (
                  <tr key={item}>
                    <td className="py-3 pr-6 text-xs">{item}</td>
                    <td className="py-3 pr-6 text-xs text-right font-mono text-navy/70">{lease}</td>
                    <td className="py-3 text-xs text-right font-mono text-navy font-medium">{ps}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-navy font-medium text-navy">
                  <td className="py-4 pr-6 text-xs font-semibold">Estimated Total Year 1 Cash Outlay</td>
                  <td className="py-4 pr-6 text-xs text-right font-mono font-bold text-navy">KES 869,000 to 1,566,000</td>
                  <td className="py-4 text-xs text-right font-mono font-bold text-navy">KES 594,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street / Kisumu CBD Commercial Center</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              Save capital and scale flexibly in Kisumu CBD.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              No long-term lease lock-ins, zero fit-out expenses, and enterprise infrastructure ready on day one.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                View All Plans <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Schedule a Visit <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
