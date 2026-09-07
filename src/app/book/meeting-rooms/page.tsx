import type { Metadata } from 'next'
import IndividualBookingPage from '@/views/individual-booking'

export const metadata: Metadata = {
  title: 'Book Meeting & Boardrooms in Kisumu CBD | Paper Street',
  description:
    'Reserve private executive meeting rooms and boardrooms by the hour or full-day with 4K screen, wireless casting, conference audio, and reception greeting in Kisumu CBD.',
  alternates: { canonical: 'https://paperstreet.africa/book/meeting-rooms' },
}

export default function Page() {
  return <IndividualBookingPage slug="meeting-rooms" />
}
