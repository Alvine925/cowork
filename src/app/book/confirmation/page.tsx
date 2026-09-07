import type { Metadata } from 'next'
import BookingConfirmationView from '@/views/booking-confirmation'

export const metadata: Metadata = {
  title: 'Booking Confirmation & Official Receipt | Paper Street',
  description: 'View and download your official workspace booking receipt and check-in pass.',
}

export default function Page() {
  return <BookingConfirmationView />
}
