import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Virtual Office in Kisumu: Cost, Benefits and How It Works | Paper Street',
  description:
    'Everything you need to know about getting a virtual office in Kisumu — what it includes, how much it costs, how to use it for BRS registration and KRA compliance, and who it is for.',
  keywords: ['virtual office Kisumu', 'virtual office cost Kisumu', 'virtual office how it works Kisumu', 'virtual office KRA BRS Kisumu'],
  openGraph: {
    title: 'Virtual Office in Kisumu: Cost, Benefits and How It Works',
    description: 'A complete guide to virtual offices in Kisumu — cost, inclusions, BRS and KRA compliance, mail handling, and meeting room access.',
    url: 'https://paperstreet.co.ke/virtual-office-kisumu-guide',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/virtual-office-kisumu-guide' },
}

export default function VirtualOfficeKisumuGuidePage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Virtual Office Guide · Kisumu CBD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Virtual Office in Kisumu:<br />Cost, Benefits and How It Works.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            A practical, complete guide to virtual offices in Kisumu. What you actually get, what you can use the address for, how the mail system works, and who this arrangement is suited to.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/virtual-office" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Get a Virtual Office <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Talk to Our Team <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-black/10">
            {[['KES 3,500', 'Starting monthly rate'], ['24 Hours', 'Address activation time'], ['BRS & KRA', 'Compliance accepted'], ['CBD Location', 'Oginga Odinga Street']].map(([val, label]) => (
              <div key={label}>
                <span className="text-2xl font-heading font-light text-navy">{val}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is a virtual office */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — What Is It</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">What Is a Virtual Office?</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                A virtual office is an arrangement in which a business uses a managed commercial facility's address as its registered office address without occupying a dedicated physical desk on a full-time basis. Instead of paying monthly rent for a desk or private room you may not need every day, you pay a lower monthly fee for the address, mail handling, and on-demand access to meeting rooms and workspace.
              </p>
              <p>
                The concept is particularly well-suited to sole traders and one-person businesses, remote workers employed by companies based in other cities, Kenyan businesses establishing their first Kisumu presence without wanting to commit to a full lease, international organisations entering the Kisumu market, and entrepreneurs in the pre-revenue or early-revenue stage who need compliance infrastructure before they can justify full office rental costs.
              </p>
              <p>
                In Kenya, a virtual office address is legally and administratively valid for company registration under the Companies Act 2015, for KRA PIN certificates, and for the majority of commercial bank corporate account opening requirements — provided the address is a verifiable commercial building address maintained by a registered business (not a PO Box or residential address).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What it includes */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 — What's Included</span>
            <h2 className="text-2xl font-heading font-light text-navy">What a Paper Street Virtual Office Includes</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { no: '01', title: 'Registered Commercial Address', body: 'A formal commercial building address at the Kisumu CBD Commercial Center, Oginga Odinga Street. This address appears on your company registration documents (CR12, certificate of incorporation), KRA PIN certificate, banking correspondence, and all business communications. It is not a PO Box and not a residential address — it is a verifiable commercial address in a staffed, operational building.' },
              { no: '02', title: 'Mail & Parcel Receipt', body: 'The Paper Street front desk receives all incoming letters, packages, and courier deliveries addressed to your business. Each item is logged with the sender, date received, and description. You are notified by email immediately upon receipt. Items are stored securely for up to 30 days (longer by arrangement) for you or your authorised representative to collect.' },
              { no: '03', title: 'Digital Mail Scanning (Professional Plan)', body: 'On the Virtual Office Professional plan, the reception team opens and scans incoming letters and uploads the digital copies to your secure online portal. You can view and download your correspondence from anywhere in the world without physically visiting the office. This is particularly valuable for business owners who travel frequently or are primarily based outside Kisumu.' },
              { no: '04', title: 'Mail Forwarding', body: 'Physical forwarding of important original documents — statutory notices, cheques, legal correspondence — to any Kenya address is available on request. Forwarding costs (postage and courier) are charged at cost.' },
              { no: '05', title: 'Meeting Room Access', body: 'Virtual office members receive monthly meeting room credits and discounted hourly rates for additional hours. The Business Address plan includes discounted access; the Virtual Office Professional plan includes 2 hours of monthly meeting room credit. This ensures that when you need to host a client, conduct an interview, or present to a partner in Kisumu, you have a professional space available without a separate booking fee for your included hours.' },
              { no: '06', title: 'Front-Desk Client Greeting', body: 'If a client or partner visits the Paper Street address to meet you, our receptionist greets them professionally, offers a seat in the reception area, and notifies you. This creates a professional first point of contact without requiring you to be physically present at the desk.' },
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

      {/* Compliance section */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">03 — Compliance</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Using the Address for BRS, KRA, and Banking</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm text-navy/80 font-light leading-relaxed">
              <p>
                <strong className="font-medium text-navy">Business Registration Service (BRS) — eCitizen:</strong> The Paper Street address is accepted by the Business Registration Service for private limited company incorporation, limited liability partnership registration, and business name registration. You can list the address as your registered office address on all incorporation documents. When the Registrar of Companies issues the Certificate of Incorporation and the CR12 (standard statement of company particulars), this address will appear as the company's official registered office.
              </p>
              <p>
                <strong className="font-medium text-navy">Kenya Revenue Authority (KRA):</strong> The address can be used as the business address on your KRA PIN registration certificate and for VAT registration. Ensure you specify "Kisumu CBD Commercial Center, Oginga Odinga Street, Kisumu" on all KRA correspondence. Any KRA statutory notices received at the address will be received, logged, and notified to you immediately.
              </p>
              <p>
                <strong className="font-medium text-navy">Commercial Banking:</strong> Major Kenyan commercial banks require address verification as part of corporate KYC (Know Your Customer) procedures for business account opening. The Paper Street address is a verifiable commercial building address and satisfies this requirement at KCB, Equity Bank, Absa, Stanbic, NCBA, and other banks. Upon request, Paper Street provides a tenancy confirmation letter for bank account opening purposes.
              </p>
              <p>
                <strong className="font-medium text-navy">Tenders and procurement:</strong> Public sector tender submissions and corporate supplier vetting forms often require a verifiable business address with evidence of physical presence. A virtual office arrangement — where the address is actively staffed and can be verified by a phone call or physical visit — satisfies these requirements in most cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">04 — Plans & Pricing</span>
            <h2 className="text-2xl font-heading font-light text-navy">Virtual Office Plans in Kisumu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: 'Business Address Plan',
                price: 'KES 3,500',
                period: '/ month',
                includes: ['Kisumu CBD Commercial Center address', 'BRS, KRA, and banking compliant', 'Mail and parcel receipt', '30-day physical mail storage', 'Email notification upon mail arrival', 'Discounted meeting room rates'],
              },
              {
                name: 'Virtual Office Professional',
                price: 'KES 6,500',
                period: '/ month',
                popular: true,
                includes: ['Everything in Business Address plan', 'Digital scanning of all incoming mail', 'Secure online portal for mail access', '2 hours monthly meeting room credit', 'Front-desk client greeting service', 'Member day pass discounts'],
              },
            ].map((plan) => (
              <div key={plan.name} className="pt-6 border-t-2 border-navy">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-heading font-medium text-navy">{plan.name}</h3>
                  {plan.popular && <span className="text-[9px] font-mono uppercase tracking-widest text-navy font-semibold">Most Popular</span>}
                </div>
                <div className="mb-6 pb-6 border-b border-black/10">
                  <span className="text-2xl font-heading font-light text-navy">{plan.price}</span>
                  <span className="text-xs font-mono text-navy/50 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs text-navy/75 font-light">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-navy font-bold">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/virtual-office" className="inline-flex items-center justify-center gap-2 w-full border border-navy text-navy text-xs font-semibold uppercase tracking-[0.14em] py-3 hover:bg-navy hover:text-white transition-colors">
                  Get This Plan <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">Establish your Kisumu presence from KES 3,500/month.</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">A compliant commercial address, mail handling, and meeting room access — everything you need to operate professionally in Kisumu without the cost of a full office.</p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/virtual-office" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Get a Virtual Office <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Ask a Question <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
