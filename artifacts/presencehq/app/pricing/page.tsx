import type { Metadata } from 'next'
import { FeaturedPackages } from '@/components/home/FeaturedPackages'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent, scalable pricing for your virtual office and business presence needs.',
}

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
            Simple Plans for Ambitious Businesses
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Enterprise-grade infrastructure at a fraction of the cost of traditional office space.
          </p>
        </div>
      </section>

      <FeaturedPackages />
      
      <FAQ />
      <CallToAction />
    </>
  )
}
