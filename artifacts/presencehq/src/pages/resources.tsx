import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const ARTICLES = [
  { title: 'How to Register a Company in Kenya in 2024', category: 'Guide', time: '8 min read' },
  { title: 'Why Your Business Address Matters More Than You Think', category: 'Insight', time: '5 min read' },
  { title: 'Virtual Office vs. Co-working: Which Is Right for You?', category: 'Comparison', time: '6 min read' },
  { title: 'KRA PIN Registration: A Step-by-Step Guide', category: 'Guide', time: '7 min read' },
  { title: 'Building Client Trust Without a Physical Office', category: 'Insight', time: '4 min read' },
  { title: 'Expanding Your Business to Multiple Kenyan Cities', category: 'Strategy', time: '6 min read' },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&auto=format&q=80"
        eyebrow="Resources"
        title="Business Guides & Insights."
        subtitle="Practical guides to help you build, register, and grow your business in Kenya."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {ARTICLES.map((article, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-xl hover:border-gold hover:shadow-sm transition-all duration-300 cursor-pointer group">
                <span className="text-gold text-xs font-semibold uppercase tracking-wider">{article.category}</span>
                <h3 className="text-lg font-bold font-heading text-navy mt-3 mb-2 group-hover:text-gold transition-colors leading-snug">{article.title}</h3>
                <p className="text-dark-gray/50 text-xs">{article.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
