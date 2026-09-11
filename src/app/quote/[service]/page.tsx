import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import QuoteRequestView, { QUOTE_SERVICE_CONFIGS, QuoteServiceSlug } from '@/views/quote-request'

interface Props {
  params: Promise<{ service: string }>
}

const ALIASES: Record<string, QuoteServiceSlug> = {
  'virtual-office': 'virtual-office',
  'virtual-office-in-kisumu': 'virtual-office',
  'business-address': 'business-address',
  'registered-business-address': 'business-address',
  'dedicated-desk': 'dedicated-desk',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params
  const slug = ALIASES[service] || (service as QuoteServiceSlug)
  const config = QUOTE_SERVICE_CONFIGS[slug]

  if (!config) {
    return { title: 'Request Membership Quotation | Paper Street' }
  }

  return {
    title: `Request Quote: ${config.title} in Kisumu CBD | Paper Street`,
    description: `Generate an official institutional membership proposal and pricing quotation for ${config.title} at Paper Street Workspaces Kisumu CBD.`,
    alternates: { canonical: `https://paperstreet.co.ke/quote/${slug}` },
  }
}

export default async function Page({ params }: Props) {
  const { service } = await params
  const slug = ALIASES[service] || (service as QuoteServiceSlug)
  const config = QUOTE_SERVICE_CONFIGS[slug]

  if (!config) {
    notFound()
  }

  return <QuoteRequestView initialSlug={slug} />
}
