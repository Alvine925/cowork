import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { dispatchOtpEmail } from '@/lib/brevo-service'

const sendOtpSchema = z.object({
  email: z.string().email('Valid email address is required'),
  name: z.string().min(2, 'Full name is required').optional(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = sendOtpSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, name, phone, company } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    // Generate random 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

    // 1. Save or update OTP in client_auth_otps table
    try {
      await supabase.from('client_auth_otps').insert({
        email: normalizedEmail,
        otp_code: otpCode,
        full_name: name || null,
        phone: phone || null,
        company: company || null,
        expires_at: expiresAt,
        verified: false,
      })
    } catch (dbErr) {
      console.warn('[send-otp] DB notice:', dbErr)
    }

    // 2. Dispatch OTP code via Supabase Edge Function with fallback to direct Brevo
    let emailSent = false
    try {
      const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('send-auth-otp', {
        body: {
          type: 'otp',
          email: normalizedEmail,
          name: name || undefined,
          otp: otpCode,
        },
      })
      if (!edgeErr && edgeData?.success) {
        emailSent = true
      }
    } catch (edgeEx) {
      console.warn('[send-otp] Edge function exception, falling back:', edgeEx)
    }

    if (!emailSent) {
      emailSent = await dispatchOtpEmail({
        email: normalizedEmail,
        name: name || undefined,
        otp: otpCode,
      })
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${normalizedEmail}.`,
      emailSent,
      expiresInSeconds: 600,
    })
  } catch (err: any) {
    console.error('[send-otp Error]', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to dispatch verification code' },
      { status: 500 }
    )
  }
}
