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
        { value: 'KES 2,500', label: 'Starting From / Month' },
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
    }} />
  )
}
