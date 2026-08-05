import { GenericLocationPage } from './generic-location'

export default function EldoretPage() {
  return (
    <GenericLocationPage config={{
      city: 'Eldoret',
      building: 'Zion Mall Hub',
      street: 'Uganda Road',
      heroImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&auto=format&q=80',
      tagline: "North Rift's fastest-moving business corridor.",
      description: "Stake your claim in North Rift's most ambitious commercial centre — a strategic node on the Northern Corridor linking Mombasa port to Uganda and South Sudan.",
      marketIntro: "Eldoret is Kenya's fifth largest city and one of the country's most strategically located commercial hubs — sitting astride Uganda Road, the Northern Corridor that carries over 80% of Uganda's imports and a significant share of South Sudan's. The city is home to JKUAT's Eldoret campus, a booming agri-industrial base, and a rapidly professionalising services sector. Uganda Road's Zion Mall Hub is where regional CEOs, logistics operators, and county government meet.",
      stats: [
        { value: 'Top 5', label: 'Largest City in Kenya' },
        { value: '80%', label: 'Uganda Imports via This Corridor' },
        { value: 'KES 2,500', label: 'Starting From / Month' },
        { value: '24 hr', label: 'Address Activation' },
      ],
      reasons: [
        'Strategic Uganda Road address on the Northern Corridor — East Africa\'s busiest trade route.',
        'Growing industrial base: grain milling, dairy processing, and light manufacturing.',
        'Access to North Rift agricultural markets — wheat, maize, and horticulture exports.',
        'Proximity to Uganda border crossings accelerating cross-border trade credibility.',
        'Expanding university and tech ecosystem driving a professional services boom.',
        'County government and regional institutions headquartered in Eldoret — regulatory proximity.',
      ],
      services: [
        { num: '01', title: 'Virtual Office', desc: 'Full Uganda Road business identity — prestigious address, mail, and reception all in one package.' },
        { num: '02', title: 'Business Address', desc: 'Register your company at Zion Mall Hub for KRA compliance, banking, and formal correspondence.' },
        { num: '03', title: 'Mail & Package Handling', desc: 'We receive, catalogue, and securely store all business mail — digital scanning on demand.' },
        { num: '04', title: 'Global Mail Forwarding', desc: 'Documents and parcels forwarded anywhere in Kenya, Uganda, or internationally on your schedule.' },
        { num: '05', title: 'Meeting Rooms', desc: 'Professional, AV-equipped boardrooms on Uganda Road — bookable by the hour for any meeting.' },
        { num: '06', title: 'Business Expansion', desc: 'Instant North Rift presence for businesses based in Nairobi or Kampala expanding their reach.' },
      ],
    }} />
  )
}
