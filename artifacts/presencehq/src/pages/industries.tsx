import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const INDUSTRIES = [
  { name: 'Law Firms', desc: 'Professional registered address for legal practice credibility with clients and the Law Society.' },
  { name: 'E-commerce', desc: 'Physical business address for marketplace seller verification on platforms like Jumia and Amazon.' },
  { name: 'Consulting', desc: 'Prime Westlands or Kilimani address that holds up under enterprise procurement scrutiny.' },
  { name: 'Tech Startups', desc: 'Scale your presence without burning runway on office leases before product-market fit.' },
  { name: 'NGOs and Nonprofits', desc: 'Registered address required for government, donor, and NGO Coordination Board compliance.' },
  { name: 'Real Estate', desc: 'Professional address for agency registration, marketing materials, and client meetings.' },
  { name: 'Finance and Insurance', desc: 'Regulatory-compliant registered office address accepted by the CBK and IRA.' },
  { name: 'Healthcare', desc: 'Professional address for clinic registration, insurance panels, and patient-facing marketing.' },
  { name: 'International Companies', desc: 'Kenyan registered address for market entry, local banking, and regulatory compliance.' },
  { name: 'Freelancers', desc: 'Look like an incorporated business, not a sole trader working from a residential estate.' },
  { name: 'Logistics and Transport', desc: 'Address for fleet registration, NTSA compliance, and business licensing.' },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Industries"
        title="Built for Every Industry."
        subtitle="Professional presence is a universal business need, regardless of your sector."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="divide-y divide-gray-100">
            {INDUSTRIES.map((industry, i) => (
              <div key={i} className="grid sm:grid-cols-3 gap-4 py-7">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-bold text-dark-gray/20 tracking-wider font-heading mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold font-heading text-navy">{industry.name}</h3>
                </div>
                <p className="sm:col-span-2 text-sm text-dark-gray/60 font-light leading-relaxed">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
