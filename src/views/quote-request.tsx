'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  ArrowLeft,
  Check,
  Loader2,
  Send,
} from 'lucide-react'
import CapacityOverlay from '@/components/ui/CapacityOverlay'
import {
  calcAnnualSaving,
  kes,
} from '@/lib/quote-email-templates'

export type QuoteServiceSlug = 'virtual-office' | 'business-address' | 'dedicated-desk'

export interface QuotePackageConfig {
  slug: QuoteServiceSlug
  title: string
  subtitle: string
  badge: string
  description: string
  tiers: {
    id: string
    name: string
    rateDisplay: string
    monthlyRateKES: number
    commitmentPeriod: string
    subtext: string
    depositAmountKES: number
    isPopular?: boolean
  }[]
  inclusions: string[]
}

export const QUOTE_SERVICE_CONFIGS: Record<QuoteServiceSlug, QuotePackageConfig> = {
  'virtual-office': {
    slug: 'virtual-office',
    title: 'Virtual Office',
    subtitle: 'Comprehensive business presence on Oginga Odinga Street in Kisumu CBD.',
    badge: 'Flagship Membership',
    description: 'Establish a prestigious corporate footprint with an official commercial address, digital mail scanning (PDFs delivered to your email), front desk reception greeting, and monthly meeting room credits.',
    tiers: [
      {
        id: 'annual',
        name: 'Annual Commitment (12-Month Plan)',
        rateDisplay: 'KES 9,000 / mo (1 Month Free)',
        monthlyRateKES: 9000,
        commitmentPeriod: '12 Months (Annual Plan)',
        subtext: 'Billed annually at KES 108,000 (1 Month Free) · Zero security deposit',
        depositAmountKES: 0,
        isPopular: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Rolling Contract',
        rateDisplay: 'KES 10,000 / mo',
        monthlyRateKES: 10000,
        commitmentPeriod: 'Monthly Rolling (1 Month Notice)',
        subtext: 'Flexible month-to-month membership agreement · 1-Month refundable deposit',
        depositAmountKES: 10000,
      },
    ],
    inclusions: [
      'Official commercial address in Kisumu CBD on Oginga Odinga Street',
      'Digital mail scanning (300 DPI high-res PDFs delivered directly to email)',
      'Meeting room booking hours included every month',
      'Professional front-desk reception & guest greeting',
      'Eligible for eCitizen BRS company registration & KRA PIN compliance',
      'Mail collection & safe physical holding for 60 days',
    ],
  },
  'business-address': {
    slug: 'business-address',
    title: 'Business Address',
    subtitle: 'Official commercial registered address for company incorporation & compliance.',
    badge: 'Official Registration',
    description: 'Use our verifiable commercial address in Kisumu CBD for eCitizen company registration, KRA PIN compliance, corporate banking KYC, and marketing materials without renting a physical office.',
    tiers: [
      {
        id: 'annual',
        name: 'Annual Commitment (12-Month Plan)',
        rateDisplay: 'KES 4,500 / mo (1 Month Free)',
        monthlyRateKES: 4500,
        commitmentPeriod: '12 Months (Annual Plan)',
        subtext: 'Billed annually at KES 54,000 (1 Month Free) · Zero security deposit',
        depositAmountKES: 0,
        isPopular: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Rolling Contract',
        rateDisplay: 'KES 5,000 / mo',
        monthlyRateKES: 5000,
        commitmentPeriod: 'Monthly Rolling (1 Month Notice)',
        subtext: 'Flexible month-to-month registered address agreement · Refundable deposit required',
        depositAmountKES: 10000,
      },
    ],
    inclusions: [
      'Official Kisumu CBD commercial registered office address',
      'Instant proof of address certificate for bank account opening & KYC',
      'Company incorporation (eCitizen BRS) & KRA tax registration use',
      'Physical mail receiving, logging, and notifications',
      'Authorised commercial branch presence in Western Kenya',
    ],
  },
  'dedicated-desk': {
    slug: 'dedicated-desk',
    title: 'Dedicated Desk',
    subtitle: 'Your permanent personal workstation with lockable storage & address included.',
    badge: 'Resident Workstation',
    description: 'Your own reserved desk that no one else uses. Leave your monitors, setup, and documents in your lockable storage unit. Includes commercial business address and monthly boardroom booking hours.',
    tiers: [
      {
        id: 'annual',
        name: 'Annual Commitment (12-Month Plan)',
        rateDisplay: 'KES 18,000 / mo (1 Month Free)',
        monthlyRateKES: 18000,
        commitmentPeriod: '12 Months (Annual Plan)',
        subtext: 'Billed annually at KES 216,000 (1 Month Free) · Zero security deposit',
        depositAmountKES: 0,
        isPopular: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Rolling Contract',
        rateDisplay: 'KES 20,000 / mo',
        monthlyRateKES: 20000,
        commitmentPeriod: 'Monthly Rolling (1 Month Notice)',
        subtext: 'Flexible month-to-month resident workstation agreement · 1-Month refundable deposit',
        depositAmountKES: 20000,
      },
    ],
    inclusions: [
      'Permanently assigned desk (leave monitors, PC, and stationery in place)',
      'Dedicated lockable pedestal storage drawer unit',
      'Official commercial business address for company registration & mail handling',
      'High-speed fibre Wi-Fi & 100% generator power backup',
      'Monthly complimentary boardroom booking hours',
    ],
  },
}

function generateQuoteReference(serviceSlug: string): string {
  const codePrefix =
    serviceSlug === 'virtual-office'
      ? 'VO'
      : serviceSlug === 'business-address'
      ? 'BA'
      : 'DD'
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `PQ-${dateStr}-${codePrefix}${randomChars}`
}

function computeEndDate(startStr: string, months: number): string {
  if (!startStr) return ''
  try {
    const [y, m, d] = startStr.split('-').map(Number)
    const date = new Date(y, m - 1, d)
    date.setMonth(date.getMonth() + months)
    date.setDate(date.getDate() - 1)
    const ey = date.getFullYear()
    const em = String(date.getMonth() + 1).padStart(2, '0')
    const ed = String(date.getDate()).padStart(2, '0')
    return `${ey}-${em}-${ed}`
  } catch {
    return ''
  }
}

export default function QuoteRequestView({ initialSlug = 'virtual-office' }: { initialSlug?: QuoteServiceSlug }) {
  const router = useRouter()

  const config = QUOTE_SERVICE_CONFIGS[initialSlug] || QUOTE_SERVICE_CONFIGS['virtual-office']
  const isAtCapacity = initialSlug === 'dedicated-desk'

  const [selectedTierId, setSelectedTierId] = useState<string>(config.tiers[0]?.id || 'annual')
  const [durationMonths, setDurationMonths] = useState<number>(selectedTierId === 'annual' ? 12 : 1)

  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })

  const [endDate, setEndDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return computeEndDate(d.toISOString().split('T')[0], 12)
  })

  const [teamSize, setTeamSize] = useState(1)

  const handleTierChange = (tierId: string) => {
    setSelectedTierId(tierId)
    const newMonths = tierId === 'annual' ? 12 : 1
    setDurationMonths(newMonths)
    setEndDate(computeEndDate(startDate, newMonths))
  }

  const handleDurationChange = (months: number) => {
    setDurationMonths(months)
    setEndDate(computeEndDate(startDate, months))
  }

  const handleStartDateChange = (newStart: string) => {
    setStartDate(newStart)
    setEndDate(computeEndDate(newStart, durationMonths))
  }

  const [companyName, setCompanyName] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [additionalRequirements, setAdditionalRequirements] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const activeTier = config.tiers.find((t) => t.id === selectedTierId) || config.tiers[0]
  const isAnnual = activeTier.id === 'annual'
  const calculatedTotal = activeTier.monthlyRateKES * durationMonths * teamSize
  const calculatedDeposit = activeTier.depositAmountKES * teamSize
  const grandTotal = calculatedTotal + calculatedDeposit
  const { standardAnnualValue, savingKES, discountPercent } = calcAnnualSaving(
    config.slug,
    activeTier.monthlyRateKES,
    calculatedTotal,
    durationMonths,
    teamSize
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isAtCapacity) {
      setErrorMessage('Dedicated Desk workstations are currently operating at full capacity.')
      return
    }
    setErrorMessage(null)

    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setErrorMessage('Please provide your full name, work email, and phone number.')
      return
    }

    setIsSubmitting(true)

    try {
      const quoteReference = generateQuoteReference(initialSlug)

      const quoteData = {
        quoteReference,
        serviceSlug: config.slug,
        serviceTitle: config.title,
        tierName: activeTier.name,
        commitmentPeriod: `${durationMonths} Month${durationMonths > 1 ? 's' : ''} (${startDate} to ${endDate})`,
        durationMonths,
        monthlyRateKES: activeTier.monthlyRateKES,
        totalCommitmentKES: calculatedTotal,
        depositAmountKES: calculatedDeposit,
        startDate,
        endDate,
        teamSize,
        companyName: companyName.trim() || undefined,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        additionalRequirements: additionalRequirements.trim() || undefined,
        inclusions: config.inclusions,
      }

      // Store in dedicated quote_requests table
      try {
        await supabase.from('quote_requests').insert([
          {
            quote_reference: quoteReference,
            service_slug: config.slug,
            service_title: config.title,
            tier_name: activeTier.name,
            commitment_period: `${durationMonths} Month${durationMonths > 1 ? 's' : ''} (${startDate} to ${endDate})`,
            duration_months: durationMonths,
            start_date: startDate,
            end_date: endDate,
            monthly_rate_kes: activeTier.monthlyRateKES,
            total_commitment_kes: calculatedTotal,
            deposit_amount_kes: calculatedDeposit,
            team_size: teamSize,
            company_name: companyName.trim() || null,
            client_name: clientName.trim(),
            client_email: clientEmail.trim(),
            client_phone: clientPhone.trim(),
            additional_requirements: additionalRequirements.trim() || null,
            status: 'quote_sent',
          },
        ])
      } catch (dbErr) {
        console.warn('[quote_requests DB Insert Notice]', dbErr)
      }

      // Trigger email dispatch via API route (which invokes edge function with direct fallback)
      try {
        await fetch('/api/quote/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quoteData),
        })
      } catch (sendErr) {
        console.warn('[Quote send exception]', sendErr)
      }

      // Save to sessionStorage for instantaneous confirmation page display
      try {
        sessionStorage.setItem('paperstreet_latest_quote', JSON.stringify(quoteData))
        sessionStorage.setItem(`paperstreet_quote_${quoteReference}`, JSON.stringify(quoteData))
      } catch (_) {}

      // Redirect to dedicated success page
      const query = new URLSearchParams({
        ref: quoteReference,
        email: clientEmail.trim(),
        service: config.title,
        ...(companyName.trim() ? { company: companyName.trim() } : {}),
      })
      router.push(`/quote/success?${query.toString()}`)
    } catch (err: any) {
      console.error('Quote submission notice:', err)
      const fallbackRef = generateQuoteReference(initialSlug)
      const query = new URLSearchParams({
        ref: fallbackRef,
        email: clientEmail.trim(),
        service: config.title,
      })
      router.push(`/quote/success?${query.toString()}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FBFAF7] pt-28 pb-28 text-navy">
      {isAtCapacity && (
        <CapacityOverlay
          service="dedicated-desk"
          onSwitchService={(newSlug: string) => router.push(`/quote/${newSlug}`)}
        />
      )}
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        
        {/* Navigation & Header */}
        <div className="border-b border-navy/15 pb-6 mb-8">
          <Link
            href="/services"
            className="text-xs uppercase tracking-wider font-semibold text-navy/60 hover:text-navy transition-colors inline-flex items-center gap-1.5 mb-6"
          >
            <ArrowLeft size={13} /> Back to All Services
          </Link>

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy/50 font-bold block mb-2">
            {config.badge} · Kisumu CBD
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-navy">
            Request Quote: {config.title}
          </h1>
          <p className="mt-3 text-xs md:text-sm text-navy/70 leading-relaxed max-w-2xl">
            {config.description}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 border border-red-200 bg-red-50 text-red-700 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Package Specifications */}
          <div className="space-y-4 border-b border-navy/15 pb-6">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              1. Select Billing Term &amp; Plan
            </span>

            <div className="space-y-3">
              {config.tiers.map((tier) => {
                const isSelected = selectedTierId === tier.id
                return (
                  <label
                    key={tier.id}
                    className={`block p-4 border cursor-pointer transition-colors ${
                      isSelected ? 'border-navy bg-navy/5' : 'border-navy/15 hover:border-navy/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tier"
                        value={tier.id}
                        checked={isSelected}
                        onChange={() => handleTierChange(tier.id)}
                        className="mt-1 accent-navy"
                      />
                      <div className="space-y-0.5 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-navy">{tier.name}</span>
                            {tier.isPopular && (
                              <span className="font-mono text-[9px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs font-semibold text-navy">{tier.rateDisplay}</span>
                        </div>
                        <p className="text-[11px] text-navy/60">{tier.subtext}</p>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Section 2: Duration, Start Date & End Date */}
          <div className="space-y-4 border-b border-navy/15 pb-6">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              2. Contract Duration &amp; Active Dates
            </span>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                  Commitment Duration
                </label>
                <select
                  value={durationMonths}
                  onChange={(e) => handleDurationChange(Number(e.target.value))}
                  className="w-full border border-navy/20 bg-transparent px-3 py-2 text-xs text-navy focus:outline-none focus:border-navy font-mono"
                >
                  <option value={1}>1 Month (Monthly Rolling)</option>
                  <option value={3}>3 Months (Quarterly)</option>
                  <option value={6}>6 Months (Semi-Annual)</option>
                  <option value={12}>12 Months (1 Year Plan)</option>
                  <option value={24}>24 Months (2 Year Plan)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                  Target Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full border border-navy/20 bg-transparent px-3 py-2 text-xs text-navy focus:outline-none focus:border-navy font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                  Target End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-navy/20 bg-transparent px-3 py-2 text-xs text-navy focus:outline-none focus:border-navy font-mono"
                  required
                />
              </div>
            </div>

            {config.slug === 'dedicated-desk' && (
              <div className="space-y-1.5 pt-2">
                <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                  Number of Workstations / Desks
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full border border-navy/20 bg-transparent px-3 py-2 text-xs text-navy focus:outline-none focus:border-navy"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} Workstation{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Section 3: Inclusions */}
          <div className="space-y-3 border-b border-navy/15 pb-6">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              Standard Inclusions with this Package
            </span>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-navy/80">
              {config.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-700 mt-0.5 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Client & Company Information */}
          <div className="space-y-4 border-b border-navy/15 pb-6">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              3. Client &amp; Organization Information
            </span>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                Company / Organization Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Victoria Advisory Ltd or In Registration"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-navy/20 bg-transparent px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-navy"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                  Contact Person Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="w-full border border-navy/20 bg-transparent px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-navy"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                  className="w-full border border-navy/20 bg-transparent px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-navy font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                placeholder="+254 700 000 000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                className="w-full border border-navy/20 bg-transparent px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-navy font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
                Specific Requirements / Questions (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Additional mailbox scanning requirements, boardroom hours, or CR12 certificate verification support."
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                className="w-full border border-navy/20 bg-transparent px-3.5 py-2 text-xs text-navy focus:outline-none focus:border-navy"
              />
            </div>
          </div>

          {/* Live Financial Summary */}
          <div className="bg-navy/[0.03] border border-navy/15 p-5 space-y-3 text-xs">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              Investment Breakdown (Live Calculation)
            </span>
            <div className="space-y-2">
              <div className="flex justify-between text-navy/80">
                <span>Selected Service:</span>
                <span className="font-semibold text-navy">{config.title} &mdash; {activeTier.name}</span>
              </div>
              <div className="flex justify-between text-navy/80">
                <span>Monthly Equivalent:</span>
                <span className="font-mono text-navy">{kes(activeTier.monthlyRateKES * teamSize)} / mo</span>
              </div>
              {savingKES > 0 && (
                <>
                  <div className="flex justify-between text-navy/60">
                    <span>Standard Annual Value:</span>
                    <span className="font-mono line-through">{kes(standardAnnualValue)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Annual Commitment Discount ({discountPercent}% off):</span>
                    <span className="font-mono">−{kes(savingKES)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-navy/80">
                <span>Service Fee ({durationMonths} months):</span>
                <span className="font-mono font-semibold text-navy">{kes(calculatedTotal)}</span>
              </div>
              <div className="flex justify-between text-navy/80">
                <span>Security Deposit:</span>
                <span className="font-mono text-navy">
                  {calculatedDeposit > 0 ? `${kes(calculatedDeposit)} (refundable)` : 'No deposit required (KES 0)'}
                </span>
              </div>
              <div className="border-t border-navy/20 pt-2 flex justify-between text-sm font-bold text-navy">
                <span>Total Initial Amount Payable:</span>
                <span className="font-mono text-base">{kes(grandTotal)}</span>
              </div>
              {!isAnnual && durationMonths > 1 && (
                <p className="text-[11px] text-navy/60 pt-1">
                  Subsequent monthly payments: <strong>{kes(activeTier.monthlyRateKES * teamSize)}</strong> per month.
                </p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <span className="text-[11px] text-navy/60">
              Your personalized quotation will be prepared and sent with a PDF attached.
            </span>

            <button
              type="submit"
              disabled={isSubmitting || isAtCapacity}
              className="bg-navy text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 hover:bg-navy-600 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Preparing Quote...
                </>
              ) : (
                <>
                  <Send size={14} /> Send Me the Quotation
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </main>
  )
}
