import { GenericLocationPage } from './generic-location'

export default function NakuruPage() {
  return (
    <GenericLocationPage config={{
      city: 'Nakuru',
      building: 'Central Business Plaza',
      street: 'Kenyatta Avenue',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&q=80',
      description: 'Establish credibility in Kenya\'s fourth largest city — the commercial hub of the Rift Valley, with strong agricultural and logistics sectors.',
      reasons: [
        'Prime address in Nakuru\'s central business district',
        'Access to Rift Valley agricultural and trade networks',
        'Growing manufacturing and logistics base',
        'Excellent connectivity to Nairobi and western Kenya',
      ],
    }} />
  )
}
