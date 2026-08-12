import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const PROGRAMS = [
  {
    title: 'Referral Partners',
    desc: 'Earn competitive commissions for every client you introduce to Paper Street. Ideal for accountants, lawyers, and business advisors who serve SMEs.',
  },
  {
    title: 'Integration Partners',
    desc: 'Integrate our business address and virtual office services directly into your own platform, SaaS product, or professional services workflow.',
  },
  {
    title: 'Reseller Partners',
    desc: 'White-label our services under your own brand and offer a complete business presence solution to your client base.',
  },
]

export default function PartnersPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
        eyebrow="Partners"
        title="Grow Together."
        subtitle="Join our partner network and offer clients professional business presence solutions across Kenya."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="mb-14 max-w-2xl">
            <span className="text-gold tracking-[0.3em] text-[10px] font-semibold uppercase block mb-3">Partner Program</span>
            <h2 className="text-2xl font-light font-heading text-navy mb-5">Become a Paper Street Partner</h2>
            <p className="text-dark-gray/65 font-light text-sm leading-relaxed">
              We work with accountants, lawyers, business consultants, and technology providers who serve SMEs in Kenya. Our partner program lets you offer business presence solutions to your clients while earning referral commissions.
            </p>
          </div>

          <div className="divide-y divide-gray-100 mb-16">
            {PROGRAMS.map((p, i) => (
              <div key={i} className="grid sm:grid-cols-3 gap-6 py-8">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-bold text-dark-gray/20 tracking-wider font-heading mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold font-heading text-navy">{p.title}</h3>
                </div>
                <p className="sm:col-span-2 text-sm text-dark-gray/60 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="mailto:partners@paperstreet.africa"
            className="inline-block bg-navy text-white px-10 py-3.5 text-xs uppercase tracking-widest hover:bg-navy-600 transition-colors"
          >
            Contact Our Partnerships Team
          </a>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
