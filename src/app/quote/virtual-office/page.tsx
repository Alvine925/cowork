import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Virtual Office Quote in Kisumu CBD | Paper Street',
  description:
    'Generate an official institutional membership proposal and pricing quotation for Virtual Office at Paper Street Workspaces Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.africa/quote/virtual-office' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="virtual-office" />
}
