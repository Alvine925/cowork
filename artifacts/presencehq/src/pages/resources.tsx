import { Link } from 'wouter'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const ARTICLES = [
  { title: 'How to Register a Company in Kenya in 2025', category: 'Guide', time: '11 min', slug: 'register-company-kenya-2025' },
  { title: 'Why Your Business Address Matters More Than You Think', category: 'Insight', time: '6 min', slug: 'professional-business-address-kenya' },
  { title: 'Virtual Office vs Physical Office: A Cost Breakdown', category: 'Comparison', time: '8 min', slug: 'virtual-office-vs-physical-office-kenya' },
  { title: 'KYC Compliance: What the Law Requires', category: 'Compliance', time: '9 min', slug: 'kyc-compliance-kenya-businesses' },
  { title: 'Building Client Trust Without a Physical Office', category: 'Insight', time: '8 min', slug: 'freelancer-professional-presence-kenya' },
  { title: 'Expanding Your Business to Multiple Kenyan Cities', category: 'Strategy', time: '10 min', slug: 'expand-business-mombasa-kisumu-nakuru' },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&auto=format&q=80"
        eyebrow="Resources"
        title="Business Guides and Insights."
        subtitle="Practical guides to help you build, register, and grow your business in Kenya."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="divide-y divide-gray-100">
            {ARTICLES.map((article, i) => (
              <Link key={i} href={`/blog/${article.slug}`}>
                <div className="group grid sm:grid-cols-4 gap-4 py-7 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-bold text-dark-gray/20 tracking-wider font-heading mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold text-gold uppercase tracking-widest">{article.category}</span>
                  </div>
                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-semibold font-heading text-navy group-hover:text-gold transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[11px] text-dark-gray/35 mt-1">{article.time} read</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
