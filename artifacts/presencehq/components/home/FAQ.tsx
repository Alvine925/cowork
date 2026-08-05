'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FAQS = [
  {
    question: "Can I use the address to register my company?",
    answer: "Yes, our Business Address and Virtual Office packages provide you with a legally recognized commercial address that can be used for company registration, bank accounts, and tax purposes."
  },
  {
    question: "How long does it take to get set up?",
    answer: "Once you select a package and submit the required compliance documents (ID and company registration if applicable), your account is typically activated within 2-4 hours."
  },
  {
    question: "How does mail handling work?",
    answer: "We receive your mail and packages at our reception. Depending on your plan, we will notify you via email, hold them securely for pickup, or scan and forward them to you digitally."
  },
  {
    question: "Do I have to sign a long-term lease?",
    answer: "No. PresenceHQ operates on flexible terms. You can choose month-to-month billing and cancel at any time, or opt for an annual plan to receive a discount."
  },
  {
    question: "Can I use the meeting rooms if I only have a Starter plan?",
    answer: "Yes, Starter plan members can book meeting rooms and hot desks on a pay-as-you-go basis at preferred member rates."
  },
  {
    question: "Are there any hidden setup fees?",
    answer: "No. We believe in transparent pricing. There are no setup fees, activation costs, or hidden charges. You only pay the advertised package price."
  }
]

export function FAQ() {
  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about setting up your business presence."
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <Accordion.Root type="single" collapsible className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <Accordion.Item 
                key={i} 
                value={`item-${i}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-2"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-5 text-left text-navy font-bold hover:text-gold transition-colors [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-5 pt-0 text-dark-gray/80 text-sm leading-relaxed overflow-hidden data-[state=closed]:animate-[slideUp_300ms_ease-out] data-[state=open]:animate-[slideDown_300ms_ease-out]">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideDown {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes slideUp {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
      `}} />
    </section>
  )
}
