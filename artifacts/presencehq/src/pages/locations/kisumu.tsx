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
      faqs: [
        {
          q: 'Can I use a Kisumu address for cross-border trade registration with Uganda or Tanzania?',
          a: 'Yes. A Kisumu address is strategically advantageous for businesses that trade with Uganda, Tanzania, and Rwanda. East African Community (EAC) partners are familiar with Kisumu as a border-adjacent commercial hub, and the address supports cross-border documentation and licensing.',
        },
        {
          q: 'Is Milimani the most prestigious area for a business address in Kisumu?',
          a: 'Yes — Milimani is Kisumu\'s executive and residential district, housing county government offices, major banks, NGO headquarters, and leading professional service firms. A Milimani Corporate Center address signals that your business is established and credible.',
        },
        {
          q: 'Does Kisumu have good connectivity for businesses needing to travel frequently?',
          a: 'Kisumu International Airport offers daily flights to Nairobi, with connections to Kampala, Addis Ababa, and beyond. The city also sits on the main Nairobi–Uganda highway, making road travel straightforward for regional operations.',
        },
        {
          q: 'Is this address suitable for NGOs and development organisations?',
          a: 'Absolutely. Kisumu is home to a large NGO, UN, and development sector presence. Milimani Corporate Center is accepted for registration by the NGO Coordination Board, county authorities, and international donor organisations.',
        },
        {
          q: 'How does the Kisumu SEZ affect my business if I use this address?',
          a: 'The Kisumu Special Economic Zone is driving significant investment and industrial activity in the region. A Kisumu business address positions you to engage with SEZ tenants, suppliers, and government bodies overseeing the zone — a growing source of B2B opportunity.',
        },
        {
          q: 'Can I receive mail from lake-based or island trading partners through this address?',
          a: 'Yes. Our team receives all mail and packages regardless of origin. Lake Victoria island trading partners and regional operators in Uganda and Tanzania frequently send correspondence to Kisumu business addresses. We handle everything securely.',
        },
      ],
    }} />
  )
}
