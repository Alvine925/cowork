import type { Metadata } from 'next'
import { CallToAction } from '@/components/home/CallToAction'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Service | PresenceHQ',
}

export default function GenericServicePage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title="Premium Business Service" subtitle="Professional infrastructure for modern companies." dark />
        </div>
      </section>
      <CallToAction />
    </>
  )
}
