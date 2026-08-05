import { PageHero } from '@/components/ui/PageHero'
import { FeaturedPackages } from '@/components/home/FeaturedPackages'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

export default function PricingPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Pricing"
        title="Simple Plans for Ambitious Businesses."
        subtitle="Enterprise-grade infrastructure at a fraction of the cost of traditional office space."
      />
      <FeaturedPackages />
      <FAQ />
      <CallToAction />
    </>
  )
}
