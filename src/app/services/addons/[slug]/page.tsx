import type { Metadata } from 'next';
import { AddonDetailPage, ADDONS_DATA } from '@/views/services/addon-detail';
import { notFound } from 'next/navigation';

const ADDON_META: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  'mail-handling': {
    title: 'Mail Handling & Digital Scanning in Kisumu CBD | Paper Street',
    description:
      'Secure front-desk mail receiving, official letter logging, and instant high-resolution PDF document scans delivered directly to your online portal in Kisumu CBD.',
    keywords: [
      'mail handling Kisumu',
      'digital mail scanning Kenya',
      'virtual office mail receipt',
      'business mail logging Kisumu',
      'Paper Street workspace',
    ],
  },
  'mail-forwarding': {
    title: 'Physical Mail & Document Forwarding | Paper Street Kisumu CBD',
    description:
      'Scheduled and on-demand forwarding of original physical contracts, business packets, and letters from Kisumu CBD to your doorstep anywhere in Kenya.',
    keywords: [
      'mail forwarding Kisumu',
      'mail dispatch Kenya',
      'physical document forwarding',
      'letter forwarding Kisumu',
    ],
  },
  'meeting-room-hours': {
    title: 'Meeting Room Hours & Booking Credits | Paper Street Kisumu CBD',
    description:
      'Flexible hourly reservation credits for our private 4K presentation meeting room in Kisumu CBD. Fully equipped with video conferencing and acoustic privacy.',
    keywords: [
      'meeting room credits Kisumu',
      'book meeting room Kisumu CBD',
      'conference room hours',
      'meeting space on demand',
    ],
  },
  'lockable-storage': {
    title: 'Lockable Storage Drawer Unit | Paper Street Kisumu CBD',
    description:
      'Secure under-desk lockable pedestal drawer with personal key to safely store laptops, monitors, and sensitive documents overnight in Kisumu CBD.',
    keywords: [
      'lockable office storage Kisumu',
      'workspace locker Kenya',
      'desk drawer storage',
      'overnight equipment security',
    ],
  },
  'coworking-access': {
    title: 'Drop-In Coworking Day Access in Kisumu CBD | Paper Street',
    description:
      'Flexible day pass bundles for ergonomic open-plan workstations, soundproof phone booths, and uninterrupted power backup in Kisumu CBD.',
    keywords: [
      'coworking day pass Kisumu',
      'hot desk passes Kenya',
      'drop in workspace Kisumu CBD',
      'freelance desk Kisumu',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ADDONS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = ADDON_META[slug];

  if (!meta) {
    return {
      title: 'Service Add-on | Paper Street Kisumu CBD',
      description: 'Workspace and business presence add-ons for Paper Street Kisumu CBD.',
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://paperstreet.africa/services/addons/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://paperstreet.africa/services/addons/${slug}`,
      siteName: 'Paper Street',
      locale: 'en_KE',
      type: 'website',
    },
  };
}

export default async function AddonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!ADDONS_DATA[slug]) {
    notFound();
  }

  return <AddonDetailPage slug={slug} />;
}
