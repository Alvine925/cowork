import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&q=80"
        eyebrow="Our Story"
        title="Democratizing Premium Business Infrastructure."
        subtitle="We believe that ambition shouldn't be limited by the cost of physical office space."
      />

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format"
                alt="Founders"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Why We Started</span>
              <h2 className="text-3xl font-bold font-heading text-navy">Why We Started PresenceHQ</h2>
              <div className="text-dark-gray/80 space-y-4 font-light leading-relaxed">
                <p>
                  Five years ago, our founders experienced a common frustration: they lost a major enterprise contract because their consulting firm was registered to a residential address.
                </p>
                <p>
                  The enterprise client's procurement department flagged the residential address as a "vendor risk." The solution was to rent a commercial office, but signing a two-year lease for space they didn't need just to get an address felt absurd.
                </p>
                <p>
                  PresenceHQ was born from this exact problem. We realized thousands of consultants, freelancers, startups, and expanding international companies face the same barrier: the prohibitive cost of professional credibility.
                </p>
                <p>
                  Today, we provide over 500 businesses with the premium addresses, reception services, and meeting spaces they need to look and operate like Fortune 500 companies—without the overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { num: '500+', label: 'Businesses Served' },
              { num: '5', label: 'Cities' },
              { num: '10+', label: 'Services' },
              { num: '98%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold font-heading text-navy mb-2">{stat.num}</div>
                <div className="text-xs uppercase tracking-widest text-dark-gray/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">What We Stand For</span>
            <h2 className="text-4xl font-light font-heading text-navy">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Uncompromising Professionalism',
                body: 'Our front desk is your front desk. We train our staff to represent your business with the utmost discretion and polish.',
              },
              {
                title: 'Radical Flexibility',
                body: "Business is unpredictable. We don't believe in locking our clients into rigid, long-term leases that stifle their agility.",
              },
              {
                title: 'Frictionless Expansion',
                body: 'We are building a network that allows you to establish a presence in a new city with a single click.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 hover:border-gold hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-0.5 bg-gold mb-6"></div>
                <h3 className="text-xl font-bold font-heading text-navy mb-4">{value.title}</h3>
                <p className="text-dark-gray/70 font-light leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
