'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'
import { MapPin, Check, ArrowRight, Clock, Sparkles } from 'lucide-react'
import { LocationWaitlistForm } from '@/components/locations/LocationWaitlistForm'

const ACTIVE_LOCATION = {
  name: 'Kisumu',
  slug: 'kisumu',
  status: 'Active & Operating',
  area: 'Kisumu Central Business District',
  address: 'CBD, Kisumu, Kenya',
  image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&q=85',
  tagline: 'Our flagship commercial workspace and regional business center in Western Kenya.',
  description:
    'Our fully active Kisumu hub provides an on-demand meeting room, hot desks, dedicated desks, and regional business address services for businesses operating across the Lake Victoria economic basin.',
  amenities: [
    'Fast Internet with Redundant Links',
    'Private 4K Presentation Meeting Room',
    'Acoustic Phone Booths',
    '100% Generator Power Backup',
    'Ergonomic Workstations & Power Outlets',
    'Front Desk Reception & Mail Logging',
  ],
}

const UPCOMING_LOCATIONS = [
  {
    name: 'Nairobi',
    slug: 'nairobi',
    status: 'Coming Soon',
    area: 'Westlands / CBD',
    image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=900&auto=format&q=80',
    tagline: 'Expansion hub planned for the capital financial district.',
  },
  {
    name: 'Mombasa',
    slug: 'mombasa',
    status: 'Coming Soon',
    area: 'Nyali Coastal District',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&q=80',
    tagline: 'Coastal branch hub planned for regional and maritime commerce.',
  },
  {
    name: 'Nakuru',
    slug: 'nakuru',
    status: 'Coming Soon',
    area: 'Central Commercial Center',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&q=80',
    tagline: 'Rift Valley expansion hub in development.',
  },
  {
    name: 'Eldoret',
    slug: 'eldoret',
    status: 'Coming Soon',
    area: 'Zion Mall Commercial Corridor',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&auto=format&q=80',
    tagline: 'North Rift commercial expansion hub planned.',
  },
]

export default function LocationsPage() {
  const [selectedWaitlistCity, setSelectedWaitlistCity] = useState<string>('Nairobi')

  const handleCitySelect = (cityName: string) => {
    setSelectedWaitlistCity(cityName)
    const formEl = document.getElementById('expansion-waitlist-section')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
        eyebrow="Locations"
        title="Kisumu is open. More cities are on the waitlist."
        subtitle="Virtual office, business address, and day pass at the Kisumu CBD hub. Meeting rooms and dedicated desks in the same building. Nairobi, Mombasa, Nakuru, and Eldoret coming soon."
      />

      {/* Flagship Active Location Showcase */}
      <section className="py-24 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-700/20 text-emerald-800 font-mono text-[10px] uppercase tracking-wider font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              Active Operating Hub
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-navy">
              Kisumu Flagship Workspace
            </h2>
            <p className="mt-3 text-sm text-navy/65 max-w-2xl leading-relaxed">
              Located in Kisumu CBD. Open Monday to Saturday for virtual office and business address clients, day passes, meeting rooms, and dedicated desks.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-7 relative aspect-16/10 overflow-hidden bg-navy/5">
              <img
                src={ACTIVE_LOCATION.image}
                alt={ACTIVE_LOCATION.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-navy/90 backdrop-blur-xs text-white p-4 max-w-xs">
                <p className="font-mono text-[10px] uppercase text-navy font-bold">Location Address</p>
                <p className="text-xs text-white/90 mt-1">{ACTIVE_LOCATION.address}</p>
              </div>
            </div>

            {/* Content & Amenities */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-heading text-2xl text-navy font-normal">
                {ACTIVE_LOCATION.area}
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                {ACTIVE_LOCATION.description}
              </p>

              <div className="pt-2">
                <p className="font-mono text-[10px] uppercase tracking-wider text-navy/50 font-bold mb-3">
                  Available On-Site Amenities:
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {ACTIVE_LOCATION.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-navy/80">
                      <Check className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/portal/client/bookings"
                  className="bg-navy text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-navy/90 transition-colors"
                >
                  Book Space in Kisumu &rarr;
                </Link>
                <Link
                  href="/locations/kisumu"
                  className="border border-navy/20 text-navy px-6 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-navy/5 transition-colors"
                >
                  Explore Kisumu Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Hubs (Coming Soon) */}
      <section className="py-24 bg-[#FBF8F0] border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 text-navy/70 font-mono text-[10px] uppercase tracking-wider font-semibold mb-3">
              <Clock size={12} className="text-navy" /> Future Expansion Hubs
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-navy">
              Expansion Locations · Coming Soon
            </h2>
            <p className="mt-3 text-xs text-navy/60 leading-relaxed">
              We are actively preparing additional workspace hubs across Kenya. Join our VIP waitlist below for 20% launch discounts and priority suite allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UPCOMING_LOCATIONS.map((loc) => (
              <div
                key={loc.slug}
                className="border border-navy/10 bg-white p-6 flex flex-col justify-between hover:border-navy/30 transition-all shadow-xs"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-navy/5 mb-4">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-navy/90 text-gold font-mono text-[8px] font-bold uppercase px-2 py-0.5 tracking-wider">
                      Coming Soon
                    </div>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 block">
                    {loc.area}
                  </span>
                  <h3 className="font-heading text-2xl text-navy font-light mt-1">{loc.name}</h3>
                  <p className="text-xs text-navy/60 mt-2 leading-relaxed">{loc.tagline}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy/10 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleCitySelect(loc.name)}
                    className="w-full text-center bg-navy text-white py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-navy/90 transition-colors cursor-pointer"
                  >
                    Join {loc.name} Waitlist &rarr;
                  </button>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-center text-[11px] font-medium text-navy/60 hover:text-navy hover:underline pt-1"
                  >
                    View {loc.name} Overview &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded VIP Waitlist Form Section */}
      <section id="expansion-waitlist-section" className="py-24 bg-white scroll-mt-10">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-navy/70 font-semibold block mb-2">
              Expansion Network
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-heading text-navy">
              Kenya Expansion Priority List
            </h2>
            <p className="text-xs md:text-sm text-navy/60 max-w-xl mx-auto mt-2 leading-relaxed">
              Reserve your priority status for any of our upcoming commercial hubs in Nairobi, Mombasa, Nakuru, or Eldoret.
            </p>
          </div>

          <LocationWaitlistForm
            defaultLocation={selectedWaitlistCity}
            headline={`VIP Waitlist Registration &middot; ${selectedWaitlistCity}`}
            subheadline="Submit your organization details below. We save your profile to Supabase and send your official VIP priority confirmation email."
          />
        </div>
      </section>

      <CallToAction />
    </>
  )
}
