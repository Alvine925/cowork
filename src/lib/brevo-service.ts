import { getSystemConfig } from './config-service'
import { supabase } from './supabase'
import { formatDisplayDateOrDates } from './booking-rules-engine'

export interface BookingEmailData {
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  serviceTitle: string
  tierName: string
  location: string
  bookingDate: string
  startTime: string
  endTime: string
  durationHours?: number
  rentAmountKES: number
  depositAmountKES: number
  totalAmountKES: number
  overtimeHours?: number
  overtimeFeeKES?: number
  paystackReference: string
  passCode?: string
  wifiNetwork?: string
  wifiPass?: string
  specialRequests?: string
  paymentDate?: string
}

/**
 * Generates an official executive PDF binary receipt for Paper Street.
 * Clean and plain layout: no cards or background boxes, pure institutional typography and dividing rules.
 */
export function generatePdfReceiptBinary(data: BookingEmailData): string {
  // Sanitize text for PDF string literals (strip backslash, parens, non-ASCII)
  const s = (v: string | number | undefined) =>
    String(v || '')
      .replace(/[\\()]/g, '')
      .replace(/[^\x20-\x7E]/g, '')
      .substring(0, 90)

  const ref = s(data.paystackReference || 'PS-REF')
  const issueDate = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
  const formattedDates = s(formatDisplayDateOrDates(data.bookingDate))
  const rentStr = `KES ${(data.rentAmountKES || data.totalAmountKES).toLocaleString()}`
  const totalStr = `KES ${data.totalAmountKES.toLocaleString()}`
  const overtimeHours = data.overtimeHours || 0
  const overtimeFee = data.overtimeFeeKES || 0
  const hasOvertime = overtimeFee > 0
  const hasDeposit = (data.depositAmountKES || 0) > 0
  const passCode = s(data.passCode || ref)

  let stream = `
% HEADER
0.06 0.18 0.32 rg
BT /F1 18 Tf 50 800 Td (PAPER STREET WORKSPACES) Tj ET
0.40 0.47 0.56 rg
BT /F2 8 Tf 50 786 Td (CBD Commercial Center - Oginga Odinga St - Kisumu, Kenya) Tj ET
BT /F2 8 Tf 50 775 Td (Tel: +254 709 123 456   |   hello@paperstreet.africa   |   www.paperstreet.africa) Tj ET

0.06 0.18 0.32 RG
2.0 w
50 768 m 545 768 l S

% DOCUMENT TITLE & REFERENCE
0.06 0.18 0.32 rg
BT /F1 13 Tf 50 748 Td (OFFICIAL BOOKING RECEIPT) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 733 Td (Reference:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 108 733 Td (${ref}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 721 Td (Issue Date:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 721 Td (${s(issueDate)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 709 Td (Status:) Tj ET
0.09 0.47 0.21 rg
BT /F1 8.5 Tf 108 709 Td (PAYMENT CONFIRMED AND VERIFIED) Tj ET

0.78 0.82 0.87 RG
0.5 w
50 700 m 545 700 l S

% CLIENT DETAILS
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 686 Td (CLIENT DETAILS) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 673 Td (Name:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 673 Td (${s(data.clientName)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 661 Td (Email:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 661 Td (${s(data.clientEmail)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 649 Td (Phone:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 649 Td (${s(data.clientPhone)}) Tj ET
`

  let nextY = 637

  if (data.companyName) {
    stream += `
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${nextY} Td (Company:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 ${nextY} Td (${s(data.companyName)}) Tj ET
`
    nextY -= 12
  }

  const ruleY1 = nextY - 4
  const reservationLabelY = ruleY1 - 14
  const packageY = reservationLabelY - 14
  const tierY = packageY - 13
  const locationY = tierY - 13
  const dateY = locationY - 13
  const windowY = dateY - 13
  const accessCodeY = windowY - 13

  stream += `
0.78 0.82 0.87 RG
0.5 w
50 ${ruleY1} m 545 ${ruleY1} l S

% RESERVATION DETAILS
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${reservationLabelY} Td (RESERVATION DETAILS) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${packageY} Td (Package:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 ${packageY} Td (${s(data.serviceTitle)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${tierY} Td (Tier:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 ${tierY} Td (${s(data.tierName)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${locationY} Td (Location:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 ${locationY} Td (${s(data.location)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${dateY} Td (Date:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 108 ${dateY} Td (${s(data.bookingDate)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${windowY} Td (Access Window:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 138 ${windowY} Td (${s(data.startTime)} to ${s(data.endTime)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${accessCodeY} Td (Access Code:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 138 ${accessCodeY} Td (${passCode}) Tj ET
`

  const ruleY2 = accessCodeY - 14
  const payLabelY = ruleY2 - 14
  const colHeaderY = payLabelY - 14
  const ruleY3 = colHeaderY - 8
  const baseRowY = ruleY3 - 17

  stream += `
0.78 0.82 0.87 RG
0.5 w
50 ${ruleY2} m 545 ${ruleY2} l S

% PAYMENT BREAKDOWN
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${payLabelY} Td (PAYMENT BREAKDOWN) Tj ET
0.40 0.47 0.56 rg
BT /F1 7.5 Tf 50 ${colHeaderY} Td (DESCRIPTION) Tj ET
BT /F1 7.5 Tf 435 ${colHeaderY} Td (AMOUNT) Tj ET

0.06 0.18 0.32 RG
0.75 w
50 ${ruleY3} m 545 ${ruleY3} l S

0.06 0.18 0.32 rg
BT /F2 8.5 Tf 50 ${baseRowY} Td (${s(data.serviceTitle)} - ${s(data.tierName)}) Tj ET
BT /F2 8.5 Tf 435 ${baseRowY} Td (${s(rentStr)}) Tj ET
`

  let rowY = baseRowY - 17

  if (hasDeposit) {
    stream += `
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 ${rowY} Td (Refundable Security Deposit) Tj ET
BT /F2 8.5 Tf 435 ${rowY} Td (KES ${s((data.depositAmountKES || 0).toLocaleString())}) Tj ET
`
    rowY -= 17
  }

  if (hasOvertime) {
    stream += `
0.55 0.27 0.07 rg
BT /F2 8.5 Tf 50 ${rowY} Td (Extended-Hours Access - ${s(overtimeHours)} hr${overtimeHours > 1 ? 's' : ''} after close of business) Tj ET
BT /F2 8.5 Tf 435 ${rowY} Td (KES ${s(overtimeFee.toLocaleString())}) Tj ET
`
    rowY -= 17
  }

  const totalRuleY = rowY - 5
  const totalRowY = totalRuleY - 18

  stream += `
0.06 0.18 0.32 RG
1.5 w
50 ${totalRuleY + 3} m 545 ${totalRuleY + 3} l S
0.5 w
50 ${totalRuleY} m 545 ${totalRuleY} l S

0.06 0.18 0.32 rg
BT /F1 10 Tf 50 ${totalRowY} Td (TOTAL AMOUNT PAID) Tj ET
BT /F1 11 Tf 390 ${totalRowY} Td (${s(totalStr)}) Tj ET

0.06 0.18 0.32 RG
1.5 w
50 ${totalRowY - 10} m 545 ${totalRowY - 10} l S

0.78 0.82 0.87 RG
0.5 w
50 ${totalRowY - 38} m 545 ${totalRowY - 38} l S

% CHECK-IN
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${totalRowY - 52} Td (CHECK-IN INSTRUCTION) Tj ET
0.20 0.25 0.33 rg
BT /F2 8 Tf 50 ${totalRowY - 66} Td (Present booking reference ${ref} at the front desk upon arrival.) Tj ET
BT /F2 8 Tf 50 ${totalRowY - 78} Td (Reception will verify your reservation and allocate your workspace.) Tj ET

% FOOTER
0.78 0.82 0.87 RG
0.5 w
50 95 m 545 95 l S
0.40 0.47 0.56 rg
BT /F2 7.5 Tf 150 81 Td (This is an official payment receipt issued by Paper Street Workspaces.) Tj ET
BT /F2 7.5 Tf 105 69 Td (For enquiries: hello@paperstreet.africa  |  +254 709 123 456  |  www.paperstreet.africa) Tj ET
`

  const streamContent = stream.trim()
  const pdfLines = [
    '%PDF-1.4',
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >> endobj',
    `4 0 obj << /Length ${Buffer.byteLength(streamContent, 'utf-8')} >> stream\n${streamContent}\nendstream\nendobj`,
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj',
    '6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
  ]

  let pdfContent = pdfLines.join('\n') + '\n'
  const xrefOffset = pdfContent.length

  const xref = [
    'xref',
    '0 7',
    '0000000000 65535 f ',
    '0000000009 00000 n ',
    '0000000058 00000 n ',
    '0000000115 00000 n ',
    '0000000260 00000 n ',
    '0000000350 00000 n ',
    '0000000420 00000 n ',
    'trailer << /Size 7 /Root 1 0 R >>',
    'startxref',
    `${xrefOffset}`,
    '%%EOF'
  ].join('\n')

  return pdfContent + xref
}

/**
 * Builds clean typography-based client confirmation email HTML.
 */
function buildClientCleanEmailHtml(data: BookingEmailData): string {
  const dateItems = data.bookingDate.includes(',')
    ? data.bookingDate.split(',').map((d: string) => d.trim()).filter(Boolean)
    : data.bookingDate.includes(';')
    ? data.bookingDate.split(';').map((d: string) => d.trim()).filter(Boolean)
    : [data.bookingDate]

  const dateRowsHtml = dateItems.map((d: string, idx: number) => {
    const dFmt = formatDisplayDateOrDates(d)
    return `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 8px 16px; color: #334155; font-size: 12px;">
          <span style="display: inline-block; background: #e2e8f0; color: #0F2D52; font-weight: 700; font-size: 10px; padding: 2px 6px; margin-right: 6px;">Day ${idx + 1}</span>
          <strong style="color: #0F2D52;">${dFmt}</strong>
        </td>
        <td style="padding: 8px 16px; color: #0F2D52; font-weight: 600; font-family: monospace; text-align: right; font-size: 12px;">
          ${data.startTime} &mdash; ${data.endTime}
        </td>
      </tr>
    `
  }).join('')

  const overtimeHours = data.overtimeHours || 0
  const overtimeFee = data.overtimeFeeKES || 0

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Confirmation &amp; Receipt - Paper Street</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #fbfaf7; line-height: 1.6;">
  <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px 32px;">
    
    <!-- Paper Street Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
          PAPER STREET
        </div>
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
          Workspaces &amp; Commercial Center · Kisumu CBD
        </div>
      </div>
      <div style="text-align: right;">
        <div style="display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 8px;">
          PAYMENT CONFIRMED
        </div>
      </div>
    </div>

    <!-- Prominent Booking Reference Banner -->
    <div style="background: #0F2D52; color: #ffffff; padding: 16px 20px; margin-bottom: 28px;">
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; font-weight: 600;">
        Official Booking Reference
      </div>
      <div style="font-family: monospace; font-size: 22px; font-weight: 700; letter-spacing: 2px; margin-top: 2px;">
        ${data.paystackReference}
      </div>
      <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
        Present this confirmation reference upon arrival at reception for building check-in.
      </div>
    </div>

    <!-- Greeting & Confirmation -->
    <div style="margin-bottom: 24px;">
      <p style="font-size: 15px; margin: 0 0 10px 0; color: #0F2D52; font-weight: 600;">
        Dear ${data.clientName},
      </p>
      <p style="font-size: 13px; margin: 0; color: #334155; line-height: 1.6;">
        Your reservation for <strong>${data.serviceTitle} (${data.tierName})</strong> at Paper Street is confirmed and paid in full. Your official PDF receipt is attached to this email.
      </p>
    </div>

    <!-- Reservation Ledger Summary -->
    <div style="border: 1px solid #e2e8f0; margin-bottom: 28px;">
      <div style="background: #f8fafc; padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52;">
        Reservation Summary
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 16px; color: #64748B; width: 38%;">Package &amp; Tier:</td>
          <td style="padding: 10px 16px; color: #0F2D52; font-weight: 600;">${data.serviceTitle} — ${data.tierName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 16px; color: #64748B;">Hub Facility:</td>
          <td style="padding: 10px 16px; color: #0F2D52;">${data.location}</td>
        </tr>
        
        <!-- Individual Rows for Each Date and Time -->
        <tr style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 16px; color: #0F2D52; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Scheduled Date(s)</td>
          <td style="padding: 8px 16px; color: #0F2D52; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Access Window</td>
        </tr>
        ${dateRowsHtml}

        <tr style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 16px; color: #64748B;">Base Workspace Package:</td>
          <td style="padding: 10px 16px; color: #0F2D52; font-family: monospace; text-align: right;">KES ${(data.rentAmountKES || data.totalAmountKES).toLocaleString()}</td>
        </tr>
        ${overtimeFee > 0 ? `
        <tr style="border-bottom: 1px solid #f1f5f9; background: #fffbeb;">
          <td style="padding: 10px 16px; color: #92400e;">Extended-Hours Access (${overtimeHours} hr${overtimeHours > 1 ? 's' : ''}):</td>
          <td style="padding: 10px 16px; color: #92400e; font-weight: 600; font-family: monospace; text-align: right;">+ KES ${overtimeFee.toLocaleString()}</td>
        </tr>
        ` : ''}
        ${data.depositAmountKES > 0 ? `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 16px; color: #64748B;">Security Deposit:</td>
          <td style="padding: 10px 16px; color: #0F2D52; font-family: monospace; text-align: right;">KES ${data.depositAmountKES.toLocaleString()}</td>
        </tr>
        ` : ''}
        <tr style="background: #f8fafc;">
          <td style="padding: 12px 16px; color: #0F2D52; font-weight: 700; text-transform: uppercase; font-size: 12px;">Total Paid:</td>
          <td style="padding: 12px 16px; color: #0F2D52; font-weight: 700; font-size: 15px; font-family: monospace; text-align: right;">KES ${data.totalAmountKES.toLocaleString()}</td>
        </tr>
      </table>
    </div>

    <!-- Front Desk Check-in Notes -->
    <div style="background: #f8fafc; border-left: 3px solid #0F2D52; padding: 14px 16px; margin-bottom: 20px; font-size: 12px; color: #334155; line-height: 1.5;">
      <strong style="color: #0F2D52;">Front Desk Check-in:</strong> Present your booking reference <strong>${data.paystackReference}</strong> at Paper Street reception upon arrival. Our team will verify your reservation, allocate your space, and connect you to high-speed Wi-Fi.
    </div>

    <!-- Terms & Policies Notice -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 16px; margin-bottom: 28px; font-size: 12px; color: #334155; line-height: 1.6;">
      <div style="font-weight: 700; color: #0F2D52; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; margin-bottom: 4px;">
        Booking Terms &amp; Cancellation Policy
      </div>
      <div>
        Please review our <a href="https://paperstreet.africa/daily-booking-terms" style="color: #0F2D52; font-weight: 600; text-decoration: underline;">Daily Booking Terms &amp; Cancellation Policy</a>. Rescheduling is 100% free with 24 hours notice. Cancellations require at least 2 days (48 hours) advance notice for a 90% refund (10% processing fee applies). Unutilized or missed bookings are non-refundable.
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.6;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748B;">Paper Street Workspaces</p>
      <p style="margin: 0 0 4px 0;">CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya</p>
      <p style="margin: 0;">Tel: +254 709 123 456 &nbsp;|&nbsp; Email: hello@paperstreet.africa &nbsp;|&nbsp; www.paperstreet.africa</p>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Builds clean typography-based admin notification email HTML.
 */
function buildAdminCleanEmailHtml(data: BookingEmailData): string {
  const formattedDate = formatDisplayDateOrDates(data.bookingDate)

  const overtimeHours = data.overtimeHours || 0
  const overtimeFee = data.overtimeFeeKES || 0

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking Payment - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 18px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52;">
        PAPER STREET
      </div>
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748B; font-weight: 600; margin-top: 4px;">
        Admin Booking &amp; Payment Alert
      </div>
    </div>

    <!-- Booking Ledger Info -->
    <div style="margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr>
          <td style="padding: 6px 0; color: #64748B; width: 35%;">Client Name:</td>
          <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${data.clientName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Client Email:</td>
          <td style="padding: 6px 0; color: #0F2D52;"><a href="mailto:${data.clientEmail}" style="color: #0F2D52;">${data.clientEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Client Phone:</td>
          <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${data.clientPhone}</td>
        </tr>
        ${data.companyName ? `
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Company / Entity:</td>
          <td style="padding: 6px 0; color: #0F2D52;">${data.companyName}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Package &amp; Tier:</td>
          <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${data.serviceTitle} — ${data.tierName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Schedule Date:</td>
          <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${formattedDate} (${data.startTime} - ${data.endTime})</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Hub Facility:</td>
          <td style="padding: 6px 0; color: #0F2D52;">${data.location}</td>
        </tr>
        ${overtimeHours > 0 ? `
        <tr>
          <td style="padding: 6px 0; color: #b45309;">Extended Hours:</td>
          <td style="padding: 6px 0; color: #b45309; font-weight: 600;">${overtimeHours} hr(s) (+ KES ${overtimeFee.toLocaleString()})</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Total Revenue Paid:</td>
          <td style="padding: 6px 0; color: #0F2D52; font-size: 15px; font-weight: 700;">KES ${data.totalAmountKES.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Paystack Reference:</td>
          <td style="padding: 6px 0; font-family: monospace; color: #0F2D52; font-weight: 600;">${data.paystackReference}</td>
        </tr>
        ${data.specialRequests ? `
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Notes / Requests:</td>
          <td style="padding: 6px 0; color: #0F2D52;">${data.specialRequests}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #94A3B8;">
      <p style="margin: 0;">Automated notification from Paper Street Booking Engine.</p>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Sends a transactional email using Brevo (Sendinblue) API with optional PDF receipt attachment.
 */
export async function sendBrevoEmail(params: {
  to: { email: string; name?: string }[]
  subject: string
  htmlContent: string
  attachment?: { content: string; name: string }[]
}): Promise<{ success: boolean; data?: any; error?: string }> {
  const config = await getSystemConfig()

  if (!config.brevoApiKey || config.brevoApiKey.includes('placeholder')) {
    console.warn('[Brevo Email] BREVO_API_KEY is not configured. Simulating email dispatch to:', params.to)
    return { success: true, data: { simulated: true } }
  }

  try {
    const payload = {
      sender: {
        name: config.brevoSenderName || 'Paper Street Workspaces',
        email: config.brevoSenderEmail || 'hello@paperstreet.africa',
      },
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
      attachment: params.attachment,
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': config.brevoApiKey,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('[Brevo API Error]', result)
      return { success: false, error: result.message || JSON.stringify(result) }
    }

    return { success: true, data: result }
  } catch (err: any) {
    console.error('[Brevo Fetch Exception]', err)
    return { success: false, error: err?.message || String(err) }
  }
}

/**
 * Dispatches customer confirmation email (with executive PDF receipt) and admin notification email.
 * Includes strict single-send deduplication locks via database flags `email_sent` and `admin_alert_sent`.
 */
export async function dispatchBookingEmails(data: BookingEmailData): Promise<{
  clientSuccess: boolean
  adminSuccess: boolean
}> {
  const config = await getSystemConfig()

  // 1. Check existing booking record in database to prevent double send
  let shouldSendClient = true
  let shouldSendAdmin = true

  if (data.paystackReference && data.paystackReference !== '—') {
    try {
      const { data: existing } = await supabase
        .from('client_bookings')
        .select('email_sent, admin_alert_sent')
        .eq('paystack_reference', data.paystackReference)
        .limit(1)

      if (existing && existing.length > 0) {
        if (existing[0].email_sent === true) {
          console.log(`[Brevo Deduplication] Client email already sent for ${data.paystackReference}. Skipping.`)
          shouldSendClient = false
        }
        if (existing[0].admin_alert_sent === true) {
          console.log(`[Brevo Deduplication] Admin alert already sent for ${data.paystackReference}. Skipping.`)
          shouldSendAdmin = false
        }
      }
    } catch (dbErr) {
      console.warn('[Brevo Deduplication DB check error]', dbErr)
    }
  }

  let clientSuccess = false
  let adminSuccess = false

  // 2. Send email to client (with clean binary PDF receipt)
  if (shouldSendClient) {
    const pdfContent = generatePdfReceiptBinary(data)
    const pdfBase64 = Buffer.from(pdfContent, 'binary').toString('base64')
    const attachmentFilename = `PaperStreet_Receipt_${data.paystackReference}.pdf`

    const clientHtml = buildClientCleanEmailHtml(data)

    const clientRes = await sendBrevoEmail({
      to: [{ email: data.clientEmail, name: data.clientName }],
      subject: `Official Booking Receipt: ${data.serviceTitle} (Ref: ${data.paystackReference})`,
      htmlContent: clientHtml,
      attachment: [
        {
          name: attachmentFilename,
          content: pdfBase64,
        },
      ],
    })

    clientSuccess = clientRes.success

    if (clientSuccess && data.paystackReference) {
      try {
        await supabase
          .from('client_bookings')
          .update({ email_sent: true, email_sent_at: new Date().toISOString() })
          .eq('paystack_reference', data.paystackReference)
      } catch (_) {}
    }
  } else {
    clientSuccess = true // Already sent previously
  }

  // 3. Send email to admin
  if (shouldSendAdmin) {
    const adminHtml = buildAdminCleanEmailHtml(data)
    const adminEmail = config.adminEmail || 'otienoalvine925@gmail.com'

    const adminRes = await sendBrevoEmail({
      to: [{ email: adminEmail, name: 'Paper Street Admin' }],
      subject: `[NEW BOOKING] ${data.clientName} - ${data.serviceTitle} (KES ${data.totalAmountKES.toLocaleString()})`,
      htmlContent: adminHtml,
    })

    adminSuccess = adminRes.success

    if (adminSuccess && data.paystackReference) {
      try {
        await supabase
          .from('client_bookings')
          .update({ admin_alert_sent: true })
          .eq('paystack_reference', data.paystackReference)
      } catch (_) {}
    }
  } else {
    adminSuccess = true // Already sent previously
  }

  return {
    clientSuccess,
    adminSuccess,
  }
}

export interface ContactInquiryData {
  submissionId?: string
  name: string
  email: string
  phone: string
  company?: string
  location: string
  service: string
  message: string
}

/**
 * Builds high-converting, branded user acknowledgement email for contact inquiries.
 * Pure editorial layout — NO card wrapper, NO shaded blocks. All content on the background.
 */
export function buildContactAcknowledgementHtml(data: ContactInquiryData): string {
  const refCode = data.submissionId ? `INQ-${data.submissionId.slice(0, 8).toUpperCase()}` : 'PS-INQ'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Received - Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Commercial Center &middot; Oginga Odinga St &middot; Kisumu CBD, Kenya
      </div>
    </div>

    <!-- Title & Tracking -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        INQUIRY ACKNOWLEDGEMENT &middot; <span style="color: #0F2D52; font-family: monospace;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">
        We have received your message.
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.6;">
        Dear ${data.name}, thank you for contacting Paper Street Workspaces. We have recorded your inquiry regarding <strong>${data.service}</strong> in <strong>${data.location}</strong> and assigned it to our client services desk. Our relationship team typically responds within <strong>2 business hours</strong>.
      </p>
    </div>

    <!-- Inquiry Details Table (Unboxed, direct on background) -->
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 6px 0; margin-bottom: 28px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; padding: 8px 0 4px 0;">
        INQUIRY SPECIFICATIONS
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B; width: 35%;">Service Requested:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${data.service}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Target Hub:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${data.location}</td>
        </tr>
        ${data.company ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Company / Entity:</td>
          <td style="padding: 10px 0; color: #0F2D52;">${data.company}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Phone / WhatsApp:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748B; vertical-align: top;">Your Message:</td>
          <td style="padding: 10px 0; color: #1e293b; font-style: italic; line-height: 1.5;">"${data.message}"</td>
        </tr>
      </table>
    </div>

    <!-- Direct Contact Line -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #0F2D52;">Need immediate assistance?</strong> Contact our front desk directly on phone or WhatsApp at <strong style="color: #0F2D52;">+254 709 123 456</strong> (Mon&ndash;Sat, 8:00 AM &ndash; 6:00 PM).
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.africa &middot; www.paperstreet.africa</div>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Builds admin alert email HTML for incoming contact inquiries.
 * Pure editorial layout — NO card wrapper, NO shaded blocks.
 */
export function buildContactAdminAlertHtml(data: ContactInquiryData): string {
  const refCode = data.submissionId ? `INQ-${data.submissionId.slice(0, 8).toUpperCase()}` : 'PS-INQ'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Message - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        NEW INCOMING CONTACT INQUIRY &middot; <span style="font-family: monospace; color: #0F2D52;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0;">
        ${data.name} &mdash; ${data.service}
      </div>
    </div>

    <!-- Info Table -->
    <div style="border-bottom: 1px solid #0F2D52; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 35%;">Client Name:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${data.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Email Address:</td>
          <td style="padding: 8px 0; color: #0F2D52;"><a href="mailto:${data.email}" style="color: #0F2D52; font-weight: 600;">${data.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;"><a href="tel:${data.phone}" style="color: #0F2D52;">${data.phone}</a></td>
        </tr>
        ${data.company ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Company:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${data.company}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Location:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${data.location}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B;">Service:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${data.service}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
        CLIENT MESSAGE:
      </div>
      <div style="font-size: 13.5px; color: #0F2D52; line-height: 1.6; white-space: pre-wrap; padding: 4px 0;">${data.message}</div>
    </div>

    <!-- Actions -->
    <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 14px 0; margin-bottom: 24px;">
      <a href="mailto:${data.email}?subject=RE: Paper Street Inquiry - ${data.service}" style="color: #0F2D52; font-weight: 700; font-size: 12px; text-decoration: underline; margin-right: 24px;">
        Reply via Email &rarr;
      </a>
      <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="color: #166534; font-weight: 700; font-size: 12px; text-decoration: underline;">
        WhatsApp Client &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8;">
      Automated alert from Paper Street Inquiries Engine. Record saved to Supabase <code>contact_submissions</code>.
    </div>

  </div>
</body>
</html>
`
}

/**
 * Dispatches contact inquiry acknowledgement to user and alert to admin.
 */
export async function dispatchContactEmails(data: ContactInquiryData): Promise<{
  clientSuccess: boolean
  adminSuccess: boolean
}> {
  const config = await getSystemConfig()
  const adminEmail = config.adminEmail || 'otienoalvine925@gmail.com'

  let clientSuccess = false
  let adminSuccess = false

  // 1. Send acknowledgement to client
  if (data.email) {
    const clientHtml = buildContactAcknowledgementHtml(data)
    const clientRes = await sendBrevoEmail({
      to: [{ email: data.email, name: data.name }],
      subject: `Thank you for contacting Paper Street [${data.service}]`,
      htmlContent: clientHtml,
    })
    clientSuccess = clientRes.success
  }

  // 2. Send notification to admin
  const adminHtml = buildContactAdminAlertHtml(data)
  const adminRes = await sendBrevoEmail({
    to: [{ email: adminEmail, name: 'Paper Street Inquiries Team' }],
    subject: `[NEW INQUIRY] ${data.name} &mdash; ${data.service} (${data.location})`,
    htmlContent: adminHtml,
  })
  adminSuccess = adminRes.success

  return { clientSuccess, adminSuccess }
}

export interface LocationWaitlistData {
  waitlistId?: string
  fullName: string
  email: string
  phone: string
  company?: string
  location: string
  serviceInterest?: string
  teamSize?: string
  estimatedLaunchNeed?: string
  notes?: string
}

/**
 * Builds VIP Waitlist User Acknowledgement Email HTML.
 * Pure editorial layout — NO card wrapper, NO shaded blocks. All content on the background.
 */
export function buildWaitlistAcknowledgementHtml(data: LocationWaitlistData): string {
  const refCode = data.waitlistId ? `VIP-${data.waitlistId.slice(0, 8).toUpperCase()}` : 'PS-VIP'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VIP Expansion Waitlist - Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Expansion Network &middot; Kenya Commercial Hubs
      </div>
    </div>

    <!-- Title & VIP Code -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        PRIORITY RESERVATION &middot; <span style="color: #0F2D52; font-family: monospace;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">
        You're on the VIP list for ${data.location}.
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.6;">
        Hello ${data.fullName}, thank you for registering for our upcoming <strong>Paper Street ${data.location}</strong> commercial hub. Your priority profile is confirmed.
      </p>
    </div>

    <!-- VIP Perks List -->
    <div style="border-top: 1px solid #0F2D52; padding: 14px 0 6px 0; margin-bottom: 20px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-bottom: 8px;">
        YOUR VIP EARLY-BIRD PRIVILEGES
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600; width: 40%;">20% Launch Rate Discount:</td>
          <td style="padding: 8px 0; color: #334155;">Applied to your first contracted membership term upon opening.</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">Priority Suite Allocation:</td>
          <td style="padding: 8px 0; color: #334155;">Advance reservation window before public opening.</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">Executive Boardroom Credits:</td>
          <td style="padding: 8px 0; color: #334155;">5 complimentary meeting room hours in your first month.</td>
        </tr>
      </table>
    </div>

    <!-- Registration Profile Table (Unboxed) -->
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 6px 0; margin-bottom: 28px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; padding: 8px 0 4px 0;">
        REGISTRATION PROFILE
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B; width: 35%;">Target City:</td>
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">${data.location}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B;">Workspace Solution:</td>
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">${data.serviceInterest || 'Virtual Office & Coworking'}</td>
        </tr>
        ${data.teamSize ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B;">Team Size:</td>
          <td style="padding: 9px 0; color: #0F2D52;">${data.teamSize}</td>
        </tr>
        ` : ''}
        ${data.estimatedLaunchNeed ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B;">Target Timeline:</td>
          <td style="padding: 9px 0; color: #0F2D52;">${data.estimatedLaunchNeed}</td>
        </tr>
        ` : ''}
        ${data.company ? `
        <tr>
          <td style="padding: 9px 0; color: #64748B;">Company:</td>
          <td style="padding: 9px 0; color: #0F2D52;">${data.company}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Active Hub Notice -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #0F2D52;">Need an immediate registered address in Kenya?</strong> Our flagship <strong>Kisumu CBD Hub</strong> on Oginga Odinga Street is active and accepting registrations today for eCitizen BRS incorporation, KRA PIN compliance, and daily mail scanning.
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>Expansion Hubs: Nairobi &middot; Mombasa &middot; Nakuru &middot; Eldoret &middot; Kisumu CBD &middot; hello@paperstreet.africa</div>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Builds Admin Alert Email HTML for incoming Location Waitlist signups.
 * Pure editorial layout — NO card wrapper, NO shaded blocks.
 */
export function buildWaitlistAdminAlertHtml(data: LocationWaitlistData): string {
  const refCode = data.waitlistId ? `VIP-${data.waitlistId.slice(0, 8).toUpperCase()}` : 'PS-VIP'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Location Waitlist Lead - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        NEW EXPANSION WAITLIST LEAD &middot; <span style="font-family: monospace; color: #0F2D52;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0;">
        ${data.fullName} &mdash; ${data.location}
      </div>
    </div>

    <!-- Info Table -->
    <div style="border-bottom: 1px solid #0F2D52; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 35%;">Lead Name:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${data.fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Target City:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 700; font-size: 14px;">${data.location}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Email Address:</td>
          <td style="padding: 8px 0; color: #0F2D52;"><a href="mailto:${data.email}" style="color: #0F2D52; font-weight: 600;">${data.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;"><a href="tel:${data.phone}" style="color: #0F2D52;">${data.phone}</a></td>
        </tr>
        ${data.company ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Company:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${data.company}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Service Interest:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${data.serviceInterest || 'General'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Team Size:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${data.teamSize || 'Not specified'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Timeline Requirement:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${data.estimatedLaunchNeed || 'Not specified'}</td>
        </tr>
        ${data.notes ? `
        <tr>
          <td style="padding: 8px 0; color: #64748B; vertical-align: top;">Notes:</td>
          <td style="padding: 8px 0; color: #334155; font-style: italic;">"${data.notes}"</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Quick Actions -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 14px; margin-bottom: 24px;">
      <a href="mailto:${data.email}?subject=Paper Street ${data.location} Expansion - VIP Waitlist" style="color: #0F2D52; font-weight: 700; font-size: 12px; text-decoration: underline; margin-right: 24px;">
        Email Lead &rarr;
      </a>
      <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="color: #166534; font-weight: 700; font-size: 12px; text-decoration: underline;">
        WhatsApp Lead &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8;">
      Automated lead alert from Paper Street Expansion Engine. Saved to Supabase <code>location_waitlists</code>.
    </div>

  </div>
</body>
</html>
`
}

/**
 * Dispatches location waitlist acknowledgement to user and alert to admin.
 */
export async function dispatchWaitlistEmails(data: LocationWaitlistData): Promise<{
  clientSuccess: boolean
  adminSuccess: boolean
}> {
  const config = await getSystemConfig()
  const adminEmail = config.adminEmail || 'otienoalvine925@gmail.com'

  let clientSuccess = false
  let adminSuccess = false

  // 1. Send acknowledgement to user
  if (data.email) {
    const clientHtml = buildWaitlistAcknowledgementHtml(data)
    const clientRes = await sendBrevoEmail({
      to: [{ email: data.email, name: data.fullName }],
      subject: `You're on the VIP Waitlist for Paper Street ${data.location}!`,
      htmlContent: clientHtml,
    })
    clientSuccess = clientRes.success
  }

  // 2. Send notification to admin
  const adminHtml = buildWaitlistAdminAlertHtml(data)
  const adminRes = await sendBrevoEmail({
    to: [{ email: adminEmail, name: 'Paper Street Expansion Team' }],
    subject: `[WAITLIST LEAD] ${data.fullName} &mdash; ${data.location} (${data.serviceInterest || 'Workspace'})`,
    htmlContent: adminHtml,
  })
  adminSuccess = adminRes.success

  return { clientSuccess, adminSuccess }
}

// ==========================================
// 6. CLIENT PORTAL AUTH & ONBOARDING EMAILS
// ==========================================

export interface OtpEmailData {
  email: string
  name?: string
  otp: string
}

/**
 * Builds 6-digit OTP verification email HTML.
 * Pure editorial layout — NO card wrapper, NO shaded blocks.
 */
export function buildOtpEmailHtml(data: OtpEmailData): string {
  const greetingName = data.name ? `Dear ${data.name},` : 'Hello,'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verification Code - Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Workspaces &amp; Commercial Center &middot; Kisumu CBD, Kenya
      </div>
    </div>

    <!-- Title -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        SECURITY VERIFICATION CODE
      </div>
      <div style="font-size: 24px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">
        Verify your email address
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0 0 20px 0; line-height: 1.6;">
        ${greetingName} use the 6-digit one-time verification code below to authenticate your Paper Street Client Account:
      </p>
    </div>

    <!-- OTP Code Display (Pure typography, no box) -->
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 24px 0; margin-bottom: 28px; text-align: center;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 8px;">
        ONE-TIME VERIFICATION PASSCODE
      </div>
      <div style="font-family: monospace; font-size: 38px; font-weight: 700; letter-spacing: 10px; color: #0F2D52;">
        ${data.otp}
      </div>
      <div style="font-size: 11px; color: #64748B; margin-top: 8px;">
        This code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
      </div>
    </div>

    <!-- Instructions -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <p style="margin: 0 0 8px 0;">
        If you did not request this verification code, you can safely disregard this email. Your account security remains intact.
      </p>
      <p style="margin: 0;">
        For account assistance, contact our front desk at <strong style="color: #0F2D52;">hello@paperstreet.africa</strong>.
      </p>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.africa &middot; www.paperstreet.africa</div>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Dispatches 6-digit OTP verification email via Brevo.
 */
export async function dispatchOtpEmail(data: OtpEmailData): Promise<boolean> {
  const html = buildOtpEmailHtml(data)
  const res = await sendBrevoEmail({
    to: [{ email: data.email, name: data.name || 'Client' }],
    subject: `${data.otp} is your Paper Street verification code`,
    htmlContent: html,
  })
  return res.success
}


export interface WelcomeEmailData {
  email: string
  name: string
  phone?: string
  referralCode?: string
}

/**
 * Builds high-converting, branded Client Welcome Email HTML.
 * Pure editorial layout — NO card wrapper, NO shaded blocks.
 */
export function buildWelcomeEmailHtml(data: WelcomeEmailData): string {
  const refCode = data.referralCode || 'PAPER-VIP'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Workspaces &amp; Commercial Center &middot; Kisumu CBD, Kenya
      </div>
    </div>

    <!-- Title & Greeting -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        MEMBERSHIP ONBOARDING
      </div>
      <div style="font-size: 24px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">
        Welcome to Paper Street, ${data.name}.
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.6;">
        Your Paper Street Client Account is active and verified. You now have direct access to on-demand workspace reservations, executive boardrooms, official tax receipts, and member perks.
      </p>
    </div>

    <!-- Client Portal Privileges -->
    <div style="border-top: 1px solid #0F2D52; padding: 14px 0 6px 0; margin-bottom: 20px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-bottom: 8px;">
        WHAT YOU CAN DO IN YOUR PORTAL
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600; width: 35%;">Instant Reservations:</td>
          <td style="padding: 9px 0; color: #334155;">Book hot desks, flexi passes, meeting rooms, and private offices with instant Paystack / M-Pesa checkout.</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">Passes &amp; Check-in:</td>
          <td style="padding: 9px 0; color: #334155;">View active building entry codes and ultra-fast member Wi-Fi credentials.</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">Official Invoices:</td>
          <td style="padding: 9px 0; color: #334155;">Download compliant PDF payment receipts for your company bookkeeping.</td>
        </tr>
        <tr>
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">Concerns &amp; Support:</td>
          <td style="padding: 9px 0; color: #334155;">Raise support tickets and facility requests directly with the front desk.</td>
        </tr>
      </table>
    </div>

    <!-- Referral Program (Unboxed) -->
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 14px 0; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-bottom: 4px;">
        YOUR EXCLUSIVE REFERRAL PASSCODE
      </div>
      <div style="font-family: monospace; font-size: 20px; font-weight: 700; color: #0F2D52; margin: 4px 0;">
        ${refCode}
      </div>
      <div style="font-size: 12.5px; color: #334155; line-height: 1.5;">
        Share this code with colleagues or partner firms. They receive <strong>10% off their first booking</strong>, and you earn <strong>KES 500 in workspace credits</strong> for each referral.
      </div>
    </div>

    <!-- Direct Action Button -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 24px;">
      <a href="https://paperstreet.africa/portal/client/dashboard" style="display: inline-block; background: #0F2D52; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 24px;">
        Access Client Portal &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.africa &middot; www.paperstreet.africa</div>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Dispatches Welcome Email via Brevo.
 */
export async function dispatchWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
  const html = buildWelcomeEmailHtml(data)
  const res = await sendBrevoEmail({
    to: [{ email: data.email, name: data.name }],
    subject: `Welcome to Paper Street Workspaces, ${data.name}!`,
    htmlContent: html,
  })
  return res.success
}


export interface FeedbackAlertData {
  ticketId?: string
  name: string
  email: string
  phone?: string
  category: string
  priority: string
  subject: string
  message: string
  location?: string
}

/**
 * Builds Admin Alert Email HTML for Client Support Tickets / Concerns.
 * Pure editorial layout — NO card wrapper, NO shaded blocks.
 */
export function buildFeedbackAlertHtml(data: FeedbackAlertData): string {
  const refCode = data.ticketId ? `TKT-${data.ticketId.slice(0, 8).toUpperCase()}` : 'PS-TKT'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Client Support Ticket - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        CLIENT SUPPORT TICKET &middot; <span style="font-family: monospace; color: #0F2D52;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0;">
        [${data.category.toUpperCase()}] ${data.subject}
      </div>
    </div>

    <!-- Ticket Info -->
    <div style="border-bottom: 1px solid #0F2D52; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 35%;">Client Name:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${data.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Email Address:</td>
          <td style="padding: 8px 0; color: #0F2D52;"><a href="mailto:${data.email}" style="color: #0F2D52; font-weight: 600;">${data.email}</a></td>
        </tr>
        ${data.phone ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Phone:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;"><a href="tel:${data.phone}" style="color: #0F2D52;">${data.phone}</a></td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Category:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600; text-transform: uppercase;">${data.category}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Priority:</td>
          <td style="padding: 8px 0; color: ${data.priority === 'urgent' ? '#dc2626' : '#0F2D52'}; font-weight: 700; text-transform: uppercase;">${data.priority}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B;">Location:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${data.location || 'Kisumu CBD'}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
        CLIENT MESSAGE / CONCERN:
      </div>
      <div style="font-size: 13.5px; color: #0F2D52; line-height: 1.6; white-space: pre-wrap; padding: 4px 0;">${data.message}</div>
    </div>

    <!-- Actions -->
    <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 14px 0; margin-bottom: 24px;">
      <a href="mailto:${data.email}?subject=RE: Paper Street Support [${refCode}] - ${data.subject}" style="color: #0F2D52; font-weight: 700; font-size: 12px; text-decoration: underline; margin-right: 24px;">
        Reply to Client &rarr;
      </a>
      ${data.phone ? `
      <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="color: #166534; font-weight: 700; font-size: 12px; text-decoration: underline;">
        WhatsApp Client &rarr;
      </a>
      ` : ''}
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8;">
      Automated ticket alert from Paper Street Support Desk. Logged in database <code>client_feedback</code>.
    </div>

  </div>
</body>
</html>
`
}

/**
 * Dispatches Client Feedback / Support Ticket Alert to Admin.
 */
export async function dispatchFeedbackAlertEmail(data: FeedbackAlertData): Promise<boolean> {
  const config = await getSystemConfig()
  const adminEmail = config.adminEmail || 'otienoalvine925@gmail.com'

  const html = buildFeedbackAlertHtml(data)
  const res = await sendBrevoEmail({
    to: [{ email: adminEmail, name: 'Paper Street Support Desk' }],
    subject: `[${data.priority.toUpperCase()} SUPPORT] ${data.category.toUpperCase()}: ${data.subject}`,
    htmlContent: html,
  })
  return res.success
}

