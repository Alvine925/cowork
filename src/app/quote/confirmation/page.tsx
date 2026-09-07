import type { Metadata } from 'next'
import QuoteConfirmationView from '@/views/quote-confirmation'

export const metadata: Metadata = {
  title: 'Membership Quotation Confirmation | Paper Street Kisumu',
  description: 'Your tailored Paper Street membership quotation has been generated and dispatched to your email.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <QuoteConfirmationView />
}
