import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Dedicated Desk Quote in Kisumu CBD | Paper Street',
  description:
    'Generate an official tailored membership quotation for a permanent personal workstation with lockable pedestal storage, commercial business address, and monthly boardroom hours in Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.co.ke/quote/dedicated-desk' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="dedicated-desk" />
}
