import { GenericServicePage } from './generic-service'

export default function DedicatedDeskPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Dedicated Desk.',
        subtitle: 'Your own permanent workspace in a premium shared environment.',
        image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1600&auto=format&q=80',
        description:
          'A dedicated desk is your personal, reserved workspace in our shared office environment. Lock your belongings, leave your setup, and return to the same desk every day. Available 24/7 with 24-hour key card access.',
        features: [
          '24/7 key card access to your desk',
          'Lockable pedestal storage',
          'Dedicated monitor and keyboard (on select plans)',
          'High-speed fibre WiFi',
          'Business address and mail handling included',
          'Discounted meeting room bookings',
        ],
        detailsTitle: 'A permanent setup, without a private-office lease.',
        detailsIntro: 'Dedicated desk members get continuity: a reserved place for their daily tools, plus access to the wider Paper Street environment when the work expands.',
        operational: [
          { label: 'Make it yours', detail: 'We allocate your reserved desk and confirm storage, access and any equipment requirements before your first working day.' },
          { label: 'Work on your schedule', detail: 'Key-card access supports early starts, late finishes and the flexible working patterns that small teams often need.' },
          { label: 'Use the wider base', detail: 'Move into a meeting room for a client conversation, use mail support and keep your business address in one capable place.' },
        ],
      }}
    />
  )
}
