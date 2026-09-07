'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { LandingPageConfig } from '@/data/landing-page-types'

export default function KisumuLandingPageView({ config }: { config: LandingPageConfig }) {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      {/* Editorial Hero */}
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-bold">
              {config.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            {config.heroHeading}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            {config.heroSubtitle}
          </p>

          {/* Direct CTA Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link
              href={config.primaryCtaHref}
              className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors"
            >
              {config.primaryCtaText} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={config.secondaryCtaHref}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy/60 transition-colors"
            >
              {config.secondaryCtaText} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Clean Metric Line */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-black/10">
            {config.keyStats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-heading font-light text-navy">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & Editorial Analysis */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-bold mb-2">
                01 / Overview
              </span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">
                {config.overviewTitle}
              </h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              {config.overviewContent.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Infrastructure (Editorial Numbered List) */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-bold mb-2">
              02 / Infrastructure
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">
              Commercial Building Standards
            </h2>
          </div>

          <div className="divide-y divide-black/10">
            {config.features.map((feature, i) => (
              <div key={i} className="py-8 grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-base font-heading font-medium text-navy">
                    {feature.title}
                  </h3>
                </div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership & Pricing (Clean Minimalist Grid, No Cards) */}
      <section id="pricing" className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-bold mb-2">
              03 / Pricing & Plans
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">
              Workspace Options in Kisumu CBD
            </h2>
            <p className="text-xs md:text-sm text-navy/60 font-light mt-2 max-w-xl">
              Simple, transparent monthly and daily rates with all core commercial utilities included.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {config.pricingPackages.map((pkg, i) => (
              <div key={i} className="flex flex-col justify-between pt-6 border-t-2 border-navy">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-base font-heading font-medium text-navy">
                      {pkg.name}
                    </h3>
                    {pkg.popular && (
                      <span className="bg-navy text-gold text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-navy/60 font-light mb-6">
                    {pkg.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-black/10">
                    <span className="text-2xl md:text-3xl font-heading font-light text-navy">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-mono text-navy/50 ml-1">
                      {pkg.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-navy/75 font-light">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-navy font-bold text-xs">/</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pkg.ctaHref}
                  className="inline-flex items-center justify-center gap-2 border border-navy text-navy text-xs font-semibold uppercase tracking-[0.14em] py-3 hover:bg-navy hover:text-white transition-colors"
                >
                  {pkg.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Commercial Building Detail */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-bold mb-2">
                04 / Location
              </span>
              <h2 className="text-2xl font-heading font-light text-navy">
                Kisumu CBD Commercial Center
              </h2>
              <p className="text-xs text-navy/60 font-mono mt-2">
                Oginga Odinga Street, Kisumu
              </p>
            </div>
            <div className="md:col-span-8 space-y-4 text-xs md:text-sm text-navy/80 font-light leading-relaxed">
              <p>
                Paper Street operates from an established commercial building located along Oginga Odinga Street, the primary banking and corporate corridor in Kisumu CBD.
              </p>
              <p>
                Within walking distance to major commercial banking institutions (KCB, Equity Bank, Stanbic, NCBA, Absa), law chambers, courier offices, and county government registries.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy/60 transition-colors"
                >
                  Schedule a Visit <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs (Clean Plain Text Q&A) */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="py-20 border-b border-black/10">
          <div className="container mx-auto px-6 md:px-16 max-w-5xl">
            <div className="mb-12">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-bold mb-2">
                05 / Inquiries
              </span>
              <h2 className="text-2xl font-heading font-light text-navy">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-black/10">
              {config.faqs.map((faq, idx) => (
                <div key={idx} className="py-6 grid md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 font-heading text-sm font-medium text-navy">
                    {faq.q}
                  </div>
                  <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Minimalist Editorial Bottom CTA */}
      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              Establish your commercial presence in Kisumu.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Join businesses, remote professionals, and consultants who base their operations at Paper Street Kisumu CBD.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={config.primaryCtaHref}
                className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors"
              >
                {config.primaryCtaText} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors"
              >
                Talk to Our Kisumu Team <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
