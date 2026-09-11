import type { Metadata } from 'next';
import AboutClient from '@/views/about';

export const metadata: Metadata = {
  title: 'About Paper Street | Workspace & Commercial Presence in Kisumu CBD',
  description:
    'Learn how Paper Street eliminates traditional office overhead in Western Kenya with commercial business addresses, mail handling, and private meeting rooms in Kisumu CBD.',
  keywords: [
    'Paper Street Kisumu',
    'business address Kisumu CBD',
    'virtual office Western Kenya',
    'coworking Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
