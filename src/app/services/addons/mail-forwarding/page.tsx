import type { Metadata } from 'next';
import { AddonDetailPage } from '@/views/services/addon-detail';

export const metadata: Metadata = {
  title: 'Mail Forwarding in Kisumu | Paper Street',
  description:
    'Have original physical letters and documents received in Kisumu forwarded directly to your current address or town in Kenya.',
  keywords: [
    'mail forwarding Kisumu',
    'business mail forwarding Kenya',
    'virtual office mail Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/addons/mail-forwarding',
  },
  openGraph: {
    title: 'Mail Forwarding in Kisumu | Paper Street',
    description:
      'Have original physical letters and documents received in Kisumu forwarded directly to your current address or town in Kenya.',
    url: 'https://paperstreet.co.ke/services/addons/mail-forwarding',
    siteName: 'Paper Street',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function MailForwardingAddonPage() {
  return <AddonDetailPage slug="mail-forwarding" />;
}
