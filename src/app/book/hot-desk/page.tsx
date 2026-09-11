import type { Metadata } from 'next'
import IndividualBookingPage from '@/views/individual-booking'

export const metadata: Metadata = {
  title: 'Book Hot Desk & Day Passes in Kisumu CBD | Paper Street',
  description:
    'Drop-in half-day and full-day coworking passes in Kisumu CBD with standby generator backup power, high-speed fibre Wi-Fi, and phone booths.',
  alternates: { canonical: 'https://paperstreet.co.ke/book/hot-desk' },
}

export default function Page() {
  return <IndividualBookingPage slug="hot-desk" />
}
