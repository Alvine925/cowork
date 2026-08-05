import { motion } from 'framer-motion'

const PAIN_POINTS = [
  'Working from home looks unprofessional to high-value clients.',
  'Lack of a prime address hurts your credibility and brand image.',
  'Missing out on client trust because you don\'t have a physical presence.',
  'Expensive commercial rent and long-term leases drain your capital.',
  'Inability to expand to new cities without massive upfront investment.',
  'Missing important physical mail and legal documents.',
  'No suitable, impressive location to host client meetings or pitches.',
]

export function Problem() {
  return (
    <section className="bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-[45%]">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-8">
              The Challenge
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-light font-heading leading-snug"
            >
              Running a business without a professional address costs you clients.
            </motion.h2>
          </div>

          <div className="w-full lg:w-[55%] lg:pl-16 flex flex-col justify-center">
            {PAIN_POINTS.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-t border-white/10"
              >
                <div className="py-4 text-white/60 text-sm font-light">{point}</div>
              </motion.div>
            ))}
            <div className="border-t border-white/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
