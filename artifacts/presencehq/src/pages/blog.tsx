import { useState } from 'react'
import { Link } from 'wouter'
import { PageHero } from '@/components/ui/PageHero'

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
    readTime: '8 min',
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
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&q=80',
  },
  {
    slug: 'professional-business-address-kenya',
    title: 'Why a Professional Business Address Still Matters in the Age of Remote Work',
    excerpt:
      'A Kilimani or Westlands address signals credibility to clients, banks, and regulators. We explain why physical address perception remains a real commercial factor in Kenya.',
    category: 'Virtual Office',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'July 14, 2025',
    readTime: '6 min',
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
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&q=80',
  },
  {
    slug: 'mail-handling-business-kenya',
    title: 'How Professional Mail Handling Protects Your Business',
    excerpt:
      'Missed legal notices, delayed invoices, and uncollected government correspondence cost Kenyan businesses millions every year. Here is how a structured mail handling service eliminates the risk.',
    category: 'Mail Services',
    author: 'Faith Achieng',
    authorRole: 'Operations Manager',
    date: 'June 30, 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&q=80',
  },
  {
    slug: 'meeting-room-tips-nairobi',
    title: '10 Ways to Make Your Next Client Meeting in Nairobi Unforgettable',
    excerpt:
      'First impressions in a boardroom are shaped by location, preparation, and the small details. These practical tips will ensure your meeting runs flawlessly every time.',
    category: 'Productivity',
    author: 'Peter Ngugi',
    authorRole: 'Workspace Experience Lead',
    date: 'June 23, 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1562575214-da9fcf59b907?w=1200&auto=format&q=80',
  },
  {
    slug: 'kyc-compliance-kenya-businesses',
    title: 'KYC Compliance for Kenyan Businesses: What the Law Requires',
    excerpt:
      'The Proceeds of Crime and Anti-Money Laundering Act places clear obligations on businesses. This guide explains exactly what documents you need, retention periods, and penalties for non-compliance.',
    category: 'Compliance',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'June 16, 2025',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&q=80',
  },
  {
    slug: 'hot-desk-dedicated-desk-difference',
    title: 'Hot Desk vs Dedicated Desk: Which Flexible Workspace Is Right for You?',
    excerpt:
      'Both options offer more flexibility than a traditional lease, but the right choice depends on how often your team works in-person, your budget, and the nature of your work.',
    category: 'Workspace',
    author: 'Peter Ngugi',
    authorRole: 'Workspace Experience Lead',
    date: 'June 9, 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&q=80',
  },
  {
    slug: 'freelancer-professional-presence-kenya',
    title: 'How Freelancers and Consultants Build a Credible Business Presence on a Budget',
    excerpt:
      'Going independent does not mean looking like a one-person show. We cover the exact tools, addresses, and setups that help Kenyan freelancers compete for high-value contracts.',
    category: 'Entrepreneurship',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'June 2, 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&q=80',
  },
  {
    slug: 'kenya-data-protection-act-smes',
    title: 'The Kenya Data Protection Act: What Every Small Business Owner Must Know',
    excerpt:
      'Since the ODPC began enforcement, SMEs face real penalties for mishandling customer data. This guide explains your obligations and the low-cost steps that bring you into compliance.',
    category: 'Compliance',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'May 26, 2025',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&q=80',
  },
  {
    slug: 'reception-services-kenya-smb',
    title: 'Why a Professional Receptionist Is the Most Underrated Tool for Kenyan SMEs',
    excerpt:
      'Over 70 percent of callers who reach voicemail do not call back. A virtual receptionist answers in your company name, every time, without the salary overhead.',
    category: 'Virtual Office',
    author: 'Faith Achieng',
    authorRole: 'Operations Manager',
    date: 'May 19, 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&q=80',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

const CATEGORY_COLORS: Record<string, string> = {
  'Business Strategy': 'text-navy',
  'Company Registration': 'text-gold-600',
  'Virtual Office': 'text-navy',
  'Business Expansion': 'text-emerald-700',
  'Mail Services': 'text-sky-700',
  Productivity: 'text-purple-700',
  Compliance: 'text-red-600',
  Workspace: 'text-orange-600',
  Entrepreneurship: 'text-gold-600',
}

function Tag({ category }: { category: string }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${CATEGORY_COLORS[category] ?? 'text-dark-gray/50'}`}>
      {category}
    </span>
  )
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = blogPosts.find((p) => p.featured)!
  const rest = blogPosts.filter((p) => !p.featured)
  const filtered = activeCategory === 'All' ? rest : rest.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&auto=format&q=80"
        eyebrow="Insights"
        title="The PresenceHQ Journal."
        subtitle="Business guides, compliance updates, and practical advice for entrepreneurs operating in Kenya."
        height="h-[50vh] min-h-[360px]"
      />

      <section className="pt-20 pb-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">

          {/* Featured */}
          {activeCategory === 'All' && (
            <Link href={`/blog/${featured.slug}`}>
              <div className="group grid lg:grid-cols-5 gap-0 mb-20 cursor-pointer">
                <div className="lg:col-span-3 relative overflow-hidden h-64 lg:h-[380px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/30 to-navy/10" />
                </div>
                <div className="lg:col-span-2 bg-light-gray flex flex-col justify-center px-10 py-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-gold px-2.5 py-1">Featured</span>
                    <Tag category={featured.category} />
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-navy leading-snug mb-4 group-hover:text-gold transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-dark-gray/60 text-sm font-light leading-relaxed mb-8">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-dark-gray/40">
                    <span>{featured.author}</span>
                    <span className="opacity-40">·</span>
                    <span>{featured.date}</span>
                    <span className="opacity-40">·</span>
                    <span>{featured.readTime} read</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-navy text-white'
                    : 'bg-light-gray text-navy/60 hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post list */}
          <div className="divide-y divide-gray-100">
            {filtered.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group grid sm:grid-cols-4 gap-6 py-8 cursor-pointer">
                  {/* Number */}
                  <div className="hidden sm:flex items-start pt-1">
                    <span className="text-[11px] font-bold text-dark-gray/20 tracking-wider font-heading">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <Tag category={post.category} />
                    <h3 className="text-base font-heading font-semibold text-navy leading-snug group-hover:text-gold transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-dark-gray/55 text-sm font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="text-[11px] text-dark-gray/35 mt-1">
                      {post.author} · {post.date} · {post.readTime} read
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/2] sm:aspect-auto sm:h-full min-h-[100px]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-dark-gray/30 text-sm py-16">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
