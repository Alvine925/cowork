'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'
import { FAQ_SECTIONS } from '@/data/faq'

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQ_SECTIONS.map((section) => {
      const items = section.items.filter((item) => {
        if (active !== 'all' && section.id !== active) return false
        if (!q) return true
        return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      })
      return { ...section, items }
    }).filter((section) => section.items.length > 0)
  }, [query, active])

  const total = filtered.reduce((n, s) => n + s.items.length, 0)

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&q=80"
        eyebrow="Help centre"
        title="Questions about virtual office, address, and day pass."
        subtitle="Detailed answers on plans, KYC, mail, billing, meeting rooms, and the Kisumu hub. Still stuck? Contact us."
        height="h-[52vh] min-h-[420px]"
      />

      <section className="bg-white border-b border-navy/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="sr-only" htmlFor="faq-search">
              Search questions
            </label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions — e.g. deposit, KRA, day pass"
              className="flex-1 border border-navy/15 px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy"
            />
            <p className="text-xs font-mono uppercase tracking-wider text-navy/45 shrink-0">
              {total} result{total === 1 ? '' : 's'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive('all')}
              className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 border transition-colors ${
                active === 'all'
                  ? 'bg-navy text-white border-navy'
                  : 'border-navy/20 text-navy/70 hover:border-navy'
              }`}
            >
              All
            </button>
            {FAQ_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActive(section.id)}
                className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 border transition-colors ${
                  active === section.id
                    ? 'bg-navy text-white border-navy'
                    : 'border-navy/20 text-navy/70 hover:border-navy'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-16">
          {filtered.length === 0 ? (
            <p className="text-sm text-navy/60">
              No matches. Try another word, or{' '}
              <Link href="/contact" className="underline text-navy">
                contact us
              </Link>
              .
            </p>
          ) : (
            filtered.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-navy/60 leading-relaxed">{section.intro}</p>

                <Accordion.Root type="multiple" className="mt-8 border-t border-navy/10">
                  {section.items.map((faq, i) => (
                    <Accordion.Item
                      key={faq.q}
                      value={`${section.id}-${i}`}
                      className="border-b border-navy/10"
                    >
                      <Accordion.Header>
                        <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left text-navy text-base font-medium group hover:text-navy/70 outline-none">
                          {faq.q}
                          <span className="text-navy/30 group-data-[state=open]:hidden ml-4 shrink-0">+</span>
                          <span className="text-navy/30 hidden group-data-[state=open]:block ml-4 shrink-0">−</span>
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <p className="text-navy/60 text-sm font-light leading-relaxed pb-5 pr-8">{faq.a}</p>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>
            ))
          )}

          <div className="pt-8 border-t border-navy/10 flex flex-wrap gap-6 text-sm">
            <Link href="/pricing" className="text-navy font-medium hover:underline">
              Compare pricing →
            </Link>
            <Link href="/quote/virtual-office" className="text-navy font-medium hover:underline">
              Get a virtual office quote →
            </Link>
            <Link href="/book/hot-desk" className="text-navy font-medium hover:underline">
              Book a day pass →
            </Link>
            <Link href="/contact" className="text-navy font-medium hover:underline">
              Contact →
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
