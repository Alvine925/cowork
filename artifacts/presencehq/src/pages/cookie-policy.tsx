import { PageHero } from '@/components/ui/PageHero'

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Cookie Policy."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl prose prose-gray prose-headings:font-heading prose-headings:text-navy">
          <h2>1. What are cookies?</h2>
          <p>Cookies are small text files placed on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use the site.</p>
          <h2>2. How we use cookies</h2>
          <p>We use essential cookies for authentication and session management, performance cookies to understand how visitors use our site, and preference cookies to remember your settings.</p>
          <h2>3. Managing cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect some features of our website, including the contact form and account login.</p>
        </div>
      </section>
    </>
  )
}
