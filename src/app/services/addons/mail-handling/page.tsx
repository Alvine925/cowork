import type { Metadata } from 'next';
import { AddonDetailPage } from '@/views/services/addon-detail';

export const metadata: Metadata = {
  title: 'Mail Handling & Digital Scanning | Paper Street Kisumu CBD',
  description:
    'Secure front-desk mail receiving, official letter logging, and instant high-resolution PDF document scans delivered directly to your online portal in Kisumu CBD.',
  keywords: [
    'mail handling Kisumu',
    'digital mail scanning Kenya',
    'mail holding service',
    'virtual mailbox Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/addons/mail-handling',
  },
  openGraph: {
    title: 'Mail Handling & Digital Scanning | Paper Street Kisumu CBD',
    description:
      'Secure front-desk mail receiving, official letter logging, and instant high-resolution PDF document scans delivered directly to your online portal in Kisumu CBD.',
    url: 'https://paperstreet.co.ke/services/addons/mail-handling',
    siteName: 'Paper Street',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function MailHandlingAddonPage() {
  return <AddonDetailPage slug="mail-handling" />;
}
