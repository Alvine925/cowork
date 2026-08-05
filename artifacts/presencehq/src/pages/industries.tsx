import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const INDUSTRIES = [
  { name: 'Law Firms', icon: '⚖️', desc: 'Professional registered address for legal practice credibility.' },
  { name: 'E-commerce', icon: '🛒', desc: 'Physical business address for marketplace seller verification.' },
  { name: 'Consulting', icon: '💼', desc: 'Prime address that impresses enterprise clients.' },
  { name: 'Tech Startups', icon: '🚀', desc: 'Scale presence without burning runway on office leases.' },
  { name: 'NGOs & Nonprofits', icon: '🤝', desc: 'Registered address required for government and donor compliance.' },
  { name: 'Real Estate', icon: '🏢', desc: 'Professional address for agency registration and credibility.' },
  { name: 'Finance & Insurance', icon: '📊', desc: 'Regulatory-compliant registered office address.' },
  { name: 'Healthcare', icon: '🏥', desc: 'Professional address for clinic registration and marketing.' },
  { name: 'International Companies', icon: '🌍', desc: 'Kenyan registered address for market entry and compliance.' },
  { name: 'Freelancers', icon: '💡', desc: 'Look like a company, not a sole trader working from home.' },
  { name: 'Logistics & Transport', icon: '🚛', desc: 'Address for fleet registration and business licensing.' },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Industries"
        title="Built for Every Industry."
        subtitle="From law firms to startups — professional presence is a universal need."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {INDUSTRIES.map((industry, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-xl hover:border-gold hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-lg font-bold font-heading text-navy mb-2 group-hover:text-gold transition-colors">{industry.name}</h3>
                <p className="text-dark-gray/60 text-sm font-light leading-relaxed">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
