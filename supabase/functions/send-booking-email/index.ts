import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const parts = dateStr.includes(',') ? dateStr.split(',') : dateStr.includes(';') ? dateStr.split(';') : [dateStr]
  return parts.map((d) => {
    const clean = d.trim().match(/^(\d{4}-\d{2}-\d{2})/)?.[1]
    if (!clean) return d.trim()
    const dt = new Date(`${clean}T00:00:00Z`)
    if (isNaN(dt.getTime())) return d.trim()
    return dt.toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  }).join('<br>')
}

function buildClientEmail(b: Record<string, any>): string {
  const firstName = (b.clientName || 'there').split(' ')[0]
  const packageLine = b.tierName ? `${b.serviceTitle} — ${b.tierName}` : b.serviceTitle
  const hasDeposit = Number(b.depositAmountKES) > 0
  const hasOvertime = Number(b.overtimeHours) > 0
  const formattedDates = formatDate(b.bookingDate)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed — Paper Street</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a2332;">
<div style="max-width:600px;margin:0 auto;padding:48px 32px;">

  <!-- Wordmark -->
  <div style="border-bottom:2px solid #0F2D52;padding-bottom:20px;margin-bottom:36px;">
    <div style="font-size:20px;font-weight:800;letter-spacing:4px;text-transform:uppercase;color:#0F2D52;">PAPER STREET</div>
    <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:3px;">Workspaces &amp; Commercial Centre &nbsp;·&nbsp; Kisumu CBD</div>
  </div>

  <!-- Status pill -->
  <div style="margin-bottom:28px;">
    <span style="display:inline-block;background:#d1fae5;color:#065f46;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;">✓ PAYMENT CONFIRMED</span>
  </div>

  <!-- Reference -->
  <div style="margin-bottom:32px;">
    <div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#64748b;margin-bottom:4px;">Booking Reference</div>
    <div style="font-family:monospace;font-size:24px;font-weight:700;color:#0F2D52;letter-spacing:2px;">${b.paystackReference}</div>
  </div>

  <!-- Greeting -->
  <p style="font-size:15px;line-height:1.6;margin:0 0 8px 0;">Dear <strong>${firstName}</strong>,</p>
  <p style="font-size:14px;line-height:1.7;color:#334155;margin:0 0 36px 0;">
    Your booking at Paper Street Workspaces is confirmed and payment has been received in full. 
    Your official receipt is attached to this email as a PDF.
  </p>

  <!-- Divider -->
  <div style="border-top:1px solid #e2e8f0;margin-bottom:28px;"></div>

  <!-- Reservation details -->
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:16px;">Reservation Details</div>

  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px;">
    <tr>
      <td style="padding:8px 0;color:#64748b;width:38%;vertical-align:top;">Package</td>
      <td style="padding:8px 0;color:#0F2D52;font-weight:600;">${packageLine}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#64748b;vertical-align:top;">Facility</td>
      <td style="padding:8px 0;color:#0F2D52;">${b.location}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#64748b;vertical-align:top;">Date(s)</td>
      <td style="padding:8px 0;color:#0F2D52;font-weight:600;line-height:1.8;">${formattedDates}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#64748b;vertical-align:top;">Access Window</td>
      <td style="padding:8px 0;color:#0F2D52;font-family:monospace;font-weight:600;">${b.startTime} &mdash; ${b.endTime}</td>
    </tr>
    ${b.passCode ? `<tr>
      <td style="padding:8px 0;color:#64748b;vertical-align:top;">Access Code</td>
      <td style="padding:8px 0;color:#0F2D52;font-family:monospace;font-weight:700;font-size:14px;">${b.passCode}</td>
    </tr>` : ''}
    ${b.clientPhone && b.clientPhone !== '—' ? `<tr>
      <td style="padding:8px 0;color:#64748b;">Contact</td>
      <td style="padding:8px 0;color:#0F2D52;">${b.clientPhone}</td>
    </tr>` : ''}
    ${b.companyName ? `<tr>
      <td style="padding:8px 0;color:#64748b;">Company</td>
      <td style="padding:8px 0;color:#0F2D52;">${b.companyName}</td>
    </tr>` : ''}
  </table>

  <!-- Divider -->
  <div style="border-top:1px solid #e2e8f0;margin-bottom:28px;"></div>

  <!-- Payment breakdown -->
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:16px;">Payment Breakdown</div>

  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:8px;">
    <tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:8px 0;color:#334155;">${packageLine}</td>
      <td style="padding:8px 0;color:#0F2D52;text-align:right;font-family:monospace;">KES ${Number(b.rentAmountKES || b.totalAmountKES).toLocaleString()}</td>
    </tr>
    ${hasDeposit ? `<tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:8px 0;color:#334155;">Refundable Security Deposit</td>
      <td style="padding:8px 0;color:#0F2D52;text-align:right;font-family:monospace;">KES ${Number(b.depositAmountKES).toLocaleString()}</td>
    </tr>` : ''}
    ${hasOvertime ? `<tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:8px 0;color:#92400e;">Extended Hours (${b.overtimeHours} hr${Number(b.overtimeHours) > 1 ? 's' : ''})</td>
      <td style="padding:8px 0;color:#92400e;text-align:right;font-family:monospace;">+ KES ${Number(b.overtimeFeeKES).toLocaleString()}</td>
    </tr>` : ''}
  </table>

  <div style="border-top:2px solid #0F2D52;padding-top:10px;display:flex;justify-content:space-between;margin-bottom:36px;">
    <span style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#0F2D52;">Total Paid</span>
    <span style="font-size:16px;font-weight:700;font-family:monospace;color:#0F2D52;">KES ${Number(b.totalAmountKES).toLocaleString()}</span>
  </div>

  <!-- Divider -->
  <div style="border-top:1px solid #e2e8f0;margin-bottom:28px;"></div>

  <!-- Check-in note -->
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:10px;">Check-In</div>
  <p style="font-size:13px;line-height:1.7;color:#334155;margin:0 0 36px 0;">
    Present your booking reference <strong style="color:#0F2D52;">${b.paystackReference}</strong> at the Paper Street reception desk upon arrival. 
    Our team will verify your reservation and allocate your workspace.
  </p>

  <!-- Cancellation policy -->
  <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-bottom:36px;">
    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:8px;">Cancellation Policy</div>
    <p style="font-size:12px;line-height:1.7;color:#64748b;margin:0;">
      Rescheduling is free with 24 hours notice. Cancellations require 48 hours advance notice for a 90% refund (10% processing fee). 
      Unutilised or missed bookings are non-refundable. 
      <a href="https://paperstreet.co.ke/daily-booking-terms" style="color:#0F2D52;">Full terms →</a>
    </p>
  </div>

  <!-- Footer -->
  <div style="border-top:1px solid #e2e8f0;padding-top:20px;font-size:11px;color:#94a3b8;line-height:1.8;">
    <div style="font-weight:600;color:#64748b;margin-bottom:2px;">Paper Street Workspaces</div>
    <div>CBD Commercial Centre, Oginga Odinga Street, Kisumu CBD, Kenya</div>
    <div>hello@paperstreet.co.ke &nbsp;|&nbsp; 0110486677 / +254 110 486 677 &nbsp;|&nbsp; paperstreet.co.ke</div>
  </div>

</div>
</body>
</html>`
}

function sanitizePdf(val: any): string {
  if (val === null || val === undefined) return ''
  return String(val)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, ' ')
    .trim()
}

function generateReceiptPdf(b: Record<string, any>): string {
  const ref = sanitizePdf(b.paystackReference || 'PS-REF')
  const clientName = sanitizePdf(b.clientName || 'Client')
  const clientEmail = sanitizePdf(b.clientEmail || '')
  const clientPhone = sanitizePdf(b.clientPhone || '—')
  const companyName = sanitizePdf(b.companyName || '')
  const serviceTitle = sanitizePdf(b.serviceTitle || 'Workspace Reservation')
  const tierName = sanitizePdf(b.tierName || '')
  const location = sanitizePdf(b.location || 'Paper Street CBD Commercial Centre, Kisumu')
  const startTime = sanitizePdf(b.startTime || '08:00 AM')
  const endTime = sanitizePdf(b.endTime || '06:00 PM')
  const passCode = sanitizePdf(b.passCode || ref)
  const issueDate = sanitizePdf(new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }))

  const rentKES = Number(b.rentAmountKES || b.totalAmountKES || 0)
  const depositKES = Number(b.depositAmountKES || 0)
  const overtimeHours = Number(b.overtimeHours || 0)
  const overtimeFeeKES = Number(b.overtimeFeeKES || 0)
  const totalKES = Number(b.totalAmountKES || 0)

  const dateStr = String(b.bookingDate || '')
  const dateParts = dateStr.includes(',') ? dateStr.split(',') : dateStr.includes(';') ? dateStr.split(';') : [dateStr]
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
BT /F2 8 Tf 105 ${dateRowY} Td (${sanitizePdf(d)}) Tj ET
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

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405,
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
      tierName = '',
      location = 'Kisumu CBD (CBD Commercial Center)',
      bookingDate = new Date().toISOString().split('T')[0],
      startTime = '08:00 AM',
      endTime = '06:00 PM',
      totalAmountKES = 0,
      rentAmountKES = 0,
      depositAmountKES = 0,
      overtimeHours = 0,
      overtimeFeeKES = 0,
      paystackReference = '',
      passCode = '',
      specialRequests = '',
    } = body

    if (!clientEmail) {
      return new Response(JSON.stringify({ error: 'Missing clientEmail' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }

    // Deduplication
    if (paystackReference) {
      const { data: existing } = await supabase
        .from('client_bookings')
        .select('email_sent')
        .eq('paystack_reference', paystackReference)
        .limit(1)
      if (existing?.[0]?.email_sent === true) {
        console.log(`[send-booking-email] Already sent for ${paystackReference}`)
        return new Response(JSON.stringify({ success: true, alreadySent: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
        })
      }
    }

    // Fetch Brevo credentials
    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.co.ke'

    if (!apiKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key') apiKey = s.value
          if (s.key === 'brevo_sender_name') senderName = s.value
          if (s.key === 'brevo_sender_email') senderEmail = s.value
        }
      }
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'BREVO_API_KEY not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
      })
    }

    const bookingData = {
      clientName, clientEmail, clientPhone, companyName, serviceTitle, tierName,
      location, bookingDate, startTime, endTime, totalAmountKES,
      rentAmountKES: rentAmountKES || totalAmountKES,
      depositAmountKES, overtimeHours, overtimeFeeKES,
      paystackReference, passCode, specialRequests,
    }

    const htmlContent = buildClientEmail(bookingData)
    const pdfContent = generateReceiptPdf(bookingData)
    const pdfBase64 = btoa(pdfContent)
    const attachmentFilename = `PaperStreet_Receipt_${paystackReference || 'PS-BOOKING'}.pdf`

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: clientEmail, name: clientName }],
        subject: `Booking Confirmed — ${serviceTitle}${tierName ? ` (${tierName})` : ''} · Ref: ${paystackReference}`,
        htmlContent,
        attachment: [
          {
            name: attachmentFilename,
            content: pdfBase64,
          },
        ],
      }),
    })

    const resData = await res.json().catch(() => ({}))

    if (!res.ok) {
      console.error('[send-booking-email] Brevo error', resData)
      return new Response(JSON.stringify({ error: resData.message || 'Brevo error', details: resData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }

    // Mark email sent
    if (paystackReference) {
      try {
        await supabase
          .from('client_bookings')
          .update({ email_sent: true, email_sent_at: new Date().toISOString() })
          .eq('paystack_reference', paystackReference)
      } catch (_) { }
    }

    return new Response(JSON.stringify({ success: true, messageId: resData.messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    })
  } catch (err: any) {
    console.error('[send-booking-email] Exception', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
    })
  }
})
