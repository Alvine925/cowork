import { GenericServicePage } from './generic-service'

export default function CompanyRegistrationPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Company Registration.',
        subtitle: 'End-to-end assistance with legal company formation in Kenya.',
        image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1600&auto=format&q=80',
        description:
          'Our legal and business advisory partners handle your company registration from start to finish. We provide the registered address, assist with document preparation, and guide you through the entire process at the Registrar of Companies.',
        features: [
          'Full company registration with Registrar of Companies',
          'Registered address provided (required by law)',
          'KRA PIN registration for the company',
          'Certificate of Incorporation delivery',
          'Business permit assistance',
          'Ongoing registered office service included',
        ],
        detailsTitle: 'Formation support that respects the details.',
        detailsIntro: 'We help organise the practical route to incorporation while making clear where legal or regulatory advice belongs with our qualified partners.',
        operational: [
          { label: 'Prepare the information', detail: 'We confirm the proposed company details, directors, shareholders, contacts and the documents needed for the registration route.' },
          { label: 'Coordinate the filing', detail: 'Our legal and business advisory partners guide the submission and keep you informed about follow-up requests or missing details.' },
          { label: 'Keep the office live', detail: 'Once incorporated, continue with a registered office and mail-handling setup so official correspondence has somewhere dependable to go.' },
        ],
      }}
    />
  )
}
