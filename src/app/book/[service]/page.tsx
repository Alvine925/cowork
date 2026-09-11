import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IndividualBookingPage, { INDIVIDUAL_SERVICE_CONFIGS, ServiceSlug } from '@/views/individual-booking'
import QuoteRequestView, { QuoteServiceSlug } from '@/views/quote-request'

interface Props {
  params: Promise<{ service: string }>
}

const ALIASES: Record<string, ServiceSlug> = {
  'virtual-office': 'virtual-office',
  'virtual-office-in-kisumu': 'virtual-office',
  'business-address': 'business-address',
  'registered-business-address': 'business-address',
  'hot-desk': 'hot-desk',
  'day-pass': 'hot-desk',
  'daily-pass': 'hot-desk',
  'coworking-space-kisumu': 'hot-desk',
  'dedicated-desk': 'dedicated-desk',
  'meeting-rooms': 'meeting-rooms',
  'meeting-room': 'meeting-rooms',
  'boardroom': 'meeting-rooms',
}

const MEMBERSHIP_SERVICES = ['virtual-office', 'business-address', 'dedicated-desk']

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params
  const slug = ALIASES[service] || (service as ServiceSlug)
  const config = INDIVIDUAL_SERVICE_CONFIGS[slug]

  if (!config) {
    return { title: 'Book Workspace | Paper Street' }
  }

  const isMembership = MEMBERSHIP_SERVICES.includes(slug)

  return {
    title: isMembership
      ? `Request ${config.title} Quotation | Paper Street Kisumu`
      : `Book ${config.title} in Kisumu CBD | Paper Street`,
    description: config.description,
    alternates: { canonical: `https://paperstreet.co.ke/${isMembership ? 'quote' : 'book'}/${slug}` },
  }
}

export default async function Page({ params }: Props) {
  const { service } = await params
  const slug = ALIASES[service] || (service as ServiceSlug)
  const config = INDIVIDUAL_SERVICE_CONFIGS[slug]

  if (!config) {
    notFound()
  }

  if (MEMBERSHIP_SERVICES.includes(slug)) {
    return <QuoteRequestView initialSlug={slug as QuoteServiceSlug} />
  }

  return <IndividualBookingPage slug={slug} />
}
