import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const referralInviteSchema = z.object({
  referrerEmail: z.string().email(),
  referredEmail: z.string().email(),
  referralCode: z.string().min(3),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = referralInviteSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { referrerEmail, referredEmail, referralCode } = parsed.data

    if (referrerEmail.toLowerCase() === referredEmail.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: 'You cannot refer your own email address.' },
        { status: 400 }
      )
    }

    try {
      await supabase.from('client_referrals').insert({
        referrer_email: referrerEmail.toLowerCase(),
        referred_email: referredEmail.toLowerCase(),
        referral_code: referralCode,
        status: 'pending',
        reward_kes: 500,
      })
    } catch (err) {
      console.warn('[Referrals API] DB notice:', err)
    }

    return NextResponse.json({
      success: true,
      message: `Referral invite logged for ${referredEmail}. You will earn KES 500 when they complete their first booking!`,
    })
  } catch (err: any) {
    console.error('[Referrals API Error]', err)
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email parameter required' }, { status: 400 })
    }

    const { data: referrals, error } = await supabase
      .from('client_referrals')
      .select('*')
      .eq('referrer_email', email.toLowerCase().trim())
      .order('created_at', { ascending: false })

    const totalEarned = (referrals || [])
      .filter((r: any) => r.status === 'rewarded')
      .reduce((sum: number, r: any) => sum + (Number(r.reward_kes) || 500), 0)

    const pendingCount = (referrals || []).filter((r: any) => r.status === 'pending').length

    return NextResponse.json({
      success: true,
      referrals: referrals || [],
      totalEarnedKES: totalEarned,
      pendingCount,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
