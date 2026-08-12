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
        title="Join the Paper Street Team."
        subtitle="Help us build the operating system for professional business presence across Africa."
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="mb-14">
            <span className="text-gold tracking-[0.3em] text-[10px] font-semibold uppercase block mb-3">Open Positions</span>
            <h2 className="text-2xl font-light font-heading text-navy">Current Openings</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {JOBS.map((job, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-7 gap-4">
                <div>
                  <h3 className="text-base font-semibold font-heading text-navy">{job.title}</h3>
                  <p className="text-dark-gray/50 text-xs mt-1 font-light">{job.dept} · {job.location} · {job.type}</p>
                </div>
                <a
                  href="mailto:careers@paperstreet.co.ke"
                  className="shrink-0 border border-navy text-navy text-[11px] px-6 py-2 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider font-medium w-fit"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>
          <p className="text-dark-gray/40 text-xs mt-12 font-light">
            Do not see a role that fits? Send your CV to{' '}
            <a href="mailto:careers@paperstreet.co.ke" className="text-gold hover:underline">careers@paperstreet.co.ke</a>
          </p>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
