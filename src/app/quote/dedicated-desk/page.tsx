import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Dedicated Desk Quote in Kisumu CBD | Paper Street',
  description:
    'Generate an official institutional membership proposal and pricing quotation for Dedicated Desk at Paper Street Workspaces Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.co.ke/quote/dedicated-desk' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="dedicated-desk" />
}
