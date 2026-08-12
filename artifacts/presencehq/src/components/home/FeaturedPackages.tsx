import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'

const PLANS = [
  {
    name: 'Basic',
    annual: 42000,
    monthly: 4200,
    deposit: 8400,
    features: ['Professional business address in Kisumu', 'Mail and document receiving', 'Mail notifications', 'Secure mail storage', 'Mail collection and basic handling', 'Address use on approved business materials', 'Customer support'],
    featured: false,
  },
  {
    name: 'Professional',
    annual: 60000,
    monthly: 6000,
    deposit: 12000,
    features: ['Everything in Basic', 'Coworking and desk access', 'Meeting room access', 'Document scanning', 'Business phone/WhatsApp option', 'Visitor reception', 'Priority mail handling', 'Mail forwarding at applicable charges'],
    featured: true,
  },
  {
    name: 'Premium',
    annual: 120000,
    monthly: 12000,
    deposit: 24000,
    features: ['Everything in Professional', 'Increased coworking and desk access', 'Increased meeting room access', 'Mail forwarding allowance', 'Dedicated business phone/WhatsApp option', 'Client meeting support', 'Document scanning and handling', 'Priority customer support', 'More flexible facility access'],
    featured: false,
  },
]

export function FeaturedPackages() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="bg-navy py-24 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-heading mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-white/60 text-lg font-light max-w-xl">
            Choose the virtual office membership that fits your business needs. Annual customers get the best available rate; monthly customers keep the flexibility they need.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-16">
          <button
            onClick={() => setIsAnnual(false)}
            className={`text-sm tracking-widest uppercase transition-colors ${!isAnnual ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Monthly
          </button>
          <div
            className="w-12 h-6 rounded-full bg-white/10 relative cursor-pointer"
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-white absolute top-1"
              initial={false}
              animate={{ left: isAnnual ? '1.5rem' : '0.25rem' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </div>
          <button
            onClick={() => setIsAnnual(true)}
            className={`text-sm tracking-widest uppercase transition-colors ${isAnnual ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Annual
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full overflow-hidden rounded-lg border border-white/10">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`flex flex-col p-8 lg:p-10 ${i !== PLANS.length - 1 ? 'lg:border-r lg:border-white/10 border-b lg:border-b-0 border-white/10' : ''}`}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-white/50 text-xs tracking-widest uppercase">{plan.name}</h3>
                {plan.featured && (
                  <span className="text-[10px] uppercase tracking-widest text-navy bg-gold px-2 py-1 rounded-sm">Most popular</span>
                )}
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold font-heading text-white">
                  KES {(isAnnual ? plan.annual : plan.monthly).toLocaleString()}
                </span>
                <span className="text-white/40 text-xs ml-2">/ {isAnnual ? 'yr' : 'mo'}</span>
              </div>

              <div className="w-full border-t border-gold mb-6"></div>

              <div className="flex-1 flex flex-col mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="border-b border-white/10 py-3 text-white/60 text-sm font-light">
                    {feature}
                  </div>
                ))}
              </div>

              <p className="text-white/40 text-xs leading-relaxed mb-6">
                {isAnnual ? (
                  <span className="text-white/70">No security deposit for annual plans.</span>
                ) : (
                  <>Monthly security deposit: <span className="text-white/70">KES {plan.deposit.toLocaleString()}</span></>
                )}
              </p>

              <Link
                href="/contact"
                className={`w-full py-4 text-sm text-center uppercase tracking-widest transition-colors block ${
                  plan.featured
                    ? 'bg-gold text-white hover:bg-gold-400'
                    : 'border border-white/30 text-white hover:bg-white hover:text-navy'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
