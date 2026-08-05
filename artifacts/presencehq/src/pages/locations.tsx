import { Link } from 'wouter'
import { MapPin, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const LOCATIONS = [
  { name: 'Nairobi', slug: 'nairobi', image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&auto=format', desc: 'Westlands Business Park' },
  { name: 'Mombasa', slug: 'mombasa', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format', desc: 'Nyali Executive Tower' },
  { name: 'Kisumu', slug: 'kisumu', image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&auto=format', desc: 'Milimani Corporate Center' },
  { name: 'Nakuru', slug: 'nakuru', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format', desc: 'Central Business Plaza' },
  { name: 'Eldoret', slug: 'eldoret', image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format', desc: 'Zion Mall Hub' },
]

export default function LocationsPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&auto=format&q=80"
        eyebrow="Locations"
        title="Prime Locations Across Kenya."
        subtitle="Plant your flag in the most prestigious business districts without the overhead of physical office space."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gold hover:shadow-xl transition-all duration-300 block"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold font-heading">{loc.name}</h3>
                    <p className="flex items-center gap-1 text-white/80 text-sm mt-1">
                      <MapPin className="w-4 h-4 text-gold" /> {loc.desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between bg-white group-hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-navy text-sm">View Location Details</span>
                  <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
