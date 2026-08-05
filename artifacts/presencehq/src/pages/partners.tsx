import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

export default function PartnersPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
        eyebrow="Partners"
        title="Grow Together."
        subtitle="Join our partner network and offer your clients professional business presence solutions."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Partner Program</span>
          <h2 className="text-4xl font-light font-heading text-navy mb-6">Become a PresenceHQ Partner</h2>
          <p className="text-dark-gray/70 font-light text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            We work with accountants, lawyers, business consultants, and technology providers who serve SMEs in Kenya. Our partner program lets you offer business presence solutions to your clients while earning referral commissions.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Referral Partners', desc: 'Earn commissions for every client you refer to PresenceHQ.' },
              { title: 'Integration Partners', desc: 'Integrate our services into your own platform or product.' },
              { title: 'Reseller Partners', desc: 'White-label our services under your own brand.' },
            ].map((p, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-xl hover:border-gold transition-colors">
                <div className="w-8 h-0.5 bg-gold mb-4 mx-auto"></div>
                <h3 className="text-lg font-bold font-heading text-navy mb-3">{p.title}</h3>
                <p className="text-dark-gray/60 text-sm font-light">{p.desc}</p>
              </div>
            ))}
          </div>
          <a href="mailto:partners@presencehq.com" className="inline-block bg-navy text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-navy-600 transition-colors">
            Contact Our Partnerships Team
          </a>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
