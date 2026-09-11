import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const { action } = payload

    // 1. GET OR CREATE CODE
    if (action === 'get_or_create_code') {
      const email = payload.email?.toLowerCase().trim()
      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      const { data: profile } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      if (profile && profile.referral_code) {
        const origin = req.headers.get('origin') || 'https://paperstreet.co.ke'
        return NextResponse.json({
          success: true,
          referralCode: profile.referral_code,
          discountBalanceKES: Number(profile.discount_balance_kes) || 0,
          referralLink: `${origin}/book?ref=${profile.referral_code}`,
        })
      }

      const prefix = email.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, 'X')
      const randNum = Math.floor(1000 + Math.random() * 9000)
      const newCode = `PS-${prefix}${randNum}`

      if (profile) {
        await supabase
          .from('client_profiles')
          .update({ referral_code: newCode, updated_at: new Date().toISOString() })
          .eq('id', profile.id)
      } else {
        await supabase.from('client_profiles').insert({
          email,
          full_name: payload.fullName || email.split('@')[0],
          referral_code: newCode,
          discount_balance_kes: 0,
        })
      }

      const origin = req.headers.get('origin') || 'https://paperstreet.co.ke'
      return NextResponse.json({
        success: true,
        referralCode: newCode,
        discountBalanceKES: profile?.discount_balance_kes || 0,
        referralLink: `${origin}/book?ref=${newCode}`,
      })
    }

    // 2. LINK REFERRAL ON JOIN/CHECKOUT
    if (action === 'link_referral') {
      const refereeEmail = payload.refereeEmail?.toLowerCase().trim()
      const code = payload.referralCode?.trim().toUpperCase()

      if (!refereeEmail || !code) {
        return NextResponse.json({ error: 'Referee email and referral code required' }, { status: 400 })
      }

      const { data: referrer } = await supabase
        .from('client_profiles')
        .select('email')
        .eq('referral_code', code)
        .maybeSingle()

      if (!referrer || referrer.email === refereeEmail) {
        return NextResponse.json({ error: 'Invalid or self-referral code' }, { status: 400 })
      }

      const { data: existing } = await supabase
        .from('client_referrals')
        .select('id, status')
        .eq('referred_email', refereeEmail)
        .maybeSingle()

      if (!existing) {
        await supabase.from('client_referrals').insert({
          referrer_email: referrer.email,
          referred_email: refereeEmail,
          referral_code: code,
          status: 'pending',
          reward_kes: 500,
        })
      }

      return NextResponse.json({ success: true, message: 'Referral linked successfully' })
    }

    // 3. REWARD REFERRER WHEN REFEREE ACTUALLY COMPLETES A PAID BOOKING
    if (action === 'reward_booking') {
      const refereeEmail = payload.refereeEmail?.toLowerCase().trim()
      if (!refereeEmail) {
        return NextResponse.json({ error: 'Referee email required' }, { status: 400 })
      }

      const { data: referral } = await supabase
        .from('client_referrals')
        .select('*')
        .eq('referred_email', refereeEmail)
        .eq('status', 'pending')
        .maybeSingle()

      if (!referral) {
        return NextResponse.json({ success: false, message: 'No pending referral found' })
      }

      const rewardAmount = Number(referral.reward_kes) || 500

      // Mark as rewarded
      await supabase
        .from('client_referrals')
        .update({
          status: 'rewarded',
          rewarded_at: new Date().toISOString(),
        })
        .eq('id', referral.id)

      // Increment referrer's balance
      const { data: referrerProfile } = await supabase
        .from('client_profiles')
        .select('discount_balance_kes')
        .eq('email', referral.referrer_email)
        .maybeSingle()

      const currentBalance = Number(referrerProfile?.discount_balance_kes) || 0
      const newBalance = currentBalance + rewardAmount

      await supabase
        .from('client_profiles')
        .update({
          discount_balance_kes: newBalance,
          updated_at: new Date().toISOString(),
        })
        .eq('email', referral.referrer_email)

      return NextResponse.json({
        success: true,
        message: `Referrer ${referral.referrer_email} credited KES ${rewardAmount}`,
        rewardAmount,
        newReferrerBalance: newBalance,
      })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err: any) {
    console.error('[Process Referral Error]', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
