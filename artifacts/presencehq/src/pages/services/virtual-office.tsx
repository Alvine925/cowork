import { Link } from 'wouter'
import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const FEATURES = [
  'Commercial Business Address in a prime location',
  'Use of address for company registration and bank accounts',
  'Professional mail handling and secure storage',
  'Email notifications when mail or packages arrive',
  'Dedicated local phone number (Optional)',
  'Live receptionists to answer calls in your company name',
  'Access to meeting rooms at member rates',
  'Access to hot desks and coworking areas',
  'Mail forwarding options (digital or physical)',
]

export default function VirtualOfficePage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Premium Package"
        title="The Complete Virtual Office Solution."
        subtitle="Everything you need to operate a professional, credible business — without signing a commercial lease."
      >
        <div className="flex gap-4 mt-8">
          <Link href="/contact" className="bg-gold text-white px-8 py-3 text-sm uppercase tracking-wide font-medium hover:bg-gold-400 transition-colors">
            Get Started Today
          </Link>
          <Link href="/pricing" className="border border-white/60 text-white px-8 py-3 text-sm uppercase tracking-wide font-medium hover:bg-white/10 transition-colors">
            View Pricing
          </Link>
        </div>
      </PageHero>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Features</span>
            <h2 className="text-4xl font-light font-heading text-navy">What's Included in the Virtual Office?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-light-gray rounded-xl border border-gray-100 hover:border-gold hover:shadow-sm transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                <p className="font-medium text-navy text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Virtual Office */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-6">The ROI</span>
          <h2 className="text-4xl font-light font-heading mb-6">
            The cost of NOT having a professional address
          </h2>
          <p className="text-white/70 font-light text-lg leading-relaxed mb-12">
            Losing one enterprise client to a residential address check can cost you more than a year of Virtual Office fees. Our clients routinely close deals they couldn't access before.
          </p>
          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              { num: '< 24hrs', label: 'Setup Time' },
              { num: 'KES 2,500', label: 'Starting From / Month' },
              { num: '0', label: 'Leases to Sign' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold font-heading text-gold mb-2">{s.num}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
