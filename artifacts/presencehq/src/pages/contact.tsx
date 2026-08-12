import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Button } from '@/components/ui/button'

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

const contactDetails = [
  {
    Icon: MapPin,
    label: 'Address',
    content: 'Westlands Business Park, Waiyaki Way, Nairobi, Kenya',
  },
  { Icon: Phone, label: 'Phone and WhatsApp', content: '+254 700 000 000' },
  { Icon: Mail, label: 'Email', content: 'hello@paperstreet.africa' },
  {
    Icon: Clock,
    label: 'Business Hours',
    content: 'Monday to Friday: 8:00 AM to 5:00 PM',
  },
]

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

      {/* Two-column layout: info left, form right */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* ── Left: contact info ── */}
            <div>
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-5">
                Reach Us
              </span>
              <h2 className="text-4xl md:text-5xl font-light font-heading text-navy leading-tight mb-6">
                We&apos;d love to<br />hear from you.
              </h2>
              <p className="text-dark-gray/70 text-lg font-light leading-relaxed mb-14 max-w-md">
                Whether you have a question about pricing, locations, or just want to explore your options, our team typically responds within two business hours.
              </p>

              <div className="flex flex-col gap-10">
                {contactDetails.map(({ Icon, label, content }) => (
                  <div key={label} className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-full bg-navy/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-navy" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">{label}</p>
                      <p className="text-dark-gray/80 text-sm font-light leading-relaxed">{content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-16 pt-14 border-t border-dark-gray/10">
                <p className="text-xs font-semibold uppercase tracking-widest text-dark-gray/40 mb-6">Our locations</p>
                <div className="flex flex-wrap gap-3">
                  {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'].map((city) => (
                    <span
                      key={city}
                      className="text-xs tracking-wider font-medium text-navy border border-navy/20 px-4 py-1.5 rounded-full"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div>
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-5">
                Send a Message
              </span>
              <h2 className="text-3xl font-light font-heading text-navy mb-10">
                Tell us about your needs.
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Full Name *</label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Jane Mwangi"
                      className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray placeholder:text-dark-gray/30 focus:outline-none focus:border-navy transition-colors"
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Company</label>
                    <input
                      {...register('company')}
                      type="text"
                      placeholder="Acme Ltd"
                      className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray placeholder:text-dark-gray/30 focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Email Address *</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="jane@acme.com"
                      className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray placeholder:text-dark-gray/30 focus:outline-none focus:border-navy transition-colors"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Phone / WhatsApp *</label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray placeholder:text-dark-gray/30 focus:outline-none focus:border-navy transition-colors"
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Location + Service */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Preferred Location *</label>
                    <select
                      {...register('location')}
                      className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray focus:outline-none focus:border-navy transition-colors appearance-none cursor-pointer"
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
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Service of Interest *</label>
                    <select
                      {...register('service')}
                      className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray focus:outline-none focus:border-navy transition-colors appearance-none cursor-pointer"
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

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-navy/70">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your business and what you are looking for..."
                    className="bg-white border-0 border-b border-dark-gray/20 px-0 py-3 text-sm text-dark-gray placeholder:text-dark-gray/30 focus:outline-none focus:border-navy transition-colors resize-none"
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="px-12">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
