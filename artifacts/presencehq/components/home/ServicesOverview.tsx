import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Building2, MapPin, Inbox, Send, Users, Laptop, Building, UserCheck, Globe, FileText, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Building2,
    title: "Virtual Office",
    description: "A complete professional identity. Premium address, mail handling, and local phone number.",
    href: "/services/virtual-office"
  },
  {
    icon: MapPin,
    title: "Business Address",
    description: "Use our prime locations for your company registration, website, and business cards.",
    href: "/services/business-address"
  },
  {
    icon: Inbox,
    title: "Mail Handling",
    description: "We receive, sort, and securely store your physical mail and packages.",
    href: "/services/mail-handling"
  },
  {
    icon: Send,
    title: "Mail Forwarding",
    description: "Digital scanning or physical forwarding of your mail to wherever you are globally.",
    href: "/services/mail-forwarding"
  },
  {
    icon: Users,
    title: "Meeting Rooms",
    description: "Book premium, fully-equipped meeting rooms by the hour for client pitches.",
    href: "/services/meeting-rooms"
  },
  {
    icon: Laptop,
    title: "Hot Desk",
    description: "Flexible coworking access when you need to drop in and get work done.",
    href: "/services/hot-desk"
  },
  {
    icon: Building,
    title: "Dedicated Desk",
    description: "Your own permanent desk in a shared space, 24/7 access, and secure storage.",
    href: "/services/dedicated-desk"
  },
  {
    icon: UserCheck,
    title: "Reception Services",
    description: "Professional receptionists to greet your clients and handle inquiries.",
    href: "/services/reception-services"
  },
  {
    icon: Globe,
    title: "Business Expansion",
    description: "Instantly establish a footprint in new cities without infrastructure costs.",
    href: "/services/business-expansion"
  },
  {
    icon: FileText,
    title: "Company Registration",
    description: "End-to-end assistance with legal company formation and compliance.",
    href: "/services/company-registration"
  }
]

export function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          eyebrow="Our Services"
          title="Everything Your Business Needs to Look Professional"
          subtitle="Choose the exact services you need. Scale up instantly as your company grows."
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Link 
              key={index} 
              href={service.href}
              className="group flex flex-col p-6 rounded-2xl border border-gray-200 bg-white hover:border-gold hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white flex items-center justify-center mb-6 transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-dark-gray/70 text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              <div className="flex items-center text-sm font-bold text-navy group-hover:text-gold transition-colors mt-auto">
                Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
