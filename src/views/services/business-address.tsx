'use client'

import { GenericServicePage } from './generic-service'

export default function BusinessAddressPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Regional Branch Presence',
        title: 'Business Address.',
        subtitle: 'Establish a local branch address and client contact point in Kisumu without the capital expense of a physical office.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80',
        imageAlt: 'Prime commercial building in Kisumu commercial district',
        description:
          'For businesses, organizations, and consultants headquartered in other cities or abroad who want to expand their reach into Western Kenya. A Kisumu business address gives you an official local commercial address to receive client inquiries, tenders, and correspondence while building trust with local clients in the Lake Victoria economic basin.',
        audience: 'For established enterprises, national companies, NGOs, and consultants looking to create a regional branch presence and client contact point in Kisumu.',
        outcome: 'A recognized local operating presence in Western Kenya that lets you serve regional clients without signing a commercial property lease.',
        stats: [
          { value: 'Same day', label: 'Setup time' },
          { value: 'Kisumu', label: 'Active regional hub' },
          { value: 'Zero', label: 'Branch lease cost' },
        ],
        features: [
          {
            title: 'Local Branch Business Address in Kisumu',
            desc: 'Establish a commercial address in Kisumu for your regional branch operations, client proposals, website contact page, and Western Kenya marketing.',
          },
          {
            title: 'Regional Mail & Inquiries Receiving',
            desc: 'Receive local client documents, tender packets, supplier contracts, and business mail at our Kisumu front desk with immediate digital notifications.',
          },
        ],
        detailsTitle: 'Expand into Kisumu without the overhead of a branch office.',
        detailsIntro: 'Serve Western Kenya clients with a credible local presence while running your primary operations from wherever you are based.',
        operational: [
          { label: 'Set up your Kisumu branch contact', detail: 'Choose your Kisumu business address plan and receive immediate activation for your team and marketing.' },
          { label: 'Connect with Western Kenya clients', detail: 'Feature your local Kisumu address on your website, tender submissions, and marketing campaigns to build local trust.' },
          { label: 'Receive mail and inquiries seamlessly', detail: 'Our front-desk team logs all incoming client deliveries and correspondence, notifying you instantly online.' },
        ],
      }}
    />
  )
}
