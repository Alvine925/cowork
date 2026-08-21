import { Link } from 'wouter'
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
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
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

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <Link
            href={`${portalPath}sign-in`}
            className="group flex min-h-[280px] flex-col justify-between border border-navy/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-navy/5 md:p-10"
          >
            <div>
              <span className="flex h-12 w-12 items-center justify-center bg-navy text-gold">
                <UserRound className="h-5 w-5" />
              </span>
              <h2 className="mt-8 font-heading text-3xl font-light text-navy">
                Member login
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-navy/60">
                Manage your membership, documents, address services, and support requests.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy">
              Enter member portal
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>

          <div className="flex min-h-[280px] flex-col justify-between border border-navy/10 bg-[#eee9dd] p-8 md:p-10">
            <div>
              <span className="flex h-12 w-12 items-center justify-center bg-gold text-white">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <div className="mt-8 flex items-center gap-3">
                <h2 className="font-heading text-3xl font-light text-navy">
                  Client login
                </h2>
                <span className="border border-gold/50 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-gold">
                  Coming soon
                </span>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-navy/60">
                Access daily package bookings, visit details, and client services in one
                focused workspace.
              </p>
            </div>
            <span className="mt-8 text-xs font-semibold uppercase tracking-widest text-navy/45">
              Client portal is being prepared
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}