import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KisumuLandingPageView from './kisumu-landing-page'
import { kisumuLandingPages } from '@/data/kisumu-landing-pages'

export function createLandingPageMetadata(slug: string): Metadata {
  const config = kisumuLandingPages[slug]
  if (!config) {
    return {
      title: 'Page Not Found | Paper Street',
      description: 'The requested workspace page was not found.',
    }
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: [
      ...config.targetKeywords,
      'Kisumu workspace',
      'Paper Street Kisumu',
      'Kisumu CBD commercial office',
      'Oginga Odinga Street workspace',
    ],
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      type: 'website',
      url: `https://paperstreet.co.ke/${slug}`,
      images: [
        {
          url: config.heroImage,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
      images: [config.heroImage],
    },
    alternates: {
      canonical: `https://paperstreet.co.ke/${slug}`,
    },
  }
}

export function createLandingPageComponent(slug: string) {
  return function Page() {
    const config = kisumuLandingPages[slug]
    if (!config) {
      notFound()
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          name: 'Paper Street Kisumu CBD',
          image: config.heroImage,
          '@id': `https://paperstreet.co.ke/${slug}`,
          url: `https://paperstreet.co.ke/${slug}`,
          telephone: '+254110486677',
          priceRange: 'KES 1,000 - KES 65,000',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kisumu CBD Commercial Center, Oginga Odinga Street',
            addressLocality: 'Kisumu',
            addressRegion: 'Kisumu County',
            postalCode: '40100',
            addressCountry: 'KE',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -0.1022,
            longitude: 34.7617,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://paperstreet.co.ke',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Kisumu Workspace',
              item: 'https://paperstreet.co.ke/locations/kisumu',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: config.title,
              item: `https://paperstreet.co.ke/${slug}`,
            },
          ],
        },
        ...(config.faqs && config.faqs.length > 0
          ? [
            {
              '@type': 'FAQPage',
              mainEntity: config.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]
          : []),
      ],
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <KisumuLandingPageView config={config} />
      </>
    )
  }
}
