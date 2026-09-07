import { Hero } from '@/components/home/Hero'
import { TrustedBy } from '@/components/home/TrustedBy'
import { Problem } from '@/components/home/Problem'
import { Solution } from '@/components/home/Solution'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedPackages } from '@/components/home/FeaturedPackages'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Problem />
      <Solution />
      <ServicesOverview />
      <WhyChooseUs />
      <HowItWorks />
      <FeaturedPackages />
      <FAQ />
      <CallToAction />
    </>
  )
}
