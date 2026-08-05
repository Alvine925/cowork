import { Link } from 'wouter'
import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

interface ServiceConfig {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  features: string[]
  description: string
}

export function GenericServicePage({ config }: { config: ServiceConfig }) {
  return (
    <>
      <PageHero
        image={config.image}
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
      >
        <div className="flex gap-4 mt-8">
          <Link href="/contact" className="bg-gold text-white px-8 py-3 text-sm uppercase tracking-wide font-medium hover:bg-gold-400 transition-colors">
            Get Started
          </Link>
          <Link href="/pricing" className="border border-white/60 text-white px-8 py-3 text-sm uppercase tracking-wide font-medium hover:bg-white/10 transition-colors">
            View Pricing
          </Link>
        </div>
      </PageHero>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Overview</span>
              <h2 className="text-3xl font-light font-heading text-navy mb-6">How It Works</h2>
              <p className="text-dark-gray/70 font-light leading-relaxed text-lg">{config.description}</p>
            </div>
            <div className="grid gap-4">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-light-gray rounded-xl border border-gray-100 hover:border-gold transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <p className="font-medium text-navy text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
