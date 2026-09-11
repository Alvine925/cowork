'use client'

import { GenericServicePage } from './generic-service'

export default function DedicatedDeskPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Resident Workspace',
        title: 'Dedicated Desk.',
        subtitle: 'Your personal permanent desk in Kisumu with lockable storage, generator power backup, and monthly meeting room credits.',
        image: '/dedicated-desk.webp',
        imageAlt: 'Paper Street personal permanent dedicated desk workstation in Kisumu',
        description:
          'Stop packing and unpacking your gear every day. A Dedicated Desk gives you an assigned personal workstation in Kisumu CBD where you can leave your monitors set up, lock away your documents, and get straight to work every morning.',
        audience: 'For independent software engineers, consultants, financial analysts, and founders needing a consistent daily base in Kisumu.',
        outcome: 'Zero morning setup friction, locked overnight equipment storage, and uninterrupted power reliability.',
        stats: [
          { value: 'Mon–Sat', label: 'Daytime access' },
          { value: 'Assigned', label: 'Permanent desk' },
          { value: 'Inclusive', label: 'Meeting room hours' },
        ],
        features: [
          {
            title: 'Permanent Assigned Workstation',
            desc: 'Your designated desk that remains reserved exclusively for you—leave your external monitors, keyboard, and setup in place every day.',
          },
          {
            title: 'Lockable Steel Pedestal Storage Drawer',
            desc: 'A heavy-duty under-desk mobile pedestal with personal keys to safely lock your laptop, documents, and valuables overnight.',
          },
          {
            title: '100% Uninterrupted Power Generator Backup',
            desc: 'Automatic backup power so grid outages in Kisumu never interrupt your video calls or work deliverables.',
          },
          {
            title: 'Monthly Meeting Room Credits',
            desc: 'Includes monthly booking hours in our private 4K presentation meeting room to host clients and partners.',
          },
          {
            title: 'Official Commercial Business Address',
            desc: 'Use our Kisumu CBD commercial address on your business cards, website, proposals, and client correspondence.',
          },
          {
            title: 'Dedicated Ethernet Port & Fast Wi-Fi',
            desc: 'Hardwired Ethernet port at your desk alongside redundant Wi-Fi for fast, dependable internet.',
          },
          {
            title: 'Ergonomic Task Chair',
            desc: 'High-comfort ergonomic chair with adjustable lumbar support and breathable mesh designed for long working hours.',
          },
          {
            title: 'Front Desk Mail & Parcel Receiving',
            desc: 'Our front desk receives and safely holds incoming packages and letters delivered to your desk.',
          },
        ],
        detailsTitle: 'A desk you can return to every single day.',
        detailsIntro: 'Eliminate daily desk hunting and packing up cables. Your dedicated workspace provides uninterrupted routine and serious productivity in Kisumu.',
        operational: [
          { label: 'Pick your desk', detail: 'Tour our space in Kisumu CBD and pick your personal desk near natural window light or quiet corners.' },
          { label: 'Key handover', detail: 'We set up your account and hand over your personal lockable storage drawer keys.' },
          { label: 'Set up & work', detail: 'Leave your monitors set up, get to work immediately, and use your meeting room hours whenever clients visit.' },
        ],
      }}
    />
  )
}
