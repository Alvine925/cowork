import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does It Cost to Hire a Meeting Room in Kisumu? | Paper Street',
  description:
    'Transparent price guide for meeting room and boardroom hire in Kisumu. Hourly, half-day, and full-day rates with presentation screens, Wi-Fi, and generator backup.',
  keywords: ['meeting room cost Kisumu', 'hire meeting room price Kisumu', 'boardroom price Kisumu', 'meeting room rental rates Kisumu'],
  openGraph: {
    title: 'How Much Does It Cost to Hire a Meeting Room in Kisumu?',
    description: 'Exact hourly and daily rates for private meeting rooms and boardrooms in Kisumu CBD.',
    url: 'https://paperstreet.co.ke/meeting-room-cost-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/meeting-room-cost-kisumu' },
}

export default function MeetingRoomCostKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Pricing Guide / Kisumu Meeting Rooms</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            How Much Does It Cost to Hire a Meeting Room in Kisumu?
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            A clear breakdown of hourly, half-day, and full-day meeting room hire rates in Kisumu CBD. No mandatory catering surcharges, no hidden equipment rental fees.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/meeting-rooms" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Book a Room Online <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Get Custom Package <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Cost Factors</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">What Determines Meeting Room Pricing in Kisumu</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Meeting room hire in Kisumu generally falls into two models: hotel conference packages (which often require high food and beverage minimums) and dedicated commercial meeting rooms (which charge purely for the time and facility used).
              </p>
              <p>
                Paper Street operates on a transparent time-based booking model. You pay for the exact hours you need, with presentation screens, whiteboard walls, high-speed fibre Wi-Fi, air conditioning, and standby generator backup included in the base rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 / Price List</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Paper Street Kisumu Meeting Rates</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                room: 'Small Meeting Room (2 to 4 Pax)',
                hourly: 'KES 1,500 / hour',
                halfDay: 'KES 5,000 / 4 hours',
                fullDay: 'KES 8,000 / 8 hours',
                inclusions: 'Presentation display monitor, high-speed fibre Wi-Fi, air conditioning, front-desk guest greeting, automatic generator backup.',
              },
              {
                room: 'Executive Boardroom (6 to 12 Pax)',
                hourly: 'KES 2,500 / hour',
                halfDay: 'KES 9,000 / 4 hours',
                fullDay: 'KES 15,000 / 8 hours',
                inclusions: 'Executive boardroom table, widescreen presentation TV, video conferencing camera setup, whiteboard, Wi-Fi, generator backup, reception check-in.',
              },
              {
                room: 'Workshop & Training Room (8 to 20 Pax)',
                hourly: 'Available on request',
                halfDay: 'KES 9,000 / 4 hours',
                fullDay: 'KES 15,000 / 8 hours',
                inclusions: 'Configurable seating layout (classroom, U-shape, or pod), dual presentation screens, whiteboard, multi-user Wi-Fi, generator backup.',
              },
            ].map((item, i) => (
              <div key={i} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="text-lg font-heading font-medium text-navy">{item.room}</h3>
                  <div className="mt-3 space-y-1 text-xs font-mono text-navy/70">
                    <p><strong className="text-navy font-semibold">Hourly:</strong> {item.hourly}</p>
                    <p><strong className="text-navy font-semibold">Half Day:</strong> {item.halfDay}</p>
                    <p><strong className="text-navy font-semibold">Full Day:</strong> {item.fullDay}</p>
                  </div>
                </div>
                <div className="md:col-span-8 text-sm text-navy/80 font-light leading-relaxed">
                  <p><strong className="font-medium text-navy">Included Equipment & Services:</strong> {item.inclusions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street / Kisumu CBD Commercial Center</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">
              Reserve your meeting room in Kisumu CBD today.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Hourly bookings starting from KES 1,500. Professional presentation equipment and power backup included.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/meeting-rooms" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Book a Room <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Contact Office <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
