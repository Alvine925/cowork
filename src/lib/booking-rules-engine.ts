/**
 * Central Business Rules & Pricing Engine for Paper Street Workspace Bookings
 * Timezone: Africa/Nairobi
 */

export const BUSINESS_TIMEZONE = 'Africa/Nairobi'
export const DEFAULT_OVERTIME_RATE_KES = 200

export interface DaySchedule {
  isOpen: boolean
  openMinutes: number // minutes from midnight (e.g. 08:00 = 480)
  closeMinutes: number // minutes from midnight (e.g. 18:00 = 1080)
  openTimeFormatted: string
  closeTimeFormatted: string
  label: string
}

export const OPERATING_SCHEDULE: Record<number, DaySchedule> = {
  0: { // Sunday
    isOpen: false,
    openMinutes: 0,
    closeMinutes: 0,
    openTimeFormatted: 'Closed',
    closeTimeFormatted: 'Closed',
    label: 'Sunday (Closed)',
  },
  1: { // Monday
    isOpen: true,
    openMinutes: 8 * 60, // 08:00 AM
    closeMinutes: 18 * 60, // 06:00 PM
    openTimeFormatted: '08:00 AM',
    closeTimeFormatted: '06:00 PM',
    label: 'Monday (08:00 AM - 06:00 PM)',
  },
  2: { // Tuesday
    isOpen: true,
    openMinutes: 8 * 60,
    closeMinutes: 18 * 60,
    openTimeFormatted: '08:00 AM',
    closeTimeFormatted: '06:00 PM',
    label: 'Tuesday (08:00 AM - 06:00 PM)',
  },
  3: { // Wednesday
    isOpen: true,
    openMinutes: 8 * 60,
    closeMinutes: 18 * 60,
    openTimeFormatted: '08:00 AM',
    closeTimeFormatted: '06:00 PM',
    label: 'Wednesday (08:00 AM - 06:00 PM)',
  },
  4: { // Thursday
    isOpen: true,
    openMinutes: 8 * 60,
    closeMinutes: 18 * 60,
    openTimeFormatted: '08:00 AM',
    closeTimeFormatted: '06:00 PM',
    label: 'Thursday (08:00 AM - 06:00 PM)',
  },
  5: { // Friday
    isOpen: true,
    openMinutes: 8 * 60,
    closeMinutes: 18 * 60,
    openTimeFormatted: '08:00 AM',
    closeTimeFormatted: '06:00 PM',
    label: 'Friday (08:00 AM - 06:00 PM)',
  },
  6: { // Saturday
    isOpen: true,
    openMinutes: 8 * 60 + 30, // 08:30 AM
    closeMinutes: 18 * 60, // 06:00 PM
    openTimeFormatted: '08:30 AM',
    closeTimeFormatted: '06:00 PM',
    label: 'Saturday (08:30 AM - 06:00 PM)',
  },
}

/**
 * Checks whether a service is a bookable physical workspace package vs a subscription.
 */
export function isPhysicalBookableService(slug: string): boolean {
  const physicalSlugs = ['hot-desk', 'day-pass', 'meeting-rooms', 'meeting-room', 'dedicated-desk', 'workspace']
  return physicalSlugs.includes(slug.toLowerCase())
}

/**
 * Converts a time string (e.g. "08:00 AM", "14:30", "2:00 PM") into minutes from midnight.
 */
export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 8 * 60 // Default 08:00 AM

  const clean = timeStr.trim().toUpperCase()
  const isPM = clean.includes('PM')
  const isAM = clean.includes('AM')

  const timePart = clean.replace(/[APM\s]/g, '')
  const [hStr, mStr] = timePart.split(':')
  let hours = parseInt(hStr || '0', 10)
  const minutes = parseInt(mStr || '0', 10)

  if (isPM && hours < 12) hours += 12
  if (isAM && hours === 12) hours = 0

  return hours * 60 + minutes
}

/**
 * Formats minutes from midnight into standard 12-hour format "hh:mm AM/PM".
 */
export function formatMinutesToTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60)
  let hours = Math.floor(normalized / 60)
  const mins = normalized % 60
  const isPM = hours >= 12
  const period = isPM ? 'PM' : 'AM'

  if (hours > 12) hours -= 12
  if (hours === 0) hours = 12

  const padH = hours < 10 ? `0${hours}` : `${hours}`
  const padM = mins < 10 ? `0${mins}` : `${mins}`

  return `${padH}:${padM} ${period}`
}

/**
 * Safely formats a single ISO date, a comma/semicolon-separated list of dates, or an array of dates.
 * Prevents "Invalid Date" errors when multiple dates are passed.
 * e.g. "2026-08-26, 2026-08-27" -> "Wed, 26 Aug 2026; Thu, 27 Aug 2026"
 */
export function formatDisplayDateOrDates(dateInput?: string | string[] | null): string {
  if (!dateInput) return '—'

  let dateStrings: string[] = []
  if (Array.isArray(dateInput)) {
    dateStrings = dateInput
  } else if (typeof dateInput === 'string') {
    if (dateInput.includes(',')) {
      dateStrings = dateInput.split(',').map((s) => s.trim())
    } else if (dateInput.includes(';')) {
      dateStrings = dateInput.split(';').map((s) => s.trim())
    } else {
      dateStrings = [dateInput.trim()]
    }
  }

  const formatted = dateStrings.map((dStr) => {
    // If it has attached time window e.g. "2026-08-26 (08:00 AM - 04:00 PM)"
    const match = dStr.match(/^(\d{4}-\d{2}-\d{2})(.*)$/)
    if (match) {
      const iso = match[1]
      const extra = match[2]
      const d = new Date(`${iso}T00:00:00Z`)
      if (!isNaN(d.getTime())) {
        const fDate = d.toLocaleDateString('en-KE', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        })
        return `${fDate}${extra}`
      }
    }

    const d = new Date(dStr.includes('T') ? dStr : `${dStr}T00:00:00Z`)
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-KE', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      })
    }

    return dStr
  })

  return formatted.join('; ')
}

/**
 * Returns the current date and time in Nairobi timezone (Africa/Nairobi).
 */
export function getNairobiDate(): { dateStr: string; timeMinutes: number; dayOfWeek: number } {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: BUSINESS_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(new Date())
  const map: Record<string, string> = {}
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value
  }

  const dateStr = `${map.year}-${map.month}-${map.day}`
  const hours = parseInt(map.hour || '0', 10)
  const minutes = parseInt(map.minute || '0', 10)
  const timeMinutes = hours * 60 + minutes

  // Calculate day of week
  const dateObj = new Date(`${dateStr}T00:00:00Z`)
  const dayOfWeek = dateObj.getUTCDay()

  return { dateStr, timeMinutes, dayOfWeek }
}

/**
 * Determines package duration in hours based on slug and tierId.
 * For daily passes, each day session is 8 hours (or 4 hours for half-day).
 */
export function getPackageDurationHours(serviceSlug: string, tierId: string, multiplier: number = 1): number {
  const s = serviceSlug.toLowerCase()
  const t = tierId.toLowerCase()

  if (s === 'meeting-rooms' || s === 'meeting-room') {
    if (t === 'hourly') return Math.max(1, multiplier || 1)
    if (t === '2-hours') return 2
    if (t === 'half-day') return 4
    if (t === 'full-day') return 10
    return 2 // default meeting room
  }

  if (s === 'hot-desk' || s === 'day-pass') {
    if (t === 'half-day') return 4
    if (t === 'full-day') return 10 // Full day pass covers 08:00 AM to 06:00 PM (10 hours)
    if (t === 'weekly') return 10
    if (t === 'flex-10' || t === 'monthly') return 10
    return 10
  }

  if (s === 'dedicated-desk') {
    return 10
  }

  return 10
}

export interface CalculationResult {
  isValid: boolean
  validationError: string | null
  dateStr: string
  dayOfWeek: number
  isSunday: boolean
  daySchedule: DaySchedule
  startTime: string
  startMinutes: number
  durationHours: number
  calculatedEndTime: string
  endMinutes: number
  normalClosingTime: string
  normalCloseMinutes: number
  isOvertime: boolean
  overtimeMinutes: number
  chargeableOvertimeHours: number
  overtimeRatePerHourKES: number
  basePriceKES: number
  overtimeFeeKES: number
  depositAmountKES: number
  totalAmountKES: number
  summaryDisplay: string
  overtimeDisplay: string | null
}

export interface CalculateSlotParams {
  serviceSlug: string
  tierId: string
  baseRentKES: number
  depositKES?: number
  dateStr: string // YYYY-MM-DD
  startTimeStr: string // "08:00 AM" or "09:00"
  endTimeStr?: string // optional custom end time
  multiplier?: number
  overtimeRateKES?: number
}

/**
 * Single authoritative business rule calculation for Paper Street bookings.
 * Automatically adds overtime fee whenever session exceeds package duration OR extends past closing hours.
 */
export function calculateBookingSlotAndPrice(params: CalculateSlotParams): CalculationResult {
  const {
    serviceSlug,
    tierId,
    baseRentKES,
    depositKES = 0,
    dateStr,
    startTimeStr,
    endTimeStr,
    multiplier = 1,
    overtimeRateKES = DEFAULT_OVERTIME_RATE_KES,
  } = params

  const isPhysical = isPhysicalBookableService(serviceSlug)

  // Subscriptions (Virtual Office, Business Address) do not have operating slots or overtime
  if (!isPhysical) {
    const total = baseRentKES + depositKES
    return {
      isValid: true,
      validationError: null,
      dateStr: dateStr || new Date().toISOString().split('T')[0],
      dayOfWeek: 1,
      isSunday: false,
      daySchedule: OPERATING_SCHEDULE[1],
      startTime: '09:00 AM',
      startMinutes: 540,
      durationHours: 0,
      calculatedEndTime: '06:00 PM',
      endMinutes: 1080,
      normalClosingTime: '06:00 PM',
      normalCloseMinutes: 1080,
      isOvertime: false,
      overtimeMinutes: 0,
      chargeableOvertimeHours: 0,
      overtimeRatePerHourKES: 0,
      basePriceKES: baseRentKES,
      overtimeFeeKES: 0,
      depositAmountKES: depositKES,
      totalAmountKES: total,
      summaryDisplay: 'Monthly / Annual Service Activation',
      overtimeDisplay: null,
    }
  }

  // Parse date and day of week
  const dateObj = new Date(`${dateStr}T00:00:00Z`)
  if (isNaN(dateObj.getTime())) {
    return createInvalidResult('Invalid date provided.', dateStr)
  }

  const dayOfWeek = dateObj.getUTCDay()
  const schedule = OPERATING_SCHEDULE[dayOfWeek] || OPERATING_SCHEDULE[1]

  // Sunday validation
  if (!schedule.isOpen) {
    return {
      ...createInvalidResult('Paper Street is closed on Sundays. Please select Monday to Saturday.', dateStr),
      isSunday: true,
      dayOfWeek,
      daySchedule: schedule,
    }
  }

  // Current-time awareness in Africa/Nairobi
  const nairobiNow = getNairobiDate()
  const isToday = nairobiNow.dateStr === dateStr
  const startMinutes = parseTimeToMinutes(startTimeStr)

  // Check if booking is in the past for today
  if (isToday && startMinutes < nairobiNow.timeMinutes - 15) { // 15 min grace period
    return {
      ...createInvalidResult(`Selected time (${formatMinutesToTime(startMinutes)}) has already passed today in Kisumu.`, dateStr),
      dayOfWeek,
      daySchedule: schedule,
    }
  }

  // Check opening time constraint
  if (startMinutes < schedule.openMinutes) {
    return {
      ...createInvalidResult(
        `Selected start time is before ${schedule.label.split('(')[0].trim()} opening time of ${schedule.openTimeFormatted}.`,
        dateStr
      ),
      dayOfWeek,
      daySchedule: schedule,
    }
  }

  const baseDurationHours = getPackageDurationHours(serviceSlug, tierId, multiplier)
  const defaultDurationMinutes = Math.round(baseDurationHours * 60)
  
  let endMinutes = startMinutes + defaultDurationMinutes
  if (endTimeStr) {
    const customEndMinutes = parseTimeToMinutes(endTimeStr)
    if (customEndMinutes > startMinutes) {
      endMinutes = customEndMinutes
    }
  }

  const actualDurationMinutes = endMinutes - startMinutes
  const actualDurationHours = Math.round((actualDurationMinutes / 60) * 10) / 10

  // 1. Overtime from exceeding base package duration (e.g. booking 6 hours on a 4-hour half-day pass)
  const packageOvertimeMinutes = Math.max(0, actualDurationMinutes - defaultDurationMinutes)
  const packageOvertimeHours = packageOvertimeMinutes > 0 ? Math.ceil(packageOvertimeMinutes / 60) : 0

  // 2. Overtime from staying past normal building closing time (e.g. staying after 06:00 PM)
  const normalCloseMinutes = schedule.closeMinutes
  const afterCloseMinutes = Math.max(0, endMinutes - normalCloseMinutes)
  const afterCloseOvertimeHours = afterCloseMinutes > 0 ? Math.ceil(afterCloseMinutes / 60) : 0

  // Chargeable overtime hours is the maximum of duration overtime and after-hours overtime
  const chargeableOvertimeHours = Math.max(packageOvertimeHours, afterCloseOvertimeHours)
  const isOvertime = chargeableOvertimeHours > 0
  const overtimeFeeKES = chargeableOvertimeHours * overtimeRateKES
  const overtimeMinutes = Math.max(packageOvertimeMinutes, afterCloseMinutes)

  const totalAmountKES = baseRentKES + overtimeFeeKES + depositKES

  const startTimeFormatted = formatMinutesToTime(startMinutes)
  const calculatedEndTimeFormatted = formatMinutesToTime(endMinutes)
  const normalClosingFormatted = schedule.closeTimeFormatted

  let overtimeDisplay: string | null = null
  if (isOvertime) {
    overtimeDisplay = `${chargeableOvertimeHours} hr${chargeableOvertimeHours > 1 ? 's' : ''} extended-hours access (+ KES ${overtimeFeeKES.toLocaleString()})`
  }

  const summaryDisplay = `${startTimeFormatted} - ${calculatedEndTimeFormatted}`

  return {
    isValid: true,
    validationError: null,
    dateStr,
    dayOfWeek,
    isSunday: false,
    daySchedule: schedule,
    startTime: startTimeFormatted,
    startMinutes,
    durationHours: actualDurationHours,
    calculatedEndTime: calculatedEndTimeFormatted,
    endMinutes,
    normalClosingTime: normalClosingFormatted,
    normalCloseMinutes,
    isOvertime,
    overtimeMinutes,
    chargeableOvertimeHours,
    overtimeRatePerHourKES: overtimeRateKES,
    basePriceKES: baseRentKES,
    overtimeFeeKES,
    depositAmountKES: depositKES,
    totalAmountKES,
    summaryDisplay,
    overtimeDisplay,
  }
}

function createInvalidResult(errorMsg: string, dateStr: string): CalculationResult {
  return {
    isValid: false,
    validationError: errorMsg,
    dateStr: dateStr || '',
    dayOfWeek: 1,
    isSunday: false,
    daySchedule: OPERATING_SCHEDULE[1],
    startTime: '08:00 AM',
    startMinutes: 480,
    durationHours: 8,
    calculatedEndTime: '04:00 PM',
    endMinutes: 960,
    normalClosingTime: '06:00 PM',
    normalCloseMinutes: 1080,
    isOvertime: false,
    overtimeMinutes: 0,
    chargeableOvertimeHours: 0,
    overtimeRatePerHourKES: DEFAULT_OVERTIME_RATE_KES,
    basePriceKES: 0,
    overtimeFeeKES: 0,
    depositAmountKES: 0,
    totalAmountKES: 0,
    summaryDisplay: 'Invalid Slot',
    overtimeDisplay: null,
  }
}

/**
 * Returns available start time slots for a given date with computed end time and overtime tags.
 */
export function getAvailableStartTimesForDate(
  dateStr: string,
  durationHours: number = 8
): { time: string; minutes: number; endTime: string; isOvertime: boolean; overtimeHours: number; label: string; isPast: boolean }[] {
  const dateObj = new Date(`${dateStr}T00:00:00Z`)
  const dayOfWeek = isNaN(dateObj.getTime()) ? 1 : dateObj.getUTCDay()
  const schedule = OPERATING_SCHEDULE[dayOfWeek]

  if (!schedule || !schedule.isOpen) return []

  const nairobiNow = getNairobiDate()
  const isToday = nairobiNow.dateStr === dateStr

  const slots: { time: string; minutes: number; endTime: string; isOvertime: boolean; overtimeHours: number; label: string; isPast: boolean }[] = []

  // Generate slots every 30 minutes from opening time up to 2 hours before normal close (or max 17:00)
  const durationMinutes = Math.round(durationHours * 60)
  const maxStartMinutes = Math.min(schedule.closeMinutes - 60, 18 * 60) // Up to 5:00/6:00 PM

  for (let m = schedule.openMinutes; m <= maxStartMinutes; m += 30) {
    const isPast = isToday && m < nairobiNow.timeMinutes
    
    // For full-day pass (duration >= 8h), early check-in covers up to standard closing (06:00 PM)
    let endMinutes = m + durationMinutes
    if (durationHours >= 8 && m <= 10 * 60) {
      endMinutes = schedule.closeMinutes // Standard full-day pass ends at 06:00 PM
    }

    const overtimeMins = Math.max(0, endMinutes - schedule.closeMinutes)
    const isOvertime = overtimeMins > 0
    const overtimeHours = isOvertime ? Math.ceil(overtimeMins / 60) : 0

    const timeFormatted = formatMinutesToTime(m)
    const endFormatted = formatMinutesToTime(endMinutes)

    let label = `${timeFormatted} → Ends ${endFormatted}`
    if (isOvertime) {
      label += ` (+ KES ${(overtimeHours * DEFAULT_OVERTIME_RATE_KES).toLocaleString()} Extended)`
    }

    slots.push({
      time: timeFormatted,
      minutes: m,
      endTime: endFormatted,
      isOvertime,
      overtimeHours,
      label,
      isPast,
    })
  }

  return slots
}

/**
 * Returns the first available (non-passed) start time for a given date.
 * If today and morning slots have passed, returns the next valid slot (e.g. 03:30 PM).
 */
export function getDefaultStartTimeForDate(dateStr: string, durationHours: number = 8): string {
  const slots = getAvailableStartTimesForDate(dateStr, durationHours)
  const available = slots.find((s) => !s.isPast)
  return available ? available.time : (slots[0]?.time || '08:00 AM')
}

/**
 * Generates Google Calendar link and standard iCalendar (.ics) string for a confirmed booking.
 */
export function generateCalendarDetails(booking: {
  reference: string
  serviceTitle: string
  location: string
  bookingDate: string
  startTime: string
  endTime: string
}): { googleUrl: string; icsContent: string } {
  const { reference, serviceTitle, location, bookingDate, startTime, endTime } = booking

  const parseToIsoNairobi = (dateStr: string, timeStr: string) => {
    const mins = parseTimeToMinutes(timeStr)
    const h = Math.floor(mins / 60)
    const m = mins % 60
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
    const dateFormatted = dateStr.replace(/-/g, '')
    return `${dateFormatted}T${pad(h)}${pad(m)}00`
  }

  const startIso = parseToIsoNairobi(bookingDate, startTime)
  const endIso = parseToIsoNairobi(bookingDate, endTime)

  const title = encodeURIComponent(`Paper Street - ${serviceTitle}`)
  const details = encodeURIComponent(
    `Official Booking at Paper Street Workspaces.\nReference: ${reference}\nScheduled: ${startTime} - ${endTime}\nLocation: ${location}\nFront Desk: +254 709 123 456`
  )
  const loc = encodeURIComponent(`${location}, Kisumu CBD, Kenya`)

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${loc}&sf=true&output=xml`

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Paper Street Workspaces//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:ps-booking-${reference}@paperstreet.africa`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;TZID=Africa/Nairobi:${startIso}`,
    `DTEND;TZID=Africa/Nairobi:${endIso}`,
    `SUMMARY:Paper Street - ${serviceTitle}`,
    `DESCRIPTION:Official Reservation: ${reference}\\nTime: ${startTime} - ${endTime}\\nLocation: ${location}`,
    `LOCATION:${location}, Kisumu CBD, Kenya`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return { googleUrl, icsContent }
}
