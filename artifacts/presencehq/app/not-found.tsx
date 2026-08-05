import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-light-gray px-6 text-center">
      <div className="max-w-md">
        <p className="text-6xl font-bold text-navy mb-4">404</p>
        <h1 className="text-2xl font-bold text-dark-gray mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
