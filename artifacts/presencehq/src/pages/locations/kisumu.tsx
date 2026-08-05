import { GenericLocationPage } from './generic-location'

export default function KisumuPage() {
  return (
    <GenericLocationPage config={{
      city: 'Kisumu',
      building: 'Milimani Corporate Center',
      street: 'Oginga Odinga Street',
      heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&auto=format&q=80',
      tagline: "Western Kenya's rising commercial capital.",
      description: "Tap into the Lake Victoria basin — one of Africa's most dynamic cross-border markets. A Milimani address gives you the credibility to compete in Western Kenya and beyond.",
      marketIntro: "Kisumu sits at the shore of Lake Victoria, the world's largest tropical lake, and commands trade routes stretching into Uganda, Tanzania, Rwanda, and the DRC. The city is experiencing a fintech and SME renaissance — driven by mobile money, agricultural exports, and a young, entrepreneurial workforce. Milimani, Kisumu's executive district, is where banks, NGOs, and regional headquarters are choosing to base themselves.",
      stats: [
        { value: 'Top 3', label: 'Fastest-Growing Kenyan Cities' },
        { value: '4+', label: 'Countries in Trade Reach' },
        { value: 'KES 2,500', label: 'Starting From / Month' },
        { value: '24 hr', label: 'Address Activation' },
      ],
      reasons: [
        'Premier commercial address in Milimani — Western Kenya\'s most respected business district.',
        'Proximity to Lake Victoria trade corridors linking Kenya, Uganda, and Tanzania.',
        'Rapidly growing fintech and mobile-money ecosystem making Kisumu a startup hotspot.',
        'Gateway to cross-border markets in Uganda, Tanzania, Rwanda, and eastern DRC.',
        'Strong NGO and development-sector presence driving B2B demand.',
        'Government investment in the Kisumu SEZ accelerating industrial growth.',
      ],
      services: [
        { num: '01', title: 'Virtual Office', desc: 'Full Milimani professional identity — business address, mail handling, and live reception bundled.' },
        { num: '02', title: 'Business Address', desc: 'Use Milimani Corporate Center for KRA registration, banking, and all official company correspondence.' },
        { num: '03', title: 'Mail & Package Handling', desc: 'We receive, sort, and securely store your mail — with digital scanning available on demand.' },
        { num: '04', title: 'Global Mail Forwarding', desc: 'Documents and parcels forwarded locally or internationally on a schedule that works for you.' },
        { num: '05', title: 'Meeting Rooms', desc: 'Professional boardrooms in the heart of Milimani — bookable by the hour, no membership required.' },
        { num: '06', title: 'Business Expansion', desc: 'Instant Western Kenya footprint for businesses expanding from Nairobi — same-day activation.' },
      ],
    }} />
  )
}
