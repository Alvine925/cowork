import React from 'react'
import { notFound } from 'wouter'
import KisumuLandingPageView from '../../../../src/views/landing/kisumu-landing-page'
import { kisumuLandingPages } from '../data/kisumu-landing-pages'

export default function KisumuLandingRoute({ slug }: { slug: string }) {
  const config = kisumuLandingPages[slug]
  if (!config) {
    return <div className="py-20 text-center text-navy/60">Page Not Found</div>
  }
  return <KisumuLandingPageView config={config} />
}
