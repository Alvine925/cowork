import { GenericLocationPage } from './generic-location'

export default function MombasaPage() {
  return (
    <GenericLocationPage config={{
      city: 'Mombasa',
      building: 'Nyali Executive Tower',
      street: 'Links Road, Nyali',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1800&auto=format&q=80',
      tagline: "Kenya's coastal gateway to global trade.",
      description: "Establish your presence in Kenya's second largest city — the ancient port connecting East Africa to the world. A Nyali address puts you inside the engine of coastal commerce.",
      marketIntro: "Mombasa is Kenya's principal maritime hub, handling over 30 million tonnes of cargo annually through the Port of Mombasa — the largest port in East Africa. Nyali has emerged as the city's premier executive district, attracting shipping companies, logistics multinationals, tourism operators, and blue-economy investors. A Nyali Executive Tower address places you at the crossroads of coastal enterprise and international trade.",
      stats: [
        { value: '#1', label: 'Port in East Africa' },
        { value: '30M+', label: 'Tonnes Cargo / Year' },
        { value: 'KES 2,500', label: 'Starting From / Month' },
        { value: '24 hr', label: 'Address Activation' },
      ],
      reasons: [
        'Nyali is Mombasa\'s most prestigious executive corridor — recognised by banks and multinationals.',
        'Direct access to port, logistics, and maritime industry networks.',
        'Gateway to the blue economy: tourism, fisheries, and shipping all headquartered here.',
        'Strong reach into coastal and East African island markets.',
        'Credibility with international shipping lines and hospitality groups.',
        'Fast-growing industrial SEZ and Dongo Kundu Free Trade Zone nearby.',
      ],
      services: [
        { num: '01', title: 'Virtual Office', desc: 'A complete Nyali professional identity — prestigious address, mail handling, and reception in one package.' },
        { num: '02', title: 'Business Address', desc: 'Use Nyali Executive Tower for KRA, company registration, bank accounts, and all formal correspondence.' },
        { num: '03', title: 'Mail & Package Handling', desc: 'Secure receipt, logging, and storage of all business mail — with digital scan-on-demand available same day.' },
        { num: '04', title: 'Global Mail Forwarding', desc: 'Forward parcels and documents anywhere in the world — weekly schedule or on-request.' },
        { num: '05', title: 'Meeting Rooms', desc: 'Air-conditioned, fully equipped boardrooms in Nyali — ideal for client meetings and partner negotiations.' },
        { num: '06', title: 'Business Expansion Support', desc: 'Instant coastal footprint for Nairobi-based businesses expanding south — no lease, immediate presence.' },
      ],
    }} />
  )
}
