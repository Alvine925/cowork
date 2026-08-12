import { GenericLocationPage } from './generic-location'

export default function NakuruPage() {
  return (
    <GenericLocationPage config={{
      city: 'Nakuru',
      building: 'Central Business Plaza',
      street: 'Kenyatta Avenue',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&auto=format&q=85',
      splitImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&q=85',
      overlayImage: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=1800&auto=format&q=80',
      tagline: "The Rift Valley's commercial powerhouse.",
      description: "Plant your flag in Kenya's fastest-urbanising city — the Rift Valley's economic engine and the gateway between Nairobi and Western Kenya.",
      marketIntro: "Nakuru is Kenya's fourth largest city and one of its fastest-growing urban economies, recently elevated to city status. Sitting at the heart of the Rift Valley, it commands the agricultural, manufacturing, and logistics networks that feed East Africa. Kenyatta Avenue — where Central Business Plaza stands — is Nakuru's primary commercial artery, frequented by agribusiness executives, county government officials, and expanding regional enterprises.",
      stats: [
        { value: 'Top 4', label: 'Largest City in Kenya' },
        { value: '#1', label: 'Rift Valley Commercial Hub' },
        { value: 'KES 4,200', label: 'Starting From / Month' },
        { value: '24 hr', label: 'Address Activation' },
      ],
      reasons: [
        'Prime Kenyatta Avenue address — the most recognisable commercial street in the Rift Valley.',
        'Gateway to Kenya\'s agricultural heartland: dairy, horticulture, and grain networks.',
        'Direct road links to Nairobi (2 hrs), Kisumu, and western Kenya.',
        'Growing manufacturing base — light industry, food processing, and logistics hubs nearby.',
        'County government and devolved institutions headquartered here — strong regulatory access.',
        'Rapidly expanding real estate and professional services sector driving B2B opportunity.',
      ],
      services: [
        { num: '01', title: 'Virtual Office', desc: 'A complete Rift Valley business identity — Kenyatta Avenue address, mail, and reception in one plan.' },
        { num: '02', title: 'Business Address', desc: 'Register at Central Business Plaza for KRA, bank accounts, and all formal business correspondence.' },
        { num: '03', title: 'Mail & Package Handling', desc: 'Secure receipt and storage of all your business mail — digital scanning available same day.' },
        { num: '04', title: 'Global Mail Forwarding', desc: 'Physical or digital forwarding of documents and parcels anywhere in Kenya or internationally.' },
        { num: '05', title: 'Meeting Rooms', desc: 'Professional boardrooms on Kenyatta Avenue — bookable by the hour for client and partner meetings.' },
        { num: '06', title: 'Business Expansion', desc: 'Instant Rift Valley presence for Nairobi companies expanding their regional footprint.' },
      ],
      faqs: [
        {
          q: 'Is Kenyatta Avenue the best address for a business in Nakuru?',
          a: 'Yes — Kenyatta Avenue is Nakuru\'s main commercial street and the most recognised business address in the Rift Valley. Banks, county offices, and major businesses all operate along or adjacent to this corridor, making it the obvious choice for professional credibility.',
        },
        {
          q: 'Can I use this address to engage with the agricultural sector in the Rift Valley?',
          a: 'Absolutely. Nakuru is the heart of Kenya\'s dairy, horticulture, and grain industries. A Nakuru Central Business Plaza address immediately signals to agribusiness clients, cooperatives, and commodity traders that you are a serious regional player.',
        },
        {
          q: 'How long does it take to drive from Nakuru to Nairobi?',
          a: 'Nakuru is approximately 160 km from Nairobi via the Nakuru–Naivasha highway — roughly 2 hours by road. The city\'s strategic location midway between Nairobi and western Kenya makes it ideal for businesses serving both markets.',
        },
        {
          q: 'Is this address accepted by Nakuru County Government for licencing?',
          a: 'Yes. Central Business Plaza is within Nakuru\'s central business district, and the address is fully accepted for county business licencing, regulatory filings, and all devolved government dealings.',
        },
        {
          q: 'Can Nairobi-based companies use this to establish a Rift Valley presence?',
          a: 'That\'s one of the most common use cases. Companies headquartered in Nairobi use our Nakuru address to project a credible regional presence for clients, partners, and government bodies in the Rift Valley — without the cost of a physical branch office.',
        },
        {
          q: 'Is Nakuru well-connected to logistics and transport infrastructure?',
          a: 'Yes. Nakuru sits at a key junction of the Great Rift Valley Road and is served by the SGR freight corridor. It\'s a natural logistics hub for goods moving between Nairobi, Kisumu, Eldoret, and northern Kenya.',
        },
      ],
    }} />
  )
}
