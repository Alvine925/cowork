import type { Metadata } from 'next'
import { CallToAction } from '@/components/home/CallToAction'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Location | PresenceHQ',
}

export default function GenericLocationPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title="Premium Location" subtitle="Establish your presence in a prime business district." dark />
        </div>
      </section>
      <CallToAction />
    </>
  )
}
