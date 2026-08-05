import { GenericLocationPage } from './generic-location'

export default function KisumuPage() {
  return (
    <GenericLocationPage config={{
      city: 'Kisumu',
      building: 'Milimani Corporate Center',
      street: 'Oginga Odinga Street',
      image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1600&auto=format&q=80',
      description: 'Tap into the Lake Victoria basin market with a professional address in Kisumu\'s thriving commercial district.',
      reasons: [
        'Premier commercial address in Western Kenya',
        'Proximity to Lake Victoria trade corridors',
        'Gateway to Uganda and Tanzania markets',
        'Fast-growing SME and fintech ecosystem',
      ],
    }} />
  )
}
