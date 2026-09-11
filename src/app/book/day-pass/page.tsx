import type { Metadata } from 'next'
import IndividualBookingPage from '@/views/individual-booking'

export const metadata: Metadata = {
  title: 'Day Pass & Hot Desk Coworking | Paper Street Kisumu CBD',
  description: 'Book half-day and full-day passes in Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.co.ke/book/day-pass' },
}

export default function Page() {
  return <IndividualBookingPage slug="hot-desk" />
}
