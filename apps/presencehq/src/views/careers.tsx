'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

export default function CareersPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&q=80"
        eyebrow="Careers"
        title="Shape the future of flexible workspace."
        subtitle="Join our hospitality and operations team in Nairobi, Mombasa, and across East Africa."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-8">
          <div className="border border-navy/15 p-8 bg-[#FBF8F0] space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Open Position</span>
            <h3 className="font-heading text-2xl text-navy">Member Concierge & Front Desk Host</h3>
            <p className="text-xs text-navy/60">Location: Westlands, Nairobi · Full-Time</p>
            <p className="text-xs text-navy/75 leading-relaxed pt-2">
              Deliver exceptional front-of-house hospitality, handle incoming client mail dispatch, manage meeting room bookings, and support Paper Street corporate members.
            </p>
            <div className="pt-4">
              <a
                href="mailto:careers@paperstreet.co.ke?subject=Application:%20Member%20Concierge"
                className="inline-block bg-navy text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
              >
                Apply via Email &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
