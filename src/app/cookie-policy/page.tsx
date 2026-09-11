import type { Metadata } from 'next';
import CookieClient from '@/views/cookie-policy';

export const metadata: Metadata = {
  title: 'Cookie Policy | Paper Street Kenya',
  description:
    'Learn how Paper Street uses necessary and analytical cookies to improve your workspace experience.',
  keywords: ['Paper Street cookie policy'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  return <CookieClient />;
}
