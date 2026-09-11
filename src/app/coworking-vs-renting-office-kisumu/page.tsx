import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coworking Space vs Renting an Office in Kisumu: Which is Better? | Paper Street',
  description:
    'A detailed financial and operational comparison of coworking membership versus renting private office space in Kisumu. Real costs, contractual risks, and the right choice for your business stage.',
  keywords: ['coworking vs office Kisumu', 'rent office Kisumu', 'coworking or private office Kisumu', 'office space comparison Kisumu'],
  openGraph: {
    title: 'Coworking Space vs Renting an Office in Kisumu',
    description: 'Should you join a coworking space or rent a private office in Kisumu? A real financial and operational breakdown.',
    url: 'https://paperstreet.co.ke/coworking-vs-renting-office-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/coworking-vs-renting-office-kisumu' },
}

export default function CoworkingVsOfficeKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Kisumu Office Decision Guide · 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Coworking Space vs Renting an Office in Kisumu:<br />Which is Right for Your Business?
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            The answer depends on your team size, growth trajectory, cash position, and how much risk you are comfortable carrying in a commercial lease. This guide works through both sides honestly.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/dedicated-desk" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Explore Coworking Plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Talk to Our Team <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* The Real Cost of a Private Office Lease */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Private Office Lease</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">The True Cost of Renting a Private Office in Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                The monthly rent figure on a Kisumu CBD office listing is only a fraction of what you actually pay to occupy the space. Understanding the full cost is essential before signing any lease.
              </p>
              <p>
                <strong className="font-medium text-navy">Deposit:</strong> Most commercial leases in Kisumu require 3 months' rent as a refundable deposit, sometimes 6. On a KES 30,000/month bare office, this is KES 90,000–180,000 tied up immediately and unavailable for operations or growth.
              </p>
              <p>
                <strong className="font-medium text-navy">Legal fees:</strong> A commercial lease should be reviewed by an advocate. Advocate fees for lease preparation and review typically range KES 15,000–40,000 for a standard 1–3 year commercial lease in Kenya.
              </p>
              <p>
                <strong className="font-medium text-navy">Fit-out costs:</strong> A bare office space in Kisumu has unpainted walls, a concrete floor, and no partitions. Painting, tiling or carpeting, desk procurement, chair procurement, shelving, and signage together typically cost KES 80,000–250,000 before you sit down on day one — depending on room size and specification.
              </p>
              <p>
                <strong className="font-medium text-navy">Internet and generator:</strong> Commercial internet installation (fibre) in Kisumu typically requires a router purchase, connection fees, and a monthly line rental starting at KES 5,000–15,000/month for a business-grade line. A generator for a small office — purchase, installation, and fuel management — adds KES 50,000–200,000 capital plus ongoing running costs.
              </p>
              <p>
                <strong className="font-medium text-navy">Ongoing operational overhead:</strong> Electricity bills, cleaning staff or contractor, building service charges, security, and maintenance fall on the tenant in most Kisumu commercial leases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coworking True Cost */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — Coworking</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">The True Cost of a Coworking Membership</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                A managed coworking membership — like Paper Street — operates on an all-inclusive monthly fee. There is no deposit beyond a first-month payment, no legal fees, no fit-out capital, no separate internet contract, and no generator management.
              </p>
              <p>
                A hot desk monthly plan at KES 12,000/month includes enterprise fibre internet, automatic generator backup, air conditioning, daily cleaning, front-desk reception, and 2 hours of monthly meeting room access. A dedicated desk at KES 16,500 adds a permanently reserved seat with lockable storage and a registered commercial address.
              </p>
              <p>
                You are operational on day one. The financial comparison for a 2-person team over 12 months looks like this:
              </p>
              <div className="pt-2 space-y-3">
                <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mb-1">Private Lease (2 pax, 12 months)</p>
                    <p className="text-sm font-medium text-navy">KES 900,000–1,200,000+</p>
                    <p className="text-xs text-navy/60 font-light">Including deposit, fit-out, internet, generator, rent, utilities</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mb-1">Coworking Dedicated Desks (2 pax, 12 months)</p>
                    <p className="text-sm font-medium text-navy">KES 396,000</p>
                    <p className="text-xs text-navy/60 font-light">All-inclusive — no extras, no deposit, no fit-out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When Private Office Makes Sense */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — Decision Framework</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">When Does a Private Lease Make Sense?</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { title: 'Team size above 15–20 people', body: 'At significant scale, the per-head cost of coworking begins to approach or exceed the per-head cost of a conventional lease. For large, stable teams with predictable headcount, a bare lease can become financially competitive — provided the organisation has the internal capacity to manage fit-out, maintenance, and operations.' },
              { title: 'Long-term operational certainty', body: 'If your organisation has a 10-year track record in Kisumu, a stable revenue base, and no foreseeable need to scale or contract your physical footprint rapidly, a long-term lease locks in predictable costs and potentially below-market rents in year 3–5.' },
              { title: 'Highly customised physical environment', body: 'Some businesses require specialised physical infrastructure — heavy-duty flooring for equipment, soundproofed recording or analysis suites, dedicated server rooms, or physical security configurations — that cannot be accommodated in a shared commercial workspace.' },
              { title: 'Confidentiality requiring exclusive building control', body: 'Certain legal, intelligence, or high-security applications require physical control over an entire floor or building. Standard coworking cannot provide this by definition.' },
            ].map((item, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-5 font-heading text-sm font-medium text-navy">{item.title}</div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When Coworking Makes Sense */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">04 — Coworking Fit</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">When Coworking is the Right Answer</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { title: 'Teams of 1–10 people', body: 'Almost every analysis of cost-per-head for small teams shows coworking membership is significantly cheaper than a conventional lease when all costs are accurately accounted for — particularly in years 1–3 when businesses are still calibrating their headcount and operational needs.' },
              { title: 'Businesses entering Kisumu for the first time', body: 'For a Nairobi, Mombasa, or international company establishing its first Kisumu presence, a Paper Street private suite or dedicated desk delivers a functional team base and a registered address immediately — without 6-month lead times for fit-out and infrastructure setup.' },
              { title: 'Businesses preserving capital for growth', body: 'Deploying KES 300,000 into office deposits and fit-out capital is a choice — an alternative is deploying that capital into product development, sales, or team growth. For startups and SMEs, the liquidity advantage of coworking is a real strategic input.' },
              { title: 'Teams with unpredictable or variable headcount', body: 'Growing businesses may go from 3 to 8 to 15 people in 24 months. A coworking membership scales — you add desks as you hire. A fixed lease signed for a 3-person office creates an operational headache when you reach 8 people before month 18.' },
            ].map((item, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-5 font-heading text-sm font-medium text-navy">{item.title}</div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">All-inclusive workspace from KES 12,000/month.</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">No deposit. No fit-out. No separate internet contract. No generator management. One invoice covering everything.</p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                View Plans <ArrowRight className="w-3.5 h-3.5" />
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
