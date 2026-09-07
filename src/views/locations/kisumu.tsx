'use client'

import { GenericLocationPage } from './generic-location'

export default function KisumuPage() {
  return (
    <GenericLocationPage config={{
      city: 'Kisumu',
      building: 'Kisumu CBD Commercial Center',
      street: 'Oginga Odinga Street',
      heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&auto=format&q=80',
      tagline: "Western Kenya's rising commercial capital.",
      description: "Tap into the Lake Victoria basin — one of Africa's most dynamic cross-border markets. A Kisumu CBD address gives you the credibility to compete in Western Kenya and beyond.",
      marketIntro: "Kisumu sits at the shore of Lake Victoria, the world's largest tropical lake, and commands trade routes stretching into Uganda, Tanzania, Rwanda, and the DRC. The city is experiencing a fintech and SME renaissance — driven by mobile money, trade, and a young, entrepreneurial workforce. Kisumu CBD is where financial institutions, enterprises, and regional operations base themselves.",
      stats: [
        { value: 'Top 3', label: 'Fastest-Growing Kenyan Cities' },
        { value: '4+', label: 'Countries in Trade Reach' },
        { value: 'From KES 3,500', label: 'Starting From / Month' },
        { value: '24 hr', label: 'Address Activation' },
      ],
      reasons: [
        'Premier commercial address in Kisumu CBD — Western Kenya\'s commercial center.',
        'Proximity to Lake Victoria trade corridors linking Kenya, Uganda, and Tanzania.',
        'Rapidly growing fintech and mobile-money ecosystem making Kisumu a startup hotspot.',
        'Gateway to cross-border markets in Uganda, Tanzania, Rwanda, and eastern DRC.',
        'Strong corporate and development-sector presence driving B2B demand.',
        'Government investment in the Kisumu SEZ accelerating industrial growth.',
      ],
      services: [
        { num: '01', title: 'Virtual Office', desc: 'Full Kisumu CBD professional identity — business address, mail handling, and meeting room access.' },
        { num: '02', title: 'Business Address', desc: 'Use our Kisumu CBD address for company registration, banking, and official correspondence.' },
        { num: '03', title: 'Mail & Package Handling', desc: 'We receive and safely store your letters — with digital scans available on demand.' },
        { num: '04', title: 'Mail Forwarding', desc: 'Original documents forwarded locally to your physical address anywhere in Kenya.' },
        { num: '05', title: 'Meeting Room', desc: 'Private 4K presentation meeting room in Kisumu CBD — bookable by the hour.' },
        { num: '06', title: 'Day Passes & Hot Desks', desc: 'Ergonomic workstations with generator backup and high-speed Wi-Fi in Kisumu CBD.' },
      ],
      faqs: [
        {
          q: 'Can I use a Kisumu address for cross-border trade registration with Uganda or Tanzania?',
          a: 'Yes. A Kisumu address is strategically advantageous for businesses that trade with Uganda, Tanzania, and Rwanda. East African Community (EAC) partners are familiar with Kisumu as a border-adjacent commercial hub, and the address supports cross-border documentation and licensing.',
        },
        {
          q: 'Is Kisumu CBD the primary commercial area for a business address in Kisumu?',
          a: 'Yes — Kisumu CBD is the commercial heartbeat of the city, housing county government offices, major banks, corporate headquarters, and leading professional service firms. A Kisumu CBD address signals that your business is established and credible.',
        },
        {
          q: 'Does Kisumu have good connectivity for businesses needing to travel frequently?',
          a: 'Kisumu International Airport offers daily flights to Nairobi, with connections to Kampala, Addis Ababa, and beyond. The city also sits on the main Nairobi–Uganda highway, making road travel straightforward for regional operations.',
        },
        {
          q: 'Is this address suitable for businesses and organisations?',
          a: 'Absolutely. Kisumu is home to a large commercial and development sector presence. Our address is accepted for registration by national and county authorities.',
        },
        {
          q: 'How does the Kisumu SEZ affect my business if I use this address?',
          a: 'The Kisumu Special Economic Zone is driving significant investment and industrial activity in the region. A Kisumu business address positions you to engage with SEZ tenants, suppliers, and government bodies overseeing the zone — a growing source of B2B opportunity.',
        },
        {
          q: 'What happens when a client or delivery person arrives at the address?',
          a: 'Our front-desk team greets visitors and delivery personnel during business hours. We receive and log letters and packages, notifying you immediately via email and your online portal.',
        },
      ],
    }} />
  )
}
