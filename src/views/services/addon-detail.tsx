'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { CallToAction } from '@/components/home/CallToAction'

function MailScanAddonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="#ebff48" strokeWidth="2" strokeDasharray="2 1" />
      <path d="M9 16h6" stroke="#ebff48" strokeWidth="1.8" />
    </svg>
  )
}

function MailForwardAddonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
      <path d="M16 11l4-2-4-2" stroke="#ebff48" strokeWidth="2" />
    </svg>
  )
}

function BoardroomSuiteAddonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="2" width="16" height="9" rx="1.5" />
      <line x1="12" y1="11" x2="12" y2="13" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <ellipse cx="12" cy="18" rx="8" ry="3" stroke="#ebff48" strokeWidth="1.8" />
      <circle cx="6" cy="18" r="1" fill="#ebff48" stroke="none" />
      <circle cx="12" cy="21" r="1" fill="#ebff48" stroke="none" />
      <circle cx="18" cy="18" r="1" fill="#ebff48" stroke="none" />
    </svg>
  )
}

function LockableStorageAddonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="#ebff48" stroke="none" />
      <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="#ebff48" strokeWidth="1.5" />
    </svg>
  )
}

function DayPassWorkspaceAddonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="14" x2="21" y2="14" strokeWidth="1.8" />
      <line x1="5" y1="14" x2="5" y2="21" />
      <line x1="19" y1="14" x2="19" y2="21" />
      <rect x="7" y="4" width="10" height="7" rx="1" />
      <line x1="12" y1="11" x2="12" y2="14" />
      <polygon points="13 2 9 8 13 8 11 14 17 6 13 6 13 2" fill="#ebff48" stroke="#2b4c3b" strokeWidth="0.8" />
    </svg>
  )
}

export interface AddonData {
  slug: string
  title: string
  tagline: string
  parentService: string
  parentHref: string
  heroImage: string
  icon: any
  summary: string
  audience: string
  valuePoints: {
    title: string
    desc: string
  }[]
  howItWorks: {
    step: string
    title: string
    desc: string
  }[]
  inclusions: string[]
  pricingNote: string
}

export const ADDONS_DATA: Record<string, AddonData> = {
  'mail-handling': {
    slug: 'mail-handling',
    title: 'Mail Handling & Digital Scanning',
    tagline: 'We receive your letters at reception, hold them securely, and scan them to your portal.',
    parentService: 'Virtual Office & Business Address',
    parentHref: '/services/virtual-office',
    heroImage: '/mail-handling.webp',
    icon: MailScanAddonIcon,
    summary:
      'When letters, business notices, or tenders arrive at Paper Street in Kisumu, our front desk receives and holds them safely for you. We notify you immediately and upload a clean scan to your portal so you can read it right away.',
    audience: 'For freelancers, remote workers, and businesses based outside Kisumu who need their mail received locally.',
    valuePoints: [
      {
        title: 'Front-Desk Mail Receipt',
        desc: 'Our staff receives and safely stores all incoming business correspondence addressed to your company.',
      },
      {
        title: 'Quick Digital Scans',
        desc: 'Get notified when letters arrive and read scans online without needing to travel to Kisumu in person.',
      },
      {
        title: 'Safe On-Site Storage',
        desc: 'Your physical mail is stored safely in our office until you come pick it up or request it forwarded.',
      },
      {
        title: 'Portal Record',
        desc: 'Keep a neat digital log of all past letters and delivery dates in your member dashboard.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Letter Delivered',
        desc: 'Mail arrives at our front desk in Kisumu CBD.',
      },
      {
        step: '02',
        title: 'Logged & Scanned',
        desc: 'We log the sender and upload a clear scan to your portal account.',
      },
      {
        step: '03',
        title: 'You Get Notified',
        desc: 'You receive an instant alert and can view the letter immediately.',
      },
    ],
    inclusions: [
      'Front-desk mail receiving',
      'Arrival notifications',
      'Digital document scans',
      'Safe physical holding',
      'Member portal document log',
    ],
    pricingNote: 'Included with Virtual Office plans, or available with Business Address.',
  },

  'mail-forwarding': {
    slug: 'mail-forwarding',
    title: 'Mail Forwarding',
    tagline: 'Have original physical letters and documents sent directly to your current address.',
    parentService: 'Virtual Office Add-on',
    parentHref: '/services/virtual-office',
    heroImage: '/mail-forwarding.webp',
    icon: MailForwardAddonIcon,
    summary:
      'If you receive original physical documents in Kisumu — such as signed contracts, original certificates, cheques, or cards — that you need in person, we forward them directly to your physical address.',
    audience: 'For clients located in other towns or working remotely who need their original physical mail.',
    valuePoints: [
      {
        title: 'Original Document Dispatch',
        desc: 'Get hard copies of important letters or certificates sent straight to your home or current office.',
      },
      {
        title: 'On-Demand or Scheduled',
        desc: 'Request items to be sent whenever you need them, or have them sent out on a set weekly or monthly routine.',
      },
      {
        title: 'Direct to Your Door',
        desc: 'We send packages directly to your preferred address anywhere in Kenya.',
      },
      {
        title: 'Straightforward Coordination',
        desc: 'Simply request forwarding through your portal whenever you see an item you need.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Mail Received at Hub',
        desc: 'Your physical mail is held securely at our Kisumu location.',
      },
      {
        step: '02',
        title: 'Request Forwarding',
        desc: 'Let us know which original documents you want sent to your location.',
      },
      {
        step: '03',
        title: 'Dispatched to You',
        desc: 'We dispatch the items to your doorstep and update your portal.',
      },
    ],
    inclusions: [
      'Physical document handling',
      'Forwarding to any town in Kenya',
      'Scheduled or on-demand dispatch',
      'Portal status updates',
    ],
    pricingNote: 'Available on Virtual Office and Business Address plans.',
  },

  'meeting-room-hours': {
    slug: 'meeting-room-hours',
    title: 'Meeting Room Hours',
    tagline: 'Book our private presentation meeting room in Kisumu by the hour.',
    parentService: 'Meeting Room & Workspace Add-on',
    parentHref: '/services/meeting-rooms',
    heroImage: '/meeting-room.webp',
    icon: BoardroomSuiteAddonIcon,
    summary:
      'Need a quiet, professional place to meet a client, pitch a proposal, or hold a team review in Kisumu? Book hours in our private meeting room equipped with a display screen and whiteboard.',
    audience: 'For freelancers, consultants, and teams needing a quiet space to meet clients.',
    valuePoints: [
      {
        title: 'Display Screen & Tech Ready',
        desc: 'Connect your laptop easily for presentations, slide decks, and video calls.',
      },
      {
        title: 'Quiet & Private',
        desc: 'A dedicated private room with acoustic privacy for confidential client conversations.',
      },
      {
        title: 'Front-Desk Welcome',
        desc: 'Our reception greets your guests upon arrival and directs them straight to the room.',
      },
      {
        title: 'Easy Online Booking',
        desc: 'Reserve the room online whenever you need it through your member portal.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Select Your Time',
        desc: 'Pick your date and time slot in the portal.',
      },
      {
        step: '02',
        title: 'Arrive at the Hub',
        desc: 'Our front desk welcomes you and your guests upon arrival.',
      },
      {
        step: '03',
        title: 'Hold Your Meeting',
        desc: 'Use the screen, whiteboard, and private space with zero hassle.',
      },
    ],
    inclusions: [
      'Private meeting room access',
      'Presentation screen & HDMI/wireless connection',
      'Whiteboard and markers',
      'Front-desk greeting for guests',
    ],
    pricingNote: 'Included as monthly hours with Virtual Office and Dedicated Desk, or booked by the hour.',
  },

  'lockable-storage': {
    slug: 'lockable-storage',
    title: 'Lockable Storage Drawer',
    tagline: 'A personal locked storage drawer to keep your work gear safe overnight.',
    parentService: 'Dedicated Desk & Workspace Add-on',
    parentHref: '/services/dedicated-desk',
    heroImage: '/dedicated-desk.webp',
    icon: LockableStorageAddonIcon,
    summary:
      'Avoid carrying your monitors, chargers, notebooks, and paperwork back and forth every day. Keep them locked in your own personal under-desk drawer at Paper Street in Kisumu.',
    audience: 'For dedicated desk members and regular desk users who want to leave items at the office.',
    valuePoints: [
      {
        title: 'Personal Key Access',
        desc: 'You have your own key to your private lockable drawer unit.',
      },
      {
        title: 'Leave Gear Safely',
        desc: 'Lock away your laptop, accessories, and notes overnight.',
      },
      {
        title: 'Secure Space',
        desc: 'Our premises have 24/7 security and access control for peace of mind.',
      },
      {
        title: 'Organized Workstation',
        desc: 'Keep your desktop tidy and ready for work every morning.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Assigned Drawer',
        desc: 'Get your personal storage unit next to your desk.',
      },
      {
        step: '02',
        title: 'Receive Your Key',
        desc: 'Get your unique key from the front desk.',
      },
      {
        step: '03',
        title: 'Work & Store',
        desc: 'Lock your equipment at the end of the day and return to it anytime.',
      },
    ],
    inclusions: [
      'Under-desk lockable storage drawer',
      'Personal key set',
      'Secure workspace premises',
    ],
    pricingNote: 'Included with Dedicated Desk plans.',
  },

  'coworking-access': {
    slug: 'coworking-access',
    title: 'Drop-In Coworking Passes',
    tagline: 'Flexible day passes for open desks and quiet booths in Kisumu.',
    parentService: 'Virtual Office & Day Pass Add-on',
    parentHref: '/services/hot-desk',
    heroImage: '/daypass.webp',
    icon: DayPassWorkspaceAddonIcon,
    summary:
      'Need a productive space to work for the day? Use flexible day passes to drop into Paper Street whenever you need deep focus, a quiet space away from home, or between client meetings in Kisumu.',
    audience: 'For freelancers, remote professionals, and virtual office members visiting Kisumu.',
    valuePoints: [
      {
        title: 'Comfortable Desk Space',
        desc: 'Plenty of natural light, comfortable chairs, and power points at every desk.',
      },
      {
        title: 'Phone Booths for Calls',
        desc: 'Step into quiet private phone booths for quick client and team calls.',
      },
      {
        title: 'Backup Power',
        desc: 'Automatic generator backup so power cuts never interrupt your workday.',
      },
      {
        title: 'High-Speed Internet',
        desc: 'Reliable internet connection to get your work done smoothly.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Grab a Pass',
        desc: 'Add day passes to your plan or purchase on demand.',
      },
      {
        step: '02',
        title: 'Walk In & Check In',
        desc: 'Check in at the front desk and pick any open desk.',
      },
      {
        step: '03',
        title: 'Get Work Done',
        desc: 'Enjoy a productive, quiet environment all day.',
      },
    ],
    inclusions: [
      'Full day desk access',
      'Private phone booth access',
      'Generator power backup',
      'High-speed internet',
      'Lounge and common area access',
    ],
    pricingNote: 'Available as single day passes or flexi bundles.',
  },
}

export function AddonDetailPage({ slug }: { slug: string }) {
  const addon = ADDONS_DATA[slug] || ADDONS_DATA['mail-handling']

  return (
    <main className="bg-white min-h-screen text-navy">
      {/* Clean Hero Header */}
      <section className="relative bg-navy text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60 z-10" />
        <img
          src={addon.heroImage}
          alt={addon.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="container mx-auto px-6 md:px-12 relative z-20 max-w-5xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Service Add-On · {addon.parentService}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-light text-white leading-tight">
            {addon.title}
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/80 font-light max-w-2xl leading-relaxed">
            {addon.tagline}
          </p>

          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center gap-4">
            <Link
              href="/quote/virtual-office"
              className="bg-gold text-navy font-bold px-6 py-2.5 text-[11px] uppercase tracking-wider font-semibold hover:bg-gold-400 transition-colors inline-flex items-center gap-2"
            >
              Get Virtual Office Quote <ArrowRight size={13} />
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-6 py-2.5 text-[11px] uppercase tracking-wider font-semibold hover:bg-white hover:text-navy transition-colors inline-flex items-center gap-2"
            >
              Inquire / Add to Plan
            </Link>
            <Link
              href={addon.parentHref}
              className="text-xs text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              Explore Parent Service &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content & Inclusions - Direct on White Background, No Cards */}
      <section className="py-20 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-16 items-start">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-navy font-bold block mb-2">
                  Overview
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-navy leading-tight">
                  What this add-on provides
                </h2>
              </div>

              <p className="text-xs md:text-sm text-navy/70 leading-relaxed font-light">
                {addon.summary}
              </p>

              <div className="border-l-2 border-navy pl-4 py-1">
                <p className="text-[11px] text-navy font-semibold uppercase tracking-wider">Who is this for?</p>
                <p className="text-xs text-navy/70 mt-0.5 leading-relaxed">{addon.audience}</p>
              </div>
            </div>

            {/* Right Inclusions List - Clean On Background */}
            <div className="md:col-span-5 space-y-5 md:border-l md:border-navy/10 md:pl-10">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-navy font-bold block mb-2">
                  Inclusions
                </span>
                <h3 className="font-heading text-xl font-light text-navy">What's Included:</h3>
              </div>

              <ul className="space-y-3">
                {addon.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-navy/80 leading-relaxed">
                    <CheckCircle2 size={15} className="text-navy shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-navy/10 text-xs text-navy/55 italic">
                {addon.pricingNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights - Clean Lines, No Cards */}
      <section className="py-20 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-navy font-bold block">
              Features
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-navy mt-1.5">
              Key Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
            {addon.valuePoints.map((vp, idx) => (
              <div key={idx} className="border-t border-navy/10 pt-5 space-y-1.5">
                <span className="font-mono text-[10px] text-navy font-bold block">0{idx + 1}</span>
                <h3 className="font-heading text-lg text-navy">{vp.title}</h3>
                <p className="text-xs text-navy/70 leading-relaxed font-light">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Clean Steps */}
      <section className="py-20 bg-white border-b border-navy/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-navy font-bold block">
              Process
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-navy mt-1.5">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {addon.howItWorks.map((hw, idx) => (
              <div key={idx} className="border-t border-navy/10 pt-5 space-y-2">
                <span className="font-heading text-2xl text-navy font-medium">{hw.step}</span>
                <h3 className="font-heading text-base text-navy">{hw.title}</h3>
                <p className="text-xs text-navy/65 leading-relaxed font-light">{hw.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Add-ons Navigation - Clean Horizontal Links */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-navy/10">
            <h3 className="font-heading text-xl text-navy">Other Workspace Add-Ons</h3>
            <Link
              href="/services"
              className="text-xs text-navy hover:text-navy/70 uppercase tracking-wider font-semibold"
            >
              All Services Overview &rarr;
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {Object.values(ADDONS_DATA).map((item) => (
              <Link
                key={item.slug}
                href={`/services/addons/${item.slug}`}
                className={`text-xs py-2 px-4 border transition-colors ${item.slug === slug
                    ? 'border-navy text-navy font-semibold bg-navy/5'
                    : 'border-navy/15 text-navy/70 hover:border-navy hover:text-navy'
                  }`}
              >
                {item.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  )
}
