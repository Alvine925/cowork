'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const INDUSTRIES = [
  {
    title: 'Consultants & Advisory Firms',
    desc: 'Establish professional authority with a commercial business address in Kisumu and on-demand meeting room access for client strategy sessions.',
    points: ['Prestigious commercial address in Kisumu CBD', 'Meeting room with 4K presentation display', 'Professional front-desk client greeting'],
  },
  {
    title: 'Tech Startups & Remote Software Teams',
    desc: 'Productive workspace and virtual presence in Western Kenya. 200Mbps redundant fiber internet, backup generators, and flexible day passes.',
    points: ['Ergonomic hot desks and dedicated desks', '200Mbps fast fiber Wi-Fi with auto-failover', 'Quiet acoustic phone booths for team standups'],
  },
  {
    title: 'Legal, Healthcare & Financial Services',
    desc: 'Confidential mail logging, safe document holding, and official business address verification in the commercial center of Kisumu.',
    points: ['Secure mail scanning and locked storage', 'Front-desk package and document receiving', 'Registered office address verification'],
  },
  {
    title: 'National Companies & Regional NGOs',
    desc: 'Rapidly establish a local branch presence and contact address in Kisumu to serve Western Kenya clients and Lake Victoria projects without signing a property lease.',
    points: ['Instant regional branch contact address in Kisumu', 'Front-desk receiving for regional tenders and proposals', 'On-demand meeting room for visiting executives'],
  },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Industries"
        title="Designed for modern businesses operating in Kisumu."
        subtitle="Whether you are an independent consultant, a remote team, or a national company expanding into Western Kenya, Paper Street provides the infrastructure you need."
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
                      <span className="h-1.5 w-1.5 rounded-full bg-navy/60 shrink-0" />
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
