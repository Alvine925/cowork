import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CallToAction } from '@/components/home/CallToAction'
import { FAQ } from '@/components/home/FAQ'

export const metadata: Metadata = {
  title: 'Business Address in Nairobi | Virtual Office',
  description: 'Establish your business at Westlands Business Park, Nairobi. Premium business address, mail handling, and meeting rooms.',
}

export default function NairobiLocationPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-sm mb-6">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Nairobi, Kenya</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 font-[family-name:var(--font-heading)]">
                Westlands Business Park
              </h1>
              <p className="text-lg text-white/80 max-w-xl mb-8">
                Position your company in East Africa's most prestigious corporate district. A Westlands address signals stability, success, and ambition to your clients and partners.
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&auto=format"
                alt="Nairobi Skyline"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6 font-[family-name:var(--font-heading)]">Why Westlands?</h2>
              <p className="text-dark-gray/80 mb-6 leading-relaxed">
                Westlands is the corporate heart of Nairobi. Home to multinational headquarters, top-tier law firms, and major financial institutions, having an address here places you among the elite.
              </p>
              <ul className="space-y-4">
                {["Recognized globally as a premium business district", "Immediate credibility with banks and government", "Close proximity to major corporate clients", "Central and accessible for physical meetings"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-dark-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-light-gray p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-navy mb-6">Location Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-dark-gray/60 font-semibold uppercase tracking-wider mb-1">Building</p>
                  <p className="font-medium text-navy">Westlands Business Park, Tower A, 4th Floor</p>
                </div>
                <div>
                  <p className="text-sm text-dark-gray/60 font-semibold uppercase tracking-wider mb-1">Street</p>
                  <p className="font-medium text-navy">Waiyaki Way</p>
                </div>
                <div>
                  <p className="text-sm text-dark-gray/60 font-semibold uppercase tracking-wider mb-1">City</p>
                  <p className="font-medium text-navy">Nairobi, Kenya</p>
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
