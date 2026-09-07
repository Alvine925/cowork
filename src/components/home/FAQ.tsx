'use client'

import Link from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { HOME_FAQS } from '@/data/faq'

export function FAQ() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <span className="text-navy tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
          FAQ
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2 className="text-4xl font-light font-heading text-gray-900">Common questions.</h2>
          <Link
            href="/faq"
            className="text-[11px] font-semibold uppercase tracking-widest text-navy hover:text-navy/70"
          >
            View all FAQs →
          </Link>
        </div>

        <Accordion.Root type="single" collapsible className="w-full">
          {HOME_FAQS.map((faq, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="border-b border-gray-100">
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left text-gray-900 text-base font-medium group transition-colors hover:text-navy-400 outline-none">
                  {faq.q}
                  <span className="text-gray-400 group-data-[state=open]:hidden ml-4 shrink-0">+</span>
                  <span className="text-gray-400 hidden group-data-[state=open]:block ml-4 shrink-0">−</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="text-gray-500 text-sm font-light leading-relaxed pb-5 pr-8">{faq.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
