import type { Metadata } from 'next'
import FaqClient from '@/views/faq'
import { FAQ_SECTIONS } from '@/data/faq'

export const metadata: Metadata = {
  title: 'FAQ | Virtual Office, Business Address & Day Pass in Kisumu',
  description:
    'Answers on Paper Street Kisumu virtual office, registered business address, day passes, meeting rooms, mail handling, KYC, deposits, and hub hours.',
  keywords: [
    'virtual office Kisumu FAQ',
    'business address Kisumu questions',
    'day pass Kisumu',
    'coworking FAQ Kenya',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/faq',
  },
}

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient />
    </>
  )
}
