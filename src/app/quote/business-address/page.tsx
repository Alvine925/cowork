import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Business Address Quote in Kisumu CBD | Paper Street',
  description:
    'Generate an official institutional membership proposal and pricing quotation for Business Address at Paper Street Workspaces Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.co.ke/quote/business-address' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="business-address" />
}
