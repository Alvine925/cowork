import { Link } from 'wouter'
import { MapPin, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { FAQ } from '@/components/home/FAQ'
import { CallToAction } from '@/components/home/CallToAction'

interface LocationConfig {
  city: string
  building: string
  street: string
  image: string
  description: string
  reasons: string[]
}

export function GenericLocationPage({ config }: { config: LocationConfig }) {
  return (
    <>
      <PageHero
        image={config.image}
        eyebrow={`${config.city}, Kenya`}
        title={config.building}
        subtitle={config.description}
      >
        <div className="flex gap-4 mt-8">
          <Link href="/contact" className="bg-gold text-white px-8 py-3 text-sm uppercase tracking-wide font-medium hover:bg-gold-400 transition-colors">
            Get This Address
          </Link>
        </div>
      </PageHero>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Why {config.city}?</span>
              <h2 className="text-3xl font-bold font-heading text-navy mb-6">A Prestigious Business District</h2>
              <ul className="space-y-4">
                {config.reasons.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-dark-gray font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-light-gray p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold font-heading text-navy mb-6">Location Details</h3>
              <div className="space-y-5">
                {[
                  { label: 'Building', value: config.building },
                  { label: 'Street', value: config.street },
                  { label: 'City', value: `${config.city}, Kenya` },
                ].map((d, i) => (
                  <div key={i}>
                    <p className="text-xs text-dark-gray/50 font-semibold uppercase tracking-wider mb-1">{d.label}</p>
                    <p className="font-medium text-navy">{d.value}</p>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <p className="flex items-center gap-2 text-sm text-dark-gray/60">
                    <MapPin className="w-4 h-4 text-gold" /> Available for immediate registration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <CallToAction />
    </>
  )
}
