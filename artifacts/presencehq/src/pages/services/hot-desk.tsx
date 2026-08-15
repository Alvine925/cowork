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
        detailsTitle: 'Drop in without losing your working rhythm.',
        detailsIntro: 'Hot desk access is for the days when the kitchen table is not enough, but a permanent commitment is more than you need.',
        operational: [
          { label: 'Book your day', detail: 'Confirm your preferred day and location with the team, then arrive during standard access hours with your identification.' },
          { label: 'Settle in quickly', detail: 'Choose an available desk, connect to the fibre network and use communal printing and shared amenities without a complicated check-in.' },
          { label: 'Make the day count', detail: 'Use the environment for focused work, calls and collaboration, with discounted meeting room access when privacy matters.' },
        ],
      }}
    />
  )
}
