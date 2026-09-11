import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustedBy } from '@/components/home/TrustedBy';
import { Problem } from '@/components/home/Problem';
import { Solution } from '@/components/home/Solution';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FeaturedPackages } from '@/components/home/FeaturedPackages';
import { FAQ } from '@/components/home/FAQ';
import { CallToAction } from '@/components/home/CallToAction';

export const metadata: Metadata = {
  title: 'Coworking Space & Virtual Office in Kenya | Paper Street',
  description:
    'Find prestigious coworking spaces and virtual offices in Nairobi and across Kenya. Professional business addresses, official mail logging, boardrooms, and flexible workspaces.',
  keywords: [
    'coworking space Kenya',
    'virtual office Kenya',
    'business address Nairobi',
    'flexible workspace Kenya',
    'meeting rooms Westlands',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
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
