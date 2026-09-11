import type { Metadata } from 'next';
import { AddonDetailPage } from '@/views/services/addon-detail';

export const metadata: Metadata = {
  title: 'Meeting Room Hours & Booking Credits | Paper Street Kisumu CBD',
  description:
    'Flexible hourly reservation credits for our private 4K presentation meeting room in Kisumu CBD. Fully equipped with video conferencing and acoustic privacy.',
  keywords: [
    'meeting room credits Kisumu',
    'book meeting room Kisumu CBD',
    'conference room hours',
    'meeting space on demand',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/addons/meeting-room-hours',
  },
  openGraph: {
    title: 'Meeting Room Hours & Booking Credits | Paper Street Kisumu CBD',
    description:
      'Flexible hourly reservation credits for our private 4K presentation meeting room in Kisumu CBD. Fully equipped with video conferencing and acoustic privacy.',
    url: 'https://paperstreet.co.ke/services/addons/meeting-room-hours',
    siteName: 'Paper Street',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function MeetingRoomHoursAddonPage() {
  return <AddonDetailPage slug="meeting-room-hours" />;
}
