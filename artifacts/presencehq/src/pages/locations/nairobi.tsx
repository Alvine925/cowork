import { GenericLocationPage } from './generic-location'

export default function NairobiPage() {
  return (
    <GenericLocationPage config={{
      city: 'Nairobi',
      building: 'Westlands Business Park',
      street: 'Waiyaki Way',
      image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&auto=format&q=80',
      description: 'Position your company in East Africa\'s most prestigious corporate district. A Westlands address signals stability, success, and ambition.',
      reasons: [
        'Recognised globally as a premium business district',
        'Immediate credibility with banks and government',
        'Close proximity to major corporate clients',
        'Central and accessible for physical meetings',
      ],
    }} />
  )
}
