import { GenericServicePage } from './generic-service'

export default function MailForwardingPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Mail Forwarding.',
        subtitle: 'Your mail delivered wherever you are — digitally or physically.',
        image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&auto=format&q=80',
        description:
          'Get your mail no matter where you are in the world. Choose digital scanning for instant access to documents, or physical forwarding for packages and original documents. We batch and forward on your preferred schedule.',
        features: [
          'Digital scan and email delivery for documents',
          'Physical forwarding to any address in Kenya or globally',
          'Weekly, bi-weekly, or on-demand forwarding schedules',
          'Tracked and insured courier service',
          'Package consolidation to reduce shipping costs',
          'Secure document handling protocols',
        ],
        detailsTitle: 'Forwarding that follows your working rhythm.',
        detailsIntro: 'Choose speed for important documents, consolidation for efficiency, or a regular schedule that lets you travel without leaving your post behind.',
        operational: [
          { label: 'Choose digital or physical', detail: 'Request a secure scan for a quick decision, or ask us to prepare originals and parcels for a tracked courier.' },
          { label: 'Set a rhythm', detail: 'Forward on demand, weekly or fortnightly. We can hold and consolidate items when that reduces unnecessary courier charges.' },
          { label: 'Track what leaves', detail: 'We confirm the contents, destination and courier reference so you have a clean record from our desk to yours.' },
        ],
      }}
    />
  )
}
