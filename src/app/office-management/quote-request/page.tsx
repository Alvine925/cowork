import type { Metadata } from 'next'
import OfficeManagementQuotePage from '@/views/services/office-management-quote'

export const metadata: Metadata = {
  title: 'Request Office Management Proposal in Kenya | Paper Street',
  description:
    'Request a tailored managed office proposal for your business in Kisumu. Paper Street handles office sourcing, furnishing, utilities, and daily operations.',
  keywords: [
    'managed office quote Kenya',
    'office management proposal Kisumu',
    'office sourcing quote',
    'serviced office proposal Kisumu',
  ],
  openGraph: {
    title: 'Request Office Management Proposal | Paper Street',
    description:
      'Request a tailored managed office proposal for your business in Kisumu. Paper Street handles office sourcing, furnishing, utilities, and daily operations.',
    url: 'https://paperstreet.co.ke/office-management/quote-request',
    type: 'website',
  },
  alternates: {
    canonical: 'https://paperstreet.co.ke/office-management/quote-request',
  },
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Office Management Proposal Request',
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
      'Request a tailored managed office proposal for your business in Kisumu. Paper Street handles office sourcing, furnishing, utilities, and daily operations.',
    serviceType: 'Managed Office Solutions',
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    url: 'https://paperstreet.co.ke/office-management/quote-request',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OfficeManagementQuotePage />
    </>
  )
}

