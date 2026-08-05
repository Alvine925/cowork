import { GenericLocationPage } from './generic-location'

export default function MombasaPage() {
  return (
    <GenericLocationPage config={{
      city: 'Mombasa',
      building: 'Nyali Executive Tower',
      street: 'Links Road, Nyali',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80',
      description: 'Establish your presence in Kenya\'s second largest city and premier coastal business hub, serving port, tourism, and logistics industries.',
      reasons: [
        'Prime address in Nyali, Mombasa\'s top business corridor',
        'Gateway to coastal and port-related industries',
        'Credibility with tourism and hospitality clients',
        'Strong access to regional East African markets',
      ],
    }} />
  )
}
