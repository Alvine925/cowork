'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Home, MapPin, XOctagon, Receipt, Map, MailX, Users } from 'lucide-react'

const PAIN_POINTS = [
  {
    icon: Home,
    title: "Working from home lacks credibility",
    description: "Using a residential address on your business cards and website signals you are a small or informal operation."
  },
  {
    icon: MapPin,
    title: "No professional address",
    description: "Without a prime commercial location, winning corporate contracts and high-value clients becomes significantly harder."
  },
  {
    icon: XOctagon,
    title: "Clients don't trust PO Boxes",
    description: "Banks, government agencies, and serious partners often reject PO Boxes for official registration and correspondence."
  },
  {
    icon: Receipt,
    title: "Traditional office rent is too expensive",
    description: "Signing a 2-year lease for an office you barely use drains capital that should go into growing your business."
  },
  {
    icon: Map,
    title: "Hard to expand to new cities",
    description: "Testing new markets like Mombasa or Kisumu is risky when it requires setting up physical infrastructure first."
  },
  {
    icon: MailX,
    title: "Missing important mail",
    description: "Important documents, legal notices, and packages get lost or delayed without a dedicated reception team."
  },
  {
    icon: Users,
    title: "No place for professional meetings",
    description: "Hosting client pitches in noisy coffee shops undermines your authority and breaches confidentiality."
  }
]

export function Problem() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-24 bg-navy text-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          eyebrow="The Challenge"
          title="Running a Business Without a Professional Address?"
          subtitle="The hidden costs of working from home or coffee shops are costing you deals, credibility, and growth."
          dark
          className="mb-16"
        />

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {PAIN_POINTS.map((point, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-navy-800/50 border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:bg-navy-700/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <point.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-lg">{point.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
          
          <motion.div 
            variants={item}
            className="bg-gold border border-gold-400 rounded-xl p-6 flex flex-col gap-4 text-navy justify-center items-center text-center"
          >
            <h3 className="font-bold text-xl">Sound familiar?</h3>
            <p className="text-navy/80 text-sm font-medium">
              It doesn't have to be this way. See how PresenceHQ solves this.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
