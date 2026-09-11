import { NextResponse } from 'next/server';
import { getSystemConfig } from '@/lib/config-service';
import { sendBrevoEmail } from '@/lib/brevo-service';

interface NotifyPayload {
  type: 'booking_created' | 'feedback_submitted' | 'package_inquiry';
  data: Record<string, any>;
}

async function sendEmailNotification(to: string | string[], subject: string, html: string) {
  const config = await getSystemConfig();
  const toList = (Array.isArray(to) ? to : [to]).map((e) => ({ email: e }));

  // 1. Try Brevo if key is present
  if (config.brevoApiKey && !config.brevoApiKey.includes('placeholder')) {
    const brevoRes = await sendBrevoEmail({
      to: toList,
      subject,
      htmlContent: html,
    });
    if (brevoRes.success) return brevoRes;
  }

  // 2. Fallback to Resend if configured
  const resendApiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
  const resendSender = process.env.RESEND_FROM_EMAIL || 'Paper Street <onboarding@resend.dev>';

  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: resendSender,
          to: Array.isArray(to) ? to : [to],
          subject,
          html,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        return { success: false, error: json };
      }
      return { success: true, data: json };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }

  console.warn('[Email Simulation] No email key configured. Simulating email send to:', to);
  return { success: true, simulated: true };
}

export async function POST(req: Request) {
  try {
    const body: NotifyPayload = await req.json();
    const { type, data } = body;

    if (type === 'booking_created') {
      const {
        clientName = 'Client',
        clientEmail,
        clientPhone = '—',
        serviceTitle = 'Workspace Reservation',
        location = 'Delta Corner, Westlands',
        bookingDate,
        startTime,
        endTime,
        durationHours = 1,
        totalAmountKes = 0,
        passCode = 'PS-PASS-001',
      } = data;

      const formattedDate = bookingDate ? new Date(bookingDate).toLocaleDateString('en-KE', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) : 'Scheduled Date';

      const formattedKes = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        maximumFractionDigits: 0,
      }).format(totalAmountKes);

      // 1. Email to Client
      const clientHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FBF8F0; padding: 40px 20px; color: #0F2D52;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 4px solid #C5A880; padding: 36px 32px; border-radius: 2px;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A880; font-weight: bold; margin: 0 0 8px 0;">Reservation Confirmation</p>
            <h1 style="font-size: 26px; font-weight: 300; margin: 0 0 16px 0; color: #0F2D52;">Your Workspace is Confirmed</h1>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Hello ${clientName},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Your reservation for <strong>${serviceTitle}</strong> at Paper Street has been successfully scheduled and paid.</p>
            
            <div style="margin: 28px 0; padding: 20px; background-color: #F8FAFC; border-left: 3px solid #0F2D52;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748B; width: 35%;">Location:</td>
                  <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${location}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Date:</td>
                  <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Session Time:</td>
                  <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${startTime} - ${endTime} (${durationHours} hrs)</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Total Amount:</td>
                  <td style="padding: 6px 0; color: #0F2D52; font-weight: 600;">${formattedKes}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Entry Pass Code:</td>
                  <td style="padding: 6px 0; font-family: monospace; color: #0F2D52; font-size: 15px; font-weight: bold;">${passCode}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #64748B;">
              <strong>Check-In Instructions:</strong> Please present your pass code or scan your QR code at the front desk upon arrival. High-speed Wi-Fi credentials and barista beverage service will be available immediately.
            </p>
            
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 30px 0;" />
            <p style="font-size: 11px; color: #94A3B8; text-align: center; margin: 0;">
              Paper Street Workspaces · Delta Corner, Westlands, Nairobi, Kenya<br />
              Telephone: 0110486677 / +254 110 486 677 · Email: hello@paperstreet.co.ke
            </p>
          </div>
        </div>
      `;

      // 2. Email to Admin (otienoalvine925@gmail.com)
      const adminHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0F2D52; padding: 40px 20px; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 4px solid #C5A880; padding: 36px 32px; border-radius: 2px; color: #0F2D52;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A880; font-weight: bold; margin: 0 0 8px 0;">Admin Booking Alert</p>
            <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 16px 0;">New Client Reservation</h1>
            
            <div style="margin: 20px 0; padding: 18px; background-color: #F8FAFC; border: 1px solid #E2E8F0;">
              <p style="margin: 4px 0; font-size: 13px;"><strong>Client:</strong> ${clientName} (${clientEmail})</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Phone:</strong> ${clientPhone}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Space:</strong> ${serviceTitle}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Location:</strong> ${location}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Date:</strong> ${formattedDate} (${startTime} - ${endTime})</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Revenue:</strong> ${formattedKes}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Pass Code:</strong> <code>${passCode}</code></p>
            </div>
            
            <p style="font-size: 12px; color: #64748B;">This notification was dispatched automatically from the Paper Street Client Desk.</p>
          </div>
        </div>
      `;

      const config = await getSystemConfig();
      const adminEmail = config.adminEmail || 'otienoalvine925@gmail.com';

      if (clientEmail) {
        await sendEmailNotification(clientEmail, `Reservation Confirmed: ${serviceTitle} (${formattedDate})`, clientHtml);
      }
      await sendEmailNotification(adminEmail, `[NEW BOOKING] ${clientName} - ${serviceTitle} (${formattedKes})`, adminHtml);

      return NextResponse.json({ success: true, message: 'Booking notification emails triggered' });
    }

    if (type === 'feedback_submitted') {
      const {
        clientName = 'Client',
        clientEmail,
        category = 'General',
        priority = 'medium',
        subject = 'Ticket',
        message = '',
        location = 'Westlands (Delta Corner)',
        ticketId = 'TCK-101',
      } = data;

      const priorityBadge = priority === 'urgent' ? 'URGENT' : priority === 'high' ? 'HIGH' : 'STANDARD';

      // 1. Email to Client
      const clientHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FBF8F0; padding: 40px 20px; color: #0F2D52;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 4px solid #C5A880; padding: 36px 32px; border-radius: 2px;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A880; font-weight: bold; margin: 0 0 8px 0;">Helpdesk & Concierge</p>
            <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 16px 0; color: #0F2D52;">Ticket Received: ${ticketId}</h1>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Hello ${clientName},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Thank you for getting in touch. Your message regarding <strong>${subject}</strong> has been logged in our queue.</p>
            
            <div style="margin: 24px 0; padding: 20px; background-color: #F8FAFC; border-left: 3px solid #0F2D52;">
              <p style="margin: 4px 0; font-size: 13px; color: #64748B;"><strong>Category:</strong> ${category}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #64748B;"><strong>Location:</strong> ${location}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #64748B;"><strong>Priority:</strong> ${priorityBadge}</p>
              <p style="margin: 12px 0 4px 0; font-size: 13px; color: #0F2D52; font-style: italic;">"${message}"</p>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #64748B;">
              Our on-site facility supervisor and concierge desk respond to all inquiries within <strong>4 working hours</strong>.
            </p>
          </div>
        </div>
      `;

      // 2. Email to Admin
      const config = await getSystemConfig();
      const adminEmail = config.adminEmail || 'otienoalvine925@gmail.com';

      const adminHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0F2D52; padding: 40px 20px; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 4px solid #E11D48; padding: 36px 32px; border-radius: 2px; color: #0F2D52;">
            <span style="display: inline-block; background-color: #FFE4E6; color: #9F1239; padding: 4px 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 12px;">
              ${priorityBadge} FEEDBACK / COMPLAINT
            </span>
            <h1 style="font-size: 22px; font-weight: 400; margin: 0 0 16px 0;">New Ticket [${ticketId}]: ${subject}</h1>
            
            <div style="margin: 20px 0; padding: 18px; background-color: #F8FAFC; border: 1px solid #E2E8F0;">
              <p style="margin: 4px 0; font-size: 13px;"><strong>From:</strong> ${clientName} (${clientEmail})</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Category:</strong> ${category}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Facility:</strong> ${location}</p>
              <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #CBD5E1;">
                <strong style="font-size: 12px; color: #475569;">Client Message:</strong>
                <p style="margin: 6px 0 0 0; font-size: 14px; line-height: 1.6; color: #0F2D52;">${message}</p>
              </div>
            </div>
            
            <p style="font-size: 12px; color: #64748B;">Manage this ticket in the Supabase <code>client_feedback</code> table.</p>
          </div>
        </div>
      `;

      if (clientEmail) {
        await sendEmailNotification(clientEmail, `[Paper Street Helpdesk] Ticket ${ticketId}: ${subject}`, clientHtml);
      }
      await sendEmailNotification(adminEmail, `[CLIENT ${priorityBadge}] ${category}: ${subject} (Ticket ${ticketId})`, adminHtml);

      return NextResponse.json({ success: true, message: 'Feedback notification emails triggered' });
    }

    return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
  } catch (err: unknown) {
    console.error('[API Email Route Error]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal Server Error' }, { status: 500 });
  }
}
