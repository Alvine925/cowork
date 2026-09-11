'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const ADDON_HREF_MAP: Record<string, string> = {
  'Commercial Address': '/services/business-address',
  'Commercial Business Address': '/services/business-address',
  'Kisumu Branch Address': '/services/business-address',
  'Mail Handling & Scans': '/services/addons/mail-handling',
  'Mail & Inquiries Receiving': '/services/addons/mail-handling',
  'Meeting Room Hours': '/services/addons/meeting-room-hours',
  'Mail Forwarding': '/services/addons/mail-forwarding',
  'Lockable Storage': '/services/addons/lockable-storage',
  'Reserved Personal Desk': '/services/dedicated-desk',
  'Private Acoustic Room': '/services/meeting-rooms',
  'Presentation Screen': '/services/meeting-rooms',
  'Ergonomic Desk': '/services/hot-desk',
  'Power Backup': '/services/hot-desk',
  'Quiet Phone Booths': '/services/hot-desk',
}

type ServiceCard = {
  number: string
  name: string
  tag: string
  href: string
  bookHref: string
  ctaText: string
  image: string
  desc: string
  includedAddons: string[]
}

const PRIORITY_SERVICES: ServiceCard[] = [
  {
    number: '01',
    name: 'Virtual Office',
    tag: 'Priority · Flagship',
    href: '/services/virtual-office',
    bookHref: '/quote/virtual-office',
    ctaText: 'Get Quote',
    image: '/virtual-office.webp',
    desc: 'Our comprehensive presence package: registered business address, mail handling with digital PDF scanning, and monthly meeting room credits on Oginga Odinga Street.',
    includedAddons: ['Commercial Address', 'Mail Handling & Scans', 'Meeting Room Hours'],
  },
  {
    number: '02',
    name: 'Business Address',
    tag: 'Priority · Registration',
    href: '/services/business-address',
    bookHref: '/quote/business-address',
    ctaText: 'Get Quote',
    image: '/business-address.webp',
    desc: 'Use our verifiable commercial address for BRS eCitizen registration, KRA PIN compliance, and corporate banking KYC in Kisumu CBD.',
    includedAddons: ['Commercial Business Address', 'Mail & Inquiries Receiving', 'Kisumu Branch Address'],
  },
  {
    number: '03',
    name: 'Day Pass',
    tag: 'Priority · Drop-in',
    href: '/services/hot-desk',
    bookHref: '/book/hot-desk',
    ctaText: 'Book Pass',
    image: '/daypass.webp',
    desc: 'Half-day or full-day coworking access with automatic standby generator power backup, ergonomic mesh chairs, and high-speed internet.',
    includedAddons: ['Ergonomic Desk', 'Power Backup', 'Dual-Carrier Wi-Fi'],
  },
]

const HUB_SERVICES: ServiceCard[] = [
  {
    number: '04',
    name: 'Meeting & Boardrooms',
    tag: 'In the hub · Hourly',
    href: '/services/meeting-rooms',
    bookHref: '/book/meeting-rooms',
    ctaText: 'Book Space',
    image: '/meeting-room.webp',
    desc: 'Executive 4 to 6 person boardroom suites with 4K presentation display, magnetic whiteboard, and dual-carrier fibre for client pitches and board reviews.',
    includedAddons: ['Private Acoustic Room', 'Presentation Screen', 'Dual-Carrier Fibre'],
  },
  {
    number: '05',
    name: 'Dedicated Desk',
    tag: 'In the hub · Resident',
    href: '/services/dedicated-desk',
    bookHref: '/quote/dedicated-desk',
    ctaText: 'Get Quote',
    image: '/dedicated-desk.webp',
    desc: 'Your personal permanent workstation with lockable storage and monthly meeting room hours. Set up your monitors and work with consistency.',
    includedAddons: ['Reserved Personal Desk', 'Lockable Storage', 'Meeting Room Hours'],
  },
]

const SERVICE_ADDONS = [
  {
    slug: 'mail-handling',
    href: '/services/addons/mail-handling',
    image: '/mail-handling.webp',
    title: 'Mail Handling & Digital Scanning',
    desc: 'Reception receives, logs, and delivers searchable digital PDF scans of incoming letters directly to your portal.',
    parentService: 'Virtual Office & Business Address',
    tag: '300 DPI PDF Scans',
    ctaText: 'Add to Virtual Office',
    ctaHref: '/quote/virtual-office',
  },
  {
    slug: 'mail-forwarding',
    href: '/services/addons/mail-forwarding',
    image: '/mail-forwarding.webp',
    title: 'Mail Forwarding',
    desc: 'Have original physical letters and documents received in Kisumu forwarded directly to your current address or town.',
    parentService: 'Virtual Office Add-on',
    tag: 'Courier Dispatch',
    ctaText: 'Add to Virtual Office',
    ctaHref: '/quote/virtual-office',
  },
  {
    slug: 'meeting-room-hours',
    href: '/services/addons/meeting-room-hours',
    image: '/meeting-room.webp',
    title: 'On-Demand Meeting Room Hours',
    desc: 'Book our private presentation meeting room by the hour to host client pitches, reviews, and confidential discussions.',
    parentService: 'Virtual Office & Day Pass Add-on',
    tag: '4-6 Pax Boardrooms',
    ctaText: 'Book a Room',
    ctaHref: '/book/meeting-rooms',
  },
  {
    slug: 'coworking-access',
    href: '/services/addons/coworking-access',
    image: '/daypass.webp',
    title: 'Drop-In Coworking Day Access',
    desc: 'Flexible day pass bundles for open desks, high-speed fibre Wi-Fi, and uninterrupted generator power in Kisumu CBD.',
    parentService: 'Virtual Office & Day Pass Add-on',
    tag: 'Flexi Day Passes',
    ctaText: 'Book a Day Pass',
    ctaHref: '/book/hot-desk',
  },
]

function ServiceTile({ service }: { service: ServiceCard }) {
  return (
    <div className="group flex flex-col justify-between pb-6 transition-all duration-300">
      <div>
        <Link href={service.href} className="block relative aspect-16/10 w-full overflow-hidden bg-navy/5 mb-4">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 bg-navy text-gold font-mono text-[9px] font-semibold px-2 py-0.5 tracking-wider">
            {service.number}
          </div>
          <div className="absolute top-2.5 right-2.5 bg-white text-navy font-mono text-[9px] uppercase font-semibold px-2 py-0.5 tracking-wider border border-navy/10">
            {service.tag}
          </div>
        </Link>

        <Link href={service.href}>
          <h3 className="font-heading text-xl text-navy font-normal group-hover:text-navy/70 transition-colors flex items-center justify-between">
            <span>{service.name}</span>
            <ArrowUpRight
              size={16}
              className="text-navy/30 group-hover:text-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
            />
          </h3>
        </Link>

        <p className="mt-2 text-xs text-navy/65 leading-relaxed">{service.desc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.includedAddons.map((addon, i) => {
            const targetHref = ADDON_HREF_MAP[addon] || service.href
            return (
              <Link
                key={i}
                href={targetHref}
                className="inline-flex items-center gap-1.5 font-mono text-[9px] font-medium uppercase tracking-wider text-navy/90 bg-white border border-navy/15 px-2.5 py-1 hover:border-navy hover:bg-navy hover:text-white transition-all shadow-2xs"
              >
                <span className="w-1 h-1 rounded-full bg-navy/50 shrink-0" />
                {addon}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-navy/10 flex items-center justify-between gap-3">
        <Link
          href={service.href}
          className="text-[11px] font-semibold text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
        >
          <span>Details</span>
          <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </Link>
        <Link
          href={service.bookHref}
          className="bg-navy text-white text-[10px] uppercase tracking-wider font-semibold px-4 py-2 hover:bg-navy-600 transition-colors"
        >
          {service.ctaText}
        </Link>
      </div>
    </div>
  )
}

export function ServicesOverview() {
  return (
    <section className="bg-white py-24 border-t border-navy/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-navy/10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
              <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
              Virtual office · Address · Day pass
            </span>
            <h2 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy tracking-tight">
              Start with presence. Use the hub when you need it.
            </h2>
            <p className="mt-3 text-xs md:text-sm text-navy/65 leading-relaxed">
              Most clients begin with a virtual office, a business address, or a day pass. Meeting rooms and dedicated desks stay available in the same Kisumu hub.
            </p>
          </div>
          <div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy hover:text-navy/70 transition-colors"
            >
              Compare Plans & Pricing <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {PRIORITY_SERVICES.map((service) => (
            <ServiceTile key={service.number} service={service} />
          ))}
        </div>

        <div className="pt-12 border-t border-navy/10 mb-20">
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
              <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
              Also in the Kisumu hub
            </span>
            <h3 className="mt-2 font-heading text-xl md:text-2xl font-light text-navy">
              Meeting rooms and resident desks
            </h3>
            <p className="mt-2 text-xs md:text-sm text-navy/65 leading-relaxed">
              Book a boardroom by the hour or keep a dedicated desk. Same building, same reception — not the starting offer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
            {HUB_SERVICES.map((service) => (
              <ServiceTile key={service.number} service={service} />
            ))}
          </div>
        </div>

        <div className="pt-16 border-t border-navy/10">
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold">
              <span className="w-2.5 h-1 bg-navy shrink-0 inline-block" />
              Service Add-ons & Inclusions
            </span>
            <h3 className="mt-2 font-heading text-2xl md:text-3xl font-light text-navy">
              Tailor Your Plan to Your Workflow
            </h3>
            <p className="mt-2 text-xs md:text-sm text-navy/65 leading-relaxed">
              Bundle mail, extra meeting hours, or extra day access with a virtual office — or book the hub directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICE_ADDONS.map((addon) => (
              <div
                key={addon.slug}
                className="group flex flex-col justify-between border-t border-navy/10 pt-6 transition-all duration-300"
              >
                <Link href={addon.href} className="block">
                  <div className="block relative aspect-16/10 w-full overflow-hidden bg-navy/5 mb-4">
                    <img
                      src={addon.image}
                      alt={addon.title}
                      className="h-full w-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-navy text-gold font-mono text-[8px] font-bold uppercase px-2 py-0.5 tracking-wider">
                      {addon.tag}
                    </div>
                  </div>

                  <h4 className="text-base font-medium text-navy font-heading group-hover:text-navy/70 transition-colors flex items-center justify-between">
                    <span>{addon.title}</span>
                    <ArrowUpRight size={15} className="text-navy/30 group-hover:text-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5" />
                  </h4>
                  <p className="text-xs text-navy/65 mt-2.5 leading-relaxed font-light">{addon.desc}</p>
                </Link>

                <div className="mt-5 pt-3 border-t border-navy/10 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-semibold block truncate">
                    {addon.parentService}
                  </span>
                  <Link
                    href={addon.ctaHref}
                    className="bg-navy/5 hover:bg-navy hover:text-white text-navy text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 transition-all shrink-0"
                  >
                    {addon.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
