import { Link } from 'wouter'

const SERVICES = [
  { name: 'Virtual Office', desc: 'A complete professional identity. Premium address, mail handling, and more.' },
  { name: 'Business Address', desc: 'Use our prime locations for your company registration and website.' },
  { name: 'Mail Handling', desc: 'We receive, sort, and securely store your physical mail and packages.' },
  { name: 'Mail Forwarding', desc: 'Digital scanning or physical forwarding of your mail globally.' },
  { name: 'Meeting Rooms', desc: 'Book premium, fully-equipped meeting rooms by the hour.' },
  { name: 'Hot Desk', desc: 'Flexible coworking access when you need to drop in and work.' },
  { name: 'Dedicated Desk', desc: 'Your own permanent desk in a shared space, 24/7 access.' },
  { name: 'Reception Services', desc: 'Professional receptionists to greet your clients.' },
  { name: 'Business Expansion', desc: 'Instantly establish a footprint in new cities.' },
  { name: 'Company Registration', desc: 'End-to-end assistance with legal company formation.' },
]

export function ServicesOverview() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-gray-900 tracking-[0.3em] text-xs font-semibold uppercase whitespace-nowrap">
            Our Services
          </span>
          <div className="border-t border-gray-200 flex-1"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="hidden lg:block lg:w-1/3 pt-4">
            <span className="text-[180px] font-bold text-gray-50 leading-none select-none tracking-tighter font-heading">
              10
            </span>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col">
            {SERVICES.map((service, i) => (
              <Link
                href="/services"
                key={i}
                className="group block border-b border-gray-100 pb-5 mb-5 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                  <span className="text-gray-200 text-xs tracking-widest font-mono">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-gray-900 text-xl font-heading font-medium group-hover:text-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-light flex-1 md:text-right pr-4">
                      {service.desc}
                    </p>
                    <span className="text-gray-300 group-hover:text-gold transition-colors hidden md:block">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
