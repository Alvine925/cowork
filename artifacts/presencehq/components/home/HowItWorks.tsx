'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

const STEPS = [
  {
    num: "01",
    title: "Choose Your Package",
    description: "Select the virtual office or business presence package that fits your needs."
  },
  {
    num: "02",
    title: "Submit Documents",
    description: "Provide your ID and company registration documents via our secure portal."
  },
  {
    num: "03",
    title: "Verification",
    description: "Our compliance team reviews your documents (usually within 2 hours)."
  },
  {
    num: "04",
    title: "Start Operating",
    description: "Your new professional address is live. Update your website and start receiving mail."
  }
]

export function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          eyebrow="Process"
          title="Active in 24 Hours"
          subtitle="Getting your professional business presence set up is fast, secure, and entirely digital."
          className="mb-20"
        />

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-gray-100 z-0">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          {STEPS.map((step, index) => (
            <motion.div key={index} variants={item} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gold flex items-center justify-center text-xl font-bold text-navy shadow-lg shadow-gold/20 mb-6">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
              <p className="text-dark-gray/70 text-sm leading-relaxed max-w-[250px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
