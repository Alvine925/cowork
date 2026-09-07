import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, getPageSeo } from '@/lib/seo'

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function SeoHead() {
  const [location] = useLocation()

  useEffect(() => {
    const seo = getPageSeo(location)
    const canonicalUrl = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`

    document.title = seo.title
    document.documentElement.lang = 'en'
    setMeta('name', 'description', seo.description)
    setMeta('name', 'keywords', seo.keywords.join(', '))
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow')
    setMeta('name', 'author', SITE_NAME)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:type', seo.type ?? 'website')
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_KE')
    setMeta('property', 'og:image', DEFAULT_OG_IMAGE)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', DEFAULT_OG_IMAGE)
    setCanonical(canonicalUrl)
  }, [location])

  return null
}