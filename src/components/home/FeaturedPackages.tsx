'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export function FeaturedPackages() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="bg-navy py-20 text-white sm:py-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="max-w-2xl">
            <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              Transparent Plans
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light leading-tight text-white">
              Priority plans: address, virtual office, day pass.
            </h2>
            <p className="mt-2 text-xs md:text-sm font-light leading-relaxed text-white/65">
              Annual billing applies to Virtual Office and Business Address. Day pass rates stay the same either way. Dedicated desks and meeting rooms are listed below.
            </p>
          </div>

          {/* Billing Switcher */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${!isAnnual ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
            >
              Monthly
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative h-5 w-10 rounded-full border border-white/20 bg-white/10"
            >
              <motion.span
                className="absolute top-0.5 h-3.5 w-3.5 rounded-full bg-gold"
                animate={{ left: isAnnual ? '1.35rem' : '0.2rem' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${isAnnual ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
            >
              Annual <span className="text-gold font-mono text-[9px]">(Save up to 30%)</span>
            </button>
          </div>
        </div>

        {/* Row 1 — priority: VO, Address, Day Pass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Business Address */}
          <article className="flex flex-col justify-between border border-white/12 bg-white/5 p-6 transition-colors hover:border-gold/50">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-gold">
                  Commercial Presence
                </span>
              </div>
              <h3 className="font-heading text-xl text-white font-light">Business Address</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
                Official commercial address in Kisumu CBD for company registration and proposals.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl text-white font-medium">
                    KES {isAnnual ? '3,500' : '5,000'}
                  </span>
                  <span className="text-xs text-white/50">/ month</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/40">
                  {isAnnual ? 'Billed annually: KES 42,000 / yr' : 'Billed monthly on rolling basis'}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs font-light text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Official Kisumu CBD commercial address</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Company registration & tax filing use</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Address on website, branding & proposals</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Commercial branch presence in Western Kenya</span>
                </li>
              </ul>
            </div>

            <Link
              href="/quote/business-address"
              className="mt-8 block border border-white/30 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-navy transition-colors"
            >
              Get Quote &rarr;
            </Link>
          </article>

          {/* 2. Virtual Office (Featured) */}
          <article className="flex flex-col justify-between border-2 border-gold bg-white/5 p-6 relative">
            <div className="absolute -top-3 left-6 bg-gold px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-navy">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-gold">
                  All-in-One Presence
                </span>
              </div>
              <h3 className="font-heading text-xl text-white font-light">Virtual Office</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
                Complete credibility: commercial address, mail scanning, and monthly meeting room hours.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl text-gold font-medium">
                    KES {isAnnual ? '8,000' : '10,000'}
                  </span>
                  <span className="text-xs text-white/50">/ month</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/40">
                  {isAnnual ? 'Billed annually: KES 96,000 / yr' : 'Billed monthly on rolling basis'}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs font-light text-white/75">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Everything in Business Address</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Digital mail scanning (PDFs to portal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Meeting room booking hours included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Front desk greeting for client visits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Document forwarding coordination</span>
                </li>
              </ul>
            </div>

            <Link
              href="/quote/virtual-office"
              className="mt-8 block bg-gold py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-navy hover:bg-gold-400 transition-colors"
            >
              Get Quote &rarr;
            </Link>
          </article>

          {/* 3. Hot Desk / Day Pass */}
          <article className="flex flex-col justify-between border border-white/12 bg-white/5 p-6 transition-colors hover:border-gold/50">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-gold">
                  Flexible Coworking
                </span>
              </div>
              <h3 className="font-heading text-xl text-white font-light">Day Pass / Hot Desk</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
                Drop in and get into deep focus with dependable power backup in Kisumu CBD.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl text-white font-medium">KES 1,500</span>
                  <span className="text-xs text-white/50">/ full day</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/40">
                  Half-day rate: KES 1,000 / half day
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs font-light text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Ergonomic open-plan workstation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>100% generator power backup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>High-speed redundant internet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Executive ergonomic workstation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Front desk reception & check-in</span>
                </li>
              </ul>
            </div>

            <Link
              href="/book/hot-desk"
              className="mt-8 block border border-white/30 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-navy transition-colors"
            >
              Book Day Pass &rarr;
            </Link>
          </article>
        </div>

        <div className="mt-12 mb-6">
          <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
            Also in the hub
          </span>
          <h3 className="font-heading text-xl text-white font-light">
            Dedicated desks and meeting rooms
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 4. Dedicated Desk */}
          <article className="flex flex-col justify-between border border-white/12 bg-white/5 p-6 transition-colors hover:border-gold/50">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-gold">
                  Resident Workstation
                </span>
              </div>
              <h3 className="font-heading text-xl text-white font-light">Dedicated Desk</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
                Your permanent personal desk with lockable storage and monthly meeting room hours.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl text-white font-medium">
                    KES {isAnnual ? '18,000' : '20,000'}
                  </span>
                  <span className="text-xs text-white/50">/ month</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/40">
                  {isAnnual ? 'Billed annually: KES 216,000 / yr' : 'Billed monthly on rolling basis'}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs font-light text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Permanent assigned desk (leave monitors)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Lockable steel drawer unit with key</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Commercial business address included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Monthly meeting room booking credits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>100% generator backup & Ethernet port</span>
                </li>
              </ul>
            </div>

            <Link
              href="/quote/dedicated-desk"
              className="mt-8 block border border-white/30 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-navy transition-colors"
            >
              Get Quote &rarr;
            </Link>
          </article>

          <article className="flex flex-col justify-between border border-white/12 bg-white/5 p-6 transition-colors hover:border-gold/50">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-gold">
                  By the hour
                </span>
              </div>
              <h3 className="font-heading text-xl text-white font-light">Meeting Rooms</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
                Private boardroom with 4K display, casting, and reception greeting — book when you need the room.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl text-white font-medium">KES 2,000</span>
                  <span className="text-xs text-white/50">/ hour</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/40">
                  Half-day KES 7,000 · Full-day KES 12,000
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4 text-xs font-light text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>6 to 12 person boardroom setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>4K display, HDMI and wireless casting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Included hours on Virtual Office plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span>Front desk guest greeting</span>
                </li>
              </ul>
            </div>

            <Link
              href="/book/meeting-rooms"
              className="mt-8 block border border-white/30 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-navy transition-colors"
            >
              Book a Room &rarr;
            </Link>
          </article>
        </div>

        {/* Operational Steps - 3 Clean Columns */}
        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
          {[
            ['01', 'Choose presence or a desk today', 'Quote a virtual office or business address, or book a day pass. Meeting rooms and dedicated desks stay available in the hub.'],
            ['02', 'Activate Online or On-Site', 'Set up your billing rhythm and receive your official address or workspace access.'],
            ['03', 'Operate With Authority', 'Meet clients in our private room, receive mail locally, and work without office lease overhead.'],
          ].map(([number, title, detail]) => (
            <div key={number} className="flex items-start gap-4">
              <span className="font-heading text-xl text-gold/80">{number}</span>
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h4>
                <p className="mt-1 text-xs font-light leading-relaxed text-white/50">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}