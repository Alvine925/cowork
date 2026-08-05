import { GenericServicePage } from './generic-service'

export default function HotDeskPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Hot Desk.',
        subtitle: 'Drop in and work from a professional environment whenever you need it.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80',
        description:
          'Our hot desk membership gives you access to a flexible, professional coworking environment. Perfect for entrepreneurs who need a change of scenery from home but don\'t require a permanent desk. Available during standard business hours.',
        features: [
          'Access during business hours (8 AM – 6 PM)',
          'Ergonomic seating and ample desk space',
          'High-speed fibre WiFi',
          'Access to communal printing facilities',
          'Complimentary tea and coffee',
          'Discounted access to meeting rooms',
        ],
      }}
    />
  )
}
