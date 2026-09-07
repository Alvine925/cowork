'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { blogPosts, type BlogPost } from '@/data/blog-posts'

export type { BlogPost }
export { blogPosts }

const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

const CATEGORY_COLORS: Record<string, string> = {
  'Business Strategy': 'text-navy',
  'Company Registration': 'text-navy',
  'Virtual Office': 'text-navy',
  'Business Expansion': 'text-emerald-700',
  'Mail Services': 'text-sky-700',
  Productivity: 'text-purple-700',
  Compliance: 'text-amber-700',
  Workspace: 'text-orange-600',
  Entrepreneurship: 'text-teal-700',
}

function Tag({ category }: { category: string }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${CATEGORY_COLORS[category] ?? 'text-navy/50'}`}>
      {category}
    </span>
  )
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0]
  const rest = blogPosts.filter((p) => !p.featured)
  const filtered = activeCategory === 'All' ? rest : rest.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&auto=format&q=80"
        eyebrow="Insights & Analysis"
        title="The Paper Street Journal."
        subtitle="Business guides, commercial presence strategies, and practical advice for companies in Kenya."
        height="h-[45vh] min-h-[320px]"
      />

      <section className="pt-16 pb-28 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">

          {/* Featured Article */}
          {activeCategory === 'All' && featured && (
            <Link href={`/blog/${featured.slug}`} className="block mb-16 group">
              <div className="grid lg:grid-cols-5 gap-8 items-center border-b border-navy/10 pb-12">
                <div className="lg:col-span-3 relative overflow-hidden aspect-[16/10] bg-navy/5">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="lg:col-span-2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-navy border border-navy/20 px-2 py-0.5">Featured</span>
                    <Tag category={featured.category} />
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-navy leading-snug mb-3 group-hover:text-navy-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-navy/65 text-xs font-light leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-navy/40 font-mono">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 transition-colors ${
                  activeCategory === cat
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy/60 hover:text-navy border border-navy/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post list */}
          <div className="divide-y divide-navy/10">
            {filtered.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-7 group">
                <article className="grid sm:grid-cols-12 gap-6 items-center">
                  {/* Number */}
                  <div className="sm:col-span-1 hidden sm:block">
                    <span className="font-mono text-xs font-semibold text-navy/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="sm:col-span-8 flex flex-col gap-1.5">
                    <div className="mb-0.5">
                      <Tag category={post.category} />
                    </div>
                    <h3 className="text-base font-heading font-semibold text-navy leading-snug group-hover:text-navy-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-navy/65 text-xs font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="text-[11px] font-mono text-navy/40 mt-1">
                      {post.author} · {post.date} · {post.readTime}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="sm:col-span-3 relative overflow-hidden aspect-[16/10] bg-navy/5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-navy/40 text-xs py-12">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
