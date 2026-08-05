import { motion } from 'framer-motion'

const STEPS = [
  { num: '01', title: 'Choose Package', desc: 'Select the exact services that fit your current business needs.' },
  { num: '02', title: 'Submit Documents', desc: 'Provide standard KYC documentation for business verification.' },
  { num: '03', title: 'Verification', desc: 'Fast processing to ensure your account is set up securely.' },
  { num: '04', title: 'Start Using Address', desc: 'Update your website and collateral immediately.' },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-16">
          How It Works
        </span>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col pr-8 ${i !== STEPS.length - 1 ? 'md:border-r md:border-gray-100' : ''} ${i !== 0 ? 'md:pl-8' : ''}`}
            >
              <div className="text-[80px] font-bold font-heading text-gray-100 leading-none mb-2">
                {step.num}
              </div>
              <h3 className="text-gray-900 text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
