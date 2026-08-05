import { Link } from 'wouter'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const LOCATIONS = [
  {
    name: 'Nairobi',
    slug: 'nairobi',
    image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=900&auto=format&q=80',
    area: 'Westlands Business Park',
    tagline: 'The financial and commercial capital of East Africa.',
  },
  {
    name: 'Mombasa',
    slug: 'mombasa',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&q=80',
    area: 'Nyali Executive Tower',
    tagline: 'Kenya\'s gateway to regional and international trade.',
  },
  {
    name: 'Kisumu',
    slug: 'kisumu',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=900&auto=format&q=80',
    area: 'Milimani Corporate Center',
    tagline: 'The rising hub of Lake Victoria commerce and innovation.',
  },
  {
    name: 'Nakuru',
    slug: 'nakuru',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&q=80',
    area: 'Central Business Plaza',
    tagline: 'One of Kenya\'s fastest-growing cities and economic centres.',
  },
  {
    name: 'Eldoret',
    slug: 'eldoret',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&auto=format&q=80',
    area: 'Zion Mall Business Hub',
    tagline: 'The agricultural and logistics capital of the North Rift.',
  },
]

export default function LocationsPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&auto=format&q=80"
        eyebrow="Locations"
        title="Prime Locations Across Kenya."
        subtitle="Establish your presence in five of Kenya's most important commercial cities."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="divide-y divide-gray-100">
            {LOCATIONS.map((loc, i) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`}>
                <div className="group grid sm:grid-cols-3 gap-8 py-8 cursor-pointer items-center">
                  {/* Image */}
                  <div className="overflow-hidden aspect-video sm:aspect-[4/3] relative">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Text */}
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-dark-gray/20 tracking-wider font-heading">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-gold font-semibold uppercase tracking-widest">{loc.area}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-navy group-hover:text-gold transition-colors duration-200">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-dark-gray/60 font-light leading-relaxed">{loc.tagline}</p>
                    <span className="text-[11px] font-semibold text-navy/50 uppercase tracking-wider mt-2 group-hover:text-gold transition-colors">
                      View location details
                    </span>
                  </div>
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
