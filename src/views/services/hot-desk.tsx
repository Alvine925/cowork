'use client'

import { GenericServicePage } from './generic-service'

export default function HotDeskPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Flexible Coworking',
        title: 'Hot Desk Day Passes.',
        subtitle: 'Drop in, plug in, and get into deep focus with dependable power backup and a quiet workspace in Kisumu.',
        image: '/daypass.webp',
        imageAlt: 'Paper Street coworking hot desk and day pass workspace in Kisumu',
        description:
          'A Paper Street Hot Desk gives you a quiet, productive workspace with complete daily flexibility. Drop into any available workstation in our open-plan space, connect to reliable internet, and work without long-term commitments.',
        audience: 'For independent creators, remote software engineers, visiting consultants, and hybrid professionals seeking a reliable workspace.',
        outcome: 'Peak productive focus, seamless power reliability, and a clean professional environment in Kisumu.',
        stats: [
          { value: 'High Speed', label: 'Internet connection' },
          { value: '100%', label: 'Generator backup' },
          { value: '8 AM–6 PM', label: 'Day pass access' },
        ],
        features: [
          {
            title: 'Flexible Ergonomic Workstation in Open Hall',
            desc: 'Access to spacious desks with ergonomic task seating and readily accessible power sockets for laptops and devices.',
          },
          {
            title: 'Dependable Internet with Auto-Failover',
            desc: 'Stable commercial internet connectivity with backup links for smooth video calls and online work.',
          },
          {
            title: '100% Uninterrupted Power Generator Backup',
            desc: 'Automatic on-site power backup systems ensure uninterrupted electricity, lighting, and power during grid fluctuations.',
          },
          {
            title: 'Individual Power & Charging Outlets',
            desc: 'Dedicated surge-protected power sockets and USB charging ports accessible directly at every desk.',
          },
          {
            title: 'Air-Conditioned Executive Workspace',
            desc: 'Climate-controlled, focus-driven professional open workspace engineered for uninterrupted output.',
          },
          {
            title: 'Front Desk Greeting & Sign-In',
            desc: 'Professional front-desk reception staff to greet you upon arrival and assist with workspace check-in.',
          },
          {
            title: 'Communal Breakout Lounges',
            desc: 'Break out of your desk into comfortable lounge seating and quiet common areas between work sessions.',
          },
          {
            title: 'Document Printing & Scanning Station',
            desc: 'Convenient document scanning and printing facilities for preparing client contracts and notes.',
          },
        ],
        detailsTitle: 'A professional place to get into the work.',
        detailsIntro: 'Skip noisy public spaces and home distractions. Our hot desks provide a calm, focus-driven environment engineered for output.',
        operational: [
          { label: 'Purchase online or on arrival', detail: 'Book a single full-day pass or a multi-day flexi bundle directly through the client portal with instant confirmation.' },
          { label: 'Check in with reception', detail: 'Check in at the front desk, receive your Wi-Fi credentials, and choose your favorite open workstation.' },
          { label: 'Work with peace of mind', detail: 'Enjoy quiet focus, reliable power, and a clean professional space all day long.' },
        ],
      }}
    />
  )
}
