import { PageHero } from '@/components/ui/PageHero'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { CallToAction } from '@/components/home/CallToAction'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Our Services"
        title="Everything You Need to Operate Professionally."
        subtitle="Build your custom business presence package. Start with a premium address and scale up as you grow."
      />
      <ServicesOverview />
      <CallToAction />
    </>
  )
}
