export interface LandingPageConfig {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  targetKeywords: string[]
  eyebrow: string
  heroHeading: string
  heroSubtitle: string
  heroImage: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  startingPrice: string
  priceLabel: string
  keyStats: { value: string; label: string }[]
  overviewTitle: string
  overviewContent: string[]
  features: { title: string; desc: string; iconName?: string }[]
  pricingPackages: {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    popular?: boolean
    ctaText: string
    ctaHref: string
  }[]
  faqs: { q: string; a: string }[]
}
