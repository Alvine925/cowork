import type { Metadata } from 'next';
import ContactClient from '@/views/contact';

export const metadata: Metadata = {
  title: 'Contact Paper Street | Virtual Office & Coworking Kenya',
  description:
    'Talk to Paper Street about virtual offices, coworking space, registered business addresses, mail handling, and meeting rooms across Kenya.',
  keywords: [
    'contact virtual office Kenya',
    'coworking space enquiry Kenya',
    'Paper Street contact',
    'Westlands office contact',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
