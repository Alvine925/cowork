import { SectionHeader } from '@/components/ui/SectionHeader'
import { CheckCircle2 } from 'lucide-react'

const REASONS = [
  {
    title: "Professional Address",
    description: "Instantly upgrade your business image with a premium commercial address."
  },
  {
    title: "Secure Mail Handling",
    description: "Strict protocols to ensure your sensitive correspondence is safe."
  },
  {
    title: "Prime Locations",
    description: "Strategically located in major business districts across Kenya."
  },
  {
    title: "Flexible Packages",
    description: "Scale your services up or down as your business needs change."
  },
  {
    title: "Affordable Pricing",
    description: "Enterprise-grade infrastructure without the enterprise price tag."
  },
  {
    title: "Meeting Rooms",
    description: "Access fully-equipped boardrooms for crucial client meetings."
  },
  {
    title: "Reception Support",
    description: "A professional team to greet your guests and handle inquiries."
  },
  {
    title: "Fast Setup (24hr)",
    description: "Get your address active and start using our services immediately."
  },
  {
    title: "Scalable Solutions",
    description: "Expand to new cities effortlessly through our network."
  },
  {
    title: "Business Growth Focus",
    description: "We handle the logistics so you can focus on revenue."
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          eyebrow="Why Choose Us"
          title="The Standard for Business Presence"
          subtitle="We don't just provide an address; we provide the foundation for your business credibility."
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-6">
          {REASONS.map((reason, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <h4 className="font-bold text-navy text-sm md:text-base">{reason.title}</h4>
              </div>
              <p className="text-dark-gray/70 text-sm leading-relaxed pl-7">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
