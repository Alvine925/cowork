import { NextResponse } from 'next/server'
import { getSystemConfig } from '@/lib/config-service'
import { calculateBookingSlotAndPrice, isPhysicalBookableService } from '@/lib/booking-rules-engine'

export interface InitializeBookingRequest {
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  serviceSlug: string
  serviceTitle: string
  tierName: string
  tierId?: string
  location: string
  bookingDate: string
  startTime: string
  endTime?: string
  durationHours?: number
  rentAmountKES: number
  depositAmountKES: number
  totalAmountKES?: number
  specialRequests?: string
  callbackUrl?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_referrer?: string
}

export async function POST(req: Request) {
  try {
    const body: InitializeBookingRequest = await req.json()
    const config = await getSystemConfig()

    const {
      clientName,
      clientEmail,
      clientPhone,
      companyName = '',
      serviceSlug,
      serviceTitle,
      tierName,
      tierId = 'standard',
      location = 'Kisumu CBD (CBD Commercial Center)',
      bookingDate,
      startTime = '08:00 AM',
      rentAmountKES,
      depositAmountKES = 0,
      specialRequests = '',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      utm_referrer = '',
    } = body

    if (!clientEmail || !clientName || !bookingDate || !serviceSlug) {
      return NextResponse.json(
        { error: 'Missing required booking details (clientName, clientEmail, bookingDate, serviceSlug)' },
        { status: 400 }
      )
    }

    // Authoritative Server-Side Pricing & Overtime Recalculation
    const calculation = calculateBookingSlotAndPrice({
      serviceSlug,
      tierId,
      baseRentKES: rentAmountKES,
      depositKES: depositAmountKES,
      dateStr: bookingDate,
      startTimeStr: startTime,
    })

    if (isPhysicalBookableService(serviceSlug) && !calculation.isValid) {
      return NextResponse.json(
        { error: calculation.validationError || 'Invalid booking date or time requested.' },
        { status: 400 }
      )
    }

    // Authoritative server-calculated total
    const serverTotalKES = calculation.totalAmountKES
    const amountInSubunits = Math.round(serverTotalKES * 100)

    // Determine return callback URL
    const requestOrigin = req.headers.get('origin') || req.headers.get('referer') || 'https://paperstreet.co.ke'
    const urlObj = new URL(requestOrigin)
    const baseOrigin = `${urlObj.protocol}//${urlObj.host}`
    const callbackUrl = body.callbackUrl || `${baseOrigin}/book/confirmation`

    // Generate clean human-readable high-entropy reference e.g. PS-260826-K9M2-4829
    const todayFormatted = new Date().toISOString().slice(2, 10).replace(/-/g, '')
    const alphaCode = Math.random().toString(36).substring(2, 6).toUpperCase()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const reference = `PS-${todayFormatted}-${alphaCode}-${randomSuffix}`
    const qrToken = `QR-${reference}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const metadata = {
      clientName,
      clientEmail,
      clientPhone,
      companyName,
      serviceSlug,
      serviceTitle,
      tierName,
      tierId,
      location,
      bookingDate: calculation.dateStr,
      startTime: calculation.startTime,
      endTime: calculation.calculatedEndTime,
      durationHours: calculation.durationHours,
      rentAmountKES: calculation.basePriceKES,
      depositAmountKES: calculation.depositAmountKES,
      overtimeHours: calculation.chargeableOvertimeHours,
      overtimeFeeKES: calculation.overtimeFeeKES,
      totalAmountKES: serverTotalKES,
      specialRequests,
      qrToken,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_referrer,
      custom_fields: [
        { display_name: 'Client Name', variable_name: 'client_name', value: clientName },
        { display_name: 'Service', variable_name: 'service_title', value: `${serviceTitle} (${tierName})` },
        { display_name: 'Schedule', variable_name: 'schedule', value: `${calculation.dateStr} (${calculation.startTime} - ${calculation.calculatedEndTime})` },
        { display_name: 'Phone', variable_name: 'phone', value: clientPhone },
      ]
    }

    // Check if real Paystack secret key is configured
    if (!config.paystackSecretKey || config.paystackSecretKey.includes('placeholder')) {
      console.warn('[Paystack Initialize] Secret key is not configured in Supabase or .env. Providing mock authorization for test environment.')

      return NextResponse.json({
        success: true,
        authorization_url: `${baseOrigin}/book/confirmation?reference=${reference}&simulated=true`,
        access_code: `mock_code_${reference}`,
        reference: reference,
        publicKey: config.paystackPublicKey || 'pk_test_placeholder',
        amountKES: serverTotalKES,
        simulated: true,
      })
    }

    // Call Paystack API
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: clientEmail,
        amount: amountInSubunits,
        currency: 'KES',
        reference: reference,
        callback_url: callbackUrl,
        metadata: metadata,
      }),
    })

    const paystackData = await paystackResponse.json()

    if (!paystackResponse.ok || !paystackData.status) {
      console.error('[Paystack Init Error]', paystackData)
      return NextResponse.json(
        { error: paystackData.message || 'Failed to initialize Paystack payment.' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference: paystackData.data.reference,
      publicKey: config.paystackPublicKey,
      amountKES: serverTotalKES,
    })
  } catch (error: any) {
    console.error('[Paystack Init Exception]', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error while initializing payment.' },
      { status: 500 }
    )
  }
}
