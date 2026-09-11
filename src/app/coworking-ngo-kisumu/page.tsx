import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coworking Spaces for NGOs in Kisumu | Flexible Workspace for NGO Teams | Paper Street',
  description:
    'Workspace options for NGOs, development organisations, and humanitarian agencies in Kisumu. Flexible desks, private offices, virtual office plans, and meeting rooms in Kisumu CBD.',
  keywords: ['NGO workspace Kisumu', 'coworking NGO Kisumu', 'NGO office space Kisumu', 'development organisation workspace Kisumu'],
  openGraph: {
    title: 'Coworking Spaces for NGOs in Kisumu',
    description: 'Flexible workspace and office solutions for NGOs, development agencies, and humanitarian organisations operating in Kisumu and Western Kenya.',
    url: 'https://paperstreet.co.ke/coworking-ngo-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/coworking-ngo-kisumu' },
}

export default function CoworkingNGOKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">NGO & Development Sector Workspace · Kisumu CBD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Coworking Spaces for NGOs in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Flexible workspace, private offices, registered Kisumu addresses, meeting rooms, and training facilities for NGOs, development organisations, research agencies, and humanitarian teams operating in Western Kenya.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Discuss NGO Requirements <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              View Plans <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* NGO context */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Context</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">The NGO Workspace Challenge in Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Kisumu is one of Western Kenya's most significant development sector hubs. International NGOs, bilateral donor programmes, research institutions, and Kenyan civil society organisations maintain field operations throughout Nyanza Province, with Kisumu serving as the primary coordination and logistics base for the region.
              </p>
              <p>
                The workspace challenges facing NGO teams in Kisumu are distinctive. Programme cycles are project-based — an NGO may need intensive Kisumu team presence during a field programme and minimal presence in the months between. A long-term commercial lease signed for a consistent headcount does not serve this operational rhythm. The cost-to-benefit ratio of conventional leases for NGOs with variable field team presence is typically poor.
              </p>
              <p>
                Additionally, NGO teams frequently need meeting and training rooms — for staff capacity-building, community partner briefings, donor site visit presentations, programme review workshops, and multi-stakeholder coordination meetings. Access to well-equipped meeting and training facilities within the workspace arrangement reduces the overhead of separately sourcing and booking venue space for every team event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Paper Street provides for NGOs */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Workspace Options for NGOs</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Paper Street Options for NGO Teams in Kisumu</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                title: 'Virtual Office / Registered Kisumu Address',
                price: 'From KES 3,500 / month',
                body: 'For international NGOs and donor-funded programmes that need a verifiable Kisumu address for correspondence, government liaison, county-level registration, and financial reporting — but whose core team operates remotely or from field sites. The Paper Street address on Oginga Odinga Street functions as your official Kisumu programme office address. Incoming correspondence from NGO Board of Kenya (NBOK), county governments, and partner organisations is received, logged, and forwarded or scanned to your designated contact.'
              },
              {
                no: '02',
                title: 'Hot Desk — Day Pass & Monthly Plans',
                price: 'KES 1,000/day — KES 12,000/month',
                body: 'For field team members, programme officers, and visiting consultants who need Kisumu workspace during active programme periods. The day pass and monthly hot desk plans provide professional workspace on-demand without committing to a fixed team headcount. During intensive programme delivery, take multiple day passes or a monthly plan. During lower-activity periods between programme cycles, scale down without penalty or lease obligations.'
              },
              {
                no: '03',
                title: 'Dedicated Desks — Permanent Team Base',
                price: 'KES 16,500 / desk / month',
                body: 'For NGO programme staff with consistent Kisumu presence across a multi-year programme cycle. Dedicated desks provide each team member with a permanently reserved seat, lockable storage for confidential programme documents, and a registered commercial address. All utilities — internet, power, cleaning, reception — are included in the monthly per-desk fee. Easier to cost into a programme budget as a fixed monthly operational line item than a variable conventional lease with separate utility overhead.'
              },
              {
                no: '04',
                title: 'Private Team Suite',
                price: 'From KES 35,000 / month',
                body: 'An enclosed, lockable private office for NGO field teams requiring confidential document management, beneficiary data security, or simply a private team environment. Suitable for 2–10 team members. Available with a registered programme address, dedicated storage, and meeting room credits. The all-inclusive monthly fee is straightforward to incorporate into programme activity budgets for donor reporting.'
              },
              {
                no: '05',
                title: 'Meeting & Training Rooms',
                price: 'From KES 1,500/hour — KES 9,000/half day',
                body: 'Training and workshop rooms for NGO capacity-building sessions, partner review meetings, donor site presentations, and multi-stakeholder coordination workshops. Configurable for classroom, round-table, or U-shape layouts for 8–20 participants. High-speed fibre Wi-Fi for all participants, presentation display screens, whiteboard, automatic generator backup (no interruption risk during structured training sessions), and reception support for participant check-in.'
              },
            ].map((item) => (
              <div key={item.no} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{item.no}</div>
                <div className="md:col-span-11">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-lg font-heading font-medium text-navy">{item.title}</h3>
                    <span className="text-xs font-mono text-navy/70 whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-sm text-navy/75 font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NGO-specific considerations */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — NGO-Specific Considerations</span>
            <h2 className="text-2xl font-heading font-light text-navy">Operational Considerations for NGO Teams</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { title: 'NGO Board of Kenya (NBOK) Registration Address', body: 'International NGOs seeking registration with the NGO Board of Kenya must specify a registered office address. The Paper Street address is appropriate for this purpose, providing a verifiable, staffed commercial address in Kisumu. The address authorisation letter issued by Paper Street can accompany NBOK registration applications as supporting documentation.' },
              { title: 'Data Protection and Confidentiality', body: 'NGO programme work often involves sensitive beneficiary data and confidential programme documentation. Private office suites and meeting rooms at Paper Street are lockable and physically separate from the shared coworking floor. For programmes with strict data security requirements, discuss your specific needs with our team — dedicated VLANs and physical data storage solutions are available.' },
              { title: 'Donor Budget Coding', body: 'Paper Street monthly workspace fees are straightforward to code as programme operations overhead or direct staff cost items in typical donor budget frameworks (USAID, FCDO, EU, GIZ, etc.). All inclusive monthly billing provides a clean, documented expense line without complex utility itemisation. On request, Paper Street can provide formal receipts in formats required by specific donor financial management systems.' },
              { title: 'Multi-Programme, Multi-Partner Organisations', body: 'For NGOs running multiple simultaneous programmes in Kisumu with different funding sources, multiple membership plans can be maintained under a single organisational account. Individual desk holders can be assigned to specific cost centres for budgeting purposes.' },
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
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">Flexible workspace for NGO teams in Western Kenya.</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">Scale your workspace to your programme cycle. Registered addresses, field team desks, private offices, and training rooms — all in a commercial building on Oginga Odinga Street.</p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Discuss Your Requirements <ArrowRight className="w-3.5 h-3.5" />
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
