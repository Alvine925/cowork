'use client'

import * as Accordion from '@radix-ui/react-accordion'

const FAQS = [
  {
    q: "Can I use the address for company registration?",
    a: "Yes, our business address packages allow you to use our prime locations as your registered office address for government filings, KRA, and official documents."
  },
  {
    q: "How does mail handling work?",
    a: "When mail arrives for your company, our reception signs for it and stores it securely. Depending on your plan, we will notify you via email, hold it for pickup, scan the contents, or physically forward it to your designated address."
  },
  {
    q: "Are the meeting rooms included in all packages?",
    a: "Meeting rooms are included in our Professional and Premium plans. Starter plan users can book meeting rooms on a pay-as-you-go basis at a discounted member rate."
  },
  {
    q: "How fast can my virtual office be set up?",
    a: "Account activation takes less than 24 hours once we receive your signed agreement and standard KYC (Know Your Customer) documents."
  },
  {
    q: "Do I have to sign a long-term lease?",
    a: "No. Our services operate on flexible rolling contracts. You can choose month-to-month billing or opt for an annual plan to receive two months free."
  }
]

export function FAQ() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
          FAQ
        </span>
        <h2 className="text-4xl font-light font-[family-name:var(--font-heading)] text-gray-900 mb-16">
          Common questions.
        </h2>

        <Accordion.Root type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="border-b border-gray-100">
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left text-gray-900 text-base font-medium group transition-colors hover:text-gold outline-none">
                  {faq.q}
                  <span className="text-gray-400 group-data-[state=open]:hidden">+</span>
                  <span className="text-gray-400 hidden group-data-[state=open]:block">−</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="text-gray-500 text-sm font-light leading-relaxed pb-5 pr-8">
                  {faq.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

      </div>
    </section>
  )
}
