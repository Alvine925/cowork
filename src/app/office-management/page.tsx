import type { Metadata } from 'next'
import OfficeManagementPage from '@/views/services/office-management'

export const metadata: Metadata = {
  title: 'Office Management Services in Kenya | Paper Street',
  description:
    'Paper Street helps businesses establish and manage professional office spaces, from sourcing premises and furnishing to utilities, cleaning and ongoing office management.',
  keywords: [
    'office management Kenya',
    'managed office Kenya',
    'fully managed office Kisumu',
    'office sourcing Kenya',
    'office setup Kenya',
  ],
  openGraph: {
    title: 'Office Management Services in Kenya | Paper Street',
    description:
      'Paper Street helps businesses establish and manage professional office spaces, from sourcing premises and furnishing to utilities, cleaning and ongoing office management.',
    url: 'https://paperstreet.co.ke/office-management',
    type: 'website',
  },
  alternates: {
    canonical: 'https://paperstreet.co.ke/office-management',
  },
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Office Management Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Paper Street',
      url: 'https://paperstreet.co.ke',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kisumu',
        addressCountry: 'KE',
      },
    },
    description:
      'Paper Street helps businesses establish and manage professional office spaces, from sourcing premises and furnishing to utilities, cleaning and ongoing office management.',
    serviceType: 'Managed Office Solutions',
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    url: 'https://paperstreet.co.ke/office-management',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OfficeManagementPage />
    </>
  )
}
