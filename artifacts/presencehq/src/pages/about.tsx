import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&q=80"
        eyebrow="Our Story"
        title="Democratizing Premium Business Infrastructure."
        subtitle="We believe that ambition should not be limited by the cost of physical office space."
      />

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format"
                alt="Founders"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-gold tracking-[0.3em] text-[10px] font-semibold uppercase">Why We Started</span>
              <h2 className="text-2xl font-semibold font-heading text-navy leading-snug">Why We Started PresenceHQ</h2>
              <div className="text-dark-gray/70 space-y-4 font-light leading-relaxed text-sm">
                <p>
                  Five years ago, our founders experienced a common frustration: they lost a major enterprise contract because their consulting firm was registered to a residential address.
                </p>
                <p>
                  The enterprise client's procurement department flagged it as a vendor risk. The solution was to rent a commercial office, but signing a two-year lease for space they did not need just to get an address felt absurd.
                </p>
                <p>
                  PresenceHQ was born from this exact problem. We realized thousands of consultants, freelancers, startups, and expanding international companies face the same barrier: the prohibitive cost of professional credibility.
                </p>
                <p>
                  Today, we provide over 500 businesses with the premium addresses, reception services, and meeting spaces they need to operate at the highest level, without the overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto text-center">
            {[
              { num: '500+', label: 'Businesses Served' },
              { num: '5', label: 'Cities' },
              { num: '10+', label: 'Memberships' },
              { num: '98%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold font-heading text-navy mb-1.5">{stat.num}</div>
                <div className="text-[10px] uppercase tracking-widest text-dark-gray/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="mb-14">
            <span className="text-gold tracking-[0.3em] text-[10px] font-semibold uppercase block mb-3">What We Stand For</span>
            <h2 className="text-2xl font-light font-heading text-navy">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Uncompromising Professionalism',
                body: 'Our front desk is your front desk. We train our staff to represent your business with the utmost discretion and polish.',
              },
              {
                title: 'Radical Flexibility',
                body: 'Business is unpredictable. We do not believe in locking our clients into rigid, long-term leases that stifle their agility.',
              },
              {
                title: 'Frictionless Expansion',
                body: 'We are building a network that allows you to establish a presence in a new city with a single conversation.',
              },
            ].map((value, i) => (
              <div key={i}>
                <div className="w-6 h-px bg-gold mb-5"></div>
                <h3 className="text-base font-semibold font-heading text-navy mb-3">{value.title}</h3>
                <p className="text-dark-gray/65 font-light leading-relaxed text-sm">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
