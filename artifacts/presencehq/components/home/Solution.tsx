'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const BENEFITS = [
  "Instant credibility with a prime business address",
  "Dedicated reception team to handle your mail",
  "Professional meeting rooms on demand",
  "Zero setup fees, no long-term leases",
  "Expand to new cities in 24 hours",
  "Keep your home address private and secure"
]

export function Solution() {
  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format"
              alt="Professional reception desk at PresenceHQ"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 text-success border border-success/30 backdrop-blur-md font-semibold text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-success"></span> Active Presence
              </div>
              <h3 className="text-2xl font-bold mb-2">Look Professional Instantly</h3>
              <p className="text-white/80 text-sm">Our reception team greets your clients and handles your correspondence seamlessly.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <SectionHeader 
              eyebrow="The Solution"
              title="Work from Anywhere. Look like you're in the Corner Office."
              subtitle="PresenceHQ gives you the infrastructure of a corporate headquarters for a fraction of the cost. We handle the physical presence so you can focus on building your business."
              align="left"
            />

            <div className="flex flex-col gap-4 mt-2">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-gold shrink-0" />
                  <span className="text-dark-gray font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mt-4 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative">
                    <Image 
                      src={`https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80&auto=format&fit=crop`}
                      alt="User avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-navy">Join 500+ Founders</p>
                <p className="text-sm text-dark-gray/70">Who upgraded their business presence.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
