import type { Metadata } from 'next'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { CallToAction } from '@/components/home/CallToAction'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our complete suite of business presence solutions including virtual offices, mail handling, and meeting rooms.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
            Everything You Need to Operate Professionally
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Build your custom business presence package. Start with a premium address and scale up to mail handling, call answering, and dedicated desks as you grow.
          </p>
        </div>
      </section>

      <ServicesOverview />
      <CallToAction />
    </>
  )
}
