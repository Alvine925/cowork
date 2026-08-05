import { GenericServicePage } from './generic-service'

export default function BusinessAddressPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Business Address.',
        subtitle: 'A prestigious registered address without the cost of physical office space.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80',
        description:
          'Your business address is the first thing clients, banks, and government agencies see. Our prime addresses in Nairobi, Mombasa, and across Kenya immediately communicate credibility. Use it on your website, business cards, company registration, and bank account applications.',
        features: [
          'Use for company registration with Registrar of Companies',
          'Accepted by major Kenyan banks for account opening',
          'Listed on your website, letterhead, and business cards',
          'Receive official government correspondence',
          'Access to physical mail and package handling',
          'Monthly notification of received mail',
        ],
      }}
    />
  )
}
