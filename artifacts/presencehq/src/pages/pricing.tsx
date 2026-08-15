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
            <p className="mt-5 max-w-xl text-sm font-light leading-7 text-dark-gray/58">The plan is only one part of the decision. Here is what happens around it, from the first conversation to the first piece of mail.</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h3 className="font-heading text-2xl text-navy">What we collect at onboarding</h3>
              <p className="mb-8 mt-4 max-w-xl text-sm font-light leading-7 text-dark-gray/58">To protect our clients and handle business correspondence responsibly, registered companies provide the following:</p>
              <ul className="border-t border-navy/15 text-sm text-navy">
                {[
                  'Certificate of Incorporation or Registration',
                  'Company registration documents',
                  'Valid ID or passport for at least two directors',
                  'Company or business contact details',
                  'Details of the authorised person managing the account',
                ].map((item, index) => (
                  <li key={item} className="flex gap-5 border-b border-navy/15 py-5">
                    <span className="font-heading text-lg text-gold">0{index + 1}</span>
                    <span className="pt-1 font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 max-w-xl text-xs leading-6 text-dark-gray/45">Sole proprietors and other business structures may have separate requirements depending on the registration documents available. We confirm the exact list before activation.</p>
            </div>
            <div className="bg-navy p-8 text-white sm:p-12">
              <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Payment structure</span>
              <h3 className="font-heading text-3xl font-light sm:text-4xl">Annual or monthly. Both are clear.</h3>
              <div className="mt-10 space-y-8">
                <div className="border-b border-white/12 pb-8">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Annual</h4>
                  <p className="mt-3 text-sm font-light leading-7 text-white/58">Pay for the full 12 months upfront and receive the best available rate. Annual prices are KES 42,000 for Basic, KES 60,000 for Professional and KES 120,000 for Premium. No security deposit is required under these terms.</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Monthly</h4>
                  <p className="mt-3 text-sm font-light leading-7 text-white/58">Pay the monthly subscription plus a two-month security deposit. That means starting totals of KES 12,600 for Basic, KES 18,000 for Professional and KES 36,000 for Premium.</p>
                  <p className="mt-4 text-xs leading-5 text-gold/80">Deposits are held under the membership terms and are separate from the monthly subscription.</p>
                </div>
              </div>
              <div className="mt-10 border-t border-white/12 pt-7">
                <p className="text-sm font-semibold text-white">What happens next?</p>
                <p className="mt-2 text-sm font-light leading-6 text-white/52">Choose a plan, send an enquiry and our team will confirm availability, documents, location and the exact activation date before you pay.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQ />
      <CallToAction />
    </>
  )
}