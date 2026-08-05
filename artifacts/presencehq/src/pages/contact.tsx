import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Button } from '@/components/ui/Button'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  location: z.string().min(1, 'Please select a location'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please provide more details'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert('Message sent successfully! We will contact you shortly.')
    reset()
  }

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
        eyebrow="Let's Talk"
        title="Get in Touch."
        subtitle="Ready to upgrade your business presence? Our team is here to help you find the perfect solution."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

            {/* Contact Info */}
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Headquarters</span>
                <h3 className="text-2xl font-bold font-heading text-navy mb-4">Our Main Office</h3>
                <p className="text-dark-gray/80 mb-8 font-light leading-relaxed">
                  While we offer addresses across the country, our core operations team is based in our Nairobi HQ.
                </p>

                <div className="flex flex-col gap-6">
                  {[
                    {
                      Icon: MapPin,
                      label: 'Address',
                      content: 'Westlands Business Park\nWaiyaki Way, Nairobi, Kenya',
                    },
                    { Icon: Phone, label: 'Phone & WhatsApp', content: '+254 700 000 000' },
                    { Icon: Mail, label: 'Email', content: 'hello@presencehq.com' },
                    {
                      Icon: Clock,
                      label: 'Business Hours',
                      content: 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday & Sunday: Closed',
                    },
                  ].map(({ Icon, label, content }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-light-gray flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm uppercase tracking-wider mb-1">{label}</h4>
                        <p className="text-dark-gray/70 text-sm font-light leading-relaxed whitespace-pre-line">{content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold font-heading text-navy mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-navy">Full Name *</label>
                    <input
                      {...register('name')}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-navy">Company</label>
                    <input
                      {...register('company')}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-navy">Email *</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="jane@example.com"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-navy">Phone *</label>
                    <input
                      {...register('phone')}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="+254 7XX XXX XXX"
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-navy">Location *</label>
                    <select
                      {...register('location')}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
                    >
                      <option value="">Select a city</option>
                      <option value="nairobi">Nairobi</option>
                      <option value="mombasa">Mombasa</option>
                      <option value="kisumu">Kisumu</option>
                      <option value="nakuru">Nakuru</option>
                      <option value="eldoret">Eldoret</option>
                      <option value="multiple">Multiple Locations</option>
                    </select>
                    {errors.location && <span className="text-xs text-red-500">{errors.location.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-navy">Service *</label>
                    <select
                      {...register('service')}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="virtual-office">Virtual Office Package</option>
                      <option value="business-address">Business Address Only</option>
                      <option value="meeting-rooms">Meeting Rooms</option>
                      <option value="company-registration">Company Registration</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <span className="text-xs text-red-500">{errors.service.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-navy">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Tell us about your business needs..."
                  ></textarea>
                  {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
                </div>

                <Button type="submit" size="lg" className="w-full mt-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
