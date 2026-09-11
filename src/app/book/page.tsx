import type { Metadata } from 'next'
import BookingPage from '@/views/book'

export const metadata: Metadata = {
  title: 'Get a Quote or Book a Day Pass | Paper Street Kisumu',
  description:
    'Quote a virtual office or business address, book a Kisumu day pass, or reserve a meeting room. Dedicated desks available in the same hub.',
  alternates: { canonical: 'https://paperstreet.co.ke/book' },
}

export default function Page() {
  return <BookingPage />
}
