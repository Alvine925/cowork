import type { Metadata } from 'next';
import BlogPostClient from '@/views/blog-post';
import { blogPosts } from '@/data/blog-posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | Paper Street',
      description: 'The requested article could not be found.',
    };
  }

  const keywords = [
    post.title,
    post.category,
    'Kisumu coworking space',
    'Kisumu virtual office',
    'Kisumu business address',
    'Kisumu meeting room',
    'Paper Street Kisumu',
    'Kenya workspace',
    'Western Kenya business',
  ];

  return {
    title: `${post.title} | Paper Street`,
    description: post.excerpt,
    keywords,
    openGraph: {
      title: `${post.title} | Paper Street`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Paper Street`,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://paperstreet.co.ke/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  const jsonLd = post
    ? {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: post.author,
            jobTitle: post.authorRole,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Paper Street Workspace',
            logo: {
              '@type': 'ImageObject',
              url: 'https://paperstreet.co.ke/favicon.svg',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://paperstreet.co.ke/blog/${resolvedParams.slug}`,
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
              name: 'Blog',
              item: 'https://paperstreet.co.ke/blog',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: `https://paperstreet.co.ke/blog/${resolvedParams.slug}`,
            },
          ],
        },
        {
          '@type': 'LocalBusiness',
          name: 'Paper Street Kisumu CBD',
          image: post.image,
          '@id': 'https://paperstreet.co.ke/locations/kisumu',
          url: 'https://paperstreet.co.ke/locations/kisumu',
          telephone: '+254110486677',
          priceRange: 'KES 1,000 - KES 25,000',
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
      ],
    }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient params={resolvedParams} />
    </>
  );
}
