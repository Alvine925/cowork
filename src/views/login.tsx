'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, UserRound } from 'lucide-react'

const portalPath = '/portal/'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] pt-28 pb-20">
      <div className="container mx-auto max-w-5xl px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-navy/60 transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Paper Street
        </Link>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-navy font-mono">
            <span className="w-2 h-1 bg-navy inline-block" />
            Paper Street access
          </p>
          <h1 className="font-heading text-5xl font-light leading-tight text-navy md:text-6xl">
            Choose your workspace.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-navy/60">
            Select the account type that matches how you use Paper Street. Members can
            access their existing workspace today; client bookings are coming next.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl border border-navy/15 bg-white md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-navy/15">
          <Link
            href="/portal/member/login"
            className="group flex min-h-[300px] flex-col justify-between p-8 md:p-12 transition-colors hover:bg-navy/[0.02]"
          >
            <div>
              <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-navy font-bold">
                Contract Access
              </span>
              <h2 className="mt-6 font-heading text-3xl font-light text-navy">
                Member login
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-navy/65">
                Manage registered corporate address, mail dispatch, legal compliance letters, and boardroom credits.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-navy/10 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-navy">
                Sign In Only
              </span>
              <ArrowUpRight className="h-4 w-4 text-navy transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>

          <Link
            href="/portal/client/login"
            className="group flex min-h-[300px] flex-col justify-between p-8 md:p-12 transition-colors hover:bg-navy/[0.02]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-navy font-bold">
                  On-Demand Services
                </span>
                <span className="border border-emerald-700/30 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-800">
                  Active
                </span>
              </div>
              <h2 className="mt-6 font-heading text-3xl font-light text-navy">
                Client portal
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-navy/65">
                Book conference rooms, purchase hot desk day passes, and view instant payment receipts.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-navy/10 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-navy">
                Sign In & Register
              </span>
              <ArrowUpRight className="h-4 w-4 text-navy transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center text-xs text-navy/50">
          <p>
            Need help choosing or looking to setup a custom team agreement?{' '}
            <Link href="/contact" className="font-medium text-navy underline hover:text-navy/70">
              Contact our Kisumu team
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}