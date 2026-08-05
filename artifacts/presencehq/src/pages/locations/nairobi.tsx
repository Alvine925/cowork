import { GenericLocationPage } from './generic-location'

export default function NairobiPage() {
  return (
    <GenericLocationPage config={{
      city: 'Nairobi',
      building: 'Westlands Business Park',
      street: 'Waiyaki Way, Westlands',
      heroImage: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&auto=format&q=80',
      tagline: "East Africa's business nerve centre.",
      description: "Position your company at the heart of East Africa's most prestigious corporate district. A Westlands address signals stability, success, and global ambition.",
      marketIntro: "Nairobi is the undisputed financial capital of East Africa — home to the Nairobi Securities Exchange, the African headquarters of over 100 multinationals, and a rapidly expanding tech and startup ecosystem. Westlands places your business at the very centre of this energy, within walking distance of major banks, law firms, and international embassies. Clients and partners recognise the postcode instantly.",
      stats: [
        { value: '#1', label: 'Business Hub in East Africa' },
        { value: '100+', label: 'Multinationals Headquartered Here' },
        { value: 'KES 2,500', label: 'Starting From / Month' },
        { value: '24 hr', label: 'Address Activation' },
      ],
      reasons: [
        'Globally recognised as a Tier-1 African business district — banks and embassies take it seriously.',
        'Immediate credibility with KRA, government regulators, and financial institutions.',
        'Walking distance to major law firms, Big 4 audit offices, and enterprise clients.',
        'Central accessibility via Waiyaki Way with direct links to JKIA airport.',
        'Thriving tech ecosystem: Silicon Savannah startups and Fortune 500 neighbours.',
        'Stronger investor confidence — Westlands addresses close deals faster.',
      ],
      services: [
        { num: '01', title: 'Virtual Office', desc: 'Your complete Westlands identity — prime address, dedicated mail management, and a professional receptionist under one plan.' },
        { num: '02', title: 'Business Address', desc: 'Register your company at Westlands Business Park for KRA, bank accounts, and all official correspondence.' },
        { num: '03', title: 'Mail & Package Handling', desc: 'We receive, log, and securely store every item addressed to you. Scan-on-demand available within hours.' },
        { num: '04', title: 'Global Mail Forwarding', desc: 'Physical forwarding or high-resolution digital scans sent to anywhere in the world — weekly or on-demand.' },
        { num: '05', title: 'Boardroom & Meeting Rooms', desc: 'Fully equipped Westlands boardrooms bookable by the hour — AV, Wi-Fi, and reception included.' },
        { num: '06', title: 'Company Registration', desc: 'End-to-end KRA PIN, business registration, and compliance — handled by our in-house specialists.' },
      ],
    }} />
  )
}
