import type { Metadata } from 'next';
import MeetingRoomsPage from '@/views/services/meeting-rooms';

export const metadata: Metadata = {
  title: 'Meeting Room in Kisumu CBD | Paper Street',
  description:
    'Book our private, fully equipped meeting room in Kisumu CBD by the hour or day. Equipped with 4K presentation display, video conferencing, and quiet acoustic privacy.',
  keywords: [
    'meeting room Kisumu',
    'conference room Kisumu CBD',
    'presentation room Kisumu',
    'hire meeting room Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/meeting-rooms',
  },
};

export default function Page() {
  return <MeetingRoomsPage />;
}
