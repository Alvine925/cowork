import type { Metadata } from 'next';
import BlogPostClient from '@/views/blog-post';
import { blogPosts } from '@/views/blog';

interface Props {
  params: Promise<{ slug: string }>;
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

  return {
    title: `${post.title} | Paper Street`,
    description: post.excerpt,
    keywords: [post.category, 'Paper Street Kenya', 'business growth Kenya'],
    openGraph: {
      title: post.title,
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
    alternates: {
      canonical: `https://paperstreet.co.ke/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  return <BlogPostClient params={resolvedParams} />;
}
