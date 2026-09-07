import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Safely formats single or multiple booking dates without throwing Invalid Date.
 * Handles arrays, comma-separated lists, and semicolon-separated strings.
 */
function formatDisplayDateOrDates(dateInput?: string | string[] | null): string {
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
 * Generates a clean, flat, plain-layout PDF receipt — no boxes, no cards.
 * Uses only horizontal rules and clean typography sections.
 */
function createReceiptPdf(data: {
  reference: string
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName: string
  serviceTitle: string
  tierName: string
  location: string
  bookingDate: string
  startTime: string
  endTime: string
  totalAmountKES: number
  rentAmountKES: number
  depositAmountKES: number
  overtimeHours?: number
  overtimeFeeKES?: number
  passCode?: string
}): string {
  // Sanitize: strip chars that break PDF string encoding
  const s = (str: string | number) =>
    String(str || '')
      .replace(/[\\()]/g, '')
      .replace(/[^\x20-\x7E]/g, '')
      .substring(0, 80)

  const ref = s(data.reference)
  const issueDate = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
  const formattedDates = s(formatDisplayDateOrDates(data.bookingDate))
  const rentStr = `KES ${(data.rentAmountKES || data.totalAmountKES).toLocaleString()}`
  const totalStr = `KES ${data.totalAmountKES.toLocaleString()}`
  const overtimeHours = data.overtimeHours || 0
  const overtimeFee = data.overtimeFeeKES || 0
  const hasOvertime = overtimeFee > 0
  const hasDeposit = data.depositAmountKES > 0
  const passCode = s(data.passCode || ref)

  // Y positions — work top-down from 800
  // Page: A4 = 595 x 842 pts. Left margin = 50, Right = 545.

  let stream = `
% ── HEADER ──────────────────────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 18 Tf 50 800 Td (PAPER STREET WORKSPACES) Tj ET
0.40 0.47 0.56 rg
BT /F2 8 Tf 50 786 Td (CBD Commercial Center  ·  Oginga Odinga St  ·  Kisumu, Kenya) Tj ET
0.40 0.47 0.56 rg
BT /F2 8 Tf 50 775 Td (Tel: +254 709 123 456   |   hello@paperstreet.africa   |   www.paperstreet.africa) Tj ET

% thick top rule
0.06 0.18 0.32 RG
2.0 w
50 768 m 545 768 l S

% ── DOCUMENT TITLE & REFERENCE ──────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 13 Tf 50 748 Td (OFFICIAL BOOKING RECEIPT) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 733 Td (Reference:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 105 733 Td (${ref}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 721 Td (Issue Date:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 721 Td (${s(issueDate)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 709 Td (Status:) Tj ET
0.09 0.47 0.21 rg
BT /F1 8.5 Tf 105 709 Td (PAYMENT CONFIRMED AND VERIFIED) Tj ET

% thin rule
0.78 0.82 0.87 RG
0.5 w
50 700 m 545 700 l S

% ── CLIENT DETAILS ───────────────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 686 Td (CLIENT DETAILS) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 673 Td (Name:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 673 Td (${s(data.clientName)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 661 Td (Email:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 661 Td (${s(data.clientEmail)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 649 Td (Phone:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 649 Td (${s(data.clientPhone)}) Tj ET
${data.companyName ? `
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 637 Td (Company:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 637 Td (${s(data.companyName)}) Tj ET
` : ''}

% thin rule
0.78 0.82 0.87 RG
0.5 w
50 ${data.companyName ? 626 : 638} m 545 ${data.companyName ? 626 : 638} l S

% ── RESERVATION DETAILS ──────────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${data.companyName ? 612 : 624} Td (RESERVATION DETAILS) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${data.companyName ? 599 : 611} Td (Package:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 ${data.companyName ? 599 : 611} Td (${s(data.serviceTitle)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${data.companyName ? 587 : 599} Td (Tier:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 ${data.companyName ? 587 : 599} Td (${s(data.tierName)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${data.companyName ? 575 : 587} Td (Location:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 ${data.companyName ? 575 : 587} Td (${s(data.location)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${data.companyName ? 563 : 575} Td (Date(s):) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 105 ${data.companyName ? 563 : 575} Td (${formattedDates}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${data.companyName ? 551 : 563} Td (Access Window:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 135 ${data.companyName ? 551 : 563} Td (${s(data.startTime)} to ${s(data.endTime)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${data.companyName ? 539 : 551} Td (Access Code:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 135 ${data.companyName ? 539 : 551} Td (${passCode}) Tj ET
`
  // Dynamic Y based on company name presence
  const baseY = data.companyName ? 539 : 551
  const ruleY1 = baseY - 13

  stream += `
% thin rule
0.78 0.82 0.87 RG
0.5 w
50 ${ruleY1} m 545 ${ruleY1} l S

% ── FINANCIAL BREAKDOWN ──────────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${ruleY1 - 14} Td (PAYMENT BREAKDOWN) Tj ET

% column headers
0.40 0.47 0.56 rg
BT /F1 7.5 Tf 50 ${ruleY1 - 28} Td (DESCRIPTION) Tj ET
BT /F1 7.5 Tf 430 ${ruleY1 - 28} Td (AMOUNT) Tj ET

% rule under headers
0.06 0.18 0.32 RG
0.75 w
50 ${ruleY1 - 35} m 545 ${ruleY1 - 35} l S

% base package row
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 50 ${ruleY1 - 50} Td (${s(data.serviceTitle)} — ${s(data.tierName)}) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 430 ${ruleY1 - 50} Td (${s(rentStr)}) Tj ET
`

  let rowY = ruleY1 - 60

  if (hasDeposit) {
    stream += `
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${rowY} Td (Refundable Security Deposit) Tj ET
BT /F2 8.5 Tf 430 ${rowY} Td (KES ${s(data.depositAmountKES.toLocaleString())}) Tj ET
`
    rowY -= 17
  }

  if (hasOvertime) {
    stream += `
0.55 0.27 0.07 rg
BT /F2 8.5 Tf 50 ${rowY} Td (Extended-Hours Access (${s(overtimeHours)} hr${overtimeHours > 1 ? 's' : ''})) Tj ET
BT /F2 8.5 Tf 430 ${rowY} Td (KES ${s(overtimeFee.toLocaleString())}) Tj ET
`
    rowY -= 17
  }

  const totalY = rowY - 8

  stream += `
% double rule above total
0.06 0.18 0.32 RG
1.5 w
50 ${totalY} m 545 ${totalY} l S
0.5 w
50 ${totalY + 4} m 545 ${totalY + 4} l S

% total row
0.06 0.18 0.32 rg
BT /F1 10 Tf 50 ${totalY - 17} Td (TOTAL AMOUNT PAID) Tj ET
BT /F1 11 Tf 390 ${totalY - 17} Td (${s(totalStr)}) Tj ET

% thin rule below total
0.06 0.18 0.32 RG
1.5 w
50 ${totalY - 27} m 545 ${totalY - 27} l S
`

  const noteY = totalY - 55

  stream += `
% ── CHECK-IN INSTRUCTION ─────────────────────────────────────────────
0.78 0.82 0.87 RG
0.5 w
50 ${noteY + 10} m 545 ${noteY + 10} l S

0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${noteY - 3} Td (CHECK-IN INSTRUCTION) Tj ET
0.20 0.25 0.33 rg
BT /F2 8 Tf 50 ${noteY - 17} Td (Present booking reference ${ref} at the front desk upon arrival.) Tj ET
BT /F2 8 Tf 50 ${noteY - 29} Td (Our reception team will verify your reservation and allocate your workspace.) Tj ET

% ── FOOTER ───────────────────────────────────────────────────────────
0.78 0.82 0.87 RG
0.5 w
50 95 m 545 95 l S

0.40 0.47 0.56 rg
BT /F2 7.5 Tf 155 81 Td (This is an official payment receipt issued by Paper Street Workspaces.) Tj ET
BT /F2 7.5 Tf 110 69 Td (For enquiries contact hello@paperstreet.africa or call +254 709 123 456) Tj ET
`

  // Build proper PDF structure
  const streamContent = stream.trim()
  const encoder = new TextEncoder()
  const streamBytes = encoder.encode(streamContent)
  const streamLength = streamBytes.length

  const pdfHeader = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >> endobj
4 0 obj << /Length ${streamLength} >>
stream
${streamContent}
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 7
0000000000 65535 f\r
0000000009 00000 n\r
0000000058 00000 n\r
0000000115 00000 n\r
0000000244 00000 n\r
0000000350 00000 n\r
0000000424 00000 n\r
trailer << /Size 7 /Root 1 0 R >>
startxref
503
%%EOF`

  const pdfBytes = encoder.encode(pdfHeader)
  let binary = ''
  for (let i = 0; i < pdfBytes.byteLength; i++) {
    binary += String.fromCharCode(pdfBytes[i])
  }
  return btoa(binary)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    })
  }

  try {
    const body = await req.json()
    const {
      clientName = 'Client',
      clientEmail,
      clientPhone = '',
      companyName = '',
      serviceTitle = 'Workspace Reservation',
      tierName = 'Standard Access',
      location = 'Kisumu CBD (CBD Commercial Center)',
      bookingDate = new Date().toISOString().split('T')[0],
      startTime = '09:00 AM',
      endTime = '06:00 PM',
      totalAmountKES = 0,
      rentAmountKES = 0,
      depositAmountKES = 0,
      overtimeHours = 0,
      overtimeFeeKES = 0,
      paystackReference = '',
      passCode = '',
    } = body

    if (!clientEmail) {
      return new Response(JSON.stringify({ error: 'Missing clientEmail' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Deduplication: Check if email already dispatched for this reference
    if (paystackReference && paystackReference !== '') {
      const { data: existingBooking } = await supabase
        .from('client_bookings')
        .select('email_sent')
        .eq('paystack_reference', paystackReference)
        .limit(1)

      if (existingBooking && existingBooking.length > 0 && existingBooking[0].email_sent === true) {
        console.log(`[send-booking-email] Already sent for ref ${paystackReference}. Skipping.`)
        return new Response(
          JSON.stringify({ success: true, alreadySent: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }
    }

    // Fetch Brevo credentials
    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || Deno.env.get('BREVO_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.africa'

    if (!apiKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key' || s.key === 'brevo_key') apiKey = s.value
          if (s.key === 'brevo_sender_name') senderName = s.value
          if (s.key === 'brevo_sender_email') senderEmail = s.value
        }
      }
    }

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'BREVO_API_KEY is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Generate clean flat PDF receipt
    const pdfBase64 = createReceiptPdf({
      reference: paystackReference,
      clientName,
      clientEmail,
      clientPhone,
      companyName,
      serviceTitle,
      tierName,
      location,
      bookingDate,
      startTime,
      endTime,
      totalAmountKES,
      rentAmountKES,
      depositAmountKES,
      overtimeHours,
      overtimeFeeKES,
      passCode,
    })

    // Format dates into list of individual rows
    const dateItems = bookingDate.includes(',') 
      ? bookingDate.split(',').map((d: string) => d.trim()).filter(Boolean) 
      : bookingDate.includes(';')
      ? bookingDate.split(';').map((d: string) => d.trim()).filter(Boolean)
      : [bookingDate]

    const dateRowsHtml = dateItems.map((d: string, idx: number) => {
      const dFmt = formatDisplayDateOrDates(d)
      return `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 16px; color: #334155; font-size: 12px;">
            <span style="display: inline-block; background: #e2e8f0; color: #0F2D52; font-weight: 700; font-size: 10px; padding: 2px 6px; margin-right: 6px;">Day ${idx + 1}</span>
            <strong style="color: #0F2D52;">${dFmt}</strong>
          </td>
          <td style="padding: 8px 16px; color: #0F2D52; font-weight: 600; font-family: monospace; text-align: right; font-size: 12px;">
            ${startTime} &mdash; ${endTime}
          </td>
        </tr>
      `
    }).join('')

    // Full branded client email body
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Confirmation &amp; Receipt - Paper Street</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #fbfaf7; line-height: 1.6;">
  <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px 32px;">

    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 20px; margin-bottom: 28px;">
      <div style="font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52;">PAPER STREET</div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">Workspaces &amp; Commercial Center &middot; Kisumu CBD</div>
      <div style="margin-top: 10px;">
        <span style="display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 8px;">PAYMENT CONFIRMED</span>
      </div>
    </div>

    <div style="background: #0F2D52; color: #ffffff; padding: 16px 20px; margin-bottom: 28px;">
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; font-weight: 600;">Official Booking Reference</div>
      <div style="font-family: monospace; font-size: 22px; font-weight: 700; letter-spacing: 2px; margin-top: 2px;">${paystackReference}</div>
      <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Present this reference at reception upon arrival. Your PDF receipt is attached.</div>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="font-size: 15px; margin: 0 0 10px 0; color: #0F2D52; font-weight: 600;">Dear ${clientName},</p>
      <p style="font-size: 13px; margin: 0; color: #334155; line-height: 1.6;">
        Your reservation for <strong>${serviceTitle} (${tierName})</strong> has been confirmed and paid in full. Your official PDF receipt is attached to this email.
      </p>
    </div>

    <div style="border: 1px solid #e2e8f0; margin-bottom: 28px;">
      <div style="background: #f8fafc; padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52;">Reservation Summary</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 9px 16px; color: #64748B; width: 40%;">Package:</td><td style="padding: 9px 16px; color: #0F2D52; font-weight: 600;">${serviceTitle} &mdash; ${tierName}</td></tr>
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 9px 16px; color: #64748B;">Facility:</td><td style="padding: 9px 16px; color: #0F2D52;">${location}</td></tr>
        
        <!-- Individual Rows for Each Date and Time -->
        <tr style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 16px; color: #0F2D52; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Scheduled Date(s)</td>
          <td style="padding: 8px 16px; color: #0F2D52; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Access Window</td>
        </tr>
        ${dateRowsHtml}

        <tr style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #f1f5f9;"><td style="padding: 9px 16px; color: #64748B;">Base Amount:</td><td style="padding: 9px 16px; color: #0F2D52; font-family: monospace; text-align: right;">KES ${(rentAmountKES || totalAmountKES).toLocaleString()}</td></tr>
        ${depositAmountKES > 0 ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 9px 16px; color: #64748B;">Security Deposit:</td><td style="padding: 9px 16px; color: #0F2D52; font-family: monospace; text-align: right;">KES ${depositAmountKES.toLocaleString()}</td></tr>` : ''}
        ${overtimeFeeKES > 0 ? `<tr style="border-bottom: 1px solid #f1f5f9; background: #fffbeb;"><td style="padding: 9px 16px; color: #92400e;">Extended Hours (${overtimeHours} hr${overtimeHours > 1 ? 's' : ''}):</td><td style="padding: 9px 16px; color: #92400e; font-weight: 600; font-family: monospace; text-align: right;">+ KES ${overtimeFeeKES.toLocaleString()}</td></tr>` : ''}
        <tr style="background: #f8fafc;"><td style="padding: 11px 16px; color: #0F2D52; font-weight: 700; text-transform: uppercase; font-size: 12px;">Total Paid:</td><td style="padding: 11px 16px; color: #0F2D52; font-weight: 700; font-size: 15px; font-family: monospace; text-align: right;">KES ${totalAmountKES.toLocaleString()}</td></tr>
      </table>
    </div>

    <div style="background: #f8fafc; border-left: 3px solid #0F2D52; padding: 14px 16px; margin-bottom: 20px; font-size: 12px; color: #334155; line-height: 1.5;">
      <strong style="color: #0F2D52;">Front Desk Check-in:</strong> Present your booking reference <strong>${paystackReference}</strong> at Paper Street reception upon arrival.
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 16px; margin-bottom: 28px; font-size: 12px; color: #334155; line-height: 1.6;">
      <div style="font-weight: 700; color: #0F2D52; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; margin-bottom: 4px;">
        Booking Terms &amp; Cancellation Policy
      </div>
      <div>
        Please review our <a href="https://paperstreet.africa/daily-booking-terms" style="color: #0F2D52; font-weight: 600; text-decoration: underline;">Daily Booking Terms &amp; Cancellation Policy</a>. Rescheduling is 100% free with 24 hours notice. Cancellations require at least 2 days (48 hours) advance notice for a 90% refund (10% processing fee applies). Unutilized or missed bookings are non-refundable.
      </div>
    </div>

    <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.6;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748B;">Paper Street Workspaces</p>
      <p style="margin: 0 0 4px 0;">CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya</p>
      <p style="margin: 0;">Tel: +254 709 123 456 &nbsp;|&nbsp; hello@paperstreet.africa &nbsp;|&nbsp; www.paperstreet.africa</p>
    </div>

  </div>
</body>
</html>`

    // Send via Brevo
    const clientRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: clientEmail, name: clientName }],
        subject: `Official Booking Receipt: ${serviceTitle} (Ref: ${paystackReference})`,
        htmlContent: clientHtml,
        attachment: [
          {
            name: `PaperStreet_Receipt_${paystackReference}.pdf`,
            content: pdfBase64,
          },
        ],
      }),
    })

    const clientData = await clientRes.json().catch(() => ({}))

    if (!clientRes.ok) {
      return new Response(
        JSON.stringify({ error: clientData.message || 'Brevo client email failed', details: clientData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Mark email_sent = true in DB
    if (paystackReference) {
      try {
        await supabase
          .from('client_bookings')
          .update({ email_sent: true, email_sent_at: new Date().toISOString() })
          .eq('paystack_reference', paystackReference)
      } catch (_) {}
    }

    return new Response(
      JSON.stringify({ success: true, messageId: clientData.messageId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[send-booking-email Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
