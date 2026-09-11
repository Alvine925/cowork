import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Business Address Quote in Kisumu CBD | Paper Street',
  description:
    'Generate an official registered commercial business address quotation in Kisumu CBD for eCitizen company registration, KRA PIN, and banking.',
  alternates: { canonical: 'https://paperstreet.co.ke/quote/business-address' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="business-address" />
}
