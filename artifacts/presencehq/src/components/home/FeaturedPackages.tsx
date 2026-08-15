import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, CircleHelp } from 'lucide-react'
import { Link } from 'wouter'

const PLANS = [
  {
    name: 'Basic',
    annual: 42000,
    monthly: 4200,
    deposit: 8400,
    summary: 'The credible starting point for a small business that needs a proper home.',
    fit: 'Best for: founders, sole proprietors and early-stage teams',
    allowance: 'Address + essential mail support',
    features: ['Professional business address in Kisumu', 'Mail and document receiving', 'Same-day mail notifications', 'Secure mail storage', 'Mail collection and basic handling', 'Address use on approved business materials', 'Customer support'],
    featured: false,
  },
  {
    name: 'Professional',
    annual: 60000,
    monthly: 6000,
    deposit: 12000,
    summary: 'A more active base for teams that need space, meetings and a local welcome.',
    fit: 'Best for: growing teams and client-facing professionals',
    allowance: 'Address + workspace and meeting support',
    features: ['Everything in Basic', 'Coworking and desk access', 'Meeting room access', 'Document scanning', 'Business phone or WhatsApp option', 'Visitor reception', 'Priority mail handling', 'Mail forwarding at applicable charges'],
    featured: true,
  },
  {
    name: 'Premium',
    annual: 120000,
    monthly: 12000,
    deposit: 24000,
    summary: 'The fullest operating layer for businesses with a higher volume of activity.',
    fit: 'Best for: established teams and international businesses',
    allowance: 'Expanded access + priority support',
    features: ['Everything in Professional', 'Increased coworking and desk access', 'Increased meeting room access', 'Mail forwarding allowance', 'Dedicated business phone or WhatsApp option', 'Client meeting support', 'Document scanning and handling', 'Priority customer support', 'More flexible facility access'],
    featured: false,
  },
]

export function FeaturedPackages() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="bg-navy py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Memberships</span>
            <h2 className="max-w-2xl font-heading text-5xl font-light leading-[0.95] sm:text-6xl">Choose the amount of presence your business needs.</h2>
            <p className="mt-6 max-w-2xl text-base font-light leading-7 text-white/58">
              Every membership starts with a credible address in Kisumu and a team that knows how to handle the practical details. Move up when your working pattern changes.
            </p>
          </div>
          <div className="border-l border-gold/50 pl-5 text-sm leading-6 text-white/58 lg:max-w-[220px]">
            <CircleHelp className="mb-3 h-5 w-5 text-gold" />
            Need a combination rather than a plan? <Link href="/contact?plan=custom" className="text-white underline decoration-gold underline-offset-4" data-testid="link-custom-plan">Talk to us about a tailored setup.</Link>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center gap-4 border-y border-white/12 py-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/42">Billing view</span>
          <div className="flex items-center gap-3">
            <button type="button" data-testid="button-monthly-billing" onClick={() => setIsAnnual(false)} className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${!isAnnual ? 'text-white' : 'text-white/38 hover:text-white/75'}`}>Monthly</button>
            <button type="button" role="switch" aria-checked={isAnnual} aria-label="Toggle annual billing" data-testid="button-toggle-billing" onClick={() => setIsAnnual(!isAnnual)} className="relative h-6 w-12 rounded-full border border-white/20 bg-white/10">
              <motion.span className="absolute top-1 h-4 w-4 rounded-full bg-gold" animate={{ left: isAnnual ? '1.5rem' : '0.25rem' }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            </button>
            <button type="button" data-testid="button-annual-billing" onClick={() => setIsAnnual(true)} className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${isAnnual ? 'text-white' : 'text-white/38 hover:text-white/75'}`}>Annual</button>
          </div>
          <span className="text-xs text-gold">{isAnnual ? 'Best available rate · no security deposit' : 'Flexible monthly commitment · two-month security deposit'}</span>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <article key={plan.name} className={`flex flex-col bg-navy px-6 py-8 sm:px-8 sm:py-10 ${plan.featured ? 'relative' : ''}`} data-testid={`card-plan-${plan.name.toLowerCase()}`}>
              {plan.featured && <div className="absolute left-0 right-0 top-0 h-1 bg-gold" />}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">{plan.name}</p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/68">{plan.summary}</p>
                </div>
                {plan.featured && <span className="shrink-0 bg-gold px-2 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-navy">Most popular</span>}
              </div>
              <div className="mt-8">
                <span className="font-heading text-4xl text-white">KES {(isAnnual ? plan.annual : plan.monthly).toLocaleString()}</span>
                <span className="ml-2 text-xs text-white/38">/ {isAnnual ? 'year' : 'month'}</span>
              </div>
              <div className="mt-5 border-t border-gold/60 pt-4">
                <p className="text-xs font-semibold text-gold">{plan.allowance}</p>
                <p className="mt-2 text-xs leading-5 text-white/40">{plan.fit}</p>
              </div>
              <ul className="mt-7 flex-1 border-t border-white/10" aria-label={`${plan.name} inclusions`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 border-b border-white/10 py-3 text-sm font-light leading-5 text-white/66">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-7 min-h-10 text-xs leading-5 text-white/42">
                {isAnnual ? 'Annual payment is made upfront. No security deposit is required under these terms.' : <>Monthly start: KES {plan.monthly.toLocaleString()} subscription + KES {plan.deposit.toLocaleString()} security deposit.</>}
              </p>
              <Link href={`/contact?plan=${plan.name.toLowerCase()}`} data-testid={`link-start-${plan.name.toLowerCase()}`} className={`group mt-7 inline-flex items-center justify-center gap-3 px-5 py-4 text-xs font-semibold uppercase tracking-[0.17em] transition-colors ${plan.featured ? 'bg-gold text-white hover:bg-gold-400' : 'border border-white/30 text-white hover:bg-white hover:text-navy'}`}>
                Discuss {plan.name} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/12 pt-8 md:grid-cols-3">
          {[
            ['01', 'Share your details', 'Send the basic company and authorised-person information needed to set up your membership.'],
            ['02', 'Choose your rhythm', 'We confirm the plan, billing view, location and any workspace or mail preferences with you.'],
            ['03', 'Start with a clear base', 'Your address and support are activated, and you know exactly who to contact when something arrives.'],
          ].map(([number, title, detail]) => (
            <div key={number} className="grid grid-cols-[2.4rem_1fr] gap-4">
              <span className="font-heading text-2xl text-gold/75">{number}</span>
              <div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-2 text-sm font-light leading-6 text-white/46">{detail}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}