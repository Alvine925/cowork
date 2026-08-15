import { GenericServicePage } from './generic-service'

export default function ReceptionServicesPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Reception Services.',
        subtitle: 'Professional receptionists representing your business, every call.',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&q=80',
        description:
          'Our trained receptionists answer calls and greet visitors in your company name, just as if they were your own employees. Every interaction is handled with professionalism and discretion, reinforcing your brand.',
        features: [
          'Calls answered in your company name',
          'Message taking and email notification',
          'Visitor greeting and management',
          'Appointment scheduling support',
          'Bilingual staff (English & Swahili)',
          'Monthly call logs and reports',
        ],
        detailsTitle: 'Your front desk, briefed properly.',
        detailsIntro: 'Good reception is not a script. We learn the names, tone and routing preferences that help every caller or visitor feel expected.',
        operational: [
          { label: 'Set your call brief', detail: 'Share your company name, pronunciation, opening hours, escalation contacts and the messages that should reach you first.' },
          { label: 'Answer with context', detail: 'Calls are greeted in your company name and messages are captured clearly, with English and Swahili support available.' },
          { label: 'Review the pattern', detail: 'Monthly reporting helps you see call volumes, common requests and where your customer experience can improve.' },
        ],
      }}
    />
  )
}
