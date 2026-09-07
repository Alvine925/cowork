'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const INDUSTRIES = [
  {
    title: 'Consultants & Advisory Firms',
    desc: 'Establish professional authority with a prestigious Westlands registered business address and executive boardroom credits for high-stakes client pitches.',
    points: ['Prestigious CBD & Westlands address', 'Boardrooms with 4K conference displays', 'KRA compliance documentation package'],
  },
  {
    title: 'Tech Startups & Software Teams',
    desc: 'Agile workspace and virtual presence that expands with your runway. Zero long-term leases, enterprise fiber WiFi, and backup solar generators.',
    points: ['Flexible hot desks and dedicated suites', '200Mbps redundant fiber internet', 'On-demand meeting spaces across Kenya'],
  },
  {
    title: 'Legal & Financial Services',
    desc: 'Confidential mail logging, private telephone reception, and certified physical address records compliant with regulatory authorities.',
    points: ['Secure mail scanning & locked storage', 'Professional phone answering in company name', 'Registered office lease agreements'],
  },
  {
    title: 'International & Regional Companies',
    desc: 'Rapidly plant operational flags across Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret without the risk and capital expenditure of physical leases.',
    points: ['Multi-city presence under one agreement', 'Dedicated account manager', 'Local mail forwarding and parcel dispatch'],
  },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Industries"
        title="Designed for how modern Kenyan enterprises operate."
        subtitle="Whether you are an independent consultant or an expanding regional enterprise, Paper Street provides the infrastructure you need."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} className="p-8 border border-navy/15 bg-[#FBF8F0] space-y-4">
                <h3 className="font-heading text-2xl text-navy">{ind.title}</h3>
                <p className="text-xs text-navy/70 leading-relaxed">{ind.desc}</p>
                <ul className="space-y-2 pt-2 border-t border-navy/10">
                  {ind.points.map((pt, i) => (
                    <li key={i} className="text-xs text-navy/80 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
