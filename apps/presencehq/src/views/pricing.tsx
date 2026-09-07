'use client'

import { PageHero } from '@/components/ui/PageHero'
import { FeaturedPackages } from '@/components/home/FeaturedPackages'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

export default function PricingPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Pricing"
        title="A professional address, on your terms."
        subtitle="Paper Street memberships give your business a credible home in Kisumu, with mail handling, workspace access and a local team when you need one."
      />
      <FeaturedPackages />
      <section className="bg-[#f7f3ea] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Before you start</span>
            <h2 className="font-heading text-4xl font-light leading-tight text-navy sm:text-5xl">A considered membership is easier to run.</h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              Clear terms, no hidden setup fees, and transparent renewal dates.
            </p>
          </div>
        </div>
      </section>
      <FAQ />
      <CallToAction />
    </>
  )
}