'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const waitlistSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  company: z.string().optional(),
  location: z.string().min(1, 'Target location is required'),
  serviceInterest: z.string().min(1, 'Please select your service interest'),
  teamSize: z.string().optional(),
  estimatedLaunchNeed: z.string().optional(),
  notes: z.string().optional(),
})

type WaitlistFormValues = z.infer<typeof waitlistSchema>

interface LocationWaitlistFormProps {
  defaultLocation?: string
  headline?: string
  subheadline?: string
  compact?: boolean
  className?: string
  onSuccess?: () => void
}

const SERVICE_OPTIONS = [
  'Virtual Office (Registered Address + Mail Scanning)',
  'Business Address & Tax Compliance Only',
  'Executive Boardroom & Meeting Space',
  'Hot Desk / Day Pass Access',
  'Dedicated Desk / Private Team Office',
  'Enterprise Multi-Desk Suite',
]

const TEAM_SIZES = ['1 Person', '2 - 5 People', '6 - 15 People', '16+ Enterprise']

const TIMELINES = [
  'Immediately / ASAP',
  'Within 1 - 3 Months',
  'Within 3 - 6 Months',
  'Just Exploring & Planning',
]

export function LocationWaitlistForm({
  defaultLocation = 'Nairobi',
  headline,
  subheadline,
  compact = false,
  className = '',
  onSuccess,
}: LocationWaitlistFormProps) {
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    reference: string
    fullName: string
    email: string
    location: string
  } | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      location: defaultLocation,
      serviceInterest: SERVICE_OPTIONS[0],
      teamSize: TEAM_SIZES[0],
      estimatedLaunchNeed: TIMELINES[1],
      notes: '',
    },
  })

  const selectedLocation = watch('location')

  const onSubmit = async (data: WaitlistFormValues) => {
    setApiError(null)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const resJson = await response.json()

      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || 'Failed to join waitlist')
      }

      setSubmissionSuccess({
        reference: resJson.waitlistId || `VIP-${Date.now().toString().slice(-6)}`,
        fullName: data.fullName,
        email: data.email,
        location: data.location,
      })

      if (onSuccess) onSuccess()
      reset()
    } catch (err: any) {
      console.error('Waitlist submission error:', err)
      setApiError(err?.message || 'We could not complete your waitlist registration. Please try again.')
    }
  }

  if (submissionSuccess) {
    return (
      <div className={`py-6 space-y-6 ${className}`}>
        <div className="border-b-2 border-navy pb-4">
          <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
            Priority Registration Confirmed
          </span>
          <h3 className="text-2xl md:text-3xl font-light font-heading text-navy">
            You are on the Priority List for {submissionSuccess.location}.
          </h3>
          <p className="text-xs md:text-sm text-navy/70 mt-2 leading-relaxed">
            Your registration is logged. An official confirmation email with your perks and reference pass has been sent to <strong className="text-navy">{submissionSuccess.email}</strong>.
          </p>
        </div>

        <table className="w-full text-xs border-collapse border-t border-b border-navy/15">
          <tbody>
            <tr className="border-b border-navy/10">
              <td className="py-2.5 font-mono text-navy/50 uppercase w-1/3">VIP Pass Code:</td>
              <td className="py-2.5 font-mono font-bold text-navy">{submissionSuccess.reference}</td>
            </tr>
            <tr className="border-b border-navy/10">
              <td className="py-2.5 font-mono text-navy/50 uppercase">Location:</td>
              <td className="py-2.5 font-medium text-navy">{submissionSuccess.location}</td>
            </tr>
            <tr>
              <td className="py-2.5 font-mono text-navy/50 uppercase">Perks:</td>
              <td className="py-2.5 font-medium text-emerald-800">20% Launch Discount + 5 Boardroom Hours</td>
            </tr>
          </tbody>
        </table>

        <div className="pt-2">
          <Button
            type="button"
            onClick={() => setSubmissionSuccess(null)}
            className="bg-navy text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 hover:bg-navy/90 rounded-none cursor-pointer"
          >
            Register Another City
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="pb-4 border-b border-navy/15 mb-6">
        <div className="font-mono text-[11px] font-bold text-navy uppercase tracking-widest mb-1">
          {headline || `Expansion Waitlist Registration &middot; ${defaultLocation}`}
        </div>
        <p className="text-xs text-navy/60 font-light leading-relaxed">
          {subheadline ||
            `Be first to know when our ${defaultLocation} hub opens. Early registrants receive 20% launch discounts and priority suite allocations.`}
        </p>
      </div>

      {apiError && (
        <div className="mb-5 p-3 border-l-2 border-red-600 bg-red-50 text-red-700 text-xs">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* City selection pills */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-navy/70 block mb-2 font-semibold">
            Target Expansion City *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Nairobi', 'Mombasa', 'Nakuru', 'Eldoret'].map((loc) => {
              const isSelected = selectedLocation === loc
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setValue('location', loc, { shouldValidate: true })}
                  className={`text-center py-2 px-3 text-xs border transition-all ${
                    isSelected
                      ? 'border-navy bg-navy text-white font-medium'
                      : 'border-navy/20 bg-white text-navy/80 hover:border-navy/60'
                  }`}
                >
                  {loc}
                </button>
              )
            })}
          </div>
          {errors.location && <span className="text-xs text-red-600 mt-1">{errors.location.message}</span>}
        </div>

        {/* Client Name & Company (Underline inputs) */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
              Full Name *
            </label>
            <input
              {...register('fullName')}
              type="text"
              placeholder="e.g. David Kamau"
              className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors rounded-none"
            />
            {errors.fullName && <span className="text-xs text-red-600">{errors.fullName.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
              Company / Organization
            </label>
            <input
              {...register('company')}
              type="text"
              placeholder="e.g. Rift Ventures Ltd"
              className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors rounded-none"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="david@company.com"
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

        {/* Service of Interest */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-navy/70 block mb-1">
            Workspace Solution Needed *
          </label>
          <select
            {...register('serviceInterest')}
            className="w-full bg-white border border-navy/20 px-3 py-2 text-xs md:text-sm text-navy focus:outline-none focus:border-navy transition-all cursor-pointer rounded-none"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Team Size & Timeline */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-navy/70 block mb-1">
              Estimated Team Size
            </label>
            <select
              {...register('teamSize')}
              className="w-full bg-white border border-navy/20 px-3 py-2 text-xs md:text-sm text-navy focus:outline-none focus:border-navy transition-all cursor-pointer rounded-none"
            >
              {TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-navy/70 block mb-1">
              Target Timeline
            </label>
            <select
              {...register('estimatedLaunchNeed')}
              className="w-full bg-white border border-navy/20 px-3 py-2 text-xs md:text-sm text-navy focus:outline-none focus:border-navy transition-all cursor-pointer rounded-none"
            >
              {TIMELINES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        {!compact && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase tracking-wider text-navy/70">
              Specific Requirements (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={2}
              placeholder="e.g. We require a private meeting room for 8 people twice a month..."
              className="bg-transparent border-0 border-b border-navy/25 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors resize-none rounded-none"
            />
          </div>
        )}

        {/* Plain Terms Row */}
        <div className="pt-2 pb-1 border-t border-navy/15 flex justify-between text-xs font-mono text-navy/70">
          <span>Priority Allocation: Enabled</span>
          <span className="font-semibold text-navy">20% Launch Rate Discount</span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-navy text-white px-10 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-navy/90 transition-all rounded-none cursor-pointer inline-flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              Registering Waitlist...
            </>
          ) : (
            <>
              Join {selectedLocation || defaultLocation} Priority List &rarr;
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
