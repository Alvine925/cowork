import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { dispatchFeedbackAlertEmail } from '@/lib/brevo-service'

const feedbackSchema = z.object({
  userId: z.string().optional().nullable(),
  clientName: z.string().min(2, 'Name is required'),
  clientEmail: z.string().email('Valid email is required'),
  clientPhone: z.string().optional().nullable(),
  location: z.string().default('Kisumu CBD'),
  category: z.enum(['facility', 'wifi', 'meeting_room', 'billing', 'urgent_concern', 'general']).default('general'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(5, 'Message details required'),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = feedbackSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const {
      userId,
      clientName,
      clientEmail,
      clientPhone,
      location,
      category,
      priority,
      subject,
      message,
    } = parsed.data

    let ticketId: string | undefined = undefined

    // 1. Save feedback record to client_feedback table
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('client_feedback')
        .insert({
          user_id: userId || null,
          client_name: clientName,
          client_email: clientEmail.toLowerCase(),
          client_phone: clientPhone || null,
          location,
          category,
          priority,
          subject,
          message,
          status: 'open',
        })
        .select('id')
        .single()

      if (!dbError && dbData?.id) {
        ticketId = dbData.id
      }
    } catch (dbErr) {
      console.warn('[Feedback API] DB Exception:', dbErr)
    }

    // 2. Dispatch Brevo notification alert to admin
    const emailSent = await dispatchFeedbackAlertEmail({
      ticketId,
      name: clientName,
      email: clientEmail,
      phone: clientPhone || undefined,
      category,
      priority,
      subject,
      message,
      location,
    })

    return NextResponse.json({
      success: true,
      ticketId: ticketId || `TKT-${Date.now().toString().slice(-6)}`,
      message: 'Your concern has been submitted to the front desk management team. We will attend to it promptly.',
      adminNotified: emailSent,
    })
  } catch (err: any) {
    console.error('[Feedback API Error]', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email parameter required' }, { status: 400 })
    }

    const { data: tickets, error } = await supabase
      .from('client_feedback')
      .select('*')
      .eq('client_email', email.toLowerCase().trim())
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('[Feedback GET] Notice:', error.message)
      return NextResponse.json({ success: true, tickets: [] })
    }

    return NextResponse.json({ success: true, tickets: tickets || [] })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
