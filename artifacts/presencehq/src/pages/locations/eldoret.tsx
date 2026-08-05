import { GenericLocationPage } from './generic-location'

export default function EldoretPage() {
  return (
    <GenericLocationPage config={{
      city: 'Eldoret',
      building: 'Zion Mall Hub',
      street: 'Uganda Road',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&auto=format&q=80',
      description: 'Plant your flag in North Rift\'s fastest-growing commercial centre, a strategic hub on the Northern Corridor connecting Kenya to Uganda.',
      reasons: [
        'Strategic location on the Northern Transport Corridor',
        'Growing industrial and manufacturing base',
        'Access to North Rift agricultural markets',
        'Rapidly expanding professional services sector',
      ],
    }} />
  )
}
