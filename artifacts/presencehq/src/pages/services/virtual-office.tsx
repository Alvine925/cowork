import { GenericServicePage } from './generic-service'

export default function VirtualOfficePage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Core service',
        title: 'Virtual Office.',
        subtitle: 'A credible Kenyan base for the moments when your business needs to look established, responsive and ready.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80',
        imageAlt: 'Warm, light-filled workspace prepared for a professional team',
        description:
          'A virtual office brings the practical parts of a physical office together: a recognised business address, dependable mail support, a local point of contact and workspace access when the work calls for it. It is a flexible foundation for founders, remote teams and international businesses operating in Kenya.',
        audience: 'For founders starting properly, distributed teams growing carefully and international businesses testing a Kenyan market.',
        outcome: 'A professional operating base without the cost or commitment of a conventional lease.',
        stats: [
          { value: '24 hrs', label: 'Typical setup time' },
          { value: '5 cities', label: 'Kenyan presence' },
          { value: 'No lease', label: 'Required' },
        ],
        features: [
          'Commercial business address in your chosen Paper Street location',
          'Address guidance for approved company, banking and marketing uses',
          'Mail and package receiving with clear arrival notifications',
          'Secure storage until collection, scanning or forwarding is arranged',
          'Optional dedicated phone number and professional reception',
          'Hot desk and meeting room access when you need a physical base',
          'Support adding services as your company and team grow',
          'One local team to keep the practical details joined up',
        ],
        detailsTitle: 'A real operating base, assembled around your needs.',
        detailsIntro: 'Virtual office is not a mailbox alone. It is the dependable layer behind the address on your website, the documents moving through your business and the meetings that need somewhere credible to happen.',
        operational: [
          { label: 'Start with the essentials', detail: 'We confirm your business details, preferred city and intended use, then recommend the right combination of address, mail and workspace support.' },
          { label: 'Build trust into the details', detail: 'Your address, phone and reception preferences are set up consistently so clients and institutions get a clear, professional impression.' },
          { label: 'Add physical access when it matters', detail: 'Use a hot desk for focused work or book a meeting room for a client conversation without carrying a lease through quieter months.' },
        ],
      }}
    />
  )
}