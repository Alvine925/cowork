import { Testimonials } from '@/components/home/Testimonials'
import { CallToAction } from '@/components/home/CallToAction'
import { PageHero } from '@/components/ui/PageHero'

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&q=80"
        eyebrow="Client Stories"
        title="What Our Clients Say."
        subtitle="Businesses across Kenya trust Paper Street for their professional presence."
      />
      <Testimonials />
      <CallToAction />
    </>
  )
}
