'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Building2, Phone } from 'lucide-react'

export type CapacityServiceSlug = 'hot-desk' | 'day-pass' | 'meeting-rooms' | 'dedicated-desk'

interface CapacityDetails {
  title: string
  serviceLabel: string
  explanation: string
  waitlistQuery: string
  showVirtualOfficeAlternative: boolean
}

const CAPACITY_DETAILS: Record<CapacityServiceSlug, CapacityDetails> = {
  'hot-desk': {
    title: 'Hot Desks & Day Passes Are Currently at Full Capacity',
    serviceLabel: 'Hot Desk & Day Pass Coworking',
    explanation:
      'To guarantee ergonomic seating, acoustic comfort, and dedicated high-speed fibre internet bandwidth for our existing resident members, our open coworking floor in Kisumu CBD is operating at 100% capacity. Automated day pass and hot desk bookings are temporarily closed.',
    waitlistQuery: 'Hot Desk & Day Pass Coworking',
    showVirtualOfficeAlternative: true,
  },
  'day-pass': {
    title: 'Day Passes & Hot Desks Are Currently at Full Capacity',
    serviceLabel: 'Day Pass Coworking',
    explanation:
      'To guarantee ergonomic seating, acoustic comfort, and dedicated high-speed fibre internet bandwidth for our existing resident members, our open coworking floor in Kisumu CBD is operating at 100% capacity. Automated day pass and hot desk bookings are temporarily closed.',
    waitlistQuery: 'Day Pass Coworking',
    showVirtualOfficeAlternative: true,
  },
  'meeting-rooms': {
    title: 'Meeting Rooms & Boardrooms Are Currently at Full Capacity',
    serviceLabel: 'Executive Meeting Rooms & Boardroom',
    explanation:
      'Our executive boardroom and meeting rooms are fully booked for scheduled corporate sessions, client presentations, and internal member bookings. Automated hourly and full-day room reservations are temporarily paused.',
    waitlistQuery: 'Executive Boardroom & Meeting Rooms',
    showVirtualOfficeAlternative: true,
  },
  'dedicated-desk': {
    title: 'Dedicated Desks Are Currently at Full Capacity',
    serviceLabel: 'Dedicated Desk Resident Workstations',
    explanation:
      'All permanent personal workstations with lockable storage are currently assigned and occupied by resident members. New dedicated desk allocations are temporarily closed until additional workstation inventory opens.',
    waitlistQuery: 'Dedicated Desk Workstation',
    showVirtualOfficeAlternative: true,
  },
}

interface CapacityOverlayProps {
  service: CapacityServiceSlug
  onSwitchService?: (newSlug: string) => void
}

export default function CapacityOverlay({ service, onSwitchService }: CapacityOverlayProps) {
  const details = CAPACITY_DETAILS[service] || CAPACITY_DETAILS['hot-desk']

  // Lock body scroll while overlay is active
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  const whatsappMessage = encodeURIComponent(
    `Hello Paper Street, I would like to inquire about upcoming availability or join the waitlist for ${details.waitlistQuery}.`
  )
  const whatsappUrl = `https://wa.me/254110486677?text=${whatsappMessage}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="capacity-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/70 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-[#fbfaf7] border border-navy/20 p-6 sm:p-8 md:p-10 shadow-2xl text-navy max-h-[92vh] overflow-y-auto">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 bg-navy text-gold text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse" />
            Capacity Notice · Fully Booked
          </span>
        </div>

        {/* Heading */}
        <h2
          id="capacity-dialog-title"
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-navy tracking-tight leading-tight mb-4"
        >
          {details.title}
        </h2>

        {/* Accent Divider */}
        <div className="h-px w-full bg-navy/15 mb-4" />

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-navy/75 leading-relaxed mb-6 font-normal">
          {details.explanation}
        </p>

        {/* Primary Action Box: Waitlist / Direct Inquiries */}
        <div className="bg-white border border-navy/15 p-5 mb-5 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block">
            Join Waitlist / Direct Inquiry
          </span>
          <p className="text-xs text-navy/70 leading-relaxed">
            Need upcoming dates or want to be notified as soon as a workstation or room slot frees up? Speak directly with our Kisumu CBD front desk team:
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white hover:bg-navy-800 transition-colors py-3 px-5 text-xs font-mono uppercase tracking-wider font-bold shrink-0 text-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c1.004.57 2.016.892 2.806.892 3.181 0 5.767-2.586 5.767-5.766.001-3.182-2.585-5.774-5.767-5.774zm3.377 8.215c-.145.409-.838.775-1.151.82-.314.046-.713.064-2.072-.497-1.74-.718-2.83-2.483-2.916-2.598-.087-.116-.704-.937-.704-1.787 0-.85.449-1.267.61-1.439.16-.172.35-.215.467-.215.116 0 .233.001.336.006.107.006.251-.041.392.298.146.353.5 1.22.544 1.309.044.089.073.193.015.309-.059.116-.088.188-.175.29-.088.103-.185.23-.264.309-.088.088-.18.184-.078.36.103.175.457.754.981 1.22.675.602 1.244.789 1.42.876.176.088.279.073.382-.044.103-.117.439-.512.557-.687.117-.175.234-.146.392-.088.158.058 1.003.473 1.176.56.173.087.288.131.331.204.043.073.043.424-.102.833z" />
              </svg>
              <span>Inquire on WhatsApp</span>
            </a>
            <a
              href="tel:0110486677"
              className="inline-flex items-center justify-center gap-2 border border-navy/30 hover:border-navy text-navy hover:bg-navy/5 transition-colors py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold text-center"
            >
              <Phone className="w-3.5 h-3.5 text-navy" />
              <span>Call 0110486677</span>
            </a>
          </div>
        </div>

        {/* Alternative: Virtual Office Recommendation */}
        {details.showVirtualOfficeAlternative && (
          <div className="bg-navy/[0.04] border-l-2 border-navy p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-navy font-semibold text-xs">
                <Building2 className="w-3.5 h-3.5 text-navy" />
                <span>Virtual Office &amp; Address Services Are Open</span>
              </div>
              <p className="text-[11px] text-navy/70 mt-1 leading-relaxed">
                Need an official commercial business address in Kisumu CBD for company registration, KRA compliance, and mail handling?
              </p>
            </div>
            {onSwitchService ? (
              <button
                type="button"
                onClick={() => onSwitchService('virtual-office')}
                className="shrink-0 inline-flex items-center gap-1.5 bg-navy text-white text-[11px] font-mono uppercase tracking-wider px-3.5 py-2 hover:bg-navy-800 transition-colors font-bold self-start sm:self-auto"
              >
                <span>Switch to Quote</span>
                <ArrowRight size={12} />
              </button>
            ) : (
              <Link
                href="/quote/virtual-office"
                className="shrink-0 inline-flex items-center gap-1.5 bg-navy text-white text-[11px] font-mono uppercase tracking-wider px-3.5 py-2 hover:bg-navy-800 transition-colors font-bold self-start sm:self-auto"
              >
                <span>Explore Virtual Office</span>
                <ArrowRight size={12} />
              </Link>
            )}
          </div>
        )}

        {/* Bottom Navigation Links */}
        <div className="flex items-center justify-between pt-2 border-t border-navy/10 text-xs font-mono">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-navy/70 hover:text-navy uppercase tracking-wider transition-colors font-semibold"
          >
            <ArrowLeft size={13} />
            <span>All Services</span>
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-navy/70 hover:text-navy uppercase tracking-wider transition-colors font-semibold"
          >
            <span>Workspace Directory</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}

