import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-version',
}

interface QuoteData {
  quoteReference: string
  serviceSlug: string
  serviceTitle: string
  tierName: string
  commitmentPeriod: string
  monthlyRateKES: number
  totalCommitmentKES: number
  depositAmountKES: number
  startDate: string
  companyName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  additionalRequirements?: string
  inclusions?: string[]
}

/**
 * Creates clean, typography-based PDF quotation byte stream.
 */
function createQuotePdf(data: QuoteData): string {
  const s = (str: string | number) =>
    String(str || '')
      .replace(/[\\()]/g, '')
      .replace(/[^\x20-\x7E]/g, '')
      .substring(0, 80)

  const ref = s(data.quoteReference)
  const issueDate = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
  const monthlyStr = `KES ${data.monthlyRateKES.toLocaleString()}`
  const totalStr = `KES ${data.totalCommitmentKES.toLocaleString()}`

  let stream = `
% ── HEADER ──────────────────────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 18 Tf 50 800 Td (PAPER STREET WORKSPACES) Tj ET
0.40 0.47 0.56 rg
BT /F2 8 Tf 50 786 Td (CBD Commercial Center  ·  Oginga Odinga St  ·  Kisumu CBD, Kenya) Tj ET
0.40 0.47 0.56 rg
BT /F2 8 Tf 50 775 Td (Tel: 0110486677 / +254 110 486 677   |   hello@paperstreet.co.ke   |   www.paperstreet.co.ke) Tj ET

% thick top rule
0.06 0.18 0.32 RG
2.0 w
50 768 m 545 768 l S

% ── DOCUMENT TITLE & REFERENCE ──────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 13 Tf 50 748 Td (OFFICIAL MEMBERSHIP QUOTATION) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 733 Td (Quote Reference:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 135 733 Td (${ref}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 721 Td (Issue Date:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 135 721 Td (${s(issueDate)}) Tj ET
0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 709 Td (Quotation Validity:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 135 709 Td (Valid for 30 Days (${s(validUntil)})) Tj ET

% thin rule
0.78 0.82 0.87 RG
0.5 w
50 700 m 545 700 l S

% ── PROPOSAL PREPARED FOR ──────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 686 Td (PROPOSAL PREPARED FOR) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 671 Td (Company / Entity:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 145 671 Td (${s(data.companyName || 'Corporate Client')}) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 657 Td (Contact Person:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 145 657 Td (${s(data.clientName)}) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 643 Td (Email:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 145 643 Td (${s(data.clientEmail)}) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 629 Td (Phone / WhatsApp:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 145 629 Td (${s(data.clientPhone)}) Tj ET

% thin rule
0.78 0.82 0.87 RG
0.5 w
50 620 m 545 620 l S

% ── PACKAGE SPECIFICATIONS ───────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 606 Td (MEMBERSHIP & FACILITY SPECIFICATIONS) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 591 Td (Workspace Package:) Tj ET
0.06 0.18 0.32 rg
BT /F1 8.5 Tf 145 591 Td (${s(data.serviceTitle)} - ${s(data.tierName)}) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 577 Td (Billing Commitment:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 145 577 Td (${s(data.commitmentPeriod)}) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 563 Td (Target Start Date:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 145 563 Td (${s(data.startDate)}) Tj ET

0.40 0.47 0.56 rg
BT /F2 8.5 Tf 50 549 Td (Facility Location:) Tj ET
0.06 0.18 0.32 rg
BT /F2 8.5 Tf 145 549 Td (CBD Commercial Center, Oginga Odinga St, Kisumu) Tj ET

% ── FINANCIAL INVESTMENT LEDGER ───────────────────────────────────────
0.06 0.18 0.32 RG
1.0 w
50 535 m 545 535 l S

0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 523 Td (ITEMIZED INVESTMENT PROPOSAL) Tj ET
BT /F1 7.5 Tf 420 523 Td (AMOUNT (KES)) Tj ET

0.78 0.82 0.87 RG
0.5 w
50 514 m 545 514 l S

% Row 1: Membership Base Rate
0.20 0.25 0.33 rg
BT /F1 8.5 Tf 50 498 Td (${s(data.serviceTitle)} (${s(data.tierName)})) Tj ET
0.40 0.47 0.56 rg
BT /F2 7.5 Tf 50 486 Td (Standard Monthly Effective Rate: ${s(monthlyStr)}) Tj ET
0.20 0.25 0.33 rg
BT /F1 8.5 Tf 420 498 Td (${s(totalStr)}) Tj ET

0.78 0.82 0.87 RG
0.5 w
50 476 m 545 476 l S
`

  let rowY = 460
  if (data.depositAmountKES > 0) {
    stream += `
% Row 2: Security Deposit
0.20 0.25 0.33 rg
BT /F1 8.5 Tf 50 ${rowY} Td (Refundable Security Deposit) Tj ET
0.40 0.47 0.56 rg
BT /F2 7.5 Tf 50 ${rowY - 12} Td (Fully refundable upon termination of agreement) Tj ET
0.20 0.25 0.33 rg
BT /F1 8.5 Tf 420 ${rowY} Td (KES ${data.depositAmountKES.toLocaleString()}) Tj ET

0.78 0.82 0.87 RG
0.5 w
50 ${rowY - 22} m 545 ${rowY - 22} l S
`
    rowY -= 36
  }

  const grandTotal = data.totalCommitmentKES + (data.depositAmountKES || 0)
  const totalY = rowY - 10

  stream += `
% double rule above total
0.06 0.18 0.32 RG
1.5 w
50 ${totalY} m 545 ${totalY} l S
0.5 w
50 ${totalY + 3} m 545 ${totalY + 3} l S

% total row
0.06 0.18 0.32 rg
BT /F1 9.5 Tf 50 ${totalY - 16} Td (ESTIMATED INITIAL INVESTMENT) Tj ET
BT /F1 10.5 Tf 420 ${totalY - 16} Td (KES ${grandTotal.toLocaleString()}) Tj ET

% rule below total
0.06 0.18 0.32 RG
1.5 w
50 ${totalY - 26} m 545 ${totalY - 26} l S

% ── NEXT STEPS & ONBOARDING ──────────────────────────────────────────
0.06 0.18 0.32 rg
BT /F1 7.5 Tf 50 ${totalY - 50} Td (ONBOARDING & ACTIVATION NEXT STEPS) Tj ET
0.20 0.25 0.33 rg
BT /F2 8 Tf 50 ${totalY - 65} Td (1. A Paper Street Client Relationship Executive will contact you to confirm setup specifics.) Tj ET
BT /F2 8 Tf 50 ${totalY - 78} Td (2. Submit company registration documents (CR12 / Certificate of Incorporation) for KYC verification.) Tj ET
BT /F2 8 Tf 50 ${totalY - 91} Td (3. Official Service Agreement execution and instant issuance of Proof of Address / Access Pass.) Tj ET

% ── FOOTER ───────────────────────────────────────────────────────────
0.78 0.82 0.87 RG
0.5 w
50 80 m 545 80 l S

0.40 0.47 0.56 rg
BT /F2 7.5 Tf 135 66 Td (Paper Street Workspaces  ·  CBD Commercial Center, Kisumu CBD, Kenya) Tj ET
BT /F2 7.5 Tf 120 54 Td (For enquiries contact hello@paperstreet.co.ke or call 0110486677) Tj ET
`

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
    const payload: QuoteData = await req.json()
    const {
      quoteReference,
      serviceSlug,
      serviceTitle,
      tierName,
      commitmentPeriod,
      monthlyRateKES,
      totalCommitmentKES,
      depositAmountKES,
      startDate,
      companyName,
      clientName,
      clientEmail,
      clientPhone,
      additionalRequirements,
    } = payload

    if (!quoteReference || !clientEmail || !clientName) {
      return new Response(
        JSON.stringify({ error: 'Missing required quote fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Brevo Credentials from Supabase Secrets
    const apiKey = Deno.env.get('BREVO_API_KEY') || ''
    const senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    const senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || ''
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'otienoalvine925@gmail.com'

    if (!apiKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key' || s.key === 'brevo_key') apiKey = s.value
          if (s.key === 'brevo_sender_name') senderName = s.value
          if (s.key === 'brevo_sender_email') senderEmail = s.value
          if (s.key === 'admin_email') adminEmail = s.value
        }
      }
    }

    // Insert or update in quote_requests table
    try {
      await supabase.from('quote_requests').insert([
        {
          quote_reference: quoteReference,
          service_slug: serviceSlug,
          service_title: serviceTitle,
          tier_name: tierName,
          commitment_period: commitmentPeriod,
          duration_months: 1,
          start_date: startDate,
          end_date: startDate,
          monthly_rate_kes: monthlyRateKES,
          total_commitment_kes: totalCommitmentKES,
          deposit_amount_kes: depositAmountKES,
          team_size: 1,
          company_name: companyName || null,
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          additional_requirements: additionalRequirements || null,
          status: 'quote_sent',
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        },
      ])
    } catch (dbErr) {
      console.warn('[quote_requests DB Insert Warning]', dbErr)
    }

    // Generate clean flat PDF quotation
    const pdfBase64 = createQuotePdf(payload)
    const grandTotal = totalCommitmentKES + (depositAmountKES || 0)
    const orgName = companyName ? companyName : 'your organization'

    // Personalized Sales Pitch based on package
    let valueProposition = ''
    if (serviceSlug === 'virtual-office') {
      valueProposition = `
        At Paper Street, we empower market-leading businesses like <strong>${orgName}</strong> with an esteemed, fully compliant corporate presence in the heart of Kisumu CBD on Oginga Odinga Street. Your membership delivers verified registered office credibility under Section 47 of the Companies Act 2015, daily mail digitization scanned directly to your email, and executive boardroom access with 100% generator power uptime to host your high-value clients and investors.
      `
    } else if (serviceSlug === 'business-address') {
      valueProposition = `
        Establish verified legal credibility and immediate compliance for <strong>${orgName}</strong>. Our commercial address on Oginga Odinga Street is legally vetted for eCitizen BRS company incorporation, KRA PIN tax compliance, and commercial banking KYC, giving your enterprise a genuine commercial footprint in Western Kenya without unnecessary physical overhead.
      `
    } else {
      valueProposition = `
        Elevate the daily productivity of <strong>${orgName}</strong> with a permanent, reserved personal workstation. Enjoy lockable storage, commercial CBD business address, 100% automatic standby power generator backup, dual-carrier high-speed fibre internet, and monthly executive boardroom credits to drive your business forward.
      `
    }

    // Build Personalized Client Email HTML
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Official Membership Quotation - Paper Street</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #FBFAF7; line-height: 1.6;">
  <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px 32px;">

    <!-- Brand Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 20px; margin-bottom: 28px;">
      <div style="font-size: 24px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52;">PAPER STREET</div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">Commercial Center &middot; Oginga Odinga St &middot; Kisumu CBD, Kenya</div>
      <div style="margin-top: 12px;">
        <span style="display: inline-block; background: #0F2D52; color: #ffffff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px;">OFFICIAL MEMBERSHIP QUOTATION</span>
      </div>
    </div>

    <!-- Quotation Reference Banner -->
    <div style="background: #0F2D52; color: #ffffff; padding: 18px 22px; margin-bottom: 28px;">
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; font-weight: 600;">Official Quotation Reference</div>
      <div style="font-family: monospace; font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-top: 4px;">${quoteReference}</div>
      <div style="font-size: 11px; color: #cbd5e1; margin-top: 6px;">Valid for 30 calendar days &middot; PDF Proposal attached to this email.</div>
    </div>

    <!-- Personalized Salutation & Sales Pitch -->
    <div style="margin-bottom: 28px;">
      <p style="font-size: 16px; margin: 0 0 12px 0; color: #0F2D52; font-weight: 700;">Dear ${clientName},</p>
      <p style="font-size: 13.5px; margin: 0 0 14px 0; color: #334155; line-height: 1.7;">
        Thank you for selecting Paper Street Workspaces. We are delighted to present this tailored corporate proposal for <strong>${serviceTitle} (${tierName})</strong> prepared specifically for <strong>${orgName}</strong>.
      </p>
      <div style="background: #f8fafc; border-left: 3px solid #0F2D52; padding: 14px 16px; font-size: 13px; color: #1e293b; line-height: 1.7;">
        ${valueProposition.trim()}
      </div>
    </div>

    <!-- Itemized Quotation Summary Table -->
    <div style="border: 1px solid #e2e8f0; margin-bottom: 28px;">
      <div style="background: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52;">Investment &amp; Specification Summary</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B; width: 40%;">Organization:</td><td style="padding: 10px 18px; color: #0F2D52; font-weight: 600;">${orgName}</td></tr>
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B;">Contact Person:</td><td style="padding: 10px 18px; color: #0F2D52;">${clientName} (${clientPhone})</td></tr>
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B;">Package Selected:</td><td style="padding: 10px 18px; color: #0F2D52; font-weight: 600;">${serviceTitle} &mdash; ${tierName}</td></tr>
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B;">Contract Commitment:</td><td style="padding: 10px 18px; color: #0F2D52; font-weight: 600;">${commitmentPeriod}</td></tr>
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B;">Target Start Date:</td><td style="padding: 10px 18px; color: #0F2D52;">${startDate}</td></tr>
        <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B;">Monthly Rate:</td><td style="padding: 10px 18px; color: #0F2D52; font-family: monospace; font-weight: 600;">KES ${monthlyRateKES.toLocaleString()} / mo</td></tr>
        ${depositAmountKES > 0 ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 18px; color: #64748B;">Refundable Security Deposit:</td><td style="padding: 10px 18px; color: #0F2D52; font-family: monospace;">KES ${depositAmountKES.toLocaleString()}</td></tr>` : ''}
        <tr style="background: #f8fafc;"><td style="padding: 12px 18px; color: #0F2D52; font-weight: 700; text-transform: uppercase; font-size: 12px;">Total Initial Investment:</td><td style="padding: 12px 18px; color: #0F2D52; font-weight: 700; font-size: 16px; font-family: monospace;">KES ${grandTotal.toLocaleString()}</td></tr>
      </table>
    </div>

    <!-- Onboarding Process -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px 18px; margin-bottom: 28px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #0F2D52; display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Onboarding &amp; Agreement Execution:</strong>
      1. <strong>Relationship Specialist Contact:</strong> A Paper Street membership executive will contact you directly within 2 business hours.<br>
      2. <strong>KYC Verification:</strong> Submit corporate documents (Director ID, KRA PIN, Certificate of Incorporation / CR12).<br>
      3. <strong>Instant Activation:</strong> Upon agreement execution, your official Proof of Address certificate and access badges are issued immediately.
    </div>

    <!-- Complete 13 Terms of Service Sections -->
    <div style="border: 1px solid #cbd5e1; margin-bottom: 28px;">
      <div style="background: #f1f5f9; padding: 12px 18px; border-bottom: 1px solid #cbd5e1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52;">
        Paper Street Terms of Service &amp; Regulatory Framework
      </div>
      <div style="padding: 16px 18px; font-size: 11.5px; color: #334155; line-height: 1.6;">
        <p style="margin: 0 0 10px 0;"><strong>1. About Paper Street and These Terms:</strong> Paper Street operates commercial coworking spaces, private office suites, meeting rooms, and virtual office business address services across Kenya, including our flagship commercial facilities at Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD and Westlands in Nairobi. By subscribing to a Paper Street plan, completing an onboarding agreement, using our website, or accessing any of our physical premises or virtual services, you agree to be bound by these Terms of Service.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>2. Scope of Services Provided:</strong> Paper Street offers Virtual Office &amp; Business Address on Oginga Odinga St under Section 47 Companies Act 2015, eCitizen BRS incorporation, KRA PIN registration, and banking KYC; Mail Handling &amp; Digitization (300 DPI PDF scans); Executive Meeting Rooms (4-6 pax with 4K displays); Coworking Desks; Private Office Suites; and Front-Desk Concierge Services (8:00 AM to 6:00 PM, Mon-Fri).</p>
        
        <p style="margin: 0 0 10px 0;"><strong>3. Onboarding and Statutory KYC Compliance:</strong> In compliance with POCAMLA, service activation requires clear copies of director National ID / Passport, KRA PIN certificates, Certificate of Incorporation, current CR12 (issued within 90 days), and proof of physical residential address within 14 calendar days of plan initiation.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>4. Subscription Plans, Pricing &amp; Security Deposit Policy:</strong> Annual upfront plans (12 months) enjoy a Zero Security Deposit benefit. Monthly rolling contracts require a mandatory Two Months Refundable Security Deposit prior to activation. Deposits are refunded exactly 30 calendar days following contract conclusion, subject to clearance and certified proof from BRS (Form CR9 and updated CR12) confirming legal change of registered office address away from Paper Street premises.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>5. Legal Address Authorization &amp; Restrictions on Use:</strong> A valid subscription grants a limited, non-exclusive, revocable license to utilize the designated commercial address. It does not create any tenancy or leasehold title. Upon contract expiry or termination, you must immediately cease displaying the address and file Form CR9 with BRS within 30 days. Unauthorized use carries a penalty of KES 15,000 per month plus statutory reporting.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>6. Permitted vs Prohibited Activities:</strong> Services and premises may be used solely for legitimate, lawful commercial purposes. Unauthorized activities include illegal/fraudulent schemes, unlicensed deposit-taking, pyramid schemes, cybercrime violations, or handling hazardous/contraband materials. Immediate termination and reporting applies to violations.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>7. Mail, Parcel Intake &amp; Storage Protocols:</strong> Standard letters and packages are held free of storage charge for up to 30 calendar days. Items uncollected after 30 days incur KES 50/day. Items uncollected after 90 days will be returned to sender or disposed of without liability. Virtual Office Pro mail is scanned to PDF (300 DPI) within 1 business day. Custody liability is limited to KES 5,000 per parcel or declared value (lower).</p>
        
        <p style="margin: 0 0 10px 0;"><strong>8. Meeting Room &amp; Workspace Code of Conduct:</strong> Meeting rooms must be cancelled at least 24 hours in advance to receive credit. Cancellations under 24 hours are charged in full. Meeting suites are strictly 4-6 pax capacity. Members are responsible for proper equipment care and acoustic consideration.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>9. Payment Terms, Billing Cycles &amp; Grace Periods:</strong> Invoices are issued electronically (M-Pesa Till, RTGS/EFT, Visa/Mastercard; no cash). Due on the 1st of each cycle. 7-day grace period before service suspension. Accounts in default beyond 30 days are permanently terminated with deposit forfeiture.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>10. Binding Contract Commitments, Early Departure &amp; Legal Action:</strong> The Client commits to the full financial obligation for the entirety of the agreed contract term. In the event of early departure or voluntary non-use, the Client remains legally obligated for all subscription fees for the remaining contracted period. Paper Street reserves the right to initiate debt recovery, report defaults to CRBs, and commence formal legal proceedings in the courts of Kenya.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>11. Limitation of Liability and Indemnification:</strong> Paper Street is not liable for indirect, incidental, or consequential damages. Aggregate liability is strictly capped at subscription fees paid in the preceding three (3) months. The Client indemnifies Paper Street from unlawful use or tax defaults.</p>
        
        <p style="margin: 0 0 10px 0;"><strong>12. Governing Law and Dispute Resolution:</strong> Governed by the Laws of the Republic of Kenya. Disputes shall first undergo 30-day good-faith negotiations, followed by binding mediation under the Nairobi Centre for International Arbitration (NCIA) before any court litigation.</p>
        
        <p style="margin: 0;"><strong>13. Legal Contact &amp; Corporate Notices:</strong> Legal Desk: legal@paperstreet.co.ke &middot; Client Support: hello@paperstreet.co.ke &middot; Kisumu Commercial Center: Oginga Odinga Street, Kisumu CBD &middot; Nairobi Commercial Center: Westlands Business Park, Waiyaki Way, Nairobi.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.6;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748B;">Paper Street Workspaces</p>
      <p style="margin: 0 0 4px 0;">CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya</p>
      <p style="margin: 0;">Tel: 0110486677 / +254 110 486 677 &nbsp;|&nbsp; hello@paperstreet.co.ke &nbsp;|&nbsp; www.paperstreet.co.ke</p>
    </div>

  </div>
</body>
</html>`

    // Send Client Email via Brevo
    if (apiKey) {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: clientEmail, name: clientName }],
          subject: `Official Membership Quotation [${quoteReference}] - ${serviceTitle} | Paper Street`,
          htmlContent: clientHtml,
          attachment: [
            {
              name: `PaperStreet_Quotation_${quoteReference}.pdf`,
              content: pdfBase64,
            },
          ],
        }),
      })

      // Send Admin Alert
      const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; color: #0F2D52; padding: 20px; background: #fbfaf7;">
  <div style="max-width: 600px; background: #fff; border: 1px solid #cbd5e1; padding: 30px;">
    <h2 style="margin: 0 0 10px; color: #0F2D52;">New Membership Quotation Generated</h2>
    <p style="font-size: 14px; color: #475569; margin: 0 0 20px;">A client has generated a formal quote request. Human follow-up required.</p>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Quote Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #0F2D52;">${quoteReference}</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Company Name:</td><td style="padding: 8px 0; font-weight: bold; color: #0F2D52;">${companyName || 'N/A'}</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Contact Person:</td><td style="padding: 8px 0; font-weight: bold; color: #0F2D52;">${clientName}</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Email:</td><td style="padding: 8px 0; color: #0F2D52;">${clientEmail}</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Phone:</td><td style="padding: 8px 0; color: #0F2D52; font-weight: bold;">${clientPhone}</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Service &amp; Tier:</td><td style="padding: 8px 0; color: #0F2D52;">${serviceTitle} (${tierName})</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Commitment:</td><td style="padding: 8px 0; color: #0F2D52;">${commitmentPeriod} (Start: ${startDate})</td></tr>
      <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Estimated Total:</td><td style="padding: 8px 0; font-weight: bold; color: #0F2D52;">KES ${grandTotal.toLocaleString()}</td></tr>
      ${additionalRequirements ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748B;">Specific Notes:</td><td style="padding: 8px 0; color: #0F2D52;">${additionalRequirements}</td></tr>` : ''}
    </table>

    <div style="background: #f8fafc; padding: 12px; border-left: 3px solid #0F2D52; font-size: 12px;">
      Action: Call or email the client to initiate onboarding and agreement signing.
    </div>
  </div>
</body>
</html>`

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: adminEmail, name: 'Paper Street Sales Lead' }],
          subject: `[LEAD QUOTE] ${serviceTitle} - ${companyName || clientName} (${quoteReference})`,
          htmlContent: adminHtml,
        }),
      })
    }

    return new Response(JSON.stringify({ success: true, quoteReference }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
