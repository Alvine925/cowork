import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CallToAction } from '@/components/home/CallToAction'

export const metadata: Metadata = {
  title: 'Virtual Office Package',
  description: 'Our complete virtual office package provides a premium business address, mail handling, and meeting room access without the physical overhead.',
}

export default function VirtualOfficePage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-sm mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">Premium Package</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 font-[family-name:var(--font-heading)]">
                The Complete Virtual Office Solution.
              </h1>
              <p className="text-lg text-white/80 max-w-xl mb-8">
                Everything you need to operate a professional, credible business—without signing a commercial lease. A prime address, dedicated reception, and workspace when you need it.
              </p>
              <div className="flex gap-4">
                <Link href="/contact">
                  <Button variant="gold" size="lg">Get Started Today</Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">View Pricing</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format"
                alt="Premium Office Space"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            eyebrow="Features"
            title="What's Included in the Virtual Office?"
            className="mb-16"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "Commercial Business Address in a prime location",
              "Use of address for company registration and bank accounts",
              "Professional mail handling and secure storage",
              "Email notifications when mail or packages arrive",
              "Dedicated local phone number (Optional)",
              "Live receptionists to answer calls in your company name",
              "Access to meeting rooms at member rates",
              "Access to hot desks and coworking areas",
              "Mail forwarding options (digital or physical)"
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-6 h-6 text-gold" />
                <p className="font-semibold text-navy">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
