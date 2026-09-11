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
  const sanitize = (v: string | number | undefined) =>
    String(v || '')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/[^\x20-\x7E]/g, ' ')
      .trim()

  const ref = sanitize(data.paystackReference || 'PS-REF')
  const clientName = sanitize(data.clientName || 'Client')
  const clientEmail = sanitize(data.clientEmail || '')
  const clientPhone = sanitize(data.clientPhone || '—')
  const companyName = sanitize(data.companyName || '')
  const serviceTitle = sanitize(data.serviceTitle || 'Workspace Reservation')
  const tierName = sanitize(data.tierName || '')
  const location = sanitize(data.location || 'Paper Street CBD Commercial Centre, Kisumu')
  const startTime = sanitize(data.startTime || '08:00 AM')
  const endTime = sanitize(data.endTime || '06:00 PM')
  const passCode = sanitize(data.passCode || ref)
  const issueDate = sanitize(new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }))

  const rentKES = Number(data.rentAmountKES || data.totalAmountKES || 0)
  const depositKES = Number(data.depositAmountKES || 0)
  const overtimeHours = Number(data.overtimeHours || 0)
  const overtimeFeeKES = Number(data.overtimeFeeKES || 0)
  const totalKES = Number(data.totalAmountKES || 0)

  const rawBookingDate = String(data.bookingDate || '')
  const dateParts = rawBookingDate.includes(',') ? rawBookingDate.split(',') : rawBookingDate.includes(';') ? rawBookingDate.split(';') : [rawBookingDate]
  const cleanDates = dateParts.map((d: string) => d.trim()).filter(Boolean)

  let stream = `
% BRAND HEADER
0.06 0.18 0.32 rg
45 765 40 40 re f

0.92 1.00 0.28 RG
1 w
45 765 40 40 re S

0.92 1.00 0.28 rg
BT /F1 20 Tf 52 777 Td (PS) Tj ET

0.06 0.18 0.32 rg
BT /F1 17 Tf 95 794 Td (PAPER STREET) Tj ET

0.28 0.35 0.45 rg
BT /F1 7.5 Tf 95 782 Td (WORKSPACES & COMMERCIAL CENTRE - KISUMU CBD) Tj ET

0.45 0.52 0.62 rg
BT /F2 7.5 Tf 95 771 Td (CBD Commercial Centre, Oginga Odinga St - Kisumu CBD, Kenya) Tj ET

0.88 0.98 0.92 rg
385 776 165 25 re f

0.02 0.47 0.34 RG
0.75 w
385 776 165 25 re S

0.02 0.47 0.34 rg
BT /F1 8 Tf 395 785 Td (PAYMENT VERIFIED & CONFIRMED) Tj ET

0.06 0.18 0.32 RG
2 w
45 752 m 550 752 l S

0.06 0.18 0.32 rg
BT /F1 12 Tf 45 733 Td (OFFICIAL BOOKING RECEIPT & TAX INVOICE) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 390 735 Td (Receipt Date:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8 Tf 455 735 Td (${issueDate}) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 390 722 Td (Booking Ref:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 455 722 Td (${ref}) Tj ET

0.82 0.86 0.92 RG
0.5 w
45 712 m 550 712 l S

0.06 0.18 0.32 rg
BT /F1 8 Tf 45 698 Td (BILLED TO) Tj ET
BT /F1 8 Tf 300 698 Td (RESERVATION SUMMARY) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 45 683 Td (Client Name:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 105 683 Td (${clientName}) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 45 669 Td (Email:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8 Tf 105 669 Td (${clientEmail}) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 45 655 Td (Phone:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8 Tf 105 655 Td (${clientPhone}) Tj ET
`

  let curY = 641
  if (companyName) {
    stream += `
0.45 0.52 0.62 rg
BT /F2 8 Tf 45 ${curY} Td (Company:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8 Tf 105 ${curY} Td (${companyName}) Tj ET
`
    curY -= 14
  }

  const fullPkg = tierName ? `${serviceTitle} - ${tierName}` : serviceTitle
  stream += `
0.45 0.52 0.62 rg
BT /F2 8 Tf 300 683 Td (Package:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 365 683 Td (${fullPkg}) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 300 669 Td (Facility:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8 Tf 365 669 Td (${location}) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 300 655 Td (Access Hours:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8 Tf 365 655 Td (${startTime} to ${endTime}) Tj ET

0.45 0.52 0.62 rg
BT /F2 8 Tf 300 641 Td (Access Code:) Tj ET
0.06 0.18 0.32 rg
BT /F1 9 Tf 365 641 Td (${passCode}) Tj ET
`

  const schedY = Math.min(curY, 627) - 10
  stream += `
0.82 0.86 0.92 RG
0.5 w
45 ${schedY} m 550 ${schedY} l S

0.06 0.18 0.32 rg
BT /F1 8 Tf 45 ${schedY - 14} Td (SCHEDULED ACCESS DATES & PASSES (${cleanDates.length} PASS${cleanDates.length > 1 ? 'ES' : ''})) Tj ET
`

  let dateRowY = schedY - 28
  for (let i = 0; i < Math.min(cleanDates.length, 6); i++) {
    const d = cleanDates[i]
    stream += `
0.45 0.52 0.62 rg
BT /F1 7.5 Tf 55 ${dateRowY} Td (Day ${i + 1}:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8 Tf 105 ${dateRowY} Td (${sanitize(d)}) Tj ET
0.45 0.52 0.62 rg
BT /F2 7.5 Tf 300 ${dateRowY} Td (Window: ${startTime} - ${endTime}) Tj ET
`
    dateRowY -= 13
  }

  const ledgerY = dateRowY - 10
  stream += `
0.82 0.86 0.92 RG
0.5 w
45 ${ledgerY} m 550 ${ledgerY} l S

0.06 0.18 0.32 rg
BT /F1 8 Tf 45 ${ledgerY - 14} Td (PAYMENT BREAKDOWN) Tj ET

0.06 0.18 0.32 rg
BT /F1 7.5 Tf 45 ${ledgerY - 28} Td (ITEM DESCRIPTION) Tj ET
BT /F1 7.5 Tf 450 ${ledgerY - 28} Td (AMOUNT (KES)) Tj ET

0.06 0.18 0.32 RG
0.75 w
45 ${ledgerY - 33} m 550 ${ledgerY - 33} l S

0.15 0.20 0.28 rg
BT /F2 8 Tf 45 ${ledgerY - 47} Td (${fullPkg}) Tj ET
BT /F1 8 Tf 450 ${ledgerY - 47} Td (KES ${rentKES.toLocaleString()}) Tj ET
`

  let itemY = ledgerY - 47
  if (depositKES > 0) {
    itemY -= 15
    stream += `
0.45 0.52 0.62 rg
BT /F2 8 Tf 45 ${itemY} Td (Refundable Security Deposit) Tj ET
0.15 0.20 0.28 rg
BT /F1 8 Tf 450 ${itemY} Td (KES ${depositKES.toLocaleString()}) Tj ET
`
  }

  if (overtimeFeeKES > 0) {
    itemY -= 15
    stream += `
0.55 0.27 0.07 rg
BT /F2 8 Tf 45 ${itemY} Td (Extended Hours Access (${overtimeHours} hr${overtimeHours > 1 ? 's' : ''})) Tj ET
BT /F1 8 Tf 450 ${itemY} Td (+ KES ${overtimeFeeKES.toLocaleString()}) Tj ET
`
  }

  const totalRuleY = itemY - 10
  const totalRowY = totalRuleY - 16
  stream += `
0.06 0.18 0.32 RG
1.5 w
45 ${totalRuleY} m 550 ${totalRuleY} l S

0.06 0.18 0.32 rg
BT /F1 10 Tf 45 ${totalRowY} Td (TOTAL AMOUNT PAID) Tj ET
BT /F1 11 Tf 435 ${totalRowY} Td (KES ${totalKES.toLocaleString()}) Tj ET

0.06 0.18 0.32 RG
1.5 w
45 ${totalRowY - 8} m 550 ${totalRowY - 8} l S

0.96 0.97 0.98 rg
45 ${totalRowY - 56} 505 38 re f

0.82 0.86 0.92 RG
0.5 w
45 ${totalRowY - 56} 505 38 re S

0.06 0.18 0.32 rg
BT /F1 7.5 Tf 55 ${totalRowY - 32} Td (CHECK-IN INSTRUCTIONS) Tj ET

0.28 0.35 0.45 rg
BT /F2 7.5 Tf 55 ${totalRowY - 44} Td (Present your booking reference ${ref} at reception desk upon arrival.) Tj ET
BT /F2 7.5 Tf 55 ${totalRowY - 52} Td (Our concierge will verify your reservation, issue facility access badge, and guide you to your desk.) Tj ET

0.82 0.86 0.92 RG
0.5 w
45 60 m 550 60 l S

0.45 0.52 0.62 rg
BT /F1 7 Tf 145 47 Td (This is an official computer-generated receipt issued by Paper Street Workspaces Limited.) Tj ET
BT /F2 7 Tf 120 37 Td (CBD Commercial Centre, Oginga Odinga St, Kisumu CBD, Kenya  |  hello@paperstreet.co.ke  |  0110486677) Tj ET
`

  const streamContent = stream.trim()
  const streamLength = streamContent.length

  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n'
  const obj4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n'
  const obj6 = '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'

  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n'
  const offset1 = header.length
  const offset2 = offset1 + obj1.length
  const offset3 = offset2 + obj2.length
  const offset4 = offset3 + obj3.length
  const offset5 = offset4 + obj4.length
  const offset6 = offset5 + obj5.length
  const xrefOffset = offset6 + obj6.length

  const xref = [
    'xref',
    '0 7',
    '0000000000 65535 f ',
    `${String(offset1).padStart(10, '0')} 00000 n `,
    `${String(offset2).padStart(10, '0')} 00000 n `,
    `${String(offset3).padStart(10, '0')} 00000 n `,
    `${String(offset4).padStart(10, '0')} 00000 n `,
    `${String(offset5).padStart(10, '0')} 00000 n `,
    `${String(offset6).padStart(10, '0')} 00000 n `,
    'trailer',
    '<< /Size 7 /Root 1 0 R >>',
    'startxref',
    `${xrefOffset}`,
    '%%EOF\n',
  ].join('\n')

  return header + obj1 + obj2 + obj3 + obj4 + obj5 + obj6 + xref
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
        Please review our <a href="https://paperstreet.co.ke/daily-booking-terms" style="color: #0F2D52; font-weight: 600; text-decoration: underline;">Daily Booking Terms &amp; Cancellation Policy</a>. Rescheduling is 100% free with 24 hours notice. Cancellations require at least 2 days (48 hours) advance notice for a 90% refund (10% processing fee applies). Unutilized or missed bookings are non-refundable.
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.6;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748B;">Paper Street Workspaces</p>
      <p style="margin: 0 0 4px 0;">CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya</p>
      <p style="margin: 0;">Tel: 0110486677 / +254 110 486 677 &nbsp;|&nbsp; Email: hello@paperstreet.co.ke &nbsp;|&nbsp; www.paperstreet.co.ke</p>
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

  // 1. If Brevo API key is configured, send via Brevo
  if (config.brevoApiKey && !config.brevoApiKey.includes('placeholder')) {
    try {
      const payload = {
        sender: {
          name: config.brevoSenderName || 'Paper Street Workspaces',
          email: config.brevoSenderEmail || 'hello@paperstreet.co.ke',
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

  // 2. Fallback to Resend if configured
  const resendApiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY
  if (resendApiKey) {
    try {
      const resendSender = process.env.RESEND_FROM_EMAIL || 'Paper Street <onboarding@resend.dev>'
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: resendSender,
          to: params.to.map((t) => t.email),
          subject: params.subject,
          html: params.htmlContent,
          attachments: params.attachment?.map((a) => ({
            filename: a.name,
            content: a.content,
          })),
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        console.error('[Resend API Error]', json)
        return { success: false, error: json }
      }
      return { success: true, data: json }
    } catch (err: any) {
      console.error('[Resend Exception]', err)
      return { success: false, error: err?.message || String(err) }
    }
  }

  console.warn(
    '[Email Service Warning] No active email API key (BREVO_API_KEY or RESEND_API_KEY) found. Simulating email dispatch to:',
    params.to.map((t) => t.email).join(', ')
  )
  return { success: true, data: { simulated: true } }
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

  // 1.b Invoke Supabase Edge Functions (send-booking-email & send-admin-alert)
  // If serviceTitle already contains tier in parentheses e.g. "Hot Desk (Full-Day Pass)",
  // extract the tier from it when tierName is empty.
  const resolvedTierName = data.tierName ||
    (data.serviceTitle.includes('(') ? data.serviceTitle.match(/\(([^)]+)\)/)?.[1] || '' : '')
  const resolvedServiceTitle = data.serviceTitle.includes('(')
    ? data.serviceTitle.replace(/\s*\([^)]*\)\s*$/, '').trim()
    : data.serviceTitle

  const sharedPayload = {
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    clientPhone: data.clientPhone,
    companyName: data.companyName || '',
    serviceTitle: resolvedServiceTitle,
    tierName: resolvedTierName,
    location: data.location,
    bookingDate: data.bookingDate,
    startTime: data.startTime,
    endTime: data.endTime,
    totalAmountKES: data.totalAmountKES,
    rentAmountKES: data.rentAmountKES || data.totalAmountKES,
    depositAmountKES: data.depositAmountKES || 0,
    overtimeHours: data.overtimeHours || 0,
    overtimeFeeKES: data.overtimeFeeKES || 0,
    paystackReference: data.paystackReference,
    passCode: data.passCode || '',
    specialRequests: data.specialRequests || '',
  }

  try {
    if (shouldSendClient) {
      const { data: edgeRes, error: edgeErr } = await supabase.functions.invoke('send-booking-email', {
        body: sharedPayload,
      })
      if (!edgeErr && edgeRes?.success) {
        shouldSendClient = false
        clientSuccess = true
      }
    }

    if (shouldSendAdmin) {
      const { data: adminEdgeRes, error: adminEdgeErr } = await supabase.functions.invoke('send-admin-alert', {
        body: sharedPayload,
      })
      if (!adminEdgeErr && adminEdgeRes?.success) {
        shouldSendAdmin = false
        adminSuccess = true
      }
    }
  } catch (edgeEx) {
    console.warn('[Supabase Edge Function Email Warning]', edgeEx)
  }

  // 2. Send email to client (with clean binary PDF receipt)
  if (shouldSendClient) {
    const pdfContent = generatePdfReceiptBinary(data)
    const pdfBase64 = typeof Buffer !== 'undefined'
      ? Buffer.from(pdfContent, 'binary').toString('base64')
      : btoa(pdfContent)
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
      } catch (_) { }
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
      } catch (_) { }
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
      <strong style="color: #0F2D52;">Need immediate assistance?</strong> Contact our front desk directly on phone or WhatsApp at <strong style="color: #0F2D52;">0110486677 (+254 110 486 677)</strong> (Mon&ndash;Sat, 8:00 AM &ndash; 6:00 PM).
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.co.ke &middot; www.paperstreet.co.ke</div>
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
      <div>Expansion Hubs: Nairobi &middot; Mombasa &middot; Nakuru &middot; Eldoret &middot; Kisumu CBD &middot; hello@paperstreet.co.ke</div>
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
        For account assistance, contact our front desk at <strong style="color: #0F2D52;">hello@paperstreet.co.ke</strong>.
      </p>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.co.ke &middot; www.paperstreet.co.ke</div>
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
      <a href="https://paperstreet.co.ke/portal/client/dashboard" style="display: inline-block; background: #0F2D52; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 24px;">
        Access Client Portal &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.co.ke &middot; www.paperstreet.co.ke</div>
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

/**
 * Builds clean typography-based client reminder email (1 day before booking).
 */
export function buildBookingReminderEmailHtml(data: BookingEmailData): string {
  const formattedDates = formatDisplayDateOrDates(data.bookingDate)
  const ref = data.paystackReference || 'PS-BOOKING'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Paper Street Workspace is Ready Tomorrow</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #fbfaf7; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px 32px;">

    <!-- Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
          PAPER STREET
        </div>
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
          Workspaces &amp; Commercial Center · Kisumu CBD
        </div>
      </div>
      <div style="text-align: right;">
        <span style="display: inline-block; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 8px;">
          SESSION TOMORROW
        </span>
      </div>
    </div>

    <!-- Greeting -->
    <div style="margin-bottom: 24px;">
      <h1 style="font-size: 22px; color: #0F2D52; margin: 0 0 10px 0; font-weight: 600;">
        See you tomorrow, ${data.clientName}.
      </h1>
      <p style="font-size: 13.5px; color: #475569; line-height: 1.6; margin: 0;">
        This is a friendly reminder that your upcoming workspace reservation at Paper Street is scheduled for tomorrow. Your desk and building amenities will be ready when you arrive.
      </p>
    </div>

    <!-- Booking Reference Card -->
    <div style="background: #0F2D52; color: #ffffff; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; font-weight: 600;">
        Booking Check-In Reference
      </div>
      <div style="font-family: monospace; font-size: 22px; font-weight: 700; letter-spacing: 2px; margin-top: 3px;">
        ${ref}
      </div>
      <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
        Provide this reference to the concierge on Floor 2 upon arrival.
      </div>
    </div>

    <!-- Itinerary Table -->
    <div style="margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B; width: 35%;">Workspace Service:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${data.serviceTitle}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Date:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${formattedDates}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Access Hours:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600; font-family: monospace;">${data.startTime} &mdash; ${data.endTime}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Location:</td>
          <td style="padding: 10px 0; color: #0F2D52;">${data.location || 'CBD Commercial Center, Oginga Odinga St, Kisumu CBD'}</td>
        </tr>
      </table>
    </div>

    <!-- Wi-Fi & Arrival Details -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px 20px; margin-bottom: 24px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52; font-weight: 700; margin-bottom: 8px;">
        Fast Wi-Fi &amp; Amenities Ready For You
      </div>
      <div style="font-size: 12px; color: #334155; line-height: 1.6;">
        &bull; <strong>Wi-Fi Network:</strong> ${data.wifiNetwork || 'PaperStreet-CBD-5G'}<br />
        &bull; <strong>Wi-Fi Password:</strong> <code style="background: #e2e8f0; padding: 1px 4px; font-family: monospace;">${data.wifiPass || 'PaperStreet2026!'}</code><br />
        &bull; <strong>Power Backup:</strong> 100% automatic generator backup in case of grid outages.<br />
        &bull; <strong>Refreshments:</strong> Complimentary artisan tea, filtered water, and fresh barista coffee.
      </div>
    </div>

    <!-- Concierge Note -->
    <div style="border-left: 3px solid #0F2D52; padding: 10px 14px; margin-bottom: 28px; font-size: 12px; color: #475569;">
      Need to reschedule or running late? Contact our reception concierge at <strong>0110486677 (+254 110 486 677)</strong> or email <a href="mailto:hello@paperstreet.co.ke" style="color: #0F2D52; font-weight: 600;">hello@paperstreet.co.ke</a>. Rescheduling is 100% free with at least 24 hours advance notice.
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.6;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748B;">Paper Street Workspaces</p>
      <p style="margin: 0 0 4px 0;">CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya</p>
      <p style="margin: 0;">www.paperstreet.co.ke · hello@paperstreet.co.ke</p>
    </div>

  </div>
</body>
</html>
`
}

/**
 * Dispatches 24-Hour Advance Booking Reminder Email to the client.
 * Marks `reminder_sent` = true in `client_bookings` to avoid duplicates.
 */
export async function sendBookingReminderEmail(booking: {
  id: string | number
  client_name: string
  client_email: string
  client_phone?: string
  company_name?: string
  service_title: string
  location?: string
  booking_date: string
  start_time?: string
  end_time?: string
  total_amount_kes?: number
  paystack_reference?: string
  pass_code?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const emailData: BookingEmailData = {
      clientName: booking.client_name,
      clientEmail: booking.client_email,
      clientPhone: booking.client_phone || '—',
      companyName: booking.company_name,
      serviceTitle: booking.service_title,
      tierName: 'Reserved Session',
      location: booking.location || 'CBD Commercial Center, Oginga Odinga St, Kisumu CBD',
      bookingDate: booking.booking_date,
      startTime: booking.start_time || '08:00 AM',
      endTime: booking.end_time || '06:00 PM',
      totalAmountKES: booking.total_amount_kes || 0,
      rentAmountKES: booking.total_amount_kes || 0,
      depositAmountKES: 0,
      paystackReference: booking.paystack_reference || `PS-BK-${booking.id}`,
      passCode: booking.pass_code,
      wifiNetwork: 'PaperStreet-CBD-5G',
      wifiPass: 'PaperStreet2026!',
    }

    // 1. Try Supabase Edge Function invoke first
    try {
      const { data: edgeRes, error: edgeErr } = await supabase.functions.invoke('send-booking-reminder', {
        body: emailData,
      })
      if (!edgeErr && edgeRes?.success) {
        if (booking.id) {
          await supabase
            .from('client_bookings')
            .update({ reminder_sent: true, reminder_sent_at: new Date().toISOString() })
            .eq('id', booking.id)
        }
        return { success: true }
      }
    } catch (_) { }

    // 2. Fallback to direct Brevo / Resend delivery
    const html = buildBookingReminderEmailHtml(emailData)
    const res = await sendBrevoEmail({
      to: [{ email: emailData.clientEmail, name: emailData.clientName }],
      subject: `Reminder: Your Paper Street Workspace is Ready Tomorrow (${emailData.serviceTitle})`,
      htmlContent: html,
    })

    if (res.success && booking.id) {
      await supabase
        .from('client_bookings')
        .update({ reminder_sent: true, reminder_sent_at: new Date().toISOString() })
        .eq('id', booking.id)
    }

    return res
  } catch (err: any) {
    console.error('[sendBookingReminderEmail Exception]', err)
    return { success: false, error: err?.message || String(err) }
  }
}


