import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Places to Hold a Business Meeting in Kisumu | Paper Street',
  description:
    'A complete guide to the best places to hold a business meeting in Kisumu — from dedicated meeting rooms and boardrooms to hotel lobbies and restaurants. What each option actually delivers.',
  keywords: ['business meeting venue Kisumu', 'where to hold meeting Kisumu', 'meeting venue Kisumu CBD', 'best meeting place Kisumu'],
  openGraph: {
    title: 'Best Places to Hold a Business Meeting in Kisumu',
    description: 'An honest comparison of business meeting venues in Kisumu — dedicated meeting rooms, hotels, and public spaces. What each option provides.',
    url: 'https://paperstreet.co.ke/best-places-business-meeting-kisumu',
  },
  alternates: { canonical: 'https://paperstreet.co.ke/best-places-business-meeting-kisumu' },
}

export default function BestPlacesBusinessMeetingKisumuPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1a1a1a] min-h-screen">
      <section className="pt-36 pb-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-navy" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-navy font-semibold">Business Meeting Venues · Kisumu CBD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-navy tracking-tight leading-[1.1] mb-8 max-w-4xl">
            Best Places to Hold a Business Meeting in Kisumu.
          </h1>
          <p className="text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mb-10">
            From dedicated private meeting rooms to hotel lobbies — an honest assessment of every business meeting venue option in Kisumu, evaluated on privacy, professionalism, reliability, and cost.
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
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">Context</span>
              <h2 className="text-2xl font-heading font-light text-navy leading-snug">Why Meeting Venue Choice Matters</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-sm md:text-base text-navy/80 font-light leading-relaxed">
              <p>
                Where you hold a business meeting communicates something about your organisation before a word is spoken. Meeting a supplier representative in a noisy restaurant sends one signal. Meeting them in a private, well-equipped boardroom in a commercial building sends another. In markets where relationships and professional credibility are material business inputs, venue choice is a business decision — not just a logistics one.
              </p>
              <p>
                Beyond presentation, the practical requirements of professional meetings — privacy for confidential discussions, reliable internet for remote participants, stable power so your presentation doesn't cut off mid-slide — determine whether the meeting achieves its objective or merely happens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue comparison */}
      <section className="py-20 border-b border-black/10">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy font-semibold block mb-2">01 — Venue Options</span>
            <h2 className="text-2xl md:text-3xl font-heading font-light text-navy">Business Meeting Venues in Kisumu: Evaluated</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              {
                no: '01',
                title: 'Paper Street Private Meeting Room — Kisumu CBD Commercial Center',
                rating: 'Recommended',
                body: 'The most purpose-built professional meeting venue available in Kisumu CBD at an accessible hourly rate. Fully enclosed rooms with acoustic insulation, large presentation display screens, enterprise fibre Wi-Fi (sufficient for remote video participants), automatic generator backup, air conditioning, and professional reception to greet and direct your guests. Available by the hour from KES 1,500 for a small room and KES 2,500 for the executive boardroom. No minimum spend beyond the room hire. No catering required. Booking confirmed within minutes.',
                stats: [
                  ['Privacy', '100% acoustic isolation'],
                  ['Internet', 'Enterprise fibre'],
                  ['Power', 'Auto generator'],
                  ['Cost', 'From KES 1,500/hr'],
                ]
              },
              {
                no: '02',
                title: 'Hotel Conference Rooms: Milimani & CBD Hotels',
                rating: 'Good but expensive',
                body: "Kisumu's established hotels, including those along the CBD and Milimani corridor, have conference rooms with solid infrastructure and professional management. Internet and generator quality is generally reliable. The primary limitation is cost: hourly rates for hotel conference rooms in Kisumu start at KES 5,000 to 8,000 and frequently include catering minimums that add KES 5,000 to 15,000 per session regardless of whether you need food service. For full-day events where you want high-end hospitality presentation, hotels work well. For regular professional meetings of 2 to 3 hours, the cost is disproportionate.",
                stats: [
                  ['Privacy', 'Good'],
                  ['Internet', 'Good'],
                  ['Power', 'Generator'],
                  ['Cost', 'KES 5,000 to 12,000/hr'],
                ]
              },
              {
                no: '03',
                title: 'Restaurant Private Dining Rooms',
                rating: 'Limited — situational',
                body: 'A few Kisumu restaurants have semi-private or private dining sections that can be arranged for meetings. The acoustics are functional if the main restaurant is not busy. Internet is typically residential-grade at best. No presentation equipment is available. Privacy is relative — a partially divided restaurant section is not a confidential environment for a legal or financial discussion. Appropriate for informal supplier relationship meetings or social business meals, not for formal presentations, negotiation sessions, or confidential reviews.',
                stats: [
                  ['Privacy', 'Low to moderate'],
                  ['Internet', 'Residential / poor'],
                  ['Power', 'Standard mains'],
                  ['Cost', 'Low / minimum spend'],
                ]
              },
              {
                no: '04',
                title: 'Hotel Lobbies & Lounges',
                rating: 'Avoid for formal meetings',
                body: 'Hotel lobbies in Kisumu provide a neutral, relatively comfortable setting for informal business encounters — the sort of meet-and-greet or preliminary conversation that does not require a formal agenda or presentation materials. They are not appropriate for legal briefings, financial proposal presentations, board updates, or any discussion where confidentiality or structured presentation is required. Other guests, noise, and the complete absence of privacy make hotel lobbies unsuitable for formal professional meetings.',
                stats: [
                  ['Privacy', 'None'],
                  ['Internet', 'Public hotel Wi-Fi'],
                  ['Power', 'No socket access'],
                  ['Cost', 'Low'],
                ]
              },
              {
                no: '05',
                title: "One Party's Office Premises",
                rating: 'Depends on setup',
                body: "Holding a meeting in your own office or your counterpart's office removes venue cost but introduces other variables. If you are visiting a client's office, you are on their territory, which has negotiation dynamics implications for commercial discussions. If you are hosting in your own space, your workspace quality becomes part of the impression. A coworking open-plan desk is not a meeting venue, but a Paper Street private office suite or boardroom booking solves this problem for members and non-members alike.",
                stats: [
                  ['Privacy', 'Depends on space'],
                  ['Internet', 'Depends on setup'],
                  ['Power', 'Depends on setup'],
                  ['Cost', 'Zero to low'],
                ]
              },
            ].map((venue) => (
              <div key={venue.no} className="py-10 grid md:grid-cols-12 gap-6">
                <div className="md:col-span-1 text-xs font-mono text-navy font-bold pt-1">{venue.no}</div>
                <div className="md:col-span-11">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-heading font-medium text-navy">{venue.title}</h3>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-navy font-semibold whitespace-nowrap">{venue.rating}</span>
                  </div>
                  <p className="text-sm text-navy/75 font-light leading-relaxed mb-6">{venue.body}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-black/10">
                    {venue.stats.map(([label, value]) => (
                      <div key={label}>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-navy/50 mb-1">{label}</p>
                        <p className="text-xs font-medium text-navy">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-4">Paper Street · Kisumu CBD</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white leading-tight mb-6">Professional meeting rooms at commercial rates.</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">From KES 1,500/hour. Private rooms with presentation screens, fast fibre internet, generator backup, and reception on Oginga Odinga Street.</p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/services/meeting-rooms" className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.16em] px-7 py-3.5 hover:bg-gold-400 transition-colors">
                Book a Meeting Room <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
                Check Today's Availability <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
