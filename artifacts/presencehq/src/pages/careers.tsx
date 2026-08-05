import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

const JOBS = [
  { title: 'Center Manager', location: 'Nairobi', type: 'Full-time', dept: 'Operations' },
  { title: 'Sales Executive', location: 'Nairobi / Mombasa', type: 'Full-time', dept: 'Sales' },
  { title: 'Receptionist', location: 'Multiple Cities', type: 'Full-time', dept: 'Client Services' },
  { title: 'Marketing Associate', location: 'Nairobi', type: 'Full-time', dept: 'Marketing' },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&q=80"
        eyebrow="Careers"
        title="Join the PresenceHQ Team."
        subtitle="Help us build the operating system for professional business presence across Africa."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="mb-16 text-center">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Open Positions</span>
            <h2 className="text-4xl font-light font-heading text-navy">Current Openings</h2>
          </div>
          <div className="flex flex-col gap-4">
            {JOBS.map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 rounded-xl hover:border-gold hover:shadow-sm transition-all duration-300 gap-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-navy">{job.title}</h3>
                  <p className="text-dark-gray/60 text-sm mt-1">{job.dept} · {job.location} · {job.type}</p>
                </div>
                <a href="mailto:careers@presencehq.com" className="shrink-0 border border-navy text-navy text-sm px-6 py-2.5 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider font-medium">
                  Apply Now
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-dark-gray/50 text-sm mt-12">
            Don't see a role? Send your CV to <a href="mailto:careers@presencehq.com" className="text-gold hover:underline">careers@presencehq.com</a>
          </p>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
