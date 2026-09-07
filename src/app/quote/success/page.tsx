import type { Metadata } from 'next'
import QuoteSuccessView from '@/views/quote-success'

export const metadata: Metadata = {
  title: 'Quotation Sent Successfully | Paper Street Workspaces Kisumu',
  description: 'Your tailored Paper Street membership quotation proposal has been sent to your email.',
}

export default function Page() {
  return <QuoteSuccessView />
}
