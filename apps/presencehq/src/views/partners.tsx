'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

export default function PartnersPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&q=80"
        eyebrow="Partnerships"
        title="Grow with the Paper Street Network."
        subtitle="We collaborate with property developers, corporate service providers, and business accelerators across East Africa."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-12">
          <div className="border border-navy/15 p-8 bg-[#FBF8F0]">
            <h3 className="font-heading text-2xl text-navy">Corporate & Legal Partners</h3>
            <p className="mt-3 text-xs text-navy/70 leading-relaxed">
              Are you a company secretary, law firm, or accounting practice? Partner with Paper Street to provide your clients with seamless registered office addresses and compliant compliance packages.
            </p>
            <div className="mt-6">
              <Link href="/contact" className="inline-block bg-navy text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold">
                Inquire About Partnership &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
