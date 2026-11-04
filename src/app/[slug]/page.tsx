import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MANAGED_OFFICE_PAGES, MANAGED_OFFICE_PAGES_BY_SLUG } from '@/data/managed-office-pages-data'
import { generateManagedOfficeArticle } from '@/data/managed-office-content-engine'
import ManagedOfficeArticleView from '@/views/managed-office-article'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return MANAGED_OFFICE_PAGES.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = MANAGED_OFFICE_PAGES_BY_SLUG[slug]

  if (!page) {
    return {
      title: 'Page Not Found | Paper Street',
      description: 'The requested managed office page was not found.',
    }
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      page.keyword,
      'managed office Kenya',
      'office management Kenya',
      'serviced office Kisumu',
      'Paper Street Kisumu',
      'commercial office space Kisumu CBD',
      'turnkey workspace Kenya',
    ],
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'article',
      url: `https://paperstreet.co.ke/${page.slug}`,
      siteName: 'Paper Street',
      locale: 'en_KE',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
    },
    alternates: {
      canonical: `https://paperstreet.co.ke/${page.slug}`,
    },
  }
}

export default async function ManagedOfficeDynamicPage({ params }: Props) {
  const { slug } = await params
  const page = MANAGED_OFFICE_PAGES_BY_SLUG[slug]

  if (!page) {
    notFound()
  }

  const article = generateManagedOfficeArticle(page, MANAGED_OFFICE_PAGES)
  return <ManagedOfficeArticleView article={article} />
}

