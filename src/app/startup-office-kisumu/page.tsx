import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Office Spaces for Startups in Kisumu | Paper Street',
  description:
    'A detailed guide to the best office space and coworking options for startups in Kisumu — from hot desks to private team suites. What matters when you are early-stage, what to avoid, and why coworking makes financial sense for most Kisumu startups.',
  keywords: ['startup office Kisumu', 'office space for startups Kisumu', 'startup workspace Kisumu', 'coworking startup Kisumu'],
  openGraph: {
    title: 'Best Office Spaces for Startups in Kisumu',
    description: 'Every startup workspace option in Kisumu evaluated — day passes, monthly desks, private team offices, and why the financial math almost always favours coworking for early-stage companies.',
    url: 'https://paperstreet.africa/startup-office-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.africa/startup-office-kisumu' },
}

export default function StartupOfficeKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Startup Workspace Guide · Kisumu CBD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Best Office Spaces for Startups in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            For startups in Kisumu, the workspace decision is a capital allocation decision. Spend too little and your team operates unproductively in unreliable environments. Overspend on a conventional lease and you tie up capital that should be going into product, team, and growth. This guide helps you get the decision right.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Discuss Team Requirements <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              View Plans <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why workspace is a capital decision */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">The Startup Workspace Problem</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Why This Is a Capital Decision</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                A startup in Kisumu in its first 12–24 months faces a genuine tension: it needs enough workspace infrastructure to work professionally and present credibly to clients, investors, and partners, but it cannot afford to tie up KES 200,000–500,000 in office deposits and fit-out costs that could go into actual business operations.
              </p>
              <p>
                The conventional lease equation — deposit, legal fees, partitioning, furniture, separate internet and generator contracts — typically requires KES 200,000–600,000 of upfront capital for a small Kisumu CBD office before the business writes its first cheque from that space. For a pre-revenue or early-revenue startup, this is a significant capital commitment that creates pressure at the worst possible time.
              </p>
              <p>
                Coworking at Paper Street offers a startup-appropriate alternative: full commercial infrastructure — enterprise internet, generator backup, commercial address, reception, meeting rooms — available from day one, on a monthly payment that scales exactly with your team, with no deposit and no fit-out capital required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — By Stage</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Workspace by Startup Stage</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                stage: 'Pre-Revenue / Ideation',
                no: '01',
                plan: 'Business Address + Day Passes',
                price: 'From KES 3,500/month address + KES 1,000/day pass',
                body: 'At ideation stage, your primary workspace need is minimal: a professional registered address for company incorporation and banking, occasional professional desk access for key days (client meetings, investor calls, co-founder working sessions), and a meeting room for formal conversations. The Business Address plan at KES 3,500/month combined with day passes as needed keeps your operational overhead under KES 10,000/month while giving you full commercial compliance infrastructure.',
              },
              {
                stage: 'Early Revenue — 1–3 Person Team',
                no: '02',
                plan: 'Monthly Hot Desks or Dedicated Desks',
                price: 'KES 12,000–16,500 per desk per month',
                body: 'As your team begins generating revenue and working consistently, a monthly membership makes more financial sense than daily drop-ins. Two dedicated desks at KES 16,500 each — KES 33,000/month total — provides 2 founders or early team members with permanent reserved workstations, a registered commercial address, 5 hours monthly meeting room credit per plan, lockable storage, and all infrastructure. No separate internet, generator, or cleaning contracts. This is your all-in operational workspace cost for two people.',
              },
              {
                stage: 'Growing — 3–8 Person Team',
                no: '03',
                plan: 'Private Team Office Suite',
                price: 'From KES 35,000–65,000/month',
                body: 'Once your team reaches 3–5 people, a private team office suite provides enclosed, lockable space at a team level — often more cost-effective per head than individual dedicated desks at scale. A 3–5 person suite at KES 65,000/month is approximately KES 13,000/person — comparable to a dedicated desk rate but with full team privacy and a dedicated enclosed environment. Compare this to a conventional lease: KES 65,000 monthly rent on bare space, plus separate internet (KES 10,000+), utilities (variable), cleaning (KES 8,000+), and maintenance — all before you\'ve paid for any furniture.',
              },
              {
                stage: 'Scaling — 8+ Person Team',
                no: '04',
                plan: 'Custom Suite Configuration',
                price: 'Contact for enterprise rates',
                body: 'For startups scaling beyond 8 people, a combination of private team suites and dedicated desks — or a custom commercial arrangement — may be appropriate. At this scale, it is worth doing a detailed cost comparison between a managed coworking suite and a conventional lease. Paper Street can provide an analysis on request. In most cases, the analysis shows coworking remaining financially competitive until headcounts approach 15–20, at which point a bare lease may reach financial parity.',
              },
            ].map((item) => (
              <div key={item.no} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{item.no}</div>
                <div className="md:col-span-11">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg font-heading font-medium text-navy">{item.stage}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-navy font-semibold">{item.plan}</span>
                  </div>
                  <p className="text-xs font-mono text-navy/50 mb-4">{item.price}</p>
                  <p className="text-sm text-navy/75 font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What startups need */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — Infrastructure</span>
            <h2 className="text-2xl font-heading font-light text-navy">What Startups Actually Need from a Workspace</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { title: 'Reliable Internet for Remote Work & Client Communication', body: "Enterprise fibre internet is not a premium feature for startups: it is a baseline requirement. If your developers are pushing code, your sales team is on Zoom calls, and your ops are on Google Workspace simultaneously, residential-grade internet creates real operational problems. Paper Street's dual-carrier fibre delivers consistent bandwidth regardless of the number of simultaneous users." },
              { title: 'Automatic Generator Backup for Delivery Reliability', body: 'A startup with a pending product launch or client delivery deadline cannot afford 2-hour KPLC outages. Automatic standby generator backup removes this variable from your operational risk profile entirely. This is included in every Paper Street membership: it is not an add-on.' },
              { title: 'A Commercial Address for Investment and Client Trust', body: "When you are pitching an investor, responding to an enterprise RFP, or opening a corporate bank account, your registered address matters. A commercial address on Oginga Odinga Street carries different weight than a residential or PO Box address on your company documents." },
              { title: 'Meeting Rooms for Client Pitches and Team Reviews', body: 'Early-stage startups need meeting space for client pitches, investor meetings, team workshops, and quarterly reviews. Having bookable meeting rooms within your workspace facility removes the friction and cost of searching for and booking separate venues for every team event. Included credits in monthly plans cover most regular meeting needs.' },
              { title: 'Flexibility to Scale Without Contract Penalty', body: 'The most financially valuable thing about coworking for a startup is not the day-to-day workspace: it is the ability to scale up (add desks as you hire) or scale down without contractual penalties, deposit forfeitures, or premature lease break costs.' },
            ].map((item, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-5 font-heading text-sm font-medium text-navy">{item.title}</div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The financial math */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — The Financial Math</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">The Real Numbers: Coworking vs Private Lease</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm text-navy/80 font-light leading-relaxed">
              <p>
                Here is the first-year cost for a 3-person startup team, comparing Paper Street dedicated desks versus a standard bare commercial lease in Kisumu CBD.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-navy">
                      <th className="text-left py-3 pr-6 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Cost Item</th>
                      <th className="text-right py-3 pr-6 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Private Lease</th>
                      <th className="text-right py-3 text-[10px] font-mono uppercase tracking-widest text-navy/50 font-normal">Paper Street</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 text-navy/80 font-light">
                    {[
                      ['Upfront deposit', 'KES 90,000–180,000', 'None'],
                      ['Legal / lease fees', 'KES 15,000–40,000', 'None'],
                      ['Fit-out (furniture, paint, partition)', 'KES 100,000–250,000', 'None'],
                      ['Internet setup + 12 months', 'KES 80,000–120,000', 'Included'],
                      ['Generator purchase + fuel', 'KES 60,000–150,000', 'Included'],
                      ['Cleaning (12 months)', 'KES 36,000–60,000', 'Included'],
                      ['Monthly rent × 12 months', 'KES 360,000–600,000', 'KES 594,000 (3 desks)'],
                    ].map(([item, lease, ps]) => (
                      <tr key={item}>
                        <td className="py-3 pr-6 text-xs">{item}</td>
                        <td className="py-3 pr-6 text-xs text-right font-mono">{lease}</td>
                        <td className="py-3 text-xs text-right font-mono text-navy font-medium">{ps}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-navy">
                      <td className="py-3 pr-6 text-xs font-medium text-navy">Total Year 1 Cost</td>
                      <td className="py-3 pr-6 text-xs text-right font-mono font-bold text-navy">KES 741,000–1,400,000</td>
                      <td className="py-3 text-xs text-right font-mono font-bold text-navy">KES 594,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-navy/50 font-light italic">Estimates based on small Kisumu CBD offices (40–70 sqm) at 2025 market rates. Paper Street rate: 3 dedicated desks at KES 16,500/desk/month × 12 months.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">Give your Kisumu startup a professional home from day one.</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">No deposit. No fit-out. Scale your workspace as your team grows. Enterprise internet, generator backup, and a commercial address included in every plan.</p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Discuss Your Startup's Needs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                View Plans & Pricing <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
