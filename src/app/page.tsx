import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Problem } from '@/components/home/Problem';
import { Solution } from '@/components/home/Solution';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FeaturedPackages } from '@/components/home/FeaturedPackages';
import { FAQ } from '@/components/home/FAQ';
import { CallToAction } from '@/components/home/CallToAction';

export const metadata: Metadata = {
  title: 'Virtual Office, Business Address & Day Pass in Kisumu | Paper Street',
  description:
    'Get a virtual office or registered business address in Kisumu CBD, book a day pass, and use meeting rooms or dedicated desks in the same hub.',
  keywords: [
    'virtual office Kisumu',
    'business address Kisumu',
    'day pass Kisumu',
    'coworking space Kisumu',
    'meeting rooms Kisumu',
    'workspace Kisumu',
    'flexible workspace Kisumu',
    'coworking space Kisumu CBD',
  ],
  openGraph: {
    title: 'Virtual Office, Business Address & Day Pass in Kisumu | Paper Street',
    description:
      'Virtual office and business address services in Kisumu, plus day passes, meeting rooms, and dedicated desks at Paper Street.',
    url: 'https://paperstreet.co.ke/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://paperstreet.co.ke/',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <ServicesOverview />
      <WhyChooseUs />
      <HowItWorks />
      <FeaturedPackages />
      <FAQ />
      <CallToAction />
    </>
  );
}
