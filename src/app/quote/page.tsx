import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Workspace & Membership Quotation | Paper Street Kisumu',
  description: 'Request an official tailored membership quotation for Virtual Office, Business Address, or Dedicated Workstations in Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.africa/quote' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="virtual-office" />
}
