import type { Metadata } from 'next';
import KisumuPage from '@/views/locations/kisumu';

export const metadata: Metadata = {
  title: 'Paper Street Kisumu | Central Business District Workspace & Presence',
  description:
    'Lakeside corporate presence at Kisumu CBD Commercial Center. Western Kenya business address, regional mail handling, meeting room, and flexible desks.',
  keywords: ['Kisumu virtual office', 'coworking Kisumu CBD', 'business address Kisumu'],
  alternates: {
    canonical: 'https://paperstreet.africa/locations/kisumu',
  },
};

export default function Page() {
  return <KisumuPage />;
}
