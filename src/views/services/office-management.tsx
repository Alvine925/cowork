'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'

const FEATURES = [
  {
    number: '01',
    title: 'Office Sourcing',
    desc: 'We identify suitable office premises based on your location, team size, budget and requirements. Premises are sourced after understanding your needs — not from a fixed inventory.',
  },
  {
    number: '02',
    title: 'Office Furnishing',
    desc: 'We source and install furniture, workstations and the equipment your team needs to work comfortably and productively from day one.',
  },
  {
    number: '03',
    title: 'Internet & Utilities',
    desc: 'We arrange internet connectivity, electricity, water and other essential utilities so your office is fully operational when your team moves in.',
  },
  {
    number: '04',
    title: 'Cleaning & Maintenance',
    desc: 'We coordinate regular office cleaning, maintenance schedules and general upkeep so the workspace stays professional throughout the agreement.',
  },
  {
    number: '05',
    title: 'Ongoing Office Management',
    desc: 'Paper Street oversees the operational requirements of your office for the duration of the service agreement, handling day-to-day management so you can focus on your business.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Tell us what your business needs', detail: 'Share your location preference in Kisumu, team size, required facilities and expected start date on our dedicated proposal form.' },
  { step: '02', title: 'We identify suitable office premises', detail: 'Our team researches and shortlists office options that fit your requirements, budget and location. We present options for your review.' },
  { step: '03', title: 'We agree on specifications and pricing', detail: 'Once you select a preferred option, we agree on the full office specification — furniture, fittings, facilities and pricing — before any commitment is made.' },
  { step: '04', title: 'We furnish and prepare the office', detail: 'Paper Street coordinates furnishing, equipment installation, utility connections and all setup work so the office is move-in ready.' },
  { step: '05', title: 'Your team moves in; we manage the office', detail: 'Your team occupies the office while Paper Street continues to manage cleaning, maintenance, utilities and operational requirements throughout the contract.' },
]

const WHO_FOR = [
  'SMEs and growing businesses that need a physical office without taking on the operational burden',
  'Companies opening regional branches or establishing an office in Kisumu',
  'NGOs and development organisations requiring a fully managed workspace',
  'Consulting and professional service firms that want a dedicated office without property management headaches',
  'Businesses establishing a physical office location for the first time',
]

export const FACILITY_CATEGORIES = [
  {
    category: 'Workspace Layout & Rooms',
    items: [
      'Private Executive Offices / Director Cabins',
      'Open Plan Team Space / Workstations',
      'Private Meeting Room & Boardroom',
      'Acoustic Phone Booths / Soundproof Call Pods',
      'Reception Desk & Visitor Waiting Lounge',
    ],
  },
  {
    category: 'Technology & Office Equipment',
    items: [
      'Commercial Network Printers, Scanners & Copiers',
      'High-Speed Dedicated Fibre Internet (Dual-Carrier)',
      'Video Conferencing Tech & 4K Presentation Display',
      'Server Room / Network Rack Enclosure',
      'Ergonomic Mesh Chairs & Executive Desks',
      'On-Demand IT Support & Network Maintenance',
    ],
  },
  {
    category: 'Security, Facilities & Operations',
    items: [
      '24/7 Security, CCTV & Biometric Access Control',
      'Daily Office Cleaning & Janitorial Upkeep',
      '100% Standby Power Generator Backup',
      'Air Conditioning & Climate Control',
      'Dedicated On-Site Parking Spaces',
    ],
  },
  {
    category: 'Kitchen, Storage & Amenities',
    items: [
      'Fully Stocked Kitchenette & Dining Area',
      'Water Dispenser, Premium Coffee & Tea Station',
      'Lockable Filing Cabinets & Secure Storage Units',
      'Mail & Courier Receiving at Front Desk',
    ],
  },
]

export const ALL_FACILITIES = FACILITY_CATEGORIES.flatMap((c) => c.items)

export default function OfficeManagementPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
        eyebrow="Office Management · Kisumu"
        title="Your Office. Fully Managed. Ready for Business."
        subtitle="From finding the right premises to furnishing, utilities and ongoing office management, Paper Street takes care of your office so you can focus on running your business."
        align="left"
        height="h-[80vh] min-h-[600px]"
      >
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            href="/office-management/quote-request"
            className="bg-gold text-navy px-6 py-3 text-[11px] tracking-widest font-bold hover:bg-white hover:text-navy transition-colors uppercase text-center inline-block"
          >
            Request an Office Proposal
          </Link>
          <Link
            href="#how-it-works"
            className="border border-white/40 text-white px-6 py-3 text-[11px] tracking-widest font-semibold hover:border-white hover:bg-white/10 transition-colors uppercase text-center inline-block"
          >
            How It Works
          </Link>
        </div>
      </PageHero>

      {/* What We Manage */}
      <section className="bg-white py-24 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
              <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
              What We Manage
            </span>
            <h2 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy tracking-tight">
              Everything your office needs, taken care of.
            </h2>
            <p className="mt-3 text-xs md:text-sm text-navy/65 leading-relaxed">
              Paper Street covers every operational aspect of your office so you can direct your time and energy to running your business. Premises sourcing is tailored to your brief, not forced from fixed inventory.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="border-t border-navy/10 pt-6">
                <span className="font-mono text-xs font-bold text-navy/40 bg-navy/5 px-2.5 py-1 tracking-wider inline-block mb-4">
                  {feature.number}
                </span>
                <h3 className="font-heading text-lg text-navy font-normal mb-2">{feature.title}</h3>
                <p className="text-xs text-navy/65 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#FBFAF7] py-24 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
              <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
              How It Works
            </span>
            <h2 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy tracking-tight">
              From your brief to a managed office in five steps.
            </h2>
            <p className="mt-3 text-xs md:text-sm text-navy/65 leading-relaxed">
              Office sourcing and preparation happen after your requirements have been confirmed and commercial terms agreed — not before.
            </p>
          </div>
          <div className="flex flex-col gap-0 max-w-3xl">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-navy text-gold font-mono text-sm font-bold flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="w-px flex-1 bg-navy/15 my-2" />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="font-heading text-base md:text-lg text-navy font-normal mb-1.5">{step.title}</h3>
                  <p className="text-xs text-navy/65 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="bg-white py-24 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
                <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
                Who Is It For
              </span>
              <h2 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy tracking-tight mb-6">
                Built for businesses that need a physical office without the complexity.
              </h2>
              <ul className="flex flex-col gap-4">
                {WHO_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-navy mt-0.5 shrink-0" />
                    <span className="text-sm text-navy/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&q=80"
                alt="Professional managed office in Kisumu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contract Structure */}
      <section className="bg-[#FBFAF7] py-24 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
              <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
              Contract Structure
            </span>
            <h2 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy tracking-tight">
              Annual and biannual agreements.
            </h2>
            <p className="mt-3 text-sm text-navy/65 leading-relaxed">
              Office Management is offered through 12-month and 24-month service agreements. Pricing is determined by the client&apos;s specific requirements, including the office location, size, facilities required and local property costs in Kisumu.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
            <div className="border border-navy/10 p-8 bg-white">
              <span className="font-mono text-[10px] uppercase tracking-wider text-navy font-bold block mb-2">12-Month Agreement</span>
              <h3 className="font-heading text-lg text-navy font-light mb-3">Annual Operating Agreement</h3>
              <p className="text-xs text-navy/65 leading-relaxed">
                A 12-month managed office agreement covering premises sourcing, furnishing, utilities, cleaning, maintenance and ongoing office management.
              </p>
            </div>
            <div className="border border-navy/10 p-8 bg-white">
              <span className="font-mono text-[10px] uppercase tracking-wider text-navy font-bold block mb-2">24-Month Agreement</span>
              <h3 className="font-heading text-lg text-navy font-light mb-3">Biannual Operating Agreement</h3>
              <p className="text-xs text-navy/65 leading-relaxed">
                A 24-month managed office agreement offering a longer-term operational commitment for businesses planning an established office presence.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-navy/45 max-w-xl leading-relaxed">
            All pricing is tailored to your requirements. We do not publish standard rates as costs vary based on office size, location, and specific facilities selected.
          </p>
        </div>
      </section>

      {/* Quote Request Navigation Section */}
      <section className="bg-white py-24 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="border border-navy/10 bg-[#FBFAF7] p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-2">
                Proposal &amp; Commercial Brief
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-navy tracking-tight">
                Ready to Request an Office Proposal?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-navy/65 leading-relaxed">
                Tell us about your team size, layout preferences (private offices, open desks), and required facilities on our dedicated quote page. You will receive an immediate confirmation and our team will contact you within 1 business day.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/office-management/quote-request"
                className="inline-flex items-center gap-2 bg-navy text-white text-[11px] uppercase tracking-widest font-semibold px-8 py-4 hover:bg-navy/80 transition-colors"
              >
                <span>Go to Quote Request</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-4">
            <span className="w-2.5 h-1 bg-gold shrink-0 inline-block" />
            Get Started
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-light text-white tracking-tight mb-4">
            Ready to Establish Your Office?
          </h2>
          <p className="text-white/60 text-sm font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Tell us what your business needs. We&apos;ll work with you to find and prepare an office in Kisumu that suits your requirements.
          </p>
          <Link
            href="/office-management/quote-request"
            className="inline-block bg-gold text-navy px-8 py-4 text-[11px] tracking-widest font-bold hover:bg-white hover:text-navy transition-colors uppercase"
          >
            Request an Office Proposal
          </Link>
        </div>
      </section>
    </>
  )
}
