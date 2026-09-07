import type { Metadata } from 'next';
import MailForwardingClient from '@/views/services/mail-forwarding';

export const metadata: Metadata = {
  title: 'Business Mail Forwarding in Kenya | Paper Street',
  description:
    'Reliable mail forwarding across Kenya and internationally. High-resolution daily PDF scans and scheduled physical courier parcel delivery.',
  keywords: ['mail forwarding Kenya', 'international mail forwarding Nairobi', 'mail scan service'],
  alternates: {
    canonical: 'https://paperstreet.africa/services/mail-forwarding',
  },
};

export default function MailForwardingPage() {
  return <MailForwardingClient />;
}
