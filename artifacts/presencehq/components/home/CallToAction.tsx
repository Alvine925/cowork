import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, Clock, XOctagon } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden text-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-600/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-gold/10 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)] leading-tight text-balance">
            Ready to Establish Your Business Presence?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 text-balance max-w-2xl">
            Join hundreds of ambitious businesses looking professional, operating efficiently, and growing faster with PresenceHQ.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full text-base py-6 px-10">
                Choose Your Package
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-base py-6 px-10 bg-transparent border-white text-white hover:bg-white/10">
                Talk to Sales
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl text-left sm:text-center pt-8 border-t border-white/10">
            <div className="flex items-center sm:flex-col gap-3 sm:gap-2">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm font-medium text-white/90">No Setup Fees</span>
            </div>
            <div className="flex items-center sm:flex-col gap-3 sm:gap-2">
              <XOctagon className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm font-medium text-white/90">Cancel Anytime</span>
            </div>
            <div className="flex items-center sm:flex-col gap-3 sm:gap-2">
              <Clock className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm font-medium text-white/90">24hr Activation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
