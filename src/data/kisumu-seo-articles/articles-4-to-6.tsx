import React from 'react'
import Link from 'next/link'
import { DollarSign, CheckCircle2, ArrowRight, ShieldCheck, Zap, Building2, HelpCircle, Layers, TrendingDown } from 'lucide-react'

export const kisumuArticles4To6: Record<string, React.ReactNode> = {
  'how-much-does-coworking-cost-in-kisumu': (
    <>
      <div className="bg-navy/5 border-l-4 border-navy p-4 mb-8 text-sm text-navy/90 rounded-r">
        <strong>Pricing Guide:</strong> A straightforward breakdown of coworking costs, day pass rates, dedicated desk packages, and virtual office options in Kisumu.
      </div>

      <h2>Understanding Coworking Costs in Kisumu</h2>
      <p>
        If you are planning your operational budget for workspace in Kisumu, coworking offers a flexible and cost-effective solution compared to renting and furnishing a traditional commercial office.
      </p>
      <p>
        In Kisumu, flexible workspace pricing is structured around your usage needs—whether you need a desk for a single day, a monthly dedicated workstation, or a virtual business address for statutory compliance.
      </p>

      <h2>Coworking Rates in Kisumu (Current Price Breakdown)</h2>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-left text-sm border-collapse border border-navy/20">
          <thead>
            <tr className="bg-navy text-white">
              <th className="p-3 border border-navy/20">Service / Plan</th>
              <th className="p-3 border border-navy/20">Pricing (KES)</th>
              <th className="p-3 border border-navy/20">What is Included</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-navy/10 bg-white">
              <td className="p-3 font-semibold">Day Pass (Drop-In)</td>
              <td className="p-3 font-bold text-navy">KES 1,000 / day</td>
              <td className="p-3 text-xs">Full day access, high-speed fibre Wi-Fi, power backup, desk, air conditioning</td>
            </tr>
            <tr className="border-b border-navy/10 bg-navy/5">
              <td className="p-3 font-semibold">Weekly Flex Pass</td>
              <td className="p-3 font-bold text-navy">KES 4,500 / week</td>
              <td className="p-3 text-xs">5 days flexible desk access during business hours</td>
            </tr>
            <tr className="border-b border-navy/10 bg-white">
              <td className="p-3 font-semibold">Monthly Hot Desk</td>
              <td className="p-3 font-bold text-navy">KES 12,000 / month</td>
              <td className="p-3 text-xs">Unlimited monthly flexible desk access, Wi-Fi, generator backup, meeting room credits</td>
            </tr>
            <tr className="border-b border-navy/10 bg-navy/5">
              <td className="p-3 font-semibold">Dedicated Desk</td>
              <td className="p-3 font-bold text-navy">KES 16,500 / month</td>
              <td className="p-3 text-xs">Permanent reserved desk, lockable drawer/pedestal, business address, meeting hours</td>
            </tr>
            <tr className="border-b border-navy/10 bg-white">
              <td className="p-3 font-semibold">Virtual Office Plan</td>
              <td className="p-3 font-bold text-navy">From KES 3,500 / month</td>
              <td className="p-3 text-xs">CBD commercial address for BRS/KRA, mail receipt, scanning & forwarding</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What Is Included in Your Coworking Membership?</h2>
      <p>
        At Paper Street Kisumu CBD, your membership covers all core office utilities and services with no hidden surcharges:
      </p>
      <ul>
        <li><strong>Commercial High-Speed Internet:</strong> Reliable fibre connection with backup line</li>
        <li><strong>Power Continuity:</strong> Standby generator backup automatically kicks in during grid blackouts</li>
        <li><strong>Front-Desk Support:</strong> Professional reception to welcome guests and receive your business parcels</li>
        <li><strong>Clean Facilities & Maintenance:</strong> Daily cleaning, air conditioning, and maintained commercial restrooms</li>
        <li><strong>Meeting Rooms:</strong> Bookable meeting rooms for team discussions and client pitches</li>
      </ul>

      <div className="bg-navy text-white p-6 my-8 rounded">
        <h3 className="text-white text-lg font-heading mb-2">Simple, Transparent Pricing in Kisumu CBD</h3>
        <p className="text-white/80 text-sm mb-4">
          Choose a flexible desk or virtual office plan that fits your exact business needs.
        </p>
        <Link href="/pricing" className="inline-block bg-gold text-navy font-bold text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded hover:bg-gold-400 transition-colors">
          View All Membership Options
        </Link>
      </div>
    </>
  ),

  'how-much-does-an-office-cost-in-kisumu': (
    <>
      <div className="bg-navy/5 border-l-4 border-navy p-4 mb-8 text-sm text-navy/90 rounded-r">
        <strong>Commercial Real Estate Guide:</strong> A guide to commercial office rental rates, service charges, fit-out costs, and managed office options in Kisumu CBD.
      </div>

      <h2>Renting Commercial Office Space in Kisumu</h2>
      <p>
        Setting up a physical business presence in Kisumu involves deciding between leasing a conventional bare commercial space or choosing a serviced office/coworking solution in an established commercial building.
      </p>

      <h2>Commercial Rental Rates in Kisumu CBD</h2>
      <p>
        Commercial office rents in Kisumu CBD generally range between <strong>KES 80 and KES 120 per square foot per month</strong>, with an additional service charge of <strong>KES 15 to KES 25 per square foot</strong> for common area maintenance, security, and shared services.
      </p>

      <h2>The Real Cost Breakdown of a Traditional Office</h2>
      <p>
        For a small 500 sq ft office in Kisumu CBD, the monthly operational expenses typically include:
      </p>
      <ul>
        <li><strong>Base Rent (500 sq ft):</strong> KES 45,000 – KES 55,000</li>
        <li><strong>Service Charge:</strong> KES 8,000 – KES 12,000</li>
        <li><strong>Electricity & Generator Levies:</strong> KES 8,000 – KES 12,000</li>
        <li><strong>Dedicated Internet:</strong> KES 10,000 – KES 15,000</li>
        <li><strong>Cleaning & Office Consumables:</strong> KES 8,000</li>
        <li><strong>Reception / Admin Staff:</strong> KES 25,000 – KES 35,000</li>
      </ul>
      <p className="font-semibold text-navy">
        Total monthly cost: approximately <strong>KES 100,000 to KES 135,000 per month</strong>, plus upfront fit-out and deposit expenses.
      </p>

      <h2>The Managed Workspace Alternative</h2>
      <p>
        By utilizing <strong>Paper Street’s</strong> coworking, private offices, or virtual office plans in Kisumu CBD, businesses obtain a prestigious commercial address, fully furnished desks, high-speed fibre, backup power, and front-desk reception for a fraction of the cost—with zero capital expenditure on fit-outs.
      </p>

      <div className="bg-navy text-white p-6 my-8 rounded">
        <h3 className="text-white text-lg font-heading mb-2">Reduce Your Office Overhead in Kisumu</h3>
        <p className="text-white/80 text-sm mb-4">
          Get a professional business presence in Kisumu CBD without traditional lease lock-ins.
        </p>
        <Link href="/services/virtual-office" className="inline-block bg-gold text-navy font-bold text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded hover:bg-gold-400 transition-colors">
          Explore Virtual Office Plans
        </Link>
      </div>
    </>
  ),

  'meeting-rooms-for-hire-in-kisumu': (
    <>
      <div className="bg-navy/5 border-l-4 border-navy p-4 mb-8 text-sm text-navy/90 rounded-r">
        <strong>Meeting Facilities Guide:</strong> Hourly and full-day meeting room hire in Kisumu CBD for client presentations, board meetings, team reviews, and partner discussions.
      </div>

      <h2>Professional Meeting Space in Kisumu CBD</h2>
      <p>
        When you need to host a client, conduct an interview, or hold a team strategy session in Kisumu, having an enclosed, professional meeting room makes all the difference.
      </p>
      <p>
        Public cafes and hotel lobbies often lack privacy and can be noisy. Paper Street provides private, air-conditioned meeting rooms in our Kisumu CBD commercial building, equipped with presentation screens, video conferencing capabilities, and high-speed internet.
      </p>

      <h2>Meeting Room Facilities at Paper Street Kisumu</h2>
      <ul>
        <li><strong>Boardroom & Meeting Suite:</strong> Accommodates 6 to 12 guests with a large presentation display screen, conference camera, whiteboard, and comfortable executive seating.</li>
        <li><strong>Small Meeting / Focus Room:</strong> Accommodates 2 to 4 guests for one-on-one client consultations, interviews, or confidential calls.</li>
        <li><strong>High-Speed Fibre & Power Backup:</strong> Uninterrupted connection for hybrid Zoom, Microsoft Teams, and Google Meet video calls.</li>
        <li><strong>Front-Desk Reception:</strong> Dedicated receptionist to greet your attendees upon arrival.</li>
        <li><strong>Comfortable Environment:</strong> Air-conditioned room with ergonomic executive seating.</li>
      </ul>

      <h2>Rates & Booking</h2>
      <p>
        Meeting rooms at Paper Street Kisumu CBD can be booked by the hour or by the full day:
      </p>
      <ul>
        <li><strong>Small Meeting Room (2–4 pax):</strong> From KES 1,500 / hour</li>
        <li><strong>Executive Boardroom (6–12 pax):</strong> From KES 2,500 / hour (Full-day packages available)</li>
      </ul>

      <div className="bg-navy text-white p-6 my-8 rounded">
        <h3 className="text-white text-lg font-heading mb-2">Book a Meeting Room in Kisumu CBD</h3>
        <p className="text-white/80 text-sm mb-4">
          Reserve your meeting space with presentation screen, video conferencing, and reception support.
        </p>
        <Link href="/services/meeting-rooms" className="inline-block bg-gold text-navy font-bold text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded hover:bg-gold-400 transition-colors">
          Book a Meeting Room
        </Link>
      </div>
    </>
  ),
}
