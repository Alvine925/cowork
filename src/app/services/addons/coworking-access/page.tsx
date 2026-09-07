import type { Metadata } from 'next';
import { AddonDetailPage } from '@/views/services/addon-detail';

export const metadata: Metadata = {
  title: 'Drop-In Coworking Day Access in Kisumu CBD | Paper Street',
  description:
    'Flexible day pass bundles for ergonomic open-plan workstations, soundproof phone booths, and uninterrupted power backup in Kisumu CBD.',
  keywords: [
    'coworking day pass Kisumu',
    'hot desk passes Kenya',
    'drop in workspace Kisumu CBD',
    'freelance desk Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/services/addons/coworking-access',
  },
  openGraph: {
    title: 'Drop-In Coworking Day Access in Kisumu CBD | Paper Street',
    description:
      'Flexible day pass bundles for ergonomic open-plan workstations, soundproof phone booths, and uninterrupted power backup in Kisumu CBD.',
    url: 'https://paperstreet.africa/services/addons/coworking-access',
    siteName: 'Paper Street',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function CoworkingAccessAddonPage() {
  return <AddonDetailPage slug="coworking-access" />;
}
