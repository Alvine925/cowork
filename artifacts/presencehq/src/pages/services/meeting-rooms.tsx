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
        detailsTitle: 'A room arranged around the meeting.',
        detailsIntro: 'Tell us who is coming and what the session needs to achieve. We prepare the practical details so you can focus on the conversation.',
        operational: [
          { label: 'Pick the right room', detail: 'Choose a compact room for focused work or a larger presentation setup for up to 20 guests, subject to location availability.' },
          { label: 'Arrive ready', detail: 'Your room is prepared with WiFi, display equipment, whiteboard supplies and refreshments before the first guest arrives.' },
          { label: 'Add support when needed', detail: 'Ask about guest reception, extra setup time, refreshments or recurring bookings for a predictable client experience.' },
        ],
      }}
    />
  )
}
