import { GenericLocationPage } from './generic-location'

export default function EldoretPage() {
  return (
    <GenericLocationPage config={{
      city: 'Eldoret',
      building: 'Zion Mall Hub',
      street: 'Uganda Road',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&auto=format&q=80',
      tagline: "North Rift's fastest-moving business corridor.",
      description: "Stake your claim in North Rift's most ambitious commercial centre — a strategic node on the Northern Corridor linking Mombasa port to Uganda and South Sudan.",
      marketIntro: "Eldoret is Kenya's fifth largest city and one of the country's most strategically located commercial hubs — sitting astride Uganda Road, the Northern Corridor that carries over 80% of Uganda's imports and a significant share of South Sudan's. The city is home to JKUAT's Eldoret campus, a booming agri-industrial base, and a rapidly professionalising services sector. Uganda Road's Zion Mall Hub is where regional CEOs, logistics operators, and county government meet.",
      stats: [
        { value: 'Top 5', label: 'Largest City in Kenya' },
        { value: '80%', label: 'Uganda Imports via This Corridor' },
        { value: 'KES 4,200', label: 'Starting From / Month' },
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
      faqs: [
        {
          q: 'Is a Uganda Road address recognised by Ugandan businesses and cross-border partners?',
          a: 'Yes — Uganda Road is the literal highway connecting Kenya to Kampala, and Eldoret businesses are well-known to Ugandan importers, exporters, and logistics companies. An Eldoret address signals that you are serious about the Northern Corridor trade route.',
        },
        {
          q: 'Can logistics and freight companies use this address for their operations?',
          a: 'Absolutely. Logistics, freight forwarding, and clearing & forwarding businesses are among our most common Eldoret clients. The address is accepted by KEBS, KRA, and all relevant authorities for transport and logistics licencing.',
        },
        {
          q: 'How does Eldoret compare to having a Nairobi address for North Rift clients?',
          a: 'A Nairobi address can feel distant and impersonal to clients in Eldoret, Kitale, Iten, or Kapsabet. An Eldoret address demonstrates genuine local presence — clients in the North Rift prefer to work with companies they feel are accessible and committed to the region.',
        },
        {
          q: 'Can agricultural businesses use this address for their cooperative or agribusiness?',
          a: 'Yes. Eldoret is the centre of North Rift\'s wheat, maize, and dairy industries. Our address is used by grain traders, input suppliers, agri-tech startups, and processing companies for KRA, county licencing, and all formal correspondence.',
        },
        {
          q: 'Is Eldoret well-connected by air?',
          a: 'Yes — Eldoret International Airport is one of Kenya\'s busiest airports, with scheduled flights to Nairobi multiple times daily. It also handles cargo operations, which is significant for agribusiness and logistics clients in the region.',
        },
        {
          q: 'Can South Sudan-focused businesses use an Eldoret address?',
          a: 'Eldoret is a major staging point for goods transiting to South Sudan via the northern route through Lokichoggio. Businesses involved in South Sudan trade, aid logistics, or construction supply chains frequently use Eldoret addresses as their Kenya base.',
        },
      ],
    }} />
  )
}
