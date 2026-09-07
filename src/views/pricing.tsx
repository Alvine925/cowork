'use client'

import { PageHero } from '@/components/ui/PageHero'
import { FeaturedPackages } from '@/components/home/FeaturedPackages'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

export default function PricingPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Transparent Pricing"
        title="Presence plans first. Hub rates below."
        subtitle="Virtual office, business address, and day pass lead. Dedicated desks and meeting rooms are priced in the same Kisumu hub."
      />
      <FeaturedPackages />
      <FAQ />
      <CallToAction />
    </>
  )
}