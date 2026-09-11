'use client'

import { GenericServicePage } from './generic-service'

export default function VirtualOfficePage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Complete Workspace Solution',
        title: 'Virtual Office.',
        subtitle: 'A full professional business presence with prime commercial address, mail handling, and meeting room access.',
        image: '/virtual-office.webp',
        imageAlt: 'Paper Street Virtual Office Space in Kisumu',
        description:
          'A virtual office brings together all the essential components of an established office: a prestigious commercial business address, reliable mail handling and scanning, front-desk client greeting, and on-demand access to our meeting room and coworking desks.',
        audience: 'For startups, remote companies, regional enterprises, and consultants who need a complete professional base in Kisumu.',
        outcome: 'Everything you need to run your business professionally without the high cost and commitment of a traditional office lease.',
        stats: [
          { value: '24 hrs', label: 'Setup time' },
          { value: 'All-in-One', label: 'Workspace package' },
          { value: 'Zero', label: 'Lease commitment' },
        ],
        features: [
          {
            title: 'Prime Commercial Business Address',
            desc: 'Use our prestigious commercial building address in Kisumu CBD on your company registration, website, marketing materials, and client communications.',
          },
          {
            title: 'Mail & Package Receiving',
            desc: 'Our front-desk team receives, signs for, and securely stores all your incoming business mail and packages.',
          },
          {
            title: 'Digital Mail Scanning',
            desc: 'Receive high-resolution digital scans of your incoming letters directly in your portal so you can read your mail from anywhere.',
          },
          {
            title: 'Mail Forwarding',
            desc: 'Have original physical mail and packages forwarded to your home or office address whenever you need the originals.',
          },
          {
            title: 'Professional Reception & Guest Greeting',
            desc: 'Our dedicated front-desk team greets your visiting clients and partners professionally when they visit the hub.',
          },
          {
            title: 'Meeting Room Credits',
            desc: 'Monthly inclusive hours to book our fully-equipped private 4K presentation meeting room in Kisumu.',
          },
          {
            title: 'Drop-In Coworking Access',
            desc: 'Access to open desks, high-speed fibre Wi-Fi, generator backup, and lounge spaces whenever you need a place to work.',
          },
          {
            title: 'Secure Document Archiving',
            desc: 'Searchable digital vault storing your historic mail scans, delivery receipts, and verification documents safely.',
          },
        ],
        detailsTitle: 'A complete operating presence for your business in Kisumu.',
        detailsIntro: 'Virtual office gives your company an established, credible foundation with the freedom to work from anywhere.',
        operational: [
          { label: 'Quick setup', detail: 'Choose your plan and we activate your commercial address and client portal within 24 hours.' },
          { label: 'Seamless daily management', detail: 'Our front desk greets your visiting guests and logs your incoming mail automatically.' },
          { label: 'Book workspace anytime', detail: 'Use your included credits to reserve the meeting room or drop in to work whenever you need a desk.' },
        ],
      }}
    />
  )
}