'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Phone, Mail, Check } from 'lucide-react'
import type { ManagedOfficeArticle } from '@/data/managed-office-content-engine'

export default function ManagedOfficeArticleView({ article }: { article: ManagedOfficeArticle }) {
  const { page, readingTimeMinutes, publishedDate, wordCount, summaryPoints, sections, faqs, relatedPages } = article

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: page.metaTitle,
        description: page.metaDescription,
        url: `https://paperstreet.co.ke/${page.slug}`,
        datePublished: '2026-11-04',
        dateModified: '2026-11-04',
        author: {
          '@type': 'Organization',
          name: 'Paper Street',
          url: 'https://paperstreet.co.ke',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Paper Street',
          logo: {
            '@type': 'ImageObject',
            url: 'https://paperstreet.co.ke/paper-street-logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://paperstreet.co.ke/${page.slug}`,
        },
      },
      {
        '@type': 'LocalBusiness',
        name: 'Paper Street Managed Offices',
        url: 'https://paperstreet.co.ke',
        telephone: '+254110486677',
        email: 'hello@paperstreet.co.ke',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Oginga Odinga Street, Kisumu CBD Commercial Center',
          addressLocality: 'Kisumu',
          addressRegion: 'Kisumu County',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -0.1022,
          longitude: 34.7617,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://paperstreet.co.ke',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Office Management',
            item: 'https://paperstreet.co.ke/office-management',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: page.keyword,
            item: `https://paperstreet.co.ke/${page.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <div className="bg-[#FBFAF7] text-[#2D2D2D] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header & Article Hero */}
      <header className="pt-32 pb-16 border-b border-navy/15">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-navy/60 mb-8 border-b border-navy/10 pb-3">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/office-management" className="hover:text-navy transition-colors">Managed Offices</Link>
            <span>/</span>
            <span className="text-navy font-bold truncate max-w-xs">{page.groupName}</span>
          </nav>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-bold">
              Paper Street Workspace Advisory · {page.groupName}
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-light text-navy tracking-tight leading-[1.12] mb-6 max-w-4xl">
            {page.metaTitle.replace(' | Paper Street', '')}
          </h1>

          {/* Lead Meta Description */}
          <p className="text-base sm:text-lg text-navy/75 font-light leading-relaxed max-w-3xl mb-8">
            {page.metaDescription}
          </p>

          {/* Metadata Bar (Flat, No Card) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-navy/10 text-xs font-mono text-navy/65">
            <div className="flex flex-wrap items-center gap-6">
              <span>Published: {publishedDate}</span>
              <span>•</span>
              <span>Reading Time: {readingTimeMinutes} min ({wordCount.toLocaleString()} words)</span>
              <span>•</span>
              <span>Author: Paper Street Workspace Team</span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/office-management/quote-request"
                className="bg-navy text-white hover:bg-navy-800 transition-colors px-5 py-2.5 text-[11px] font-mono uppercase tracking-wider font-bold inline-flex items-center gap-1.5"
              >
                Request Proposal <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Article Body (8 cols) */}
            <article className="lg:col-span-8 space-y-16">
              
              {/* Executive Summary Box (Flat, No Card) */}
              <section aria-labelledby="executive-summary" className="border-l-2 border-navy pl-6 py-2 space-y-3 bg-navy/[0.02]">
                <span id="executive-summary" className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                  Executive Briefing &amp; Key Findings
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-navy/80 leading-relaxed">
                  {summaryPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-navy font-bold shrink-0 mt-0.5">0{idx + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Dynamic Editorial Sections */}
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="pt-8 border-t border-navy/10 space-y-6">
                  {/* Section Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-navy font-bold">{section.number}</span>
                    <span className="w-4 h-px bg-navy/30" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 font-semibold">
                      Section {section.number}
                    </span>
                  </div>

                  {/* Section Title */}
                  <h2 className="text-2xl sm:text-3xl font-heading font-light text-navy tracking-tight leading-snug">
                    {section.title}
                  </h2>

                  {/* Section Lead */}
                  {section.lead && (
                    <p className="text-sm sm:text-base text-navy font-medium leading-relaxed italic">
                      {section.lead}
                    </p>
                  )}

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base text-[#2D2D2D]/85 leading-relaxed font-normal">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Optional Callout (Flat, No Card) */}
                  {section.callout && (
                    <div className="border-l-2 border-navy bg-navy/[0.03] p-5 space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-navy font-bold block">
                        {section.callout.title}
                      </span>
                      <p className="text-xs sm:text-sm text-navy/80 leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Optional List Items */}
                  {section.listItems && (
                    <div className="divide-y divide-navy/10 border-t border-b border-navy/10 my-6">
                      {section.listItems.map((item, lIdx) => (
                        <div key={lIdx} className="py-4 space-y-1">
                          <h3 className="font-heading text-lg font-semibold text-navy">
                            {item.term}
                          </h3>
                          <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional High-Density Financial Comparison Table */}
                  {section.tableData && (
                    <div className="my-8 overflow-x-auto border-t border-b border-navy/20">
                      {section.tableData.caption && (
                        <caption className="font-mono text-[10px] uppercase tracking-wider text-navy/60 text-left py-2 block font-semibold">
                          {section.tableData.caption}
                        </caption>
                      )}
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-navy/20 bg-navy/5 font-mono uppercase tracking-wider text-[10px] text-navy font-bold">
                            {section.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-3 px-4">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-navy/10">
                          {section.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-navy/[0.015] transition-colors">
                              <td className="py-3 px-4 font-medium text-navy">{row[0]}</td>
                              <td className="py-3 px-4 text-navy/70">{row[1]}</td>
                              <td className="py-3 px-4 font-semibold text-navy">{row[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Comprehensive FAQs Section */}
              <section id="faqs" className="pt-10 border-t border-navy/15 space-y-8">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-2">
                    Commercial FAQ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-light text-navy tracking-tight">
                    Frequently Asked Questions About {page.keyword}
                  </h2>
                </div>

                <div className="divide-y divide-navy/10">
                  {faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="py-6 space-y-2">
                      <h3 className="font-heading text-lg sm:text-xl font-medium text-navy">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom Strategic CTA (Flat, No Card) */}
              <section className="pt-12 pb-6 border-t-2 border-navy space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                  Commercial Engagement
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-light text-navy tracking-tight leading-tight">
                  Establish Your Managed Office with Paper Street
                </h2>
                <p className="text-sm sm:text-base text-navy/75 leading-relaxed max-w-2xl">
                  Eliminate multi-million shilling fit-out costs, restrictive landlord leases, and daily operational overhead. Tell our workspace advisory team what your organization needs, and receive a customized managed office proposal within 1 business day.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/office-management/quote-request"
                    className="bg-navy text-white hover:bg-navy-800 transition-colors px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2"
                  >
                    Request Custom Proposal <ArrowRight size={14} />
                  </Link>

                  <a
                    href="https://wa.me/254110486677?text=Hello%20Paper%20Street,%20I%20am%20inquiring%20about%20managed%20office%20solutions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-navy/30 hover:border-navy text-navy hover:bg-navy/5 transition-colors px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2"
                  >
                    Chat on WhatsApp (+254 110 486 677)
                  </a>
                </div>
              </section>
            </article>

            {/* Right Column: Sticky Editorial Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
              
              {/* Table of Contents */}
              <div className="border-t border-navy/15 pt-6 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                  Table of Contents
                </span>
                <nav className="space-y-2 text-xs font-mono">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block text-navy/70 hover:text-navy hover:underline transition-colors truncate"
                    >
                      <span className="text-navy font-bold mr-2">{sec.number}.</span>
                      {sec.title}
                    </a>
                  ))}
                  <a
                    href="#faqs"
                    className="block text-navy/70 hover:text-navy hover:underline transition-colors pt-1"
                  >
                    <span className="text-navy font-bold mr-2">09.</span>
                    Frequently Asked Questions
                  </a>
                </nav>
              </div>

              {/* Service Core Specifications */}
              <div className="border-t border-navy/15 pt-6 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                  Service Framework
                </span>
                <div className="space-y-3 text-xs text-navy/80">
                  <div className="flex justify-between py-1.5 border-b border-navy/5">
                    <span className="text-navy/60">Location Focus:</span>
                    <span className="font-semibold text-navy">Kisumu CBD &amp; Kenya</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-navy/5">
                    <span className="text-navy/60">Agreement Terms:</span>
                    <span className="font-semibold text-navy">12 &amp; 24-Month Agreements</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-navy/5">
                    <span className="text-navy/60">Initial CapEx:</span>
                    <span className="font-semibold text-navy">KES 0 (Financed by Paper Street)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-navy/5">
                    <span className="text-navy/60">Power Backup:</span>
                    <span className="font-semibold text-navy">100% Standby Generator</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-navy/5">
                    <span className="text-navy/60">Connectivity:</span>
                    <span className="font-semibold text-navy">Dual-Carrier Redundant Fibre</span>
                  </div>
                </div>
              </div>

              {/* Related Workspace Services */}
              <div className="border-t border-navy/15 pt-6 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                  Other Services
                </span>
                <div className="space-y-3 text-xs">
                  <div>
                    <Link
                      href="/services/virtual-office"
                      className="font-semibold text-navy hover:underline block"
                    >
                      Virtual Office in Kisumu CBD
                    </Link>
                    <p className="text-[11px] text-navy/60 mt-0.5 leading-relaxed">
                      Official commercial address, daily mail scan-to-PDF, and boardroom credits.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-navy/5">
                    <Link
                      href="/services/business-address"
                      className="font-semibold text-navy hover:underline block"
                    >
                      Registered Business Address
                    </Link>
                    <p className="text-[11px] text-navy/60 mt-0.5 leading-relaxed">
                      Instant proof of address for eCitizen BRS, KRA PIN, and banking KYC.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-navy/5">
                    <Link
                      href="/pricing"
                      className="font-semibold text-navy hover:underline block"
                    >
                      Transparent Workspace Pricing
                    </Link>
                    <p className="text-[11px] text-navy/60 mt-0.5 leading-relaxed">
                      Compare annual, monthly, and hourly rates across all Paper Street solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Managed Office Articles (Deep Internal Linking) */}
              {relatedPages.length > 0 && (
                <div className="border-t border-navy/15 pt-6 space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                    Related Articles &amp; Guides
                  </span>
                  <div className="space-y-3 text-xs">
                    {relatedPages.map((rp) => (
                      <div key={rp.slug} className="pt-2 first:pt-0 border-t first:border-0 border-navy/5">
                        <Link
                          href={`/${rp.slug}`}
                          className="font-medium text-navy hover:underline block leading-snug"
                        >
                          {rp.title}
                        </Link>
                        <span className="text-[10px] font-mono text-navy/50 uppercase tracking-wider block mt-1">
                          {rp.keyword}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Inquiries & Front Desk */}
              <div className="border-t border-navy/15 pt-6 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
                  Direct Inquiries
                </span>
                <p className="text-xs text-navy/70 leading-relaxed">
                  Speak directly with our workspace director regarding property availability and custom office briefs:
                </p>
                <p className="text-xs font-mono text-navy">
                  Phone: <a href="tel:0110486677" className="font-bold hover:underline">0110486677</a>
                </p>
                <p className="text-xs font-mono text-navy">
                  Email: <a href="mailto:hello@paperstreet.co.ke" className="font-bold hover:underline">hello@paperstreet.co.ke</a>
                </p>
                <p className="text-[11px] font-mono text-navy/50 pt-1">
                  Kisumu CBD Commercial Center, Oginga Odinga Street
                </p>
              </div>

            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

