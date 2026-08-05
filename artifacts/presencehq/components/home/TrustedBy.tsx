import { cn } from '@/lib/utils'

const COMPANIES = [
  "Acme Corp",
  "Globex",
  "Soylent Corp",
  "Initech",
  "Umbrella",
  "Massive Dynamic",
  "Stark Industries",
  "Wayne Enterprises"
]

export function TrustedBy() {
  return (
    <section className="py-10 border-b border-gray-100 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-semibold text-dark-gray/50 uppercase tracking-wider mb-6">
          Trusted by serious businesses across Kenya
        </p>
        <div className="relative w-full flex overflow-hidden">
          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-12 md:gap-24 animate-marquee whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <div 
                key={i}
                className="text-xl md:text-2xl font-bold text-gray-300 hover:text-navy transition-colors duration-300 cursor-default"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add a simple inline style for the marquee animation since it's custom */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  )
}
