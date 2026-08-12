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
        subtitle="Paper Street virtual office memberships give your business a credible home in Kisumu, with mail handling and workspace access when you need it."
      />
      <FeaturedPackages />
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
                Getting started
              </span>
              <h2 className="text-4xl md:text-5xl font-light font-heading text-navy mb-6">
                Clear requirements from day one.
              </h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                To protect our clients and handle business correspondence responsibly, registered companies provide the following during onboarding:
              </p>
              <ul className="space-y-3 text-sm text-gray-600 font-light">
                <li>Certificate of Incorporation or Registration</li>
                <li>Company registration documents</li>
                <li>Valid ID or passport for at least two directors</li>
                <li>Company or business contact details</li>
                <li>Details of the authorized person managing the account</li>
              </ul>
              <p className="text-xs text-gray-400 mt-8 leading-relaxed">
                Sole proprietors and other business structures may have separate requirements depending on the registration documents available.
              </p>
            </div>
            <div className="bg-navy text-white p-8 md:p-12 rounded-lg">
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
                Payment structure
              </span>
              <h3 className="text-3xl font-light font-heading mb-8">Annual or monthly.</h3>
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-8">
                  <h4 className="text-sm uppercase tracking-widest mb-3">Annual</h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    Pay for the full 12 months upfront and receive the best available rate. No security deposit is required for annual customers under these plan terms.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest mb-3">Monthly</h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    Pay the first month’s subscription plus a two-month security deposit. On Professional, that means KES 6,000 + KES 12,000 = KES 18,000 to start.
                  </p>
                </div>
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
