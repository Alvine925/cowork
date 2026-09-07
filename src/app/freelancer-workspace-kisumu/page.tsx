import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Workspace Options for Freelancers in Kisumu | Paper Street',
  description:
    'A detailed guide to the best workspace options for freelancers and independent professionals in Kisumu — day passes, monthly desks, virtual office plans, and what to look for in a productive professional setup.',
  keywords: ['workspace for freelancers Kisumu', 'freelancer workspace Kisumu', 'coworking freelancer Kisumu', 'independent professional workspace Kisumu'],
  openGraph: {
    title: 'Best Workspace Options for Freelancers in Kisumu',
    description: 'Every workspace option available for freelancers and independent professionals in Kisumu — from day passes to dedicated desks and virtual offices.',
    url: 'https://paperstreet.africa/freelancer-workspace-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.africa/freelancer-workspace-kisumu' },
}

export default function FreelancerWorkspaceKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Freelancer & Consultant Workspace Guide · Kisumu</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Best Workspace Options for Freelancers in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            For freelancers, independent consultants, and self-employed professionals in Kisumu, workspace is a business decision — not just a convenience. This guide covers every option available and what each one actually delivers for your work and your professional standing.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/hot-desk" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Get a Freelancer Day Pass <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              View Monthly Plans <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Freelancer workspace challenges */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">The Challenge</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">The Freelancer Workspace Problem in Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                The working reality for most freelancers and independent consultants in Kisumu is a cycle between home, public eating establishments, and wherever KPLC's current load-shedding schedule leaves with reliable power. None of these is a sustainable professional workspace.
              </p>
              <p>
                Home working degrades when power cuts coincide with client deadlines. Public venues are unsuitable for video calls with international clients, for signing and scanning documents, or for the extended focus periods that high-value deliverable work requires. A professional doing KES 5,000–15,000/hour consulting work cannot afford to have their output quality undermined by a KES 200 venue that cannot support a 90-minute video call.
              </p>
              <p>
                Beyond the practical, workspace affects how clients perceive you. If a client asks where to find you for a document signing, where to send physical correspondence, or where you can host a face-to-face briefing — "my home" or a restaurant is a significant downgrade in perceived professionalism compared to a commercial address in Kisumu CBD with a staffed reception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Workspace Options</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Workspace Options for Freelancers in Kisumu — Evaluated</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                title: 'Day Pass — Paper Street Kisumu CBD',
                price: 'KES 1,000 / day',
                body: 'Walk-in desk access for a full business day. Enterprise fibre internet, automatic generator backup, air-conditioned workspace, power socket at every desk, and professional reception. No booking required during business hours. The most flexible entry point for freelancers who need a professional workspace occasionally — when you have a video call with a key client, when your home internet is down, or when you need a distraction-free day to hit a major deadline.',
                verdict: 'Best for: occasional use, important client calls, deadline days'
              },
              {
                no: '02',
                title: 'Weekly Pass',
                price: 'KES 4,500 / week',
                body: '5 consecutive days of desk access at KES 900/day — a 10% saving on daily pricing. Ideal for freelancers with project-intense weeks where consistent workspace access matters, or for visiting professionals in Kisumu for a defined assignment period.',
                verdict: 'Best for: project sprints, visiting freelancers, intensive work weeks'
              },
              {
                no: '03',
                title: 'Monthly Hot Desk',
                price: 'KES 12,000 / month',
                body: 'Unlimited flexible desk access for a calendar month — the same infrastructure as a day pass but with no per-day cost calculation. At approximately KES 545/working day (assuming 22 workdays), a monthly hot desk is the most cost-effective workspace arrangement for any freelancer working from the space 4 or more days per week. Includes 2 hours monthly meeting room credit — useful for client meetings without paying separate room hire.',
                verdict: 'Best for: freelancers working regularly from Kisumu, baseline professional workspace'
              },
              {
                no: '04',
                title: 'Dedicated Desk',
                price: 'KES 16,500 / month',
                body: 'A permanently reserved personal desk — same physical seat every day — with a lockable storage pedestal. Includes a registered commercial address on Oginga Odinga Street for business invoicing, BRS registration, and banking, plus 5 hours monthly meeting room credit. The dedicated desk is the appropriate upgrade for freelancers who want to maintain a fixed professional workspace with storage security and a formal commercial address for their business.',
                verdict: 'Best for: established freelancers, consultants needing a formal address and permanent workspace'
              },
              {
                no: '05',
                title: 'Business Address Only',
                price: 'KES 3,500 / month',
                body: 'For freelancers who have a functional home or remote setup but need a commercial address for their business registration, invoicing, and banking — without daily physical desk use. The address plan provides the compliance and credibility infrastructure of a commercial address without committing to daily workspace access. Combine with day pass usage for meetings and client calls.',
                verdict: 'Best for: home-based freelancers needing a professional invoicing and registration address'
              },
            ].map((item) => (
              <div key={item.no} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{item.no}</div>
                <div className="md:col-span-11">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-lg font-heading font-medium text-navy">{item.title}</h3>
                    <span className="text-sm font-mono text-navy font-medium whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-sm text-navy/75 font-light leading-relaxed mb-4">{item.body}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-navy font-semibold">{item.verdict}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What a professional workspace does for a freelancer */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — Business Case</span>
            <h2 className="text-2xl font-heading font-light text-navy">What a Professional Workspace Actually Does for a Freelancer</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { title: 'It removes the infrastructure risk from your deliverables', body: 'A missed deadline or a dropped video call due to a power cut is entirely your problem when you are a freelancer — clients do not care about KPLC. A workspace with guaranteed power and internet removes this risk entirely. One missed deadline is typically worth more in lost client confidence than a year of coworking membership fees.' },
              { title: 'It gives you a professional invoicing address', body: 'Invoices carry your business address. An invoice from "House No. 14, Milimani Estate, Kisumu" and an invoice from "Kisumu CBD Commercial Center, Oginga Odinga Street, Kisumu" carry different professional signals when a procurement department or accounting team processes them for payment.' },
              { title: 'It gives you a neutral venue for client meetings', body: 'Meeting clients in a bookable private meeting room at your commercial address — rather than their office or a public venue — puts you in an environment you control. Meeting room credits included in monthly plans cover most regular professional needs without additional cost.' },
              { title: 'It builds the record for growing your rates', body: 'Clients who have visited your workspace, received correspondence from your commercial address, and joined you in a boardroom have a materially different perception of your operation than those who have only interacted over WhatsApp from a home address. Professional infrastructure supports the case for professional rates.' },
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
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">A professional workspace for your freelance business from KES 1,000.</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">Day passes, monthly hot desks, dedicated desks, and business address plans — all in a commercial building on Oginga Odinga Street.</p>
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
