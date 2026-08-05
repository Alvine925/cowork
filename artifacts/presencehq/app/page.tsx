import { Hero } from '@/components/home/Hero'
import { TrustedBy } from '@/components/home/TrustedBy'
import { Problem } from '@/components/home/Problem'
import { Solution } from '@/components/home/Solution'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { StatsBar } from '@/components/home/StatsBar'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedPackages } from '@/components/home/FeaturedPackages'
import { Testimonials } from '@/components/home/Testimonials'
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
      <StatsBar />
      <WhyChooseUs />
      <HowItWorks />
      <FeaturedPackages />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </>
  )
}
