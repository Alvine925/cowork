import { GenericServicePage } from './generic-service'

export default function MeetingRoomsPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Meeting Rooms.',
        subtitle: 'Premium, fully-equipped meeting rooms bookable by the hour.',
        image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&q=80',
        description:
          'Impress clients with professionally designed meeting rooms in prime locations. All rooms are equipped with high-speed WiFi, presentation screens, whiteboards, and complimentary refreshments. Book in advance or on the day — availability permitting.',
        features: [
          'Rooms seating 4 to 20 people',
          'HD projector and presentation screen',
          'High-speed fibre WiFi',
          'Whiteboard and markers',
          'Complimentary water and coffee',
          'Professional reception to greet your guests',
        ],
      }}
    />
  )
}
