'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Starter',
    price: '2,500',
    features: ['Prime Business Address', 'Mail & Package Handling', 'Email Notifications', 'Standard Reception'],
    featured: false
  },
  {
    name: 'Professional',
    price: '5,500',
    features: ['Everything in Starter', '2 Hrs Meeting Room/mo', 'Dedicated Phone Number', 'Mail Forwarding (Weekly)'],
    featured: true
  },
  {
    name: 'Premium',
    price: '9,500',
    features: ['Everything in Pro', '5 Hrs Meeting Room/mo', 'Hot Desk Access (3x/wk)', 'Priority Mail Forwarding'],
    featured: false
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Everything in Premium', 'Dedicated Desks', 'Unlimited Meeting Rooms', 'Dedicated Account Manager'],
    featured: false
  }
]

export function FeaturedPackages() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="bg-[#0F2D52] py-24 text-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-[family-name:var(--font-heading)] mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-white/60 text-lg font-light max-w-xl">
            Choose the package that fits your business needs. Scale up instantly.
          </p>
        </div>

        {/* Toggle */}
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
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`text-sm tracking-widest uppercase transition-colors ${isAnnual ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Annual
          </button>
        </div>

        {/* Table Layout */}
        <div className="flex flex-col xl:flex-row w-full overflow-hidden rounded-lg">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`flex-1 flex flex-col p-8 lg:p-10 ${i !== PLANS.length - 1 ? 'xl:border-r xl:border-white/10 border-b xl:border-b-0 border-white/10' : ''}`}
            >
              <h3 className="text-white/50 text-xs tracking-widest uppercase mb-4">
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold font-[family-name:var(--font-heading)] text-white">
                  {plan.price === 'Custom' ? 'Custom' : (isAnnual ? (parseInt(plan.price.replace(',','')) * 10).toLocaleString() : plan.price)}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-white/40 text-xs ml-2">/ {isAnnual ? 'yr' : 'mo'}</span>
                )}
              </div>

              <div className="w-full border-t border-gold mb-6"></div>

              <div className="flex-1 flex flex-col mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="border-b border-white/10 py-3 text-white/60 text-sm font-light">
                    {feature}
                  </div>
                ))}
              </div>

              <Link 
                href="/contact"
                className={`w-full py-4 text-sm text-center uppercase tracking-widest transition-colors ${
                  plan.featured 
                    ? 'bg-gold text-white hover:bg-gold-400' 
                    : 'border border-white/30 text-white hover:bg-white hover:text-navy'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
