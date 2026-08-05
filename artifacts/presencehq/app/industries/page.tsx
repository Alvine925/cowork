import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CallToAction } from '@/components/home/CallToAction'
import { Scale, Briefcase, Code, Building, ShoppingCart, Stethoscope, Landmark, Plane, PenTool, Lightbulb, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'PresenceHQ provides tailored virtual office and business presence solutions for law firms, consultants, startups, and international companies.',
}

const INDUSTRIES = [
  { name: "Law Firms", icon: Scale, desc: "Maintain client confidentiality and prestige with a premium address and professional meeting rooms for depositions." },
  { name: "Consultants", icon: Briefcase, desc: "Upgrade from coffee shops to corporate boardrooms. Project authority when bidding for enterprise contracts." },
  { name: "Tech Startups", icon: Code, desc: "Stay lean. Use our address for incorporation and investor communications while your team works remotely." },
  { name: "NGOs & Non-Profits", icon: Building, desc: "Establish an official local headquarters to meet compliance requirements for receiving grants and funding." },
  { name: "E-commerce", icon: ShoppingCart, desc: "Keep your home address private. Use our commercial address for returns, supplier contracts, and public facing pages." },
  { name: "Healthcare Admin", icon: Stethoscope, desc: "A secure, professional location to handle administrative mail, billing, and back-office operations." },
  { name: "Accounting Firms", icon: Landmark, desc: "Build trust with financial clients through a prestigious address and secure document handling." },
  { name: "International Expansion", icon: Plane, desc: "Enter the Kenyan market instantly without the risk and capital expenditure of setting up a physical office." },
  { name: "Creative Agencies", icon: PenTool, desc: "Impress clients with prime meeting spaces while maintaining the flexibility of a distributed creative team." },
  { name: "Freelancers", icon: Lightbulb, desc: "Separate your work life from your personal life. Get a dedicated business address and stop using your home address." },
  { name: "Real Estate", icon: Users, desc: "Project scale and success to high-net-worth clients with a top-tier commercial address." }
]

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <SectionHeader 
            title="Built for Serious Business."
            subtitle="No matter your sector, a professional presence is non-negotiable. Discover how PresenceHQ serves your specific industry needs."
            dark
          />
        </div>
      </section>

      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gold hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-colors text-navy">
                  <ind.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{ind.name}</h3>
                <p className="text-dark-gray/70 text-sm leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
