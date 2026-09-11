import type { Metadata } from 'next';
import MailHandlingClient from '@/views/services/mail-handling';

export const metadata: Metadata = {
  title: 'Business Mail Handling Services in Kenya | Paper Street',
  description:
    'Never miss important business correspondence. Paper Street receives, logs, stores, scans, and forwards your business mail securely in Kenya.',
  keywords: ['mail handling Kenya', 'business mail service Kenya', 'mail receipt Nairobi'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/mail-handling',
  },
};

export default function MailHandlingPage() {
  return <MailHandlingClient />;
}
