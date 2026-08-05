import { motion } from 'framer-motion'

const REASONS = [
  'Professional Address',
  'Secure Mail Handling',
  'Prime Locations',
  'Flexible Packages',
  'Affordable Pricing',
  'Meeting Rooms',
  'Reception Support',
  'Fast 24hr Setup',
  'Scalable Solutions',
  'Business Growth Focus',
]

export function WhyChooseUs() {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&q=80"
          alt="Professional workspace"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-24">
        <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-8">
          Why Us
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-light font-heading text-gray-900 mb-12 leading-tight max-w-lg"
        >
          Everything your business needs to look legitimate.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-t border-gray-200 py-3 text-gray-700 text-sm font-light"
            >
              {reason}
            </motion.div>
          ))}
          <div className="border-t border-gray-200 block md:hidden"></div>
        </div>
      </div>
    </section>
  )
}
