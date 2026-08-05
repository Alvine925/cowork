import { useState } from 'react'
import { Link } from 'wouter'
import { PageHero } from '@/components/ui/PageHero'
import { ArrowRight } from 'lucide-react'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'virtual-office-vs-physical-office-kenya',
    title: 'Virtual Office vs Physical Office in Kenya: A Complete Cost Breakdown',
    excerpt:
      'Renting office space in Nairobi can cost anywhere from KES 80,000 to over KES 500,000 per month. We break down every cost line by line so you can make an informed decision for your business.',
    category: 'Business Strategy',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'July 28, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&q=80',
    featured: true,
  },
  {
    slug: 'register-company-kenya-2025',
    title: 'How to Register a Company in Kenya in 2025: A Step-by-Step Guide',
    excerpt:
      'Company registration in Kenya has been streamlined through the eCitizen portal. This guide walks you through every stage, from name search to obtaining your KRA PIN, in plain language.',
    category: 'Company Registration',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'July 21, 2025',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&q=80',
  },
  {
    slug: 'professional-business-address-kenya',
    title: 'Why a Professional Business Address Still Matters in the Age of Remote Work',
    excerpt:
      'A Kilimani or Westlands address signals credibility to clients, banks, and regulators. We explain why physical address perception remains a real commercial factor in Kenya and how to leverage it without a lease.',
    category: 'Virtual Office',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'July 14, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&q=80',
  },
  {
    slug: 'expand-business-mombasa-kisumu-nakuru',
    title: 'Expanding Your Nairobi Business to Mombasa, Kisumu, or Nakuru: What You Need to Know',
    excerpt:
      'Each Kenyan city has distinct business culture, consumer behaviour, and regulatory environment. This guide covers everything from port logistics in Mombasa to the growing tech scene in Kisumu.',
    category: 'Business Expansion',
    author: 'David Kamau',
    authorRole: 'Regional Expansion Specialist',
    date: 'July 7, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&q=80',
  },
  {
    slug: 'mail-handling-business-kenya',
    title: 'How Professional Mail Handling Protects Your Business: A Guide for Kenyan Entrepreneurs',
    excerpt:
      'Missed legal notices, delayed invoices, and uncollected government correspondence cost Kenyan businesses millions every year. Here is how a structured mail handling service eliminates the risk.',
    category: 'Mail Services',
    author: 'Faith Achieng',
    authorRole: 'Operations Manager',
    date: 'June 30, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&q=80',
  },
  {
    slug: 'meeting-room-tips-nairobi',
    title: '10 Ways to Make Your Next Client Meeting in Nairobi Unforgettable',
    excerpt:
      'First impressions in a boardroom are shaped by location, preparation, and the small details. Whether you are pitching investors or closing a partnership, these practical tips will ensure your meeting runs flawlessly.',
    category: 'Productivity',
    author: 'Peter Ngugi',
    authorRole: 'Workspace Experience Lead',
    date: 'June 23, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1562575214-da9fcf59b907?w=1200&auto=format&q=80',
  },
  {
    slug: 'kyc-compliance-kenya-businesses',
    title: 'KYC Compliance for Kenyan Businesses: What the Law Requires and How to Stay Ready',
    excerpt:
      'The Proceeds of Crime and Anti-Money Laundering Act places clear obligations on businesses. This guide explains exactly what documents you need, how long to retain them, and the penalties for non-compliance.',
    category: 'Compliance',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'June 16, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&q=80',
  },
  {
    slug: 'hot-desk-dedicated-desk-difference',
    title: 'Hot Desk vs Dedicated Desk: Which Flexible Workspace Is Right for Your Team?',
    excerpt:
      'Both options offer more flexibility than a traditional lease, but the right choice depends on how often your team works in-person, your budget, and the nature of your work. We help you decide.',
    category: 'Workspace',
    author: 'Peter Ngugi',
    authorRole: 'Workspace Experience Lead',
    date: 'June 9, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&q=80',
  },
  {
    slug: 'freelancer-professional-presence-kenya',
    title: 'How Freelancers and Consultants in Kenya Build a Credible Business Presence on a Budget',
    excerpt:
      'Going independent does not mean looking like a one-person show. We cover the exact tools, addresses, and communication setups that help Kenyan freelancers compete with larger firms for high-value contracts.',
    category: 'Entrepreneurship',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'June 2, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&q=80',
  },
  {
    slug: 'kenya-data-protection-act-smes',
    title: 'The Kenya Data Protection Act: What Every Small Business Owner Must Know',
    excerpt:
      'Since the ODPC began enforcement, SMEs face real penalties for mishandling customer data. This practical guide explains your obligations, the required policies, and the low-cost steps that bring you into compliance.',
    category: 'Compliance',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'May 26, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&q=80',
  },
  {
    slug: 'reception-services-kenya-smb',
    title: 'Why a Professional Receptionist Is the Most Underrated Business Tool for Kenyan SMEs',
    excerpt:
      'Missed calls are missed revenue. Studies show that over 70 percent of callers who reach voicemail do not call back. A virtual receptionist answers in your company name, every time, without the salary overhead.',
    category: 'Virtual Office',
    author: 'Faith Achieng',
    authorRole: 'Operations Manager',
    date: 'May 19, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&q=80',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

function CategoryBadge({ category }: { category: string }) {
  const colours: Record<string, string> = {
    'Business Strategy': 'bg-navy/8 text-navy',
    'Company Registration': 'bg-gold/10 text-gold-700',
    'Virtual Office': 'bg-navy/8 text-navy',
    'Business Expansion': 'bg-emerald-50 text-emerald-700',
    'Mail Services': 'bg-sky-50 text-sky-700',
    Productivity: 'bg-purple-50 text-purple-700',
    Compliance: 'bg-red-50 text-red-700',
    Workspace: 'bg-orange-50 text-orange-700',
    Entrepreneurship: 'bg-gold/10 text-gold-700',
  }
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${colours[category] ?? 'bg-gray-100 text-gray-600'}`}>
      {category}
    </span>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = blogPosts.find((p) => p.featured)
  const rest = blogPosts.filter((p) => !p.featured)

  const filtered =
    activeCategory === 'All' ? rest : rest.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&auto=format&q=80"
        eyebrow="Insights"
        title="The PresenceHQ Blog."
        subtitle="Business guides, compliance updates, and practical advice for entrepreneurs and companies operating in Kenya."
        height="h-[55vh] min-h-[400px]"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">

          {/* Featured post */}
          {featured && activeCategory === 'All' && (
            <Link href={`/blog/${featured.slug}`}>
              <div className="group grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-light-gray mb-20 cursor-pointer hover:shadow-2xl hover:shadow-black/10 transition-shadow duration-500">
                <div className="relative overflow-hidden h-72 lg:h-auto min-h-[340px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white bg-gold px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <CategoryBadge category={featured.category} />
                  <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-navy mt-4 mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-dark-gray/70 text-sm font-light leading-relaxed mb-8">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-navy">{featured.author}</p>
                      <p className="text-xs text-dark-gray/50">{featured.date} · {featured.readTime}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-14">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full border transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-navy/20 hover:border-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-black/8 transition-all duration-400 cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <CategoryBadge category={post.category} />
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-heading font-semibold text-navy text-base leading-snug mb-3 group-hover:text-gold transition-colors duration-200 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-dark-gray/60 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                      <div>
                        <p className="text-xs font-semibold text-navy">{post.author}</p>
                        <p className="text-xs text-dark-gray/40">{post.date} · {post.readTime}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-dark-gray/40">
              No articles in this category yet. Check back soon.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
