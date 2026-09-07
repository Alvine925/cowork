import type { Metadata } from 'next'
import BookingPage from '@/views/book'

export const metadata: Metadata = {
  title: 'Get a Quote or Book a Day Pass | Paper Street Kisumu',
  description: 'Quote a virtual office or business address, or book a day pass and meeting room in Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.africa/book' },
}

export default function Page() {
  return <BookingPage />
}
