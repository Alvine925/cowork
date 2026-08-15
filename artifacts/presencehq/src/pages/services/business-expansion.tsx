import { GenericServicePage } from './generic-service'

export default function BusinessExpansionPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'Service',
        title: 'Business Expansion.',
        subtitle: 'Establish a credible footprint in a new city within 24 hours.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&q=80',
        description:
          'Expanding into a new market is expensive and risky. With Paper Street, you can test a new city with a local business address, phone number, and reception service before committing to a physical lease. Our multi-city packages make expansion affordable for any sized business.',
        features: [
          'Instant presence in 5 Kenyan cities',
          'Unified billing for multiple locations',
          'Dedicated account manager for expansion clients',
          'Local phone numbers in each city',
          'Coordinated mail handling across locations',
          'Scale up or down as you grow',
        ],
        detailsTitle: 'A measured first step into a new market.',
        detailsIntro: 'Test demand, begin local conversations and create a credible signal before committing to a permanent footprint.',
        operational: [
          { label: 'Choose the market', detail: 'We map the location, address and local contact needs around the city or cities you are exploring.' },
          { label: 'Launch a local presence', detail: 'Set up address, phone and reception details in a coordinated way, with one account manager keeping the rollout together.' },
          { label: 'Learn before scaling', detail: 'Keep the footprint lean while you test demand, then add desks, rooms or a larger location when the evidence supports it.' },
        ],
      }}
    />
  )
}
