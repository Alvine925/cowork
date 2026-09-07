import type { Metadata } from 'next'
import QuoteRequestView from '@/views/quote-request'

export const metadata: Metadata = {
  title: 'Request Virtual Office Quote in Kisumu CBD | Paper Street',
  description:
    'Generate an official membership quotation for your Kisumu CBD commercial address on Oginga Odinga Street with digital mail scanning and meeting room hours.',
  alternates: { canonical: 'https://paperstreet.africa/quote/virtual-office' },
}

export default function Page() {
  return <QuoteRequestView initialSlug="virtual-office" />
}
