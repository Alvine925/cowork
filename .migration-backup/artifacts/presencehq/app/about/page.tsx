import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CallToAction } from '@/components/home/CallToAction'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about PresenceHQ, our mission to democratize premium business infrastructure, and the team behind the platform.',
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            eyebrow="Our Story"
            title="Democratizing Premium Business Infrastructure."
            subtitle="We believe that ambition shouldn't be limited by the cost of physical office space. We're building the operating system for physical business presence."
            dark
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format" 
                alt="Founders handshake" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-navy font-[family-name:var(--font-heading)]">Why We Started PresenceHQ</h2>
              <div className="text-dark-gray/80 space-y-4">
                <p>
                  Five years ago, our founders experienced a common frustration: they lost a major enterprise contract because their consulting firm was registered to a residential address. 
                </p>
                <p>
                  The enterprise client's procurement department flagged the residential address as a "vendor risk." The solution was to rent a commercial office, but signing a two-year lease for space they didn't need just to get an address felt absurd.
                </p>
                <p>
                  PresenceHQ was born from this exact problem. We realized thousands of consultants, freelancers, startups, and expanding international companies face the same barrier: the prohibitive cost of professional credibility.
                </p>
                <p>
                  Today, we provide over 500 businesses with the premium addresses, reception services, and meeting spaces they need to look and operate like Fortune 500 companies—without the overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Our Values"
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-navy mb-4">Uncompromising Professionalism</h3>
              <p className="text-dark-gray/70">Our front desk is your front desk. We train our staff to represent your business with the utmost discretion and polish.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-navy mb-4">Radical Flexibility</h3>
              <p className="text-dark-gray/70">Business is unpredictable. We don't believe in locking our clients into rigid, long-term leases that stifle their agility.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-navy mb-4">Frictionless Expansion</h3>
              <p className="text-dark-gray/70">We are building a network that allows you to establish a presence in a new city with a single click.</p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
