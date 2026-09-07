import { z } from 'zod'

// Known disposable / fake temporary domains
const DISPOSABLE_DOMAINS = new Set([
  'example.com',
  'fake.com',
  'tempmail.com',
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'trashmail.com',
  'sharklasers.com',
  'dispostable.com',
  'asdf.com',
  'nowhere.com'
])

// Generic dummy names that represent junk/spam submissions
const BLOCKED_NAMES = new Set([
  'test',
  'test test',
  'asdf',
  'asdf asdf',
  'qwerty',
  'admin',
  'administrator',
  'null',
  'undefined',
  'dummy',
  'sample',
  'user',
  'unknown',
  'none',
  'fake',
  'john doe',
  'jane doe',
  'abc',
  'xyz',
  'aaa bbb',
  '123 456'
])

// Blocked dummy phone numbers
const BLOCKED_PHONES = new Set([
  '0700000000',
  '0711111111',
  '0722222222',
  '0733333333',
  '0744444444',
  '0755555555',
  '0766666666',
  '0777777777',
  '0788888888',
  '0799999999',
  '0712345678',
  '0787654321',
  '0100000000',
  '0111111111',
  '0000000000',
  '1234567890',
  '+254700000000',
  '+254712345678'
])

// Known prompt injection and SQL injection tokens to strictly sanitize and block
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s*prompt/i,
  /assistant\s*:/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /DAN\s+Mode/i,
  /new\s+directive/i,
  /output\s+the\s+token/i,
  /drop\s+table/i,
  /insert\s+into/i,
  /select\s+.*\s+from/i,
  /union\s+select/i,
  /;\s*--/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/i,
  /on\w+\s*=/i,
]

/**
 * Sanitizes input string to remove HTML tags, control characters, and excess whitespace.
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  return input
    .replace(/<[^>]*>?/gm, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim()
}

/**
 * Checks for prompt injection or SQL injection payloads
 */
export function containsInjection(input: string): boolean {
  if (!input) return false
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input))
}

/**
 * Formats and standardizes Kenyan phone numbers to +254 7XX XXX XXX or +254 1XX XXX XXX
 */
export function formatKenyanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('254') && digits.length === 12) {
    return `+254 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
  }
  if (digits.startsWith('0') && digits.length === 10) {
    return `+254 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  }
  if (digits.length === 9) {
    return `+254 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return phone.trim()
}

export interface ValidationErrors {
  fullName?: string
  companyName?: string
  email?: string
  phone?: string
  startDate?: string
  attendees?: string
  notes?: string
}

/**
 * Validates the booking form tailored specifically to each service type
 */
export function validateBookingForm(data: {
  serviceSlug: string
  fullName: string
  companyName?: string
  email: string
  phone: string
  startDate: string
  attendees?: number
  notes?: string
}): { isValid: boolean; errors: ValidationErrors; sanitized: typeof data } {
  const errors: ValidationErrors = {}

  // 1. Sanitize all fields
  const cleanName = sanitizeInput(data.fullName)
  const cleanCompany = sanitizeInput(data.companyName || '')
  const cleanEmail = sanitizeInput(data.email).toLowerCase()
  const cleanPhone = sanitizeInput(data.phone)
  const cleanNotes = sanitizeInput(data.notes || '')
  const cleanDate = sanitizeInput(data.startDate)

  // 2. Anti-injection check across all text inputs
  const allText = `${cleanName} ${cleanCompany} ${cleanEmail} ${cleanPhone} ${cleanNotes}`
  if (containsInjection(allText)) {
    errors.notes = 'Security warning: Prohibited script or command sequence detected.'
    return {
      isValid: false,
      errors,
      sanitized: { ...data, fullName: cleanName, companyName: cleanCompany, email: cleanEmail, phone: cleanPhone, notes: cleanNotes }
    }
  }

  // 3. Full Name Validation
  if (!cleanName) {
    errors.fullName = 'Please enter your name.'
  } else if (cleanName.length < 3) {
    errors.fullName = 'Name must be at least 3 characters.'
  } else if (cleanName.length > 60) {
    errors.fullName = 'Name must not exceed 60 characters.'
  } else if (BLOCKED_NAMES.has(cleanName.toLowerCase())) {
    errors.fullName = 'Please enter a genuine first and last name.'
  } else {
    const parts = cleanName.trim().split(/\s+/)
    if (parts.length < 2) {
      errors.fullName = 'Please enter both your first and last name (e.g. Alvine Otieno).'
    } else if (!/^[a-zA-Z\s'\-\.]+$/.test(cleanName)) {
      errors.fullName = 'Name should only contain letters and standard punctuation.'
    }
  }

  // 4. Company Name Validation (Only required/validated for business presence services if filled)
  if (data.serviceSlug === 'business-address' || data.serviceSlug === 'virtual-office') {
    if (cleanCompany) {
      if (cleanCompany.length < 2) {
        errors.companyName = 'Company name must be at least 2 characters.'
      } else if (cleanCompany.length > 80) {
        errors.companyName = 'Company name must not exceed 80 characters.'
      } else if (BLOCKED_NAMES.has(cleanCompany.toLowerCase())) {
        errors.companyName = 'Please enter a genuine business or entity name.'
      }
    }
  }

  // 5. Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!cleanEmail) {
    errors.email = 'Email address is required for sending your digital access pass.'
  } else if (!emailRegex.test(cleanEmail)) {
    errors.email = 'Please provide a valid email address.'
  } else {
    const domain = cleanEmail.split('@')[1] || ''
    if (DISPOSABLE_DOMAINS.has(domain)) {
      errors.email = 'Disposable temporary email domains are not accepted.'
    }
  }

  // 6. Kenyan / International Phone Validation
  const phoneDigits = cleanPhone.replace(/\D/g, '')
  const rawCleanPhone = cleanPhone.replace(/[\s\-\(\)]/g, '')

  if (!cleanPhone) {
    errors.phone = 'M-Pesa phone number is required.'
  } else if (BLOCKED_PHONES.has(rawCleanPhone) || BLOCKED_PHONES.has(phoneDigits)) {
    errors.phone = 'Please enter an active M-Pesa phone number.'
  } else {
    const isKenyanStandard = /^(?:\+254|254|0)?(7[0-9]{8}|1[0-9]{8})$/.test(rawCleanPhone)
    const isIntlStandard = /^\+?[1-9]\d{8,14}$/.test(rawCleanPhone)

    if (!isKenyanStandard && !isIntlStandard) {
      errors.phone = 'Enter a valid 10-digit Kenyan phone number (e.g. 0712 345 678).'
    }
  }

  // 7. Booking Start Date Validation
  if (!cleanDate) {
    errors.startDate = 'Please select a date.'
  } else {
    const selected = new Date(cleanDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const maxFuture = new Date()
    maxFuture.setFullYear(maxFuture.getFullYear() + 1)

    if (isNaN(selected.getTime())) {
      errors.startDate = 'Please select a valid date.'
    } else if (selected < today) {
      errors.startDate = 'Date cannot be in the past.'
    } else if (selected > maxFuture) {
      errors.startDate = 'Date cannot be more than 1 year in advance.'
    }
  }

  // 8. Meeting room attendees validation
  if (data.serviceSlug === 'meeting-rooms' && data.attendees) {
    if (data.attendees < 1 || data.attendees > 14) {
      errors.attendees = 'Boardroom capacity is 1 to 12 persons.'
    }
  }

  // 9. Notes validation
  if (cleanNotes && cleanNotes.length > 350) {
    errors.notes = 'Notes cannot exceed 350 characters.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      serviceSlug: data.serviceSlug,
      fullName: cleanName,
      companyName: cleanCompany,
      email: cleanEmail,
      phone: formatKenyanPhone(cleanPhone),
      startDate: cleanDate,
      attendees: data.attendees,
      notes: cleanNotes
    }
  }
}
