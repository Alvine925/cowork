'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { validateBookingForm, ValidationErrors } from '@/lib/booking-validator'
import {
  calculateBookingSlotAndPrice,
  getAvailableStartTimesForDate,
  getDefaultStartTimeForDate,
  isPhysicalBookableService,
  OPERATING_SCHEDULE,
  getNairobiDate,
  CalculationResult,
} from '@/lib/booking-rules-engine'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Shield,
  AlertCircle,
  Clock,
  Calendar,
  Info,
  X,
} from 'lucide-react'

export type ServiceSlug = 'virtual-office' | 'business-address' | 'hot-desk' | 'dedicated-desk' | 'meeting-rooms'

export interface IndividualServiceConfig {
  slug: ServiceSlug
  title: string
  subtitle: string
  badge: string
  description: string
  tiers: {
    id: string
    name: string
    rateDisplay: string
    subtext: string
    rentAmountKES: number
    depositMonths: number
    depositAmountKES: number
    billingPeriod: string
    isPopular?: boolean
  }[]
  hasHourlyMultiplier?: boolean
  hasDayMultiplier?: boolean
  hourlyRateKES?: number
  inclusions: string[]
}

export const INDIVIDUAL_SERVICE_CONFIGS: Record<ServiceSlug, IndividualServiceConfig> = {
  'virtual-office': {
    slug: 'virtual-office',
    title: 'Virtual Office',
    subtitle: 'Comprehensive business presence on Oginga Odinga Street in Kisumu CBD.',
    badge: 'Flagship Core Service',
    description: 'Establish a credible corporate footprint with an official commercial address, digital mail scanning (PDFs delivered to your portal), front desk reception greeting, and monthly meeting room credits.',
    tiers: [
      {
        id: 'annual',
        name: 'Annual Membership',
        rateDisplay: 'KES 8,000 / mo',
        subtext: 'Billed annually at KES 96,000 (Save KES 24,000/yr)',
        rentAmountKES: 96000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '12 Months Paid Upfront',
        isPopular: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Rolling Contract',
        rateDisplay: 'KES 10,000 / mo',
        subtext: 'Requires 1 month refundable security deposit (KES 10,000)',
        rentAmountKES: 10000,
        depositMonths: 1,
        depositAmountKES: 10000,
        billingPeriod: 'Monthly Rolling',
      }
    ],
    inclusions: [
      'Official commercial address in Kisumu CBD on Oginga Odinga Street',
      'Digital mail scanning (300 DPI high-res PDFs delivered to your dashboard)',
      'Meeting room booking hours included every month',
      'Professional front-desk reception & guest greeting',
      'Eligible for eCitizen BRS company registration & KRA PIN compliance',
      'Mail collection & safe physical holding for 60 days'
    ]
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
        name: 'Annual Plan (Save 30%)',
        rateDisplay: 'KES 3,500 / mo',
        subtext: 'Billed annually at KES 42,000 (Save KES 18,000/yr)',
        rentAmountKES: 42000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '12 Months Paid Upfront',
        isPopular: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Rolling Contract',
        rateDisplay: 'KES 5,000 / mo',
        subtext: 'Requires 2 months refundable security deposit (KES 10,000)',
        rentAmountKES: 5000,
        depositMonths: 2,
        depositAmountKES: 10000,
        billingPeriod: 'Monthly Rolling',
      }
    ],
    inclusions: [
      'Official Kisumu CBD commercial registered office address',
      'Instant proof of address certificate for bank account opening & KYC',
      'Company incorporation (eCitizen BRS) & KRA tax registration use',
      'Physical mail receiving, logging, and notifications',
      'Authorised commercial branch presence in Western Kenya'
    ]
  },

  'hot-desk': {
    slug: 'hot-desk',
    title: 'Hot Desk & Day Passes',
    subtitle: 'Flexible daily, weekly and 10-day monthly flex coworking with 100% power backup.',
    badge: 'Flexible Coworking',
    description: 'Walk in, plug in, and work with zero friction. Enjoy air-conditioned open workspaces, high-speed dual-carrier fibre Wi-Fi, and 100% generator power backup.',
    hasDayMultiplier: true,
    tiers: [
      {
        id: 'half-day',
        name: 'Half-Day Pass (4 Hours)',
        rateDisplay: 'KES 1,000',
        subtext: 'Morning (08:00 - 12:00) or Afternoon (01:00 - 05:00)',
        rentAmountKES: 1000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '4-Hour Single Session',
      },
      {
        id: 'full-day',
        name: 'Full-Day Pass (08:00 AM - 06:00 PM)',
        rateDisplay: 'KES 1,500',
        subtext: 'Full working day flexible workspace access',
        rentAmountKES: 1500,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: 'Full Day Pass',
        isPopular: true,
      },
      {
        id: 'weekly',
        name: '5-Day Weekly Pass',
        rateDisplay: 'KES 6,500',
        subtext: '5 full working days of flexible workspace',
        rentAmountKES: 6500,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '5-Day Pass',
      },
      {
        id: 'monthly',
        name: 'Monthly Flex Membership (10 Days)',
        rateDisplay: 'KES 14,000 / mo',
        subtext: '10 flexible working days per month with generator backup',
        rentAmountKES: 14000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '10 Days / Month',
      }
    ],
    inclusions: [
      'High-speed redundant fibre-optic Wi-Fi',
      'Automatic 100% standby generator power backup',
      'Ergonomic mesh chairs and spacious desks',
      'Air-conditioned executive open-plan workspace',
      'Front-desk reception check-in and assistance'
    ]
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
        name: 'Annual Commitment (Best Rate)',
        rateDisplay: 'KES 18,000 / mo',
        subtext: 'Billed annually at KES 216,000 (Save KES 24,000/yr)',
        rentAmountKES: 216000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '12 Months Paid Upfront',
        isPopular: true,
      },
      {
        id: 'monthly',
        name: 'Monthly Rolling Contract',
        rateDisplay: 'KES 20,000 / mo',
        subtext: 'Requires 1 month refundable security deposit (KES 20,000)',
        rentAmountKES: 20000,
        depositMonths: 1,
        depositAmountKES: 20000,
        billingPeriod: 'Monthly Rolling',
      }
    ],
    inclusions: [
      'Permanently assigned desk (leave monitors, PC, and stationery in place)',
      'Lockable 3-tier steel drawer pedestal with private key',
      'Commercial Kisumu CBD business address & mail handling included',
      '5 hours monthly executive boardroom credits included',
      '100% standby generator backup & high-speed wired Ethernet',
      '24/7 keycard access option for resident members'
    ]
  },

  'meeting-rooms': {
    slug: 'meeting-rooms',
    title: 'Meeting & Boardrooms',
    subtitle: 'Private boardroom with 4K screen, wireless casting & conference speakerphone.',
    badge: 'On-Demand Boardroom',
    description: 'Impress clients, conduct board meetings, host team workshops, or close investments in our executive presentation boardroom in Kisumu CBD.',
    hasHourlyMultiplier: true,
    hourlyRateKES: 2000,
    tiers: [
      {
        id: 'hourly',
        name: 'Hourly Booking',
        rateDisplay: 'KES 2,000 / hour',
        subtext: 'Flexible booking by the hour (select required hours below)',
        rentAmountKES: 2000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: 'Hourly Rate',
        isPopular: true,
      },
      {
        id: 'half-day',
        name: 'Half-Day Block (4 Hours)',
        rateDisplay: 'KES 7,000',
        subtext: '4 consecutive hours (Save KES 1,000)',
        rentAmountKES: 7000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '4-Hour Block',
      },
      {
        id: 'full-day',
        name: 'Full-Day Block (8 Hours)',
        rateDisplay: 'KES 12,000',
        subtext: 'Full working day (08:30 AM - 05:30 PM) (Save KES 4,000)',
        rentAmountKES: 12000,
        depositMonths: 0,
        depositAmountKES: 0,
        billingPeriod: '8-Hour Full Day Block',
      }
    ],
    inclusions: [
      '6 to 12 executive ergonomic boardroom chairs',
      '4K presentation display with HDMI, USB-C & wireless screen casting',
      'Omnidirectional conference audio speakerphone & HD camera',
      'Magnetic whiteboard, dry-erase markers & flipchart',
      'Front-desk receptionist client greeting & direction'
    ]
  }
}

function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as any).PaystackPop) return resolve(true)

    const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true))
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export interface IndividualBookingPageProps {
  slug: ServiceSlug
  initialUser?: {
    fullName?: string
    companyName?: string
    email?: string
    phone?: string
  }
  hideNavigation?: boolean
  selectedPackageTier?: string
}

export default function IndividualBookingPage({
  slug,
  initialUser,
  hideNavigation = false,
  selectedPackageTier,
}: IndividualBookingPageProps) {
  const config = INDIVIDUAL_SERVICE_CONFIGS[slug] || INDIVIDUAL_SERVICE_CONFIGS['virtual-office']
  const isPhysical = isPhysicalBookableService(config.slug)

  // State
  const [selectedTierId, setSelectedTierId] = useState<string>(() => {
    if (selectedPackageTier && config.tiers.some((t) => t.id === selectedPackageTier)) {
      return selectedPackageTier
    }
    return config.tiers[0].id
  })
  const [multiplier, setMultiplier] = useState<number>(1)
  const [startDate, setStartDate] = useState<string>(() => {
    const nairobi = getNairobiDate()
    return nairobi.dateStr
  })
  const [customDates, setCustomDates] = useState<string[]>(() => {
    const nairobi = getNairobiDate()
    return [nairobi.dateStr]
  })
  const [startTime, setStartTime] = useState<string>(() => {
    const nairobi = getNairobiDate()
    return getDefaultStartTimeForDate(nairobi.dateStr, 10)
  })
  const [customStartTimes, setCustomStartTimes] = useState<string[]>(() => {
    const nairobi = getNairobiDate()
    return [getDefaultStartTimeForDate(nairobi.dateStr, 10)]
  })

  // Sync selectedPackageTier if changed externally
  useEffect(() => {
    if (selectedPackageTier && config.tiers.some((t) => t.id === selectedPackageTier)) {
      setSelectedTierId(selectedPackageTier)
    }
  }, [selectedPackageTier, config])

  // Helper to generate consecutive business days (skipping Sundays)
  const generateConsecutiveDates = (start: string, count: number): string[] => {
    const dates: string[] = []
    let curr = new Date(`${start}T00:00:00Z`)
    if (isNaN(curr.getTime())) curr = new Date()

    while (dates.length < count) {
      const day = curr.getUTCDay()
      if (day !== 0) { // Skip Sundays
        dates.push(curr.toISOString().split('T')[0])
      }
      curr.setUTCDate(curr.getUTCDate() + 1)
    }
    return dates
  }

  // Update customDates and customStartTimes when multiplier or startDate changes
  const handleMultiplierChange = (days: number) => {
    setMultiplier(days)
    const newDates = generateConsecutiveDates(startDate, days)
    setCustomDates(newDates)
    setCustomStartTimes((prev) => {
      return newDates.map((d, idx) => {
        return prev[idx] || getDefaultStartTimeForDate(d, selectedTier.id === 'half-day' ? 4 : 10)
      })
    })
  }

  const handleTierSelect = (tierId: string) => {
    setSelectedTierId(tierId)
    const duration = tierId === 'half-day' ? 4 : 10
    if (tierId === 'weekly') {
      setMultiplier(5)
      const newDates = generateConsecutiveDates(startDate, 5)
      setCustomDates(newDates)
      setCustomStartTimes(newDates.map((d) => getDefaultStartTimeForDate(d, duration)))
    } else if (tierId === 'monthly' && config.slug === 'hot-desk') {
      setMultiplier(10)
      const newDates = generateConsecutiveDates(startDate, 10)
      setCustomDates(newDates)
      setCustomStartTimes(newDates.map((d) => getDefaultStartTimeForDate(d, duration)))
    } else if (tierId === 'full-day' || tierId === 'half-day') {
      const m = multiplier > 5 ? 1 : (multiplier || 1)
      setMultiplier(m)
      const newDates = generateConsecutiveDates(startDate, m)
      setCustomDates(newDates)
      setCustomStartTimes(newDates.map((d) => getDefaultStartTimeForDate(d, duration)))
    } else {
      setMultiplier(1)
      setCustomDates([startDate])
      setCustomStartTimes([getDefaultStartTimeForDate(startDate, duration)])
    }
  }

  const handleCustomDateChange = (index: number, newDate: string) => {
    setCustomDates((prev) => {
      const updated = [...prev]
      updated[index] = newDate
      if (index === 0) setStartDate(newDate)
      return updated
    })

    const duration = selectedTier.id === 'half-day' ? 4 : 10
    const defaultTime = getDefaultStartTimeForDate(newDate, duration)
    const slots = getAvailableStartTimesForDate(newDate, duration)

    setCustomStartTimes((prev) => {
      const updated = [...prev]
      const current = updated[index]
      const slotObj = slots.find((s) => s.time === current)
      if (!slotObj || slotObj.isPast) {
        updated[index] = defaultTime
        if (index === 0) setStartTime(defaultTime)
      }
      return updated
    })
  }

  const handleCustomStartTimeChange = (index: number, newTime: string) => {
    setCustomStartTimes((prev) => {
      const updated = [...prev]
      while (updated.length <= index) {
        updated.push('08:00 AM')
      }
      updated[index] = newTime
      if (index === 0) setStartTime(newTime)
      return updated
    })
  }

  const handleApplyDay1TimeToAll = () => {
    const t1 = customStartTimes[0] || startTime || '08:00 AM'
    setCustomStartTimes(Array(multiplier).fill(t1))
  }

  // Duplicate date tracker to prevent booking identical dates
  const duplicateIndices = useMemo(() => {
    if (multiplier <= 1) return new Set<number>()
    const seen: Record<string, number> = {}
    const dups = new Set<number>()
    const activeDates = customDates.slice(0, multiplier)

    activeDates.forEach((d, idx) => {
      if (!d) return
      if (seen[d] !== undefined) {
        dups.add(seen[d])
        dups.add(idx)
      } else {
        seen[d] = idx
      }
    })
    return dups
  }, [customDates, multiplier])

  // Modal popup for extended hours breakdown
  const [showOvertimeModal, setShowOvertimeModal] = useState(false)

  // Marketing attribution
  const [attribution, setAttribution] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_referrer: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setAttribution({
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_referrer: document.referrer || ''
      })
    }
  }, [])

  // User form details
  const [fullName, setFullName] = useState(initialUser?.fullName || '')
  const [companyName, setCompanyName] = useState(initialUser?.companyName || '')
  const [email, setEmail] = useState(initialUser?.email || '')
  const [phone, setPhone] = useState(initialUser?.phone || '')
  const [notes, setNotes] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (initialUser?.fullName && !fullName) setFullName(initialUser.fullName)
    if (initialUser?.email && !email) setEmail(initialUser.email)
    if (initialUser?.phone && !phone) setPhone(initialUser.phone)
    if (initialUser?.companyName && !companyName) setCompanyName(initialUser.companyName)
  }, [initialUser])

  // Submission state
  const [submitting, setSubmitting] = useState(false)
  const [confirmedInlineBooking, setConfirmedInlineBooking] = useState<any>(null)

  const selectedTier = useMemo(() => {
    return config.tiers.find((t) => t.id === selectedTierId) || config.tiers[0]
  }, [config, selectedTierId])

  // Individual day engine calculations for multi-day passes
  const dayCalculations = useMemo(() => {
    if (!isPhysical) return []
    const count = multiplier > 1 ? multiplier : 1
    return Array.from({ length: count }).map((_, idx) => {
      const dStr = customDates[idx] || startDate
      const tStr = customStartTimes[idx] || startTime || '08:00 AM'
      return calculateBookingSlotAndPrice({
        serviceSlug: config.slug,
        tierId: selectedTier.id,
        baseRentKES: selectedTier.rentAmountKES,
        depositKES: 0,
        dateStr: dStr,
        startTimeStr: tStr,
        multiplier: 1,
      })
    })
  }, [isPhysical, multiplier, customDates, customStartTimes, startDate, startTime, selectedTier, config.slug])

  // Real-time authoritative pricing and overtime calculations
  const calculation = useMemo(() => {
    let rentBase = selectedTier.rentAmountKES
    let activeMultiplier = 1

    if (selectedTier.id === 'hourly') {
      activeMultiplier = multiplier
      rentBase = selectedTier.rentAmountKES * multiplier
    } else if (selectedTier.id === 'full-day' && config.hasDayMultiplier) {
      activeMultiplier = multiplier
      rentBase = selectedTier.rentAmountKES * multiplier
    } else if (selectedTier.id === 'weekly') {
      // 5-day package with bundled pricing
      activeMultiplier = 5
      rentBase = selectedTier.rentAmountKES
    } else if (selectedTier.id === 'monthly' && config.slug === 'hot-desk') {
      // 10-day flex package with bundled pricing
      activeMultiplier = 10
      rentBase = selectedTier.rentAmountKES
    }

    const depositAmount = selectedTier.depositAmountKES

    // Multi-day aggregation
    if (multiplier > 1 && isPhysical && dayCalculations.length > 0) {
      const totalOvertimeFee = dayCalculations.reduce((sum, dc) => sum + dc.overtimeFeeKES, 0)
      const totalOvertimeHours = dayCalculations.reduce((sum, dc) => sum + dc.chargeableOvertimeHours, 0)
      const isAnyOvertime = totalOvertimeFee > 0
      const isAnySunday = dayCalculations.some((dc) => dc.isSunday)
      const isAnyInvalid = dayCalculations.some((dc) => !dc.isValid)
      const firstInvalid = dayCalculations.find((dc) => !dc.isValid)

      const totalAmount = rentBase + totalOvertimeFee + depositAmount
      const primaryEngineResult = dayCalculations[0] || {}

      const multiEngineResult: CalculationResult = {
        ...primaryEngineResult,
        isValid: !isAnyInvalid,
        validationError: firstInvalid?.validationError || null,
        isSunday: isAnySunday,
        isOvertime: isAnyOvertime,
        chargeableOvertimeHours: totalOvertimeHours,
        overtimeFeeKES: totalOvertimeFee,
        totalAmountKES: totalAmount,
        overtimeDisplay: isAnyOvertime
          ? `${totalOvertimeHours} hr${totalOvertimeHours > 1 ? 's' : ''} total extended-hours (+ KES ${totalOvertimeFee.toLocaleString()})`
          : null,
      }

      return {
        rentBase,
        depositAmount,
        depositMonths: selectedTier.depositMonths,
        activeMultiplier,
        initialTotal: totalAmount,
        engineResult: multiEngineResult,
      }
    }

    // Single-day calculation
    const engineResult = calculateBookingSlotAndPrice({
      serviceSlug: config.slug,
      tierId: selectedTier.id,
      baseRentKES: rentBase,
      depositKES: depositAmount,
      dateStr: startDate,
      startTimeStr: startTime,
      multiplier: activeMultiplier,
    })

    return {
      rentBase,
      depositAmount,
      depositMonths: selectedTier.depositMonths,
      activeMultiplier,
      initialTotal: engineResult.totalAmountKES,
      engineResult,
    }
  }, [selectedTier, multiplier, config, startDate, startTime, isPhysical, dayCalculations])

  // Available start time slots for selected date based on dynamic package duration
  const availableSlots = useMemo(() => {
    if (!isPhysical) return []
    const duration = calculation.engineResult.durationHours || (selectedTier.id === 'half-day' ? 4 : 8)
    return getAvailableStartTimesForDate(startDate, duration)
  }, [isPhysical, startDate, calculation.engineResult.durationHours, selectedTier.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSubmitError(null)

    if (!agreedTerms) {
      alert('Please agree to the Terms of Service & Refund Policy to proceed.')
      return
    }

    // 1. Strict anti-injection & generic data validation
    const validation = validateBookingForm({
      serviceSlug: config.slug,
      fullName,
      companyName: config.slug === 'hot-desk' ? undefined : companyName,
      email,
      phone,
      startDate,
      notes
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    // Check for duplicate dates or Sunday dates in multi-day selection
    if (isPhysical && multiplier > 1) {
      const activeDates = customDates.slice(0, multiplier).filter(Boolean)
      const uniqueSet = new Set(activeDates)
      if (uniqueSet.size < multiplier) {
        setSubmitError('Each day pass must be scheduled for a different, unique date. Duplicate dates are not permitted.')
        return
      }

      for (let i = 0; i < multiplier; i++) {
        const dStr = customDates[i]
        if (!dStr) {
          setSubmitError(`Please select a valid date for Day ${i + 1}.`)
          return
        }
        const d = new Date(`${dStr}T00:00:00Z`)
        if (d.getUTCDay() === 0) {
          setSubmitError(`Day ${i + 1} (${dStr}) is a Sunday. Paper Street is closed on Sundays.`)
          return
        }
      }
    }

    // 2. Business rules engine validation
    if (isPhysical && !calculation.engineResult.isValid) {
      setSubmitError(calculation.engineResult.validationError || 'Invalid booking date or time selected.')
      return
    }

    setSubmitting(true)

    try {
      const datesFormatted = multiplier > 1 ? customDates.join(', ') : validation.sanitized.startDate
      const primaryDate = multiplier > 1 && customDates[0] ? customDates[0] : validation.sanitized.startDate
      const allActiveDates = multiplier > 1 && customDates.length > 0 ? customDates : [primaryDate]

      // 1. Generate clean alphanumeric booking code, payment reference, and QR token
      const todayFormatted = new Date().toISOString().slice(2, 10).replace(/-/g, '')
      const alphaCode = Math.random().toString(36).substring(2, 6).toUpperCase()
      const randomSuffix = Math.floor(1000 + Math.random() * 9000)
      const reference = `PS-${todayFormatted}-${alphaCode}-${randomSuffix}`
      const passSuffix = (config.slug || 'hot').substring(0, 3).toUpperCase()
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      const rndCode = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      const passCode = `PS-${rndCode(3)}${Math.floor(10 + Math.random() * 90)}-${passSuffix}${rndCode(2)}`
      const qrToken = `QR-${passCode}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      const userId = `guest_${validation.sanitized.email.replace(/[^a-zA-Z0-9]/g, '_')}`

      const scheduleDataJson = JSON.stringify({
        isMultiDay: multiplier > 1,
        totalDays: allActiveDates.length,
        dates: allActiveDates,
        times: customStartTimes,
      })

      const formattedNotes = [
        validation.sanitized.notes,
        validation.sanitized.companyName ? `Company: ${validation.sanitized.companyName}` : null,
        multiplier > 1 ? `Schedule: ${allActiveDates.join(', ')}` : null,
        `[SCHEDULE_DATA]:${scheduleDataJson}`,
      ].filter(Boolean).join(' | ')

      const payload = {
        clientName: validation.sanitized.fullName,
        clientEmail: validation.sanitized.email,
        clientPhone: validation.sanitized.phone,
        companyName: validation.sanitized.companyName,
        serviceSlug: config.slug,
        serviceTitle: config.title,
        tierName: selectedTier.name,
        tierId: selectedTier.id,
        location: 'Kisumu CBD (CBD Commercial Center)',
        bookingDate: primaryDate,
        datesFormatted: datesFormatted,
        selectedDates: allActiveDates,
        multiplier: multiplier,
        startTime: calculation.engineResult.startTime,
        endTime: calculation.engineResult.calculatedEndTime,
        durationHours: calculation.engineResult.durationHours,
        rentAmountKES: calculation.rentBase,
        depositAmountKES: calculation.depositAmount,
        overtimeHours: calculation.engineResult.chargeableOvertimeHours,
        overtimeFeeKES: calculation.engineResult.overtimeFeeKES,
        totalAmountKES: calculation.initialTotal,
        specialRequests: formattedNotes,
        reference: reference,
        passCode: passCode,
        qrToken: qrToken,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_referrer: attribution.utm_referrer,
      }

      // 2. Pre-insert the draft booking directly into Supabase database as 'unpaid' / 'pending'
      try {
        const { data: newBooking } = await supabase
          .from('client_bookings')
          .insert([
            {
              user_id: userId,
              client_name: validation.sanitized.fullName,
              client_email: validation.sanitized.email,
              client_phone: validation.sanitized.phone,
              company_name: validation.sanitized.companyName || null,
              service_title: `${config.title} (${selectedTier.name})`,
              location: 'Kisumu CBD (CBD Commercial Center)',
              booking_date: primaryDate,
              start_time: calculation.engineResult.startTime,
              end_time: calculation.engineResult.calculatedEndTime,
              calculated_end_time: calculation.engineResult.calculatedEndTime,
              duration_hours: calculation.engineResult.durationHours,
              attendees: 1,
              rent_amount_kes: calculation.rentBase,
              deposit_amount_kes: calculation.depositAmount,
              overtime_hours: calculation.engineResult.chargeableOvertimeHours,
              overtime_fee_kes: calculation.engineResult.overtimeFeeKES,
              total_amount_kes: calculation.initialTotal,
              status: 'pending',
              payment_status: 'unpaid',
              payment_method: 'Paystack',
              paystack_reference: reference,
              check_in_status: 'pending',
              qr_code_token: passCode,
              special_requests: formattedNotes,
              utm_source: attribution.utm_source || null,
              utm_medium: attribution.utm_medium || null,
              utm_campaign: attribution.utm_campaign || null,
              utm_referrer: attribution.utm_referrer || null,
              email_sent: false,
            }
          ])
          .select('id')
          .single()

      } catch (insertErr) {
        console.warn('[Pre-DB Insert Warning]', insertErr)
      }

      let data: any = null

      // 3. Invoke Supabase initialize-paystack Edge Function
      const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('initialize-paystack', {
        body: payload,
      })

      if (!edgeErr && edgeData?.success) {
        data = edgeData
      } else {
        // Fallback to Next.js API route
        const res = await fetch('/api/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        data = await res.json()
      }

      if (!data || !data.success) {
        setSubmitError(data?.error || 'Unable to initialize payment session. Please try again.')
        setSubmitting(false)
        return
      }

      // Save pending metadata to session storage
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('ps_pending_latest', JSON.stringify(payload))
          if (data.reference) {
            sessionStorage.setItem(`ps_pending_${data.reference}`, JSON.stringify(payload))
          }
        } catch (_) { }
      }

      // 4. Load Paystack Inline script and trigger popup modal
      const scriptReady = await loadPaystackScript()

      if (scriptReady && (window as any).PaystackPop && data.publicKey && !data.publicKey.includes('placeholder')) {
        const setupOptions: any = {
          key: data.publicKey,
          email: validation.sanitized.email,
          amount: Math.round(calculation.initialTotal * 100),
          currency: 'KES',
          callback: function (response: { reference: string }) {
            const finalRef = response?.reference || data?.reference || reference
            if (hideNavigation) {
              void (async () => {
                try {
                  await fetch(`/api/paystack/verify?reference=${encodeURIComponent(finalRef)}`)
                } catch (_) { }
                setConfirmedInlineBooking({
                  ...payload,
                  reference: finalRef,
                  passCode: passCode,
                  serviceTitle: `${config.title} (${selectedTier.name})`,
                  datesFormatted,
                  totalAmount: calculation.initialTotal,
                  status: 'confirmed',
                  payment_status: 'paid',
                })
                setSubmitting(false)
              })()
            } else {
              window.location.href = `/book/confirmation?reference=${encodeURIComponent(finalRef)}`
            }
          },
          onClose: function () {
            setSubmitting(false)
          },
        }

        setupOptions.ref = data.reference || reference
        if (data.access_code) {
          setupOptions.access_code = data.access_code
        }
        setupOptions.metadata = {
          custom_fields: [
            { display_name: 'Client Name', variable_name: 'client_name', value: validation.sanitized.fullName },
            { display_name: 'Service', variable_name: 'service_title', value: `${config.title} (${selectedTier.name} x${multiplier})` },
            { display_name: 'Phone', variable_name: 'phone', value: validation.sanitized.phone },
            { display_name: 'Schedule', variable_name: 'schedule', value: `${datesFormatted} (${calculation.engineResult.startTime} - ${calculation.engineResult.calculatedEndTime})` },
          ],
        }

        const handler = (window as any).PaystackPop.setup(setupOptions)
        handler.openIframe()
      } else if (data.authorization_url) {
        window.location.href = data.authorization_url
      } else {
        setSubmitError('Unable to open payment modal. Please try again.')
        setSubmitting(false)
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'A network error occurred while connecting to payment service.')
      setSubmitting(false)
    }
  }

  return (
    <div className={hideNavigation ? 'w-full text-navy' : 'min-h-screen bg-[#fbfaf7] pt-28 pb-28 text-navy'}>
      <div className={hideNavigation ? 'w-full' : 'container mx-auto px-6 md:px-12 max-w-6xl'}>
        {/* Navigation Breadcrumb */}
        {!hideNavigation && (
          <div className="flex items-center gap-2 text-xs text-navy/60 uppercase tracking-widest font-mono mb-6 border-b border-navy/10 pb-3">
            <Link href="/services" className="hover:text-navy transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services/${config.slug}`} className="hover:text-navy transition-colors">{config.title}</Link>
            <span>/</span>
            <span className="text-navy font-bold">Booking</span>
          </div>
        )}

        {/* Top Header - Editorial Layout */}
        <div className="max-w-4xl mb-14 pb-8 border-b border-navy/15">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-2">
            {config.badge} · Kisumu CBD
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-navy tracking-tight">
            {config.title}
          </h1>
          <p className="mt-4 text-sm md:text-base text-navy/70 font-light leading-relaxed max-w-3xl">
            {config.description}
          </p>

          {['virtual-office', 'business-address', 'dedicated-desk'].includes(config.slug) && (
            <div className="mt-6 p-4 border border-navy/20 bg-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-semibold text-navy block text-sm">Require an Official Corporate Quotation?</span>
                <span className="text-navy/70">Select your specifications and receive an instant PDF proposal delivered to your email.</span>
              </div>
              <Link
                href={`/quote/${config.slug}`}
                className="bg-navy text-white text-[11px] uppercase tracking-wider font-semibold px-5 py-2.5 hover:bg-navy-600 transition-colors shrink-0 text-center"
              >
                Get Official Quote &rarr;
              </Link>
            </div>
          )}
        </div>

        {confirmedInlineBooking ? (
          <div className="py-8 border-t border-b border-navy/15 space-y-8 animate-paper-rise">
            <div className="p-6 md:p-8 bg-emerald-50 border-l-4 border-emerald-600 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1">
                Payment &amp; Reservation Confirmed
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mt-2">
                {confirmedInlineBooking.serviceTitle}
              </h2>
              <p className="text-xs text-navy/70">
                Scheduled for <strong className="text-navy">{confirmedInlineBooking.datesFormatted}</strong> · Kisumu CBD Hub.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-emerald-600/20">
                <div className="p-3.5 bg-white border border-emerald-200">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-navy/60">Booking Reference</p>
                  <p className="font-mono text-base font-bold text-navy mt-0.5">{confirmedInlineBooking.reference}</p>
                </div>
                <div className="p-3.5 bg-white border border-emerald-200">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-navy/60">High-Speed Wi-Fi</p>
                  <p className="font-mono text-xs font-bold text-navy mt-0.5">PaperStreet-Guest-5G / Kisumu2026!</p>
                </div>
              </div>

              <p className="text-[11px] text-emerald-900 pt-1">
                &check; Automated confirmation emails dispatched to <strong>{confirmedInlineBooking.clientEmail || email}</strong> and the management concierge desk.
              </p>
              <p className="text-[11px] text-navy/70">
                Simply present your Booking Reference or Name at reception upon arrival for seamless check-in.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/portal/client/bookings?tab=schedule"
                className="bg-navy text-white px-6 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-navy-700 transition-colors inline-flex items-center gap-2"
              >
                View My Schedule &amp; Bookings &rarr;
              </Link>
              <button
                type="button"
                onClick={() => setConfirmedInlineBooking(null)}
                className="border border-navy/20 text-navy px-6 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-navy/5 transition-colors cursor-pointer"
              >
                Schedule Another Reservation
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Seamless Flow Directly on Canvas */}
              <div className="lg:col-span-7 space-y-12">

                {/* Section 1: Plan & Billing Term */}
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-navy/15 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-navy font-bold">01</span>
                      <h2 className="font-heading text-xl md:text-2xl text-navy">Select Plan &amp; Billing Term</h2>
                    </div>
                    <span className="text-[11px] text-navy/50 font-mono">{config.tiers.length} Options</span>
                  </div>

                  <div className="space-y-4">
                    {config.tiers.map((tier) => {
                      const isSelected = tier.id === selectedTierId
                      return (
                        <div
                          key={tier.id}
                          onClick={() => handleTierSelect(tier.id)}
                          className={`p-5 cursor-pointer transition-all border-l-2 ${isSelected
                              ? 'border-navy bg-navy/[0.04]'
                              : 'border-navy/15 hover:border-navy/40 hover:bg-navy/[0.015]'
                            }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-heading text-lg font-semibold text-navy">{tier.name}</h3>
                                {tier.isPopular && (
                                  <span className="bg-navy text-white text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold">
                                    Best Value
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-navy/70 mt-1 leading-relaxed">{tier.subtext}</p>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-mono text-base font-bold text-navy block">
                                {tier.rateDisplay}
                              </span>
                              <span className="font-mono text-[10px] text-navy/50">
                                {tier.billingPeriod}
                              </span>
                            </div>
                          </div>

                          {tier.depositMonths > 0 && isSelected && (
                            <div className="mt-3 pt-3 border-t border-navy/10 flex items-center gap-2 text-xs text-navy/80 font-medium">
                              <Shield size={13} className="text-navy shrink-0" />
                              <span>
                                Refundable Security Deposit: <strong>{tier.depositMonths} {tier.depositMonths === 1 ? 'Month' : 'Months'} (KES {tier.depositAmountKES.toLocaleString()})</strong> held securely.
                              </span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Multiplier (Hourly or Days) */}
                  {selectedTier.id === 'hourly' && (
                    <div className="pt-4 border-t border-navy/10 space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                        Number of hours needed
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((hrs) => (
                          <button
                            key={hrs}
                            type="button"
                            onClick={() => setMultiplier(hrs)}
                            className={`py-2.5 text-center font-mono text-xs font-semibold transition-all border ${multiplier === hrs
                                ? 'bg-navy text-white border-navy'
                                : 'bg-transparent text-navy border-navy/20 hover:border-navy/50'
                              }`}
                          >
                            {hrs} {hrs === 1 ? 'Hour' : 'Hours'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTier.id === 'full-day' && config.hasDayMultiplier && (
                    <div className="pt-4 border-t border-navy/10 space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                        Number of day passes
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 5].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => handleMultiplierChange(days)}
                            className={`py-2.5 text-center font-mono text-xs font-semibold transition-all border ${multiplier === days
                                ? 'bg-navy text-white border-navy'
                                : 'bg-transparent text-navy border-navy/20 hover:border-navy/50'
                              }`}
                          >
                            {days} {days === 1 ? 'Day' : 'Days'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: Schedule & Hub Location */}
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-navy/15 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-navy font-bold">02</span>
                      <h2 className="font-heading text-xl md:text-2xl text-navy">
                        {isPhysical ? 'Schedule &amp; Operating Hours' : 'Start Date &amp; Hub Location'}
                      </h2>
                    </div>
                    {isPhysical && (
                      <span className="text-[10px] font-mono text-navy/60 uppercase tracking-wider">
                        {calculation.engineResult.daySchedule?.label || 'Mon-Fri: 8am-6pm | Sat: 9am-4:30pm'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="w-full bg-navy/[0.03] border border-navy/20 p-3 text-xs text-navy">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 block">Hub Location</span>
                      <strong className="text-navy text-sm">Kisumu CBD · CBD Commercial Center (Oginga Odinga St)</strong>
                    </div>

                    {/* Single Date & Time Picker if 1 Day */}
                    {multiplier <= 1 ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5 flex items-center justify-between">
                            <span>Booking Date *</span>
                            {isPhysical && (
                              <span className="text-[10px] text-navy/60 lowercase">
                                (closed Sundays)
                              </span>
                            )}
                          </label>
                          <input
                            type="date"
                            required
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value)
                              setCustomDates([e.target.value])
                              if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: undefined }))
                            }}
                            min={getNairobiDate().dateStr}
                            className={`w-full bg-navy/[0.03] border p-2.5 text-xs text-navy outline-none transition-colors ${errors.startDate || (isPhysical && calculation.engineResult.isSunday)
                                ? 'border-red-600 bg-red-50/20'
                                : 'border-navy/20 focus:border-navy focus:bg-white'
                              }`}
                          />
                          {errors.startDate && (
                            <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                              <AlertCircle size={12} /> {errors.startDate}
                            </p>
                          )}
                          {isPhysical && calculation.engineResult.isSunday && (
                            <p className="mt-1.5 text-[11px] text-red-600 bg-red-50 p-2 border border-red-200 flex items-center gap-1 font-medium">
                              <AlertCircle size={13} className="shrink-0" />
                              Paper Street is closed on Sundays. Please select Monday to Saturday.
                            </p>
                          )}
                        </div>

                        {/* Smart Time Selection for Single Physical Day */}
                        {isPhysical && !calculation.engineResult.isSunday && (
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1.5">
                                <Clock size={13} className="text-navy" />
                                <span>Select Start Time &amp; Calculated End Time</span>
                              </label>
                              <span className="text-[11px] font-mono text-navy/70">
                                Duration: <strong>{calculation.engineResult.durationHours} Hours</strong>
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 border border-navy/15 bg-navy/[0.015]">
                              {availableSlots.length > 0 ? (
                                availableSlots.map((slot) => {
                                  const isSelected = startTime === slot.time
                                  return (
                                    <button
                                      key={slot.time}
                                      type="button"
                                      disabled={slot.isPast}
                                      onClick={() => {
                                        setStartTime(slot.time)
                                        setCustomStartTimes([slot.time])
                                      }}
                                      className={`p-2.5 text-left text-xs transition-all border flex flex-col justify-between ${slot.isPast
                                          ? 'opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400'
                                          : isSelected
                                            ? 'bg-navy text-white border-navy shadow-xs'
                                            : 'bg-white text-navy border-navy/15 hover:border-navy/40 hover:bg-navy/[0.02]'
                                        }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold">{slot.time}</span>
                                        {slot.isOvertime && (
                                          <span className={`text-[9px] px-1 py-0.2 font-mono uppercase font-semibold ${isSelected ? 'bg-gold/30 text-amber-200' : 'bg-amber-100 text-amber-800'
                                            }`}>
                                            +KES {slot.overtimeHours * 200}
                                          </span>
                                        )}
                                      </div>
                                      <span className={`text-[10px] mt-1 ${isSelected ? 'text-white/80' : 'text-navy/60'}`}>
                                        Ends at {slot.endTime}
                                      </span>
                                    </button>
                                  )
                                })
                              ) : (
                                <div className="col-span-full py-4 text-center text-xs text-navy/60">
                                  No operating time slots available for this date.
                                </div>
                              )}
                            </div>

                            {/* Calculated Time & Overtime Summary Banner */}
                            <div className="p-3 bg-navy/[0.03] border border-navy/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                              <div>
                                <span className="text-navy/60 block text-[10px] uppercase tracking-wider font-mono">Calculated Reservation Window</span>
                                <span className="font-semibold text-navy text-sm">
                                  {calculation.engineResult.startTime} &rarr; {calculation.engineResult.calculatedEndTime}
                                </span>
                                <span className="text-navy/60 text-[11px] block mt-0.5">
                                  Normal Closing: {calculation.engineResult.normalClosingTime}
                                </span>
                              </div>

                              {calculation.engineResult.isOvertime ? (
                                <div className="sm:text-right bg-amber-50 border border-amber-200 p-2.5 text-amber-900 rounded-none">
                                  <span className="font-bold text-xs flex items-center gap-1.5 sm:justify-end text-amber-900">
                                    <Clock size={13} className="text-amber-700" /> Extended-Hours Access
                                  </span>
                                  <p className="text-[11px] text-amber-800 mt-0.5">
                                    {calculation.engineResult.overtimeDisplay}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => setShowOvertimeModal(true)}
                                    className="mt-1 text-[10px] text-amber-900 font-semibold underline hover:text-amber-950 inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Info size={11} /> How is this calculated?
                                  </button>
                                </div>
                              ) : (
                                <div className="sm:text-right text-emerald-800 font-medium text-[11px] flex items-center gap-1 sm:justify-end">
                                  <Check size={13} /> Within Standard Operating Hours (No Extra Fee)
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Multi-Day: Dedicated Date & Time Slot for Each Day */
                      <div className="space-y-4 pt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1.5">
                            <Calendar size={13} className="text-navy" />
                            <span>Select Dates &amp; Times for Your {multiplier} Day Passes *</span>
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setCustomDates(generateConsecutiveDates(customDates[0] || startDate, multiplier))}
                              className="text-[11px] text-navy font-semibold underline hover:text-navy-600 cursor-pointer"
                            >
                              Autofill Next Workdays &rarr;
                            </button>
                            <button
                              type="button"
                              onClick={handleApplyDay1TimeToAll}
                              className="text-[11px] text-navy/70 font-semibold underline hover:text-navy cursor-pointer"
                            >
                              Apply Day 1 Time to All
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Array.from({ length: multiplier }).map((_, idx) => {
                            const dateVal = customDates[idx] || ''
                            const dObj = new Date(`${dateVal}T00:00:00Z`)
                            const isSunday = !isNaN(dObj.getTime()) && dObj.getUTCDay() === 0
                            const duration = selectedTier.id === 'half-day' ? 4 : 8
                            const slotsForThisDay = getAvailableStartTimesForDate(dateVal, duration)
                            const currentStartTime = customStartTimes[idx] || startTime || '08:00 AM'
                            const dayCalc = dayCalculations[idx]

                            const isDuplicate = duplicateIndices.has(idx)

                            return (
                              <div key={idx} className={`p-4 bg-white border shadow-xs space-y-3 ${isDuplicate ? 'border-red-400 bg-red-50/10' : 'border-navy/20'}`}>
                                <div className="flex items-center justify-between border-b border-navy/10 pb-2">
                                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-navy">
                                    Day {idx + 1} Pass
                                  </span>
                                  {dayCalc && !isSunday && !isDuplicate && (
                                    <span className="font-mono text-[11px] text-navy font-semibold">
                                      {dayCalc.startTime} &rarr; {dayCalc.calculatedEndTime}
                                    </span>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy/70 mb-1">
                                    Pass Date
                                  </label>
                                  <input
                                    type="date"
                                    required
                                    value={dateVal}
                                    onChange={(e) => handleCustomDateChange(idx, e.target.value)}
                                    min={getNairobiDate().dateStr}
                                    className={`w-full bg-white border p-2 text-xs text-navy outline-none ${isSunday || isDuplicate ? 'border-red-600 bg-red-50/20' : 'border-navy/20 focus:border-navy'
                                      }`}
                                  />
                                  {isSunday && (
                                    <p className="mt-1 text-[10px] text-red-600 font-medium flex items-center gap-1">
                                      <AlertCircle size={10} /> Closed Sunday (Please choose Mon - Sat)
                                    </p>
                                  )}
                                  {isDuplicate && !isSunday && (
                                    <p className="mt-1 text-[10px] text-red-600 font-medium flex items-center gap-1">
                                      <AlertCircle size={10} /> Duplicate date! Please choose a unique date for each pass.
                                    </p>
                                  )}
                                </div>

                                {!isSunday && (
                                  <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy/70 mb-1 flex items-center justify-between">
                                      <span>Select Start Time</span>
                                      <span className="text-[10px] lowercase text-navy/50">
                                        ({duration}h session)
                                      </span>
                                    </label>
                                    <select
                                      value={currentStartTime}
                                      onChange={(e) => handleCustomStartTimeChange(idx, e.target.value)}
                                      className="w-full bg-navy/[0.02] border border-navy/20 p-2 text-xs font-mono text-navy outline-none focus:border-navy focus:bg-white"
                                    >
                                      {slotsForThisDay.map((slot) => (
                                        <option key={slot.time} value={slot.time} disabled={slot.isPast}>
                                          {slot.time} &rarr; Ends at {slot.endTime} {slot.isOvertime ? `(+KES ${slot.overtimeHours * 200} overtime)` : ''} {slot.isPast ? '(Passed)' : ''}
                                        </option>
                                      ))}
                                    </select>

                                    {dayCalc && dayCalc.isOvertime && (
                                      <p className="mt-1 text-[10px] text-amber-800 font-medium flex items-center gap-1">
                                        <Clock size={10} /> +{dayCalc.chargeableOvertimeHours} hr extended-hours (+KES {dayCalc.overtimeFeeKES.toLocaleString()})
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {/* Multi-Day Overview Banner */}
                        <div className="p-3.5 bg-navy/[0.03] border border-navy/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-navy/60 block text-[10px] uppercase tracking-wider font-mono">
                              Multi-Day Passes Schedule Summary
                            </span>
                            <p className="font-semibold text-navy mt-0.5">
                              {multiplier} Sessions Booked across selected dates
                            </p>
                          </div>

                          {calculation.engineResult.isOvertime ? (
                            <div className="sm:text-right bg-amber-50 border border-amber-200 p-2 text-amber-900">
                              <span className="font-bold text-xs flex items-center gap-1 sm:justify-end text-amber-900">
                                <Clock size={12} className="text-amber-700" /> Multi-Day Extended Hours
                              </span>
                              <p className="text-[11px] text-amber-800 mt-0.5">
                                {calculation.engineResult.overtimeDisplay}
                              </p>
                            </div>
                          ) : (
                            <div className="sm:text-right text-emerald-800 font-medium text-[11px] flex items-center gap-1 sm:justify-end">
                              <Check size={13} /> All sessions within standard operating hours
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Contact & Organization Details */}
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-navy/15 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-navy font-bold">03</span>
                      <h2 className="font-heading text-xl md:text-2xl text-navy">
                        {config.slug === 'hot-desk'
                          ? 'Pass Holder Details'
                          : config.slug === 'meeting-rooms'
                            ? 'Meeting Organizer Details'
                            : config.slug === 'virtual-office'
                              ? 'Director & Company Details'
                              : config.slug === 'business-address'
                                ? 'Business Registrant Details'
                                : 'Resident Member Details'}
                      </h2>
                    </div>
                  </div>

                  <div className={`grid gap-5 ${config.slug === 'hot-desk' ? 'sm:grid-cols-1 md:grid-cols-3' : 'sm:grid-cols-2'}`}>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                        {config.slug === 'hot-desk'
                          ? 'Your Full Name *'
                          : config.slug === 'meeting-rooms'
                            ? 'Organizer Full Name *'
                            : config.slug === 'dedicated-desk'
                              ? 'Resident Member Name *'
                              : 'Director / Applicant Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value)
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }))
                        }}
                        placeholder="e.g. Alvine Otieno"
                        className={`w-full bg-navy/[0.03] border p-2.5 text-xs text-navy outline-none transition-colors ${errors.fullName ? 'border-red-600 bg-red-50/20' : 'border-navy/20 focus:border-navy focus:bg-white'
                          }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={12} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {config.slug !== 'hot-desk' && (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                          {config.slug === 'business-address'
                            ? 'Registered / Proposed Entity Name *'
                            : config.slug === 'virtual-office'
                              ? 'Registered Company / Business Name *'
                              : config.slug === 'meeting-rooms'
                                ? 'Company / Organization (Optional)'
                                : 'Company / Practice Name (Optional)'}
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value)
                            if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }))
                          }}
                          placeholder={config.slug === 'meeting-rooms' ? 'e.g. Acme Africa Ltd' : 'e.g. Acme Solutions Africa Ltd'}
                          className={`w-full bg-navy/[0.03] border p-2.5 text-xs text-navy outline-none transition-colors ${errors.companyName ? 'border-red-600 bg-red-50/20' : 'border-navy/20 focus:border-navy focus:bg-white'
                            }`}
                        />
                        {errors.companyName && (
                          <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle size={12} /> {errors.companyName}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                        {config.slug === 'hot-desk' ? 'Email (For Pass & Wi-Fi) *' : 'Official Contact Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                        }}
                        placeholder={config.slug === 'hot-desk' ? 'e.g. alvine@gmail.com' : 'e.g. alvine@company.africa'}
                        className={`w-full bg-navy/[0.03] border p-2.5 text-xs text-navy outline-none transition-colors ${errors.email ? 'border-red-600 bg-red-50/20' : 'border-navy/20 focus:border-navy focus:bg-white'
                          }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                        M-Pesa Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
                        }}
                        placeholder="e.g. 0712 345 678"
                        className={`w-full bg-navy/[0.03] border p-2.5 text-xs text-navy outline-none transition-colors ${errors.phone ? 'border-red-600 bg-red-50/20' : 'border-navy/20 focus:border-navy focus:bg-white'
                          }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                      {config.slug === 'hot-desk'
                        ? 'Special Preferences (Optional)'
                        : config.slug === 'meeting-rooms'
                          ? 'Room Setup / AV Requirements (Optional)'
                          : config.slug === 'virtual-office'
                            ? 'Mail Handling & Compliance Notes (Optional)'
                            : 'Special Instructions / Requirements (Optional)'}
                    </label>
                    <textarea
                      rows={2}
                      maxLength={350}
                      value={notes}
                      onChange={(e) => {
                        setNotes(e.target.value)
                        if (errors.notes) setErrors((prev) => ({ ...prev, notes: undefined }))
                      }}
                      placeholder={
                        config.slug === 'hot-desk'
                          ? 'e.g. Quiet booth preference, dual monitor power outlet...'
                          : config.slug === 'meeting-rooms'
                            ? 'e.g. 4K screen presentation casting, whiteboard, tea/coffee service...'
                            : config.slug === 'virtual-office'
                              ? 'e.g. eCitizen BRS company registration, KRA PIN compliance, mail scanning preferences...'
                              : 'e.g. Specific start date, proof of address certificate requirements...'
                      }
                      className={`w-full bg-navy/[0.03] border p-2.5 text-xs text-navy outline-none transition-colors ${errors.notes ? 'border-red-600 bg-red-50/20' : 'border-navy/20 focus:border-navy focus:bg-white'
                        }`}
                    />
                    {errors.notes && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.notes}
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Editorial Ledger Breakdown */}
              <div className="lg:col-span-5 sticky top-28 space-y-8 border-l border-navy/15 lg:pl-10">
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-1">
                      Reservation Ledger
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl text-navy">{config.title}</h3>
                    <p className="text-xs font-semibold text-navy/80 mt-1">{selectedTier.name}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-navy/15 text-xs text-navy/80">
                    <div className="flex justify-between py-1 border-b border-navy/10">
                      <span className="text-navy/60">Plan Rate:</span>
                      <span className="font-mono font-semibold">{selectedTier.rateDisplay}</span>
                    </div>

                    {calculation.activeMultiplier > 1 && (
                      <div className="flex justify-between py-1 border-b border-navy/10">
                        <span className="text-navy/60">Duration Multiplier:</span>
                        <span className="font-mono font-semibold">{calculation.activeMultiplier}x</span>
                      </div>
                    )}

                    <div className="flex justify-between py-1 border-b border-navy/10">
                      <span className="text-navy/60">Base Package Price:</span>
                      <span className="font-mono font-semibold">KES {calculation.rentBase.toLocaleString()}</span>
                    </div>

                    {/* Overtime Fee item if applicable */}
                    {calculation.engineResult.isOvertime && (
                      <div className="flex justify-between py-2 border-b border-navy/10 bg-amber-50 px-2.5 text-amber-900">
                        <div>
                          <span className="font-semibold block">Extended-Hours Fee ({calculation.engineResult.chargeableOvertimeHours} hr{calculation.engineResult.chargeableOvertimeHours > 1 ? 's' : ''}):</span>
                          <span className="text-[10px] text-amber-700 block">KES 200/hr past {calculation.engineResult.normalClosingTime}</span>
                        </div>
                        <span className="font-mono font-bold">+ KES {calculation.engineResult.overtimeFeeKES.toLocaleString()}</span>
                      </div>
                    )}

                    {calculation.depositAmount > 0 ? (
                      <div className="flex justify-between py-2 border-b border-navy/10 bg-navy/[0.03] px-2">
                        <span className="text-navy font-semibold">Refundable Security Deposit ({calculation.depositMonths} mo):</span>
                        <span className="font-mono font-bold text-navy">+ KES {calculation.depositAmount.toLocaleString()}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between py-1 border-b border-navy/10 text-emerald-800">
                        <span>Security Deposit:</span>
                        <span className="font-semibold">Zero Deposit on Day Passes</span>
                      </div>
                    )}

                    <div className="flex justify-between py-1 text-emerald-800">
                      <span className="text-navy/60">Generator Backup &amp; Fibre:</span>
                      <span className="font-semibold">Included</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-navy">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-navy">Total Amount Payable</span>
                      <span className="font-heading text-3xl font-bold text-navy font-mono">
                        KES {calculation.initialTotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-navy/50 font-mono mt-1">
                      {calculation.engineResult.isOvertime
                        ? `(Base: KES ${calculation.rentBase.toLocaleString()} + Overtime: KES ${calculation.engineResult.overtimeFeeKES.toLocaleString()})`
                        : calculation.depositAmount > 0
                          ? `(Rent: KES ${calculation.rentBase.toLocaleString()} + Deposit: KES ${calculation.depositAmount.toLocaleString()})`
                          : `(${selectedTier.billingPeriod})`}
                    </p>
                  </div>

                  {/* Terms checkbox */}
                  <div className="pt-4 border-t border-navy/10">
                    <label className="flex items-start gap-2.5 text-xs text-navy/75 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-0.5 rounded-none accent-navy"
                      />
                      <span>
                        {isPhysical || slug === 'hot-desk' || slug === 'meeting-rooms' ? (
                          <>
                            I agree to the{' '}
                            <Link href="/daily-booking-terms" target="_blank" className="underline text-navy font-semibold">
                              Daily Booking Terms &amp; Cancellation Policy
                            </Link>
                            <span className="text-navy/60 block mt-1 text-[11px] leading-tight">
                              (Rescheduling is 100% free with 24h notice. Cancellations require at least 2 days notice for 90% refund; 10% fee applies. Unutilized bookings are non-refundable).
                            </span>
                          </>
                        ) : (
                          <>
                            I agree to the{' '}
                            <Link href="/terms-of-service" target="_blank" className="underline text-navy font-semibold">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/refund-policy" target="_blank" className="underline text-navy font-semibold">
                              Refund Policy
                            </Link>
                            .
                          </>
                        )}
                      </span>
                    </label>
                  </div>

                  {/* Error Banner */}
                  {submitError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || (isPhysical && !calculation.engineResult.isValid)}
                    className="w-full bg-navy text-white py-4 text-xs uppercase tracking-[0.16em] font-semibold hover:bg-navy-600 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      'Securing checkout...'
                    ) : (
                      <>
                        Proceed to Payment (KES {calculation.initialTotal.toLocaleString()}) <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {/* Inclusions List Directly in Ledger */}
                <div className="pt-6 border-t border-navy/15 space-y-3">
                  <div className="text-navy font-semibold text-xs uppercase tracking-wider font-heading flex items-center gap-2">
                    <Check size={14} className="text-navy" />
                    <span>Everything Included</span>
                  </div>
                  <ul className="space-y-2 text-xs text-navy/70">
                    {config.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={12} className="text-navy shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Extended-Hours Calculation Breakdown Modal Popup */}
        {showOvertimeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-navy/20 shadow-2xl max-w-lg w-full p-6 md:p-8 space-y-6 text-navy">

              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-navy/15 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-navy/60 block">
                    Operating Policy &amp; Pricing Formula
                  </span>
                  <h3 className="font-heading text-xl font-bold text-navy mt-0.5">
                    Extended-Hours Access Breakdown
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOvertimeModal(false)}
                  className="text-navy/50 hover:text-navy p-1 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Arithmetic Breakdown Ledger */}
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-navy/[0.03] border border-navy/10 space-y-2">
                  <div className="flex justify-between py-1 border-b border-navy/10">
                    <span className="text-navy/60">Selected Start Time:</span>
                    <strong className="font-mono text-navy">{calculation.engineResult.startTime}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-navy/10">
                    <span className="text-navy/60">Package Session Duration:</span>
                    <strong className="font-mono text-navy">{calculation.engineResult.durationHours} Hours</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-navy/10">
                    <span className="text-navy/60">Calculated Session End Time:</span>
                    <strong className="font-mono text-navy">{calculation.engineResult.calculatedEndTime}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-navy/10">
                    <span className="text-navy/60">Standard Hub Closing Time:</span>
                    <strong className="font-mono text-navy">{calculation.engineResult.normalClosingTime}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-navy/10">
                    <span className="text-navy/60">Extended Access Window:</span>
                    <strong className="font-mono text-amber-900">
                      {calculation.engineResult.normalClosingTime} &rarr; {calculation.engineResult.calculatedEndTime} ({calculation.engineResult.overtimeMinutes} mins)
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-navy/10">
                    <span className="text-navy/60">Billable Extended Hours:</span>
                    <strong className="font-mono text-amber-900">
                      {calculation.engineResult.chargeableOvertimeHours} Hour(s) (rounded up)
                    </strong>
                  </div>
                  <div className="flex justify-between py-1.5 font-semibold text-sm">
                    <span className="text-navy">Extended-Hours Tariff:</span>
                    <span className="font-mono text-navy">KES 200 / hr &times; {calculation.engineResult.chargeableOvertimeHours} = KES {calculation.engineResult.overtimeFeeKES.toLocaleString()}</span>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="text-[11px] text-navy/70 leading-relaxed space-y-1.5 pt-1">
                  <p>
                    <strong>Why is this charge applied?</strong>
                  </p>
                  <p>
                    Paper Street standard operating hours are <strong>8:00 AM – 6:00 PM</strong> (Mon–Fri) and <strong>9:00 AM – 4:30 PM</strong> (Saturday).
                  </p>
                  <p>
                    When you schedule your start time later in the day, your required package duration extends past our standard closing time. The extended-hours surcharge covers dedicated reception staffing, uninterrupted high-speed internet, and backup generator power beyond regular hours.
                  </p>
                </div>
              </div>

              {/* Modal Footer Action */}
              <div className="pt-4 border-t border-navy/15 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowOvertimeModal(false)}
                  className="bg-navy text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 hover:bg-navy-600 transition-colors cursor-pointer"
                >
                  I Understand &amp; Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}
