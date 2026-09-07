import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Paper Street',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-6 pt-24 pb-20">
      <p className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-4">404</p>
      <h1 className="text-5xl md:text-6xl font-light font-heading text-navy mb-6">Page Not Found</h1>
      <p className="text-dark-gray/60 text-base font-light max-w-md text-center mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-navy text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-navy-600 transition-colors font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
}
