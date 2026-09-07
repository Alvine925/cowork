'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Shield, Building2, Clock } from 'lucide-react'

const CORE_BOOKING_SERVICES = [
  {
    slug: 'virtual-office',
    group: 'priority' as const,
    href: '/quote/virtual-office',
    ctaText: 'Get Quote',
    title: 'Virtual Office',
    tag: 'Priority · Flagship',
    annualRate: 'KES 8,000 / mo',
    monthlyRate: 'KES 10,000 / mo (+ 1 mo deposit)',
    shortDesc: 'Comprehensive business presence with commercial address on Oginga Odinga St, digital mail PDF scanning, and monthly boardroom hours.',
    features: [
      'Official commercial address in Kisumu CBD',
      'Daily mail scan-to-PDF delivered directly to email',
      'Monthly boardroom booking hours included',
      'Front desk receptionist & client greeting',
      'Zero deposit on annual plan'
    ]
  },
  {
    slug: 'business-address',
    group: 'priority' as const,
    href: '/quote/business-address',
    ctaText: 'Get Quote',
    title: 'Business Address',
    tag: 'Priority · Registration',
    annualRate: 'KES 3,500 / mo',
    monthlyRate: 'KES 5,000 / mo (+ 2 mo deposit)',
    shortDesc: 'Dedicated commercial address for eCitizen company incorporation, KRA PIN registration, and corporate banking KYC.',
    features: [
      'Official registered office address in Kisumu CBD',
      'Instant proof of address certificate for KYC & banking',
      'Company registration & tax compliance eligible',
      'Physical mail receiving & holding'
    ]
  },
  {
    slug: 'hot-desk',
    group: 'priority' as const,
    href: '/book/hot-desk',
    ctaText: 'Book Day Pass',
    title: 'Day Pass',
    tag: 'Priority · Drop-in',
    annualRate: 'KES 1,000 Half-Day / KES 1,500 Full-Day',
    monthlyRate: 'KES 14,000 Monthly Flex (10 Days/mo)',
    shortDesc: 'Drop in and work with uninterrupted generator power backup, high-speed dual-carrier fibre Wi-Fi, and ergonomic mesh seating.',
    features: [
      'Half-day (4h) & full-day flexible drop-in passes',
      'Monthly flex pass: 10 flexible working days per month',
      '100% automatic standby generator power backup',
      'High-speed redundant dual-carrier fibre Wi-Fi'
    ]
  },
  {
    slug: 'dedicated-desk',
    group: 'hub' as const,
    href: '/quote/dedicated-desk',
    ctaText: 'Get Quote',
    title: 'Dedicated Desk',
    tag: 'In the hub · Resident',
    annualRate: 'KES 18,000 / mo',
    monthlyRate: 'KES 20,000 / mo (+ 1 mo deposit)',
    shortDesc: 'Your permanent reserved personal desk with lockable storage, commercial business address, and 5 hours monthly meeting room credits.',
    features: [
      'Permanently assigned desk (leave monitors & setup in place)',
      'Lockable 3-tier steel drawer pedestal with private key',
      'Commercial business address & mail handling included',
      '5 hours monthly boardroom credits'
    ]
  },
  {
    slug: 'meeting-rooms',
    group: 'hub' as const,
    href: '/book/meeting-rooms',
    ctaText: 'Book Room',
    title: 'Meeting & Boardrooms',
    tag: 'In the hub · Hourly',
    annualRate: 'KES 2,000 / hour',
    monthlyRate: 'KES 7,000 Half-Day / KES 12,000 Full-Day',
    shortDesc: 'Executive boardroom with 4K display, wireless screen casting, conference audio speakerphone, and reception greeting.',
    features: [
      '6 to 12 person boardroom setup with ergonomic chairs',
      '4K Samsung display, HDMI & wireless screen casting',
      'Conference speakerphone & magnetic whiteboard',
      'Front desk receptionist guest greeting & direction'
    ]
  }
]

function ServiceRows({ services }: { services: typeof CORE_BOOKING_SERVICES }) {
  return (
    <div className="divide-y divide-navy/15">
      {services.map((service, index) => (
        <div
          key={service.slug}
          className="py-10 grid lg:grid-cols-12 gap-8 items-start hover:bg-navy/[0.015] transition-colors -mx-4 px-4"
        >
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-navy/40 font-bold">0{index + 1}</span>
              <span className="bg-navy text-white text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold">
                {service.tag}
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-navy">{service.title}</h2>
            <p className="text-xs text-navy/65 leading-relaxed pt-1">{service.shortDesc}</p>
          </div>

          <div className="lg:col-span-4 space-y-2 text-xs text-navy/80 border-l border-navy/10 pl-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-navy/40 block mb-1">
              Pricing &amp; Billing Terms
            </span>
            <div className="flex justify-between py-1 border-b border-navy/5">
              <span className="text-navy/60">Annual / Standard:</span>
              <span className="font-mono font-bold text-navy">{service.annualRate}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-navy/5">
              <span className="text-navy/60">Monthly / Daily:</span>
              <span className="font-mono text-navy">{service.monthlyRate}</span>
            </div>
            <ul className="pt-2 space-y-1 text-[11px] text-navy/70">
              {service.features.slice(0, 2).map((feat, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <Check size={11} className="text-navy shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 flex items-center lg:justify-end self-center">
            <Link
              href={service.href}
              className="bg-navy text-white px-8 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-navy-600 transition-colors inline-flex items-center gap-2"
            >
              {service.ctaText} <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BookingDirectoryPage() {
  const priority = CORE_BOOKING_SERVICES.filter((s) => s.group === 'priority')
  const hub = CORE_BOOKING_SERVICES.filter((s) => s.group === 'hub')

  return (
    <main className="min-h-screen bg-[#fbfaf7] pt-28 pb-28 text-navy">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="max-w-3xl mb-14 pb-8 border-b border-navy/15">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy/60 hover:text-navy mb-4 transition-colors"
          >
            <ArrowLeft size={13} /> Back to All Services
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-2">
            Quote a plan or book the hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-navy tracking-tight">
            Presence plans and day access
          </h1>
          <p className="mt-4 text-sm md:text-base text-navy/70 font-light leading-relaxed">
            Virtual office and business address use a quote. Day passes and meeting rooms book immediately. Dedicated desks stay available as a resident option.
          </p>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold mb-2">
          Priority
        </p>
        <ServiceRows services={priority} />

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold mt-16 mb-2">
          Also in the hub
        </p>
        <ServiceRows services={hub} />

        <div className="mt-16 pt-10 border-t border-navy/15 grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-navy font-semibold text-xs uppercase tracking-wider font-heading">
              <Shield className="w-4 h-4 text-navy" />
              <span>Transparent Deposits</span>
            </div>
            <p className="text-xs text-navy/65 leading-relaxed">
              Security deposits on monthly plans are held securely and refunded within 30 days of completing your term.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-navy font-semibold text-xs uppercase tracking-wider font-heading">
              <Building2 className="w-4 h-4 text-navy" />
              <span>Commercial CBD Presence</span>
            </div>
            <p className="text-xs text-navy/65 leading-relaxed">
              Prime commercial center on Oginga Odinga Street in Kisumu CBD for genuine legal and tax credibility.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-navy font-semibold text-xs uppercase tracking-wider font-heading">
              <Clock className="w-4 h-4 text-navy" />
              <span>Instant Digital Pass</span>
            </div>
            <p className="text-xs text-navy/65 leading-relaxed">
              Generate immediate front-desk check-in codes and Wi-Fi access tokens directly upon reservation.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
