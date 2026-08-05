import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the team at PresenceHQ. We are looking for ambitious individuals to help us build the future of business infrastructure.',
}

const POSITIONS = [
  { title: "Center Manager", dept: "Operations", loc: "Nairobi", type: "Full-time" },
  { title: "Client Success Specialist", dept: "Customer Experience", loc: "Mombasa", type: "Full-time" },
  { title: "B2B Sales Executive", dept: "Sales", loc: "Nairobi", type: "Full-time" },
  { title: "Front Desk Receptionist", dept: "Operations", loc: "Kisumu", type: "Full-time" }
]

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            eyebrow="Join Us"
            title="Help us build the future of business presence."
            subtitle="We are on a mission to democratize premium business infrastructure. Join a fast-growing, ambitious team."
            dark
          />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-navy mb-10 font-[family-name:var(--font-heading)]">Open Positions</h2>
          
          <div className="flex flex-col gap-4">
            {POSITIONS.map((pos, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border border-gray-200 hover:border-gold hover:shadow-md transition-all duration-300">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl font-bold text-navy mb-2">{pos.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-dark-gray/60 font-medium">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md">{pos.dept}</span>
                    <span>•</span>
                    <span>{pos.loc}</span>
                    <span>•</span>
                    <span>{pos.type}</span>
                  </div>
                </div>
                <Button variant="outline" className="border-gray-200 hover:border-navy hover:bg-navy hover:text-white">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
