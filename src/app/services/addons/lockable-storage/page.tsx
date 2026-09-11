import type { Metadata } from 'next';
import { AddonDetailPage } from '@/views/services/addon-detail';

export const metadata: Metadata = {
  title: 'Lockable Storage Pedestal & Security | Paper Street Kisumu',
  description:
    'Secure under-desk steel mobile pedestal with personal keys and 24/7 CCTV surveillance to safely store laptops, monitors, and sensitive documents overnight in Kisumu.',
  keywords: [
    'lockable office storage Kisumu',
    'workspace locker Kenya',
    'desk pedestal storage',
    'overnight equipment security',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/addons/lockable-storage',
  },
  openGraph: {
    title: 'Lockable Storage Pedestal & Security | Paper Street Kisumu',
    description:
      'Secure under-desk steel mobile pedestal with personal keys and 24/7 CCTV surveillance to safely store laptops, monitors, and sensitive documents overnight in Kisumu.',
    url: 'https://paperstreet.co.ke/services/addons/lockable-storage',
    siteName: 'Paper Street',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function LockableStorageAddonPage() {
  return <AddonDetailPage slug="lockable-storage" />;
}
