import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Meeting Rooms for Hire in Kisumu: Prices & Options | Paper Street',
  description:
    'Detailed guide to meeting rooms for hire in Kisumu CBD. Hourly and daily rates for 2-person interview rooms, executive boardrooms, and training suites with presentation screens.',
  keywords: ['meeting rooms for hire in Kisumu', 'meeting room hire Kisumu', 'boardroom hire Kisumu', 'meeting room rental Kisumu'],
  openGraph: {
    title: 'Meeting Rooms for Hire in Kisumu: Prices and Options',
    description: 'Compare private meeting rooms and executive boardrooms in Kisumu CBD with hourly pricing, AV screens, and generator backup.',
    url: 'https://paperstreet.co.ke/best-meeting-rooms-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/best-meeting-rooms-kisumu' },
}

export default function BestMeetingRoomsKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Kisumu Meeting Facilities / 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Meeting Rooms for Hire in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            Professional, fully equipped meeting rooms in Kisumu Central Business District. Hourly booking, presentation screens, video conferencing hardware, enterprise Wi-Fi, and automatic generator backup on Oginga Odinga Street.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/services/meeting-rooms" className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold hover:text-navy transition-colors">
              Book a Meeting Room <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-navy-600 transition-colors">
              Check Availability <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Why It Matters</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Why Meeting Infrastructure in Kisumu Matters</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Holding client presentations, confidential interviews, or partner negotiations in hotel lobbies and public restaurants introduces unnecessary noise, privacy risks, and technical glitches.
              </p>
              <p>
                Paper Street meeting rooms are purpose-built for business privacy. Sound-insulated walls protect sensitive legal and financial discussions, high-definition presentation monitors connect seamlessly to your laptop via HDMI or wireless screen share, and our reception team welcomes your arriving delegates at the building entrance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 / Room Options</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Meeting Room Configurations & Rates</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                name: 'Small Meeting Room',
                capacity: '2 to 4 people',
                price: 'KES 1,500 / hour',
                halfDay: 'KES 5,000 / 4 hours',
                fullDay: 'KES 8,000 / full day',
                desc: 'Enclosed private meeting room equipped with a presentation monitor, high-speed fibre Wi-Fi, air conditioning, and power sockets. Ideal for one-on-one interviews, legal client briefings, financial consultations, and private Zoom calls.',
              },
              {
                no: '02',
                name: 'Executive Boardroom',
                capacity: '6 to 12 people',
                price: 'KES 2,500 / hour',
                halfDay: 'KES 9,000 / 4 hours',
                fullDay: 'KES 15,000 / full day',
                desc: 'Executive conference table with comfortable leather seating, large widescreen presentation display, whiteboard, video conferencing camera setup, and automatic generator backup. Perfect for board meetings, management reviews, and investor pitches.',
              },
              {
                no: '03',
                name: 'Training & Workshop Venue',
                capacity: '8 to 20 people',
                price: 'Custom quote',
                halfDay: 'KES 9,000 / 4 hours',
                fullDay: 'KES 15,000 / full day',
                desc: 'Flexible layout room configurable in classroom, U-shape, or workshop pod formats. Dual presentation displays, high-density Wi-Fi for all attendees, and reception registration support for corporate seminars and NGO capacity-building.',
              },
            ].map((room) => (
              <div key={room.no} className="py-10 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{room.no}</div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-heading font-medium text-navy">{room.name}</h3>
                  <p className="text-xs font-mono text-navy font-semibold uppercase tracking-wider mt-1">{room.capacity}</p>
                  <div className="mt-4 space-y-1 text-xs font-mono text-navy/70">
                    <p><strong className="text-navy font-semibold">Hourly:</strong> {room.price}</p>
                    <p><strong className="text-navy font-semibold">Half Day:</strong> {room.halfDay}</p>
                    <p><strong className="text-navy font-semibold">Full Day:</strong> {room.fullDay}</p>
                  </div>
                </div>
                <div className="md:col-span-7 text-sm text-navy/80 font-light leading-relaxed">
                  <p>{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">02 / Questions</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                q: 'How much does it cost to hire a meeting room in Kisumu?',
                a: 'Our Small Meeting Room (2 to 4 people) starts from KES 1,500 per hour (from KES 5,000 for half-day, from KES 8,000 for full-day). Our Executive Boardroom (6 to 12 people) starts from KES 2,500 per hour (from KES 9,000 for half-day, from KES 15,000 for full-day).',
              },
              {
                q: 'Where can I hire a meeting room in Kisumu?',
                a: 'Paper Street is located at the Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu town, within walking distance of major banks, law courts, and county offices.',
              },
              {
                q: 'Can I book a meeting room by the hour?',
                a: 'Yes. You can book for a single hour, multiple hours, half-days, or full consecutive days with no mandatory full-day commitment.',
              },
              {
                q: 'Do meeting rooms have Wi-Fi and power backup?',
                a: 'Yes. All rooms include high-speed dual-carrier fibre Wi-Fi and automatic standby generator backup to ensure zero downtime during power blackouts.',
              },
              {
                q: 'Can I use a TV screen or presentation display?',
                a: 'Yes. All meeting suites and boardrooms are equipped with large high-definition presentation screens supporting direct HDMI plug-in and wireless laptop screen mirroring.',
              },
              {
                q: 'Can I book a meeting room for a full day?',
                a: 'Yes. We offer discounted full-day packages (KES 8,000 for small rooms, KES 15,000 for boardrooms and training spaces) for full-day strategy sessions and NGO project workshops.',
              },
              {
                q: 'How many people can the meeting room accommodate?',
                a: 'We have room options ranging from 2 to 4 person private interview rooms, 6 to 12 person executive boardrooms, and training workshop layouts seating up to 20 people.',
              },
              {
                q: 'Can non-members use the meeting rooms?',
                a: 'Yes. Our meeting rooms and boardrooms are open to both coworking members and external organizations or visiting professionals.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="py-6 grid md:grid-cols-12 gap-4">
                <div className="md:col-span-5 font-heading text-sm font-medium text-navy">{faq.q}</div>
                <div className="md:col-span-7 text-xs md:text-sm text-navy/70 font-light leading-relaxed">{faq.a}</div>
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
              Book a meeting room in Kisumu CBD from KES 1,500/hour.
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Presentation displays, fast internet, generator backup, and professional reception included.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/meeting-rooms" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Book a Room <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Contact Us <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
