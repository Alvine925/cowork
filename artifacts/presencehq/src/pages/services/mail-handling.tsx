import { GenericServicePage } from './generic-service'

export default function MailHandlingPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Mail Handling.',
        subtitle: 'Never miss an important piece of mail again. We receive, sort, and notify you.',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1600&auto=format&q=80',
        description:
          'Our reception team receives all mail and packages addressed to your business. We log every item, store it securely, and notify you by email the same day. Pick up in person, have it scanned, or have it forwarded — the choice is yours.',
        features: [
          'Signed receipt for all packages and registered mail',
          'Same-day email notification when mail arrives',
          'Secure climate-controlled mail storage',
          'Organized by date and type for easy pickup',
          'Digital photo scan of envelope available on request',
          'Dedicated mail log and history',
        ],
      }}
    />
  )
}
