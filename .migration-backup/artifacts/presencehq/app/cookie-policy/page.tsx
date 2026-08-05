import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for PresenceHQ.',
}

export default function CookiePolicyPage() {
  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl prose prose-navy">
        <h1 className="text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-8">Cookie Policy</h1>
        
        <h2>1. What are cookies?</h2>
        <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>

        <h2>2. How we use cookies</h2>
        <p>We use cookies to understand how you use our website, remember your preferences, and improve your experience. This includes essential cookies for authentication and performance cookies for analytics.</p>
      </div>
    </main>
  )
}
