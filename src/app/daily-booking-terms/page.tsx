import { Metadata } from 'next'
import DailyBookingTermsView from '@/views/daily-booking-terms'

export const metadata: Metadata = {
  title: 'Daily Booking Terms & Cancellation Policy | Paper Street Workspaces',
  description: 'Terms, conditions, and cancellation policies for short-term workspace bookings, day passes, hot desks, and meeting rooms at Paper Street Kisumu CBD.',
  alternates: {
    canonical: 'https://paperstreet.co.ke/daily-booking-terms',
  },
}

export default function DailyBookingTermsPage() {
  return <DailyBookingTermsView />
}
