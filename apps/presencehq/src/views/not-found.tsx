import { Link } from 'wouter'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 pt-24">
      <p className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-4">404</p>
      <h1 className="text-5xl md:text-6xl font-light font-heading text-navy mb-6">Page Not Found</h1>
      <p className="text-dark-gray/60 text-lg font-light max-w-md text-center mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-navy text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-navy-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
