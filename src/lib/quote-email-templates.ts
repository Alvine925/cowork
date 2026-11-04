// Shared quotation email and PDF generation logic for Paper Street Workspaces

export interface QuotePayload {
  quoteReference: string
  serviceSlug: string
  serviceTitle: string
  tierName: string
  commitmentPeriod: string
  durationMonths: number
  monthlyRateKES: number
  totalCommitmentKES: number
  depositAmountKES: number
  startDate: string
  endDate?: string
  teamSize?: number
  companyName?: string
  clientName: string
  clientEmail: string
  clientPhone: string
  additionalRequirements?: string
  inclusions?: string[]
}

export const STANDARD_MONTHLY_RATES: Record<string, number> = {
  'virtual-office': 10000,
  'business-address': 5000,
  'dedicated-desk': 20000,
}

export function kes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`
}

export function fmtDate(iso: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function esc(str: string | undefined | null): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Calculates standard annual value, actual savings (1 month free), and discount percentage */
export function calcAnnualSaving(
  serviceSlug: string,
  monthlyRateKES: number,
  totalCommitmentKES: number,
  durationMonths: number,
  teamSize = 1
): { standardAnnualValue: number; savingKES: number; discountPercent: number } {
  if (durationMonths !== 12) {
    return { standardAnnualValue: totalCommitmentKES, savingKES: 0, discountPercent: 0 }
  }
  const standardMonthly = STANDARD_MONTHLY_RATES[serviceSlug] || monthlyRateKES
  const standardAnnualValue = standardMonthly * 12 * teamSize
  const savingKES = Math.max(0, standardAnnualValue - totalCommitmentKES)
  const discountPercent = standardAnnualValue > 0 ? Math.round((savingKES / standardAnnualValue) * 100) : 0
  return { standardAnnualValue, savingKES, discountPercent }
}

export function serviceSubject(slug: string, companyName: string | undefined): string {
  const org = companyName ? ` – ${companyName}` : ''
  if (slug === 'virtual-office') return `Your Paper Street Quotation${org}`
  if (slug === 'business-address') return `Your Business Address Quotation${org}`
  if (slug === 'dedicated-desk') return `Your Dedicated Desk Quotation${org}`
  if (slug === 'office-management') return `Your Managed Office Proposal${org}`
  return `Your Paper Street Quotation${org}`
}

export function serviceIntroText(slug: string, tierName: string, inclusions: string[] = []): string {
  const incList = inclusions.length > 0
    ? `<ul style="margin: 10px 0 0 0; padding-left: 18px; font-size: 13px; color: #334155; line-height: 1.8;">${inclusions.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`
    : ''

  if (slug === 'virtual-office') {
    return `
      <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
        Your <strong>Virtual Office</strong> membership gives your business a professional commercial address on <strong>Oginga Odinga Street, Kisumu CBD</strong> — the same address used for company registration, banking KYC, KRA compliance and your day-to-day mail.
      </p>
      <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
        Every letter and parcel received in your name is logged and scanned to a high-resolution PDF, then sent directly to your email. Your front desk is handled by our team, and you get monthly boardroom access included in the membership.
      </p>
      ${incList}
    `
  }

  if (slug === 'business-address') {
    return `
      <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
        Your <strong>Business Address</strong> service gives your business an official, verifiable commercial address in <strong>Kisumu CBD</strong> for company incorporation, KRA registration, banking KYC and business correspondence — without the cost of renting physical office space.
      </p>
      <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
        Physical mail received in your company's name is logged and you're notified immediately. The address is accepted by eCitizen BRS, the KRA and commercial banks.
      </p>
      ${incList}
    `
  }

  if (slug === 'dedicated-desk') {
    return `
      <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
        Your <strong>Dedicated Desk</strong> gives you a permanently assigned personal workstation that no one else uses. You can leave your monitors, equipment and stationery in place between visits, stored securely in your lockable pedestal unit.
      </p>
      <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
        Your membership includes the commercial business address, high-speed fibre internet, 100% generator power backup and monthly boardroom booking hours.
      </p>
      ${incList}
    `
  }

  return `
    <p style="font-size: 13px; color: #334155; line-height: 1.7; margin: 0 0 12px 0;">
      We've prepared this quotation for <strong>${esc(tierName)}</strong> based on your selected package and requirements.
    </p>
    ${incList}
  `
}

export function commercialNote(
  slug: string,
  isAnnual: boolean,
  durationMonths: number,
  depositAmountKES: number,
  savingKES: number,
  discountPercent: number
): string {
  if (isAnnual && savingKES > 0) {
    return `Your quotation includes the annual commitment discount (1 month free), saving you <strong>${kes(savingKES)}</strong> across your 12-month contract. Annual subscriptions also qualify for the zero-security-deposit arrangement, so no security deposit is required.`
  }
  if (isAnnual && depositAmountKES === 0) {
    return `Your quotation reflects the annual commitment arrangement with no security deposit required.`
  }
  if (!isAnnual && depositAmountKES > 0) {
    return `Your quotation includes a refundable security deposit of <strong>${kes(depositAmountKES)}</strong>, in addition to the monthly service fee. The deposit terms are outlined in your attached quotation and the deposit is fully refundable at the end of your contract.`
  }
  if (!isAnnual && depositAmountKES === 0) {
    return `Your quotation reflects standard pricing for your selected service. No security deposit is required.`
  }
  return `Your quotation reflects the pricing applicable to your selected service and contract arrangement.`
}

export function buildClientEmail(data: QuotePayload): string {
  const {
    quoteReference,
    serviceSlug,
    serviceTitle,
    tierName,
    durationMonths,
    monthlyRateKES,
    totalCommitmentKES,
    depositAmountKES,
    startDate,
    teamSize = 1,
    companyName,
    clientName,
    additionalRequirements,
    inclusions = [],
  } = data

  const isAnnual = durationMonths === 12 && depositAmountKES === 0
  const { standardAnnualValue, savingKES, discountPercent } = calcAnnualSaving(
    serviceSlug,
    monthlyRateKES,
    totalCommitmentKES,
    durationMonths,
    teamSize
  )
  const grandTotal = totalCommitmentKES + depositAmountKES
  const orgName = companyName || clientName
  const issueDate = fmtDate(new Date().toISOString())
  const expiryDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return fmtDate(d.toISOString())
  })()

  const noteText = commercialNote(serviceSlug, isAnnual, durationMonths, depositAmountKES, savingKES, discountPercent)
  const introHtml = serviceIntroText(serviceSlug, tierName, inclusions)

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quotation – Paper Street</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:620px; margin:32px auto; background:#ffffff;">

    <!-- Header bar -->
    <div style="background:#2b4c3b; padding:28px 36px 24px;">
      <div style="font-size:22px; font-weight:800; letter-spacing:3px; color:#ffffff; text-transform:uppercase; margin-bottom:4px;">PAPER STREET</div>
      <div style="font-size:11px; color:rgba(255,255,255,0.65); letter-spacing:1px; text-transform:uppercase;">Office Solutions &amp; Business Services</div>
      <div style="margin-top:16px; display:inline-block; background:#ebff48; color:#2b4c3b; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:5px 12px;">QUOTATION</div>
    </div>

    <!-- Ref strip -->
    <div style="background:#f8f8f4; border-bottom:1px solid #e8e8e0; padding:14px 36px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-family:monospace; font-size:13px; font-weight:700; color:#2b4c3b; letter-spacing:1px;">${esc(quoteReference)}</span>
      <span style="font-size:11px; color:#64748b;">Issued ${issueDate} &nbsp;·&nbsp; Valid until ${expiryDate}</span>
    </div>

    <!-- Body -->
    <div style="padding:32px 36px;">

      <!-- Greeting -->
      <p style="font-size:15px; color:#2b4c3b; font-weight:600; margin:0 0 6px 0;">Dear ${esc(clientName)},</p>
      <p style="font-size:13px; color:#334155; line-height:1.7; margin:0 0 20px 0;">
        Thank you for considering Paper Street for your business needs. We've prepared a quotation for
        <strong>${esc(orgName)}'s ${esc(serviceTitle)}</strong>,
        based on the package and requirements you selected.
      </p>

      <!-- Service description -->
      <div style="border-left:3px solid #ebff48; padding:0 0 0 16px; margin-bottom:28px;">
        ${introHtml}
      </div>

      <!-- Financial summary -->
      <div style="margin-bottom:28px;">
        <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#64748b; border-bottom:1px solid #e8e8e0; padding-bottom:8px; margin-bottom:0;">Quotation Summary</div>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b; width:55%;">Service</td>
            <td style="padding:10px 0; color:#2b4c3b; font-weight:600; text-align:right;">${esc(serviceTitle)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Plan</td>
            <td style="padding:10px 0; color:#2b4c3b; text-align:right;">${esc(tierName)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Contract term</td>
            <td style="padding:10px 0; color:#2b4c3b; text-align:right;">${durationMonths} month${durationMonths > 1 ? 's' : ''}</td>
          </tr>
          ${startDate ? `<tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Service start date</td>
            <td style="padding:10px 0; color:#2b4c3b; text-align:right;">${esc(fmtDate(startDate))}</td>
          </tr>` : ''}
          ${teamSize > 1 ? `<tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Workstations</td>
            <td style="padding:10px 0; color:#2b4c3b; text-align:right;">${teamSize}</td>
          </tr>` : ''}
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Monthly equivalent</td>
            <td style="padding:10px 0; color:#2b4c3b; font-family:monospace; text-align:right;">${kes(monthlyRateKES)}${teamSize > 1 ? ' × ' + teamSize : ''} / mo</td>
          </tr>
          ${savingKES > 0 ? `
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Standard annual value</td>
            <td style="padding:10px 0; color:#64748b; font-family:monospace; text-align:right; text-decoration:line-through;">${kes(standardAnnualValue)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#16a34a;">Annual commitment discount (1 month free)</td>
            <td style="padding:10px 0; color:#16a34a; font-family:monospace; font-weight:600; text-align:right;">−${kes(savingKES)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#2b4c3b; font-weight:600;">Discounted annual service fee</td>
            <td style="padding:10px 0; color:#2b4c3b; font-weight:600; font-family:monospace; text-align:right;">${kes(totalCommitmentKES)}</td>
          </tr>` : `
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#2b4c3b; font-weight:600;">Service fee</td>
            <td style="padding:10px 0; color:#2b4c3b; font-weight:600; font-family:monospace; text-align:right;">${kes(totalCommitmentKES)}</td>
          </tr>`}
          ${depositAmountKES > 0 ? `
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Refundable security deposit</td>
            <td style="padding:10px 0; color:#2b4c3b; font-family:monospace; text-align:right;">${kes(depositAmountKES)}</td>
          </tr>` : `
          <tr style="border-bottom:1px solid #f1f1ec;">
            <td style="padding:10px 0; color:#64748b;">Security deposit</td>
            <td style="padding:10px 0; color:#16a34a; font-family:monospace; text-align:right;">No security deposit required (KES 0)</td>
          </tr>`}
          <tr style="background:#2b4c3b;">
            <td style="padding:14px 12px; color:#ebff48; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Total initial amount payable</td>
            <td style="padding:14px 12px; color:#ebff48; font-weight:800; font-size:16px; font-family:monospace; text-align:right;">${kes(grandTotal)}</td>
          </tr>
        </table>
        ${!isAnnual && durationMonths > 1 ? `<p style="font-size:11px; color:#64748b; margin:8px 0 0 0;">Subsequent monthly payments: <strong>${kes(monthlyRateKES)}${teamSize > 1 ? ' × ' + teamSize : ''}</strong> per month.</p>` : ''}
      </div>

      <!-- Commercial note -->
      <div style="background:#f8f8f4; border-left:3px solid #2b4c3b; padding:14px 16px; margin-bottom:28px; font-size:12.5px; color:#334155; line-height:1.6;">
        ${noteText}
      </div>

      <!-- Attachment note -->
      <p style="font-size:13px; color:#334155; line-height:1.7; margin:0 0 20px 0;">
        Please find your detailed quotation attached, including the service specifications, investment breakdown, applicable terms and next steps.
      </p>

      <!-- Closing -->
      <p style="font-size:13px; color:#334155; line-height:1.7; margin:0 0 6px 0;">
        Should you wish to proceed or have any questions about the proposal, simply reply to this email or contact our team. We'll be happy to assist.
      </p>
      <p style="font-size:13px; color:#334155; margin:0 0 28px 0;">We look forward to working with you.</p>

      ${additionalRequirements ? `
      <div style="border-top:1px solid #e8e8e0; padding-top:16px; margin-bottom:28px;">
        <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:6px;">Your Requirements Note</div>
        <p style="font-size:12.5px; color:#334155; line-height:1.6; margin:0; font-style:italic;">"${esc(additionalRequirements)}"</p>
      </div>` : ''}

    </div>

    <!-- Signature -->
    <div style="border-top:1px solid #e8e8e0; background:#f8f8f4; padding:20px 36px;">
      <p style="font-size:12px; color:#2b4c3b; font-weight:700; margin:0 0 4px 0;">Paper Street Team</p>
      <p style="font-size:11.5px; color:#64748b; margin:0 0 2px 0;">Phone / WhatsApp: <a href="tel:+254110486677" style="color:#2b4c3b; text-decoration:none; font-weight:600;">+254 110 486 677</a></p>
      <p style="font-size:11.5px; color:#64748b; margin:0 0 2px 0;">Email: <a href="mailto:hello@paperstreet.co.ke" style="color:#2b4c3b; text-decoration:none;">hello@paperstreet.co.ke</a></p>
      <p style="font-size:11.5px; color:#64748b; margin:0;"><a href="https://paperstreet.co.ke" style="color:#2b4c3b; text-decoration:none;">https://paperstreet.co.ke</a></p>
    </div>

  </div>
</body>
</html>`
}

export function buildAdminEmail(data: QuotePayload, adminEmail: string): string {
  const {
    quoteReference, serviceTitle, tierName,
    durationMonths, monthlyRateKES, totalCommitmentKES, depositAmountKES,
    startDate, teamSize = 1, companyName, clientName, clientEmail, clientPhone,
    additionalRequirements,
  } = data

  const grandTotal = totalCommitmentKES + depositAmountKES
  const { savingKES, discountPercent } = calcAnnualSaving(
    data.serviceSlug,
    monthlyRateKES,
    totalCommitmentKES,
    durationMonths,
    teamSize
  )
  const orgName = companyName || clientName

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; padding:30px 20px; background:#f5f5f0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e0e0d8;">
    <div style="background:#2b4c3b; padding:20px 28px;">
      <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#ebff48; margin-bottom:4px;">NEW QUOTATION REQUEST</div>
      <div style="font-size:18px; font-weight:300; color:#ffffff;">${esc(orgName)} — ${esc(serviceTitle)}</div>
      <div style="font-size:11px; color:rgba(255,255,255,0.6); margin-top:4px; font-family:monospace;">${esc(quoteReference)}</div>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:20px;">
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b; width:40%;">Company / Contact:</td><td style="padding:8px 0; color:#2b4c3b; font-weight:600;">${esc(orgName)} / ${esc(clientName)}</td></tr>
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Email:</td><td style="padding:8px 0;"><a href="mailto:${esc(clientEmail)}" style="color:#2b4c3b; font-weight:600;">${esc(clientEmail)}</a></td></tr>
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Phone:</td><td style="padding:8px 0;"><a href="tel:${esc(clientPhone)}" style="color:#2b4c3b; font-weight:600;">${esc(clientPhone)}</a></td></tr>
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Service:</td><td style="padding:8px 0; color:#2b4c3b;">${esc(serviceTitle)} — ${esc(tierName)}</td></tr>
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Duration:</td><td style="padding:8px 0; color:#2b4c3b;">${durationMonths} months${startDate ? ' from ' + fmtDate(startDate) : ''}</td></tr>
        ${teamSize > 1 ? `<tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Workstations:</td><td style="padding:8px 0; color:#2b4c3b;">${teamSize}</td></tr>` : ''}
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Service fee:</td><td style="padding:8px 0; color:#2b4c3b; font-family:monospace;">${kes(totalCommitmentKES)}</td></tr>
        ${savingKES > 0 ? `<tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Annual saving:</td><td style="padding:8px 0; color:#16a34a; font-family:monospace; font-weight:600;">−${kes(savingKES)} (1 month free)</td></tr>` : ''}
        <tr style="border-bottom:1px solid #f0f0e8;"><td style="padding:8px 0; color:#64748b;">Deposit:</td><td style="padding:8px 0; color:#2b4c3b; font-family:monospace;">${depositAmountKES > 0 ? kes(depositAmountKES) + ' (refundable)' : 'None required'}</td></tr>
        <tr style="background:#2b4c3b;"><td style="padding:12px 8px; color:#ebff48; font-weight:700;">Total Initial:</td><td style="padding:12px 8px; color:#ebff48; font-weight:800; font-family:monospace;">${kes(grandTotal)}</td></tr>
      </table>
      ${additionalRequirements ? `<div style="background:#f8f8f4; padding:12px; border-left:3px solid #2b4c3b; font-size:12.5px; color:#334155; line-height:1.6; margin-bottom:16px;"><strong>Client note:</strong> ${esc(additionalRequirements)}</div>` : ''}
      <div style="border-top:1px solid #e0e0d8; padding-top:14px; display:flex; gap:20px;">
        <a href="mailto:${esc(clientEmail)}?subject=RE: Paper Street Quotation ${esc(quoteReference)}" style="color:#2b4c3b; font-weight:700; font-size:12px; text-decoration:underline;">Reply via Email →</a>
        <a href="https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}" style="color:#166534; font-weight:700; font-size:12px; text-decoration:underline;">WhatsApp →</a>
      </div>
    </div>
    <div style="border-top:1px solid #e0e0d8; padding:12px 28px; font-size:11px; color:#94a3b8;">
      Automated alert from Paper Street Quotation Engine — record saved to <code>quote_requests</code> table.
    </div>
  </div>
</body>
</html>`
}

function safe(str: string | undefined | null, maxLen = 72): string {
  if (!str) return ''
  return str
    .replace(/[\\()]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .substring(0, maxLen)
}

function row(
  label: string,
  value: string,
  y: number,
  labelColor = '0.40 0.47 0.56',
  valueColor = '0.17 0.30 0.23',
  bold = false
): string {
  const font = bold ? '/F1' : '/F2'
  return `
${labelColor} rg
BT ${font} 8.5 Tf 50 ${y} Td (${safe(label)}) Tj ET
${valueColor} rg
BT ${bold ? '/F1' : '/F2'} 8.5 Tf 300 ${y} Td (${safe(value)}) Tj ET
`
}

function hRule(y: number, light = false): string {
  const color = light ? '0.88 0.88 0.85' : '0.17 0.30 0.23'
  return `${color} RG\n0.5 w\n50 ${y} m 545 ${y} l S\n`
}

export function buildPdf(data: QuotePayload): string {
  const {
    quoteReference,
    serviceSlug,
    serviceTitle,
    tierName,
    durationMonths,
    monthlyRateKES,
    totalCommitmentKES,
    depositAmountKES,
    startDate,
    endDate,
    teamSize = 1,
    companyName,
    clientName,
    clientEmail,
    clientPhone,
    inclusions = [],
  } = data

  const isAnnual = durationMonths === 12 && depositAmountKES === 0
  const { standardAnnualValue, savingKES, discountPercent } = calcAnnualSaving(
    serviceSlug,
    monthlyRateKES,
    totalCommitmentKES,
    durationMonths,
    teamSize
  )
  const grandTotal = totalCommitmentKES + depositAmountKES
  const orgName = safe(companyName || clientName)
  const issueDate = safe(fmtDate(new Date().toISOString()))
  const expiryDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return safe(fmtDate(d.toISOString()))
  })()
  const startFmt = startDate ? safe(fmtDate(startDate)) : ''
  const endFmt = endDate ? safe(fmtDate(endDate)) : ''

  let ops = ''

  // ── Clean, generous dark green header band (from y=736 to 842 = 106pt high) ──
  ops += `
% ── Dark green header band ──
0.17 0.30 0.23 rg
0 736 595 106 re f

% Brand name & category in header band
1 1 1 rg
BT /F1 18 Tf 50 804 Td (PAPER STREET) Tj ET
0.92 1.00 0.28 rg
BT /F1 8 Tf 195 804 Td (OFFICE SOLUTIONS & BUSINESS SERVICES) Tj ET

% QUOTATION badge (cleanly inside green band)
0.92 1.00 0.28 rg
50 772 80 18 re f
0.17 0.30 0.23 rg
BT /F1 8 Tf 58 778 Td (QUOTATION) Tj ET

% Contact info line (inside green band)
0.85 0.90 0.88 rg
BT /F2 7.5 Tf 50 750 Td (+254 110 486 677   |   hello@paperstreet.co.ke   |   paperstreet.co.ke) Tj ET

% Right side info (all inside green band)
1 1 1 rg
BT /F2 8 Tf 350 778 Td (Quotation Ref:) Tj ET
0.92 1.00 0.28 rg
BT /F1 8.5 Tf 420 778 Td (${safe(quoteReference)}) Tj ET

0.85 0.90 0.88 rg
BT /F2 7.5 Tf 350 762 Td (Issued: ${issueDate}) Tj ET
BT /F2 7.5 Tf 350 750 Td (Valid until: ${expiryDate} (30 days)) Tj ET

% Accent yellow rule at bottom of header band
0.92 1.00 0.28 RG
2 w
0 736 m 595 736 l S
0.5 w
`

  // ── Body content starts cleanly below y=736 ──────────────────────────────
  let y = 708

  // ── Prepared for ─────────────────────────────────────────────────────────
  ops += `
0.17 0.30 0.23 rg
BT /F1 7.5 Tf 50 ${y} Td (PREPARED FOR) Tj ET
`
  y -= 15
  ops += `
0.17 0.30 0.23 rg
BT /F1 12 Tf 50 ${y} Td (${orgName}) Tj ET
`
  y -= 14
  ops += `
0.40 0.47 0.56 rg
BT /F2 8 Tf 50 ${y} Td (Contact: ${safe(clientName)}   |   ${safe(clientEmail)}   |   ${safe(clientPhone)}) Tj ET
`
  y -= 10

  ops += hRule(y, true)
  y -= 16

  // ── Service proposal ─────────────────────────────────────────────────────
  ops += `
0.17 0.30 0.23 rg
BT /F1 7.5 Tf 50 ${y} Td (YOUR PROPOSED SOLUTION) Tj ET
`
  y -= 14
  ops += row('Service', safe(serviceTitle), y)
  y -= 13; ops += hRule(y - 2, true)
  y -= 12
  ops += row('Plan', safe(tierName), y)
  y -= 13; ops += hRule(y - 2, true)
  y -= 12
  ops += row('Contract term', `${durationMonths} month${durationMonths > 1 ? 's' : ''}`, y)
  if (startFmt) {
    y -= 13; ops += hRule(y - 2, true)
    y -= 12
    ops += row('Start date', startFmt, y)
  }
  if (endFmt) {
    y -= 13; ops += hRule(y - 2, true)
    y -= 12
    ops += row('End date', endFmt, y)
  }
  if (teamSize > 1) {
    y -= 13; ops += hRule(y - 2, true)
    y -= 12
    ops += row('Workstations', String(teamSize), y)
  }
  y -= 8

  ops += hRule(y)
  y -= 16

  // ── Financial breakdown ───────────────────────────────────────────────────
  ops += `
0.17 0.30 0.23 rg
BT /F1 7.5 Tf 50 ${y} Td (INVESTMENT BREAKDOWN) Tj ET
`
  y -= 14

  // Monthly rate
  const rateLabel = teamSize > 1 ? `Monthly rate (x${teamSize})` : 'Monthly equivalent'
  const rateVal = teamSize > 1
    ? `${kes(monthlyRateKES)} x ${teamSize} = ${kes(monthlyRateKES * teamSize)}/mo`
    : `${kes(monthlyRateKES)}/mo`
  ops += row(rateLabel, rateVal, y)
  y -= 13; ops += hRule(y - 2, true)

  // Annual saving (1 month free)
  if (savingKES > 0) {
    y -= 12
    ops += row('Standard annual value', kes(standardAnnualValue), y, '0.40 0.47 0.56', '0.40 0.47 0.56')
    y -= 13; ops += hRule(y - 2, true)
    y -= 12
    ops += row(`Annual commitment discount (1 month free)`, `-${kes(savingKES)}`, y, '0.09 0.63 0.26', '0.09 0.63 0.26', true)
    y -= 13; ops += hRule(y - 2, true)
    y -= 12
    ops += row('Discounted annual service fee', kes(totalCommitmentKES), y, '0.17 0.30 0.23', '0.17 0.30 0.23', true)
    y -= 13; ops += hRule(y - 2, true)
  } else {
    y -= 12
    ops += row('Service fee', kes(totalCommitmentKES), y, '0.17 0.30 0.23', '0.17 0.30 0.23', true)
    y -= 13; ops += hRule(y - 2, true)
  }

  // Deposit
  y -= 12
  if (depositAmountKES > 0) {
    ops += row('Refundable security deposit', kes(depositAmountKES), y)
  } else {
    ops += row('Security deposit', 'No deposit required (KES 0)', y, '0.40 0.47 0.56', '0.09 0.63 0.26')
  }
  y -= 8

  // Total row — green band
  ops += `
0.17 0.30 0.23 rg
50 ${y - 18} 495 20 re f
0.92 1.00 0.28 rg
BT /F1 8 Tf 56 ${y - 11} Td (TOTAL INITIAL AMOUNT PAYABLE) Tj ET
BT /F1 10 Tf 350 ${y - 11} Td (${safe(kes(grandTotal))}) Tj ET
`
  y -= 30

  // Monthly note
  if (!isAnnual && durationMonths > 1) {
    ops += `
0.40 0.47 0.56 rg
BT /F2 7.5 Tf 50 ${y} Td (Subsequent monthly payments: ${safe(kes(monthlyRateKES))} per month.) Tj ET
`
    y -= 10
  }
  y -= 6
  ops += hRule(y)
  y -= 16

  // ── Inclusions ────────────────────────────────────────────────────────────
  if (inclusions.length > 0) {
    ops += `
0.17 0.30 0.23 rg
BT /F1 7.5 Tf 50 ${y} Td (INCLUDED IN YOUR SERVICE) Tj ET
`
    y -= 13
    for (const inc of inclusions.slice(0, 8)) {
      ops += `
0.17 0.30 0.23 rg
BT /F2 7.5 Tf 52 ${y} Td (-  ${safe(inc, 90)}) Tj ET
`
      y -= 11
      if (y < 100) break
    }
    y -= 4
    ops += hRule(y)
    y -= 16
  }

  // ── Next steps ────────────────────────────────────────────────────
  if (y > 150) {
    ops += `
0.17 0.30 0.23 rg
BT /F1 7.5 Tf 50 ${y} Td (HOW TO GET STARTED) Tj ET
`
    y -= 13

    const steps = serviceSlug === 'virtual-office' || serviceSlug === 'business-address'
      ? [
          '1.  Review this quotation and confirm your acceptance.',
          '2.  Complete the service agreement (sent by our team).',
          '3.  Submit onboarding documents: Director ID, KRA PIN, CR12.',
          '4.  Complete the initial payment.',
          '5.  Paper Street activates your service and issues your Proof of Address.',
        ]
      : serviceSlug === 'dedicated-desk'
      ? [
          '1.  Review this quotation and confirm your acceptance.',
          '2.  Complete the workspace membership agreement.',
          '3.  Submit your KYC documents.',
          '4.  Complete the initial payment.',
          '5.  Your workstation is allocated and access is confirmed.',
        ]
      : [
          '1.  Review and accept this quotation.',
          '2.  Complete the applicable service agreement.',
          '3.  Submit any required documents.',
          '4.  Complete the initial payment.',
          '5.  Paper Street proceeds with service activation.',
        ]

    for (const step of steps) {
      if (y < 100) break
      ops += `
0.40 0.47 0.56 rg
BT /F2 8 Tf 52 ${y} Td (${safe(step, 95)}) Tj ET
`
      y -= 12
    }
    y -= 4
  }

  // ── Commercial conditions ─────────────────────────────────────────────────
  if (y > 120) {
    ops += hRule(y)
    y -= 12
    ops += `
0.40 0.47 0.56 rg
BT /F2 7 Tf 50 ${y} Td (Quotation valid for 30 days. Full service terms and agreement provided separately. Contact hello@paperstreet.co.ke) Tj ET
`
    y -= 10
    ops += `
BT /F2 7 Tf 50 ${y} Td (or +254 110 486 677 with any questions regarding this proposal.) Tj ET
`
  }

  // ── Footer band ───────────────────────────────────────────────────────────
  ops += `
0.17 0.30 0.23 rg
0 20 595 36 re f
0.85 0.90 0.88 rg
BT /F2 7.5 Tf 50 36 Td (Paper Street  |  hello@paperstreet.co.ke  |  +254 110 486 677  |  paperstreet.co.ke) Tj ET
0.92 1.00 0.28 rg
BT /F2 7.5 Tf 50 26 Td (Office Solutions & Business Services  |  Kisumu, Kenya) Tj ET
`

  // ── Build PDF binary ──────────────────────────────────────────────────────
  const encoder = new TextEncoder()
  const streamBytes = encoder.encode(ops.trim())
  const streamLen = streamBytes.length

  const pdfStr = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >> endobj
4 0 obj << /Length ${streamLen} >>
stream
${ops.trim()}
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
0000000266 00000 n\r
0000000400 00000 n\r
0000000474 00000 n\r
trailer << /Size 7 /Root 1 0 R >>
startxref
550
%%EOF`

  const pdfBytes = encoder.encode(pdfStr)
  let binary = ''
  for (let i = 0; i < pdfBytes.byteLength; i++) {
    binary += String.fromCharCode(pdfBytes[i])
  }
  return typeof Buffer !== 'undefined'
    ? Buffer.from(binary, 'binary').toString('base64')
    : btoa(binary)
}
