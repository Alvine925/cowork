'use client'

import { PageHero } from '@/components/ui/PageHero'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { CallToAction } from '@/components/home/CallToAction'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Services"
        title="Virtual office, business address, and day pass — plus the hub around them."
        subtitle="Start with presence in Kisumu CBD. Meeting rooms, dedicated desks, and mail add-ons stay one click away."
      />
      <ServicesOverview />
      <CallToAction />
    </>
  )
}
