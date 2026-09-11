'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { ArrowRight, Loader2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone or WhatsApp number'),
  location: z.string().min(1, 'Please choose a location'),
  service: z.string().min(1, 'Please select a service of interest'),
  message: z.string().min(10, 'Please provide a few details about your requirements'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const SERVICES_LIST = [
  { id: 'Virtual Office (CBD Address + Mail Scanning)', label: 'Virtual Office' },
  { id: 'Business Address (eCitizen & KRA Compliance)', label: 'Business Address & Tax' },
  { id: 'Meeting Rooms & Executive Boardrooms', label: 'Executive Boardroom' },
  { id: 'Hot Desk & Day Passes', label: 'Hot Desk / Day Pass' },
  { id: 'Dedicated Desk & Team Office', label: 'Dedicated Desk' },
  { id: 'Tailored Enterprise & Branch Expansion', label: 'Enterprise / Branch Solution' },
]

const LOCATIONS_LIST = [
  { id: 'Kisumu (CBD Flagship Hub)', label: 'Kisumu CBD', note: 'Active Flagship Hub' },
  { id: 'Nairobi (Westlands Hub)', label: 'Nairobi', note: 'Expansion Waitlist' },
  { id: 'Mombasa (Coastal Hub)', label: 'Mombasa', note: 'Expansion Waitlist' },
  { id: 'Nakuru (Commercial Hub)', label: 'Nakuru', note: 'Expansion Waitlist' },
  { id: 'Eldoret (North Rift Hub)', label: 'Eldoret', note: 'Expansion Waitlist' },
]

const FAQS = [
  {
    q: 'How fast will I receive a response to my inquiry?',
    a: 'Our client relationship team reviews incoming inquiries continuously and typically responds within 2 business hours between Monday and Saturday (8:00 AM to 6:00 PM EAT).',
  },
  {
    q: 'Can I use the Paper Street address for official KRA PIN and eCitizen BRS registration?',
    a: 'Yes. Our commercial address at CBD Commercial Center, Kisumu is fully verifiable and recognized for Section 47 Companies Act 2015 registration, eCitizen BRS filings, KRA compliance, and corporate banking KYC.',
  },
  {
    q: 'Can I visit or tour the Kisumu flagship hub in person?',
    a: 'Yes. Our front desk reception in Kisumu CBD is open Monday to Saturday from 8:00 AM to 6:00 PM for walk-in consultations and tours of our workspaces, boardrooms, and phone booths.',
  },
  {
    q: 'What happens when I register interest for expansion cities?',
    a: 'Your registration is logged to our VIP expansion database. You will be assigned a priority allocation code and receive an initial 20% discount on first-term agreements upon hub commissioning.',
  },
]

export default function ContactPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const requestedService = searchParams?.get('service')
  const requestedLocation = searchParams?.get('location') || searchParams?.get('interest')
  const requestedPlan = searchParams?.get('plan')

  const [selectedService, setSelectedService] = useState<string>(
    requestedService ? decodeURIComponent(requestedService) : SERVICES_LIST[0].id
  )
  const [selectedLocation, setSelectedLocation] = useState<string>(
    requestedLocation ? decodeURIComponent(requestedLocation) : LOCATIONS_LIST[0].id
  )
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    reference: string
    name: string
    email: string
    service: string
    location: string
  } | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      location: selectedLocation,
      service: selectedService,
      message: requestedPlan ? `Inquiry regarding the ${requestedPlan} membership package.` : '',
    },
  })

  const handleServiceSelect = (svcId: string) => {
    setSelectedService(svcId)
    setValue('service', svcId, { shouldValidate: true })
  }

  const handleLocationSelect = (locId: string) => {
    setSelectedLocation(locId)
    setValue('location', locId, { shouldValidate: true })
  }

  const onSubmit = async (data: ContactFormValues) => {
    setApiError(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const resJson = await response.json()

      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || 'Failed to submit inquiry')
      }

      setSubmissionSuccess({
        reference: resJson.submissionId || `INQ-${Date.now().toString().slice(-6)}`,
        name: data.name,
        email: data.email,
        service: data.service,
        location: data.location,
      })
      reset()
    } catch (err: any) {
      console.error('Contact submission error:', err)
      setApiError(err?.message || 'We could not dispatch your message. Please reach us directly via WhatsApp.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF8F0] text-navy">

      {/* ── 1. Clean Editorial Header (No Floating Glow/Cards) ── */}
      <section className="pt-32 pb-16 border-b border-navy/15 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-navy/40" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-navy/70 font-semibold">
              Client Concierge &amp; Inquiries
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-6xl font-light font-heading text-navy leading-[1.1]">
                Get in Touch with Our Team.
              </h1>
              <p className="mt-4 text-navy/70 text-base md:text-lg font-light max-w-2xl leading-relaxed">
                Connect directly with Paper Street Workspaces for virtual offices, verified commercial registration addresses, meeting rooms, and flexible workspaces in Kenya.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-2 text-xs font-mono text-navy/60">
              <div>Average Response: &lt; 2 Business Hours</div>
              <div>Operating: Mon &ndash; Sat, 08:00 &ndash; 18:00 EAT</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Two-Column Plain Editorial Layout (No Card Backgrounds) ── */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">

            {/* ── Left Column: Institutional Directory & Details ── */}
            <div className="lg:col-span-5 space-y-12">

              {/* Directory Section 01: Flagship */}
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-navy/15 mb-4">
                  <span className="font-mono text-[11px] font-bold text-navy uppercase tracking-wider">
                    01. Flagship Hub &amp; Reception
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 ml-auto font-semibold">
                    Operating
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-light text-navy">
                  Kisumu CBD Commercial Center
                </h3>
                <p className="text-sm text-navy/70 font-light mt-1.5 leading-relaxed">
                  Oginga Odinga Street, Central Business District, Kisumu, Kenya
                </p>
                <p className="font-mono text-xs text-navy/50 mt-1">
                  Floor 2 &middot; Front Desk Reception &middot; Mail Intake
                </p>
              </div>

              {/* Directory Section 02: Direct Contacts */}
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-navy/15 mb-4">
                  <span className="font-mono text-[11px] font-bold text-navy uppercase tracking-wider">
                    02. Direct Lines &amp; Channels
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-navy/50 uppercase">Telephone &amp; WhatsApp:</span>
                    <a href="tel:0110486677" className="font-medium text-navy hover:underline">
                      0110486677 / +254 110 486 677
                    </a>
                    <span className="text-xs text-navy/70">
                      Calls &amp; WhatsApp: Mon&ndash;Sat, 8:00 AM &ndash; 6:00 PM
                    </span>
                  </div>

                  <div className="flex flex-col pt-2">
                    <span className="text-xs font-mono text-navy/50 uppercase">Email Inquiries:</span>
                    <a href="mailto:hello@paperstreet.co.ke" className="font-medium text-navy hover:underline">
                      hello@paperstreet.co.ke
                    </a>
                  </div>

                  <div className="flex flex-col pt-2">
                    <span className="text-xs font-mono text-navy/50 uppercase">WhatsApp Instant Support:</span>
                    <a
                      href="https://wa.me/254110486677?text=Hello%20Paper%20Street%20Workspaces%2C%20I%20am%20inquiring%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      Chat with reception on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Directory Section 03: Business Hours & SLA */}
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-navy/15 mb-4">
                  <span className="font-mono text-[11px] font-bold text-navy uppercase tracking-wider">
                    03. Hours &amp; Compliance Standards
                  </span>
                </div>
                <div className="space-y-2 text-xs text-navy/70 font-light leading-relaxed">
                  <p>
                    <strong className="font-medium text-navy">Facility Access:</strong> Monday to Saturday: 8:00 AM &ndash; 6:00 PM
                  </p>
                  <p>
                    <strong className="font-medium text-navy">Client Portal &amp; Mail:</strong> 24/7 Digital logging &amp; PDF scans
                  </p>
                  <p>
                    <strong className="font-medium text-navy">Legal Compliance:</strong> Recognized for eCitizen BRS company registration, Section 47 Companies Act 2015, and KRA PIN certificates.
                  </p>
                </div>
              </div>

              {/* Directory Section 04: Regional Hubs */}
              <div className="pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-navy/15 mb-4">
                  <span className="font-mono text-[11px] font-bold text-navy uppercase tracking-wider">
                    04. Expansion Network
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS_LIST.map((loc) => (
                    <span
                      key={loc.id}
                      className="text-xs font-mono px-3 py-1 border border-navy/20 bg-white text-navy"
                    >
                      {loc.label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Right Column: Plain Editorial Form (No Card Wrapper) ── */}
            <div className="lg:col-span-7">

              {submissionSuccess ? (
                <div className="py-6 space-y-6">
                  <div className="border-b-2 border-navy pb-4">
                    <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                      Inquiry Dispatched &amp; Logged
                    </span>
                    <h2 className="text-3xl font-light font-heading text-navy">
                      Thank You, {submissionSuccess.name}.
                    </h2>
                    <p className="text-sm text-navy/70 mt-2 leading-relaxed">
                      Your inquiry has been recorded and an official acknowledgement has been emailed to <strong className="text-navy">{submissionSuccess.email}</strong>.
                    </p>
                  </div>

                  {/* Clean Plain Ledger Table */}
                  <table className="w-full text-xs border-collapse border-t border-b border-navy/15">
                    <tbody>
                      <tr className="border-b border-navy/10">
                        <td className="py-3 font-mono text-navy/50 uppercase w-1/3">Reference Code:</td>
                        <td className="py-3 font-mono font-bold text-navy">{submissionSuccess.reference}</td>
                      </tr>
                      <tr className="border-b border-navy/10">
                        <td className="py-3 font-mono text-navy/50 uppercase">Service:</td>
                        <td className="py-3 font-medium text-navy">{submissionSuccess.service}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-mono text-navy/50 uppercase">Location:</td>
                        <td className="py-3 font-medium text-navy">{submissionSuccess.location}</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-xs text-navy/60 font-light">
                    Our team will contact you within 2 business hours. If your requirement is urgent, you may connect directly via WhatsApp.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      className="bg-navy text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 hover:bg-navy/90 rounded-none cursor-pointer"
                    >
                      Send Another Inquiry
                    </Button>
                    <a
                      href="https://wa.me/254110486677"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-navy text-navy text-xs uppercase tracking-wider font-semibold px-6 py-3 hover:bg-navy/5"
                    >
                      WhatsApp Desk &rarr;
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="pb-4 border-b border-navy/15 mb-8">
                    <h2 className="text-2xl md:text-3xl font-light font-heading text-navy">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs text-navy/60 font-light mt-1">
                      Complete the parameters below. We record your inquiry in our database and notify you via email.
                    </p>
                  </div>

                  {apiError && (
                    <div className="mb-6 p-3 border-l-2 border-red-600 bg-red-50 text-red-700 text-xs">
                      {apiError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* 1. Service Selection Pills */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-navy/70 block mb-2 font-semibold">
                        Service Category *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICES_LIST.map((svc) => {
                          const isSelected = selectedService === svc.id
                          return (
                            <button
                              key={svc.id}
                              type="button"
                              onClick={() => handleServiceSelect(svc.id)}
                              className={`text-left p-2.5 text-xs transition-all border ${isSelected
                                  ? 'border-navy bg-navy text-white font-medium'
                                  : 'border-navy/20 bg-white text-navy/80 hover:border-navy/60'
                                }`}
                            >
                              {svc.label}
                            </button>
                          )
                        })}
                      </div>
                      {errors.service && (
                        <span className="text-xs text-red-600 mt-1 block">{errors.service.message}</span>
                      )}
                    </div>

                    {/* 2. Target Location */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-navy/70 block mb-2 font-semibold">
                        Target Location *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {LOCATIONS_LIST.map((loc) => {
                          const isSelected = selectedLocation === loc.id
                          return (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => handleLocationSelect(loc.id)}
                              className={`text-left p-2.5 text-xs transition-all border ${isSelected
                                  ? 'border-navy bg-navy text-white font-medium'
                                  : 'border-navy/20 bg-white text-navy/80 hover:border-navy/60'
                                }`}
                            >
                              <div>{loc.label}</div>
                              <span className={`text-[9px] font-mono block mt-0.5 ${isSelected ? 'text-white/70' : 'text-navy/50'}`}>
                                {loc.note}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      {errors.location && (
                        <span className="text-xs text-red-600 mt-1 block">{errors.location.message}</span>
                      )}
                    </div>

                    {/* 3. Name & Company (Clean Underline Inputs) */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
                          Full Name *
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="e.g. Jane Mwangi"
                          className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors rounded-none"
                        />
                        {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
                          Company / Organization
                        </label>
                        <input
                          {...register('company')}
                          type="text"
                          placeholder="e.g. Acme Africa Ltd"
                          className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors rounded-none"
                        />
                      </div>
                    </div>

                    {/* 4. Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
                          Email Address *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="jane@company.com"
                          className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors rounded-none"
                        />
                        {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
                          Phone / WhatsApp *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="+254 7XX XXX XXX"
                          className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors rounded-none"
                        />
                        {errors.phone && <span className="text-xs text-red-600">{errors.phone.message}</span>}
                      </div>
                    </div>

                    {/* 5. Message */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
                        Inquiry Details &amp; Requirements *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        placeholder="Please describe your planned start date, team size, or specific workspace requirements..."
                        className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors resize-none rounded-none"
                      />
                      {errors.message && <span className="text-xs text-red-600">{errors.message.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-navy/15">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-navy text-white px-10 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-navy/90 transition-all rounded-none cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            Dispatching Inquiry...
                          </>
                        ) : (
                          <>
                            Send Inquiry &rarr;
                          </>
                        )}
                      </Button>
                      <p className="text-[11px] font-mono text-navy/50 mt-2">
                        Official transactional notification dispatched via Brevo upon submission.
                      </p>
                    </div>

                  </form>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Clean Editorial FAQ Section (Plain Dividers, No Boxes) ── */}
      <section className="py-20 bg-white border-t border-navy/15">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="pb-4 border-b border-navy/15 mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-navy/70 font-semibold block mb-1">
              Reference
            </span>
            <h2 className="text-2xl md:text-3xl font-light font-heading text-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-navy/15">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-2 text-left flex items-center justify-between text-navy font-medium text-sm hover:text-navy/70 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="font-mono text-xs text-navy/50 ml-4 shrink-0">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-2 text-xs text-navy/70 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
