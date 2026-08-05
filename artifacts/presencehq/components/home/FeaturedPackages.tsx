'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

const PACKAGES = [
  {
    name: "Starter",
    description: "For freelancers and early-stage startups needing a credible address.",
    monthlyPrice: 2500,
    features: [
      "Prime Business Address",
      "Mail & Package Handling",
      "Email Notifications for Mail",
      "Access to Coworking (Pay per use)",
      "Standard Reception Services"
    ]
  },
  {
    name: "Professional",
    description: "The complete virtual office for growing businesses and consultants.",
    monthlyPrice: 5500,
    isPopular: true,
    features: [
      "Everything in Starter",
      "2 Hours Meeting Room / month",
      "Dedicated Local Phone Number",
      "Call Answering & Forwarding",
      "Mail Forwarding (Weekly)"
    ]
  },
  {
    name: "Premium",
    description: "For established companies needing regular physical workspace.",
    monthlyPrice: 9500,
    features: [
      "Everything in Professional",
      "5 Hours Meeting Room / month",
      "Hot Desk Access (3x / week)",
      "Company Registration Support",
      "Priority Mail Forwarding (Daily)"
    ]
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams and international expansions.",
    monthlyPrice: null, // Custom
    features: [
      "Everything in Premium",
      "Dedicated Desks / Private Office",
      "Unlimited Meeting Room Access",
      "Custom Call Scripts & Reception",
      "Dedicated Account Manager"
    ]
  }
]

export function FeaturedPackages() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="py-24 bg-light-gray" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          eyebrow="Pricing"
          title="Transparent, Scaleable Pricing"
          subtitle="No hidden fees. No long-term leases. Choose the plan that fits your current needs."
          className="mb-12"
        />

        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-full border border-gray-200 inline-flex items-center relative">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-colors relative z-10",
                !isAnnual ? "text-white" : "text-dark-gray hover:text-navy"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-colors relative z-10 flex items-center gap-2",
                isAnnual ? "text-white" : "text-dark-gray hover:text-navy"
              )}
            >
              Annually <span className={cn("text-[10px] uppercase px-2 py-0.5 rounded-full bg-success/20 text-success", isAnnual && "bg-white/20 text-white")}>2 Mos Free</span>
            </button>
            
            {/* Background pill */}
            <motion.div 
              className="absolute top-1.5 bottom-1.5 w-[50%] bg-navy rounded-full z-0"
              initial={false}
              animate={{
                left: isAnnual ? "50%" : "6px",
                width: isAnnual ? "calc(50% - 6px)" : "calc(50% - 6px)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <div 
              key={i} 
              className={cn(
                "rounded-2xl p-8 flex flex-col border transition-all duration-300 relative",
                pkg.isPopular 
                  ? "bg-navy text-white border-navy shadow-xl scale-105 z-10 lg:-mx-2" 
                  : "bg-white text-dark-gray border-gray-200 hover:border-gold hover:shadow-lg"
              )}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className={cn("text-2xl font-bold mb-2", pkg.isPopular ? "text-white" : "text-navy")}>
                {pkg.name}
              </h3>
              <p className={cn("text-sm mb-6 min-h-[40px]", pkg.isPopular ? "text-white/70" : "text-dark-gray/70")}>
                {pkg.description}
              </p>
              
              <div className="mb-8">
                {pkg.monthlyPrice ? (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold font-[family-name:var(--font-heading)]">
                      {isAnnual ? formatPrice(pkg.monthlyPrice * 10) : formatPrice(pkg.monthlyPrice)}
                    </span>
                    <span className={cn("text-sm mb-1", pkg.isPopular ? "text-white/60" : "text-gray-500")}>
                      / {isAnnual ? 'yr' : 'mo'}
                    </span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold font-[family-name:var(--font-heading)]">
                    Custom
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className={cn("w-5 h-5 shrink-0", pkg.isPopular ? "text-gold" : "text-success")} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="mt-auto">
                <Button 
                  variant={pkg.isPopular ? "gold" : "outline"} 
                  className={cn("w-full", pkg.isPopular ? "" : "border-gray-200 hover:border-navy hover:bg-navy hover:text-white")}
                >
                  {pkg.monthlyPrice ? "Get Started" : "Contact Sales"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
