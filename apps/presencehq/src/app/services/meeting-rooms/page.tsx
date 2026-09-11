import type { Metadata } from 'next';
import MeetingRoomsClient from '@/views/services/meeting-rooms';

export const metadata: Metadata = {
  title: 'Meeting Rooms & Boardrooms in Nairobi | Paper Street',
  description:
    'Book modern boardrooms and meeting spaces in Westlands, Nairobi by the hour or day. Equipped with 4K video conferencing, fast WiFi, and coffee service.',
  keywords: ['meeting rooms Nairobi', 'boardroom rental Kenya', 'conference space Westlands'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/meeting-rooms',
  },
};

export default function MeetingRoomsPage() {
  return <MeetingRoomsClient />;
}
