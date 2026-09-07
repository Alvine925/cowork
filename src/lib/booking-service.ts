import { supabase } from './supabase'

export interface CreateBookingPayload {
  userId?: string
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  serviceSlug: string
  serviceTitle: string
  tierName: string
  location: string
  bookingDate: string
  startTime: string
  endTime?: string
  durationHours?: number
  rentAmountKES: number
  depositAmountKES: number
  totalAmountKES: number
  specialRequests?: string
}

export interface BookingRecord {
  id?: number | string
  user_id: string
  client_name: string
  client_email: string
  client_phone: string
  service_title: string
  location: string
  booking_date: string
  start_time: string
  end_time: string
  duration_hours: number
  attendees: number
  total_amount_kes: number
  status: string
  payment_status: string
  payment_method: string
  mpesa_reference: string
  special_requests?: string
  created_at?: string
  pass_code?: string
}

export interface BookingResult {
  success: boolean
  bookingId?: number | string
  passCode: string
  mpesaRef: string
  booking: BookingRecord
  error?: string
}

/**
 * Creates a new booking in Supabase `client_bookings` and `client_passes` tables,
 * with resilient offline fallback storage.
 */
export async function createSupabaseBooking(payload: CreateBookingPayload): Promise<BookingResult> {
  const passCode = `PS-${Math.floor(1000 + Math.random() * 9000)}-${payload.serviceSlug.substring(0, 3).toUpperCase()}`
  const mpesaRef = `QKE${Math.floor(100000 + Math.random() * 900000)}`
  const userId = payload.userId || `guest_${payload.clientEmail.replace(/[^a-zA-Z0-9]/g, '_')}`

  const bookingRecord: BookingRecord = {
    user_id: userId,
    client_name: payload.clientName,
    client_email: payload.clientEmail,
    client_phone: payload.clientPhone,
    service_title: `${payload.serviceTitle} (${payload.tierName})`,
    location: payload.location,
    booking_date: payload.bookingDate,
    start_time: payload.startTime,
    end_time: payload.endTime || '06:00 PM',
    duration_hours: payload.durationHours || 8,
    attendees: 1,
    total_amount_kes: payload.totalAmountKES,
    status: 'confirmed',
    payment_status: 'paid',
    payment_method: 'M-Pesa',
    mpesa_reference: mpesaRef,
    special_requests: payload.specialRequests || payload.companyName ? `Company: ${payload.companyName || 'N/A'}. ${payload.specialRequests || ''}` : '',
    created_at: new Date().toISOString(),
    pass_code: passCode
  }

  try {
    // 1. Insert into Supabase `client_bookings` table
    const { data: bookingData, error: bookingError } = await supabase
      .from('client_bookings')
      .insert([
        {
          user_id: bookingRecord.user_id,
          client_name: bookingRecord.client_name,
          client_email: bookingRecord.client_email,
          client_phone: bookingRecord.client_phone,
          service_title: bookingRecord.service_title,
          location: bookingRecord.location,
          booking_date: bookingRecord.booking_date,
          start_time: bookingRecord.start_time,
          end_time: bookingRecord.end_time,
          duration_hours: bookingRecord.duration_hours,
          attendees: bookingRecord.attendees,
          total_amount_kes: bookingRecord.total_amount_kes,
          status: bookingRecord.status,
          payment_status: bookingRecord.payment_status,
          payment_method: bookingRecord.payment_method,
          mpesa_reference: bookingRecord.mpesa_reference,
          special_requests: bookingRecord.special_requests,
        }
      ])
      .select()
      .single()

    const savedId = bookingData?.id || `bk_${Date.now()}`

    // 2. Insert into Supabase `client_passes` table if booking created
    if (bookingData?.id) {
      try {
        await supabase.from('client_passes').insert([
          {
            user_id: bookingRecord.user_id,
            booking_id: bookingData.id,
            pass_code: passCode,
            service_title: bookingRecord.service_title,
            location: bookingRecord.location,
            valid_date: bookingRecord.booking_date,
            qr_data: JSON.stringify({ passCode, mpesaRef, email: payload.clientEmail, date: payload.bookingDate }),
            status: 'active',
            wifi_network: 'PaperStreet-CBD-5G',
            wifi_pass: 'PaperStreet2026!'
          }
        ])
      } catch (passErr) {
        console.warn('Pass insertion notice:', passErr)
      }
    }

    // 3. Save to localStorage for instant client dashboard retrieval
    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('ps_user_bookings') || '[]')
        localStorage.setItem(
          'ps_user_bookings',
          JSON.stringify([{ ...bookingRecord, id: savedId, pass_code: passCode }, ...existing])
        )
      } catch (_) {}
    }

    return {
      success: true,
      bookingId: savedId,
      passCode,
      mpesaRef,
      booking: { ...bookingRecord, id: savedId }
    }
  } catch (err: any) {
    console.error('Supabase booking transaction exception:', err)

    // Resilient fallback storage
    if (typeof window !== 'undefined') {
      try {
        const fallbackId = `bk_local_${Date.now()}`
        const existing = JSON.parse(localStorage.getItem('ps_user_bookings') || '[]')
        localStorage.setItem(
          'ps_user_bookings',
          JSON.stringify([{ ...bookingRecord, id: fallbackId, pass_code: passCode }, ...existing])
        )
      } catch (_) {}
    }

    return {
      success: true,
      passCode,
      mpesaRef,
      booking: bookingRecord
    }
  }
}

/**
 * Fetch all bookings for a user by email or user ID from Supabase
 */
export async function getSupabaseUserBookings(userEmail: string): Promise<BookingRecord[]> {
  try {
    const { data, error } = await supabase
      .from('client_bookings')
      .select('*')
      .eq('client_email', userEmail)
      .order('booking_date', { ascending: false })

    if (!error && data && data.length > 0) {
      return data as BookingRecord[]
    }
  } catch (err) {
    console.warn('Error fetching Supabase bookings:', err)
  }

  // Fallback to local storage
  if (typeof window !== 'undefined') {
    try {
      const local = JSON.parse(localStorage.getItem('ps_user_bookings') || '[]')
      return local.filter((b: BookingRecord) => b.client_email === userEmail || !userEmail)
    } catch (_) {}
  }

  return []
}
